import React, {useEffect, useRef, useState} from "react";

import {GOOGLE_LOGIN_CLIENT_ID} from "../../constants";

const GoogleLoginButton = ({}) => {
	const ref = useRef(null);
	const [loadedGoogleScript, setLoadedGoogleScript] = useState("loading");
	const [initializedGoogleScript, setInitializedGoogleScript] = useState(false);
	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://accounts.google.com/gsi/client";
		script.async = true;
		script.onload = (() => {setLoadedGoogleScript("ready")});
		document.body.appendChild(script);
	});
	useEffect(() => {
		if(loadedGoogleScript === "ready"){
			const callback = (response) => {
				//console.log(response);
				//console.log(response.credential);
				const profile = JSON.parse(atob(response.credential.split(".")[1]));
				console.log(profile);
			};
			window.google.accounts.id.initialize({
				client_id: GOOGLE_LOGIN_CLIENT_ID,
				callback,
				cancel_on_tap_outside: true
			});
			window.google.accounts.id.prompt(); // one tap dialog https://developers.google.com/identity/gsi/web/guides/display-button#javascript
			setInitializedGoogleScript(true);
		}
	}, [loadedGoogleScript]);
	useEffect(() => {
		if(initializedGoogleScript && ref.current){
			window.google.accounts.id.renderButton(ref.current, {
				type: "standard",
				size: "large"
			});
		}
	});
	return(
		<div>
			<div style={{display: "flex", justifyContent: "center"}} ref={ref} />
		</div>
	);
};

export default GoogleLoginButton;
