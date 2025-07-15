import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";

const CREATE_DASHBOARD = gql`
  mutation CreateDashboard($title: String!, $userId: Float!) {
    createDashboard(title: $title, userId: $userId) {
      id
      title
    }
  }
`;

const CreateDashboard: React.FC = () => {
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [createDashboard, { loading, error }] = useMutation(CREATE_DASHBOARD);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsedUserId = parseInt(userId);
      const result = await createDashboard({
        variables: { title, userId: parsedUserId },
      });
      toast.success("Dashboard created!");
      setTitle("");
      setUserId("");
    } catch (err) {
      console.error("Error creating dashboard:", err);
      toast.error("Dashboard creation failed");
    }
  };

  return (
    <div className="form-card mt-10">
      <h2 className="form-title">Create Dashboard</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="form-label">Dashboard Title</label>
          <input
            type="text"
            className="input"
            placeholder="Enter dashboard title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="form-label">User ID</label>
          <input
            type="number"
            className="input"
            placeholder="Enter user ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn w-full" disabled={loading}>
          {loading ? "Creating..." : "Create Dashboard"}
        </button>
        {error && <p className="text-red-500 text-sm">{error.message}</p>}
      </form>
    </div>
  );
};

export default CreateDashboard;

