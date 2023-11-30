import { Box, Card, Container } from '@mui/material';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Districts from '../../Hooks/Districts';
import Upozillas from '../../Hooks/Upozillas';
import SearchResult from './SearchResult';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
export default function Search() {
    const [districts, setDistricts] = useState('')
    const [selectedUpozillas, setSelectedOption] = useState('');
    const [searchText, setSearchText] = useState('');
    const [bloodType, setBloodType] = useState('')
    const [click, setClick] = useState(false)
    const [filterData, setFilterData] = useState([])
    const [district, isLoading] = Districts();
    const [upazillas, loading] = Upozillas();
    const loader = useLoaderData();
    const handleDistrict = (event) => {
        setSelectedOption(event.target.value);
    }

    const handleTVShow = (e) => {
        setDistricts(e.target.value);
    }

    const handleBloodGroup = (e) => {
        setBloodType(e.target.value);
    }

    const handleSearch = (e) => {
        e.preventDefault();

        // Toggle click state
        const convert = !click;
        setClick(convert);

        console.log('Searching for:', searchText, 'districts', districts, 'selectedDistrict', selectedUpozillas, 'blood type', bloodType);

        // Perform filtering based on conditions
        const result = loader?.filter(result =>
            (!searchText || result.email?.toLowerCase().includes(searchText.toLowerCase())) &&
            (!bloodType || result.bloodGroup === bloodType) &&
            (!districts || result.district === districts) &&
            (!selectedUpozillas || result.upozila === selectedUpozillas)
        );
        setFilterData(result || []);
        console.log(result || [])
        if(result.length <= 0){
            toast.error("No data Found")
        }
    };

    


    return (
        <div>
            <Helmet>
                <title>Search Donation</title>
            </Helmet>
            <form>
                <div className='mt-[6rem] w-[95%] m-auto grid lg:flex md:flex gap-3 mb-6'>
                    <select
                        className="select select-primary w-full max-w-xs"
                        value={selectedUpozillas}
                        onChange={handleDistrict}
                    >
                        <option value="" disabled={loading}>Select Upozilla</option>
                        {loading ? (
                            <option value="" disabled>Loading...</option>
                        ) : (
                            upazillas?.map((upazilla) => (
                                <option key={upazilla._id} value={upazilla.name}>
                                    {upazilla.name}
                                </option>
                            ))
                        )}
                    </select>








                    <select
                        className="select select-primary w-full max-w-xs"
                        value={districts}
                        onChange={handleTVShow}
                    >
                        <option value="" disabled={isLoading}>Select District</option>
                        {isLoading ? (
                            <option value="" disabled>Loading...</option>
                        ) : (
                            district?.map((district) => (
                                <option key={district._id} value={district.name}>
                                    {district.name}
                                </option>
                            ))
                        )}
                    </select>








                    <select
                        className="select select-primary w-full max-w-xs"
                        value={bloodType}
                        onChange={handleBloodGroup}
                    >
                        <option defaultValue>Search Blood Groupe</option>
                        <option value="O+">O+</option>
                        <option value="A+">A+</option>
                        <option value="B+">B+</option>
                        <option value="A-">A-</option>
                        <option value="AB-">AB-</option>
                        <option value="AB+">AB+</option>
                    </select>





                    <div>
                        <input
                            type="text"
                            placeholder="Search"
                            className="input input-bordered input-primary w-full max-w-xs"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>


                    <div>
                        <button onClick={handleSearch} className="btn btn-outline btn-info">
                            Search
                        </button>
                    </div>
                </div>
            </form>

            <TableContainer sx={{ marginTop: "2rem", width: '95%', margin: 'auto' }} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>SrNo</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell align="right">Blood Group</TableCell>
                            <TableCell align="right">Location</TableCell>
                            <TableCell align="right">District</TableCell>
                            <TableCell align="right">Upazila</TableCell>
                            <TableCell align="right">Hospital Name</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Time</TableCell>
                            <TableCell align="right">Detail</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            click ? (
                                filterData?.map((data, index) => (
                                    <SearchResult key={data._id} data={data} index={index}></SearchResult>
                                ))
                            ) : (
                                loader?.map((data, index) => (
                                    <SearchResult key={data._id} data={data} index={index}></SearchResult>
                                ))
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    );
}


