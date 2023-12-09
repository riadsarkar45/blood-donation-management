import { useContext } from "react";
import { AuthContext } from "../../components/AuthProvider/AuthProvider";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure";
import Districts from "../../components/Hooks/Districts";
import Upozillas from "../../components/Hooks/Upozillas";
import { useLoaderData } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const UpdateDonation = () => {
    const loader = useLoaderData();
    const { _id, name, email, recipentName, district, upozila, location, fullAddress, date, time, bloodGroup, status, desc } = loader;

    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [districts] = Districts();
    const [upazillas] = Upozillas();
    const handleUpdateRequest = (e) => {
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
        const status = 'pending';
        const desc = form.desc.value;
        const data = { name, email, recipentName, district, upozila, location, fullAddress, date, time, bloodGroup, status, desc }
        console.log(data)
        axiosSecure.patch(`/edit-donation/${_id}`, data)
            .then(res => {
                toast.success('Update Successfull')
                console.log(res.data)
            })
    }

    return (
        <div>
            
            <Helmet>
                <title>Update Donation</title>
            </Helmet>
            <div className="shadow-sm w-full p-5 text-2xl">
                <h2>Update Donation Request</h2>
            </div>
            <form onSubmit={handleUpdateRequest}>
                <div className="grid grid-cols-2 gap-4 mt-3">
                    <input name="name" type="text" defaultValue={user?.displayName} readOnly placeholder="Logged In user email and name" className="input input-bordered w-[33rem]" />
                    <input name="email" type="text" defaultValue={user?.email} readOnly placeholder="Logged In user email and name" className="input input-bordered w-[33rem]" />
                    <input type="text" name="recipentName" defaultValue={recipentName} placeholder="Recipent Name" className="input input-bordered w-[33rem]" />
                    <select name="district" defaultValue="default" className="select select-bordered w-[33rem]">
                        <option disabled value="default">Recipent District</option>
                        {
                            districts?.map(dis => <option key={dis._id}>{dis.name}</option>)
                        }
                    </select>
                    <select name="upozila" defaultValue="default" className="select select-bordered w-[33rem]">
                        <option disabled value="default">Recipent Upozila</option>
                        {
                            upazillas?.map(dis => <option key={dis._id}>{dis.name}</option>)
                        }
                    </select>
                    <input name="location" defaultValue={location} type="text" placeholder="Hospital Name" className="input input-bordered w-[33rem]" />
                    <input name="fullAddress" defaultValue={fullAddress} type="text" placeholder="Full Address" className="input input-bordered w-[33rem]" />
                    <input name="date" type="date" defaultValue={date} placeholder="Donation Date" className="input input-bordered w-[33rem]" />
                    <input name="time" type="time" defaultValue={time} placeholder="Donation Time" className="input input-bordered w-[33rem]" />

                    <select name="bloodGroup" defaultValue="default" className="select select-bordered w-[33rem]">
                        <option disabled value="default">Select Blood Groupe</option>
                        <option>A+</option>
                        <option>B+</option>
                        <option>B-</option>
                        <option>AB+</option>
                        <option>AB-</option>
                        <option>O+</option>
                        <option>O-</option>
                    </select>
                    <textarea name="desc" defaultValue={desc} className="textarea textarea-bordered" placeholder="Message to the donors"></textarea>
                </div>
                <button className="btn btn-md btn-outline btn-primary w-full mt-5">Submit</button>
            </form>
        </div>
    );
};

export default UpdateDonation;