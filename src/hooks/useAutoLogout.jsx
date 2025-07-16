import { useEffect } from "react";
import { logoutAdmin } from "../services/authService";

export const useAutoLogout = (timeoutMinutes = 15) => {
  useEffect(() => {
    let timeout;

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        logoutAdmin();
        alert("Sesión cerrada por inactividad.");
        window.location.href = "/"; // redirige al menú
      }, timeoutMinutes * 60 * 1000);
    };

    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer(); // inicia el temporizador

    return () => {
      clearTimeout(timeout);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [timeoutMinutes]);
};
