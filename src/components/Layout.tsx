import { ReactNode } from 'react';
import { AppBar, Box, Toolbar, Typography, Container, InputBase, Paper, IconButton } from '@mui/material';
import { Search as SearchIcon, AccountCircle, Menu as MenuIcon } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" elevation={1} sx={{ backgroundColor: 'white', color: 'black' }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ 
              display: { xs: 'none', sm: 'block' },
              fontWeight: 'bold',
              color: '#FF5A5F',
              cursor: 'pointer'
            }}
          >
            airbnb
          </Typography>
          
          {/* Barra de búsqueda central */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Paper
              component="div"
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: { xs: '100%', md: 400 },
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                borderRadius: '40px',
                border: '1px solid #DDDDDD'
              }}
            >
              <Box sx={{ p: '10px', fontSize: '14px', fontWeight: 500 }}>
                ¿A dónde vamos?
              </Box>
              <Box sx={{ width: 1, height: 32, backgroundColor: '#DDDDDD', mx: 1 }} />
              <Box sx={{ p: '10px', fontSize: '14px', fontWeight: 500 }}>
                Cualquier semana
              </Box>
              <Box sx={{ width: 1, height: 32, backgroundColor: '#DDDDDD', mx: 1 }} />
              <Box sx={{ p: '10px', fontSize: '14px', color: '#717171' }}>
                ¿Cuántos huéspedes?
              </Box>
              <IconButton sx={{ p: '10px', backgroundColor: '#FF5A5F', color: 'white', ml: 1 }}>
                <SearchIcon />
              </IconButton>
            </Paper>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" sx={{ display: { xs: 'none', md: 'block' }, fontWeight: 500 }}>
              Pon tu espacio en Airbnb
            </Typography>
            <IconButton>
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      
      <main>
        {children}
      </main>
    </Box>
  );
} 