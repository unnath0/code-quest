import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../actions/users";
import axios from "axios";

const EditProfileForm = ({ currentUser, setSwitch }) => {
  const [name, setName] = useState(currentUser?.result?.name);
  const [about, setAbout] = useState(currentUser?.result?.about);
  const [tags, setTags] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

  const dispatch = useDispatch();

  const uploadProfilePicture = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "uhglr5li"); // Cloudinary preset or other configurations

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dvag5fpyh/image/upload",
        formData,
      );
      return response.data.secure_url; // Return the image URL after upload
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      throw error;
    }
  };

  const handleImageUpload = async (file) => {
    try {
      const imageUrl = await uploadProfilePicture(file); // Call to upload image
      setProfilePictureUrl(imageUrl); // Set uploaded image URL
      console.log(imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error.message);
      alert("Failed to upload image.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tags[0] === "" || tags.length === 0) {
      alert("Update tags field");
    } else {
      dispatch(updateProfile(currentUser?.result?._id, { name, about, tags, profilePicture: profilePictureUrl }));
    }
    setSwitch(false);
  };

  return (
    <div>
      <h1 className="edit-profile-title">Edit Your Profile</h1>
      <h2 className="edit-profile-title-2">Public information</h2>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <label htmlFor="name">
          <h3>Display name</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="about">
          <h3>About me</h3>
          <textarea
            id="about"
            cols="30"
            rows="10"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </label>
        <label htmlFor="tags">
          <h3>Watched tags</h3>
          <p>Add tags separated by 1 space</p>
          <input
            type="text"
            id="tags"
            onChange={(e) => setTags(e.target.value.split(" "))}
          />
        </label>
        <label htmlFor="profilePicture">
          <h3>Change profile picture</h3>
          <input
            type="file"
            id="profilePicture"
            onChange={(e) => {
              const file = e.target.files[0];
              setProfilePicture(file);
              handleImageUpload(file); // Upload the image when selected
            }}
          />
        </label>
        <br />
        <input type="submit" value="Save profile" className="user-submit-btn" />
        <button
          type="button"
          className="user-cancel-btn"
          onClick={() => setSwitch(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;
