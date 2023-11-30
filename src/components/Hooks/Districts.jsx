import { useQuery } from '@tanstack/react-query';
import UseAxiosPublic from './UseAxiosPublic';

const Districts = () => {
    const axiousPublic = UseAxiosPublic();
    const { data: districts = [], isLoading } = useQuery({
        queryKey: ['districts'],
        queryFn: async () => {
            const res = await axiousPublic.get('/districts');
            return res.data;
        }
    })
    return [districts, isLoading]
   
};

export default Districts;