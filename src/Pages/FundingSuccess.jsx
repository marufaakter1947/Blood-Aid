// FundingSuccess.jsx
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { toast } from "react-hot-toast";

const FundingSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const session_id = params.get("session_id");

    if (session_id) {
      // Call backend to confirm payment and record in MongoDB
      fetch(`${import.meta.env.VITE_API_URL}/api/funding/confirm-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: session_id }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            toast.success("Payment successful!");
            navigate("/funding"); // Redirect to funding page
          } else {
            toast.error("Payment verification failed");
            navigate("/funding");
          }
        })
        .catch(() => {
          toast.error("Payment verification failed");
          navigate("/funding");
        });
    } else {
      navigate("/funding");
    }
  }, [navigate,location]);

  return <div className="text-center mt-20">Processing payment...</div>;
};

export default FundingSuccess;
