import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import routes from "./routes/routes";
import AppRoute from "./routes/AppRoute";
import { AuthProvider } from "./contexts/authContext";

export const API_URL = "http://localhost:8080";

function App() {
  if (localStorage.getItem("authorization")) {
  }

  return (
    <>
      <AuthProvider>
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
      </AuthProvider>
    </>
  );
}

export default App;
