import { useState } from "react";
import API from "../services/api";

function ImageUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      await API.post("/upload", formData);
      setMessage("Image uploaded successfully");
    } catch (err) {
      setMessage("Upload failed");
    }
  };

  return (
    <div className="upload-page">
      <div className="upload-card">
        <h2>Image Upload</h2>

        <form onSubmit={handleUpload}>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button type="submit">Upload</button>
        </form>

        {message && <p className="msg">{message}</p>}
      </div>
    </div>
  );
}

export default ImageUpload;
