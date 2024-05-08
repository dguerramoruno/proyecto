import { useEffect, useState } from 'react';
import SecureStorage from 'react-secure-storage';

// Creamos una instancia de SecureStorage
const secureStorage = new SecureStorage(localStorage);

export const useSession = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Función para obtener la sesión almacenada
    const getSession = async () => {
      try {
        const storedSession = await secureStorage.getItem('session');
        if (storedSession) {
          setSession(storedSession);
        }
      } catch (error) {
        console.error('Error al obtener la sesión:', error);
      }
    };

    getSession();
  }, []);

  // Función para actualizar la sesión
  const updateSession = async (newSession) => {
    try {
      await secureStorage.setItem('session', newSession);
      setSession(newSession);
    } catch (error) {
      console.error('Error al actualizar la sesión:', error);
    }
  };

  // Función para eliminar la sesión
  const deleteSession = async () => {
    try {
      await secureStorage.removeItem('session');
      setSession(null);
    } catch (error) {
      console.error('Error al eliminar la sesión:', error);
    }
  };

  return [session, updateSession, deleteSession];
};