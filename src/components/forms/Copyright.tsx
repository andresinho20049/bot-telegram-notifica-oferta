import { Typography, TypographyProps, Link as MuiLink } from '@mui/material';
import Link from 'next/link';

export const Copyright = (props: TypographyProps) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <MuiLink color="inherit" target="_blank" href="https://github.com/andresinho20049/bot-telegram-notifica-oferta" component={Link}>
        Bot Telegram - Notifica Oferta
      </MuiLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}