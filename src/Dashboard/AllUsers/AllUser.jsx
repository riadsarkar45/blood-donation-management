import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure.jsx";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import UserRow from "./UserRow.jsx";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const AllUser = () => {
    const axiosSecure = useAxiosSecure();
    const loader = useLoaderData();
    const [itemPerPage, setItemPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [filtData, setFiltData] = useState([])
    const [getFiltData, setFilData] = useState(false)
    const { count } = loader;

    const numberOfPages = Math.ceil(count / itemPerPage);
    const pages = [...Array(numberOfPages).keys()];

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users', currentPage, itemPerPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?page=${currentPage}&size=${itemPerPage}`);
            return res.data;
        }
    });


    const handleUserStatus = (actionType, _id) => {
        axiosSecure
            .patch(`/users/${_id}`, { actionType })
            .then(() => {
                refetch();
            })
            .catch((error) => {
                console.error("Error updating user role:", error);
            });
    };


    const handleUserRole = (actionType, _id) => {
        axiosSecure
            .patch(`/users-role/${_id}`, { actionType })
            .then(() => {
                refetch();
            })
            .catch((error) => {
                console.error("Error updating user role:", error);
            });
    };

    const handleDeleteUser = (_id) => {
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
                axiosSecure.delete(`/delete-user/${_id}`)
                    .then(() => {

                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        refetch();
                        toast.success("User Deleted")
                    })
            }
        });

    }

    const handleSortUser = (sort) => {
        const filt = !getFiltData;
        setFilData(filt)
        const filter = users?.filter(user => user.status === sort)
        setFiltData(filter)
        setFilData(true)
    };


    const handleItemsPerPage = (e) => {
        const val = parseInt(e.target.value);
        setItemPerPage(val);
        setCurrentPage(0); // Reset to the first page when changing items per page
    };



    return (

        <TableContainer component={Paper}>
            <Helmet>All User</Helmet>
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn m-1">Sort</div>
                <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <button className="btn m-1" onClick={() => handleSortUser('Active')}>
                        Active
                    </button>
                    <button className="btn m-1" onClick={() => handleSortUser('Blocked')}>
                        Blocked
                    </button>
                </ul>
            </div>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">EMail</TableCell>
                        <TableCell align="right">Photo</TableCell>
                        <TableCell align="right">Blood Group</TableCell>
                        <TableCell align="right">District</TableCell>
                        <TableCell align="right">Upozila</TableCell>
                        <TableCell align="right">Role</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        getFiltData ? (
                            filtData.map((user) => (
                                <UserRow key={user._id} user={user} handleUserStatus={handleUserStatus} handleDeleteUser={handleDeleteUser} handleUserRole={handleUserRole}></UserRow>
                            ))
                        ) : (
                            users.map((user) => (
                                <UserRow key={user._id} user={user} handleUserStatus={handleUserStatus} handleDeleteUser={handleDeleteUser} handleUserRole={handleUserRole}></UserRow>
                            ))
                        )

                    }
                </TableBody>
            </Table>
            <p className="flex gap-3 mt-10">
                {
                    pages.map(page => <button
                        className={`btn ${currentPage === page ? 'bg-blue-200' : undefined}`}
                        onClick={() => setCurrentPage(page)}
                        key={page}
                    >{page}</button>
                    )
                }
                <select value={itemPerPage} onChange={handleItemsPerPage} name="" id="">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            </p>
        </TableContainer>



        // <div className="w-full">
        //     <div className="shadow-sm w-full p-5 text-2xl">
        //         <h2>All User</h2>
        //     </div>
        //     <div className="">

        //         <div className="w-[57rem]">
        //             <table className="table overflow-x-auto">
        //                 {/* head */}
        //                 <thead>
        //                     <tr>
        //                         <th>
        //                             <label>
        //                                 <input type="checkbox" className="checkbox" />
        //                             </label>
        //                         </th>
        //                         <th>Name</th>
        //                         <th>Email</th>
        //                         <th>Status</th>
        //                         <th>Role</th>
        //                         <th>Action</th>
        //                     </tr>
        //                 </thead>
        //                 <tbody>
        //                     {
        //                         users.map(user =>
        //                             <UserRow key={user._id} user={user} handleUserRole={handleUserRole} />
        //                         )
        //                     }
        //                 </tbody>
        //             </table>
        //         </div>
        //         <p className="flex gap-3">
        //             {
        //                 pages.map(page => <button
        //                     className={`btn ${currentPage === page ? 'bg-blue-200' : undefined}`}
        //                     onClick={() => setCurrentPage(page)}
        //                     key={page}
        //                 >{page}</button>
        //                 )
        //             }
        //             <select value={itemPerPage} onChange={handleItemsPerPage} name="" id="">
        //                 <option value="5">5</option>
        //                 <option value="10">10</option>
        //                 <option value="20">20</option>
        //                 <option value="50">50</option>
        //             </select>
        //         </p>
        //     </div>
        // </div>
    );
};

export default AllUser;
