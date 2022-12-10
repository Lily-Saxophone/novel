import { RouteDefinition, useRoutes } from 'solid-app-router';
import { Component } from 'solid-js';

import styles from '../assets/css/layout.module.css';
import appRoutes from '../routes';
import TitleLogo from '../assets/image/AppName.svg';
import StoryProvider from '../providers/storyProvider';

const layoutRoutes = (): RouteDefinition[] => {
  let routes: RouteDefinition[] = [];
  appRoutes.forEach(element => {
    routes.push({ path: element.path, component: element.component })
  });

  return routes;
}

const Layout: Component = () => {
  const Routes = useRoutes(layoutRoutes());
  return (
    <StoryProvider story={0}>
      <div class={styles.Layout}>
        <header class={styles.header}>
          <img src={TitleLogo}></img>
          <nav>
            <a href="/">Scene</a>
            <a href="/scenario">Scenario</a>
            <a href="/ponnu">Ponnu</a>
          </nav>
        </header>
        <div class={styles.container}>
          <Routes />
        </div>
      </div>
    </StoryProvider>
  );
};

export default Layout;
