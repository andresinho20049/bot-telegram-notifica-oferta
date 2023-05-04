import DrawerLeft from "@/components/drawer/Drawer";
import { Box, ImageList, ImageListItem, useMediaQuery, useTheme } from "@mui/material";

const Home = () => {

    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('sm'));

    function srcset(image: string, size: number, rows = 1, cols = 1) {
        return {
            src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${size * cols}&h=${size * rows
                }&fit=crop&auto=format&dpr=2 2x`,
        };
    }

    const itemData = [
        {
            img: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/jiu-jitsu-brazilian-flag-michael-s.jpg',
            title: 'Breakfast',
            rows: 2,
            cols: 2,
        },
        {
            img: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/1-retro-jiu-jitsu-michael-s.jpg',
            title: 'Burger',
            rows: 2
        },
        {
            img: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/jiu-jitsu-justice-hanne-lore-koehler.jpg',
            title: 'Camera',
            rows: 2
        },
        {
            img: 'https://cdn.dribbble.com/users/264288/screenshots/6159216/jiu_jitsu_icons.jpg',
            title: 'Basketball',
            cols: smUp ? 4 : 2,
            rows: 1
        },
        {
            img: 'https://e0.pxfuel.com/wallpapers/615/506/desktop-wallpaper-jiu-jitsu-iphone.jpg',
            title: 'Bike',
            rows: 2,
        },
        {
            img: 'https://i.pinimg.com/236x/91/4a/a3/914aa3d4fa3c214fbcba471246cb6e84.jpg',
            title: 'Sea star',
            rows: 2
        },
        {
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdocOjkPFsTYcuEnByW096wJWP3DAwU3tBtjwx3f7P4Q&usqp=CAU&ec=48600112',
            title: 'Honey',
            cols: 2,
            rows: 2
        }
    ];

    return (
        <DrawerLeft>
        <Box sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            <ImageList
                // sx={{ width: { xs: '90vw', md: 800 }, height: '80vh' }}
                variant="quilted"
                cols={smUp ? 4 : 2}
                rowHeight={170}
            >
                {itemData.map((item) => (
                    <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                        <img
                            {...srcset(item.img, 350, item.rows, item.cols)}
                            alt={item.title}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Box>
    </DrawerLeft>
    )
}

export default Home;