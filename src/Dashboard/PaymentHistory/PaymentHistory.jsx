import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../components/Hooks/useAxiosSecure';
import PaymentRow from './PaymentRow';
import { Helmet } from 'react-helmet';
const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { data: payments = [], refetch } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payment-history');
            return res.data;
        }
    });
    return (
        <TableContainer component={Paper}>
            
            <Helmet>
                <title>Payment History</title>
            </Helmet>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        payments?.map(pays => <PaymentRow key={pays._id} pays={pays}></PaymentRow>)
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default PaymentHistory;