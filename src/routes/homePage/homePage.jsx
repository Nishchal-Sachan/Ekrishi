import { useContext } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/authContext";

function HomePage() {
  const { currUser } = useContext(AuthContext);
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Empower Farmers & Get the Best Deals for Your Produce</h1>
          <p>
            Find the right crops to grow, access essential resources,<br />
            and connect directly with buyers—simplifying farming
            and boosting profits.
            <br /><br />
            Join our growing community of farmers and buyers using this platform to sell their produce and make informed decisions
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Experience <br />in Supporting Farmers</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Successful Deals Closed</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Farmers Using the Platform</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/homepagephoto.jpg" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
