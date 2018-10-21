import { Component, OnInit } from '@angular/core';
import Utils from '../../utils'

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contact = {
    message: 'З питань співпраці та замовлення продукції пишіть сюди',
      email: 'lidikart22@gmail.com',
      mobile: '+380961721752',
      socialMessage: 'Знайти нас можна в мережах',
      fb: 'https://www.facebook.com/LidikArt',
      vk: 'http://vk.com/lidikart',
      twitter: 'https://twitter.com/Lllidik',
      instagram: 'https://instagram.com/lidikart'
  };

  shops = [{
    title: 'behance',
    image: Utils.imagePath + 'shops/behance-thumb.png',
    link: 'https://www.behance.net/LidikArt'
  }, {
    title: 'shutterstock',
    image: Utils.imagePath + 'shops/shutterstock-thumb.jpg',
    link: 'http://www.shutterstock.com/cat.mhtml?gallery_id=3563846&page=1'
  },
    //  {
    //  title: 'etsy',
    //  link: 'https://www.etsy.com/shop/LidikArt',
    //  image: require.toUrl('../images/shops/etsy-thumb.png')
    //}, {
    //  title: 'saatchiart',
    //  link: 'http://www.saatchiart.com/account/artworks/780825',
    //  image: require.toUrl('../images/shops/saatchiart-thumb.png')
    //},
    {
      title: 'fineartamerica',
      image: Utils.imagePath + 'shops/fineartamerica-thumb.jpg',
      link: 'http://fineartamerica.com/profiles/lidia-matviyenko.html'
    }]

  constructor() { }

  ngOnInit() {
  }

}
