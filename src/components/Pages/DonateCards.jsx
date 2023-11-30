import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, Grid, Stack } from '@mui/material';
import Banner from './Banner/Banner';
import Counter from './DonorsCounter/Counter';
import { Link } from 'react-router-dom';
import UseAxiosPublic from '../Hooks/UseAxiosPublic';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

export default function DonateCards() {
    const [cards, setCards] = useState([])
    const axiousPublic = UseAxiosPublic();
    useEffect(() => {
        axiousPublic.get('/donors')
            .then(res => {
                setCards(res.data)
            })
    })
    return (
        <div className='mt-[8rem]'>
            <Helmet>
                <title>
                    World Blood Donor Ogranization
                </title>
            </Helmet>
            <Container sx={{ backgroundImage: 'url("https://i.ibb.co/Jp3mmSN/27577819-ravi24-may-8.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '20rem' }} maxWidth="lg">
                <div className='text-center mt-5'>
                    <h2 className=' lg:text-6xl text-white'>Let's Donate</h2>
                    <h2 className=' lg:text-6xl text-red-500'>BLOOD</h2>
                    <p className='uppercase text-black text-2xl'>Let's Save Some Life And Smile Together</p>
                    <p className='uppercase text-black text-2xl'>World Largest Blood Donor Organization</p>
                    <div className='lg:flex md:flex gap-3 justify-center mt-5'>
                        <Link to="/signin">
                            <Button variant="contained">Become A Donor</Button>
                        </Link>
                        <Link to="/search">
                            <Button variant="contained">Search Donors</Button>
                        </Link>
                    </div>
                </div>
            </Container>
            <h2 className=' md:text-4xl lg:text-4xl mt-[2rem] text-center mb-8'>Our Trusted Members</h2>
            <Container sx={{ text: 'center' }} maxWidth="lg">
                <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap"
                    mx="auto" // Center horizontally
                    justifyContent="center" // Center vertically
                >


                    {
                        cards?.map(cards =>
                            <Card key={cards._id} sx={{ width: '20rem' }}>
                                <CardMedia
                                    sx={{ height: 200, width: '100%' }}
                                    image={cards.image}
                                    title={cards.donor_name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {cards.donor_name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Blood Group: {cards.blood_type}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                </CardActions>
                            </Card>


                        )
                    }



                </Stack>
                <div className="bg-gray-200 p-4 mb-6 mt-5">
                    <div className='text-center mt-8'>
                        <Counter></Counter>
                    </div>
                </div>
                <Banner></Banner>
            </Container>
        </div>
    );
}