import React from "react";

const UserContext = React.createContext({
  signedIn: false,
  id: null,
  firstName: "",
  lastName: "",
  email: "",
  gradYear: null,
  isFaculty: false,
});

export default UserContext;
