import React from "react";
//import {Typography, Card,  Divider, Button} from "@mui/material";

function toDateStringCustom (date) {
	return date.toLocaleDateString("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};

import { Box, Card, CardContent, Divider, Link, Typography, Button, Snackbar } from "@mui/material";

import { gql, useMutation } from "@apollo/client";

import ConfirmationDialog from "../ui/ConfirmationDialog.js";

import { Link as DomLink } from "react-router-dom";

const DELETE_MUTATION = gql`
  mutation DeleteOpportunity(
    $id: Int!
  ) {
    deleteOpportunity(id: $id)
  }
`;

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
  id: String, mandatory
  title: String, mandatory
  date: String, mandatory
  description: String, mandatory
  appDeadline: Date, optional
  cost: Int, optional
  location: String, optional
  link: [String], optional
  tags: [String], optional
  isAdmin: [Boolean], optional 
  onDelete: [Function], mandatory
*/
function OpportunityCard({
  id,
  title,
  date,
  description,
  appDeadline,
  cost,
  location,
  link,
  tags,
  isAdmin, 
  onDelete,
}) {
  const [snackbarOpen, setSnackbarOpen] = React.useState("");
  const [confirmDelete, setDelete] = React.useState(false);

  const [deleteOpportunity] = useMutation(DELETE_MUTATION, {
    onCompleted(data) {
      console.log(data);
      setSnackbarOpen("Opportunity Deleted!");
    },
    onError(error) {
      console.log(error);
      setSnackbarOpen(error.message);
    }});

  const [expanded, setExpanded] = React.useState(false);
  // TODO: Date type in GraphQL
  if (appDeadline) appDeadline = new Date(appDeadline);
  return (
	// Testing: just create a div with the title and description
	<a href={`/opportunity/${id}`}>
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
					(appDeadline) ? toDateStringCustom(appDeadline) : "None"
				}
				</Typography>
				<Divider
					sx={{my: 1}}
				/>
				<button
                  style={{
                    color: "#707070",
                    padding: "0px",
                    textAlign: "left",
                    border: "0",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    marginTop: "3px",
                  }}
                  onClick={() => setExpanded(!expanded)}
                >
                  <Typography
                    sx={{
                      "&:hover": { textDecoration: "underline" },
                      fontSize: "14px",
                    }}
                  >
                    {expanded ? "Hide More" : "Read More"}
                  </Typography>
                </button>
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
				{tags.length !== 0 && (
            <>
              <Divider />
              <Box sx={{paddingTop: "8px"}}>
                {tags.map((tag) => (
                    <span
                      style={{
                        backgroundColor: "#546DE5",
                        color: "#FFFFFF",
                        margin: "6px",
                        padding: "0px 8px 2px",
                        borderRadius: "10px",
                      }}
                      key={tag.name}
                    >
                      {tag.name}
                    </span>
                ))}
              </Box>
            </>
          )}
          {isAdmin && (
            <>
              <Divider sx={{ marginTop: "8px" }} />
                <Box sx={{paddingTop: "16px"}}>
                <DomLink to="/admin"
                  state={{id, title, date, description, appDeadline, cost, location, link }}
                >
                  <Button sx={{ marginRight: "16px"}} variant="contained">
                    Edit
                  </Button>
                </DomLink>
                <Button
                  variant="contained"
                  onClick={() => {
                    setDelete(true);
                  }}
                >
                Delete
                </Button>
              </Box>
            </>
          )}
		</Card>
	</a>
  );
}

export default OpportunityCard;
