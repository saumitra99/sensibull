import React, { lazy, Suspense } from "react";
import Header from "./components/header";
import PageLoader from "./components/PageLoader";
import {
  // BrowserRouter,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
import("./common.scss");

const StockPage = lazy(() => import("./containers/StockPage"));
const QuotesPage = lazy(() => import("./containers/QuotesPage"));

function Routes() {
  const routes = [
    {
      id: 1,
      component: StockPage,
      path: "/stocks",
    },
    {
      id: 2,
      component: QuotesPage,
      path: "/quotes",
    },
  ];
  return (
    <div>
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Header>
            {routes.map((route) => (
              <Route
                key={route.id}
                path={route.path}
                exact
                component={route.component}
              />
            ))}
            <Route path="/" exact>
              <Redirect to="/stocks" />
            </Route>
          </Header>
        </Switch>
      </Suspense>
    </div>
  );
}

export default Routes;
