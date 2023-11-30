import { TableCell, TableRow } from "@mui/material";

const ReqRow = ({ servs }) => {
    const { recipentName, district, status, upozila, location, fullAddress, date, time, bloodGroup, requesterName } = servs;

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
                    ) : status === 'canceled' ?(
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
        </TableRow>
    );
};

export default ReqRow;