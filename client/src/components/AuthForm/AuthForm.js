import { TextField, Button } from '@mui/material';

const AuthForm = props => {
    return (
        <form noValidate autoComplete='off' onSubmit={props.handleSubmit}>
            <TextField 
                id='username'
                name='username'
                value={props.formState.username}
                onChange={props.handleInputChange}
                label='Username'
            />
            <br /> <br />
            <TextField 
                id='password'
                name='password'
                value={props.formState.password}
                onChange={props.handleInputChange}
                label="Password"
                type='password'
            />
            <br /> <br />
            <Button
                type='submit'
            >
                {(props.register) ? 'Register' : 'Login'}
            </Button>
        </form>
    )
}

export default AuthForm