import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import { useRef } from "react";


import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";

import audio from "../../assets/mixkit-high-tech-bleep-confirmation-2520.wav"
import { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const SignIn = () => {
    const { googleSignIn } = useContext(AuthContext)
    const navigate = useNavigate();
    const axiosPublic = UseAxiosPublic();
    const [audioPlaying, setAudio] = useState(false);
    useEffect(() => {
        if (audioPlaying) {
            const audioElement = new Audio(audio);

            // Set up an event listener for when the audio playback ends
            audioElement.addEventListener('ended', () => {
                // Navigate when the audio ends
                navigate('/');
            });

            // Start playing the audio
            audioElement.play();
        }
    }, [audioPlaying, navigate])

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                setAudio(true)


            })
            .catch(error => {
                toast.error(error.message)
            })
        return (
            <audio src={audioPlaying} controls autoPlay />
        )
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(res => {
                console.log(res.user.photoURL)
                const role = "donor";
                const status = "Active";
                const all = { name: res.user.displayName, email: res.user.email, image: res.user.photoURL, role, status }
                axiosPublic.post('/users', all)
                    .then(res => {
                        console.log(res.data)
                        setAudio(true)
                        navigate("/")
                    })
            })
            .catch(error => console.error(error))
    }

    const defaultTheme = createTheme();


    return (
        <ThemeProvider theme={defaultTheme}>
            <Helmet>
                <title>SignIn</title>
            </Helmet>
            <Container component="main" maxWidth="xs">
                {audioPlaying && <audio src={audio} controls autoPlay />}
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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                    <Button onClick={handleGoogleSignIn}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        <FaGoogle></FaGoogle> <span className="ml-3">Continue with Google</span>

                    </Button>
                </Box>
            </Container>

        </ThemeProvider>
    );
}

export default SignIn;