import { useSubscription } from "@apollo/client";
import { QUESTIONS_SUBSCRIPTION, IQuestions } from "./queries";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import Error from "../../components/Error";

function Home() {
  const { loading, error, data } = useSubscription<IQuestions>(
    QUESTIONS_SUBSCRIPTION
  );

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  if (data) {
    return (
      <div>
        <h1>Questions</h1>
        {data.questions.map((question) => {
          return (
            <div key={question.id}>
              {" "}
              <Link to={`/q/${question.id}`}>{question.title}</Link>
            </div>
          );
        })}
      </div>
    );
  } else return null;
}

export default Home;
