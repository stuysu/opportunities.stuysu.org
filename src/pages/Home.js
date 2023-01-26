import React, {useContext} from "react";
import {Helmet} from "react-helmet";
import UserHome from "../comps/home/UserHome";
import UnauthenticatedLanding from "../comps/home/UnauthenticatedLanding";
import UserContext from "../comps/context/UserContext";
import {Box, Typography, Link, Grid} from "@mui/material";
import opportunities from "../img/vector/goodstudio-reaching-for-opportunities.svg";

// TEMP BECAUSE MATERIAL UI IS GARBAGE
let textBlockStyles = {
	marginTop: "1rem",
}
let textCell = "px-4 py-0";

const Home = () => {
	const user = useContext(UserContext);
	return (
		<div>
			<Helmet>
				<title>Home</title>
			</Helmet>
			<div
				className="inline-block"
			>
				<Grid
					container
					className={"py-4"}
				>
					<Grid item xs={12} md={6} className={textCell}>
						<img
							className={"max-w-[80vw] w-[400px] p-4"}
							src={
								opportunities
							}
							alt={"opportunities"}
						/>
					</Grid>
					<Grid item xs={12} md={6} className={textCell}>
						<Typography
							variant={"h1"}
							className={"text-center md:text-left text-2xl md:text-3xl lg:text-4xl font-bold inline-block"}
							style={textBlockStyles}
						>
							Welcome to the Stuyvesant Opportunities Bulletin!
						</Typography>
						<Typography
							variant={"p"}
							className={"text-center md:text-left inline-block"}
							style={textBlockStyles}
						>
							The largest compendium of opportunities for Stuyvesant students to
							learn, grow, and explore.
						</Typography>
						<Typography
							variant={"p"}
							className={"text-center md:text-left inline-block"}
							style={textBlockStyles}
						>
							If you're not a Stuyvesant student, staff, or faculty member, you will still be able to
							browse our website, but your features will be limited.
						</Typography>
						<Typography
							variant={"p"}
							className={"text-center md:text-left inline-block"}
							style={textBlockStyles}
						>
							To learn more about our website and the fabulous people who made it,
							you can visit our <Link href={"/about"}>About</Link> page.
						</Typography>
					</Grid>
				</Grid>
				{user.signedIn ? <UserHome /> : <UnauthenticatedLanding />}
			</div>
		</div>
);
};

export default Home;
