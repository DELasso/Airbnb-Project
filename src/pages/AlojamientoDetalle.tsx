import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Chip, 
  Rating,
  Divider,
  Avatar,
  IconButton,
  Paper,
  Fade,
  Grow,
  Skeleton,
  Card,
  CardContent,
  Stack,
  LinearProgress
} from '@mui/material';
import { 
  Wifi, 
  LocalParking, 
  Kitchen, 
  Tv, 
  AcUnit, 
  Pets,
  Star,
  ArrowBack,
  Favorite,
  FavoriteBorder,
  Share,
  LocationOn,
  Person,
  Bed,
  Bathtub,
  Home,
  CalendarMonth,
  Security,
  Verified,
  ChevronLeft,
  ChevronRight
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';
import { alojamientosData } from '../data/alojamientos';

// Animaciones
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
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
const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
  borderRadius: '24px',
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  position: 'relative',
  overflow: 'hidden',
}));

const ImageGallery = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: '20px',
  overflow: 'hidden',
  height: '500px',
  marginBottom: theme.spacing(4),
  boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
}));

const MainImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
  }
}));

const ThumbnailContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 20,
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: theme.spacing(1),
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  padding: theme.spacing(1),
}));

const ThumbnailImage = styled('img')<{ active: boolean }>(({ theme, active }) => ({
  width: 60,
  height: 60,
  borderRadius: '12px',
  objectFit: 'cover',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  border: active ? `3px solid #FF5A5F` : `3px solid transparent`,
  opacity: active ? 1 : 0.7,
  '&:hover': {
    opacity: 1,
    transform: 'scale(1.1)',
  }
}));

const InfoCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '20px',
  marginBottom: theme.spacing(3),
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
  }
}));

const ReservationCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '24px',
  position: 'sticky',
  top: 100,
  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
  border: '1px solid rgba(255, 90, 95, 0.1)',
  boxShadow: '0 12px 40px rgba(255, 90, 95, 0.15)',
  animation: `${fadeInUp} 0.6s ease-out`,
}));

const AmenityChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  borderRadius: '16px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    animation: `${pulse} 1s ease-in-out`,
  }
}));

