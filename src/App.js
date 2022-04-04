import "./App.css";
import React from "react"
import Pages from "./pages"

import ThemeProvider from "./comps/context/ThemeProvider";

function App() {
  return (
      <ThemeProvider>
          <Pages />
      </ThemeProvider>
  );
}

export default App;
