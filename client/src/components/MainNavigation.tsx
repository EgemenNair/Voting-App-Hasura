import { Link } from "react-router-dom";

function MainNavigation() {
  return (
    <nav>
      <Link to={"/"}>Questions</Link>
      <Link to={"/new"}>New Question</Link>
    </nav>
  );
}

export default MainNavigation;
