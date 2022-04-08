import React from "react";
import { ButtonUnstyled } from "@mui/base";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const responsive = ((width) => {
	if (width < 464) { // mobile
		return {
			cutoffchar: 160
		};
	} else if (width < 1024) { // tablet
		return {
			cutoffchar: 300
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

const smartSnippet = ((texttocut, snippetmaxlength) => {
	let possiblecutoff = texttocut.indexOf(" ", snippetmaxlength-15);
	return((possiblecutoff === -1 || possiblecutoff > snippetmaxlength) ? (texttocut.substring(0, snippetmaxlength) + "...") : (texttocut.substring(0, possiblecutoff) + "..."));
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
		marginTop: "6px",
		fontSize: "14px"
	},
	readMore: {
		color: "#707070",
		padding: "0px",
		textAlign: "left",
		border: "0",
		backgroundColor: "transparent",
		cursor: "pointer",
		marginTop: "3px"
	},
	linkDiv: {
		margin: "10px 0px 10px"
	},
	underlinedButton: {
		"&:hover": {
			textDecoration: "underline"
		},
		fontSize: "14px"
	},
	tag: {
		backgroundColor: "#546DE5",
		color: "#FFFFFF",
		margin: "6px",
		padding: "0px 5px 2px",
		borderRadius: "10px"
	},
	tagDiv: {
		paddingTop: "8px"
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
					<Typography paragraph marginBottom="8px" fontSize="14px" className={classes.secondary}>
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
					{description.length > responsive(window.innerWidth).cutoffchar
					?	<>
							{expanded ? description : smartSnippet(description, responsive(window.innerWidth).cutoffchar)}
							<br />
							<ButtonUnstyled className={classes.readMore} onClick={() => setExpanded(!expanded)}>
								<Typography className={classes.underlinedButton}>{expanded ? "Hide More" : "Read More"}</Typography>
							</ButtonUnstyled>
						</>
					: <>{description}</>
					}
					{links &&
						<div className={classes.linkDiv}>
							{links && links.map(linkurl => (
								<><Link to={linkurl} key={linkurl}>{linkurl}</Link><br /></>
							))}
						</div>
					}
				</div>
				{tags && 
					<>
						<Divider />
						<div className={classes.tagDiv}>
							{tags.map(tag => (
							<><span className={classes.tag} key={tag.name}>{tag.name}</span></>))}
						</div>
					</>
				}
			</CardContent>
		</Card>
	);
}

export default OpportunityCard;
