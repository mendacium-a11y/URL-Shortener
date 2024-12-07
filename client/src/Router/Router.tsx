import React, { useState, useEffect, FC } from "react";
import Route from "./RouteComponent";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export interface RouteObject {
  path: string;
  component: React.ComponentType<any>;
  notShowNavbarFooter?: boolean;
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

    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  const getMatchingRoute = () => {
    return routes.find((route) => {
      const regex = new RegExp(`^${route.path.replace(/:\w+/g, "([^/]+)")}$`);
      return regex.test(currentPath);
    });
  };

  const match = getMatchingRoute();
  if (match) {
    if (match.notShowNavbarFooter) {
      return (
        <Route
        component={match.component}
        params={extractParams(match.path, currentPath)}
        />
      );
    }
    return (
      <>
        <Navbar />
        <Route
          component={match.component}
          params={extractParams(match.path, currentPath)}
        />
        <Footer />
      </>
    );
  } else {
    return null;
  }
};

const extractParams = (routePath: string, currentPath: string): Params => {
  const routeSegments = routePath.split("/");
  const pathSegments = currentPath.split("/");
  const params: Params = {};

  routeSegments.forEach((segment, index) => {
    if (segment.startsWith(":")) {
      const paramName = segment.slice(1);
      const paramValue = pathSegments[index];
      params[paramName] = paramValue;
    }
  });

  return params;
};

export default Router;
