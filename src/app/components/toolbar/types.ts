export interface INavbarData {
  routerLink: string;
  icon?: string;
  label: string;
  expanded?: boolean;
  roles?: string[];
  items?: INavbarData[];
}

interface IFlatNode {
  name: string;
  routerLink: string;
  roles?: string[];
  children?: IFlatNode[];
}

