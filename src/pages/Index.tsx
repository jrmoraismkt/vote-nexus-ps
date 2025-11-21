import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Home from "./Home";
import { Screensaver } from "@/components/Screensaver";
import { useInactivityTimer } from "@/hooks/useInactivityTimer";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showScreensaver, setShowScreensaver] = useState(false);

  // Only show screensaver on home page
  const isHomePage = location.pathname === "/";

  useInactivityTimer({
    onInactive: () => setShowScreensaver(true),
    delay: 30000,
    enabled: isHomePage && !showScreensaver,
  });

  const handleExitScreensaver = () => {
    setShowScreensaver(false);
  };

  if (showScreensaver) {
    return <Screensaver onExit={handleExitScreensaver} />;
  }

  return <Home />;
};

export default Index;
