import { Link, Outlet, useNavigate } from "react-router-dom";
import useAdmin from "../../components/Hooks/useAdmin";
import useVolunteer from "../../components/Hooks/useVolunteer";
import { useContext } from "react";
import { AuthContext } from "../../components/AuthProvider/AuthProvider";
import toast, { Toaster } from 'react-hot-toast';
const Sidebar = () => {
    const [isAdmin] = useAdmin();
    const [isVolunteer] = useVolunteer();
    const { user, logOut } = useContext(AuthContext)
    const navigate = useNavigate();
    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success("Logout Successfull")
                navigate("/signin")
            })
            .catch(error => console.error(error))
    }
    return (
        <div className="flex gap-5 w-full">
            <div className="drawer lg:drawer-open  md:drawer-open min-h-screen w-[20rem]">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button btn-sm lg:hidden">..</label>

                </div>
                <div className="drawer-side ">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-gray-50 text-base-content">
                        <div className="flex flex-col w-full">
                            <div className="divider divider-info"></div>
                            <div className="bt">
                                {
                                    user ? (
                                        <Link to={`/dashboard/profile`}>
                                            <div className="flex gap-3">

                                                <img className="w-[10%] rounded-lg h-6" src={user?.photoURL} alt="" />
                                                {
                                                    user?.displayName
                                                }
                                            </div>
                                        </Link>
                                    ) : (
                                        null
                                    )
                                }
                            </div>
                            <div className="divider divider-error"></div>
                        </div>


                        <div className="join join-vertical w-full">

                            {
                                isAdmin ? (
                                    <>
                                        <div className="collapse collapse-arrow join-item border border-base-300">
                                            <input type="radio" name="my-accordion-4" checked="checked" />
                                            <div className="collapse-title text-xl font-medium">
                                                Home
                                            </div>
                                            <div className="collapse-content">
                                                <li> <Link to="/dashboard">Home</Link> </li>

                                            </div>
                                        </div>
                                        <div className="collapse collapse-arrow join-item border border-base-300">
                                            <input type="radio" name="my-accordion-4" />
                                            <div className="collapse-title text-xl font-medium">
                                                Manage Content
                                            </div>
                                            <div className="collapse-content">
                                                <li> <Link to="/dashboard/content-management/all-blogs">Manage Content</Link> </li>
                                                <li> <Link to="/dashboard/content-management/add-blog">Add Blog</Link> </li>

                                            </div>
                                        </div>
                                        <div className="collapse collapse-arrow join-item border border-base-300">
                                            <input type="radio" name="my-accordion-4" />
                                            <div className="collapse-title text-xl font-medium">
                                                Donation Request
                                            </div>
                                            <div className="collapse-content">

                                                <li> <Link to="/dashboard/all-donation-req">All Blood Donation Requests</Link> </li>
                                                <li> <Link to="/dashboard/creat-donation-request">Create Donation Request</Link> </li>
                                                <li> <Link to={`/dashboard/my-donation-request/email?=${user?.email}`}>My Donation Requests</Link> </li>
                                                <li> <Link to="/dashboard/donation-history">Donation History</Link> </li>
                                                <li> <Link to="/dashboard/donate">Donate</Link> </li>
                                            </div>
                                        </div>
                                        <div className="collapse collapse-arrow join-item border border-base-300">
                                            <input type="radio" name="my-accordion-4" />
                                            <div className="collapse-title text-xl font-medium">
                                                All User
                                            </div>
                                            <div className="collapse-content">
                                                <li> <Link to="/dashboard/all-users">All Users</Link> </li>
                                            </div>
                                        </div>


                                    </>
                                ) : isVolunteer ? (
                                    <>
                                        <div className="collapse collapse-arrow join-item border border-base-300">
                                            <input type="radio" name="my-accordion-4" checked="checked" />
                                            <div className="collapse-title text-xl font-medium">
                                                Home
                                            </div>
                                            <div className="collapse-content">
                                                <li> <Link to="/dashboard">Home</Link> </li>

                                            </div>
                                        </div>
                                        <div className="collapse collapse-arrow join-item border border-base-300">
                                            <input type="radio" name="my-accordion-4" />
                                            <div className="collapse-title text-xl font-medium">
                                                Manage Content
                                            </div>
                                            <div className="collapse-content">
                                                <li> <Link to="/dashboard/content-management/all-blogs">Manage Content</Link> </li>
                                                <li> <Link to="/dashboard/content-management/add-blog">Add Blog</Link> </li>

                                            </div>
                                        </div>
                                        <div className="collapse collapse-arrow join-item border border-base-300">
                                            <input type="radio" name="my-accordion-4" />
                                            <div className="collapse-title text-xl font-medium">
                                                Donation Request
                                            </div>
                                            <div className="collapse-content">

                                                <li> <Link to="/dashboard/all-donation-req">All Blood Donation Requests</Link> </li>
                                                <li> <Link to="/dashboard/creat-donation-request">Create Donation Request</Link> </li>
                                                <li> <Link to={`/dashboard/my-donation-request/email?=${user?.email}`}>My Donation Requests</Link> </li>
                                                <li> <Link to="/dashboard/donate">Donate</Link> </li>
                                            </div>
                                        </div>

                                    </>
                                ) : (

                                    <>

                                        <div className="collapse collapse-arrow join-item border border-base-300">
                                            <input type="radio" name="my-accordion-4" checked="checked" />
                                            <div className="collapse-title text-xl font-medium">
                                                Home
                                            </div>
                                            <div className="collapse-content">
                                                <li> <Link to="/dashboard">Home</Link> </li>

                                            </div>
                                        </div>
                                        <div className="collapse collapse-arrow join-item border border-base-300">
                                            <input type="radio" name="my-accordion-4" />
                                            <div className="collapse-title text-xl font-medium">
                                                Donation Request
                                            </div>
                                            <div className="collapse-content">

                                                <li> <Link to="/dashboard/creat-donation-request">Create Donation Request</Link> </li>
                                                <li> <Link to={`/dashboard/my-donation-request/email?=${user?.email}`}>My Donation Requests</Link> </li>
                                                <li> <Link to="/dashboard/donate">Donate</Link> </li>
                                            </div>
                                        </div>
                                    </>
                                ) // or any fallback content, or you can omit this line if no fallback is needed
                            }
                            <div className="border-inherit">
                                <li className="font-semibold text-2xl mt-6 cursor-pointer" onClick={handleLogout}> Logout </li>
                            </div>

                        </div>
                        {/* {
                            isAdmin ? (
                                <>
                                    <li> <Link to="/dashboard">Home</Link> </li>
                                    <li> <Link to="/dashboard/all-users">All Users</Link> </li>
                                    <li> <Link to="/dashboard/content-management/add-blog">Add Blog</Link> </li>
                                    <li> <Link to="/dashboard/all-donation-req">All Blood Donation Requests</Link> </li>
                                    <li> <Link to="/dashboard/creat-donation-request">Create Donation Request</Link> </li>
                                    <li> <Link to="/dashboard/my-donation-request">My Donation Requests ({reqData.length})</Link> </li>
                                    <li> <Link to="/dashboard/content-management/all-blogs">Manage Content</Link> </li>
                                    <li> <Link to="/dashboard/donate">Donate</Link> </li>

                                </>
                            ) : isVolunteer ? (
                                <>
                                    <li> <Link to="/dashboard">Home</Link> </li>
                                    <li> <Link to="/dashboard/my-donation-request">My Donation Requests ({reqData.length})</Link> </li>
                                    <li> <Link to="/dashboard/creat-donation-request">Create Donation Request</Link> </li>
                                    <li> <Link to="/dashboard/all-donation-req">All Blood Donation Requests</Link> </li>
                                    <li> <Link to="/dashboard/content-management/all-blogs">Manage Content</Link> </li>
                                    <li> <Link to="/dashboard/donate">Donate</Link> </li>
                                </>
                            ) : (

                                <>
                                    <li> <Link to="/dashboard">Home</Link> </li>
                                    <li> <Link to="/dashboard/all-donation-req">All Blood Donation Requests</Link> </li>
                                    <li> <Link to="/dashboard/my-donation-request">My Donation Requests ({reqData.length})</Link> </li>
                                    <li> <Link to="/dashboard/donate">Donate</Link> </li>
                                    <li> <Link to="/dashboard/creat-donation-request">Create Donation Request</Link> </li>
                                </>
                            ) // or any fallback content, or you can omit this line if no fallback is needed
                        } */}

                    </ul>

                </div>
            </div>
            <div className="flex flex-col w-full min-h-screen gap-6">
                {/* Your main content here */}
                <Outlet></Outlet>
                <Toaster />
            </div>
        </div>
    );
};

export default Sidebar;