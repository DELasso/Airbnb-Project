import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
  Box,
  IconButton,
  Rating,
  Chip,
  Fade,
  Grow,
  Avatar,
  Backdrop
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Star,
  LocationOn,
  Person,
  Bed,
  Bathtub
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';

// Animaciones
const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
`;

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
    '& .image-overlay': {
      opacity: 1,
    },
    '& .shimmer-effect': {
      animation: `${shimmer} 1.5s ease-in-out`,
    },
    '& .float-icon': {
      animation: `${floatAnimation} 2s ease-in-out infinite`,
    }
  }
}));

const ImageOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(135deg, rgba(255,90,95,0.1) 0%, rgba(255,142,83,0.1) 100%)',
  opacity: 0,
  transition: 'opacity 0.3s ease',
  zIndex: 1,
}));

const PriceTag = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '12px',
  left: '12px',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  padding: '8px 12px',
  zIndex: 2,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
}));

const InfoChip = styled(Chip)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(8px)',
  fontSize: '12px',
  height: '24px',
  '& .MuiChip-label': {
    padding: '0 8px',
  }
}));

interface AlojamientoCardProps {
  alojamiento: {
    id: number;
    nombre: string;
    imagen: string[];
    precio: number;
    ubicacion: {
      ciudad: string;
      pais: string;
    };
    calificacion: number;
    numResenas: number;
    huespedes: number;
    habitaciones: number;
    camas: number;
    banos: number;
    anfitrion: {
      nombre: string;
      avatar: string;
    };
    amenidades: string[];
  };
  onFavoriteToggle?: (id: number) => void;
  isFavorite?: boolean;
}

export default function AlojamientoCard({ 
  alojamiento, 
  onFavoriteToggle,
  isFavorite = false 
}: AlojamientoCardProps) {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleCardClick = () => {
    navigate(`/alojamiento/${alojamiento.id}`);
  };

  const handleFavoriteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onFavoriteToggle?.(alojamiento.id);
  };

  const handleImageCycle = (event: React.MouseEvent) => {
    event.stopPropagation();
    setCurrentImageIndex((prev) => 
      (prev + 1) % (alojamiento.imagen?.length || 1)
    );
  };

  const getMainAmenities = () => {
    return alojamiento.amenidades?.slice(0, 2) || [];
  };

  return (
    <Grow in timeout={600}>
      <StyledCard>
        <CardActionArea onClick={handleCardClick} sx={{ height: '100%' }}>
          {/* Contenedor de imagen */}
          <Box sx={{ position: 'relative', height: 280 }}>
            <CardMedia
              component="img"
              height="280"
              image={alojamiento.imagen?.[currentImageIndex] || alojamiento.imagen?.[0] || '/placeholder-image.jpg'}
              alt={alojamiento.nombre}
              onLoad={() => setImageLoaded(true)}
              onClick={handleImageCycle}
              sx={{
                objectFit: 'cover',
                transition: 'all 0.3s ease',
                filter: imageLoaded ? 'none' : 'blur(5px)',
              }}
            />
            
            {/* Overlay hover */}
            <ImageOverlay className="image-overlay" />
            
            {/* Shimmer effect */}
            {!imageLoaded && (
              <Box
                className="shimmer-effect"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                  zIndex: 3,
                }}
              />
            )}

            {/* Botón favorito */}
            <IconButton
              onClick={handleFavoriteClick}
              className="float-icon"
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                zIndex: 3,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  transform: 'scale(1.1)',
                }
              }}
            >
              {isFavorite ? (
                <Favorite sx={{ color: '#FF5A5F' }} />
              ) : (
                <FavoriteBorder sx={{ color: '#484848' }} />
              )}
            </IconButton>

            {/* Rating absoluto */}
            <Box
              sx={{
                position: 'absolute',
                top: 12,
                left: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                padding: '4px 8px',
                zIndex: 3,
              }}
            >
              <Star sx={{ fontSize: '16px', color: '#FFD700' }} />
              <Typography variant="caption" sx={{ fontWeight: 600, color: '#222' }}>
                {alojamiento.calificacion}
              </Typography>
            </Box>

            {/* Chips de amenidades */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 50,
                left: 12,
                display: 'flex',
                gap: 1,
                zIndex: 3,
              }}
            >
              {getMainAmenities().map((amenidad, index) => (
                <Fade in={imageLoaded} timeout={800 + index * 200} key={amenidad}>
                  <InfoChip
                    label={amenidad}
                    size="small"
                    icon={amenidad === 'WiFi' ? <></> : undefined}
                  />
                </Fade>
              ))}
            </Box>

            {/* Precio flotante */}
            <PriceTag>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  color: '#FF5A5F',
                  fontSize: '16px',
                }}
              >
                ${alojamiento.precio.toLocaleString()}
                <Typography
                  component="span"
                  variant="caption"
                  sx={{ color: '#666', ml: 0.5 }}
                >
                  /noche
                </Typography>
              </Typography>
            </PriceTag>

            {/* Indicador de imágenes múltiples */}
            {alojamiento.imagen?.length > 1 && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 12,
                  right: 12,
                  display: 'flex',
                  gap: 0.5,
                  zIndex: 3,
                }}
              >
                {alojamiento.imagen.slice(0, 5).map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: index === currentImageIndex ? '#FF5A5F' : 'rgba(255,255,255,0.6)',
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
              </Box>
            )}
          </Box>

          {/* Contenido de la tarjeta */}
          <CardContent sx={{ p: 2.5, height: 'auto' }}>
            {/* Ubicación y anfitrión */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                  <LocationOn sx={{ fontSize: '16px', color: '#FF5A5F' }} />
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      fontSize: '14px',
                      color: '#222',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {alojamiento.ubicacion.ciudad}, {alojamiento.ubicacion.pais}
                  </Typography>
                </Box>
                
                <Typography
                  variant="body2"
                  sx={{
                    color: '#666',
                    fontSize: '13px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    mb: 1,
                  }}
                >
                  {alojamiento.nombre}
                </Typography>
              </Box>

              <Avatar
                src={alojamiento.anfitrion?.avatar}
                sx={{ width: 32, height: 32, ml: 1 }}
              />
            </Box>

            {/* Información de capacidad */}
            <Box sx={{ display: 'flex', gap: 2, mb: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Person sx={{ fontSize: '16px', color: '#666' }} />
                <Typography variant="caption" sx={{ color: '#666' }}>
                  {alojamiento.huespedes} huéspedes
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Bed sx={{ fontSize: '16px', color: '#666' }} />
                <Typography variant="caption" sx={{ color: '#666' }}>
                  {alojamiento.camas} camas
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Bathtub sx={{ fontSize: '16px', color: '#666' }} />
                <Typography variant="caption" sx={{ color: '#666' }}>
                  {alojamiento.banos} baños
                </Typography>
              </Box>
            </Box>

            {/* Rating y reseñas */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Rating
                  value={alojamiento.calificacion}
                  readOnly
                  size="small"
                  precision={0.1}
                  sx={{ fontSize: '16px' }}
                />
                <Typography variant="caption" sx={{ color: '#666' }}>
                  ({alojamiento.numResenas} reseñas)
                </Typography>
              </Box>
              
              <Typography
                variant="caption"
                sx={{
                  color: '#FF5A5F',
                  fontWeight: 600,
                  backgroundColor: 'rgba(255, 90, 95, 0.1)',
                  padding: '2px 8px',
                  borderRadius: '12px',
                }}
              >
                {alojamiento.anfitrion?.nombre?.split(' ')[0]}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </StyledCard>
    </Grow>
  );
}
