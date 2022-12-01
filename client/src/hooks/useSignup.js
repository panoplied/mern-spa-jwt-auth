import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

import API_BASE_URL from "../env";

export const useSignup = () => {
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsPending(true);
    setError(null);

    const response = await fetch(`${API_BASE_URL}/user/signup`, {
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

  return { signup, isPending, error };
};
