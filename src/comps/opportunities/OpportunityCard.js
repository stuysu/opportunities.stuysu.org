import React, { useState } from "react";
import { Card, CardContent, Collapse, Divider, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
	secondary: {
		color: "#546DE5"
	},
	bold: {
		fontWeight: "bold"
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
		<Card>
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
							? ( cost > 0 ? (<>${cost}</>) : ( cost == 0 ? "Free" : "Stipend Offered, Check Description"))
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
				<div>
					{description.slice(0, description.length-100)}
					<Collapse in={expanded} timeout="auto" unmountOnExit>
					</Collapse>
				</div>
			</CardContent>
		</Card>
	);
}

export default OpportunityCard;
