import { gql } from "@apollo/client";

export const QUESTIONS_SUBSCRIPTION = gql`
  subscription GetQuestionSub {
    questions(order_by: { id: desc }) {
      id
      title
    }
  }
`;

interface IQuestion {
  id: number;
  title: string;
}

export interface IQuestions {
  questions: IQuestion[];
}
