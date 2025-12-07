import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-5">
      <h1 className="text-3xl font-bold text-green-500 mb-3">
        Payment Successful 🎉
      </h1>

      <p className="text-gray-400 mb-6">
        Thank you! Your payment has been completed successfully.
      </p>

      {/* Go to Home Button */}
      <Link to="/" className="btn bg-bg3">
        Go to Home
      </Link>
    </div>
  );
};

export default PaymentSuccess;
