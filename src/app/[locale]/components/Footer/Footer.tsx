import { Box, Container, Typography, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import Image from 'next/image';
import Logo from '@/resources/logo.png';

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: '#333', color: 'white', py: 3, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Image src={Logo} alt="Казеврофос" width={80} height={60} />
            <Typography variant="body2" sx={{ mt: 1 }}>
              г. Москва, улица Дубинина 42
            </Typography>
            <Typography variant="body2">
              8 707 555 22 22
            </Typography>
          </Box>
          <Box>
            <IconButton color="inherit" aria-label="Instagram">
              <InstagramIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="Telegram">
              <TelegramIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}