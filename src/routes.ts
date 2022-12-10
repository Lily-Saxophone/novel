import ScenarioPage from './pages/scenario/scenario';
import Scene from './pages/scene/Scene';

const appRoutes = [
  {
    path: "/",
    component: Scene,
  },
  {
    path: "/scenario",
    component: ScenarioPage
  }
];

export default appRoutes;
