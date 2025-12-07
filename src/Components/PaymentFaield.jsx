import { Link } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md"; // React Icon

const PaymentFailed = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 bg-bg2">

      {/* Icon */}
      <MdErrorOutline className="text-bg3" size={90} />

      <h1 className="text-3xl font-bold text-red-500 mt-4">
        Payment Failed ❌
      </h1>

      <p className="text-bg3/90 mt-3 max-w-md">
        Sorry! We couldn’t process your payment.  
        Please try again or contact our support team.
      </p>

      {/* Buttons */}
      <div className="flex gap-3 mt-6">
        <Link to="/" className="btn bg-bg3 text-white">
          Go to Home
        </Link>

        <Link to="/dashboard/paymentSSl" className=" p-2 btn bg-transparent hover:bg-bg4 ">
          Try Again
        </Link>
      </div>

    </div>
  );
};

export default PaymentFailed;
