import Home from '../pages/Home';
import About from '../pages/About';
import Login from '@/pages/Login';
import type { RouteObject } from './Router';

import Signup from '@/pages/Signup';
import ContributorsPage from '@/pages/ContributorsPage';

const routes: RouteObject[] = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/login', component: Login},
  { path: '/signup', component: Signup},
  {path: '/contributors', component: ContributorsPage}
];

export default routes;
