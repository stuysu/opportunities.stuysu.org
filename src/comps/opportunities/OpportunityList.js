import React from "react";
import OpportunityCard from "./OpportunityCard";

/*
	Expected opportunity format:
	id: Int, mandatory
	title: String, mandatory
	date: String, mandatory
	description: String, mandatory
	applicationDeadline: Date, optional
	cost: Int, optional
	opportunityLocation: String, optional
	links: [String], optional
	tags: [String], optional
*/
const OpportunityList = (opportunities) => {
  return (
    <>
      {opportunities?.opportunities?.map((opportunity) => (
        <OpportunityCard
          key={opportunity.id}
          title={opportunity.title}
          date={opportunity.date}
          description={opportunity.description}
          applicationDeadline={opportunity?.applicationDeadline}
          cost={opportunity?.cost}
          opportunityLocation={opportunity?.opportunityLocation}
          links={opportunity?.links}
          tags={opportunity?.tags}
        />
      ))}
    </>
  );
};

export default OpportunityList;
