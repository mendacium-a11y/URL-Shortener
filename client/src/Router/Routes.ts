import Home from '../pages/Home';
import About from '../pages/About';
import Login from '@/pages/Login';
import type { RouteObject } from './Router';

const routes: RouteObject[] = [
  { path: '/', component: Home},
  { path: '/about', component: About},
  { path: '/login', component: Login},
  { path: '/r/:id', component: Redirect, notShowNavbarFooter: true}
];

// added flag nowShowNavbarFooter above in "redirect" path 
// this flag means this path doesnt need to render navbar and footer

export default routes;
