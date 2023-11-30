import axios from "axios";

const axiousPublic = axios.create({
    baseURL: 'https://assignment-12-server-seven-gamma.vercel.app'
})
const UseAxiosPublic = () => {
    return axiousPublic
};

export default UseAxiosPublic;