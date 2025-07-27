import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, AuthContextType, RegisterData } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario desde localStorage al inicializar
  useEffect(() => {
    const storedUser = localStorage.getItem('airbnb_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('airbnb_user');
      }
    }
    setLoading(false);
  }, []);

  // Simular login (en una app real, esto sería una llamada a la API)
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular validación (en una app real, esto sería validado por el servidor)
      if (email && password.length >= 6) {
        const mockUser: User = {
          id: Date.now().toString(),
          email,
          nombre: email.split('@')[0].split('.')[0] || 'Usuario',
          apellido: email.split('@')[0].split('.')[1] || 'Apellido',
          avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=FF5A5F&color=fff`,
          esAnfitrion: false,
          fechaRegistro: new Date().toISOString().split('T')[0]
        };
        
        setUser(mockUser);
        localStorage.setItem('airbnb_user', JSON.stringify(mockUser));
        setLoading(false);
        return true;
      }
      
      setLoading(false);
      return false;
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
      return false;
    }
  };

  // Simular registro
  const register = async (userData: RegisterData): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Simular validación
      if (userData.email && userData.password.length >= 6 && userData.nombre && userData.apellido) {
        const newUser: User = {
          id: Date.now().toString(),
          email: userData.email,
          nombre: userData.nombre,
          apellido: userData.apellido,
          telefono: userData.telefono,
          fechaNacimiento: userData.fechaNacimiento,
          avatar: `https://ui-avatars.com/api/?name=${userData.nombre}+${userData.apellido}&background=FF5A5F&color=fff`,
          esAnfitrion: false,
          fechaRegistro: new Date().toISOString().split('T')[0]
        };
        
        setUser(newUser);
        localStorage.setItem('airbnb_user', JSON.stringify(newUser));
        setLoading(false);
        return true;
      }
      
      setLoading(false);
      return false;
    } catch (error) {
      console.error('Register error:', error);
      setLoading(false);
      return false;
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('airbnb_user');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 