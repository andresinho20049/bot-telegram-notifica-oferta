import { blue, green, deepPurple, lightBlue, purple, red, yellow } from "@mui/material/colors";
import { createTheme } from "@mui/material";


export const DarkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: blue.A400,
            contrastText: '#fff'
        },
        secondary: {
            main: purple.A200,
            contrastText: '#fff'
        },
        error: {
            main: red[600]
        },
        warning: {
            main: yellow[400]
        },
        info: {
            main: lightBlue[300]
        },
        success: {
            main: green[700]
        },
        background: {
            default: '#202124',
            paper: '#303134'
        },
        action: {
            active: deepPurple.A200
        }
    },
    typography: {
        allVariants: {
            color: "#fff"
        }
    }
});