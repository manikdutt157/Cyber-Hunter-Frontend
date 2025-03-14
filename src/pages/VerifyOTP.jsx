import React from 'react';
// import ForgotImg from '../assets/login-signup-imgs/otp-img.png';
import Verifyotp from "../assets/loginSignUp/verifyotp.gif"
import { FaArrowRight, FaLock } from "react-icons/fa6";

const VerifyOTP = () => {
  const [otp, setOtp] = React.useState('');
  return (
    <div>
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          {/* <!-- Header --> */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 border-4 text-white border-brandPrimary p-6 rounded-lg shadow-lg">
            {/* <!-- image --> */}
            <div className="space-y-8" data-aos="fade-right">
              <img src={Verifyotp} alt="banner-img" className="w-full h-full md:h-fit  object-cover hover:-translate-y-3 transition-all duration-700" />
            </div>

            {/* <!-- OTP sent--> */}
            <div
              className=" border-2 text-white border-white p-6 rounded-lg shadow-lg"
              data-aos="fade-left"
            >
              <form className="space-y-6 flex flex-col">

                <div className="text-center mb-4" data-aos="fade-down">
                  <div className="text-center mb-10 sm:mb-12 md:mb-16">
                    <span className="text-4xl font-extrabold text-brandPrimary text-500 text-center  md:m-4  border-b-2   border-brandPrimary">
                      Verify OTP
                    </span>
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="flex text-md font-medium text-white">
                    {/* lock images */}
                    <FaLock className='h-6 w-6 mx-2 my-2' />Verify OTP
                  </label>
                  <input
                    type="number"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-3 bg-transparent border border-brandPrimary rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300 placeholder:text-white"
                    placeholder="Enter OTP"
                    required
                  />
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="lg:w-1/2 md:w-full flex items-center justify-center bg-brandPrimary text-black font-bold py-3 px-6 rounded-lg hover:bg-black hover:text-brandPrimary hover:border hover:border-brandPrimary transform hover:scale-105 transition-all duration-300"
                    onClick={() => console.log("email")}
                  >
                    Verify OTP
                    <span className="ml-2">
                      <FaArrowRight />
                    </span>
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default VerifyOTP