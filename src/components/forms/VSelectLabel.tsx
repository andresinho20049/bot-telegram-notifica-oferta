import { MenuItem, TextField } from "@mui/material";
import { useField } from "@unform/core";
import { useEffect, useRef, useState } from "react";

interface IVSelectOptions {
    label: string;
    value: string;
}

interface IVSelectLabelProps {
    name: string;
    label: string;
    options: IVSelectOptions[]
}

export const VSelectLabel = ({

    name,
    label,
    options

}: IVSelectLabelProps) => {

    const {
        fieldName,
        registerField,
        defaultValue,
        error,
        clearError } = useField(name);

    const selectRef = useRef(null);
    const [value, setValue] = useState(defaultValue || 'Roboto');

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: selectRef.current,
            getValue: () => value,
            setValue: (_, newValue) => setValue(newValue),
        })
    }, [registerField, fieldName, value])

    const handleSelectChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(e.target.value);
        clearError();
    }

    return (
        <TextField
            select
            fullWidth
            variant="standard"
            ref={selectRef}
            label={label}
            error={!!error}
            helperText={error}
            value={value}
            onChange={handleSelectChange}
        >
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    )
}