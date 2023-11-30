import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { FaCalendarAlt, FaLocationArrow, FaBusinessTime, FaClock } from "react-icons/fa";
import { Link } from 'react-router-dom';

const PendingCard = ({ data }) => {
    const { date, location, requesterName, status, time, _id } = data;
    return (
        <div className='flex'>
            <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {requesterName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <span className='flex items-center gap-3'><FaLocationArrow></FaLocationArrow> {location}</span>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <span className='flex items-center gap-3'><FaCalendarAlt></FaCalendarAlt> {date}</span>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <span className='flex items-center gap-3'><FaBusinessTime></FaBusinessTime> {time}</span>
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        <span className='flex items-center gap-3'><FaClock></FaClock> {
                            status === 'pending' ? (
                                <p>Pending</p>
                            ) : (
                                null
                            )
                        }</span>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link to={`/detail/${_id}`}>View Detail</Link>
                </CardActions>
            </Card>
        </div>
    );
};

PendingCard.propTypes = {
    data: PropTypes.object
};

export default PendingCard;