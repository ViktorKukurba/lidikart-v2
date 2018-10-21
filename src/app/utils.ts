export default class Utils {
    static translate(str: string, lang:string) {
        if (str) {
          lang = lang === 'ua' ? 'uk' : lang;
          var regString = '<\!--\:' + lang + '-->(.*?)<\!--\:-->',
              re = new RegExp(regString, 'g'),
              translated = re.exec(str.replace(/(\r\n|\n|\r)/gm, ''));

          if (translated) {
            return translated[1];
          }
        }
        return str;
      }
      static imagePath = '../../../assets/images/'
    }