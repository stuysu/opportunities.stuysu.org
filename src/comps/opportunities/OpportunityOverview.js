import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Button, ButtonGroup, Typography } from "@mui/material";
import UserContext from "../context/UserContext";
import toDateStringCustom from "../../util/toDateStringCustom.js";
import { useNavigate } from "react-router-dom";

let dataStyles = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "0.5rem",
  my: "0.5rem",
};

const SAVE_OPP_MUTATION = gql`
  mutation saveOpportunity($opportunityId: Int!, $userId: Int!) {
    saveOpportunity(opportunityId: $opportunityId, userId: $userId)
  }
`;

const UNSAVE_OPP_MUTATION = gql`
  mutation unsaveOpportunity($opportunityId: Int!, $userId: Int!) {
    unsaveOpportunity(opportunityId: $opportunityId, userId: $userId)
  }
`;

const OpportunityOverview = ({ opp, savedStatus }) => {
  const user = React.useContext(UserContext);
  const [oppSaved, setOppSaved] = React.useState(savedStatus);
  const [saveOpportunity] = useMutation(SAVE_OPP_MUTATION, {
    onCompleted() {
      setOppSaved(true);
      alert("Opportunity saved successfully!");
    },
    onError(error) {
      alert(error.message);
    },
  });
  const [unsaveOpportunity] = useMutation(UNSAVE_OPP_MUTATION, {
    onCompleted() {
      setOppSaved(false);
      alert("Opportunity unsaved successfully!");
    },
    onError(error) {
      alert(error.message);
    },
  });
  let appDeadline = opp.appDeadline;
  if (appDeadline) appDeadline = new Date(appDeadline);

  const navigate = useNavigate();

  return (
    <div>
      <Button
        variant={"outlined"}
        color={"primary"}
        sx={{ my: 1 }}
        onClick={() => {
          navigate("/catalog");
        }}
      >
        BACK TO CATALOG
      </Button>
      <Typography variant={"h1"}>{opp.title}</Typography>
      <div className={"mb-4"}>
        {/* TODO: Fix bug where opp.categories is always null in GraphQL query */}
        {opp.categories &&
          opp.categories.map((category) => (
            <div
              className={
                "inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
              }
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
        <CalendarMonthIcon />
        <b>Date(s): </b>
        {opp.date}
      </Typography>
      <Typography
        variant={"p"}
        className={"block text-blue-500"}
        sx={dataStyles}
      >
        <LocationOnIcon />
        <b>Location(s): </b>
        {opp.location}
      </Typography>
      <Typography
        variant={"p"}
        className={"block text-blue-500"}
        sx={dataStyles}
      >
        <MonetizationOnIcon />
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
        sx={dataStyles}
        className={"text-blue-500 block"}
      >
        <AccessTimeIcon />
        <b>Deadline:</b>{" "}
        {appDeadline
          ? appDeadline.getFullYear() <= 1970
            ? "Rolling Basis"
            : toDateStringCustom(appDeadline)
          : "None"}
      </Typography>
      <Typography variant={"h4"}>Description</Typography>
      <Typography variant={"body1"}>{opp.description}</Typography>
      <div
        className={"flex flex-row justify-between"}
        sx={{ fontSize: "0.9rem" }}
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
              sx={{ my: 1 }}
              onClick={() => {
                window.open(opp.link, "_blank");
              }}
            >
              Apply
            </Button>
          )}
          {oppSaved ? (
            <Button
              variant={"outlined"}
              color={"primary"}
              sx={{ my: 1 }}
              onClick={() => {
                console.log("Unsaving Opportunity...");
                unsaveOpportunity({
                  variables: { userId: user.id, opportunityId: opp.id },
                });
              }}
            >
              Remove from My Saved Opportunities
            </Button>
          ) : (
            <Button
              variant={"outlined"}
              color={"primary"}
              sx={{ my: 1 }}
              onClick={() => {
                console.log("Saving Opportunity...");
                saveOpportunity({
                  variables: { userId: user.id, opportunityId: opp.id },
                });
              }}
            >
              Save to My Opportunities
            </Button>
          )}
        </ButtonGroup>
      </div>
    </div>
  );
};

export default OpportunityOverview;
