/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface JQuery {
  fancybox(options?: any): any;
}

interface FB {
  XFBML: {
    parse(): any;
  }
}
