import { Link } from "react-router-dom";
import Card from "../components/shared/Card";

function AboutPage() {
  return (
    <Card>
      <div className="about">
        <h1>About This Project</h1>
        <p>This is a React App to leave feedback for a product or service</p>
        <p>1.0.0</p>
      </div>
      <p>
        <Link to="/">Back To Home</Link>
      </p>
    </Card>
  );
}

export default AboutPage;
