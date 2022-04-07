import React, { useState } from "react";
import { Card, CardContent, Collapse, Divider, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
	secondary: {
		color: "#546DE5"
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
					<Typography variant={"h5"}>
						{title}
					</Typography>
					<Typography paragraph className={classes.secondary}>
						{date}
						<br />
						{opportunityLocation && (
							<>
								Location: {opportunityLocation}
								<br />
							</>
						)}
						{applicationDeadline && (
							<span>
							</span>
						)}
					</Typography>
				</div>
				<Divider />
				<Collapse in={expanded} timeout="auto" unmountOnExit>
				</Collapse>
			</CardContent>
		</Card>
	);
}

export default OpportunityCard;
