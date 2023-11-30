import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/AuthProvider/AuthProvider";
import moment from "moment";

const CheckOutForm = () => {
    const [clientSecret, setClientSecret] = useState(null);
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext)
    const axiosSeceure = useAxiosSecure();
    const totalPrice = 500

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    setClientSecret(res.data.clientSecret)
                    console.log(res.data.clientSecret);
                })
        }

    }, [axiosSecure, totalPrice])


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card
        })
        if (error) {
            toast.error(error.message)
            console.log('payment error', error)
        } else {
            console.log('payment method', paymentMethod)
        }

        //confirm payment

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error')
        } else {
            if(paymentIntent.status === 'succeeded'){
                toast.success("Donation Successfull");
                const payment = {
                    name: user?.displayName,
                    email: user?.email,
                    transactionId: paymentIntent.id,
                    price: totalPrice,
                    date: moment().format("MMM Do YY"),
                }

                const res = await axiosSeceure.post('/payments', payment);
                return res.data
            }

        }

    }
    return (
        <div>
            <div className="w-[20rem]">
                <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
                    <div className="mb-4">
                        <label htmlFor="cardElement" className="block text-sm font-medium text-gray-600">
                            Card Details
                        </label>
                        <div id="cardElement" className="mt-1 p-2 border border-gray-300 rounded-md">
                            <CardElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#424770',
                                            '::placeholder': {
                                                color: '#aab7c4',
                                            },
                                        },
                                        invalid: {
                                            color: '#9e2146',
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>

                    
                <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                </form>

            </div>
        </div>
    );
};

export default CheckOutForm;