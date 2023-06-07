import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useSubscription } from "@apollo/client";
import {
  QUESTION_DETAIL_SUBSCRIPTION,
  IDetails,
  NEW_VOTE_MUTATION,
  INewVote,
  IVotes,
} from "./queries";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

function Detail() {
  const { id } = useParams();
  const [isVoted, setIsVoted] = useState<boolean>();
  const [selectedOptionID, setSelectedOptionID] = useState<
    number | undefined
  >();

  const { loading, error, data } = useSubscription<IDetails>(
    QUESTION_DETAIL_SUBSCRIPTION,
    {
      variables: { id },
    }
  );

  const [newVote] = useMutation<{ newVote: IVotes }, { input: INewVote }>(
    NEW_VOTE_MUTATION,
    {
      onCompleted: () => {
        setIsVoted(true);
      },
    }
  );

  const handleClickVote = () => {
    if (selectedOptionID) {
      return newVote({
        variables: {
          input: { option_id: selectedOptionID },
        },
      });
    }
  };

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  if (data) {
    const {
      questions_by_pk: { options, title },
    } = data;

    const total = options.reduce(
      (sum, value) => sum + value.votes_aggregate.aggregate.count,
      0
    );

    return (
      <div>
        <h2>{title}</h2>
        <div>
          {options.map((option, i) => {
            return (
              <div key={i}>
                <label htmlFor={i.toString()}>
                  <input
                    type="radio"
                    name="selected"
                    id={i.toString()}
                    value={option.id}
                    onChange={({ target }) =>
                      setSelectedOptionID(Number(target.value))
                    }
                  />
                  <span>{option.title}</span>
                  {isVoted && (
                    <span className="vote_count">
                      (%{" "}
                      {(
                        (option.votes_aggregate.aggregate.count * 100) /
                        (total === 0 ? 1 : total)
                      ).toFixed(2)}
                      )
                    </span>
                  )}
                </label>
                {isVoted && (
                  <progress
                    value={option.votes_aggregate.aggregate.count}
                    max={total}
                  />
                )}
              </div>
            );
          })}
          {!isVoted && <button onClick={handleClickVote}>Vote</button>}
        </div>
      </div>
    );
  } else return null;
}

export default Detail;
