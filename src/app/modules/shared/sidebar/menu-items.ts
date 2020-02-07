import { RouteInfo } from "./sidebar.metadata";

export const ROUTES: RouteInfo[] = [
  {
    path: "/services",
    title: "Services",
    icon: "mdi mdi-image-filter-vintage",
    class: "",
    extralink: false,
    submenu: []
  },
  {
    path: "/component/progressbar",
    title: "Progressbar",
    icon: "mdi mdi-poll",
    class: "",
    extralink: false,
    submenu: []
  },
  {
    path: "/blocks",
    title: "Blocks",
    icon: "mdi mdi-bandcamp",
    class: "",
    extralink: false,
    submenu: []
  },
  {
    path: "",
    title: "Users",
    icon: "ngbDropdownToggle",
    class: "top-right",
    extralink: false,
    submenu: [
      {
        path: "/user/add",
        title: "Add User",
        icon: "mdi mdi-sort-variant",
        class: "",
        extralink: false,
        submenu: []
      },
      {
        path: "/user/balance",
        title: "Balance",
        icon: "mdi mdi-sort-variant",
        class: "",
        extralink: false,
        submenu: []
      }
    ]
  },
  {
    path: "/",
    title: "RECURION",
    icon: "mdi mdi-toggle-switch",
    class: "",
    extralink: false,
    submenu: []
  }
];
