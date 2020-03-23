import React, { useEffect } from "react";
import { Progress } from "antd";
import { useTimer } from "react-timer-hook";

const TimedProgress = ({ timerOptions  }) => {
  const { seconds, minutes, start, pause, restart } = useTimer(timerOptions);

  useEffect(() => {
    if (timerOptions) restart(timerOptions.expiryTimestamp);
    return pause;
  }, [timerOptions]);

  return <Progress percent={100 - (minutes * 60 + seconds) / 3} showInfo={false} />;
};

export default TimedProgress;
