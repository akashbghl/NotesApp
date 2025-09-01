import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import image from '../assets/sImg.jpg';
import axios from 'axios';
import { toast } from 'react-toastify';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpInput, setOtpInput] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Get OTP
  const handleGetOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    console.log(email);
    try {
      const res = await axios.post('http://localhost:5000/auth/signin',{email},{withCredentials:true});
      if (res.data.success) {
        toast.success('OTP sent to your Email');
        setOtpInput(true);
      } else {
        toast.error(res.data.message || 'Failed to send OTP');
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
      const res = await axios.post('http://localhost:5000/auth/verify-otp', {
        email,
        code: otp, 
      },{withCredentials:true});

      if (res.data.success) {
        toast.success('Login Successful');
        navigate('/dashboard')
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

          <h2 className="text-3xl font-bold mb-2 text-center md:text-left">Sign in</h2>
          <p className="text-gray-500 mb-6 text-center md:text-left">
            Sign in to enjoy the feature of HD
          </p>

          {/* Form */}
          <form 
            className="space-y-4"
            onSubmit={otpInput ? handleVerifyOtp : handleGetOtp}
          >
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                disabled={otpInput} 
              />
            </div>

            {otpInput && (
              <div>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  inputMode="numeric"
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

            <div className='flex gap-2 items-center text-sm text-gray-800'>
              <input type="checkbox" />
              Keep me logged in
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              {isLoading
                ? 'Please wait...'
                : otpInput
                ? 'Verify & Sign in'
                : 'Get OTP'}
            </button>
          </form>

          <p className="text-gray-500 text-sm mt-4 text-center md:text-left">
            Don’t have an account?{" "}
            <Link to='/sign-up' className="text-blue-600 font-medium">
              Sign up
            </Link>
          </p>
        </div>

        {/* Right Section */}
        <div className="hidden md:block md:w-1/2">
          <img
            src={image}
            alt="Sign In Visual"
            className="w-full h-full object-cover rounded-2xl p-1.5"
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
