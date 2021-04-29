import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import routes from "./routes/routes";
import AppRoute from "./routes/AppRoute";

function App() {
  return (
    <>
        <Router>
          <Switch>
            {routes.map((route) => (
              <AppRoute
                key={route.path}
                path={route.path}
                component={route.component}
                isPrivate={route.isPrivate}
                title={route.title}
                onMenu={route.onMenu}
              />
            ))}
          </Switch>
        </Router>
    </>
  );
}

export default App;
