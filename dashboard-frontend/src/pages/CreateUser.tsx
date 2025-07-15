import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_USER } from "../graphql/mutations";
import { toast } from "react-toastify";

export default function CreateUser() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [createUser] = useMutation(CREATE_USER);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await createUser({ variables: { email, role } });
      toast.success(`User created: ${data.createUser.email}`);
      setEmail("");
      setRole("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create user");
    }
  };

  return (
    <div className="form-card mt-10">
      <h2 className="form-title">Create User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="form-label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Enter user email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="form-label">Role</label>
          <input
            type="text"
            className="input"
            placeholder="Enter user role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn w-full">
          Create User
        </button>
      </form>
    </div>
  );
}
