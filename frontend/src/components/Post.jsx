import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    caption: "",
    images: [],
    isPublic: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]); // added images state

  const fullName = localStorage.getItem("username") || "User";
  const email = localStorage.getItem("email") || "user@example.com";
  const photoURL =
    localStorage.getItem("photoURL") || "https://via.placeholder.com/150";
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:8080/api/posts/byLoggedInUser", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => setPosts(res.data))
        .catch((err) => console.error("Error fetching posts:", err));
    }
  }, [token]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    // Validate that form data is available
    if (!newPost.caption.trim()) {
      alert("Please enter all required fields.");
      return;
    }

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId") || token;
    const username = localStorage.getItem("username");
    console.log(token);

    try {
      await axios.post(
        "http://localhost:8080/api/posts", // Replace with your correct API endpoint
        newPost, // Your newPost object containing the post details
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json", // Adjust content type if needed
          },
        }
      );

      // Reset form and fetch updated posts
      setNewPost({ caption: "", images: [], isPublic: true });
      setImages([]); // Clear images as well
      setLoading(false);
      alert("Post added successfully");
    } catch (error) {
      console.error(
        "Error posting:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to add post");
    }
  };

  const handleCancel = () => {
    setNewPost({ caption: "", images: [], isPublic: true });
    setImages([]);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Create a New Post
          </h2>

          {/* Display error message if any */}
          {error && (
            <div className="bg-red-200 text-red-700 p-2 mb-4 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handlePostSubmit} className="space-y-6">
            {/* Caption */}
            <div>
              <label
                htmlFor="caption"
                className="block text-gray-700 font-medium mb-2"
              >
                Caption
              </label>
              <textarea
                id="caption"
                name="caption"
                value={newPost.caption}
                onChange={(e) =>
                  setNewPost({ ...newPost, caption: e.target.value })
                }
                placeholder="Write a caption..."
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              ></textarea>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Images
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:border-blue-400 hover:text-blue-400">
                <input
                  type="file"
                  multiple
                  accept="image/png, image/jpeg, image/gif"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="fileUpload"
                />
                <label
                  htmlFor="fileUpload"
                  className="flex flex-col items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16V4m0 0L4 7m3-3l3 3m6 4v12m0 0l-3-3m3 3l3-3"
                    />
                  </svg>
                  Click to upload or drag and drop
                  <p className="text-xs mt-1">
                    PNG, JPG or GIF (max 10 images)
                  </p>
                </label>
              </div>

              {/* Preview Images */}
              {images.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      className="w-full h-24 bg-gray-100 rounded-lg overflow-hidden"
                    >
                      <img
                        src={URL.createObjectURL(img)}
                        alt="Preview"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Posting..." : "Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Post;
