import { useState, useEffect } from "react";

const CapsLock = () => {
  const [caps, setCaps] = useState(false);

  const capsHandler = (event) => {
    setCaps(event.getModifierState("CapsLock"));
  };

  useEffect(() => {
    document.addEventListener("keydown", capsHandler);
    document.addEventListener("keyup", capsHandler);
    return () => {
      document.addEventListener("keydown", capsHandler);
      document.removeEventListener("keyup", capsHandler);
    };
  }, []);

  return <div className="capslock-indicator">{caps ? "CAPS" : ""}</div>;
};

export default CapsLock;
