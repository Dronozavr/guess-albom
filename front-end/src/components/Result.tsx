import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { BandResponse } from '../types/Band'
import { useNavigate, useLocation } from 'react-router-dom';
import { ErrorHandler } from './Error';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { usePost } from '../hooks/usePost';

export function Result() {
    const { result, error, makePost } = usePost<BandResponse | null>("/users", null);
    const navigate = useNavigate();
    const location = useLocation();

    const [name, setName] = useState<string>('');

    if (error) {
        return <ErrorHandler error={error} />
    }

    if (result?.data) {
        navigate('/top')
    }

    if (location.state.isSuccess) {
        return (
            <div>
            <Box sx={{ textAlign: 'center', padding: '30px' }}>
                <Box p={5} color={'green'}>
                    <b>Congradulations you answered correct, you gain 5 points!</b>
                </Box>
                <TextField
                    value={name}
                    id="outlined-required"
                    label="Enter your name"
                    defaultValue="Your Name"
                    onChange={(e) => { setName(e.target.value) }}
                />
                <Box p={5}>
                    <Button disabled={name.length < 3} variant="contained" onClick={() => makePost({ userName: name })}>
                        Submit
                    </Button>
                </Box>
            </Box>
        </div>
        )
    } else {
        return (
            <div>
                <Box sx={{ textAlign: 'center' }} p={5} color={'red'}>We are sorry you failed to pass the test. But you can try again!</Box>
                <Box sx={{ textAlign: 'center' }}>
                    <Button variant="contained" color="success" onClick={() => {
                        navigate('/assessment')
                    }}>
                        Start new test
                    </Button>
                </Box>
            </div>
        )
    }
  }