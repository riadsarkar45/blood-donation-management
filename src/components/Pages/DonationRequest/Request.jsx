import { Container } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PendingCard from './PendingCard';
import { Helmet } from 'react-helmet';
export default function Request() {
    const [pendingData, setPendingData] = useState([]);
    const loader = useLoaderData();

    useEffect(() => {
        const filterData = loader?.filter((req) => req.status === 'pending');
        setPendingData(filterData);
    }, [loader]);

    return (
        <div  className='mt-[6rem]'>
            <Helmet>
                <title>All Donation Request</title>
            </Helmet>
            <h2 className='text-center mb-5 text-2xl'>Donation Requests</h2>
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 6, // Set the gap between cards
                }}
                maxWidth="lg"
            >
                {pendingData?.map((data) => (
                    <PendingCard key={data._id} data={data}></PendingCard>
                ))}
            </Container>
        </div>
    );
}
