import { useMemo } from "react";
import { isBefore, isAfter, startOfWeek, subWeeks } from "date-fns";

const weekStart = startOfWeek(new Date());
const previousWeekStart = subWeeks(weekStart, 1);

export const useWeekOverWeek = sessions => {
  const currentWeekSessions = useMemo(
    () =>
      sessions?.filter(s => {
        const date = new Date(s.createdAt);
        return isAfter(date, weekStart);
      }) ?? [],
    [sessions]
  );

  const previousWeekSessions = useMemo(
    () =>
      sessions?.filter(s => {
        const date = new Date(s.createdAt);
        return isAfter(date, previousWeekStart) && isBefore(date, weekStart);
      }) ?? [],
    [sessions]
  );

  return useMemo(
    () => (currentWeekSessions.length / previousWeekSessions.length - 1) * 100,
    [sessions]
  );
};
