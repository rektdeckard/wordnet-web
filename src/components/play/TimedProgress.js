import React, { useMemo } from "react";
import { Progress } from "antd";
import { useTimer } from "react-timer-hook";
import { getTime, add } from "date-fns";

const TimedProgress = ({
  time = { hours: 0, minutes: 5, seconds: 0 },
  onExpire,
}) => {
  const {
    hours: totalHours,
    minutes: totalMinutes,
    seconds: totalSeconds,
  } = time;
  const { currentTimestamp, expiryTimestamp } = useMemo(() => {
    return {
      currentTimestamp: Date.now(),
      expiryTimestamp: getTime(
        add(new Date(), {
          hours: totalHours ?? 0,
          minutes: totalMinutes ?? 0,
          seconds: totalSeconds ?? 0,
        })
      ),
    };
  }, [totalHours, totalMinutes, totalSeconds]);

  const { seconds, minutes, hours, start, pause, restart } = useTimer({
    expiryTimestamp,
    onExpire,
  });

  const calculatePercent = () =>
    100 -
    ((hours ?? 0) * 3600 +
      ((minutes ?? 0) * 60 + (seconds ?? 0)) /
        ((totalHours ?? 0) * 3600 +
          (totalMinutes ?? 0) * 60 +
          (totalSeconds ?? 0))) *
      100;

  return <Progress percent={calculatePercent()} showInfo={false} />;
};

export default TimedProgress;
