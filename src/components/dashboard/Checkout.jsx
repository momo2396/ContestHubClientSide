import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProviders";
import { backendURL } from "../../Routes/useGetData";
import { useNavigate } from "react-router-dom";

const Checkout = ({ id }) => {
  const { user } = useContext(AuthContext);
  const [cardLoading, setCardLoading] = useState(false);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState({});
  const [clientSecret, setClientSecret] = useState("");
  const totalPrice = 5000;

  useEffect(() => {
    setCardLoading(true);
    fetch("http://localhost:5000" + "/create-payment-intent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ totalPrice }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCardLoading(false);
        setClientSecret(data?.clientSecret);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error: createError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });
    if (createError) {
      setCardError(createError);
    } else {
      setCardError({});
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              email: user?.email || "anonymous",
              name: user?.displayName || "anonymous",
            },
            metadata: {
              contestId: id,
            },
          },
        }
      );
      if (error) {
        setCardError(error);
        return;
      } else {
        setCardError("");
        if (paymentIntent.status === "succeeded") {
          Swal.success("Payment Successful. Thank You");
          fetch(
            `${process.env.REACT_APP_URL}/payment-complete?email=${user?.email}`,
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({ paymentIntent, id }),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.result2.acknowledged) {
                navigate("/dashboard/myRegistrations");
              }
            });
        }
      }
    }
  };
  return (
    <div className="pt-64">
      <form onSubmit={handleSubmit}>
        <CardElement
          className="outline p-3 text-white rounded-2xl my-5"
          options={{
            style: {
              base: {
                fontSize: "20px",
                color: "#000000",
                "::placeholder": {
                  color: "#000000",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        {cardError && (
          <div className="my-5 text-error font-bold">
            <p>{cardError.message}</p>
          </div>
        )}
        {cardLoading ? (
          <div className="flex justify-center">
            <progress className="progress w-56"></progress>
          </div>
        ) : (
          <button
            type="submit"
            className="btn font-semibold px-20 btn-info"
            disabled={!stripe || !clientSecret}
          >
            Pay
          </button>
        )}
      </form>
    </div>
  );
};

export default Checkout;
