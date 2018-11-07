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
