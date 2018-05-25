declare module '*.css' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames;
  export = classNames;
}
declare module '*.jpg' {
  const src: any;
  export = src;
}

declare const __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;

interface Window {
  initialState: any;
}

declare var window: Window;
