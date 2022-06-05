/* @refresh reload */
import { Router } from 'solid-app-router';
import { render } from 'solid-js/web';

import './index.css';
import Layout from './layouts/layout';

render(
  () => (
    <Router>
      <Layout />
    </Router>
  ),
  document.getElementById('root') as HTMLElement
);
