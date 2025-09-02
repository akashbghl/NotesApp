import { useState } from 'react';
import image from '../assets/sImg.jpg';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Signup = () => {
  const [formData, setFormData] = useState({ name: '', dob: '', email: '' });
  const [isLoading, setLoading] = useState(false);
  const [otpInput, setOtpInput] = useState(false);
  const [otp, setOtp] = useState({ code: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'otp') {
      setOtp({ code: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Get or Resend OTP
  const handleGetOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('https://notesapp-backend-ppzh.onrender.com/auth/signup', formData);
      if (res.data.success) {
        toast.success('OTP sent to your Email');
        setOtpInput(true);
      } else {
        toast.error(res.data.message || 'Something went wrong');
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('https://notesapp-backend-ppzh.onrender.com/auth/verify-otp', {
        email: formData.email,
        code: otp.code,
      });

      if (res.data.success) {
        toast.success('Signup Successful');
        navigate('/sign-in');
      } else {
        toast.error(res.data.message || 'Invalid OTP');
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl md:shadow-lg rounded-2xl overflow-hidden md:border border-gray-300 min-h-[300px] md:min-h-[600px]">

        {/* Left Section */}
        <div className="w-full md:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
          <div className="flex items-center mb-6 justify-center md:justify-start">
            <span className="text-2xl font-bold text-blue-600 mr-2">❄</span>
            <span className="font-semibold text-lg">HD</span>
          </div>

          <h2 className="text-3xl font-bold mb-2 text-center md:text-left">Sign up</h2>
          <p className="text-gray-500 mb-6 text-center md:text-left">
            Sign up to enjoy the feature of HD
          </p>

          {/* Form */}
          <form
            className="space-y-4"
            onSubmit={otpInput ? handleVerifyOtp : handleGetOtp}
          >
            {!otpInput && (
              <>
                <input
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
                <div className='relative'>
                  <input
                  name="dob"
                  placeholder="Date of Birth"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  className="peer block w-full rounded-md border border-gray-300 px-2 pt-5 pb-2 text-sm focus:outline-none text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-400"
                  required
                />
                <label
                  htmlFor="dob"
                  className="absolute left-2 top-2 text-gray-500 text-xs transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500"
                >
                  Date of Birth
                </label>
                </div>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </>
            )}

            {otpInput && (
              <div>
                <input
                  name="otp"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="Enter OTP"
                  value={otp.code}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
                <div
                  onClick={() => handleGetOtp()}
                  className="cursor-pointer mt-2 text-blue-500 text-sm font-semibold underline"
                >
                  Resend OTP
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white py-2 cursor-pointer rounded-lg hover:bg-blue-600 transition"
            >
              {isLoading
                ? 'Please wait...'
                : otpInput
                  ? 'Verify & Sign Up'
                  : 'Get OTP'}
            </button>
          </form>

          <p className="text-gray-500 text-sm mt-4 text-center md:text-left">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-blue-600 font-medium">
              Sign in
            </Link>
          </p>
        </div>

        {/* Right Section */}
        <div className="hidden md:block md:w-1/2">
          <img
            src={image}
            alt="Sign Up Visual"
            className="w-full h-full object-cover rounded-2xl p-1.5"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
