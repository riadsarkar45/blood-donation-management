import { TableCell, TableRow } from "@mui/material";

const PaymentRow = ({pays}) => {
    const {price, date, name, email} = pays;
    return (
        <TableRow
            key={name}
           
        >
            <TableCell component="th" scope="row">
                {name}
            </TableCell>

            <TableCell align="right" component="th" scope="row">
                {email}
            </TableCell>

            <TableCell align="right">{price}</TableCell>
            <TableCell align="right">{date}</TableCell>
        </TableRow>
    );
};

export default PaymentRow;