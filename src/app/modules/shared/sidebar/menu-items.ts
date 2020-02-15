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
    path: "/user/balance",
    title: "My Balance",
    icon: "fab fa-google-wallet",
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
    path: "/subscription",
    title: "Subscription",
    icon: "fas fa-th-large",
    class: "",
    extralink: false,
    submenu: []
  }
];
