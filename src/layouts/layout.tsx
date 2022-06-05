import { Route, RouteDefinition, Routes, useRoutes } from 'solid-app-router';
import { Component, For, lazy, Show } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import styles from '../assets/css/layout.module.css';
import appRoutes from '../routes';
import TitleLogo from '../assets/image/AppName.svg';


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
    <div class={styles.Layout}>
      <header class={styles.header}>
        <img src={TitleLogo}></img>
      </header>
      <div class={styles.container}>
        <Routes />
      </div>
    </div>
  );
};

export default Layout;
