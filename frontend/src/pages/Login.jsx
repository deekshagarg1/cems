
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../assets/css/Login.css";

const ROLES = ["student", "faculty", "admin"];

function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let res;

      if (role === "admin") {
        res = await axios.post("http://localhost:5000/api/auth/admin/login", {
          name: formData.name,
          password: formData.password,
        });
      } else if (role === "student") {
        res = await axios.post("http://localhost:5000/api/auth/student/login", {
          email: formData.email,
          password: formData.password,
        });
      } else {
        res = await axios.post("http://localhost:5000/api/auth/faculty/login", {
          email: formData.email,
          password: formData.password,
        });
      }

      const data = res.data;

      // Save to localStorage
      localStorage.setItem("token",    data.token);
      localStorage.setItem("role",     data.role || role);
      localStorage.setItem("userName", data.name || "");

      // Profile pic — save full URL
      if (data.profile_pic) {
        localStorage.setItem("profilePic",
          `http://localhost:5000/uploads/${data.profile_pic}`
        );
      }

      alert("Login Successful ✅");
      navigate("/");
      window.location.reload();

    } catch (err) {
      console.error(err.response?.data || err);
      const msg = err.response?.data?.message || "Login Failed";
      alert("Login Failed ❌\n" + msg);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="auth-logo">
          <div className="auth-logo-icon">
            <img src="mits_logo.png" alt="logo" />
          </div>
        </div>

        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Sign in to your account to continue</p>

        {/* ROLE TABS */}
        <div className="role-tabs">
          {ROLES.map((r) => (
            <button key={r} type="button"
              className={`role-tab ${role === r ? "active" : ""}`}
              onClick={() => setRole(r)}>
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin}>
          {/* NAME (admin) or EMAIL (student/faculty) */}
          {role === "admin" ? (
            <div className="field-group">
              <label className="field-label">Admin Name</label>
              <input className="field-input" type="text" name="name"
                placeholder="Admin Name" required onChange={handleChange} />
            </div>
          ) : (
            <div className="field-group">
              <label className="field-label">Email</label>
              <input className="field-input" type="email" name="email"
                placeholder="john.doe@college.edu" required onChange={handleChange} />
            </div>
          )}

          {/* PASSWORD */}
          <div className="field-group">
            <div className="field-row">
              <span className="field-label">Password</span>
              <button type="button" className="forgot-link">Forgot password?</button>
            </div>
            <input className="field-input" type="password" name="password"
              placeholder="••••••••" required onChange={handleChange} />
          </div>

          <button type="submit" className="btn-submit">Sign In</button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/sign">Create Account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

