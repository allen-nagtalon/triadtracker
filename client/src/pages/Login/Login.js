import axios from "axios";
import { useState } from 'react';
import { Container } from "@mui/material";
import AuthForm from "../../components/AuthForm";

const Login = _ => {
    const [formState, setFormState] = useState({
        username: '',
        password: ''
    })

    const handleInputChange = ({ target }) => {
        setFormState({ ...formState, [target.name]: target.value})
    }

    const handleLoginUser = event => {
        event.preventDefault()
        console.log(formState)
        axios.post('http://127.0.0.1:8000/api/token/', {
            username: formState.username,
            password: formState.password
        })
        .then((data) => {
            console.log(data)
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