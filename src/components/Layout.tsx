import { useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, Container, InputBase, Paper, IconButton, Button, Grow, Chip, Menu, MenuItem, Avatar, Divider } from '@mui/material';
import { Search as SearchIcon, AccountCircle, Menu as MenuIcon, Adjust, SettingsInputComponentSharp, SettingsInputComponentRounded, Home, Explore, Build, Login, PersonAdd, Logout, Settings, FavoriteBorder } from '@mui/icons-material';
import { styled, alpha, keyframes } from '@mui/material/styles';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

// Animaciones
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(255, 90, 95, 0.3); }
  50% { box-shadow: 0 0 20px rgba(255, 90, 95, 0.6); }
  100% { box-shadow: 0 0 5px rgba(255, 90, 95, 0.3); }
`;

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

const NavButton = styled(Button)<{ active: boolean }>(({ theme, active }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1, 2),
  borderRadius: '25px',
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: 500,
  minWidth: 'auto',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  backgroundColor: active ? '#FF5A5F' : 'transparent',
  color: active ? 'white' : '#666',
  border: active ? '2px solid #FF5A5F' : '2px solid transparent',
  '&:hover': {
    backgroundColor: active ? '#E50914' : 'rgba(255, 90, 95, 0.1)',
    color: active ? 'white' : '#FF5A5F',
    transform: 'translateY(-2px)',
    animation: active ? `${pulse} 1s ease-in-out` : 'none',
    boxShadow: active ? `${glow}` : '0 4px 12px rgba(0,0,0,0.15)',
  },
  '& .nav-icon': {
    fontSize: '20px',
    transition: 'transform 0.3s ease',
  },
  '&:hover .nav-icon': {
    transform: active ? 'rotate(5deg)' : 'scale(1.2)',
  }
}));

const SearchButton = styled(IconButton)(({ theme }) => ({
  padding: '10px',
  backgroundColor: '#FF5A5F',
  color: 'white',
  marginLeft: theme.spacing(1),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#E50914',
    transform: 'scale(1.1)',
    animation: `${pulse} 1s ease-in-out`,
  }
}));

const ClickableLogo = styled('img')(({ theme }) => ({
  width: '100px',
  height: 'auto',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    filter: 'brightness(1.1)',
  },
  '&:active': {
    transform: 'scale(0.98)',
  }
}));

const AuthButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  padding: theme.spacing(1, 2),
  textTransform: 'none',
  fontWeight: 600,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  }
}));

const LoginButton = styled(AuthButton)(({ theme }) => ({
  color: '#FF5A5F',
  border: '2px solid #FF5A5F',
  '&:hover': {
    backgroundColor: 'rgba(255, 90, 95, 0.1)',
    borderColor: '#E50914',
  }
}));

const RegisterButton = styled(AuthButton)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FF5A5F 30%, #FF8E53 90%)',
  color: 'white',
  '&:hover': {
    background: 'linear-gradient(45deg, #E50914 30%, #FF5A5F 90%)',
    animation: `${pulse} 1s ease-in-out`,
  }
}));

const UserMenuButton = styled(IconButton)(({ theme }) => ({
  borderRadius: '25px',
  padding: '8px 12px',
  border: '2px solid #E0E0E0',
  backgroundColor: 'white',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: '#FF5A5F',
    backgroundColor: 'rgba(255, 90, 95, 0.05)',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  }
}));

// Tipos para los filtros
export type FilterType = 'alojamientos' | 'experiencias' | 'servicios';

interface LayoutProps {
  children: ReactNode;
  onFilterChange?: (filter: FilterType) => void;
  activeFilter?: FilterType;
}

export default function Layout({ children, onFilterChange, activeFilter = 'alojamientos' }: LayoutProps) {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [internalFilter, setInternalFilter] = useState<FilterType>(activeFilter);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);

  const handleFilterChange = (filter: FilterType) => {
    setInternalFilter(filter);
    onFilterChange?.(filter);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleAuthModal = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
  };

  const currentFilter = activeFilter || internalFilter;

  const navItems = [
    {
      key: 'alojamientos' as FilterType,
      label: 'Alojamientos',
      icon: <Home className="nav-icon" />,
      image: '../../img/logo-casa.png',
      count: 6
    },
    {
      key: 'experiencias' as FilterType,
      label: 'Experiencias',
      icon: <Explore className="nav-icon" />,
      image: '../../img/logo-globo.jpg',
      count: 0
    },
    {
      key: 'servicios' as FilterType,
      label: 'Servicios',
      icon: <Build className="nav-icon" />,
      image: '../../img/logo-timbre.jpg',
      count: 0
    }
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" elevation={1} sx={{ backgroundColor: 'white', color: 'black' }}>
        <Toolbar>
          <ClickableLogo 
            src="../../img/Airbnb_Logo_Bélo.svg.png" 
            alt="Airbnb" 
            onClick={handleLogoClick}
          />
          
          {/* Barra de navegación central interactiva */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Paper
              component="div"
              sx={{
                p: '4px',
                display: 'flex',
                alignItems: 'center',
                width: { xs: '100%', md: 765 },
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                borderRadius: '50px',
                border: '1px solid #DDDDDD',
                backgroundColor: '#FAFAFA',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 6px 25px rgba(0,0,0,0.15)',
                  borderColor: '#FF5A5F',
                }
              }}
            >
              {navItems.map((item, index) => (
                <Box key={item.key} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Grow in timeout={400 + index * 200}>
                    <NavButton
                      active={currentFilter === item.key}
                      onClick={() => handleFilterChange(item.key)}
                      sx={{ position: 'relative' }}
                    >
                      <img 
                        src={item.image} 
                        alt={item.label} 
                        style={{ 
                          width: '24px', 
                          height: '24px', 
                          borderRadius: '50%',
                          transition: 'transform 0.3s ease',
                        }} 
                      />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {item.label}
                      </Typography>
                      
                      {/* Contador de elementos */}
                      {item.count > 0 && (
                        <Chip
                          label={item.count}
                          size="small"
                          sx={{
                            height: '20px',
                            fontSize: '10px',
                            fontWeight: 600,
                            backgroundColor: currentFilter === item.key ? 'rgba(255,255,255,0.3)' : 'rgba(255, 90, 95, 0.1)',
                            color: currentFilter === item.key ? 'white' : '#FF5A5F',
                            '& .MuiChip-label': {
                              px: 1,
                            }
                          }}
                        />
                      )}
                      
                      {/* Indicador de "próximamente" para experiencias y servicios */}
                      {item.count === 0 && (
                        <Chip
                          label="Próximamente"
                          size="small"
                          sx={{
                            height: '20px',
                            fontSize: '9px',
                            fontWeight: 600,
                            backgroundColor: currentFilter === item.key ? 'rgba(255,255,255,0.3)' : 'rgba(156, 39, 176, 0.1)',
                            color: currentFilter === item.key ? 'white' : '#9C27B0',
                            '& .MuiChip-label': {
                              px: 1,
                            }
                          }}
                        />
                      )}
                    </NavButton>
                  </Grow>

                  {/* Separador */}
                  {index < navItems.length - 1 && (
                    <Box 
                      sx={{ 
                        width: 1, 
                        height: 32, 
                        backgroundColor: '#E0E0E0', 
                        mx: 1,
                        transition: 'opacity 0.3s ease',
                        opacity: 0.6
                      }} 
                    />
                  )}
                </Box>
              ))}
              
              <SearchButton>
                <SearchIcon />
              </SearchButton>
            </Paper>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                display: { xs: 'none', md: 'block' }, 
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: '#FF5A5F'
                }
              }}
            >
              Conviértete en anfitrión
            </Typography>

            {isAuthenticated ? (
              <>
                <UserMenuButton onClick={handleUserMenuOpen}>
                  <Avatar 
                    src={user?.avatar} 
                    sx={{ width: 32, height: 32, mr: 1 }}
                  />
                  <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: 600 }}>
                    {user?.nombre}
                  </Typography>
                </UserMenuButton>
                
                <Menu
                  anchorEl={userMenuAnchor}
                  open={Boolean(userMenuAnchor)}
                  onClose={handleUserMenuClose}
                  PaperProps={{
                    sx: {
                      borderRadius: '16px',
                      minWidth: 200,
                      boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                      mt: 1
                    }
                  }}
                >
                  <Box sx={{ p: 2, borderBottom: '1px solid #f0f0f0' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {user?.nombre} {user?.apellido}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#666' }}>
                      {user?.email}
                    </Typography>
                  </Box>
                  
                  <MenuItem onClick={handleUserMenuClose} sx={{ py: 1.5 }}>
                    <FavoriteBorder sx={{ mr: 2, color: '#FF5A5F' }} />
                    Mis favoritos
                  </MenuItem>
                  
                  <MenuItem onClick={handleUserMenuClose} sx={{ py: 1.5 }}>
                    <Settings sx={{ mr: 2, color: '#666' }} />
                    Configuración
                  </MenuItem>
                  
                  <Divider />
                  
                  <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: '#FF5A5F' }}>
                    <Logout sx={{ mr: 2 }} />
                    Cerrar sesión
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <LoginButton 
                  startIcon={<Login />}
                  onClick={() => handleAuthModal('login')}
                >
                  Iniciar sesión
                </LoginButton>
                
                <RegisterButton 
                  startIcon={<PersonAdd />}
                  onClick={() => handleAuthModal('register')}
                >
                  Registrarse
                </RegisterButton>
              </>
            )}
          </Box>
        </Toolbar>

        {/* Indicador de filtro activo */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            py: 1,
            backgroundColor: 'rgba(255, 90, 95, 0.05)',
            borderTop: '1px solid rgba(255, 90, 95, 0.1)',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: '#FF5A5F',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            {navItems.find(item => item.key === currentFilter)?.icon}
            Mostrando: {navItems.find(item => item.key === currentFilter)?.label}
            {currentFilter !== 'alojamientos' && (
              <Chip
                label="¡Próximamente más contenido!"
                size="small"
                color="secondary"
                variant="outlined"
                sx={{ ml: 1, fontSize: '10px' }}
              />
            )}
          </Typography>
        </Box>
      </AppBar>
      
      <main>
        {children}
      </main>

      {/* Modal de autenticación */}
      <AuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </Box>
  );
} 