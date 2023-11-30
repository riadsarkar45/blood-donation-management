import { TableCell, TableRow } from "@mui/material";
import { FaGripVertical, FaLock, FaLockOpen, FaTrash } from "react-icons/fa";

const UserRow = ({ user, handleUserStatus, handleDeleteUser, handleUserRole }) => {
    const { email, role, status, _id, name, image, district, upozila, bloodGroup } = user;


    return (
        <TableRow
            key={name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {name}
            </TableCell>

            <TableCell component="th" scope="row">
                {email}
            </TableCell>

            <TableCell align=""><img className="w-[36%] rounded-md" src={image} alt="" /></TableCell>
            <TableCell align="">{bloodGroup}</TableCell>
            <TableCell align="">{district}</TableCell>
            <TableCell align="">{upozila}</TableCell>
            <TableCell align="">{role}</TableCell>
            <TableCell align="">{status}</TableCell>
            <TableCell align="">

                <details className="dropdown dropdown-end">
                    <summary className="btn btn-sm"><FaGripVertical /></summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                        {/* admin actions */}
                        <li onClick={() => handleUserRole("Voluenteer", _id)}><a>Make Volunteer</a></li>
                        <li onClick={() => handleUserRole("admin", _id)}><a>Make Admin</a></li>
                        {
                            status === 'Blocked' ? (
                                <>
                                    <li onClick={() => handleUserStatus("Active", _id)}><a><FaLockOpen></FaLockOpen> Un Block</a></li>

                                </>
                            ) : (
                                <>

                                    <li onClick={() => handleUserStatus("Blocked", _id)}><a> <FaLock></FaLock> Block</a></li>

                                </>
                            )
                        }
                        <li onClick={() => handleDeleteUser(_id)}><a><FaTrash></FaTrash>Delete User</a></li>
                    </ul>
                </details>
            </TableCell>
        </TableRow>
    );
};

export default UserRow;