import { RouteInfo } from "./sidebar.metadata";

export const ROUTES: RouteInfo[] = [
  {
    path: "/",
    title: "Main    ",
    icon: "mdi mdi-home",
    class: "",
    extralink: false,
    submenu: []
  },
  {
    path: "/dash",
    title: "My Dashboard",
    icon: "fas fa-tachometer-alt",
    class: "",
    extralink: false,
    submenu: []
  },
  {
    path: "/services",
    title: "Services",
    icon: "mdi mdi-image-filter-vintage",
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
    path: "/user",
    title: "Users",
    icon: "ngbDropdownToggle",
    class: "",
    extralink: false,
    submenu: [
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
    path: "/subscription",
    title: "Subscription",
    icon: "mdi mdi-home",
    class: "",
    extralink: false,
    submenu: []
  }
];
