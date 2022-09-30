import { TextField } from '@mui/material';
import { Control, Controller } from "react-hook-form";
import React from "react";

type formInputTextProps = {
    name: string;
    control: Control;
    label: string;
    type?: string;
}

export const FormInputText = ({ name, control, label, type }: formInputTextProps) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
            <TextField onChange={onChange} value={value || ''} label={label} type={type ?? ''}/>
            )}
        />
    );
};