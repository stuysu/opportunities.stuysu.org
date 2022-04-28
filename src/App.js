import "./App.css";
import React from "react"
import Pages from "./pages"

import ThemeProvider from "./comps/context/ThemeProvider";
import ApolloProvider from "./comps/context/ApolloProvider";

function App() {
  return (
    <ApolloProvider>
      <ThemeProvider>
          <Pages />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
