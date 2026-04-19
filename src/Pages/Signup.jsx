// import { useState } from "react";
// import { signup } from "../services/authService";
// import { Link, useNavigate } from "react-router-dom";

// function Signup() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       await signup(email, password);
//       navigate("/dashboard");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <form className="auth-form" onSubmit={handleSignup}>
//         <h2>Signup</h2>

//         <input
//           type="email"
//           placeholder="Enter email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Enter password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button type="submit">Signup</button>

//         <p>
//           Already have an account? <Link to="/">Login</Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Signup;


function Signup() {
  return <h1>Signup Page Working</h1>;
}

export default Signup;