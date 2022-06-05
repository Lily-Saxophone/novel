import type { Component } from 'solid-js';

import styles from '../assets/css/layout.module.css';

const Layout: Component = () => {
  return (
    <div class={styles.Layout}>
      <header class={styles.header}></header>
      <div class={styles.container}></div>
    </div>
  );
};

export default Layout;
