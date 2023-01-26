import React from "react";
import {Typography, Card,  Divider, Button} from "@mui/material";

const responsive = (width) => {
	if (width < 464) {
		// mobile
		return {
			cutoffchar: 160,
		};
	} else if (width < 1024) {
		// tablet
		return {
			cutoffchar: 300,
		};
	} else if (width < 3000) {
		// desktop
		return {
			cutoffchar: 480,
		};
	} else {
		// superlargedesktop
		return {
			cutoffchar: 600,
		};
	}
};

const smartSnippet = (texttocut, snippetmaxlength) => {
	let possiblecutoff = texttocut.indexOf(" ", snippetmaxlength - 15);
	return possiblecutoff === -1 || possiblecutoff > snippetmaxlength
		? texttocut.substring(0, snippetmaxlength) + "..."
		: texttocut.substring(0, possiblecutoff) + "...";
};

/*
  title: String, mandatory
  date: String, mandatory
  description: String, mandatory
  appDeadline: Date, optional
  cost: Int, optional
  location: String, optional
  link: [String], optional
  tags: [String], optional
*/
function OpportunityCard({id, title, date, description, appDeadline, cost, location, link, tags}) {
	// TODO: Date type in GraphQL
	if (appDeadline) appDeadline = new Date(appDeadline);
	return (
		// Testing: just create a div with the title and description
		<a
			href={`/opportunity/${id}`}
    >
			<Card
				className={"w-full p-4 my-3 rounded-sm shadow-lg"}
			>
				<Typography
					variant={"h5"}
					sx={{fontWeight: "bold", fontSize: "1.3rem"}}
				>{title}
				</Typography>
				<Typography
					variant={"p"}
					sx={{fontSize: "0.9rem"}}
					className={"text-blue-500 block"}
				>
					{date}
				</Typography>
				<Typography
					variant={"p"}
					sx={{fontSize: "0.9rem"}}
					className={"text-blue-500 block"}
				>
					Location: {location}
				</Typography>
				<Typography
					variant={"p"}
					sx={{fontSize: "0.9rem"}}
					className={"text-blue-500 block"}
				>
					Cost:{" "}
					{cost === 0 ? (
						"Free"
					) : cost ? (
						cost > 0 ? (
							<>${cost}</>
						) : (
							"Stipend Offered, Check Description"
						)
					) : (
						"Check Description"
					)}
				</Typography>
				<Typography
					variant={"p"}
					sx={{fontSize: "0.9rem", fontWeight: "bold"}}
					className={"text-blue-500 block"}
				>
					Deadline: {
					(appDeadline) ? appDeadline.toDateStringCustom() : "None"
				}
				</Typography>
				<Divider
					sx={{my: 1}}
				/>
				<Typography
					variant={"p"}
					sx={{fontSize: "0.9rem"}}
					className={"block"}
				>
					{smartSnippet(description, responsive(window.innerWidth).cutoffchar)}
				</Typography>
				<div
					className={"flex flex-row justify-between"}
					sx={{fontSize: "0.9rem"}}
				>
					{link && (
						// Apply button
						<Button
							variant={"outlined"}
							color={"primary"}
							sx={{my: 1}}
							onClick={() => {
								window.open(link, "_blank");
							}}
						>
							Apply
						</Button>
					)}
				</div>
			</Card>
		</a>
	);
}

export default OpportunityCard;
