import Container from '@mui/material/Container';
import { useFetch } from '../hooks/useFetch';
import { AssessmentDto } from '../types/AssessmentDto';
import { BandResponse } from '../types/Band';
import { AssessmentComponent } from './AssessmentComponent';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, Button, Box } from '@mui/material';
import { useState } from 'react';
import { ErrorHandler } from './Error';
import { usePost } from '../hooks/usePost';
import { AnswerStatus } from '../types/AnswerStatus';
import { useNavigate } from 'react-router-dom';

export function Steps() {
    const { result, loading, makeFetch, error } = useFetch<AssessmentDto | null>("/assessments", null, true);
    const answer = usePost<AnswerStatus | null>("/assessments", null, false);
    const bands = useFetch<BandResponse | null>("/bands", null, true);

    const [choosenBand, setBand] = useState<string>('');
    const [isAnswered, setIsAnswered] = useState<boolean>(false);

    const navigate = useNavigate();

    if (error) {
        return <ErrorHandler error={error} />
    }
    if (bands.error) {
        return <ErrorHandler error={bands.error} />
    }

    if (answer?.result?.isSuccess) {
        navigate('/result', { state: { isSuccess: answer?.result?.isSuccess }  })
    }

    if (result?.attemptNumber === 4 && isAnswered) {
        navigate('/result', { state: { isSuccess: answer?.result?.isSuccess }  })
    }
    
    return (
        <Container fixed>
            {   
                loading ? (
                    <div>Loading data...</div>
                ) : (
                    <AssessmentComponent attemptNumber={result?.attemptNumber} name={ result?.questionAlbum.name } />
                )
            }
            {
                bands.loading ? (<div>Loading bands...</div>) : (
                    <Box p={5}>
                        <FormControl sx={{ m: 1, minWidth: 300 }}>
                            <InputLabel id="demo-simple-select-helper-label">Choose answer:</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={choosenBand}
                                label="Band"
                                disabled={isAnswered}
                                onChange={(event) => {
                                    setBand(event.target.value)    
                                }}
                            >
                                {
                                    bands?.result?.data.map(band => (
                                        <MenuItem key={band._id} value={band._id}>{ band.name }</MenuItem>
                                    ))
                                }
                            </Select>
                            <FormHelperText>
                                { 
                                    (!answer.result?.isSuccess && isAnswered) ? 
                                        <div style={{ color: 'red' }}> Wrong answer! </div> : 
                                    null 
                                }
                            </FormHelperText>
                        </FormControl>
                    </Box>
                )
            }
            <Box display={'flex'} justifyContent={'space-between'} p={5}>
                <Button disabled={!choosenBand || isAnswered} variant="contained" color="success" onClick={() => {
                    answer.makePost({ bandId: choosenBand })
                    setIsAnswered(true);
                    if (result?.attemptNumber === 5) {
                        navigate('result')
                    }
                }}>
                    Send Answer
                </Button>
                <Button disabled={!isAnswered || result?.attemptNumber === 4} variant="contained" color="primary" onClick={() => {
                    makeFetch()
                    setIsAnswered(false);
                    setBand('');
                }}>
                    Next Question
                </Button>
            </Box>
        </Container>
    );
  }