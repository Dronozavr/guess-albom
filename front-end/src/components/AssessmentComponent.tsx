import Container from '@mui/material/Container';

type AssessmentProps = {
    name: string | undefined;
    attemptNumber: number | undefined
}

export function AssessmentComponent({ name, attemptNumber = 0 }: AssessmentProps) {
    return (
        <Container fixed>

            <h2> Question number: { attemptNumber+1 }</h2>
            <h2>Which band or artist this album belongs to:</h2>
            <h2 style={{ color: 'brown' }}>"{ name }"</h2>
        </Container>
    );
  }