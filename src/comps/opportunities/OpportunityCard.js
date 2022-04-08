import React from "react";
import { ButtonUnstyled } from "@mui/base";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const responsive = ((width) => {
	if (width < 464) { // mobile
		return {
			cutoffchar: 160
		};
	} else if (width < 1024) { // tablet
		return {
			cutoffchar: 360
		};
	} else if (width < 3000) { // desktop
		return {
			cutoffchar: 480
		};
	} else { // superlargedesktop
		return {
			cutoffchar: 600
		};
	}
});

const useStyles = makeStyles(() => ({
	opportunityCard: {
		margin: "12px"
	},
	secondary: {
		color: "#546DE5"
	},
	bold: {
		fontWeight: "bold"
	},
	descDiv: {
		marginTop: "12px"
	},
	readMore: {
		color: "#707070",
		padding: "0px",
		textAlign: "left",
		border: "0",
		backgroundColor: "transparent",
		cursor: "pointer",
		marginTop: "4px"
	},
	underlined: {
		"&:hover": {
			textDecoration: "underline"
		}
	}
}));

/*
	title: String, mandatory
	date: String, mandatory
	description: String, mandatory
	applicationDeadline: Date, optional
	cost: Int, optional
	opportunityLocation: String, optional
	links: [String], optional
	tags: [String], optional
*/
function OpportunityCard({ title, date, description, applicationDeadline, cost, opportunityLocation, links, tags }) {
	const [expanded, setExpanded] = React.useState(false);
	const classes = useStyles();
	return (
		<Card className={classes.opportunityCard}>
			<CardContent>
				<div>
					<Typography variant={"h5"} fontSize="20px">
						{title}
					</Typography>
					<Typography paragraph fontSize="14px" className={classes.secondary}>
						Date: {date}
						<br />
						{opportunityLocation && (
							<>
								Location: {opportunityLocation}
								<br />
							</>
						)}
						Cost: {cost 
							? ( cost > 0 ? (<>${cost}</>) : ( cost === 0 ? "Free" : "Stipend Offered, Check Description"))
							: "Check Description"
						}
						<br />
						{applicationDeadline && (
							<span className={classes.bold}>
								Application Deadline: {applicationDeadline.toLocaleDateString("en-us", { weekday:"long", year:"numeric", month:"short", day:"numeric"})}
							</span>
						)}
					</Typography>
				</div>
				<Divider />
				<div className={classes.descDiv}>
					{description.length > responsive(window.innerWidth).cutoffchar ?
						<>
							{expanded ? description : description.substring(0, responsive(window.innerWidth).cutoffchar)}...
							<br />
							<ButtonUnstyled className={classes.readMore} onClick={() => setExpanded(!expanded)}>
								<Typography className={classes.underlined}>Read More</Typography>
							</ButtonUnstyled>
						</>
					: <>{description}</>
					}
				</div>
			</CardContent>
		</Card>
	);
}

export default OpportunityCard;
