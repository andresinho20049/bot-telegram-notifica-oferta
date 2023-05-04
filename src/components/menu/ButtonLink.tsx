import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useAuthenticationContext } from '@/context';

interface IPagesData {
    to: string
    label: string
    icon: JSX.Element
    onClick?: () => void
}
export const pages: IPagesData[] = [
    {
        label: 'Home',
        to: '/',
        icon: <InboxIcon />
    },
    {
        label: 'Dashboard',
        to: '/dashboard',
        icon: <MailIcon />
    },
    {
        label: 'Admin',
        to: '/admin',
        icon: <InboxIcon />
    },
    {
        label: 'Teste',
        to: '/admin/teste',
        icon: <InboxIcon />
    },
    {
        label: 'Login',
        to: '/login',
        icon: <InboxIcon />
    }
]

export const ListItemButtonNextLink = (page: IPagesData) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(page.to);
        page.onClick?.();
    }
  
    return (
        <ListItem key={page.to} disablePadding>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    {page.icon}
                </ListItemIcon>
                <ListItemText primary={page.label} />
            </ListItemButton>
        </ListItem>
    )
}

export const useListMenuItens = () => {
    const { isAuthenticated } = useAuthenticationContext();

    const pagesVisible = isAuthenticated ? pages : pages.filter(page => !page.to.startsWith('/admin'));

    return (
        pagesVisible.map(page => ListItemButtonNextLink(page))
    )
}