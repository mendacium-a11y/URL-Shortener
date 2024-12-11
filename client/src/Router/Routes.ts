import Home from '../pages/Home';
import About from '../pages/About';
import Login from '@/pages/Login';

import Signup from '@/pages/Signup';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/login', component: Login},
  { path: '/signup', component: Signup}
];

export default routes;
