import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import React from "react";
import { Button, ButtonGroup, Typography} from "@mui/material";

let dataStyles = {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	gap: "0.5rem",
	my: "0.5rem",
}

function toDateStringCustom (date) {
	return date.toLocaleDateString("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};

const OpportunityOverview = ({opp}) => {
	return (
		<div>
			<Typography variant={"h1"}>{opp.title}</Typography>
			<div
				className={"mb-4"}
			>
				{ /* TODO: Fix bug where opp.categories is always null in GraphQL query */ }
				{opp.categories && opp.categories.map((category) => (
					<div
					  className={"inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"}
					  key={category}
					>
						{category.name}
					</div>
				))}
			</div>
			<Typography
				variant={"p"}
				className={"block text-blue-500"}
				sx={dataStyles}
			>
				<CalendarMonthIcon/>
				<b>Date(s): </b>{opp.date}
			</Typography>
			<Typography
				variant={"p"}
				className={"block text-blue-500"}
				sx={dataStyles}
			>
				<LocationOnIcon
				/>
				<b>Location(s): </b>{opp.location}
			</Typography>
			<Typography
				variant={"p"}
				className={"block text-blue-500"}
				sx={dataStyles}
			>
				<MonetizationOnIcon
				/>
				<b>Cost:</b>{" "}
				{opp.cost === 0 ? (
					"Free"
				) : opp.cost ? (
					opp.cost > 0 ? (
						<>${opp.cost}</>
					) : (
						"Stipend Offered, Check Description"
					)
				) : (
					"Check Description"
				)}
			</Typography>
			<Typography
				variant={"p"}
				className={"block text-blue-500"}
				sx={dataStyles}
			>
				<AccessTimeIcon
				/>
				<b>Deadline: </b> {
				// Ugh
				toDateStringCustom(new Date(opp.appDeadline))
			}
			</Typography>
			<Typography variant={"h4"}>Description</Typography>
			<Typography variant={"body1"}>{opp.description}</Typography>
			<div
				className={"flex flex-row justify-between"}
				sx={{fontSize: "0.9rem"}}
			>
				<ButtonGroup
					variant={"contained"}
					color={"primary"}
					aria-label={"contained primary button group"}
				>
					{opp.link && (
						// Apply button
						<Button
							variant={"outlined"}
							color={"primary"}
							sx={{my: 1}}
							onClick={() => {
								window.open(opp.link, "_blank");
							}}
						>
							Apply
						</Button>
					)}
					<Button
						variant={"outlined"}
						color={"primary"}
						sx={{my: 1}}
						onClick={() => {
							alert("TODO: Implement My Opportunities List");
						}}
					>
						Save to My Opportunities
					</Button>
				</ButtonGroup>
			</div>
		</div>
	)
}

export default OpportunityOverview;