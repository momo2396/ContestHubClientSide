import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./Checkout";
import { useLocation } from "react-router-dom";
const stripePromise = loadStripe(import.meta.env.VITE_Payment_PK);
const Payment = () => {
  const location = useLocation();
  const { pathname } = location;
  const id = pathname.split("/").pop();
  return (
    <div>
      <Elements stripe={stripePromise}>
        <Checkout id={id}></Checkout>
      </Elements>
    </div>
  );
};

export default Payment;
