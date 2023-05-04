import DrawerLeft from "@/components/drawer/Drawer";
import { Box } from "@mui/material";

const Teste = () => {

    return (
        <DrawerLeft>
            <Box sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                Teste
            </Box>
        </DrawerLeft>
    )
}

export default Teste;