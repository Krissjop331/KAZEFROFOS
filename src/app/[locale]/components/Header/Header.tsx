'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/app/[locale]/context/AuthContext';
import { AppBar, Toolbar, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import clsx from 'clsx';

import Logo from '@/resources/logo.png';
import RU from '@/resources/icons/ru-ln.png';
import EN from '@/resources/icons/en-ln.png';
import KZ from '@/resources/icons/kz-ln.png';
import TEL from '@/resources/icons/phone.svg';
import GEO from '@/resources/icons/geo_icons.svg';
import './Header.css';

export default function Header() {
  const t = useTranslations('Header');
  const { isAuthenticated, logout, isAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = pathname.split('/')[1];
  const currentUrl = pathname.split('/').slice(2).join('/');

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const handleAdminPage = () => {
    router.push(`/${currentLocale}/admin/orders`);
  };

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  const isActive = (path: string) => pathname === path;

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => toggleDrawer(false)}
      onKeyDown={() => toggleDrawer(false)}
    >
      <List>
        <ListItem button>
          <Link href={`/${currentLocale}`} passHref>
            <ListItemText primary={t('home')} />
          </Link>
        </ListItem>
        <ListItem button>
          <Link href={`/${currentLocale}/products`} passHref>
            <ListItemText primary={t('catalog')} />
          </Link>
        </ListItem>
        <ListItem button>
          <Link href={`/${currentLocale}/about`} passHref>
            <ListItemText primary={t('about')} />
          </Link>
        </ListItem>
        <ListItem button>
          <Link href={`/${currentLocale}/contacts`} passHref>
            <ListItemText primary={t('contacts')} />
          </Link>
        </ListItem>
        {isAuthenticated ? (
          <>
            <ListItem button onClick={handleLogout}>
              <ListItemText primary={t('logout')} />
            </ListItem>
            {isAdmin && (
              <ListItem button onClick={handleAdminPage}>
                <ListItemText primary={t('admin')} />
              </ListItem>
            )}
          </>
        ) : (
          <ListItem button onClick={() => router.push(`/${currentLocale}/login`)}>
            <ListItemText primary={t('login')} />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <header>
      <nav className="menu-language">
        <div className="small-contacts">
          <div className="icons">
            <Image className="icon" src={TEL} alt="Наш телефон" />
            <p className="small-txt">8 707 555 22 22</p>
          </div>
          <div className="icons">
            <Image className="icon" src={GEO} alt="Где мы находимся" />
            <p className="small-txt">г. Москва, улица Дубынина 42</p>
          </div>
        </div>
        <div className="languages">
          <Button>
            <Link href={`/ru/${currentUrl}`}><Image className="icon" src={RU} alt="Русский язык" /></Link>
          </Button>
          <Button>
            <Link href={`/en/${currentUrl}`}><Image className="icon" src={EN} alt="Английский язык" /></Link>
          </Button>
          <Button>
            <Link href={`/kz/${currentUrl}`}><Image className="icon" src={KZ} alt="Казахский язык" /></Link>
          </Button>
        </div>
      </nav>
      <AppBar position="static" className="header" sx={{ backgroundColor: '#1f1f1f', padding: '10px 50px' }}>
        <Toolbar>
          <Image src={Logo} alt="Казеврофос" width={100} height={70} />
          <Box className="desk-menu" sx={{ display: 'flex', gap: '20px' }}>
            <Link href={`/${currentLocale}`} passHref>
              <Button className={clsx({ active: isActive(`/${currentLocale}`) })} color="inherit">
                {t('home')}
              </Button>
            </Link>
            <Link href={`/${currentLocale}/products`} passHref>
              <Button className={clsx({ active: isActive(`/${currentLocale}/products`) })} color="inherit">
                {t('catalog')}
              </Button>
            </Link>
            <Link href={`/${currentLocale}/about`} passHref>
              <Button className={clsx({ active: isActive(`/${currentLocale}/about`) })} color="inherit">
                {t('about')}
              </Button>
            </Link>
            <Link href={`/${currentLocale}/contacts`} passHref>
              <Button className={clsx({ active: isActive(`/${currentLocale}/contacts`) })} color="inherit">
                {t('contacts')}
              </Button>
            </Link>
            {isAuthenticated ? (
              <>
                <Button color="inherit" onClick={handleLogout}>
                  {t('logout')}
                </Button>
                {isAdmin && (
                  <Button color="inherit" onClick={handleAdminPage} className={clsx({ active: isActive(`/${currentLocale}/admin/orders`) })}>
                    {t('admin')}
                  </Button>
                )}
              </>
            ) : (
              <Button
                color="inherit"
                className="button-menu-login"
                onClick={() => router.push(`/${currentLocale}/login`)}
                sx={{
                  backgroundColor: '#ffa726',
                  '&:hover': { backgroundColor: '#f57c00' },
                }}
              >
                {t('login')}
              </Button>
            )}
          </Box>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            className="menu-icon"
            onClick={() => toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={() => toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </header>
  );
}