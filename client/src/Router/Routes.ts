import Home from '../pages/Home';
import About from '../pages/About';
import Login from '@/pages/Login';
import type { RouteObject } from './Router';

const routes: RouteObject[] = [
  { path: '/', component: Home},
  { path: '/about', component: About},
  { path: '/login', component: Login},
];

export default routes;
