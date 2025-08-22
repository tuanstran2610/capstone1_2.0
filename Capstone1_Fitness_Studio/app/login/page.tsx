// "use client";

// import { useState } from "react";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:5000/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//         credentials: "include", // nếu bạn đang dùng session với cookie
//       });

//       if (!res.ok) {
//         throw new Error("Login failed");
//       }

//       const data = await res.json();

//       // ✅ Lưu user vào localStorage
//       localStorage.setItem("user", JSON.stringify(data.user));

//       // ✅ Redirect về home
//       window.location.href = "/";
//     } catch (err) {
//       setError("Invalid email or password");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-8 rounded-xl shadow-md w-96"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

//         {error && (
//           <p className="text-red-500 text-center mb-4">{error}</p>
//         )}

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full mb-4 p-2 border rounded-lg"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full mb-6 p-2 border rounded-lg"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded-lg"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }


"use client";

import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // because using session + cookie
      });

      if (!res.ok) {
        throw new Error("Login failed");
      }

      const data = await res.json();

      // ✅ Save user to localStorage
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ Navigate based on role & membership
      if (data.user.role === "user" && !data.user.membership) {
        window.location.href = "/choosemembership";
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form
        onSubmit={handleLogin}
        className="bg-neutral-900 text-white p-8 rounded-xl shadow-lg w-96 border border-neutral-700"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>

        {error && (
          <p className="text-red-400 text-center mb-4">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border border-neutral-700 rounded-lg bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-2 border border-neutral-700 rounded-lg bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
}
