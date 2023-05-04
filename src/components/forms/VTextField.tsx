import { TextField, TextFieldProps } from "@mui/material"
import { useField } from "@unform/core";
import { useEffect, useState } from "react";


type IVTextFieldProps = TextFieldProps & {
    name: string;
}

export const VTextField = ({ name, ...rest }: IVTextFieldProps) => {

    const {
        fieldName,
        registerField,
        defaultValue,
        error,
        clearError } = useField(name);

    const [value, setValue] = useState(defaultValue || '');

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => value,
            setValue: (_, newValue) => setValue(newValue),
        })
    }, [registerField, fieldName, value])

    return (
        <TextField
            {...rest}
            error={!!error}
            helperText={error}
            defaultValue={defaultValue}
            variant='standard'
            size='small'

            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={() => error ? clearError() : undefined}
        />
    )
}