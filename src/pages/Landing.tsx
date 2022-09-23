import { Link } from "react-router-dom";
import { Logo } from "../components";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";

export const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Chambray tousled hammock enamel pin. Roof party vegan listicle
            williamsburg shaman coloring book prism vice. Roof party health goth
            microdosing four dollar toast, coloring book post-ironic kombucha
            live-edge. Flannel scenester meggings big mood knausgaard
            intelligentsia. Brooklyn leggings vegan cardigan.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};
