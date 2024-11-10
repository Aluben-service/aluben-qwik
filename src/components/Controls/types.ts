export interface ErudaWindow extends Window {
  eruda?: {
    init: () => void;
    show: () => void;
    hide: () => void;
    _$el: HTMLElement[];
  };
}

export interface Bookmark {
  url: string;
  name: string;
}
