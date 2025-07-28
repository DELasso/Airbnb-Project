import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActionArea,
  Rating,
  Chip,
  Stack,
  IconButton,
  Fab
} from '@mui/material';
import { 
  Favorite,
  FavoriteBorder,
  Star
} from '@mui/icons-material';
import { alojamientosData } from '../data/alojamientos';
import FilterBar from '../components/FilterBar';
import type { FiltrosBusqueda } from '../types';

export default function Home() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [filtros, setFiltros] = useState<FiltrosBusqueda>({});

  // Filtrar alojamientos basado en los filtros activos
  const alojamientosFiltrados = useMemo(() => {
    return alojamientosData.filter(alojamiento => {
      // Filtro por ubicación
      if (filtros.ubicacion && !alojamiento.ubicacion.ciudad.toLowerCase().includes(filtros.ubicacion.toLowerCase())) {
        return false;
      }

      // Filtro por número de huéspedes
      if (filtros.huespedes && alojamiento.huespedes < filtros.huespedes) {
        return false;
      }

      // Filtro por rango de precios
      if (filtros.precioMin && alojamiento.precio < filtros.precioMin) {
        return false;
      }
      if (filtros.precioMax && alojamiento.precio > filtros.precioMax) {
        return false;
      }

      // Filtro por amenidades
      if (filtros.amenidades && filtros.amenidades.length > 0) {
        const tieneTodasLasAmenidades = filtros.amenidades.every(amenidad =>
          alojamiento.amenidades.some(a => a.toLowerCase().includes(amenidad.toLowerCase()))
        );
        if (!tieneTodasLasAmenidades) {
          return false;
        }
      }

      return true;
    });
  }, [filtros]);

  const toggleFavorite = (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const handleCardClick = (id: number) => {
    navigate(`/alojamiento/${id}`);
  };

  return (
    <Box sx={{ backgroundColor: '#f7f7f7', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        {/* Barra de filtros */}
        <FilterBar filtros={filtros} onFiltrosChange={setFiltros} />

        {/* Sección de categorías */}
        <Box sx={{ mb: 4, display: 'flex', gap: 2, overflowX: 'auto', pb: 1 }}>
          {['Casas', 'Apartamentos', 'Cabañas', 'Fincas', 'Lofts', 'Frente al mar', 'Montaña'].map((categoria) => (
            <Chip
              key={categoria}
              label={categoria}
              variant="outlined"
              sx={{
                borderRadius: '12px',
                px: 2,
                py: 1,
                backgroundColor: 'white',
                '&:hover': {
                  backgroundColor: '#f5f5f5'
                }
              }}
            />
          ))}
        </Box>

        {/* Resultados */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ color: '#222222' }}>
            {alojamientosFiltrados.length} alojamiento{alojamientosFiltrados.length !== 1 ? 's' : ''} encontrado{alojamientosFiltrados.length !== 1 ? 's' : ''}
          </Typography>
        </Box>

        {/* Grid de alojamientos filtrados */}
                  <Box sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)'
            },
            gap: 3
          }}>
            {alojamientosFiltrados.map((alojamiento) => (
                <Card
                  key={alojamiento.id} 
                sx={{ 
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    transition: 'transform 0.2s ease-in-out'
                  }
                }}
              >
                <CardActionArea 
                  onClick={() => handleCardClick(alojamiento.id)}
                  sx={{ borderRadius: '12px' }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="260"
                      image={alojamiento.imagen[0]}
                      alt={alojamiento.nombre}
                      sx={{ 
                        borderRadius: '12px',
                        objectFit: 'cover'
                      }}
                    />
                    <IconButton
                      onClick={(e) => toggleFavorite(alojamiento.id, e)}
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.9)'
                        }
                      }}
                    >
                      {favorites.includes(alojamiento.id) ? (
                        <Favorite sx={{ color: '#FF5A5F' }} />
                      ) : (
                        <FavoriteBorder sx={{ color: '#484848' }} />
                      )}
                    </IconButton>
                  </Box>
                  
                  <CardContent sx={{ p: 2, pb: '16px !important' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          fontWeight: 600,
                          fontSize: '15px',
                          lineHeight: 1.2,
                          color: '#222222'
                        }}
                      >
                        {alojamiento.ubicacion.ciudad}, {alojamiento.ubicacion.pais}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Star sx={{ fontSize: '14px', color: '#222222' }} />
                        <Typography variant="body2" sx={{ fontSize: '14px', color: '#222222' }}>
                          {alojamiento.calificacion}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#717171',
                        fontSize: '15px',
                        mb: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {alojamiento.nombre}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#717171',
                        fontSize: '15px',
                        mb: 1
                      }}
                    >
                      {alojamiento.fechasDisponibles?.[0]?.inicio && 
                        new Date(alojamiento.fechasDisponibles[0].inicio).toLocaleDateString('es-ES', { 
                          day: 'numeric', 
                          month: 'short' 
                        })
                      }
                      {alojamiento.fechasDisponibles?.[0]?.fin && 
                        ` - ${new Date(alojamiento.fechasDisponibles[0].fin).toLocaleDateString('es-ES', { 
                          day: 'numeric', 
                          month: 'short' 
                        })}`
                      }
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          fontWeight: 600,
                          fontSize: '15px',
                          color: '#222222'
                        }}
                      >
                        ${alojamiento.precio.toLocaleString()}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontSize: '15px',
                          color: '#222222'
                        }}
                      >
                        noche
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
                              </Card>
            ))}
          </Box>

        {/* Mensaje cuando no hay resultados */}
        {alojamientosFiltrados.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#222222' }}>
              No encontramos alojamientos
            </Typography>
            <Typography variant="body1" sx={{ color: '#717171', mb: 3 }}>
              Intenta ajustar tus filtros o fechas de búsqueda
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
              {Object.entries(filtros).map(([key, value]) => {
                if (!value || (Array.isArray(value) && value.length === 0)) return null;
                return (
                  <Chip
                    key={key}
                    label={`${key}: ${Array.isArray(value) ? value.join(', ') : value}`}
                    onDelete={() => setFiltros(prev => ({ ...prev, [key]: undefined }))}
                    variant="outlined"
                  />
                );
              })}
            </Box>
          </Box>
        )}

        {/* Mensaje motivacional */}
        {alojamientosFiltrados.length > 0 && (
          <Box sx={{ textAlign: 'center', mt: 8, mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#222222' }}>
              Descubre Colombia
            </Typography>
            <Typography variant="h6" sx={{ color: '#717171', maxWidth: 600, mx: 'auto' }}>
              Desde las montañas de Medellín hasta las playas del Caribe, encuentra el lugar perfecto para tu próxima aventura.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
