import React from "react";
import OpportunityCard from "./OpportunityCard";

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
            tags={opportunity?.tags}
          />
        ))}
      </div>
    );
  } else {
    return <h1>No opportunities found.</h1>;
  }
};

export default OpportunityList;
