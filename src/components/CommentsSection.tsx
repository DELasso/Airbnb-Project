import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Rating,
  Avatar,
  Paper,
  Button,
  Chip,

  LinearProgress,
  Card,
  CardContent,
  Stack
} from '@mui/material';
import {
  ThumbUp,
  ThumbUpOutlined,
  ExpandMore,
  ExpandLess,
  Star,
  Verified,
  Reply,
  Add
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';
import type { Comentario, CalificacionPromedio } from '../types';
import AddCommentForm from './AddCommentForm';

// Animaciones
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const CommentCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '16px',
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease',
  border: '1px solid rgba(0, 0, 0, 0.05)',
  animation: `${fadeInUp} 0.5s ease-out`,
  '&:hover': {
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    transform: 'translateY(-2px)',
  }
}));

const RatingCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
  borderRadius: '20px',
  border: '1px solid rgba(255, 90, 95, 0.1)',
  marginBottom: theme.spacing(3),
}));

const CategoryRating = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(1.5),
  padding: theme.spacing(1),
  borderRadius: '12px',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 90, 95, 0.05)',
  }
}));

const HostReply = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: 'rgba(255, 90, 95, 0.05)',
  borderRadius: '12px',
  borderLeft: `4px solid #FF5A5F`,
}));

interface CommentsSectionProps {
  comentarios?: Comentario[];
  calificacionPromedio?: CalificacionPromedio;
  calificacionGeneral: number;
  numResenas: number;
  alojamientoId: number;
}

