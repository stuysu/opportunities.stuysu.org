import React from "react";
import OpportunityCard from "./OpportunityCard";
import UserContext from "../context/UserContext";

/*
	Expected opportunity format:
	id: Int, mandatory
	title: String, mandatory
	date: String, optional
	description: String, mandatory
	appDeadline: Date, optional
	cost: Int, optional
	location: String, optional
	link: [String], optional
	tags: [String], optional
*/
const OpportunityList = (data) => {
  const user = React.useContext(UserContext);

  // admin
  const [deleted, setDeleted] = React.useState([]);
  data.opportunities.opportunities = data.opportunities.opportunities.filter(
    (opportunity) => !deleted.includes(opportunity.id)
  );

  if (data?.opportunities?.opportunities.length) {
    return (
      <div>
        {data?.opportunities?.opportunities?.map((opportunity) => (
          <OpportunityCard
            key={opportunity.id}
            id={opportunity.id}
            title={opportunity.title}
            date={opportunity?.date}
            description={opportunity.description}
            appDeadline={opportunity?.appDeadline}
            cost={opportunity?.cost}
            location={opportunity?.location}
            link={opportunity?.link}
            categories={opportunity?.categories}
            eligibilities={opportunity?.eligibilities}
            isAdmin={user.signedIn && user.isFaculty}
            onDelete={() => setDeleted([...deleted, opportunity.id])}
          />
        ))}
      </div>
    );
  } else {
    return <h1>No opportunities found.</h1>;
  }
};

export default OpportunityList;
