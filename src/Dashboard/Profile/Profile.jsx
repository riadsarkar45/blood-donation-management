import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure"
import toast from "react-hot-toast";
import UseAxiosPublic from "../../components/Hooks/UseAxiosPublic";
import { Helmet } from "react-helmet";
const Profile = () => {
    const { user, updateUser } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const axiousPublic = UseAxiosPublic();
    const [filterEmail, setFilterEmail] = useState('')
    const [dstrucher, setDstructure] = useState([])
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        }
    });

    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;




    useEffect(() => {
        users?.map(data => setFilterEmail(data.email))
        const filter = users?.filter(filt => filt.email === user?.email)
        filter?.map(users => setDstructure(users))
    }, [users, filterEmail, user?.email])
    const { _id, email, status, image, name, role, district, upozila, bloodGroup } = dstrucher;

    const handleUpdateUserInfo = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const bloodGroup = form.bloodGroup.value;
        const district = form.district.value;
        const upozila = form.upozila.value;
        e.preventDefault();
        const formData = new FormData(form);
        formData.get('image')
        try {
            const res = await axiousPublic.post(image_hosting_api, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            const image = res.data.data.display_url;

            const dataToUpdate = {
                name,
                bloodGroup,
                district,
                upozila,
                image
            }

            if (res.data.success) {
                axiosSecure.patch(`/user-update/${_id}`, dataToUpdate)
                    .then(res => {
                        refetch();
                        updateUser(name, image)
                            .then(() => { })
                            .catch(error => console.error(error))
                        if (res.data.matchedCount > 0) {
                            toast.success("Already Updated")
                        } else {
                            toast.success('Info Updated')

                        }
                    })
            }
        } catch (error) {
            console.error(error)
        }


    };

    return (
        <div className="ml-6">
            
            <Helmet>
                <title>
                    Profile
                </title>
            </Helmet>
            <div>
                {
                    user ? (
                        <div className="">
                            {
                                <img className="w-[25%] p-5 bg-blue-50 rounded-[13.5rem]" src={image} alt="" />
                            }
                        </div>
                    ) : (
                        null
                    )
                }
            </div>
            <div className="grid">
                <input type="text" defaultValue={email} placeholder="email" readOnly className="input input-bordered w-full  mt-5" />
                <input type="text" defaultValue={role} placeholder="email" readOnly className="input input-bordered w-full  mt-5" />
                <form className="grid" onSubmit={handleUpdateUserInfo}>
                    <input name="name" type="text" defaultValue={name} placeholder="Name" className="input input-bordered w-full  mt-5" />
                    <input name="image" type="file" className="file-input file-input-bordered w-full mt-5" />
                    <input defaultValue={bloodGroup} name="bloodGroup" type="text" placeholder="Blood Group" className="input input-bordered w-full  mt-5" />
                    <input defaultValue={district} name="district" type="text" placeholder="District" className="input input-bordered w-full  mt-5" />
                    <input defaultValue={upozila} name="upozila" type="text" placeholder="Upozila" className="input input-bordered w-full  mt-5" />
                    <button type="submit" className="btn mt-4">Update Info</button>
                </form>
            </div>
        </div>
    );
};

export default Profile;