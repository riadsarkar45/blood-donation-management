import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "./UseAxiosPublic";

const Upozillas = () => {
    const axiousPublic = UseAxiosPublic();
    const { data: upazillas = [], isLoading: loading } = useQuery({
        queryKey: ['upazillas'],
        queryFn: async () => {
            const res = await axiousPublic.get('/upazillas');
            return res.data;
        }
    })
    return [upazillas, loading]
};

export default Upozillas;