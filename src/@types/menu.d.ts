
// store menu 项
export interface MenuItemProps {
  title: string;
  icon: string;
  path: string;
  routes?: MenuItemProps[];
  hide?: boolean;
  redirect?: boolean;
  hideChildren?: boolean;
}
