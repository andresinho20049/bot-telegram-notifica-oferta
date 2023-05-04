import { ThemeProvider } from "@mui/material";
import { createContext, ReactNode, useCallback, useContext, useMemo } from "react";
import usePersistedState from "../hooks/UsePersistedState";
import { DarkTheme, LightTheme } from "../theme";

interface IAppThemeContextData {
    isDark: boolean;
    toggleIsDark: () => void;

    themeName: string | null;
    setThemeName: (themeName: string | null) => void;
}

export const AppThemeContext = createContext({} as IAppThemeContextData);

export const useAppThemeContext = () => {
    return useContext(AppThemeContext);
}

interface IAppThemeProviderProps {
    children: ReactNode
}

export const AppThemeProvider = ({ children }: IAppThemeProviderProps) => {
    const [isDark, setThemeIsDark] = usePersistedState<boolean>("themeIsDark", false);
    const [themeName, setThemeName] = usePersistedState<string | null>("theme", null);

    const toggleIsDark = useCallback(() => {
        setThemeIsDark((prev) => !prev);
    }, []);

    const theme = useMemo(() => {

        switch (themeName) {
            case "Custom":
                return isDark ? DarkTheme : LightTheme;

            default:
                return isDark ? DarkTheme : LightTheme;
        }

    }, [isDark, themeName]);

    return (
        <AppThemeContext.Provider value={{ isDark, toggleIsDark, themeName, setThemeName }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </AppThemeContext.Provider>
    )
}