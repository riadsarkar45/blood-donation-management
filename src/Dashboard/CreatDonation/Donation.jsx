import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/AuthProvider/AuthProvider";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const Donation = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
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
        <div className="">
            <div className="shadow-sm w-full p-5 text-2xl">
                <h2>Make New Donation Request</h2>
            </div>
            <form onSubmit={handleDonorRequest}>
                {/* <div className="grid grid-cols-2 gap-4 mt-3">
                    <input name="name" type="text" defaultValue={user?.displayName} readOnly placeholder="Logged In user email and name" className="input input-bordered w-full max-w-xs" />
                    <input name="email" type="text" defaultValue={user?.email} readOnly placeholder="Logged In user email and name" className="input input-bordered w-full max-w-xs" />
                    <input type="text" name="recipentName" placeholder="Recipent Name" className="input input-bordered w-full max-w-xs" />
                    <select name="district" defaultValue="default" className="select select-bordered w-full max-w-xs">
                        <option disabled value="default">Recipent District</option>
                        <option>Han Solo</option>
                        <option>Greedo</option>
                    </select>
                    <select name="upozila" defaultValue="default" className="select select-bordered w-full max-w-xs">
                        <option disabled value="default">Recipent Upozila</option>
                        <option>Han Solo</option>
                        <option>Greedo</option>
                    </select>
                    <input name="location" type="text" placeholder="Hospital Name" className="input input-bordered w-full max-w-xs" />
                    <input name="fullAddress" type="text" placeholder="Full Address" className="input input-bordered w-full max-w-xs" />
                    <input name="date" type="date" placeholder="Donation Date" className="input input-bordered w-full max-w-xs" />
                    <input name="time" type="time" placeholder="Donation Time" className="input input-bordered w-full max-w-xs" />

                    <select name="bloodGroup" defaultValue="default" className="select select-bordered w-full max-w-xs">
                        <option disabled value="default">Select Blood Groupe</option>
                        <option>A+</option>
                        <option>B+</option>
                        <option>B-</option>
                        <option>AB+</option>
                        <option>AB-</option>
                        <option>O+</option>
                        <option>O-</option>
                    </select>
                    <textarea name="desc" className="textarea textarea-bordered" placeholder="Message to the donors"></textarea>
                </div> */}
                {
                    blocked?.map(user => {
                        if (user.status === 'Blocked') {
                            toast.error("You are blocked. Blocked users are not allowed to add a blog");
                            return (
                                <button key={user._id} disabled type="submit" className="btn btn-success btn-outline">
                                    Add Blog
                                </button>
                            );
                        } else {
                            return (
                                <button key={user._id} type="submit" className="btn btn-success btn-outline">
                                    Add Blog
                                </button>
                            );
                        }
                    })
                }
            </form>
        </div>
    );
};

export default Donation;