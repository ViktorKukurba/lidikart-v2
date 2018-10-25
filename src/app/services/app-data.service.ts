import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { AppSettings } from '../constants';
import { WpPage } from '../interfaces/wp-page';
import { WpCategory } from '../interfaces/wp-category';
import Utils from '../utils';
import { WpPost } from '../interfaces/wp-post';

const SERVICE_URL = '//lidikart.com.ua/wp-json/wp/v2';

@Injectable()
export class AppDataService {
  languages = AppSettings.LANGUAGES;
  private pages_ = new BehaviorSubject<Array<WpPage>>([]);
  private categories_ = new BehaviorSubject<Array<WpCategory>>([]);
  private posts_ = new BehaviorSubject<Array<WpPost>>([]);
  private category_ = new Subject<number>();
  pages = this.pages_.asObservable();
  categories = this.categories_.asObservable();
  posts = this.posts_.asObservable();
  category = this.category_.asObservable();

  postsMap = {};
  get params() {
    return {
      per_page: '100',
      lang: this.langValue
    };
  };

  constructor(
    public http: HttpClient,
    public translate: TranslateService) {
      translate.setDefaultLang('en');
      translate.onLangChange.subscribe(async (event: LangChangeEvent) => {
        await this.loadPageCategories();
      });
      this.setTranslations();
      translate.use(location.pathname.startsWith("/en") ? 'en' : 'ua');

    this.category.pipe(distinctUntilChanged()).subscribe(categoryId => {
      this.getPostsByCategories([categoryId]).subscribe((posts) => {
        this.posts_.next(posts);
      })
    })
  }

  private setTranslations() {
    this.translate.setTranslation('en', {
      Download: 'Download',
      All: 'All',
      Title: 'another world',
      Contact: 'Contact',
      JoinSocial: 'Join us' ,
      FollowSocial: 'Find us in social networks',
      GoShops: 'Visit me'
    });
    this.translate.setTranslation('ua', {
      Download: 'Скачати',
      All: 'Усе',
      Title: 'інший світ',
      Contact: 'Контакти',
      JoinSocial: 'Приєднуйтесь',
      FollowSocial: 'Слідкуйте в мережах',
      GoShops: 'Завітайте на'
    });
  }

  public setCategory(categoryId) {
    this.category_.next(categoryId);
  }

  get langURLPrefix() {
    return AppSettings.LANGUAGES.find(l => l.value === this.langValue).path
  }

  get langValue():string {
    return this.translate.currentLang;
  }

  getPostsByCategories(categoriesIds:Array<number|string>): Observable<WpPost[]> {
    const url = `${SERVICE_URL}/posts?per_page=100&categories=${categoriesIds.join(',')}&lang=${this.langValue}`;
    return new Observable(observer => {
      if (this.postsMap[url]) {
        observer.next(this.postsMap[url]);
        return observer.complete();
      }
      this.http.get(url).subscribe((posts) => {
          this.postsMap[url] = posts;
          observer.next(this.postsMap[url]);
          observer.complete();
        });
    });
  }

  loadPageCategories() {
    let pages =  this.http.get(`${SERVICE_URL}/pages`, {params: this.params});
    let categories = this.http.get(`${SERVICE_URL}/categories`, {params: this.params});
    return forkJoin([pages, categories]).subscribe((response: [Array<WpPage>, Array<WpCategory>]) => {
      const pages = response[0].filter(page => page.slug !== 'production').sort((a, b) => {
        return a.menu_order - b.menu_order;
      });
      const categories = response[1];
      this.categories_.next(categories);
      const langUrl = this.langURLPrefix;

      pages.forEach(function(page) {
        const ids = page.categories;
        page.categories = {};
        page.link = langUrl ? `${langUrl}/${page.slug}` : page.slug;
        categories.filter(function(category) {
          return ids.indexOf(category.id) !== -1;
        }).forEach(function(category) {
          const parentId = category.parent;
          if (parentId) {
            const parent = categories.filter(function(category) {
              return category.id === parentId;
            })[0];
            page.categories[parent.slug] = page.categories[parent.slug] || [];
            page.categories[parent.slug].push(category);
          }
        });
      });
      this.pages_.next(pages);
    })
  }

  public getContactsData() {
    return {
      contacts: {
        email: 'lidikart22@gmail.com',
        mobile: '+380961721752'
      },
      social: [{
        network: 'facebook',
        url: 'https://www.facebook.com/LidikArt'
      }, {
        network: 'instagram',
        url: 'https://instagram.com/lidikart'
      }, {
        network: 'youtube',
        url: 'https://www.youtube.com/channel/UCTfD6w37zeMgQuJ4fj3o2oA'
      }
        // vk: 'http://vk.com/lidikart',
        // twitter: 'https://twitter.com/Lllidik',
      ],
    shops: [{
      title: 'behance',
      image: Utils.imagePath + 'shops/behance-thumb.png',
      link: 'https://www.behance.net/LidikArt'
    }, 
      // {
      //   title: 'shutterstock',
      //   image: Utils.imagePath + 'shops/shutterstock-thumb.jpg',
      //   link: 'http://www.shutterstock.com/cat.mhtml?gallery_id=3563846&page=1'
      // },
      //  {
      //  title: 'etsy',
      //  link: 'https://www.etsy.com/shop/LidikArt',
      //  image: require.toUrl('../images/shops/etsy-thumb.png')
      // }, {
      //  title: 'saatchiart',
      //  link: 'http://www.saatchiart.com/account/artworks/780825',
      //  image: require.toUrl('../images/shops/saatchiart-thumb.png')
      // },
      // {
      //   title: 'fineartamerica',
      //   image: Utils.imagePath + 'shops/fineartamerica-thumb.jpg',
      //   link: 'http://fineartamerica.com/profiles/lidia-matviyenko.html'
      // }
    ]
    }
  }
}
