import Container from '@mui/material/Container';
import { useFetch } from '../hooks/useFetch';
import { UserRaitingResponse } from '../types/UserRaiting';

export function Top() {
    const { result, loading, error } = useFetch<UserRaitingResponse | null>("/top-list", null, true);

    if(loading) {
        return (<div>Loading...</div>)
    }
    if(error) {
        return (<div>Error: { error.message }</div>)
    }

    return (
        <Container fixed>
            <h2>The table of top users:</h2>
            <ol>
                {
                    result?.data?.map(usr => (<li> {`${usr.name}  - ${usr.points}`} </li>))
                }
            </ol>
        </Container>
    );
  }