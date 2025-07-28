import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,

  Card,
  CardContent,
  Divider,
  Alert,
  CircularProgress,
  Chip,
  IconButton,
  InputAdornment,
  Paper
} from '@mui/material';
import {
  Close,
  CreditCard,
  Person,
  SecurityOutlined,
  CheckCircle,
  Payment,
  Home,
  Email,
  Phone,
  CalendarToday,
  LocationOn
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';
import { useAuth } from '../contexts/AuthContext';
import type { Alojamiento } from '../types';

// Animaciones
const successPulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const slideIn = keyframes`
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
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '20px',
    maxWidth: '800px',
    width: '100%',
    overflow: 'visible',
  }
}));

const PaymentCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderRadius: '16px',
  border: '1px solid rgba(255, 90, 95, 0.1)',
  animation: `${slideIn} 0.5s ease-out`,
}));

const SuccessCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  borderRadius: '20px',
  background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
  color: 'white',
  animation: `${slideIn} 0.8s ease-out`,
}));

const CreditCardPreview = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '16px',
  padding: theme.spacing(3),
  color: 'white',
  minHeight: '200px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    right: '-20%',
    width: '200px',
    height: '200px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
  }
}));

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  alojamiento: Alojamiento;
  nights: number;
  totalPrice: number;
}

interface PaymentData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardHolder: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

const steps = ['Datos de Pago', 'Confirmación', 'Completado'];

export default function PaymentModal({ 
  open, 
  onClose, 
  alojamiento, 
  nights = 5, 
  totalPrice 
}: PaymentModalProps) {
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: user ? `${user.nombre} ${user.apellido}` : '',
    email: user?.email || '',
    phone: user?.telefono || '',
    address: '',
    city: '',
    zipCode: '',
    country: 'Colombia'
  });

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const handleInputChange = (field: keyof PaymentData, value: string) => {
    let formattedValue = value;
    
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }

    setPaymentData(prev => ({
      ...prev,
      [field]: formattedValue
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validatePaymentForm = () => {
    const newErrors: Record<string, string> = {};

    if (!paymentData.cardNumber || paymentData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Número de tarjeta inválido';
    }

    if (!paymentData.expiryDate || !/^\d{2}\/\d{2}$/.test(paymentData.expiryDate)) {
      newErrors.expiryDate = 'Fecha de vencimiento inválida';
    }

    if (!paymentData.cvv || paymentData.cvv.length < 3) {
      newErrors.cvv = 'CVV inválido';
    }

    if (!paymentData.cardHolder.trim()) {
      newErrors.cardHolder = 'Nombre del titular requerido';
    }

    if (!paymentData.email || !/\S+@\S+\.\S+/.test(paymentData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!paymentData.phone.trim()) {
      newErrors.phone = 'Teléfono requerido';
    }

    if (!paymentData.address.trim()) {
      newErrors.address = 'Dirección requerida';
    }

    if (!paymentData.city.trim()) {
      newErrors.city = 'Ciudad requerida';
    }

    if (!paymentData.zipCode.trim()) {
      newErrors.zipCode = 'Código postal requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (!validatePaymentForm()) return;
    }
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simular procesamiento de pago
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setActiveStep(2); // Ir a paso de completado
    } catch (error) {
      console.error('Error en el pago:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setActiveStep(0);
    setErrors({});
    onClose();
  };

  const getCardType = (number: string) => {
    const num = number.replace(/\s/g, '');
    if (num.startsWith('4')) return 'Visa';
    if (num.startsWith('5') || num.startsWith('2')) return 'Mastercard';
    if (num.startsWith('3')) return 'Amex';
    return 'Tarjeta';
  };

  const renderPaymentForm = () => (
    <Box>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: 3
      }}>
        {/* Tarjeta de Crédito */}
        <Box>
          <PaymentCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CreditCard sx={{ mr: 1, color: '#FF5A5F' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Información de Pago
                </Typography>
              </Box>

              <TextField
                fullWidth
                label="Número de Tarjeta"
                value={paymentData.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                error={!!errors.cardNumber}
                helperText={errors.cardNumber}
                placeholder="1234 5678 9012 3456"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Chip 
                        label={getCardType(paymentData.cardNumber)} 
                        size="small" 
                        variant="outlined"
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <TextField
                  fullWidth
                  label="MM/YY"
                  value={paymentData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  error={!!errors.expiryDate}
                  helperText={errors.expiryDate}
                  placeholder="12/25"
                />
                <TextField
                  fullWidth
                  label="CVV"
                  value={paymentData.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                  error={!!errors.cvv}
                  helperText={errors.cvv}
                  placeholder="123"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SecurityOutlined color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <TextField
                fullWidth
                label="Nombre del Titular"
                value={paymentData.cardHolder}
                onChange={(e) => handleInputChange('cardHolder', e.target.value)}
                error={!!errors.cardHolder}
                helperText={errors.cardHolder}
                sx={{ mt: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </CardContent>
          </PaymentCard>
        </Box>

        {/* Preview de Tarjeta */}
        <Box>
          <CreditCardPreview>
            <Box>
              <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                {getCardType(paymentData.cardNumber)}
              </Typography>
              <Typography variant="h5" sx={{ fontFamily: 'monospace', letterSpacing: 2 }}>
                {paymentData.cardNumber || '•••• •••• •••• ••••'}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Titular
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {paymentData.cardHolder || 'NOMBRE APELLIDO'}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Vence
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {paymentData.expiryDate || 'MM/YY'}
                </Typography>
              </Box>
            </Box>
          </CreditCardPreview>
        </Box>

        {/* Información de Facturación */}
        <Box sx={{ gridColumn: '1 / -1' }}>
          <PaymentCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Home sx={{ mr: 1, color: '#FF5A5F' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Información de Facturación
                </Typography>
              </Box>

              <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2,
                mb: 2
              }}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={paymentData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label="Teléfono"
                  value={paymentData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              
              <TextField
                fullWidth
                label="Dirección"
                value={paymentData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                error={!!errors.address}
                helperText={errors.address}
                sx={{ mb: 2 }}
              />
              
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' },
                gap: 2
              }}>
                <TextField
                  fullWidth
                  label="Ciudad"
                  value={paymentData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  error={!!errors.city}
                  helperText={errors.city}
                />
                <TextField
                  fullWidth
                  label="Código Postal"
                  value={paymentData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  error={!!errors.zipCode}
                  helperText={errors.zipCode}
                />
                <TextField
                  fullWidth
                  label="País"
                  value={paymentData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  disabled
                />
              </Box>
            </CardContent>
          </PaymentCard>
        </Box>
      </Box>
    </Box>
  );

  const renderConfirmation = () => (
    <Box>
      <Alert 
        severity="info" 
        sx={{ mb: 3, borderRadius: '12px' }}
        icon={<Payment />}
      >
        <Typography variant="h6" gutterBottom>
          Confirma tu reserva
        </Typography>
        <Typography variant="body2">
          Verifica que toda la información sea correcta antes de proceder con el pago.
        </Typography>
      </Alert>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
        gap: 3
      }}>
        {/* Resumen de Reserva */}
        <Box>
          <Card sx={{ borderRadius: '16px', mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Resumen de tu Reserva
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Box
                  component="img"
                  src={alojamiento.imagen[0]}
                  alt={alojamiento.nombre}
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '8px',
                    objectFit: 'cover'
                  }}
                />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {alojamiento.nombre}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                    <LocationOn sx={{ fontSize: 16, color: '#FF5A5F' }} />
                    <Typography variant="body2" color="text.secondary">
                      {alojamiento.ubicacion.ciudad}, {alojamiento.ubicacion.pais}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <CalendarToday sx={{ fontSize: 16, color: '#FF5A5F' }} />
                <Typography variant="body2">
                  {nights} noches • Check-in: Hoy • Check-out: {new Date(Date.now() + nights * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary">
                {alojamiento.huespedes} huéspedes • {alojamiento.habitaciones} habitaciones
              </Typography>
            </CardContent>
          </Card>

          {/* Método de Pago */}
          <Card sx={{ borderRadius: '16px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Método de Pago
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CreditCard color="action" />
                <Box>
                  <Typography variant="body1">
                    •••• •••• •••• {paymentData.cardNumber.slice(-4)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {paymentData.cardHolder} • {getCardType(paymentData.cardNumber)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Desglose de Precios */}
        <Box>
          <Card sx={{ borderRadius: '16px', position: 'sticky', top: 20 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Desglose de Precios
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">
                  ${alojamiento.precio.toLocaleString()} x {nights} noches
                </Typography>
                <Typography variant="body2">
                  ${(alojamiento.precio * nights).toLocaleString()}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Tarifa de servicio</Typography>
                <Typography variant="body2">
                  ${Math.round(alojamiento.precio * nights * 0.14).toLocaleString()}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2">Impuestos</Typography>
                <Typography variant="body2">
                  ${Math.round(alojamiento.precio * nights * 0.05).toLocaleString()}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight="bold">
                  Total
                </Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ color: '#FF5A5F' }}>
                  ${totalPrice.toLocaleString()}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );

  const renderSuccess = () => (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <SuccessCard>
        <CheckCircle 
          sx={{ 
            fontSize: 80, 
            mb: 2,
            animation: `${successPulse} 2s infinite`
          }} 
        />
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          ¡Reserva Confirmada!
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
          Tu pago ha sido procesado exitosamente
        </Typography>
        
        <Box sx={{ 
          background: 'rgba(255, 255, 255, 0.2)', 
          borderRadius: '12px', 
          p: 2, 
          mb: 3 
        }}>
          <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
            Número de Confirmación
          </Typography>
          <Typography variant="h5" sx={{ fontFamily: 'monospace', letterSpacing: 2 }}>
            AIR-{Date.now().toString().slice(-6)}
          </Typography>
        </Box>

        <Alert 
          severity="success" 
          sx={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            color: '#2e7d32',
            borderRadius: '12px',
            mb: 3
          }}
        >
          <Typography variant="body2">
            <strong>Próximos pasos:</strong><br />
            • Recibirás un email de confirmación en {paymentData.email}<br />
            • El anfitrión te contactará próximamente<br />
            • Puedes revisar tu reserva en "Mis Viajes"
          </Typography>
        </Alert>
      </SuccessCard>
    </Box>
  );

  return (
    <StyledDialog 
      open={open} 
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 2
      }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          {activeStep === 2 ? '¡Felicidades!' : 'Confirmar y Pagar'}
        </Typography>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 0 }}>
        {/* Stepper */}
        {activeStep < 2 && (
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label, index) => (
              <Step key={label} completed={index < activeStep}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        )}

        {/* Contenido según el paso */}
        {activeStep === 0 && renderPaymentForm()}
        {activeStep === 1 && renderConfirmation()}
        {activeStep === 2 && renderSuccess()}
      </DialogContent>

      {/* Acciones */}
      {activeStep < 2 && (
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button
            onClick={activeStep === 0 ? handleClose : handleBack}
            sx={{ mr: 1 }}
          >
            {activeStep === 0 ? 'Cancelar' : 'Atrás'}
          </Button>
          
          <Button
            variant="contained"
            onClick={activeStep === 0 ? handleNext : handlePayment}
            disabled={isProcessing}
            startIcon={isProcessing ? <CircularProgress size={20} /> : null}
            sx={{
              background: 'linear-gradient(45deg, #FF5A5F 30%, #FF8E53 90%)',
              px: 4,
              '&:hover': {
                background: 'linear-gradient(45deg, #E50914 30%, #FF5A5F 90%)',
              }
            }}
          >
            {isProcessing 
              ? 'Procesando...' 
              : activeStep === 0 
                ? 'Continuar' 
                : `Pagar ${totalPrice.toLocaleString()} COP`
            }
          </Button>
        </DialogActions>
      )}

      {/* Botón para cerrar en el paso de éxito */}
      {activeStep === 2 && (
        <DialogActions sx={{ p: 3, pt: 0, justifyContent: 'center' }}>
          <Button
            variant="contained"
            onClick={handleClose}
            size="large"
            sx={{
              background: 'linear-gradient(45deg, #4CAF50 30%, #45a049 90%)',
              px: 6,
              py: 1.5,
              borderRadius: '25px',
              '&:hover': {
                background: 'linear-gradient(45deg, #388e3c 30%, #4CAF50 90%)',
              }
            }}
          >
            Continuar Navegando
          </Button>
        </DialogActions>
      )}
    </StyledDialog>
  );
} 