import * as React from 'react';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useLoaderData } from 'react-router-dom';
import UseAxiosPublic from '../../Hooks/UseAxiosPublic';
import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const Detail = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const loader = useLoaderData();
    const axiousPublic = UseAxiosPublic();
    const { user } = useContext(AuthContext)
    const { _id, name, email, recipentName, district, upozila, location, desc, fullAdress, date, time, bloodGroup, status } = loader;

    const handleDonationStatus = (status, _id) => {
        axiousPublic.patch(`/donation-status-pub/${_id}`, { status })
            .then(res => {
                Swal.fire({
                    title: "Thank You!",
                    text: "for the donation!",
                    icon: "success"
                });
                handleClose()
            })
            .catch(error => {
                console.error("Error updating user role:", error);
            });
    };
    return (
        <div>
            <Helmet>
                <title>Donation Detail</title>
            </Helmet>
            <Container maxWidth="md">

                <div>
                    <div className='mt-[7rem] text-2xl'>
                        <span>
                            Recipient Name : {recipentName}
                        </span>
                        <span>
                            BloodGroup : {bloodGroup}
                        </span>
                        <span>
                            District : {district}
                        </span>
                        <span>
                            Upozila : {upozila}
                        </span>
                        <span>
                            Location : {location}
                        </span>
                        <span>
                            Hospital Name : {fullAdress}
                        </span>
                        <span>
                            Date : {date}
                        </span>
                        <span>
                            Time : {time}
                        </span>

                    </div>

                    <div className='mt-5 text-xl'>
                        {desc}
                    </div>
                    <div className='mt-7'>
                        <button className='btn btn-md btn-success btn-outline' onClick={handleOpen}>
                            {
                                status === 'pending' ? (
                                    <Button className='btn btn-success btn-outline'>Confirm Donation</Button>

                                ) : (
                                    <Button className='btn btn-success btn-outline'>In Progress</Button>

                                )
                            }
                        </button>
                    </div>
                    <div>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Confirm Donation
                                </Typography>
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '25ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField InputProps={{
                                        readOnly: true,
                                    }} className='w-full' id="outlined-basic" label={user?.displayName} variant="outlined" />
                                    <TextField InputProps={{
                                        readOnly: true,
                                    }} className='w-full' id="outlined-basic" label={user?.email} variant="outlined" />
                                </Box>

                                {
                                    status === 'pending' ? (
                                        <Button className='btn btn-success btn-outline' onClick={() => handleDonationStatus('inProgress', _id)}>Confirm Donation</Button>

                                    ) : (
                                        <Button className='btn btn-success btn-outline'>In Progress</Button>

                                    )
                                }
                            </Box>
                        </Modal>
                    </div>
                </div>





            </Container>
        </div>
    );
};

export default Detail;