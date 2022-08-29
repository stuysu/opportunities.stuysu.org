import React from "react";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";

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
function OpportunityCard({
  title,
  date,
  description,
  appDeadline,
  cost,
  location,
  link,
  tags,
}) {
  const [expanded, setExpanded] = React.useState(false);
  // TODO: Date type in GraphQL
  if (appDeadline) appDeadline = new Date(appDeadline);
  return (
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
                <Link to={link} key={link}>
                  {link}
                </Link>
                <br />
              </>
            </div>
          )}
        </div>
        {tags && (
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
      </CardContent>
    </Card>
  );
}

export default OpportunityCard;
