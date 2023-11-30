import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure";
import AllDonationRow from "./AllDonationRow"
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
const AllDonation = () => {
    const axiosSecure = useAxiosSecure();
    const { data: donation = [], refetch } = useQuery({
        queryKey: ['donations'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-donation');
            return res.data;
        }
    })

    const handleDonationStatus = (status, _id) => {
        axiosSecure.patch(`/donation-status/${_id}`, { status })
            .then(res => {
                refetch();
                console.log(res.data);
            })
            .catch(error => {
                console.error("Error updating user role:", error);
            });
    };

    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/donation-delete/${_id}`)
                    .then(res => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        refetch()
                        console.log(res.data)
                    })
                    .catch(error => console.error(error))

            }
        });

    }

    return (
        <div className="w-full">
            
            <Helmet>
                <title>All donation request</title>
            </Helmet>
            <div className="shadow-sm w-full p-5 text-2xl">
                <h2>All Donation Requests</h2>
            </div>
            <div className="w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Recipent Name</th>
                            <th>Bloog Group</th>
                            <th>Status</th>
                            <th>Upozila</th>
                            <th>District</th>
                            <th>Full Address</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            donation?.map((rows, index) => <AllDonationRow key={rows._id} rows={rows} index={index} handleDonationStatus={handleDonationStatus} handleDelete={handleDelete}></AllDonationRow>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AllDonation;


// {
//     donation?.map((rows, index) => <AllDonationRow key={rows._id} rows={rows} index={index}></AllDonationRow>)
// }