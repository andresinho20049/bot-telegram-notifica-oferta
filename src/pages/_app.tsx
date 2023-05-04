import { AppProps } from "next/app";
import { AppThemeContext, AppThemeProvider, AuthenticationProvider, SnackBarProvider } from "../context"

const myApp = ({ Component, pageProps }: AppProps) => {
    return (
        <AppThemeProvider>
            <SnackBarProvider>
                <AuthenticationProvider>
                    <Component {...pageProps} />
                </AuthenticationProvider>
            </SnackBarProvider>
        </AppThemeProvider>
    );
}

export default myApp