"use client";

import { useState } from "react";

export default function CreatePTPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/auth/create-pt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          firstname: form.firstName,
          lastname: form.lastName,
          email: form.email,
          phonenumber: form.phoneNumber,
          dob: form.dateOfBirth,
          gender: form.gender,
          password: form.password,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create PT");
      }

      // Thành công
      setSuccess("✅ PT created successfully!");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        dateOfBirth: "",
        gender: "",
        password: "",
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary-300 py-8">
      <div className="w-full max-w-2xl p-8 bg-primary-300 rounded-lg shadow-2xl border border-primary-100">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Create PT Account</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-600 text-white rounded-lg text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-600 text-white rounded-lg text-center">
            {success}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name *"
              value={form.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-primary-200 text-white rounded-xl focus:ring-2 focus:ring-primary-100"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name *"
              value={form.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-primary-200 text-white rounded-xl focus:ring-2 focus:ring-primary-100"
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-primary-200 text-white rounded-xl focus:ring-2 focus:ring-primary-100"
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-primary-200 text-white rounded-xl focus:ring-2 focus:ring-primary-100"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="date"
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-primary-200 text-white rounded-xl focus:ring-2 focus:ring-primary-100"
            />
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-primary-200 text-white rounded-xl focus:ring-2 focus:ring-primary-100"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <input
            type="password"
            name="password"
            placeholder="Password *"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-primary-200 text-white rounded-xl focus:ring-2 focus:ring-primary-100"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary-200 text-gray-300 font-semibold rounded-xl border border-primary-100 hover:bg-primary-100 hover:text-white transition disabled:opacity-50"
          >
            {loading ? "Creating PT..." : "Create PT"}
          </button>
        </form>
      </div>
    </div>

  );
}
