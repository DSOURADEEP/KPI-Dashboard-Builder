import { gql } from "@apollo/client";

export const GET_DASHBOARDS = gql`
  query GetDashboards {
    dashboards {
      id
      title
      widgets {
        id
        type
        sqlQuery
        layout
      }
    }
  }
`;

