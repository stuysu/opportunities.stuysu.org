import React, { useEffect, useRef, useState } from "react";

import { gql, useMutation } from "@apollo/client";

import { GOOGLE_LOGIN_CLIENT_ID } from "../../constants";

import { CircularProgress } from "@mui/material";

//import UserContext from "../context/UserContext";

const LOGIN_WITH_GOOGLE = gql`
  mutation loginWithGoogle($token: String!) {
    loginWithGoogle(googleOAuthToken: $token)
  }
`;

const GoogleLoginButton = () => {
  //const user = useContext(UserContext);
  const ref = useRef(null);
  const [loginWithGoogle, { loading }] = useMutation(LOGIN_WITH_GOOGLE);
  const [loadedGoogleScript, setLoadedGoogleScript] = useState("loading");
  const [initializedGoogleScript, setInitializedGoogleScript] = useState(false);
  const attemptLogin = React.useCallback(
    async ({ token, profile }) => {
      try {
        const { data } = await loginWithGoogle({ variables: { token } });
        //console.log(data);
        window.localStorage.setItem("auth-jwt", data.loginWithGoogle);
        //user.refetch(); - doesn't work
        window.location.reload();
      } catch (er) {}
    },
    [loginWithGoogle]
  );
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = () => {
      setLoadedGoogleScript("ready");
    };
    document.body.appendChild(script);
  });
  useEffect(() => {
    if (loadedGoogleScript === "ready") {
      const callback = (response) => {
        //console.log(response);
        //console.log(response.credential);
        const profile = JSON.parse(atob(response.credential.split(".")[1]));
        //console.log(profile);
        attemptLogin({ token: response.credential, profile });
      };
      window.google.accounts.id.initialize({
        client_id: GOOGLE_LOGIN_CLIENT_ID,
        callback,
        cancel_on_tap_outside: true,
      });
      window.google.accounts.id.prompt(); // one tap dialog https://developers.google.com/identity/gsi/web/guides/display-button#javascript
      setInitializedGoogleScript(true);
    }
  }, [attemptLogin, loadedGoogleScript]);
  useEffect(() => {
    if (initializedGoogleScript && ref.current) {
      window.google.accounts.id.renderButton(ref.current, {
        type: "standard",
        size: "large",
      });
    }
  });
  return (
    <div>
      {loading || !initializedGoogleScript ? (
        <CircularProgress />
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }} ref={ref} />
      )}
    </div>
  );
};

export default GoogleLoginButton;
