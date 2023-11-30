import { Button, Card, CardActions, CardContent, TableCell, TableRow, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const SearchResult = ({ data, index }) => {
    const { email, bloodGroup, recipentName, district, upozila, _id, fullAddress, date, time, location } = data;
    return (
        <TableRow
            key={recipentName}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
        <TableCell component="th" scope="row">
            {index + 1}
        </TableCell>
            <TableCell component="th" scope="row">
                {recipentName}
            </TableCell>
            <TableCell component="th" scope="row">
                {email}
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
            <TableCell align="right"> <Link to={`/detail/${_id}`}><button className="btn btn-outline btn-xs">View Detail</button></Link> </TableCell>
        </TableRow>
    );
};

export default SearchResult;