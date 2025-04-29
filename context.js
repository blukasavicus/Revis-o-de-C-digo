import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Criação do contexto
export const AuthContext = createContext();

// Provider de autenticação
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  // Atualiza dados do usuário no Firestore
  const updateUserData = useCallback(async (userId) => {
    try {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUser(prev => ({ ...prev, ...data }));
      }
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário:", error);
    }
  }, []);

  // Listener de estado de autenticação
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        await updateUserData(user.uid);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsub;
  }, [updateUserData]);

  // Tratamento centralizado de erros
  const handleAuthError = (error) => {
    let msg = error.message;
    if (msg.includes('(auth/invalid-email)')) msg = 'E-mail inválido';
    if (msg.includes('(auth/email-already-in-use)')) msg = 'E-mail já em uso';
    if (msg.includes('(auth/invalid-credential)')) msg = 'Credenciais inválidas';
    return { success: false, msg };
  };

  // Login
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      return handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Registro
  const register = async ({ email, password, username, profileUrl }) => {
    setIsLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      
      await setDoc(doc(db, "users", response.user.uid), {
        username, 
        profileUrl,
        userId: response.user.uid
      });
      
      return { success: true, data: response.user };
    } catch (error) {
      return handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, msg: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isLoading,
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthContextProvider');
  }
  return context;
};