import { Link, useRouteError } from "react-router-dom";
import img from "../assets/images/not-found.svg";
import Wrapper from "../assets/wrappers/ErrorPage";

export const Error = () => {
  const error = useRouteError();
  console.log(error, "error");

  return (
    <Wrapper className="full-page">
      <div>
        <img src={img} alt="not found" />
        <h3>oops</h3>
        <p>This page does not exist</p>
        <Link to="/">back home</Link>
      </div>
    </Wrapper>
  );
};
