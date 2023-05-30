import { gql } from "@apollo/client";

export const NEW_QUESTION_MUTATION = gql`
  mutation NewQuestion($input: questions_insert_input!) {
    insert_questions_one(object: $input) {
      title
      id
    }
  }
`;
