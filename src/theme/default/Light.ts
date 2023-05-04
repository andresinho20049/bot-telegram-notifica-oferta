import { green, grey, lightBlue, purple, red, yellow, deepPurple } from "@mui/material/colors";
import {createTheme} from "@mui/material";


export const LightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: lightBlue.A400,
            contrastText: 'black'
        },
        secondary: {
            main: purple.A400,
            contrastText: 'black'
        },
        error: {
            main: red[600]
        },
        warning: {
            main: yellow[900]
        },
        info: {
            main: lightBlue[300]
        },
        success: {
            main: green[700]
        },
        background: {
            default: grey[200],
            paper: grey[50]
        },
        action: {
            active: deepPurple.A400
        }
    },
    typography: {
        allVariants: {
            // fontFamily: "sans-serif",
            // fontWeight: 'lighter',
            color: "#222"
        }
    }
});