import React, { useState } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import api from "../lib/axios.js";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
    }
    setLoading(true);
    try {
      await api.post("/notes", { title, content });
      toast.success("Note created Successfully!");
      navigator("/");
    } catch (error) {
      console.log("error while creating note", error);
      if (error.response.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-100">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
          {/* Back Button */}
          <Link to={"/"} className="btn btn-ghost gap-2 text-sm">
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Notes
          </Link>

          {/* Note Form Card */}
          <div className="card bg-base-100 shadow-xl rounded-2xl">
            <div className="card-body">
              <h2 className="card-title text-3xl font-bold mb-4 text-primary">
                📝 Create New Note
              </h2>

              <form onSubmit={handleSubmit}>
                {/* Title Field */}
                <div className="form-control mb-5">
                  <label className="label">
                    <span className="label-text text-md font-medium">
                      Title
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Note Title"
                    className="input input-bordered input-primary w-full"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </div>

                {/* Content Field */}
                <div className="form-control mb-6">
                  <label className="label">
                    <span className="label-text text-md font-medium">
                      Content
                    </span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered textarea-primary h-36 w-full"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </div>

                {/* Actions */}
                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary px-6"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
