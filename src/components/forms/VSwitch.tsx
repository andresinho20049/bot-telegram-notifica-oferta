import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { useField } from "@unform/core";
import { useCallback, useEffect, useState } from "react";

interface IVSwitchProps {
    name: string
}

export const VSwitch = ({name}:IVSwitchProps) => {

    const { 
        fieldName, 
        registerField, 
        defaultValue
    } = useField(name);

    const [themeMode, setThemeMode] = useState<'light' | 'dark'>(defaultValue || 'dark');

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => themeMode,
            setValue: (_, newValue) => setThemeMode(newValue),
        })
    }, [registerField, fieldName, themeMode])

    const onChange = useCallback((checked: boolean)=> {
        setThemeMode(checked ? 'dark' : 'light');
    }, [themeMode])

    return (
        <FormGroup>
            <FormControlLabel
                control={
                    <Switch
                        checked={themeMode === 'dark' ? true : false}
                        onChange={(e) => onChange(e.target.checked)}
                        color={"secondary"}
                    />}
                label={themeMode} />
        </FormGroup>
    )
}