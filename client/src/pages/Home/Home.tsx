import { useSubscription } from "@apollo/client";
import { QUESTIONS_SUBSCRIPTION } from "./queries";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";

interface IQuestion {
  id: number;
  title: string;
  __typename: string;
}

function Home() {
  const { loading, data } = useSubscription(QUESTIONS_SUBSCRIPTION);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h1>Questions</h1>
      {data.questions.map((question: IQuestion) => {
        return (
          <div key={question.id}>
            {" "}
            <Link to={`/q/${question.id}`}>{question.title}</Link>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
