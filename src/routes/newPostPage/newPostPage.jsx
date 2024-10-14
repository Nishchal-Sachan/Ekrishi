import { useState } from "react";
import "./newPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import UploadWidget from "../../components/uploadWidget/uploadWidget";
import { useNavigate } from "react-router-dom";

function NewPostPage() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const res = await axios.post("http://localhost:8080/api/posts", {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price),
          address: inputs.address,
          region: inputs.region,
          lattitude: inputs.lattitude,
          longitude: inputs.longitude,
          type: inputs.type,
          grade: inputs.grade
        },
        postDetail: {
          desc: value,
          water: inputs.water,
          irrigation: inputs.irrigation,
          insurance: inputs.insurance,  // Fix the input name here
          size: parseInt(inputs.size),
          variety: inputs.variety,
          center: inputs.center,
          office: inputs.office,
          market: inputs.market,
        }
      });

      // Redirect after success
      navigate("/list" + res.data.id);  // Assuming 'id' is the unique identifier of the post
    } catch (err) {
      console.log(err);
      setError("There was an error while saving your post.");
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            <div className="item">
              <label htmlFor="region">Region</label>
              <input id="city" name="city" type="text" />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type">
                <option value="natural" defaultChecked>
                  Natural
                </option>
                <option value="organic">Organic</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="grade">Grade</label>
              <select name="grade">
                <option value="premium">Premium</option>
                <option value="freshHarvest">Fresh Harvest</option>
                <option value="greenHouseGrown">GreenHouse Grown</option>
                <option value="imported">Imported</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="water">Water Availability</label>
              <select name="water">
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="irrigation">Irrigation Support</label>
              <select name="irrigation">
                <option value="Yes">Yes</option>
                <option value="No">Not</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="insurance">Crop Insurance Policy</label>
              <input
                id="income"
                name="insurance"
                type="text"
                placeholder="Insurance Policy"
              />
            </div>
            <div className="item">
              <label htmlFor="size">Farm Size (hectares)</label>
              <input min={0} id="size" name="size" type="number" />
            </div>
            <div className="item">
              <label htmlFor="variety">Crop Variety </label>
              <input
                id="variety"
                name="variety"
                type="text"
                placeholder="Crop Variety"
              />
            </div>
            <div className="item">
              <label htmlFor="center">Farming Assistance Centre(metres)</label>
              <input min={0} id="center" name="center" type="number" />
            </div>
            <div className="item">
              <label htmlFor="center">Government Subsidy Office(metres)</label>
              <input min={0} id="center" name="center" type="number" />
            </div>
            <div className="item">
              <label htmlFor="market">Farmers' Market(metres)</label>
              <input min={0} id="market" name="market" type="number" />
            </div>
            <button className="sendButton">Add</button>
            {error && <span>{error}</span>}
          </form>
        </div>
      </div >
      <div className="sideContainer">
        {images.map((image, index) => {
          <img src={image} alt="" key={index} className="postImages" />
        })}
        <UploadWidget
          uwConfig={{
            cloudName: "djvgk8oop",
            uploadPreset: "Ekrishi",
            multiple: true,
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div >
  );
}

export default NewPostPage;
