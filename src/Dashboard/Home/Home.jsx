import { useContext, useState } from "react";
import { AuthContext } from "../../components/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure";
import { FaHospitalUser } from "react-icons/fa";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useDonationReq from "../../components/Hooks/useDonationReq";
import ReqRow from "./ReqRow";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import useAdmin from "../../components/Hooks/useAdmin";
import useVolunteer from "../../components/Hooks/useVolunteer";
import { Helmet } from "react-helmet";
const Home = () => {
    const [showAll] = useState(false);
    const { user } = useContext(AuthContext);
    const [reqData] = useDonationReq();
    const axiosSecure = useAxiosSecure();
    const [isAdmin] = useAdmin();
    const [isVolunteer] = useVolunteer();
    const { data: stats } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data
        }
    })
    const visibleItems = showAll ? reqData : reqData.slice(0, 3);
    return (


        <div>
            <Helmet>
                <title>
                    Dashboard
                </title>
            </Helmet>
            <div className="shadow-sm w-full p-5 text-2xl">
                <h2>Welcome {user?.displayName}</h2>
            </div>


            {
                isAdmin ? (
                    <div className="stats shadow mt-4 w-full">
                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <div className="stat-title">Total Donor</div>
                            <div className="stat-value">{stats?.totalDonor}</div>
                        </div>

                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <FaHospitalUser className="text-3xl"></FaHospitalUser>
                            </div>
                            <div className="stat-title">Donation Requests</div>
                            <div className="stat-value">{stats?.donationRequests}</div>
                        </div>

                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                            </div>
                            <div className="stat-title">Total Fund</div>
                            <div className="stat-value">{stats?.revenue}</div>
                        </div>

                    </div>
                ) : isVolunteer ? (
                    <div className="stats shadow mt-4 w-full">
                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <div className="stat-title">Total Donor</div>
                            <div className="stat-value">{stats?.totalDonor}</div>
                        </div>

                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <FaHospitalUser className="text-3xl"></FaHospitalUser>
                            </div>
                            <div className="stat-title">Donation Requests</div>
                            <div className="stat-value">{stats?.donationRequests}</div>
                        </div>

                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                            </div>
                            <div className="stat-title">Total Fund</div>
                            <div className="stat-value">{stats?.revenue}</div>
                        </div>

                    </div>
                ) : null
            }



            {
                reqData.length > 0 ? (
                    <TableContainer sx={{ marginTop: "5rem" }} component={Paper}>
                        <Link to={`/dashboard/my-donation-request/email?=${user?.email}`}>
                            <Button sx={{ margin: "1rem" }} >See All Request</Button>
                        </Link>
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
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    visibleItems.length > 0 ? (
                                        visibleItems.map(servs => <ReqRow key={servs._id} servs={servs}></ReqRow>)
                                    ) : null
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : null
            }



        </div>
    );
};

export default Home;