import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($email: String!, $role: String!) {
    createUser(email: $email, role: $role) {
      id
      email
      role
    }
  }
`;

export const CREATE_DASHBOARD = gql`
  mutation CreateDashboard($title: String!, $userId: Int!) {
    createDashboard(title: $title, userId: $userId) {
      id
      title
    }
  }
`;

export const CREATE_WIDGET = gql`
  mutation CreateWidget($type: String!, $sqlQuery: String!, $layout: String!, $dashboardId: Int!) {
    createWidget(type: $type, sqlQuery: $sqlQuery, layout: $layout, dashboardId: $dashboardId) {
      id
      type
      sqlQuery
      layout
    }
  }
`;
