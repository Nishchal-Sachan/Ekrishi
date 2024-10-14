import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import apiRequest from "../../lib/apiRequest";

function SinglePage() {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSave = async () => {
    // If currentUser is null, redirect to login
    if (!currentUser) {
      navigate("/login");
      return; // Make sure to exit early if user is not logged in
    }

    setSaved((prev) => !prev); // Optimistic UI update

    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev); // Revert optimistic update on error
    }
  };

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">&#8377; {post.price}</div>
              </div>
            </div>
            <div className="bottom">{post.postDetail.desc}</div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <div className="featureText">
                <span>Water Availablity</span>
                <p>{post.postDetail.water}</p>
              </div>
            </div>

            <div className="feature">
              <div className="featureText">
                <span>Irrigation Support</span>
                <p>{post.postDetail.irrigation}</p>
              </div>
            </div>

            <div className="feature">
              <div className="featureText">
                <span>Crop Insurance Policies</span>
                <p>{post.postDetail.insurance}</p>
              </div>
            </div>
          </div>
          <div className="listHorizontal">
            <div className="feature">
              <div className="featureText">
                <span>Farm Size</span>
                <p>{post.postDetail.size}</p>
              </div>
            </div>
            <div className="feature">
              <div className="featureText">
                <span>Crop Variety</span>
                <p>{post.postDetail.variety}</p>
              </div>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <div className="featureText">
                <span>Farming Assistance Centers</span>
                <p>{post.postDetail.center}</p>
              </div>
            </div>
            <div className="feature">
              <div className="featureText">
                <span>Government Subsidy Office</span>
                <p>{post.postDetail.office}</p>
              </div>
            </div>
            <div className="feature">
              <div className="featureText">
                <span>Farmers' Market</span>
                <p>{post.postDetail.market}</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button onClick={handleSave} style={{
              backgroundColor: saved ? "#fece51" : "white",
            }}>
              <img src="/save.png" alt="" />
              {saved ? "Place Saved" : "Save the Place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
