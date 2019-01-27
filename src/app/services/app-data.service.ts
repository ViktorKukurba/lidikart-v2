import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { AppSettings } from '../constants';
import { WpPage } from '../interfaces/wp-page';
import { WpCategory } from '../interfaces/wp-category';
import Utils from '../utils';
import { WpPost } from '../interfaces/wp-post';
import { AppState } from '../store/reducers';
import { LoadPages } from '../store/actions/pages';
import { LoadCategories } from '../store/actions/categories';

const SERVICE_URL = '//lidikart.com.ua/wp-json/wp/v2';

// const SERVICE_URL = '//lidikart.loc/wp-json/wp/v2';

@Injectable()
export class AppDataService {
  languages = AppSettings.LANGUAGES;

  postsMap = {};
  get params() {
    return {
      per_page: '100',
      lang: this.langValue
    };
  }

  constructor(
    private store: Store<AppState>,
    public http: HttpClient,
    public translate: TranslateService) {
      translate.setDefaultLang('en');
      translate.onLangChange.subscribe(async (event: LangChangeEvent) => {
        this.store.dispatch(new LoadPages());
        this.store.dispatch(new LoadCategories());
      });
      this.setTranslations();
      translate.use(location.pathname.startsWith('/en') ? 'en' : 'ua');
  }

  private setTranslations() {
    this.translate.setTranslation('en', {
      Series: 'Series',
      Download: 'Download',
      All: 'All',
      Title: 'another world',
      Contact: 'Contact',
      JoinSocial: 'Join us' ,
      FollowSocial: 'Find us in social networks',
      GoShops: 'Visit me',
      Details: 'See more',
      HideDetails: 'Show less'
    });
    this.translate.setTranslation('ua', {
      Series: 'Серії',
      Download: 'Скачати',
      All: 'Усе',
      Title: 'інший світ',
      Contact: 'Контакти',
      JoinSocial: 'Приєднуйтесь',
      FollowSocial: 'Слідкуйте в мережах',
      GoShops: 'Завітайте на',
      Details: 'Показати більше...',
      HideDetails: 'Згорнути'
    });
  }

  get langURLPrefix() {
    return AppSettings.LANGUAGES.find(l => l.value === this.langValue).path;
  }

  get langValue(): string {
    return this.translate.currentLang;
  }

  loadPostsByCategories(categoriesIds: Array<number|string>): Observable<WpPost[]> {
    const url = `${SERVICE_URL}/posts?per_page=100&categories=${categoriesIds.join(',')}&lang=${this.langValue}`;
    return this.http.get<WpPost[]>(url);
  }

  loadPages(): Observable<WpPage[]> {
    return this.http.get<WpPage[]>(`${SERVICE_URL}/pages`, {params: this.params});
  }

  loadCategories(): Observable<WpCategory[]> {
    return this.http.get<WpCategory[]>(`${SERVICE_URL}/categories`, {params: this.params});
  }

  loadBlogs(): Observable<[]> {
    return this.http.get<[]>(`${SERVICE_URL}/blogs`, {params: this.params});
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
    };
  }
}
