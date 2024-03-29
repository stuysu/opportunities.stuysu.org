import React from "react";
import {
  Box,
  Card,
  Divider,
  Typography,
  Button,
  Snackbar,
} from "@mui/material";
import { gql, useMutation } from "@apollo/client";
import ConfirmationDialog from "../ui/ConfirmationDialog.js";
import { Link as DomLink, useNavigate } from "react-router-dom";
import toDateStringCustom from "../../util/toDateStringCustom.js";

const DELETE_MUTATION = gql`
  mutation DeleteOpportunity($id: Int!) {
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

const smartSnippet = (texttocut, snippetmaxlength, expanded) => {
  if (expanded) {
    return texttocut;
  }
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
  categories: [String], optional
  eligibilities: [String], optional
  isAdmin: [Boolean], optional 
  onDelete: [Function], mandatory
  archived: [Boolean], optional
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
  categories,
  eligibilities,
  isAdmin,
  onDelete,
  archived,
}) {
  const [snackbarOpen, setSnackbarOpen] = React.useState("");
  const [confirmDelete, setDelete] = React.useState(false);
  const [onSubButton, setOnSubButton] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const [deleteOpportunity] = useMutation(DELETE_MUTATION, {
    onCompleted(data) {
      console.log(data);
      setSnackbarOpen("Opportunity Deleted!");
    },
    onError(error) {
      console.log(error);
      setSnackbarOpen(error.message);
    },
  });

  if (appDeadline) appDeadline = new Date(appDeadline);
  if (id === 16) {
    console.log(appDeadline);
  }
  const category_names = categories?.map((a) => a.name);
  const eligibility_names = eligibilities?.map((a) => a.name);

  const navigate = useNavigate();

  const redirectOnClick = () => {
    if (!onSubButton) {
      navigate(`/opportunity/${id}`);
    }
  };

  return (
    <div>
      <Card
        className={"w-full p-4 my-3 rounded-sm shadow-lg"}
        onClick={redirectOnClick}
        sx={{ cursor: "pointer" }}
      >
        <Typography
          variant={"h5"}
          sx={{ fontWeight: "bold", fontSize: "1.3rem" }}
        >
          {title}
        </Typography>
        <Typography
          variant={"p"}
          sx={{ fontSize: "0.9rem" }}
          className={"text-blue-500 block"}
        >
          Date: {date}
        </Typography>
        <Typography
          variant={"p"}
          sx={{ fontSize: "0.9rem" }}
          className={"text-blue-500 block"}
        >
          Location: {location}
        </Typography>
        <Typography
          variant={"p"}
          sx={{ fontSize: "0.9rem" }}
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
          sx={{ fontSize: "0.9rem", fontWeight: "bold" }}
          className={"text-blue-500 block"}
        >
          Deadline:{" "}
          {appDeadline
            ? appDeadline.getFullYear() <= 1970
              ? "Rolling Basis"
              : toDateStringCustom(appDeadline)
            : "None"}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <div
          className={"flex flex-row justify-between"}
          sx={{ fontSize: "0.9rem" }}
        >
          {description.length > responsive(window.innerWidth).cutoffchar ? (
            <>
              {smartSnippet(
                description,
                responsive(window.innerWidth).cutoffchar,
                expanded
              )}
              <br />
            </>
          ) : (
            <>{description}</>
          )}
        </div>
        {description.length > responsive(window.innerWidth).cutoffchar && (
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
            onMouseEnter={() => setOnSubButton(true)}
            onMouseLeave={() => setOnSubButton(false)}
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
        )}
        <div
          className={"flex flex-row justify-between"}
          sx={{ fontSize: "0.9rem" }}
        >
          {link && (
            // Apply button
            <Button
              variant={"outlined"}
              color={"primary"}
              sx={{ my: 1 }}
              onClick={() => {
                window.open(link, "_blank");
              }}
              onMouseEnter={() => setOnSubButton(true)}
              onMouseLeave={() => setOnSubButton(false)}
            >
              Apply
            </Button>
          )}
        </div>
        {
          <>
            <Divider />
            <Box sx={{ paddingTop: "8px" }}>
              {categories?.map((category) => (
                <>
                  <span
                    style={{
                      backgroundColor: "#546DE5",
                      color: "#FFFFFF",
                      margin: "6px",
                      padding: "0px 8px 2px",
                      borderRadius: "10px",
                    }}
                    key={category.name}
                  >
                    {category.name.replace(" ", "\u00a0")}
                  </span>
                  {/* zero width space moment */}
                  &#x200B;
                </>
              ))}
              &#x200B;
              {eligibilities?.map((eligibility) => (
                <>
                  <span
                    style={{
                      backgroundColor: "#58943A",
                      color: "#FFFFFF",
                      margin: "6px",
                      padding: "0px 8px 2px",
                      borderRadius: "10px",
                    }}
                    key={eligibility.name}
                  >
                    {eligibility.name.replace(" ", "\u00a0")}
                  </span>
                  {/* zero width space moment */}
                  &#x200B;
                </>
              ))}
            </Box>
          </>
        }
        {isAdmin && (
          <>
            <Divider sx={{ marginTop: "8px" }} />
            <Box sx={{ paddingTop: "16px" }}>
              <DomLink
                to="/admin"
                state={{
                  id,
                  title,
                  date,
                  description,
                  appDeadline,
                  cost,
                  location,
                  link,
                  archived,
                  categories: category_names,
                  eligibilities: eligibility_names,
                }}
              >
                <Button
                  sx={{ marginRight: "16px" }}
                  variant="contained"
                  onMouseEnter={() => setOnSubButton(true)}
                  onMouseLeave={() => setOnSubButton(false)}
                >
                  Edit
                </Button>
              </DomLink>
              <Button
                variant="contained"
                onMouseEnter={() => setOnSubButton(true)}
                onMouseLeave={() => setOnSubButton(false)}
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
      <Snackbar
        autoHideDuration={2000}
        open={snackbarOpen.length > 0}
        onClose={() => setSnackbarOpen("")}
        message={snackbarOpen}
      />
      <ConfirmationDialog
        title={"Delete this Opportunity?"}
        description={"We cannot recover it once deleted."}
        open={confirmDelete}
        onClose={() => {
          setDelete(false);
        }}
        onConfirm={async () => {
          await deleteOpportunity({
            variables: {
              id: parseInt(id),
            },
          });
          onDelete();
        }}
      />
    </div>
  );
}

export default OpportunityCard;
