import { Alert, AlertTitle, Button } from '@mui/material';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { FormInputText } from '../components/FormInputText'
import AuthService from '../services/AuthService';

type Props = {}

const Register = (props: Props) => {
    const { handleSubmit, reset, control } = useForm();
    const [registerInvalid, setRegisterInvalid] = useState<boolean>(false);
    const [validRegister, setValidRegister] = useState<boolean>(false);

    const onSubmit = (data: any) => {
        setRegisterInvalid(false);
        AuthService.register(data)
        .then(res => {
            if(res.status === 201) setValidRegister(true);
            
        })
        .catch(err => {
            if(err.response.status === 401) setRegisterInvalid(true);
            if(err.response.status === 422) setRegisterInvalid(true);
        })
    }

    return (
        <div className='signup-form'>
            {validRegister ? <Navigate to='/login' /> : null}
            <h1><span className="logo">fotostash</span></h1>
            <h3>Register</h3>
            <Alert severity='info' sx={{'max-width': 700}}>
                Sign up for fotostash, a self-hostable web application for managing your photos. fotostash is currently in testing. There is a chance your photos may be deleted from this demo server, so please don't store personal or precious images here.
                <br></br><br></br><Link to='/login'>Already have an account?</Link>
            </Alert>
            {registerInvalid ?
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                Registration Failed
            </Alert>
            : null}
            <form>
                <FormInputText 
                    name={'email'}
                    control={control}
                    label={'Email'}
                />
                <FormInputText 
                    name={'password'}
                    control={control}
                    label={"Password"} 
                    type={"password"}
                />
                <FormInputText 
                    name={'firstName'}
                    control={control}
                    label={"First Name"} 
                />
                <FormInputText 
                    name={'lastName'}
                    control={control}
                    label={"Last Name"} 
                />
                <Button onClick={handleSubmit(onSubmit)}>Register</Button>
                <Button onClick={() => reset()} variant={"outlined"}>Reset</Button>
            </form>
            
        </div>
    )
}

export default Register