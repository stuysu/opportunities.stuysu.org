import "./tailwind.css";
import React from "react";
import Pages from "./pages";

import { ThemeProvider } from "./comps/context/ThemeProvider";
import ApolloProvider from "./comps/context/ApolloProvider";
import UserProvider from "./comps/context/UserProvider";

function App() {
  return (
    <ApolloProvider>
      <ThemeProvider>
        <UserProvider>
          <Pages />
        </UserProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
