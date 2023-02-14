import { Typography } from "@mui/material";

import GoogleLoginButton from "./GoogleLoginButton";

const AuthenticationRequired = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography style={{ textAlign: "center", paddingBottom: "10px" }}>
        You must be logged in with a <code>stuy.edu</code> or a{" "}
        <code>stuysu.org</code> email to access this page.
      </Typography>
      <br />
      <GoogleLoginButton />
    </div>
  );
};

export default AuthenticationRequired;
