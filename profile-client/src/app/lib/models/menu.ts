export interface IMenuData {
    label: string;
    link?: string;
    subMenu?: ISubMenu[];
    shouldHide: boolean;
  }
  export interface ISubMenu {
    label: string;
    link?: string;
    subMenuItems?: ISubMenuItem[];
  }
  export interface ISubMenuItem {
    label: string;
    link: string;
  }