import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const useDonationReq = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext)
    const { refetch, data: reqData = [], isLoading } = useQuery({
        queryKey: ['reqData'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-donation-request?email=${user?.email}`);
            return res.data;
        }
    });

    return [reqData, refetch, isLoading];
};

export default useDonationReq;
