import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/AuthProvider/AuthProvider";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import Districts from "../../components/Hooks/Districts";
import Upozillas from "../../components/Hooks/Upozillas";
import { Helmet } from "react-helmet";

const Donation = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [district, isLoading] = Districts();
    const [upazillas, loading] = Upozillas();
    const [blocked, setBlocked] = useState([]);
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        }
    });

    useEffect(() => {
        const blocked = users?.filter((use) => use?.email === user?.email);
        setBlocked(blocked)
    }, [users, user])


    const handleDonorRequest = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const recipentName = form.recipentName.value;
        const district = form.district.value;
        const upozila = form.upozila.value;
        const location = form.location.value;
        const fullAddress = form.fullAddress.value;
        const date = form.date.value;
        const time = form.time.value;
        const bloodGroup = form.bloodGroup.value;
        const status = 'pending'
        const desc = form.desc.value;
        const data = { name, email, recipentName, district, upozila, location, fullAddress, date, time, bloodGroup, status, desc }
        console.log(data)
        axiosSecure.post("/donation/request", data)
            .then(res => {
                toast.success("Request Successfull")
                form.reset();
                console.log(res.data)
            })
    }
    return (
        <div>
            <Helmet>
                <title>
                    Add new request
                </title>
            </Helmet>
            <div className="shadow-sm w-full p-5 text-2xl">
                <h2>Make New Donation Request</h2>
            </div>
            <form onSubmit={handleDonorRequest}>
                <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-4 mt-3">
                    <input name="name" type="text" defaultValue={user?.displayName} readOnly placeholder="Logged In user email and name" className="input input-bordered lg:w-[27rem] md:w-[27rem]" />
                    <input name="email" type="text" defaultValue={user?.email} readOnly placeholder="Logged In user email and name" className="input input-bordered lg:w-[27rem] md:w-[27rem]" />
                    <input type="text" name="recipentName" placeholder="Recipent Name" className="input input-bordered lg:w-[27rem] md:w-[27rem]" />
                    <select name="district" defaultValue="default" className="select select-bordered lg:w-[27rem] md:w-[27rem]">
                        <option disabled value="default">Recipent District</option>
                        {
                            district?.map(dis =>
                                <option key={dis._id}>{dis.name}</option>
                            )
                        }
                    </select>
                    <select name="upozila" defaultValue="default" className="select select-bordered lg:w-[27rem] md:w-[27rem]">
                        <option disabled value="default">Recipent Upozila</option>
                        {
                            upazillas?.map(dis =>
                                <option key={dis._id}>{dis.name}</option>
                            )
                        }
                    </select>
                    <input name="location" type="text" placeholder="Hospital Name" className="input input-bordered lg:w-[27rem] md:w-[27rem]" />
                    <input name="fullAddress" type="text" placeholder="Full Address" className="input input-bordered lg:w-[27rem] md:w-[27rem]" />
                    <input name="date" type="date" placeholder="Donation Date" className="input input-bordered lg:w-[27rem] md:w-[27rem]" />
                    <input name="time" type="time" placeholder="Donation Time" className="input input-bordered lg:w-[27rem] md:w-[27rem]" />

                    <select name="bloodGroup" defaultValue="default" className="select select-bordered lg:w-[27rem] md:w-[27rem]">
                        <option disabled value="default">Select Blood Groupe</option>
                        <option>A+</option>
                        <option>B+</option>
                        <option>B-</option>
                        <option>AB+</option>
                        <option>AB-</option>
                        <option>O+</option>
                        <option>O-</option>
                    </select>
                </div>
                <textarea name="desc" className="textarea mt-4 w-[97%] textarea-bordered" placeholder="Message to the donors"></textarea>

                {
                    blocked?.map(user => {
                        if (user.status === 'Blocked') {
                            toast.error("You are blocked. Blocked users are not allowed to add donation Request");
                            return (
                                <button disabled key={user._id} className="btn btn-md btn-outline btn-primary mt-5 w-[97%]">Submit</button>

                            );
                        } else {
                            return (
                                <button key={user._id} className="btn btn-md btn-outline btn-primary mt-5 w-[97%]">Submit</button>

                            );
                        }
                    })
                }
            </form>
        </div>
    );
};

export default Donation;