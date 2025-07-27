import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  Alert,
  CircularProgress,
  Fade,
  Slide,
  Avatar,
  InputAdornment
} from '@mui/material';
import {
  Close,
  Email,
  Lock,
  Person,
  Phone,
  Visibility,
  VisibilityOff,
  Google,
  Facebook,
  Apple,
  DateRange
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';
import { useAuth } from '../contexts/AuthContext';
import type { RegisterData } from '../types';

// Animaciones
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '24px',
    maxWidth: '450px',
    width: '100%',
    margin: theme.spacing(2),
    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    animation: `${slideIn} 0.4s ease-out`,
  }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
    },
    '&.Mui-focused': {
      backgroundColor: 'white',
      boxShadow: '0 4px 20px rgba(255, 90, 95, 0.2)',
    }
  },
  '& .MuiInputLabel-root': {
    color: '#666',
  }
}));

const AuthButton = styled(Button)(({ theme }) => ({
  borderRadius: '16px',
  padding: theme.spacing(1.5, 3),
  fontSize: '16px',
  fontWeight: 600,
  textTransform: 'none',
  background: 'linear-gradient(45deg, #FF5A5F 30%, #FF8E53 90%)',
  color: 'white',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #E50914 30%, #FF5A5F 90%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(255, 90, 95, 0.4)',
    animation: `${pulse} 1s ease-in-out`,
  },
  '&:disabled': {
    background: '#cccccc',
    color: '#888888',
  }
}));

const SocialButton = styled(Button)(({ theme }) => ({
  borderRadius: '16px',
  padding: theme.spacing(1.5, 2),
  textTransform: 'none',
  border: '2px solid #e0e0e0',
  color: '#666',
  backgroundColor: 'white',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: '#FF5A5F',
    backgroundColor: 'rgba(255, 90, 95, 0.05)',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  }
}));

const ToggleButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  color: '#FF5A5F',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: 'rgba(255, 90, 95, 0.1)',
  }
}));

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export default function AuthModal({ open, onClose, initialMode = 'login' }: AuthModalProps) {
  const { login, register, loading } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  // Estados del formulario
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre: '',
    apellido: '',
    telefono: '',
    fechaNacimiento: ''
  });

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.email) {
      setError('El email es requerido');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Ingresa un email válido');
      return false;
    }
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    if (mode === 'register') {
      if (!formData.nombre || !formData.apellido) {
        setError('Nombre y apellido son requeridos');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;

    try {
      let result = false;
      
      if (mode === 'login') {
        result = await login(formData.email, formData.password);
        if (result) {
          setSuccess('¡Bienvenido de vuelta!');
          setTimeout(() => {
            onClose();
            resetForm();
          }, 1500);
        } else {
          setError('Credenciales incorrectas. Inténtalo de nuevo.');
        }
      } else {
        const registerData: RegisterData = {
          email: formData.email,
          password: formData.password,
          nombre: formData.nombre,
          apellido: formData.apellido,
          telefono: formData.telefono || undefined,
          fechaNacimiento: formData.fechaNacimiento || undefined
        };
        
        result = await register(registerData);
        if (result) {
          setSuccess('¡Cuenta creada exitosamente! Bienvenido a Airbnb');
          setTimeout(() => {
            onClose();
            resetForm();
          }, 2000);
        } else {
          setError('Error al crear la cuenta. Inténtalo de nuevo.');
        }
      }
    } catch (error) {
      setError('Algo salió mal. Por favor, inténtalo de nuevo.');
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      nombre: '',
      apellido: '',
      telefono: '',
      fechaNacimiento: ''
    });
    setError('');
    setSuccess('');
    setShowPassword(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError('');
    setSuccess('');
  };

  return (
    <StyledDialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 4 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #FF5A5F 30%, #FF8E53 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              {mode === 'login' ? '¡Bienvenido!' : 'Te damos la bienvenida a Airbnb'}
            </Typography>
            <IconButton 
              onClick={handleClose}
              sx={{ 
                backgroundColor: 'rgba(0,0,0,0.05)',
                '&:hover': { backgroundColor: 'rgba(255, 90, 95, 0.1)' }
              }}
            >
              <Close />
            </IconButton>
          </Box>

          <Typography variant="body1" sx={{ color: '#666', mb: 4 }}>
            {mode === 'login' 
              ? 'Inicia sesión en tu cuenta para acceder a todas las funcionalidades'
              : 'Crea tu cuenta y comienza tu aventura con nosotros'
            }
          </Typography>

          {/* Alertas */}
          {error && (
            <Fade in>
              <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
                {error}
              </Alert>
            </Fade>
          )}

          {success && (
            <Fade in>
              <Alert severity="success" sx={{ mb: 3, borderRadius: '12px' }}>
                {success}
              </Alert>
            </Fade>
          )}

          {/* Formulario */}
          <Box component="form" onSubmit={handleSubmit}>
            {mode === 'register' && (
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <StyledTextField
                  fullWidth
                  label="Nombre"
                  value={formData.nombre}
                  onChange={handleInputChange('nombre')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                <StyledTextField
                  fullWidth
                  label="Apellido"
                  value={formData.apellido}
                  onChange={handleInputChange('apellido')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            )}

            <StyledTextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <StyledTextField
              fullWidth
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange('password')}
              sx={{ mb: mode === 'register' ? 3 : 4 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {mode === 'register' && (
              <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                <StyledTextField
                  fullWidth
                  label="Teléfono (opcional)"
                  value={formData.telefono}
                  onChange={handleInputChange('telefono')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                <StyledTextField
                  fullWidth
                  label="Fecha de nacimiento"
                  type="date"
                  value={formData.fechaNacimiento}
                  onChange={handleInputChange('fechaNacimiento')}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DateRange color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            )}

            <AuthButton
              type="submit"
              fullWidth
              disabled={loading}
              sx={{ mb: 3, py: 2 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'
              )}
            </AuthButton>
          </Box>

          {/* Divider */}
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: '#999', px: 2 }}>
              o continúa con
            </Typography>
          </Divider>

          {/* Botones sociales */}
          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <SocialButton fullWidth startIcon={<Google />}>
              Google
            </SocialButton>
            <SocialButton fullWidth startIcon={<Facebook />}>
              Facebook
            </SocialButton>
            <SocialButton fullWidth startIcon={<Apple />}>
              Apple
            </SocialButton>
          </Box>

          {/* Toggle mode */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#666' }}>
              {mode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
              <ToggleButton onClick={toggleMode}>
                {mode === 'login' ? 'Regístrate aquí' : 'Inicia sesión'}
              </ToggleButton>
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </StyledDialog>
  );
} 