import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
    const axiosSeceure = useAxiosSecure();
    const { data: payments = [] } = useQuery({
        queryKey: ['payment'],
        queryFn: async () => {
            const res = await axiosSeceure.get('/payment-history');
            return res.data;
        }
    })
    return [payments]
};

export default PaymentHistory;