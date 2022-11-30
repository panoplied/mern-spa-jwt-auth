import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const API_BASE_URL = "http://localhost:5000/api";

export const useLogin = () => {
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsPending(true);
    setError(null);

    const response = await fetch(`${API_BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.error);
    } else {
      localStorage.setItem("user", JSON.stringify(result));
      dispatch({ type: "LOGIN", payload: result });
    }
    setIsPending(false);
  };

  return { login, isPending, error };
};
