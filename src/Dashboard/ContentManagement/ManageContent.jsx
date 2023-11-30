import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import ContentTableRow from "./ContentTableRow";
import moment from "moment";
import toast from "react-hot-toast";


// mui

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
const ManageContent = () => {
    const axiosSecure = useAxiosSecure();
    const [itemPerPage, setItemPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(0);
    const [filter, setFilter] = useState(false)
    const [sort, setSort] = useState('')
    const [showFilterData, setFilterData] = useState([])
    const loader = useLoaderData();
    const { count } = loader;
    const numberOfPages = Math.ceil(count / itemPerPage);
    const pages = [...Array(numberOfPages).keys()];

    const { data: blog = [], refetch } = useQuery({
        queryKey: ['blog', currentPage, itemPerPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-blogs?page=${currentPage}&size=${itemPerPage}`);
            return res.data;
        }
    })
    const handleItemsPerPage = (e) => {
        const val = parseInt(e.target.value);
        setItemPerPage(val);
        setCurrentPage(0); // Reset to the first page when changing items per page
    };
    const publishTime = moment().format("MMM Do YY");
    const pending = "pending";
    const updateBlogData = (actionType, _id) => {
        if (actionType === 'publish') {
            axiosSecure.patch(`/all-blogs/${_id}`, { actionType, publishTime })
                .then((res) => {
                    toast.success("Blog Status Updated")
                    refetch();
                })
                .catch((error) => {
                    console.error("Error updating user role:", error);
                });
        } else {
            axiosSecure.patch(`/all-blogs/${_id}`, { actionType, pending })
                .then((res) => {
                    toast.success("Blog Status Updated")
                    refetch();
                })
                .catch((error) => {
                    console.error("Error updating user role:", error);
                });
        }
    };



    const handleDeleteBlog = (_id) => {
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

                axiosSecure.delete(`/delete-blog/${_id}`)
                    .then(() => {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    })
            }
        });
    }

    const handleFilterData = (e) => {
        e.preventDefault();
        const selectedValue = e.target.value;
        setSort(selectedValue);


        if (selectedValue === 'published') {
            const filt = blog.filter(blog => blog.status === 'publish');
            setFilterData(filt);
            setFilter(true)
        } else if (selectedValue === 'draft') {
            const filt = blog.filter(blog => blog.status === 'draft');
            setFilterData(filt);
            setFilter(true)
        } else {
            setFilter(false)
        }
    };


    return (

        <div>
            <Helmet>
                <title>All Contents</title>
            </Helmet>
            <div className="shadow-sm w-full p-5 text-2xl">
                <h2>Manage Content</h2>
            </div>

            <div className="mt-8">
                <select value={sort} onChange={handleFilterData} className="select select-bordered w-[5rem]">
                    <option defaultValue >Sort</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                </select>
            </div>
            <TableContainer className="mt-4" component={Paper}>

                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="right">Writer Name</TableCell>
                            <TableCell align="right">Uploaded At</TableCell>
                            <TableCell align="right">Published At</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            filter ? (
                                <>
                                    {
                                        showFilterData.map(cont => <ContentTableRow key={cont._id} cont={cont} updateBlogData={updateBlogData}></ContentTableRow>)
                                    }
                                </>
                            ) : (
                                <>
                                    {
                                        blog?.map(cont => <ContentTableRow key={cont._id} cont={cont} updateBlogData={updateBlogData} handleDeleteBlog={handleDeleteBlog}></ContentTableRow>)
                                    }
                                </>
                            )
                        }
                    </TableBody>
                </Table>
                <p className="flex gap-3">
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
        </div>

    );
};

export default ManageContent;