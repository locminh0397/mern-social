import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./redux/reducers";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const theme = createTheme({
  palette: {
    primary: {
      main: "#0D6EFD",
    },
    secondary: {
      main: "#6C757D",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 991,
      lg: 1200,
      xl: 1536,
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>, document.getElementById('root')
);
