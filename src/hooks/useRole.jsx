import { useEffect, useState } from "react";
import axios from "axios";

const useRole = (email) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (!email) return;

    axios
      .get(`https://blood-aid-server-one.vercel.app/users/role?email=${email}`)
      .then((res) => {
        if (res.data.success) setRole(res.data.role);
      })
      .catch((err) => console.error(err));
  }, [email]);

  return role;
};

export default useRole;
