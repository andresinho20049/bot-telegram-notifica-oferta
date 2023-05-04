import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as yup from "yup";
import { useCallback, useEffect, useRef, useState } from "react";
import Router from 'next/router';
import LockPersonTwoToneIcon from '@mui/icons-material/LockPersonTwoTone';
import { Avatar, Box, Button, CircularProgress, Paper, Grid, CssBaseline, Link as MuiLink, Checkbox, FormControlLabel, Typography, Icon, Divider } from "@mui/material";
import { useAuthenticationContext, useSnackBarContext } from "@/context";
import { VTextField } from "@/components/forms/VTextField";
import Link from "next/link";
import { Copyright } from "@/components/forms/Copyright";
import { SnackBarApp } from "@/components/snackbar/Snackbar";
import { IAuthLogin } from "../api/auth";

const useLogin = () => {

    const [isLoading, setIsLoading] = useState(false);

    const formRef = useRef<FormHandles>(null);
    const formValidSchema: yup.Schema<IAuthLogin> = yup.object().shape({
        username: yup.string().required(),
        access_code: yup.string().required()
    });

    const { showMsg } = useSnackBarContext();
    const { login, logout } = useAuthenticationContext();

    useEffect(() => {
        logout();
    }, []);

    const handleLogin = useCallback((dados: IAuthLogin) => {
        setIsLoading(true);

        formValidSchema
            .validate(dados, { abortEarly: false })
            .then((dadosValid: IAuthLogin) => {

                login(dadosValid)
                    .then(res => {

                        if (res instanceof Error) {
                            console.error(res.message);
                            showMsg("Login Invalido");
                        } else {
                            Router.push('/dashboard');
                        }
                        setIsLoading(false);
                    })
            })
            .catch((errors: yup.ValidationError) => {
                const validationErrors: { [key: string]: string } = {}

                errors.inner.forEach((error: any) => {
                    if (!error.path || validationErrors[error.path]) return;

                    validationErrors[error.path] = error.message
                });
                formRef.current?.setErrors(validationErrors);

                setIsLoading(false);
            })

    }, []);

    return {
        isLoading,
        formRef,

        handleLogin
    }

};

const Login = () => {

    const { isLoading, formRef, handleLogin } = useLogin();

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={5}
                md={7}
                sx={{
                    backgroundImage: 'url(https://picsum.photos/200/300?random=2)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={7} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'action.active', width: 56, height: 56 }}>
                        <LockPersonTwoToneIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <Form ref={formRef} onSubmit={handleLogin}>
                        <VTextField
                            autoFocus
                            fullWidth
                            id="username"
                            label="E-mail"
                            name="username"
                            variant="standard"
                            disabled={isLoading}
                        />
                        <VTextField
                            fullWidth
                            sx={{ mt: 1 }}
                            id="access_code"
                            name="access_code"
                            type="password"
                            label="Access Code"
                            variant="standard"
                            disabled={isLoading}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Lembrar de mim"
                        />
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            disabled={isLoading}
                            sx={{ mt: 3, mb: 2 }}
                            endIcon={isLoading ? <CircularProgress variant="indeterminate" size={22} /> : undefined}
                        >
                            Entrar
                        </Button>
                        <Grid container>
                            <Grid item xs>

                                {/* <RouterLink to={'/forget-password'}>esq</RouterLink> */}

                                <Link href={'/login/forget-password'} passHref>
                                    {/* <MuiLink variant="body2"> */}
                                        Esqueceu a senha?
                                    {/* </MuiLink> */}
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href={'/login/sign-up'} passHref>
                                    {/* <MuiLink variant="body2"> */}
                                        {"Não tem conta? Cadastrar-se"}
                                    {/* </MuiLink> */}
                                </Link>
                            </Grid>
                        </Grid>

                        <Copyright sx={{ mt: 5 }} />
                    </Form>
                </Box>
                <SnackBarApp />
            </Grid>
        </Grid>
    )
}

export default Login;