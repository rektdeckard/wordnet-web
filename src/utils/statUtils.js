import { useMemo } from "react";
import { isBefore, isAfter, startOfWeek, subWeeks } from "date-fns";

export const useWeekOverWeek = sessions =>
  useMemo(() => {
    const weekStart = startOfWeek(new Date());
    const previousWeekStart = subWeeks(weekStart, 1);

    const currentWeekSessions =
      sessions?.filter(s => {
        const date = new Date(s.createdAt);
        return isAfter(date, weekStart);
      }) ?? [];

    const previousWeekSessions =
      sessions?.filter(s => {
        const date = new Date(s.createdAt);
        return isAfter(date, previousWeekStart) && isBefore(date, weekStart);
      }) ?? [];

    return (currentWeekSessions.length / previousWeekSessions.length - 1) * 100;
  }, [sessions]);

export const useDensity = graph => useMemo(() => {
  const e = graph?.edges?.length;
  const v = graph?.nodes?.length;

  const density = e && v ? e/(v * (v - 1)) : null;

  return { density };
}, [graph]);
