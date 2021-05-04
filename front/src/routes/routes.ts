import NotFound from "../pages/NotFound";
import ProjectView from "../pages/Home";
import Match from "../pages/Match";

export interface IRoute {
  title: string;
  path: string;
  component: React.ElementType;
  isPrivate: boolean;
  onMenu: boolean;
}

const routes: IRoute[] = [
  {
    title: "Match",
    path: "/match",
    component: Match,
    isPrivate: false,
    onMenu: false,
  },
  {
    title: "Home",
    path: "/",
    component: ProjectView,
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
