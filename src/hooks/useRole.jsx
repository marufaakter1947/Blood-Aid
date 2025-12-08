// // import useAuth from './useAuth';

// // const useRole = () => {
// //   const { user } = useAuth();


// //   if (!user) return null;

  
// //   return user.role;
// // };

// // export default useRole;
// import { useQuery } from "@tanstack/react-query";
// // import useAuth from "../Providers/AuthContext";
// import useAxiosSecure from "./useAxiosSecure";
// import useAuth from "./useAuth";

// const useRole = () => {
//   const { user, loading } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const {
//     data: role,
//     isLoading: roleLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ["userRole", user?.email],
//     enabled: !loading && !!user?.email, // ✅ important
//     queryFn: async () => {
//       const res = await axiosSecure.get("/user/role");
//       return res.data.role;
//     },
//   });

//   return { role, roleLoading, refetch };
// };

// export default useRole;
import { useEffect, useState } from "react";
import axios from "axios";

const useRole = (email) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (!email) return;

    axios
      .get(`http://localhost:5000/users/role?email=${email}`)
      .then((res) => {
        if (res.data.success) setRole(res.data.role);
      })
      .catch((err) => console.error(err));
  }, [email]);

  return role;
};

export default useRole;
