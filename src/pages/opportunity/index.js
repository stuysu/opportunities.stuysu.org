import React from "react";
import { Helmet } from "react-helmet";
import OpportunityOverview from "../../comps/opportunities/OpportunityOverview";
import { gql, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import AuthenticationRequired from "../../comps/auth/AuthenticationRequired";
import UserContext from "../../comps/context/UserContext";
import { client } from "../../comps/context/ApolloProvider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const OppContext = React.createContext({});

const QUERY = gql`
  query Opportunity($id: Int!, $userId: Int!) {
    opportunityById(id: $id) {
      id
      title
      description
      categories {
        id
        name
        description
      }
      eligibilities {
        id
        name
        description
      }
      date
      location
      cost
      appDeadline
      link
    }
    isOpportunitySaved(opportunityId: $id, userId: $userId)
  }
`;

// Write a dynamic route for this page
const Opportunity = ({ match, history }) => {
  const user = React.useContext(UserContext);
  let params = useParams();

  const url = parseInt(params.oppId);

  const navigate = useNavigate();

  const { data, loading, error } = useQuery(QUERY, {
    variables: { signedIn: user.signedIn, id: url, userId: user.id },
    client,
    fetchPolicy: "network-only",
  });

  if (!user.signedIn) return <AuthenticationRequired />;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const opp = data.opportunityById;

  return (
    <OppContext.Provider value={{ ...opp, error }}>
      <div>
        <Helmet>
          <title>{opp.title}</title>
        </Helmet>
        <main>
          <ArrowBackIcon
            onClick={() => navigate(-1)}
            className={"opacity-50 hover:opacity-80"}
            style={{ fontSize: 40, cursor: "pointer", transition: "all 300ms" }}
          />
          <OpportunityOverview
            opp={opp}
            savedStatus={data.isOpportunitySaved}
          />
        </main>
      </div>
    </OppContext.Provider>
  );
};

export default Opportunity;
