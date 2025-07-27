import { useParams } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardMedia, 
  Button, 
  Chip, 
  Rating,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  Wifi, 
  LocalParking, 
  Kitchen, 
  Tv, 
  AcUnit, 
  Pets,
  Star
} from '@mui/icons-material';
import { alojamientosData } from '../data/alojamientos';

export default function AlojamientoDetalle() {
  const { id } = useParams<{ id: string }>();
  const alojamiento = alojamientosData.find(a => a.id === Number(id));

  if (!alojamiento) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h4">Alojamiento no encontrado</Typography>
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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Título y ubicación */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          {alojamiento.nombre}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Rating value={alojamiento.calificacion} readOnly size="small" />
          <Typography variant="body2">
            {alojamiento.calificacion} · {alojamiento.numResenas} reseñas
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {alojamiento.ubicacion.ciudad}, {alojamiento.ubicacion.pais}
          </Typography>
        </Box>
      </Box>

      {/* Galería de imágenes */}
      <Grid container spacing={1} sx={{ mb: 4, height: 400 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardMedia
              component="img"
              height="100%"
              image={alojamiento.imagen[0]}
              alt={alojamiento.nombre}
              sx={{ objectFit: 'cover' }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={1} sx={{ height: '100%' }}>
            {alojamiento.imagen.slice(1, 5).map((img, index) => (
              <Grid item xs={6} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardMedia
                    component="img"
                    height="100%"
                    image={img}
                    alt={`${alojamiento.nombre} ${index + 2}`}
                    sx={{ objectFit: 'cover' }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {/* Información principal */}
        <Grid item xs={12} md={8}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Alojamiento completo hospedado por {alojamiento.anfitrion.nombre}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {alojamiento.huespedes} huéspedes · {alojamiento.habitaciones} habitaciones · 
              {alojamiento.camas} camas · {alojamiento.banos} baños
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Descripción
            </Typography>
            <Typography variant="body1" paragraph>
              {alojamiento.descripcion}
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Lo que ofrece este lugar
            </Typography>
            <List>
              {alojamiento.amenidades.map((amenidad, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemIcon>
                    {getAmenityIcon(amenidad)}
                  </ListItemIcon>
                  <ListItemText primary={amenidad} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>

        {/* Panel de reserva */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, position: 'sticky', top: 100 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" component="span">
                ${alojamiento.precio.toLocaleString()}
              </Typography>
              <Typography variant="body2" sx={{ ml: 1 }}>
                / noche
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Rating value={alojamiento.calificacion} readOnly size="small" />
              <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                {alojamiento.numResenas} reseñas
              </Typography>
            </Box>

            <Button 
              variant="contained" 
              fullWidth 
              size="large"
              sx={{ 
                mb: 2,
                backgroundColor: '#FF5A5F',
                '&:hover': {
                  backgroundColor: '#E50914'
                }
              }}
            >
              Reservar
            </Button>

            <Typography variant="body2" color="text.secondary" align="center">
              No se te cobrará por el momento
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">
                ${alojamiento.precio.toLocaleString()} x 5 noches
              </Typography>
              <Typography variant="body2">
                ${(alojamiento.precio * 5).toLocaleString()}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Tarifa de servicio</Typography>
              <Typography variant="body2">
                ${Math.round(alojamiento.precio * 5 * 0.14).toLocaleString()}
              </Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Total
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold">
                ${Math.round(alojamiento.precio * 5 * 1.14).toLocaleString()}
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Información del anfitrión */}
      <Box sx={{ mt: 4 }}>
        <Divider sx={{ mb: 3 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar 
            src={alojamiento.anfitrion.avatar} 
            sx={{ width: 56, height: 56, mr: 2 }}
          />
          <Box>
            <Typography variant="h6">
              Hospedado por {alojamiento.anfitrion.nombre}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Se registró en {alojamiento.anfitrion.fechaRegistro}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
} 