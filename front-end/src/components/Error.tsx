import { Container } from "@mui/material";

export function ErrorHandler({ error } : { error: Error}) {
    return (
        <Container fixed>
            <div role="alert">
                <p>An error occurred:</p>
                <pre>{error.message}</pre>
            </div>
        </Container>
    )
  }