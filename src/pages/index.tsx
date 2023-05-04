import DrawerLeft from "@/components/drawer/Drawer";
import { Box } from "@mui/material";

const Home = () => {

    return (
        <DrawerLeft>
            <Box sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                Home
            </Box>
        </DrawerLeft>
    )
}

export default Home;