import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ListSubheader from '@mui/material/ListSubheader';
import BlogItem from './BlogItem';
import { useEffect } from 'react';
import { useState } from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import UseAxiosPublic from '../../Hooks/UseAxiosPublic';
import { Helmet } from 'react-helmet';

export default function Blog() {
    const [blog, setBlog] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [pubData, setPubData] = useState([])
    const axiosPublic = UseAxiosPublic();
    useEffect(() => {
        axiosPublic.get('/blogs-public')
            .then(res => {
                setBlog(res.data)
                setLoading(false)

            })
        const pubData = blog?.filter((data) => data.status === 'publish')
        setPubData(pubData)
    }, [ axiosPublic, blog])
    return (
        <div className='w-[80%] m-auto mt-[4rem]'>
            <Helmet>
                <title>Blogs</title>
            </Helmet>
            {
                isLoading ? (
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <Skeleton variant="rectangular" width={210} height={118} />
                            <Box sx={{ pt: 0.5 }}>
                                <Skeleton />
                                <Skeleton width="60%" />
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Skeleton variant="rectangular" width={210} height={118} />
                            <Box sx={{ pt: 0.5 }}>
                                <Skeleton />
                                <Skeleton width="60%" />
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Skeleton variant="rectangular" width={210} height={118} />
                            <Box sx={{ pt: 0.5 }}>
                                <Skeleton />
                                <Skeleton width="60%" />
                            </Box>
                        </Grid>
                    </Grid>
                ) : (
                    <ImageList sx={{ width: '100%', }}>
                        <ImageListItem key="Subheader" cols={3}>
                            <ListSubheader component="div"></ListSubheader>
                        </ImageListItem>
                        {pubData.map((item) => (
                            <BlogItem key={item._id} item={item}></BlogItem>
                        ))}
                    </ImageList>
                )
            }

        </div>
    );
}



// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import Skeleton from '@mui/material/Skeleton';



// function Media(props) {

//     return (

//         <Box sx={{ width: 210, marginRight: 0.5, my: 5 }}>

// <Grid>
//     <Skeleton variant="rectangular" width={210} height={118} />



//     <Box sx={{ pt: 0.5 }}>
//         <Skeleton />
//         <Skeleton width="60%" />
//     </Box>
// </Grid>

// <Grid>
//     <Skeleton variant="rectangular" width={210} height={118} />



//     <Box sx={{ pt: 0.5 }}>
//         <Skeleton />
//         <Skeleton width="60%" />
//     </Box>
// </Grid>

// <Grid>
//     <Skeleton variant="rectangular" width={210} height={118} />



//     <Box sx={{ pt: 0.5 }}>
//         <Skeleton />
//         <Skeleton width="60%" />
//     </Box>
// </Grid>

// <Grid>
//     <Skeleton variant="rectangular" width={210} height={118} />



//     <Box sx={{ pt: 0.5 }}>
//         <Skeleton />
//         <Skeleton width="60%" />
//     </Box>
// </Grid>

// <Grid>
//     <Skeleton variant="rectangular" width={210} height={118} />



//     <Box sx={{ pt: 0.5 }}>
//         <Skeleton />
//         <Skeleton width="60%" />
//     </Box>
// </Grid>

// <Grid>
//     <Skeleton variant="rectangular" width={210} height={118} />



//     <Box sx={{ pt: 0.5 }}>
//         <Skeleton />
//         <Skeleton width="60%" />
//     </Box>
// </Grid>

// <Grid>
//     <Skeleton variant="rectangular" width={210} height={118} />



//     <Box sx={{ pt: 0.5 }}>
//         <Skeleton />
//         <Skeleton width="60%" />
//     </Box>
// </Grid>

//         </Box>

//     );
// }



// export default function Blog() {
//     return (
//         <Box sx={{ overflow: 'hidden' }}>
//             <Media loading />
//             <Media />
//         </Box>
//     );
// }