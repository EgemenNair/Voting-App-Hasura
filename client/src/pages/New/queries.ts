import { gql } from "@apollo/client";

export const NEW_QUESTION_MUTATION = gql`
  mutation NewQuestion($input: questions_insert_input!) {
    insert_questions_one(object: $input) {
      title
      id
    }
  }
`;

interface IOption {
  id: number;
  title: string;
  question_id: number;
  votes: {
    id: number;
    title: string;
    question_id: number;
  };
}

export interface IQuestions {
  id: number;
  title: string;
  options: IOption[];
}

export interface IAddQuestion {
  title: string;
  options: IOption[];
}
