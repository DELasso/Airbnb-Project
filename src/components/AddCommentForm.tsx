import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Rating,
  Divider,
  Alert,

  Collapse,
  IconButton,
  Stack,
  Card,
  CardContent
} from '@mui/material';
import {
  Star,
  Close,
  Send,
  ReviewsOutlined
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';
import { useAuth } from '../contexts/AuthContext';
import type { Comentario } from '../types';

// Animaciones
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '20px',
  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
  border: '2px solid rgba(255, 90, 95, 0.1)',
  boxShadow: '0 8px 32px rgba(255, 90, 95, 0.15)',
  animation: `${slideIn} 0.5s ease-out`,
  marginBottom: theme.spacing(3),
}));

const CategoryRatingBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: 'rgba(255, 90, 95, 0.05)',
    borderColor: 'rgba(255, 90, 95, 0.2)',
  }
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FF5A5F 30%, #FF8E53 90%)',
  borderRadius: '25px',
  padding: theme.spacing(1.5, 4),
  fontSize: '16px',
  fontWeight: 600,
  textTransform: 'none',
  '&:hover': {
    background: 'linear-gradient(45deg, #E50914 30%, #FF5A5F 90%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(255, 90, 95, 0.3)',
  },
  '&:disabled': {
    background: 'rgba(0, 0, 0, 0.12)',
    transform: 'none',
    boxShadow: 'none',
  }
}));

interface AddCommentFormProps {
  alojamientoId: number;
  onCommentAdded: (comment: Comentario) => void;
  open: boolean;
  onClose: () => void;
}

const categories = [
  { key: 'limpieza', label: 'Limpieza', icon: '🧽' },
  { key: 'comunicacion', label: 'Comunicación', icon: '💬' },
  { key: 'llegada', label: 'Proceso de llegada', icon: '🗝️' },
  { key: 'precision', label: 'Precisión del anuncio', icon: '📋' },
  { key: 'ubicacion', label: 'Ubicación', icon: '📍' },
  { key: 'precio', label: 'Relación calidad-precio', icon: '💰' }
];

export default function AddCommentForm({ 
  onCommentAdded, 
  open, 
  onClose 
}: AddCommentFormProps) {
  const { user, isAuthenticated } = useAuth();
  
  const [comment, setComment] = useState('');
  const [ratings, setRatings] = useState({
    limpieza: 0,
    comunicacion: 0,
    llegada: 0,
    precision: 0,
    ubicacion: 0,
    precio: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleRatingChange = (category: string, value: number | null) => {
    if (value !== null) {
      setRatings(prev => ({
        ...prev,
        [category]: value
      }));
      setError('');
    }
  };

  const calculateOverallRating = () => {
    const values = Object.values(ratings).filter(rating => rating > 0);
    if (values.length === 0) return 0;
    return Number((values.reduce((sum, rating) => sum + rating, 0) / values.length).toFixed(1));
  };

  const validateForm = () => {
    if (!comment.trim()) {
      setError('Por favor, escribe un comentario');
      return false;
    }
    
    if (comment.trim().length < 10) {
      setError('El comentario debe tener al menos 10 caracteres');
      return false;
    }

    const ratingValues = Object.values(ratings);
    const hasRatings = ratingValues.some(rating => rating > 0);
    
    if (!hasRatings) {
      setError('Por favor, califica al menos una categoría');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setError('');

    try {
      // Simular envío al servidor
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newComment: Comentario = {
        id: Date.now(), // En una app real, esto vendría del servidor
        usuarioId: user?.id || 'anonymous',
        usuarioNombre: user ? `${user.nombre} ${user.apellido}` : 'Usuario Anónimo',
        usuarioAvatar: user?.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b1c5?w=100&h=100&fit=crop&crop=face',
        fechaEstancia: new Date().toISOString().split('T')[0], // Fecha simulada
        fechaComentario: new Date().toISOString().split('T')[0],
        calificacionGeneral: calculateOverallRating(),
        calificaciones: ratings,
        comentario: comment.trim(),
        util: 0
      };

      onCommentAdded(newComment);
      
      // Limpiar formulario
      setComment('');
      setRatings({
        limpieza: 0,
        comunicacion: 0,
        llegada: 0,
        precision: 0,
        ubicacion: 0,
        precio: 0
      });
      
      onClose();
    } catch (error) {
      setError('Error al enviar el comentario. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setComment('');
    setRatings({
      limpieza: 0,
      comunicacion: 0,
      llegada: 0,
      precision: 0,
      ubicacion: 0,
      precio: 0
    });
    setError('');
    onClose();
  };

  if (!isAuthenticated) {
    return (
      <Collapse in={open}>
        <Card sx={{ mb: 3, borderRadius: '16px' }}>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <ReviewsOutlined sx={{ fontSize: 48, color: '#FF5A5F', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Inicia sesión para escribir una reseña
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Comparte tu experiencia con otros huéspedes
            </Typography>
            <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(45deg, #FF5A5F 30%, #FF8E53 90%)',
                borderRadius: '25px',
                px: 4,
                '&:hover': {
                  background: 'linear-gradient(45deg, #E50914 30%, #FF5A5F 90%)',
                }
              }}
            >
              Iniciar sesión
            </Button>
          </CardContent>
        </Card>
      </Collapse>
    );
  }

  return (
    <Collapse in={open}>
      <FormContainer>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Star sx={{ fontSize: 28, color: '#FF5A5F' }} />
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#222' }}>
              Escribir una reseña
            </Typography>
          </Box>
          <IconButton onClick={handleClose} sx={{ color: '#666' }}>
            <Close />
          </IconButton>
        </Box>

        {/* Calificaciones por categoría */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Califica tu experiencia
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            {categories.map(({ key, label, icon }) => (
              <CategoryRatingBox key={key}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span style={{ fontSize: '20px' }}>{icon}</span>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {label}
                  </Typography>
                </Box>
                <Rating
                  value={ratings[key as keyof typeof ratings]}
                  onChange={(_, value) => handleRatingChange(key, value)}
                  size="large"
                  sx={{
                    '& .MuiRating-iconFilled': {
                      color: '#FF5A5F',
                    },
                    '& .MuiRating-iconHover': {
                      color: '#E50914',
                    }
                  }}
                />
              </CategoryRatingBox>
            ))}
          </Box>

          {/* Calificación general */}
          {calculateOverallRating() > 0 && (
            <Box sx={{ 
              mt: 3, 
              p: 2, 
              backgroundColor: 'rgba(255, 90, 95, 0.1)', 
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#FF5A5F' }}>
                Calificación general: {calculateOverallRating()} ★
              </Typography>
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Campo de comentario */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            Comparte tu experiencia
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Cuéntanos sobre tu estancia... ¿Qué te gustó más? ¿Hay algo que se podría mejorar?"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              setError('');
            }}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                '&:hover fieldset': {
                  borderColor: '#FF5A5F',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#FF5A5F',
                }
              }
            }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            {comment.length}/500 caracteres
          </Typography>
        </Box>

        {/* Error */}
        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
            {error}
          </Alert>
        )}

        {/* Botones */}
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              borderColor: '#FF5A5F',
              color: '#FF5A5F',
              borderRadius: '25px',
              px: 3,
              '&:hover': {
                borderColor: '#E50914',
                backgroundColor: 'rgba(255, 90, 95, 0.1)',
              }
            }}
          >
            Cancelar
          </Button>
          <SubmitButton
            variant="contained"
            startIcon={<Send />}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Publicar reseña'}
          </SubmitButton>
        </Stack>
      </FormContainer>
    </Collapse>
  );
} 