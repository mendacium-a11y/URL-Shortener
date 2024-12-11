import React, { useState, useEffect, FC } from 'react';
import Route from './RouteComponent'
import Home from '@/pages/Home';

interface RouteObject {
  path: string;
  component: React.ComponentType<any>;
}

interface RouterProps {
  routes: RouteObject[];
}

interface Params {
  [key: string]: string;
}

const Router: FC<RouterProps> = ({ routes }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const getMatchingRoute = () => {
    return routes.find(route => {
      const regex = new RegExp(`^${route.path.replace(/:\w+/g, '([^/]+)')}$`);
      return regex.test(currentPath);
    });
  };

  const match = getMatchingRoute();

  return match ? <Route component={match.component} params={extractParams(match.path, currentPath)} /> : (<Home/ >);
};

const extractParams = (routePath: string, currentPath: string): Params => {
  const routeSegments = routePath.split('/');
  const pathSegments = currentPath.split('/');
  const params: Params = {};

  routeSegments.forEach((segment, index) => {
    if (segment.startsWith(':')) {
      const paramName = segment.slice(1);
      const paramValue = pathSegments[index];
      params[paramName] = paramValue;
    }
  });

  return params;
};

export default Router;