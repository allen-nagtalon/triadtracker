import { useState } from 'react';
import { Container } from '@mui/material';
import { useHistory } from 'react-router-dom';
import axiosInstance from '../../axios';
import AuthForm from '../../components/AuthForm';

const Register = _ => {
    const history = useHistory()

    const [formState, setFormState] = useState({
        username: '',
        char_first_name: '',
        char_last_name: '',
        server: 0,
        data_center: 0,
        password: ''
    })

    const handleInputChange = ({target}) => {
        setFormState({ ...formState, [target.name]: target.value})
    }

    const handleRegisterUser = event => {
        event.preventDefault()
        axiosInstance.post('user/register', {
            username: formState.username,
            char_first_name: formState.char_first_name,
            char_last_name: formState.char_last_name,
            server: formState.server,
            data_center: formState.data_center,
            password: formState.password
        })
        .then((res) => {
            history.push('/login');
        })
    }

    return (
        <Container maxWidth="sm">
            <AuthForm 
                register
                formState={formState}
                handleInputChange={handleInputChange}
                handleSubmit={handleRegisterUser}
            />
        </Container>
    );
}

export default Register;