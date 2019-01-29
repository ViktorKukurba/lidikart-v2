import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { AppSettings } from '../constants';
import Utils from '../utils';

@Injectable()
export class AppDataService {
  languages = AppSettings.LANGUAGES;

  postsMap = {};

  constructor(public translate: TranslateService) {
    translate.setDefaultLang('en');
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
