import { gql } from "@apollo/client";

export const QUESTIONS_SUBSCRIPTION = gql`
  subscription GetQuestionSub {
    questions(order_by: { id: desc }) {
      id
      title
    }
  }
`;
