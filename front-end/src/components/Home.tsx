import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { BandResponse } from '../types/Band'
import { useFetch } from '../hooks/useFetch'
import { useNavigate } from 'react-router-dom';
import { ErrorHandler } from './Error';
import { AssessmentCheckResponse } from '../types/AssessmentCheckResponse';

export function Home() {
    const existedAssessment = useFetch<AssessmentCheckResponse | null>("/assessments/check", null, true);
    const { result, loading, error } = useFetch<BandResponse | null>("/bands", null, true);
    const navigate = useNavigate();

    if (error) {
        return <ErrorHandler error={error} />
    }

    return (
        <div>
            <Box sx={{ textAlign: 'center' }}>
                <h2>Welcome to guess albums App</h2>
                <h2>You have to guess to which band or artist this album belongs</h2>
                {
                    (existedAssessment.result?.isExist) ? <div>You have unfinished test</div> : null
                }
                <Button variant="contained" onClick={() => navigate('/assessment')}>
                    { existedAssessment.result?.isExist ? 'Continue test' : 'Start test' }
                </Button>
            </Box>
            <Box sx={{ padding: '100px'}}> 
                <h4>List of bands:</h4>
                {loading ? (
                    <div>Loading data...</div>
                ) : (
                    <ol>
                        {
                            result?.data.map((band) => (
                            <li key={band.name}>
                                <div>{band.name}</div>
                            </li>
                            ))
                        }
                    </ol>
                )}
            </Box>
        </div>
    );
  }