import { FaBus, FaCheck, FaGripVertical, FaTrash } from "react-icons/fa";
import useAdmin from "../../components/Hooks/useAdmin";
import useVolunteer from "../../components/Hooks/useVolunteer";
import { Link } from "react-router-dom";

const AllDonationRow = ({ rows, index, handleDonationStatus, handleDelete }) => {
    const [isAdmin] = useAdmin();
    const [isVolunteer] = useVolunteer();
    const { recipentName, district, upozila, location, fullAddress, date, time, _id, bloodGroup, status } = rows;
    return (

        <tr>
            < th > {index + 1}</th >
            <td>{recipentName}</td>
            <td>{bloodGroup}</td>
            <td>
                {
                    status === 'done' ? (
                        <div className="badge badge-accent">Done</div>
                    ) : status === 'inProgress' ? (
                        <div className="badge badge-warning">Processing</div>

                    ) : status === 'canceled' ? (
                        <div className="badge badge-error">Canceled</div>
                    ) : (
                        <div className="badge badge-neutral">Pending</div>
                    )
                }
            </td>
            <td>{upozila} upozila</td>
            <td>{district} district</td>
            <td>{fullAddress}</td>
            <td>{date}</td>
            <td>{time}</td>
            <td>
                <div>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-sm"><FaGripVertical /></label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            {
                                isAdmin ? (
                                    <>
                                        <li onClick={() => handleDonationStatus("inProgress", _id)}><a><FaBus /> In Progress</a></li>
                                        <li onClick={() => handleDonationStatus("done", _id)}><a><FaCheck /> Done</a></li>
                                        <li onClick={() => handleDonationStatus("canceled", _id)}><a> <span className="texxt-black font-extrabold"> X</span> Cancel</a></li>
                                        <li onClick={() => handleDelete(_id)}><a> <FaTrash></FaTrash> Delete</a></li>

                                        <li><Link to={`/dashboard/edit-donation/${_id}`}>Edit</Link></li>

                                    </>
                                ) : isVolunteer ? (
                                    <>
                                        <li onClick={() => handleDonationStatus("inProgress", _id)}><a><FaBus /> In Progress</a></li>
                                        <li onClick={() => handleDonationStatus("done", _id)}><a><FaCheck /> Done</a></li>
                                        <li onClick={() => handleDonationStatus("canceled", _id)}><a> <span className="texxt-black font-extrabold"> X</span> Cancel</a></li>
                                        <Link to={`edit-donation/${_id}`}>Edit</Link>
                                    </>
                                ) : (
                                    <>
                                        <li onClick={() => handleDonationStatus("inProgress", _id)}><a><FaBus /> In Progress</a></li>
                                        <li onClick={() => handleDonationStatus("done", _id)}><a><FaCheck /> Done</a></li>
                                        <li onClick={() => handleDonationStatus("canceled", _id)}><a> <span className="texxt-black font-extrabold"> X</span> Cancel</a></li>
                                        <Link to={`../AllDonation/dashboard/edit-donation/${_id}`}>Edit</Link>
                                    </>
                                )
                            }

                        </ul>
                    </div>
                </div>
            </td>

        </tr >
    );
};

export default AllDonationRow;