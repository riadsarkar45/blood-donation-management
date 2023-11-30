import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from "react-router-dom";

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Districts from "../Hooks/Districts";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Upozillas from "../Hooks/Upozillas";
import { LinkSharp } from "@mui/icons-material";
import { Input } from "postcss";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
const Registraion = () => {
    const { creatUser, updateUser, logOut } = useContext(AuthContext)
    const axiousPublic = UseAxiosPublic();
    const [district] = Districts();
    const [upazillas] = Upozillas();
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleCreatUser = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        formData.get('image')
        const email = form.email.value;
        const name = form.name.value;
        const role = "donor";
        const status = "Active"
        const confirmPass = form.confirmPassword.value;
        const upozila = form.upozila.value;
        const bloodGroup = form.bloodGroup.value;
        const district = form.district.value;
        if (!/[A-Z]/.test(password)) {
            return toast.error("Password should contain at least one capital later")
        } else if (!/[!@#$%^&*]/.test(password)) {
            return toast.error("One special character is required")
        } else if (password.length < 6) {
            return toast.error("Password must be at least 6 characters long")
        }
        if (password !== confirmPass) {
            return toast.error("Password doesn't match")
        }
        console.log(confirmPass)

        console.log(formData.get('image'))

        try {
            const res = await axiousPublic.post(image_hosting_api, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            const imgUrl = res.data.data.display_url;
            console.log(imgUrl)
            const all = { name, email, role, status, image: res.data.data.display_url, bloodGroup, district, upozila }
            console.log(all)
            if (res.data.success) {
                creatUser(email, password)
                    .then(res => {
                        axiousPublic.post('/users', all)
                            .then(res => {
                                console.log(res.data)
                                updateUser(name, imgUrl)
                                    .then(() => { })
                                    .catch(error => console.error(error))
                            })

                        logOut()
                            .then(() => {
                                navigate("/signin")
                            })
                            .catch(error => console.error(error))

                        form.reset();
                        console.log(res.user)
                    })
                    .catch(error => console.error(toast.error(error.message)))
            }
        } catch (error) {
            console.error(error)
        }
    }
    const defaultTheme = createTheme();

    return (
        <ThemeProvider theme={defaultTheme}>
            <Helmet>
                <title>Registation</title>
            </Helmet>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleCreatUser} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="Name"
                                    label="Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="email"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Upazilla</InputLabel>
                                    <Select
                                        name="upozila"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Select Upazilla"
                                    >
                                        {
                                            upazillas?.map(dist => <MenuItem key={dist.id} value={dist.name}>{dist.name}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select District</InputLabel>
                                    <Select
                                        name="district"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Select Upazilla"
                                    >
                                        {
                                            district?.map(dist =>
                                                <MenuItem key={dist.id} value={dist.name}>{dist.name}</MenuItem>
                                            )
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <p>Profile Photo</p>
                                <input name='image' type="file" className="file-input file-input-bordered w-full" />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select BloodGroup</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Select Upazilla"
                                        name="bloodGroup"
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                Already have an account please <Link to="/signin"> <LinkSharp></LinkSharp> Login </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Registraion;