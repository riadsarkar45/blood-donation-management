import DonationRow from "./DonationRow";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useAxiosSecure from "../../components/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const DonationReq = () => {
    const [itemPerPage, setItemPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext)
    const [counted, setCount] = useState(' ')
    const [isLoading, setIsLoading] = useState(true)
    const { count } = counted;
    console.log(count)



    const numberOfPages = Math.ceil(count / itemPerPage);
    const { data: reqData = [], refetch } = useQuery({
        queryKey: ['reqData', currentPage, itemPerPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-donation-request?email=${user?.email}&page=${currentPage}&size=${itemPerPage}`);
            return res.data;
        }
    });

    useEffect(() => {
        fetch(`https://assignment-12-server-seven-gamma.vercel.app/req-count?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setCount(data)
                setIsLoading(false)
            })

    }, [user?.email])

    if (isLoading) {
        return <p>Loading...</p>
    }

    const pages = [...Array(numberOfPages).keys()];

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

    const handleItemsPerPage = (e) => {
        const val = parseInt(e.target.value);
        setItemPerPage(val);
        setCurrentPage(0); // Reset to the first page when changing items per page
    };
    return (
        <div>
            <Helmet>
                <title>
                    My Donation Request
                </title>
            </Helmet>
            {
                isLoading ? (
                    <>Loading.....</>
                ) : (
                    <>
                        <div className="shadow-sm w-full p-5 text-2xl">
                            <h2>My Donation Request ({count})</h2>
                        </div>
                        <p className="flex gap-3 mt-4">
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

                        <TableContainer sx={{ marginTop: "2rem" }} component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Recipient Name</TableCell>
                                        <TableCell align="right">Blood Group</TableCell>
                                        <TableCell align="right">Location</TableCell>
                                        <TableCell align="right">District</TableCell>
                                        <TableCell align="right">Upazila</TableCell>
                                        <TableCell align="right">Hospital Name</TableCell>
                                        <TableCell align="right">Date</TableCell>
                                        <TableCell align="right">Time</TableCell>
                                        <TableCell align="right">Status</TableCell>
                                        <TableCell align="right">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        reqData?.map((rows, index) => <DonationRow key={rows._id} rows={rows} index={index} handleDonationStatus={handleDonationStatus} handleDelete={handleDelete} ></DonationRow>)
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                )
            }

        </div>
    );
};

export default DonationReq;