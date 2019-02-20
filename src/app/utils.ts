import { AppSettings } from './constants';
import { Routes } from '@angular/router';

export default class Utils {
  static imagePath = '../../../assets/images/';
  static translate(str: string, lang: string) {
    if (str) {
      lang = lang === 'ua' ? 'uk' : lang;
      const regString = '<\!--\:' + lang + '-->(.*?)<\!--\:-->',
          re = new RegExp(regString, 'g'),
          translated = re.exec(str.replace(/(\r\n|\n|\r)/gm, ''));

      if (translated) {
        return translated[1];
        }
      }
      return str;
    }
}

export function getTextFromHtml(html) {
  const div = document.createElement('DIV');
  div.innerHTML = html;
  return div.textContent;
}

export function getShortText(text, len = 300) {
  if (text.length > len) {
      return `${text.substr(0, len)}...`;
  }
  return text;
}

export function pageY() {
  return window.pageYOffset || document.documentElement.scrollTop;
}

export function multilangRoutes(routes: Routes): Routes {
  return [...routes.reduce((multiRoutes, route) => {
    const lRoutes = AppSettings.LANGUAGES.filter(l => l.path).map((language) => {
      const lRoute = {...route};
      lRoute.path = language.path + (language.path && lRoute.path ? '/' : '') + lRoute.path;
      return lRoute;
    });
    lRoutes.forEach(lRoute => {
      multiRoutes = multiRoutes.concat(lRoute);
    });
    return multiRoutes;
  }, [])];
}
