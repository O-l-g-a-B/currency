import { useEffect, useState } from "react";

const Timer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const intervalUpdater = setInterval(() => setCurrentTime(new Date()), 1000);
    return function cleanup() {
      clearInterval(intervalUpdater);
    };
  });
  return <time>{currentTime.toLocaleTimeString()}</time>;
};

export default Timer;