export default function CommentsSection({ 
  comentarios = [], 
  calificacionPromedio,
  calificacionGeneral,
  numResenas,
  alojamientoId
}: CommentsSectionProps) {
  const [showAllComments, setShowAllComments] = useState(false);
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set());
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentComments, setCurrentComments] = useState<Comentario[]>(comentarios);

  useEffect(() => {
    setCurrentComments(comentarios);
  }, [comentarios]);

  const handleLikeComment = (commentId: number) => {
    const newLikedComments = new Set(likedComments);
    if (newLikedComments.has(commentId)) {
      newLikedComments.delete(commentId);
    } else {
      newLikedComments.add(commentId);
    }
    setLikedComments(newLikedComments);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long'
    });
  };

  const getStarPercentage = (rating: number) => {
    return (rating / 5) * 100;
  };

  const commentsToShow = showAllComments ? currentComments : currentComments.slice(0, 6);

  const handleCommentAdded = (newComment: Comentario) => {
    setCurrentComments([newComment, ...currentComments]);
  };

  const categories = [
    { key: 'limpieza', label: 'Limpieza' },
    { key: 'comunicacion', label: 'Comunicación' },
    { key: 'llegada', label: 'Llegada' },
    { key: 'precision', label: 'Precisión' },
    { key: 'ubicacion', label: 'Ubicación' },
    { key: 'precio', label: 'Relación calidad-precio' }
  ];

  return (
    <Box sx={{ mt: 4 }}>
      {/* Header de calificaciones */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Star sx={{ fontSize: 32, color: '#FFD700' }} />
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {calificacionGeneral}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            · {numResenas} reseñas
          </Typography>
        </Box>

        {/* Calificaciones por categoría */}
        {calificacionPromedio && (
          <RatingCard>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Calificaciones por categoría
              </Typography>
              
              <Box 
                sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, 
                  gap: 3 
                }}
              >
                {categories.map(({ key, label }) => {
                  const rating = calificacionPromedio[key as keyof CalificacionPromedio];
                  return (
                    <CategoryRating key={key}>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {label}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 120, mr: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={getStarPercentage(rating)}
                            sx={{
                              height: 6,
                              borderRadius: 3,
                              backgroundColor: 'rgba(0,0,0,0.1)',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: '#FF5A5F',
                                borderRadius: 3,
                              }
                            }}
                          />
                        </Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 30 }}>
                          {rating.toFixed(1)}
                        </Typography>
                      </Box>
                    </CategoryRating>
                  );
                })}
              </Box>
            </CardContent>
          </RatingCard>
        )}
      </Box>

      {/* Lista de comentarios */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Reseñas de huéspedes
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setShowAddForm(!showAddForm)}
            sx={{
              background: 'linear-gradient(45deg, #FF5A5F 30%, #FF8E53 90%)',
              borderRadius: '25px',
              px: 3,
              py: 1,
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                background: 'linear-gradient(45deg, #E50914 30%, #FF5A5F 90%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(255, 90, 95, 0.3)',
              }
            }}
          >
            {showAddForm ? 'Cancelar' : 'Escribir reseña'}
          </Button>
        </Box>

        {/* Formulario para agregar comentario */}
        <AddCommentForm
          alojamientoId={alojamientoId}
          onCommentAdded={handleCommentAdded}
          open={showAddForm}
          onClose={() => setShowAddForm(false)}
        />

        <Box 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
            gap: 3 
          }}
        >
          {commentsToShow.map((comentario) => (
            <CommentCard key={comentario.id}>
              {/* Header del comentario */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                <Avatar 
                  src={comentario.usuarioAvatar} 
                  sx={{ width: 48, height: 48 }}
                />
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {comentario.usuarioNombre}
                    </Typography>
                    <Chip
                      icon={<Verified />}
                      label="Verificado"
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ fontSize: '0.7rem', height: 20 }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(comentario.fechaComentario)}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Rating 
                    value={comentario.calificacionGeneral} 
                    readOnly 
                    size="small"
                    sx={{ mb: 0.5 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Estancia: {formatDate(comentario.fechaEstancia)}
                  </Typography>
                </Box>
              </Box>

              {/* Contenido del comentario */}
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 2, 
                  lineHeight: 1.6,
                  color: '#333'
                }}
              >
                {comentario.comentario}
              </Typography>

              {/* Respuesta del anfitrión */}
              {comentario.respuestaAnfitrion && (
                <HostReply>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Reply sx={{ fontSize: 16, color: '#FF5A5F' }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#FF5A5F' }}>
                      Respuesta del anfitrión
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(comentario.respuestaAnfitrion.fecha)}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                    {comentario.respuestaAnfitrion.respuesta}
                  </Typography>
                </HostReply>
              )}

              {/* Footer del comentario */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Button
                  startIcon={likedComments.has(comentario.id) ? <ThumbUp /> : <ThumbUpOutlined />}
                  onClick={() => handleLikeComment(comentario.id)}
                  size="small"
                  sx={{
                    color: likedComments.has(comentario.id) ? '#FF5A5F' : 'text.secondary',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 90, 95, 0.1)',
                    }
                  }}
                >
                  Útil ({comentario.util + (likedComments.has(comentario.id) ? 1 : 0)})
                </Button>

                <Stack direction="row" spacing={1}>
                  {Object.entries(comentario.calificaciones).slice(0, 3).map(([key, value]) => (
                    <Chip
                      key={key}
                      label={`${key}: ${value}`}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  ))}
                </Stack>
              </Box>
            </CommentCard>
          ))}
        </Box>

        {/* Botón para mostrar más comentarios */}
        {currentComments.length > 6 && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => setShowAllComments(!showAllComments)}
              endIcon={showAllComments ? <ExpandLess /> : <ExpandMore />}
              sx={{
                borderColor: '#FF5A5F',
                color: '#FF5A5F',
                px: 4,
                py: 1.5,
                borderRadius: '25px',
                '&:hover': {
                  backgroundColor: 'rgba(255, 90, 95, 0.1)',
                  borderColor: '#E50914',
                }
              }}
            >
              {showAllComments 
                ? 'Mostrar menos reseñas' 
                : `Mostrar las ${currentComments.length} reseñas`
              }
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
} 