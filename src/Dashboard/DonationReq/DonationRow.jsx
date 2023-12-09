import { TableCell, TableRow } from "@mui/material";
import { FaGripVertical, FaLock, FaTrash, FaCheck, FaDharmachakra, FaRegWindowClose } from "react-icons/fa";
import useAdmin from "../../components/Hooks/useAdmin";
import useVolunteer from "../../components/Hooks/useVolunteer";
import { Link } from "react-router-dom";

const DonationRow = ({ rows, index, handleDonationStatus, handleDelete }) => {
    const [isAdmin] = useAdmin();
    const [isVolunteer] = useVolunteer()

    const { recipentName, district, upozila, location, fullAddress, date, time, bloodGroup, requesterName, status, _id } = rows;
    return (
        <TableRow
            key={recipentName}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {recipentName}
            </TableCell>

            <TableCell component="th" scope="row">
                {bloodGroup}
            </TableCell>

            <TableCell align="right">{location}</TableCell>
            <TableCell align="right">{district}</TableCell>
            <TableCell align="right">{upozila}</TableCell>
            <TableCell align="right">{fullAddress}</TableCell>
            <TableCell align="right">{date}</TableCell>
            <TableCell align="right">{time}</TableCell>
            <TableCell align="right">
                {
                    status === 'inProgress' ? (
                        <div className="badge badge-warning">In Progress</div>
                    ) : status === 'canceled' ? (
                        <div className="badge badge-error">Canceled</div>
                    ) : status === 'done' ? (
                        <div className="badge badge-accent">Done</div>
                    ) : status === 'pending' ? (
                        <div className="badge badge-ghost">Pending</div>
                    ) : (
                        null
                    )
                }
            </TableCell>
            <TableCell>
                <details className="dropdown dropdown-end">
                    <summary className="btn btn-sm"><FaGripVertical /></summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                        {/* admin actions */}

                        {
                            status === 'inProgress' ? (
                                <>
                                    <li onClick={() => handleDonationStatus("done", _id)}><a><FaCheck /> Done</a></li>
                                    <li onClick={() => handleDonationStatus("canceled", _id)}><a><FaRegWindowClose /> Cancel</a></li>
                                    <li onClick={() => handleDelete(_id)}><a><FaTrash></FaTrash>Delete</a></li>
                                    <li><Link to={`dashboard/edit-donation/${_id}`}>Edit</Link></li>

                                </>
                            ) : status === 'canceled' ? (
                                <>

                                    <li onClick={() => handleDonationStatus("inProgress", _id)}><a><FaDharmachakra /> In Progress</a></li>
                                    <li onClick={() => handleDonationStatus("done", _id)}><a><FaCheck /> Done</a></li>
                                    <li onClick={() => handleDelete(_id)}><a><FaTrash></FaTrash>Delete</a></li>
                                    <li><Link to={`/dashboard/edit-donation/${_id}`}>Edit</Link></li>

                                </>
                            ) : status === 'pending' ? (
                                <>

                                    <li onClick={() => handleDonationStatus("inProgress", _id)}><a><FaDharmachakra /> In Progress</a></li>
                                    <li onClick={() => handleDonationStatus("done", _id)}><a><FaCheck /> Done</a></li>
                                    <li onClick={() => handleDonationStatus("canceled", _id)}><a><FaRegWindowClose /> Cancel</a></li>
                                    <li><Link to={`/dashboard/edit-donation/${_id}`}>Edit</Link></li>


                                </>
                            ) : (
                                <>
                                    <li onClick={() => handleDelete(_id)}><a><FaTrash></FaTrash>Delete</a></li>
                                    <li><Link to={`/dashboard/edit-donation/${_id}`}>Edit</Link></li>

                                </>
                            )
                        }


                    </ul>
                </details>
            </TableCell>
        </TableRow>
    );
};

export default DonationRow;