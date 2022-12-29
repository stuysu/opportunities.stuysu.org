import React from "react";
import { Box, Card, CardContent, Divider, Link, Typography, Button, Snackbar } from "@mui/material";

import { gql, useMutation } from "@apollo/client";

const DELETE_MUTATION = gql`
  mutation CreateOpportunity(
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
}) {
  const [snackbarOpen, setSnackbarOpen] = React.useState("");

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
    <div>
      <Card sx={{ margin: "12px" }}>
        <CardContent>
          <div>
            <Typography variant={"h5"} fontSize="20px">
              {title}
            </Typography>
            <Typography
              paragraph
              marginBottom="8px"
              fontSize="14px"
              sx={{ color: "#546DE5" }}
            >
              Date: {date}
              <br />
              {location && (
                <>
                  Location: {location}
                  <br />
                </>
              )}
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
              <br />
              {appDeadline && (
                <span style={{ fontWeight: "bold" }}>
                  Application Deadline:{" "}
                  {appDeadline.toLocaleDateString("en-us", {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    timeZone: "UTC", // TODO: Temporary fix
                  })}
                </span>
              )}
            </Typography>
          </div>
          <Divider />
          <div style={{ margin: "6px 0px 10px", fontSize: "14px" }}>
            {description.length > responsive(window.innerWidth).cutoffchar ? (
              <>
                {expanded
                  ? description
                  : smartSnippet(
                      description,
                      responsive(window.innerWidth).cutoffchar
                    )}
                <br />
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
              </>
            ) : (
              <>{description}</>
            )}
            {link && (
              <div style={{ margin: "10px 0px 10px" }}>
                <>
                  <Link href={link} target="_blank" rel="noreferrer" key={link}>
                    {link}
                  </Link>
                  <br />
                </>
              </div>
            )}
          </div>
          {tags.length != 0 && (
            <>
              <Divider />
              <Box sx={{paddingTop: "8px"}}>
                {tags.map((tag) => (
                  <>
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
                  </>
                ))}
              </Box>
            </>
          )}
          {isAdmin && (
            <>
              <Divider sx={{ marginTop: "8px" }} />
                <Box sx={{paddingTop: "16px"}}>
                <Button sx={{ marginRight: "16px"}}
                  variant="contained"
                >
                Edit
                </Button>
                <Button
                  variant="contained"
                  onClick={async () => {
                    await deleteOpportunity({
                      variables: {
                        id: parseInt(id),
                      }
                    })
                  }}
                >
                Delete
                </Button>
              </Box>
            </>
          )}
        </CardContent>
        
      </Card>
      <Snackbar
        autoHideDuration={2000}
        open={snackbarOpen.length > 0}
        onClose={() => setSnackbarOpen("")}
        message={snackbarOpen}
      />
    </div>
  );
}

export default OpportunityCard;
