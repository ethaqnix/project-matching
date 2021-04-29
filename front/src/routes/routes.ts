import NotFound from "../pages/NotFound";

export interface IRoute {
  title: string;
  path: string;
  component: React.ElementType;
  isPrivate: boolean;
  onMenu: boolean;
}

const routes: IRoute[] = [
  {
    title: "home",
    path: "/",
    component: NotFound,
    isPrivate: false,
    onMenu: true,
  },
  {
    title: "Page not founds",
    path: "/*",
    component: NotFound,
    isPrivate: false,
    onMenu: false,
  },
];

export default routes;
