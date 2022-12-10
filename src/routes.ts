import Yamamo from './pages/yamamo/yamamo';
import Scene from './pages/scene/Scene';

const appRoutes = [
  {
    path: "/",
    component: Scene,
  },
  {
    path: "/yamamo",
    component: Yamamo
  }
];

export default appRoutes;
