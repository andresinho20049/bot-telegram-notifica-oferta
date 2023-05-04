import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { AlertColor } from "@mui/material/Alert";


interface ISnackBarContextData {
    msg: string,
    showMsg: (msg: string, severity?: AlertColor | undefined) => void,
    isMsg: boolean,
    severity: AlertColor | undefined,
    handleClose: () => void
}

export const SnackBarContext = createContext({} as ISnackBarContextData);

export const useSnackBarContext = () => useContext(SnackBarContext);

interface ISnackBarProviderProps {
    children: ReactNode
}

export const SnackBarProvider = ({children}:ISnackBarProviderProps) => {

    const [msg, setMsg] = useState<string>('');
    const [severity, setSeverity] = useState<AlertColor>('error');

    const showMsg = useCallback((msg: string, severity: AlertColor = 'error') => {
        setMsg(msg);
        setSeverity(severity);
    }, [msg, severity]);

    const handleClose = useCallback(() => {
        setMsg('');
    }, [msg])
    
    return (
        <SnackBarContext.Provider value={{msg, showMsg, isMsg: !!msg, severity, handleClose}}>
            {children}
        </SnackBarContext.Provider>
    )

}