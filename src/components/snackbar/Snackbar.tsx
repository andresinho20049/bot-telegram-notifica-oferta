import { useSnackBarContext } from "../../context";
import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";

export const SnackBarApp = () => {

    const { isMsg, msg, severity, handleClose } = useSnackBarContext();

    return (
        <Snackbar
            open={isMsg}
            onClose={handleClose}
            autoHideDuration={5000}
            TransitionComponent={(props: SlideProps) => <Slide {...props} direction="up" />}
        >
            <Alert onClose={handleClose} severity={severity}>
                {msg}
            </Alert>
        </Snackbar>
    )
}