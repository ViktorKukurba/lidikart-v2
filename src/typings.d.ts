/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface JQuery {
  fancybox(options?: any): any;
}

interface FancyboxMethods {
  open(group?: any[], options?: any): void;
  cancel(): void;
  close(force?: boolean): void;
  defaults: any;
  (options: any): void;
}

interface JQueryStatic {
  fancybox: FancyboxMethods
}

interface FB {
  XFBML: {
    parse(): any;
  }
}
