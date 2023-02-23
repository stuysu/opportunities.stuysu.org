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
import { Link as DomLink } from "react-router-dom";

function toDateStringCustom(date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

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
  categories: [String], optional
  eligibilities: [String], optional
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
  categories,
  eligibilities,
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
    },
  });

  if (appDeadline) appDeadline = new Date(appDeadline);
  if (id === 16) {
    console.log(appDeadline);
  }
  const category_names = categories?.map((a) => a.name);
  const eligibility_names = eligibilities?.map((a) => a.name);

  return (
    // Testing: just create a div with the title and description
    <a href={`/opportunity/${id}`}>
      <Card className={"w-full p-4 my-3 rounded-sm shadow-lg"}>
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
                responsive(window.innerWidth).cutoffchar
              )}
              <br />
            </>
          ) : (
            <>{description}</>
          )}
        </div>
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
                  {category.name}
                </span>
              ))}
              {eligibilities?.map((eligibility) => (
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
                  {eligibility.name}
                </span>
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
                  categories: category_names,
                  eligibilities: eligibility_names,
                }}
              >
                <Button sx={{ marginRight: "16px" }} variant="contained">
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
    </a>
  );
}

export default OpportunityCard;
