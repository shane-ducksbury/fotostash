import { Alert, AlertTitle, Button, Paper, TextField } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';
import { FormInputText } from '../components/FormInputText';
import AuthService from '../services/AuthService';

type Props = {
    validateUser: () => void;
    userValid: boolean;
}

const Login = ({ validateUser, userValid }: Props) => {

    const { handleSubmit, reset, control } = useForm();
    const [loginInvalid, setLoginInvalid] = useState<boolean>(false);
    const [validLogin, setValidLogin] = useState<boolean>();

    const onSubmit = async (data: any) => {
        setLoginInvalid(false);
        try {
            const res = await AuthService.login(data);
            if(res.status === 201){
                validateUser();
            };
        } catch(err: any){
            if(err.response.status === 401) setLoginInvalid(true);
        }
    }
  
    return (
        <>
        {validLogin || userValid ? <Navigate to='/' /> : null}
        <div className='login-form'>
        <h1><span className="logo">fotostash</span></h1>
        <img src="img/undraw_moments_0y20.svg" alt="" />
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
            <Button type='submit' onClick={handleSubmit(onSubmit)}>Submit</Button>
            <Button onClick={() => reset()} variant={"outlined"}>Reset</Button>
            </form>
            <Link to='/register'>Don't Have An Account?</Link>
        </div>
        </>
    );
}

export default Login