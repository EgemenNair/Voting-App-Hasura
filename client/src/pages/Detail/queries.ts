import { gql } from "@apollo/client";

export const QUESTION_DETAIL_SUBSCRIPTION = gql`
  subscription GetDetailSub($id: Int!) {
    questions_by_pk(id: $id) {
      title
      options {
        id
        title
        votes_aggregate {
          aggregate {
            count
          }
        }
      }
    }
  }
`;
export const NEW_VOTE_MUTATION = gql`
  mutation NewVote($input: votes_insert_input!) {
    insert_votes_one(object: $input) {
      option {
        title
      }
    }
  }
`;

export interface IVotes {
  id: number;
  option_id: number;
}

export interface INewVote {
  option_id: number;
}

interface IOption {
  id: number;
  title: string;
  votes_aggregate: {
    aggregate: {
      count: number;
    };
  };
}

export interface IDetails {
  questions_by_pk: {
    title: string;
    options: IOption[];
  };
}
