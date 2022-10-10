import { Alert, AlertTitle, Button } from '@mui/material';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
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
            <h1>Register</h1>
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
                <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
                <Button onClick={() => reset()} variant={"outlined"}>Reset</Button>
            </form>
        </div>
    )
}

export default Register