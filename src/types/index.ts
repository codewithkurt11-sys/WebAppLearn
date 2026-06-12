export interface NavItem {
  id: string;
  label: string;
  icon: string;
  color: string;
  tag?: string;
}

export interface NavGroup {
  section: string;
  items: NavItem[];
}

export interface AppCtxType {
  page: string;
  setPage: (id: string) => void;
}
