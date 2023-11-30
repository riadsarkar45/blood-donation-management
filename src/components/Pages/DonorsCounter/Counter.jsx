import { Container, Paper, Grid } from '@mui/material';
import CountUp from 'react-countup';

const Counter = () => {

    return (
        <Container maxWidth="lg" className='mt-[6rem] mb-5'>
            <Paper elevation={0} sx={{ padding: '20px', textAlign: 'center', color: 'white', width: '100%' }}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} md={4}>
                        <div className="stat">
                            <div className="stat-figure text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                            </div>
                            <div className="stat-title">Active Donors</div>
                            <div className="stat-value text-error">
                                <CountUp
                                    end={40} duration={15}
                                />
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <div className="stat-title">Donated</div>
                            <div className="stat-value text-secondary">
                                <CountUp
                                    end={100} duration={15}
                                />
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <div className="stat">
                            <div className="stat-title">Incoming Donors</div>
                            <div className="stat-value text-primary">
                                <CountUp
                                    end={80} duration={15}
                                />
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default Counter;
