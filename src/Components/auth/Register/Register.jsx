import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { registerUser } from "../../../Store/auth/actions/registerAction";
import { loginWithGoogle } from "../../../Store/auth/actions/googleLoginAction";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!", { theme: "colored" });
      return;
    }
    dispatch(registerUser({ email: formData.email, password: formData.password }))
      .unwrap()
      .then(() => {
        toast.success("Account created successfully!", { theme: "colored" });
        navigate("/");
      })
      .catch((error) => {
        toast.error(`Registration failed: ${error}`, { theme: "colored" });
        console.error("Registration failed:", error);
      });
  };

  const handleGoogleLogin = () => {
    dispatch(loginWithGoogle())
      .unwrap()
      .then(() => {
        toast.success("Account created successfully!", { theme: "colored" });
        navigate("/");
      })
      .catch((error) => {
        toast.error(`Google registration failed: ${error}`, { theme: "colored" });
        console.error("Google login failed:", error);
      });
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#2A5470] to-[#4C4177] overflow-hidden">
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/10 rounded-full"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{
              scale: [1, 1.5, 1],
              rotate: [0, 180],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      <div className="relative z-10 h-screen flex items-center justify-center p-4">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl max-w-6xl w-full overflow-hidden h-[90vh]">
          <div className="flex flex-col lg:flex-row h-full">
            <motion.div
              className="flex-1 p-8 lg:p-12 flex flex-col justify-center"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2
                className="text-4xl font-bold text-white mb-8 text-center"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Create Account
              </motion.h2>

              <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto w-full">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/10 backdrop-blur-sm text-white rounded-xl p-4 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Email Address"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-white/10 backdrop-blur-sm text-white rounded-xl p-4 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Password"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-white/10 backdrop-blur-sm text-white rounded-xl p-4 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Confirm Password"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {loading ? "Creating Account..." : "Register Now"}
                  </button>
                </motion.div>
              </form>

              <motion.div
                className="mt-6 text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <button
                  onClick={handleGoogleLogin}
                  className="w-full py-4 bg-white rounded-xl text-gray-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 border border-gray-300"
                >
                  <img
                    src="https://www.google.com/favicon.ico"
                    alt="Google"
                    className="w-6 h-6"
                  />
                  Sign up with Google
                </button>
              </motion.div>

              <motion.div
                className="mt-6 text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <Link
                  to="/login"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Already have an account? Login here
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex-1 hidden lg:block relative bg-gradient-to-br from-cyan-400/20 to-blue-500/20"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <motion.img
                  src="/images/login-illustration.svg"
                  alt="Register Illustration"
                  className="w-full h-full object-contain"
                  initial={{ y: -20 }}
                  animate={{ y: 20 }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
