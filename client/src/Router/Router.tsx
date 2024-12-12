import React, { useState, useEffect, FC } from "react";
import Route from "./RouteComponent";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";

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
    // checks if navbar and footer are needed to be rendered on this path
    if (match.notShowNavbarFooter) {
      // if notShow is true, returns just the component
      return (
        <Route
        component={match.component}
        params={extractParams(match.path, currentPath)}
        />
      );
    }
    // if notShow is false, then returns navbar and footer with component in middle
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
    // if no matching route is found, renders the home page
    return (
      <>
        <Navbar />
        <Home />
        <Footer />
      </>
    );
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
