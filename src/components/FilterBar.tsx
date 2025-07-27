import { useState } from 'react';
import {
  Box,
  TextField,
  Autocomplete,
  Button,
  Slider,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Container,
  Paper,
  Fade,
  Grow,
  IconButton,
  InputAdornment,
  Tooltip
} from '@mui/material';
import { 
  FilterList, 
  TuneOutlined, 
  LocationOn,
  CalendarToday,
  Person,
  Search,
  Clear,
  Hotel,
  AccessTime 
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';
import type { FiltrosBusqueda } from '../types';

// Animación de pulso para el botón de búsqueda
const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 90, 95, 0.7);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(255, 90, 95, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 90, 95, 0);
  }
`;

// Styled components para el diseño
const FilterContainer = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
  borderRadius: '24px',
  padding: theme.spacing(3),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
  }
}));

const SearchButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FF5A5F 30%, #FF8E53 90%)',
  borderRadius: '50px',
  padding: theme.spacing(1.5, 4),
  color: 'white',
  fontWeight: 600,
  fontSize: '16px',
  textTransform: 'none',
  minHeight: '48px',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #E50914 30%, #FF5A5F 90%)',
    transform: 'scale(1.05)',
    animation: `${pulse} 2s infinite`,
  },
  '&:active': {
    transform: 'scale(0.98)',
  }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      transform: 'translateY(-1px)',
    },
    '&.Mui-focused': {
      backgroundColor: 'white',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 20px rgba(255, 90, 95, 0.2)',
    }
  }
}));

const AnimatedChip = styled(Chip)(({ theme }) => ({
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  }
}));

interface FilterBarProps {
  filtros: FiltrosBusqueda;
  onFiltrosChange: (filtros: FiltrosBusqueda) => void;
}

const ciudades = [
  'Medellín',
  'Bogotá', 
  'Cartagena',
  'Santa Marta',
  'Guatapé',
  'Salento'
];

const amenidadesDisponibles = [
  'WiFi',
  'Cocina',
  'TV',
  'Aire acondicionado',
  'Piscina',
  'Estacionamiento',
  'Gimnasio',
  'Chimenea',
  'Jardín',
  'Terraza'
];

export default function FilterBar({ filtros, onFiltrosChange }: FilterBarProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [tempFiltros, setTempFiltros] = useState<FiltrosBusqueda>(filtros);

  const handleOpenDialog = () => {
    setTempFiltros(filtros);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleApplyFilters = () => {
    onFiltrosChange(tempFiltros);
    setOpenDialog(false);
  };

  const handleClearFilters = () => {
    const emptyFilters: FiltrosBusqueda = {};
    setTempFiltros(emptyFilters);
    onFiltrosChange(emptyFilters);
    setOpenDialog(false);
  };

  const countActiveFilters = () => {
    return Object.values(filtros).filter(value => 
      value !== undefined && value !== null && 
      (Array.isArray(value) ? value.length > 0 : true)
    ).length;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Fade in timeout={800}>
        <FilterContainer elevation={0}>
          {/* Título atractivo */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
          </Box>

          {/* Barra de filtros principal */}
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            mb: 3
          }}>
            <Grow in timeout={600}>
               <Box>
                 <Tooltip 
                   title="Explora destinos" 
                   arrow
                   placement="top"
                   sx={{
                     '& .MuiTooltip-tooltip': {
                       backgroundColor: '#FF5A5F',
                       color: 'white',
                       fontSize: '14px',
                       borderRadius: '8px',
                       fontWeight: 500,
                     },
                     '& .MuiTooltip-arrow': {
                       color: '#FF5A5F',
                     }
                   }}
                 >
                   <Autocomplete
                     size="medium"
                     options={ciudades}
                     value={filtros.ubicacion || null}
                     onChange={(_, value) => onFiltrosChange({ ...filtros, ubicacion: value || undefined })}
                     renderInput={(params) => (
                       <StyledTextField 
                         {...params} 
                         label="Dónde"
                         placeholder="Explora Destinos"
                         sx={{ minWidth: 220 }}
                         InputProps={{
                           ...params.InputProps,
                           startAdornment: (
                             <InputAdornment position="start">
                               <LocationOn color="action" />
                             </InputAdornment>
                           ),
                         }}
                       />
                     )}
                   />
                 </Tooltip>
               </Box>
             </Grow>
            
            <Grow in timeout={800}>
              <Box>
                <StyledTextField
                  size="medium"
                  type="date"
                  label="Fecha Entrada"
                  value={filtros.fechaEntrada || ''}
                  onChange={(e) => onFiltrosChange({ ...filtros, fechaEntrada: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  sx={{ minWidth: 180 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarToday color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Grow>
            
            <Grow in timeout={1000}>
              <Box>
                <StyledTextField
                  size="medium"
                  type="date"
                  label="Fecha Salida"
                  value={filtros.fechaSalida || ''}
                  onChange={(e) => onFiltrosChange({ ...filtros, fechaSalida: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  sx={{ minWidth: 180 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccessTime color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Grow>
            
                         <Grow in timeout={1200}>
               <Box>
                 <Tooltip 
                   title="¿Cuántos viajan?" 
                   arrow
                   placement="top"
                   sx={{
                     '& .MuiTooltip-tooltip': {
                       backgroundColor: '#FF5A5F',
                       color: 'white',
                       fontSize: '14px',
                       borderRadius: '8px',
                       fontWeight: 500,
                     },
                     '& .MuiTooltip-arrow': {
                       color: '#FF5A5F',
                     }
                   }}
                 >
                   <FormControl size="medium" sx={{ minWidth: 150 }}>
                     <InputLabel>Quién</InputLabel>
                     <Select
                       value={filtros.huespedes || ''}
                       onChange={(e) => onFiltrosChange({ ...filtros, huespedes: e.target.value as number })}
                       label="¿Cuántos?"
                       color="black"
                       displayEmpty
                       sx={{
                         borderRadius: '16px',
                         backgroundColor: 'rgba(255, 255, 255, 0.8)',
                         '&:hover': {
                           backgroundColor: 'rgba(255, 255, 255, 0.95)',
                         }
                       }}
                       startAdornment={
                         <InputAdornment position="start">
                           <Person color="action" />
                         </InputAdornment>
                       }
                     >
                       <MenuItem value="" disabled sx={{ color: '#999', fontStyle: 'italic' }}>
                         ¿Cuántos?
                       </MenuItem>
                       {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                         <MenuItem key={num} value={num}>{num} Adulto{num > 1 ? 's' : ''}</MenuItem>
                       ))}
                     </Select>
                   </FormControl>
                 </Tooltip>
               </Box>
             </Grow>
          </Box>

          {/* Botones de acción centrados */}
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Grow in timeout={1400}>
              <SearchButton
                size="large"
                startIcon={<Search />}
                onClick={() => {
                  // Aquí puedes agregar lógica de búsqueda
                  console.log('Búsqueda realizada con filtros:', filtros);
                }}
              >
                Buscar alojamientos
              </SearchButton>
            </Grow>

            <Grow in timeout={1600}>
              <Button
                variant="outlined"
                startIcon={<TuneOutlined />}
                onClick={handleOpenDialog}
                sx={{ 
                  borderRadius: '24px',
                  px: 3,
                  py: 1.5,
                  borderColor: '#FF5A5F',
                  color: '#FF5A5F',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#E50914',
                    backgroundColor: 'rgba(255, 90, 95, 0.1)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                Filtros avanzados
                {countActiveFilters() > 0 && (
                  <AnimatedChip 
                    size="small" 
                    label={countActiveFilters()} 
                    sx={{ ml: 1, fontSize: '12px' }}
                    color="primary"
                  />
                )}
              </Button>
            </Grow>

            {/* Botón de limpiar filtros */}
            {countActiveFilters() > 0 && (
              <Grow in timeout={1800}>
                <IconButton
                  onClick={() => onFiltrosChange({})}
                  sx={{
                    color: '#666',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#FF5A5F',
                      transform: 'scale(1.1)',
                    }
                  }}
                >
                  <Clear />
                </IconButton>
              </Grow>
            )}
          </Box>
        </FilterContainer>
      </Fade>

      {/* Dialog de filtros avanzados mejorado */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          }
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
          <Typography variant="h5" sx={{ 
            background: 'linear-gradient(45deg, #FF5A5F 30%, #FF8E53 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 600
          }}>
            Filtros avanzados
          </Typography>
        </DialogTitle>
        
        <DialogContent>
          <Box sx={{ py: 2 }}>
            {/* Rango de precios */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Hotel color="primary" />
                Rango de precios por noche
              </Typography>
              <Box sx={{ px: 2, mt: 3 }}>
                <Slider
                  value={[tempFiltros.precioMin || 50000, tempFiltros.precioMax || 500000]}
                  onChange={(_, values) => {
                    const [min, max] = values as number[];
                    setTempFiltros({
                      ...tempFiltros,
                      precioMin: min,
                      precioMax: max
                    });
                  }}
                  valueLabelDisplay="auto"
                  min={50000}
                  max={500000}
                  step={10000}
                  marks={[
                    { value: 50000, label: '$50K' },
                    { value: 250000, label: '$250K' },
                    { value: 500000, label: '$500K' }
                  ]}
                  valueLabelFormat={(value) => `$${(value / 1000).toFixed(0)}K`}
                  sx={{
                    color: '#FF5A5F',
                    '& .MuiSlider-thumb': {
                      '&:hover': {
                        boxShadow: '0 0 0 8px rgba(255, 90, 95, 0.16)',
                      }
                    }
                  }}
                />
              </Box>
            </Box>

            <Divider sx={{ my: 3, background: 'linear-gradient(90deg, transparent, #FF5A5F, transparent)' }} />

            {/* Amenidades */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TuneOutlined color="primary" />
                Amenidades
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                {amenidadesDisponibles.map((amenidad, index) => (
                  <Grow in timeout={200 * index} key={amenidad}>
                    <AnimatedChip
                      label={amenidad}
                      variant={tempFiltros.amenidades?.includes(amenidad) ? "filled" : "outlined"}
                      color={tempFiltros.amenidades?.includes(amenidad) ? "primary" : "default"}
                      onClick={() => {
                        const current = tempFiltros.amenidades || [];
                        const updated = current.includes(amenidad)
                          ? current.filter(a => a !== amenidad)
                          : [...current, amenidad];
                        setTempFiltros({
                          ...tempFiltros,
                          amenidades: updated.length > 0 ? updated : undefined
                        });
                      }}
                      sx={{
                        m: 0.5,
                        fontSize: '14px',
                        '&.MuiChip-filled': {
                          background: 'linear-gradient(45deg, #FF5A5F 30%, #FF8E53 90%)',
                        }
                      }}
                    />
                  </Grow>
                ))}
              </Box>
            </Box>
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ p: 3, justifyContent: 'space-between' }}>
          <Button 
            onClick={handleClearFilters} 
            color="inherit"
            sx={{
              borderRadius: '20px',
              px: 3,
              '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' }
            }}
          >
            Borrar todo
          </Button>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              onClick={handleCloseDialog} 
              color="inherit"
              sx={{
                borderRadius: '20px',
                px: 3,
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' }
              }}
            >
              Cancelar
            </Button>
            <SearchButton onClick={handleApplyFilters}>
              Mostrar lugares
            </SearchButton>
          </Box>
        </DialogActions>
      </Dialog>
    </Container>
  );
} 