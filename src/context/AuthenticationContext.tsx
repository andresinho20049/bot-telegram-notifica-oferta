import usePersistedState from "@/hooks/UsePersistedState";
import { IAuthLogin, callLogin } from "@/pages/api/auth";
import { handlerVerify } from "@/service/security/useJwt";
import { JWTPayload } from "jose";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

interface IAuthenticationData {
    token: string | null;
    isAuthenticated: boolean;
    login: (login: IAuthLogin) => Promise<Error | void>;
    logout: () => void;
    userLogged: JWTPayload | null;
}

export const AuthenticationContext = createContext({} as IAuthenticationData);

export const useAuthenticationContext = () => {
    return useContext(AuthenticationContext);
}

interface IAuthenticationProviderProps {
    children: ReactNode
}

export const AuthenticationProvider = ({ children }: IAuthenticationProviderProps) => {
    const [token, setToken] = useState<string | null>(null);
    const [userLogged, setUserLogged] = useState<JWTPayload | null>(null);

    const handleLogin = useCallback(async (login: IAuthLogin): Promise<void | Error> => {

        try {
            const access_token = await callLogin(login);

            if (!access_token)
                return new Error('Access token not provided');
    
            setCookie(undefined, 'token-jwt', access_token);
            setToken(access_token);
        } catch (error: any) {
            console.error(error);
            return new Error(error?.message || 'Login failed');
        }

    }, [])

    const handleLogout = useCallback(() => {
        setToken(null);
        destroyCookie(undefined, 'token-jwt');
    }, [token]);

    useEffect(() => {
        const cookies = parseCookies(undefined, 'token-jwt');
        const access_token = cookies['token-jwt'];
        setToken(access_token);
    }, []);

    useMemo(() => {
        if (!!token) {
            handlerVerify(token)
                .then((payload) => setUserLogged(payload));
        } else {
            setUserLogged(null);
        }
    }, [token]);

    const isAuthenticated = useMemo(() => {
        return !!userLogged;
    }, [userLogged]);

    return (
        <AuthenticationContext.Provider value={{ token, isAuthenticated, login: handleLogin, logout: handleLogout, userLogged }}>
                {children}
        </AuthenticationContext.Provider>
    )
}

