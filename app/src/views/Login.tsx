import { Alert, AlertTitle, Button, Paper, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { FormInputText } from '../components/FormInputText';
import AuthService from '../services/AuthService';

type Props = {
    validateUser: () => void;
}

const Login = ({ validateUser }: Props) => {

    const { handleSubmit, reset, control } = useForm();
    const [loginInvalid, setLoginInvalid] = useState<boolean>(false);
    const [validLogin, setValidLogin] = useState<boolean>(false);

    const onSubmit = (data: any) => {
        setLoginInvalid(false);
        AuthService.login(data)
        .then(res => {
            if(res.status === 201) setValidLogin(true);
            validateUser();
        })
        .catch(err => {
            if(err.response.status === 401) setLoginInvalid(true);
        })
    }
  
    return (
        <>
        {validLogin ? <Navigate to='/' /> : null}
        <div className='login-form'>
            {loginInvalid ?
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                Username or Password is Incorrect
            </Alert>
            : null}
            <form>
            <FormInputText 
                    name={"username"}
                    control={control}
                    label={"Email"} 
                />
            <FormInputText 
                    name={"password"}
                    control={control}
                    label={"Password"} 
                    type={"password"}
                />
            <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
            <Button onClick={() => reset()} variant={"outlined"}>Reset</Button>
            </form>
        </div>
        </>
    );
}

export default Login