import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";

import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { store, persistor } from "./redux/app/store";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
