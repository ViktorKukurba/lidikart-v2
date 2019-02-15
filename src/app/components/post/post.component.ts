import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';

import { AppDataService } from '../../services/app-data.service';
import { getTextFromHtml, getShortText } from '../../utils';

declare const jQuery: any;
const FB = (<any>window).FB;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input()
  data;
  @Input()
  open;
  @Output() select = new EventEmitter<Object>();

  constructor(private container: ElementRef, private dataService: AppDataService) { }

  get title() {
    return this.data ? this.data.title.rendered : null;
  }

  get images() {
    const pattern = /<img.*src="([^\"]+)/mg;
    const images = pattern.exec(this.data.content.rendered);
    return images;
  }

  get image() {
    return this.images.length && this.images[1];
  }

  get publishDate() {
    return new Date(this.data.date).toLocaleDateString();
  }

  get shortText() {
    if (!this.data) {
      return null;
    }
    return getShortText(getTextFromHtml(this.data.content.rendered), 500);
  }

  get text() {
    return this.data.content.rendered;
  }

  get baseUrl() {
    return `/${this.dataService.langURLPrefix}/blog`;
  }

  get fancyText() {
    const content = this.data.content.rendered;
    const wrapper = document.createElement('DIV');
    wrapper.innerHTML = content;

    Array.from(wrapper.getElementsByTagName('img')).forEach(img => {
      const d = document.createElement('DIV');
      const fancyImg = `<a href="${img.src}"
        data-fancybox="blog2"
        class="thumbnail fancybox slide">
        <img src="${img.src}"/>
      </a>`;
      d.innerHTML = fancyImg;
      img.parentNode.insertBefore(d.querySelector('a'), img);
      img.parentNode.removeChild(img);
    });

    return wrapper.innerHTML;
  }

  get shareUrl_DEP() {
    return `https://lidikart.com.ua/${this.dataService.langURLPrefix}/blog;post=${this.data.id}`;
  }

  get shareUrl() {
    return `https://lidikart.com.ua/${this.dataService.langURLPrefix}/blog/${this.data.id}`;
  }

  ngOnInit() {
    jQuery.fancybox.defaults.hash = false;
    this.openHandler();
  }

  private openHandler() {
    setTimeout(() => {
      window.scrollTo(0, 0);
      if (FB) {
        FB.XFBML.parse(this.container.nativeElement);
      }
    });
  }
}
