import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { AuthContext } from "./AuthContext";
// import { AuthContext } from "./AuthContext";

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- Register ---------------- */
  const createUser = async (email, password) => {
    setLoading(true);
    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return result;
  };

  /* ---------------- Login ---------------- */
  const signIn = async (email, password) => {
    setLoading(true);
    const result = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return result;
  };

  /* ---------------- Update Profile ---------------- */
  const updateUserProfile = async (name, photoURL) => {
    if (!auth.currentUser) return;
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });

    // ✅ realtime UI update
    setUser({ ...auth.currentUser });
  };

  /* ---------------- Logout ---------------- */
  const logOut = async () => {
    setLoading(true);
    await signOut(auth);
    setUser(null);
  };

  /* ---------------- Auth State Observer ---------------- */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    updateUserProfile,
    setUser,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
