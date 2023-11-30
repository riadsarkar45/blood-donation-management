import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useVolunteer = () => {

    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: isVolunteer, isPending: isVolunteerLoading } = useQuery({
        queryKey: [user?.email, 'isVolunteer'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/volen/${user.email}`);
            console.log(res.data);
            return res.data?.volunteer;
        }
    })
    return [isVolunteer, isVolunteerLoading]
};

export default useVolunteer;