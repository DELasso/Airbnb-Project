import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabaseClient';
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

  // Cargar usuario desde Supabase al inicializar
  useEffect(() => {
    const getSession = async () => {
      setLoading(true);
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser({
          id: data.user.id,
          email: data.user.email ?? '',
          nombre: data.user.user_metadata?.nombre ?? '',
          apellido: data.user.user_metadata?.apellido ?? '',
          avatar: data.user.user_metadata?.avatar ?? '',
          esAnfitrion: data.user.user_metadata?.esAnfitrion ?? false,
          fechaRegistro: data.user.created_at?.split('T')[0] ?? ''
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    };
    getSession();
  }, []);

  // Login con Supabase
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user) {
      setLoading(false);
      return false;
    }
    setUser({
      id: data.user.id,
      email: data.user.email ?? '',
      nombre: data.user.user_metadata?.nombre ?? '',
      apellido: data.user.user_metadata?.apellido ?? '',
      avatar: data.user.user_metadata?.avatar ?? '',
      esAnfitrion: data.user.user_metadata?.esAnfitrion ?? false,
      fechaRegistro: data.user.created_at?.split('T')[0] ?? ''
    });
    setLoading(false);
    return true;
  };

  // Registro con Supabase
  const register = async (userData: RegisterData): Promise<boolean> => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          nombre: userData.nombre,
          apellido: userData.apellido,
          telefono: userData.telefono,
          fechaNacimiento: userData.fechaNacimiento,
          avatar: `https://ui-avatars.com/api/?name=${userData.nombre}+${userData.apellido}&background=FF5A5F&color=fff`,
          esAnfitrion: false
        }
      }
    });
    if (error || !data.user) {
      setLoading(false);
      return false;
    }
    setUser({
      id: data.user.id,
      email: data.user.email ?? '',
      nombre: userData.nombre,
      apellido: userData.apellido,
      avatar: `https://ui-avatars.com/api/?name=${userData.nombre}+${userData.apellido}&background=FF5A5F&color=fff`,
      esAnfitrion: false,
      fechaRegistro: data.user.created_at?.split('T')[0] ?? ''
    });
    setLoading(false);
    return true;
  };

  // Logout con Supabase
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
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
