/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });
const correctOTP = 'CINCT';
export default function Home() {
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (value: string, index: number) => {
    console.log("value", value)
    const newOtp = [...otp];
    newOtp[index] = value.toUpperCase();
    setOtp(newOtp);

    // Move focus to next input
    if (value && index < 4) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };
  
  const handleKeyDown = (e: any, index: number) => {
    const key = e.key;

    // Xóa ký tự khi nhấn Backspace hoặc Delete
    if ((key === 'Backspace' || key === 'Delete') && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
        prevInput.focus();
      }
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const otpValue = otp.join('');

    // Kiểm tra OTP
    if (otpValue !== correctOTP) {
      setError(true);
      console.log('OTP Incorrect');
    } else {
      setError(false);
      console.log('OTP Correct');
      setIsModalOpen(true); 
    }
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
       <>
       <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12 main-image">
  <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
    <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
      <div className="flex flex-col items-center justify-center text-center space-y-2">
        <div className="font-semibold text-3xl text-gray-900 mb-3">
          <p>XÁC THỰC MẬT THƯ</p>
        </div>
        <div className="flex flex-row text-sm font-medium text-gray-400">
          <p>Vui lòng nhập 5 trung điểm của 5 mật thư <br/> DuckyCard đã để lại trong hộp bí ấn</p>
        </div>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-16">
            <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xl">
            {otp.map((value, index) => (
              <div className="w-16 h-16" key={index}>
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  maxLength={1}
                  value={value}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onChange={(e) => handleChange(e.target.value, index)}
                  className={`text-gray-900 w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-xl border text-lg bg-white focus:bg-gray-50 focus:ring-1 ${
                    error ? 'border-red-500 ring-red-500' : 'border-gray-200 ring-blue-700'
                  }`}
                />
                </div>
            ))} 
            </div>

              <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                {error && <p className="text-red-500"> Sự thật chỉ có một! Hãy thử lại đáp án khác</p>}
              </div>
            <div className="flex flex-col space-y-5">
              <div>
                <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                Xác nhận
                </button>
              </div>

            </div>
          </div>
        </form>
             {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-md mx-auto p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 focus:outline-none"
              onClick={closeModal}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <img
              alt="kid"
              src="/Kid.png"
              className="w-full h-70 object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold text-center mt-4 text-gray-700 ">
              Chúc mừng bạn đã tìm đúng vị trí kho báu!
            </h3>
            <p className="text-gray-900 text-center mt-2">
              Bạn chính là thám tử tài ba!
            </p>
            <button
              onClick={closeModal}
              className="mt-6 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  </div>
</div>
       </>
  );
}