export default function AlojamientoDetalle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simular carga
  useState(() => {
    setTimeout(() => setLoading(false), 1000);
  });

  const alojamiento = alojamientosData.find(a => a.id === Number(id));

  if (!alojamiento) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Alojamiento no encontrado</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          El alojamiento que buscas no existe o ha sido removido.
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/')}
          sx={{ 
            backgroundColor: '#FF5A5F',
            '&:hover': { backgroundColor: '#E50914' }
          }}
        >
          Volver al inicio
        </Button>
      </Container>
    );
  }

  const getAmenityIcon = (amenidad: string) => {
    switch (amenidad.toLowerCase()) {
      case 'wifi': return <Wifi />;
      case 'estacionamiento': return <LocalParking />;
      case 'cocina': return <Kitchen />;
      case 'tv': return <Tv />;
      case 'aire acondicionado': return <AcUnit />;
      case 'se admiten mascotas': return <Pets />;
      default: return <Star />;
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % alojamiento.imagen.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + alojamiento.imagen.length) % alojamiento.imagen.length);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Skeleton variant="rectangular" height={60} sx={{ mb: 3, borderRadius: 2 }} />
        <Skeleton variant="rectangular" height={500} sx={{ mb: 4, borderRadius: 3 }} />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 4 }}>
          <Box>
            <Skeleton height={200} sx={{ mb: 2, borderRadius: 2 }} />
            <Skeleton height={150} sx={{ mb: 2, borderRadius: 2 }} />
            <Skeleton height={100} sx={{ borderRadius: 2 }} />
          </Box>
          <Skeleton height={400} sx={{ borderRadius: 3 }} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header con navegación */}
      <Fade in timeout={400}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <IconButton 
            onClick={() => navigate('/')}
            sx={{ 
              backgroundColor: 'white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              '&:hover': {
                backgroundColor: '#FF5A5F',
                color: 'white',
                transform: 'scale(1.05)',
              }
            }}
          >
            <ArrowBack />
          </IconButton>
          
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#222' }}>
              {alojamiento.nombre}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <LocationOn sx={{ fontSize: 18, color: '#FF5A5F' }} />
              <Typography variant="body1" color="text.secondary">
                {alojamiento.ubicacion.ciudad}, {alojamiento.ubicacion.pais}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 2 }}>
                <Star sx={{ fontSize: 18, color: '#FFD700' }} />
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {alojamiento.calificacion}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ({alojamiento.numResenas} reseñas)
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              onClick={() => setIsFavorite(!isFavorite)}
              sx={{
                backgroundColor: 'white',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                '&:hover': { backgroundColor: 'rgba(255, 90, 95, 0.1)' }
              }}
            >
              {isFavorite ? <Favorite sx={{ color: '#FF5A5F' }} /> : <FavoriteBorder />}
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: 'white',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                '&:hover': { backgroundColor: 'rgba(255, 90, 95, 0.1)' }
              }}
            >
              <Share />
            </IconButton>
          </Box>
        </Box>
      </Fade>

      {/* Galería de imágenes mejorada */}
      <Fade in timeout={600}>
        <ImageGallery>
          <MainImage
            src={alojamiento.imagen[currentImageIndex]}
            alt={alojamiento.nombre}
          />
          
          {/* Controles de navegación */}
          <IconButton
            onClick={prevImage}
            sx={{
              position: 'absolute',
              left: 20,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' }
            }}
          >
            <ChevronLeft />
          </IconButton>
          
          <IconButton
            onClick={nextImage}
            sx={{
              position: 'absolute',
              right: 20,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' }
            }}
          >
            <ChevronRight />
          </IconButton>

          {/* Thumbnails */}
          <ThumbnailContainer>
            {alojamiento.imagen.slice(0, 5).map((img, index) => (
              <ThumbnailImage
                key={index}
                src={img}
                alt={`Vista ${index + 1}`}
                active={index === currentImageIndex}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </ThumbnailContainer>
        </ImageGallery>
      </Fade>

      {/* Layout principal con mejor organización */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, 
        gap: 4,
        alignItems: 'start'
      }}>
        {/* Columna izquierda - Información principal */}
        <Box>
          {/* Información del anfitrión */}
          <Grow in timeout={800}>
            <InfoCard>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar 
                  src={alojamiento.anfitrion.avatar} 
                  sx={{ width: 64, height: 64 }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Alojamiento completo hospedado por {alojamiento.anfitrion.nombre}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Person sx={{ fontSize: 16, color: '#666' }} />
                      <Typography variant="body2" color="text.secondary">
                        {alojamiento.huespedes} huéspedes
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Home sx={{ fontSize: 16, color: '#666' }} />
                      <Typography variant="body2" color="text.secondary">
                        {alojamiento.habitaciones} habitaciones
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Bed sx={{ fontSize: 16, color: '#666' }} />
                      <Typography variant="body2" color="text.secondary">
                        {alojamiento.camas} camas
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Bathtub sx={{ fontSize: 16, color: '#666' }} />
                      <Typography variant="body2" color="text.secondary">
                        {alojamiento.banos} baños
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Chip
                  icon={<Verified />}
                  label="Verificado"
                  color="success"
                  variant="outlined"
                  size="small"
                />
              </Box>
              
              <Typography variant="body2" color="text.secondary">
                Anfitrión desde {alojamiento.anfitrion.fechaRegistro}
              </Typography>
            </InfoCard>
          </Grow>

          {/* Descripción */}
          <Grow in timeout={1000}>
            <InfoCard>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                Descripción
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.7, color: '#333' }}>
                {alojamiento.descripcion}
              </Typography>
            </InfoCard>
          </Grow>

          {/* Amenidades */}
          <Grow in timeout={1200}>
            <InfoCard>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Lo que ofrece este lugar
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {alojamiento.amenidades.map((amenidad, index) => (
                  <AmenityChip
                    key={index}
                    icon={getAmenityIcon(amenidad)}
                    label={amenidad}
                    variant="outlined"
                    sx={{
                      borderColor: '#FF5A5F',
                      color: '#FF5A5F',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 90, 95, 0.1)',
                        borderColor: '#E50914',
                      }
                    }}
                  />
                ))}
              </Box>
            </InfoCard>
          </Grow>

          {/* Disponibilidad */}
          <Grow in timeout={1400}>
            <InfoCard>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                Disponibilidad
              </Typography>
                             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                 {alojamiento.fechasDisponibles?.map((periodo, index) => (
                  <Box 
                    key={index}
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 2,
                      p: 2,
                      backgroundColor: 'rgba(255, 90, 95, 0.05)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 90, 95, 0.1)'
                    }}
                  >
                    <CalendarMonth sx={{ color: '#FF5A5F' }} />
                    <Typography variant="body1">
                      {new Date(periodo.inicio).toLocaleDateString('es-ES', { 
                        day: 'numeric', month: 'long', year: 'numeric' 
                      })} - {new Date(periodo.fin).toLocaleDateString('es-ES', { 
                        day: 'numeric', month: 'long', year: 'numeric' 
                      })}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </InfoCard>
          </Grow>
        </Box>

        {/* Columna derecha - Panel de reserva */}
        <Grow in timeout={600}>
          <ReservationCard>
            {/* Precio */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #FF5A5F 30%, #FF8E53 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1
                }}
              >
                ${alojamiento.precio.toLocaleString()}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                por noche
              </Typography>
            </Box>

            {/* Rating */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mb: 3 }}>
              <Rating value={alojamiento.calificacion} readOnly precision={0.1} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {alojamiento.numResenas} reseñas
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Botón de reserva */}
            <Button 
              variant="contained" 
              fullWidth 
              size="large"
              sx={{ 
                mb: 3,
                py: 2,
                fontSize: '18px',
                fontWeight: 600,
                background: 'linear-gradient(45deg, #FF5A5F 30%, #FF8E53 90%)',
                borderRadius: '16px',
                textTransform: 'none',
                '&:hover': {
                  background: 'linear-gradient(45deg, #E50914 30%, #FF5A5F 90%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(255, 90, 95, 0.3)',
                }
              }}
            >
              Reservar ahora
            </Button>

            <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
              No se te cobrará por el momento
            </Typography>

            <Divider sx={{ my: 3 }} />

            {/* Desglose de precios */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Desglose de precios (5 noches)
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">
                  ${alojamiento.precio.toLocaleString()} x 5 noches
                </Typography>
                <Typography variant="body2">
                  ${(alojamiento.precio * 5).toLocaleString()}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2">Tarifa de servicio</Typography>
                <Typography variant="body2">
                  ${Math.round(alojamiento.precio * 5 * 0.14).toLocaleString()}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight="bold">
                  Total
                </Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ color: '#FF5A5F' }}>
                  ${Math.round(alojamiento.precio * 5 * 1.14).toLocaleString()}
                </Typography>
              </Box>
            </Box>

            {/* Garantías */}
            <Box sx={{ 
              mt: 3, 
              p: 2, 
              backgroundColor: 'rgba(76, 175, 80, 0.1)',
              borderRadius: '12px',
              border: '1px solid rgba(76, 175, 80, 0.2)'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Security sx={{ color: '#4CAF50', fontSize: 20 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#4CAF50' }}>
                  Reserva segura
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                Tu información está protegida y tu reserva está garantizada
              </Typography>
            </Box>
          </ReservationCard>
        </Grow>
      </Box>
    </Container>
  );
} 