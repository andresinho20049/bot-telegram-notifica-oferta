import DrawerLeft from "@/components/drawer/Drawer";
import { Box } from "@mui/material";

const Admin = () => {

    return (
        <DrawerLeft>
            <Box sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                Admin
            </Box>
        </DrawerLeft>
    )
}

export default Admin;