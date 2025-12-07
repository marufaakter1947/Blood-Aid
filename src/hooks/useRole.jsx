import useAuth from './useAuth';

const useRole = () => {
  const { user } = useAuth();


  if (!user) return null;

  
  return user.role;
};

export default useRole;
