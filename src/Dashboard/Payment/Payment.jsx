import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";
import { Helmet } from "react-helmet";
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_STRIPE_KEY);
const Payment = () => {
    return (
        <div>
            <div className="shadow-sm w-full p-5 text-2xl">
                <h2>Add New Blog</h2>
            </div>
            <Helmet>
                <title>Donation</title>
            </Helmet>
            <Elements stripe={stripePromise}>
                <CheckOutForm></CheckOutForm>
            </Elements>
        </div>
    );
};

export default Payment;