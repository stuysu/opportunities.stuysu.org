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
        You must be logged in to access this page.
      </Typography>
      <br />
      <GoogleLoginButton />
    </div>
  );
};

export default AuthenticationRequired;
