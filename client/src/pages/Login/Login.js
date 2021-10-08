import { useState } from 'react';
import { Container } from "@mui/material";
import AuthForm from "../../components/AuthForm";
import { useHistory } from "react-router";
import axiosInstance from "../../axios";

const Login = _ => {
    const history = useHistory()
    
    const [formState, setFormState] = useState({
        username: '',
        password: ''
    })

    const handleInputChange = ({ target }) => {
        setFormState({ ...formState, [target.name]: target.value})
    }

    const handleLoginUser = event => {
        event.preventDefault()
        axiosInstance.post('token/', {
            username: formState.username,
            password: formState.password
        })
        .then((res) => {
            localStorage.setItem('access_token', res.data.access);
            localStorage.setItem('refresh_token', res.data.refresh);
            axiosInstance.defaults.headers['Authorization'] =
                'JWT ' + localStorage.getItem('access_token');
            history.push('/cards');
        })
    }

    return (
        <Container maxWidth="sm">
            <AuthForm 
                formState={formState}
                handleInputChange={handleInputChange}
                handleSubmit={handleLoginUser}
            />
        </Container>
    )
}

export default Login