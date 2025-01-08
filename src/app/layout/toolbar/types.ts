export interface INavbarData {
  routerLink: string;
  icon?: string;
  label: string;
  expanded?: boolean;
  items?: INavbarData[];
}
