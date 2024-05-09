import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";

export const useSession = () => {
  const [session, setSession] = useState(null);
  useEffect(() => {
    //Leemos la session de localstorage
    let user = secureLocalStorage.getItem("user");
    //Seteamos la session con setSesion
    if (!user) {
      console.error("No existe usuario");
    } else {
      setSession(user);
    }
  }, []);
  return [session, setSession];
};
