import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";



export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", otp: "", password: "" });
  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
 


  const signupUser = async () => {

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/signup",
        {
          name: form.name,
          email: form.email,
          password: form.password
        }
      );

      console.log(response.data);
      setAlertMessage("Signup Successful");
      setShowAlert(true);

      setTimeout(() => {

        setShowAlert(false);

        navigate("/sidebar");

      }, 2000);
     


    } catch (error) {

      console.log(error);
    }
  };


  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Full name is required.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }



    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

0  // const handleSendOtp = () => {
  //   if (!form.email.trim()) {
  //     setErrors({ ...errors, email: "Please enter your email before sending OTP." });
  //     return;
  //   }
  // if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
  //   setErrors({ ...errors, email: "Please enter a valid email address." });
  //   return;
  // }
  //   // Add your OTP API call here
  //   setOtpSent(true);
  //   setErrors({ ...errors, email: "" });
  //   alert(`OTP sent to ${form.email}`);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Add your signup API call here
    console.log("Signup:", form);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-linear-to-r from-red-950  to-black  flex items-center justify-center px-4">
      <div className="bg-black-100  border-white border-4 rounded-2xl p-10 w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-white border-red-900 border-2 text-red-950 font-medium text-lg flex items-center justify-center mx-auto mb-3">
            AR
          </div>
          <h2 className="text-xl font-medium text-white">Create an account</h2>
          <p className="text-sm text-gray-400 mt-1">Sign up to get started</p>
        </div>

        {/* Name */}
        <div className="mb-5">
          <label className="block text-sm text-gray-200 mb-1.5">Full name</label>
          <input
            type="text"
            name="name"
            placeholder="XYZ"
            value={form.name}
            onChange={handleChange}
            className={`w-full px-3 py-2.5 border placeholder:text-gray-500 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 ${errors.name ? "border-red-400" : "border-gray-200 focus:border-blue-300"
              }`}
          />
          {errors.name && <p className="text-xs text-red-500 mt-1.5">⚠ {errors.name}</p>}
        </div>

        {/* Email + OTP Butto */}
        <div className="mb-5">
          <label className="block text-sm text-gray-200 mb-1.5">Email address</label>
          <div className="flex gap-2">
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className={`flex-1 px-3 py-2.5 border placeholder:text-gray-500 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 ${errors.email ? "border-red-400" : "border-gray-200 focus:border-blue-300"
                }`}
            />
            {/* <button
              type="button"
              className="px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg cursor-pointer hover:bg-gray-700 transition-colors whitespace-nowrap"
            >
              {otpSent ? "Resend" : "Send OTP"}
            </button> */}
          </div>
          {/* {errors.email && <p className="text-xs text-red-500 mt-1.5">⚠ {errors.email}</p>}
          {otpSent && !errors.email && (
            <p className="text-xs text-green-600 mt-1.5">✓ OTP sent! Check your inbox.</p>
          )} */}
        </div>

        {/* OTP */}
        {/* <div className="mb-5">
          <label className="block text-sm text-gray-500 mb-1.5">Enter OTP</label>
          <input
            type="text"
            name="otp"
            placeholder="••••••"
            maxLength={6}
            value={form.otp}
            onChange={handleChange}
            className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 tracking-widest text-center ${
              errors.otp ? "border-red-400" : "border-gray-200 focus:border-blue-300"
            }`}
          /> */}
        {/* {errors.otp && <p className="text-xs text-red-500 mt-1.5">⚠ {errors.otp}</p>}
        </div> */}
 {
      showAlert && (

        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            background: "#4CAF50",
            color: "white",
            padding: "14px 24px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            zIndex: "1000",
            fontWeight: "600"
          }}
        >

          {alertMessage}

        </div>

      )
    }
        {/* Password */}
        <div className="mb-6" style={{
          position: "relative",
          width: "300px"
        }}>
          
          <label className="block text-sm text-gray-200 mb-1.5">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter password"
            
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value
              })
            }
            style={{
              width: "100%",
              padding: "10px",
              paddingRight: "40px"
  
            }}
            className={`w-full px-3 py-2.5 border placeholder:text-gray-500 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 ${errors.password ? "border-red-400" : "border-gray-200 focus:border-blue-300"

              }`}


          />
          <span
            onClick={() => setShowPassword(!showPassword)}

            style={{
              position: "absolute",
              right: "10px",
              top: "70%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "gray"
            }}
          >

            {
              showPassword
                ?
                <FaEyeSlash   className="text-white hover:text-white focus:outline-none"/>
                :
                <FaEye />
               
            }

          </span>



          {errors.password && <p className="text-xs text-red-500 mt-1.5">⚠ {errors.password}</p>}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
          </button>
        </div>


        {/* Submit */}
        <button
          type="button"
          onClick={signupUser}
          className="w-full py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-red-950 hover:text-white transition-colors cursor-pointer"
        >
          Create account
        </button>

        <p className="text-center text-sm text-gray-400 mt-5">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">Sign in</a>
        </p>
        

      </div>
    </div>
  );
}