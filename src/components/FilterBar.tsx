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
  Grid,
  Divider
} from '@mui/material';
import { FilterList, TuneOutlined } from '@mui/icons-material';
import type { FiltrosBusqueda } from '../types';

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
    <Box>
      {/* Barra de filtros compacta */}
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        alignItems: 'center',
        overflowX: 'auto',
        pb: 1,
        mb: 3
      }}>
        <Autocomplete
          size="small"
          options={ciudades}
          value={filtros.ubicacion || null}
          onChange={(_, value) => onFiltrosChange({ ...filtros, ubicacion: value || undefined })}
          renderInput={(params) => (
            <TextField 
              {...params} 
              label="¿A dónde vamos?"
              sx={{ minWidth: 200 }}
            />
          )}
        />
        
        <TextField
          size="small"
          type="date"
          label="Entrada"
          value={filtros.fechaEntrada || ''}
          onChange={(e) => onFiltrosChange({ ...filtros, fechaEntrada: e.target.value })}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: 150 }}
        />
        
        <TextField
          size="small"
          type="date"
          label="Salida"
          value={filtros.fechaSalida || ''}
          onChange={(e) => onFiltrosChange({ ...filtros, fechaSalida: e.target.value })}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: 150 }}
        />
        
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Huéspedes</InputLabel>
          <Select
            value={filtros.huespedes || ''}
            onChange={(e) => onFiltrosChange({ ...filtros, huespedes: e.target.value as number })}
            label="Huéspedes"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <MenuItem key={num} value={num}>{num}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          startIcon={<TuneOutlined />}
          onClick={handleOpenDialog}
          sx={{ 
            minWidth: 'auto',
            borderRadius: '24px',
            px: 3
          }}
        >
          Filtros
          {countActiveFilters() > 0 && (
            <Chip 
              size="small" 
              label={countActiveFilters()} 
              sx={{ ml: 1, fontSize: '12px' }}
              color="primary"
            />
          )}
        </Button>
      </Box>

      {/* Dialog de filtros avanzados */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6">Filtros</Typography>
        </DialogTitle>
        
        <DialogContent>
          <Box sx={{ py: 2 }}>
            {/* Rango de precios */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Rango de precios por noche
              </Typography>
              <Box sx={{ px: 2 }}>
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
                />
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Amenidades */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Amenidades
              </Typography>
              <Grid container spacing={1}>
                {amenidadesDisponibles.map((amenidad) => (
                  <Grid item key={amenidad}>
                    <Chip
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
                      sx={{ m: 0.5 }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ p: 3, justifyContent: 'space-between' }}>
          <Button onClick={handleClearFilters} color="inherit">
            Borrar todo
          </Button>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button onClick={handleCloseDialog} color="inherit">
              Cancelar
            </Button>
            <Button 
              onClick={handleApplyFilters}
              variant="contained"
              sx={{ 
                backgroundColor: '#FF5A5F',
                '&:hover': { backgroundColor: '#E50914' }
              }}
            >
              Mostrar lugares
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 