import { Button, Paper, TextField } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { FormInputText } from '../components/FormInputText';

type Props = {}

const { REACT_APP_API_URL } = process.env

const Login = (props: Props) => {

    const { handleSubmit, reset, control } = useForm();
    const onSubmit = (data: any) => {
        axios.post(
            `${REACT_APP_API_URL}/auth/login`,
            data
            )
        .then(res => {
            if(res.status === 201) console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }
  
    return (
        <div className='login-form'>
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
    );
}

export default Login