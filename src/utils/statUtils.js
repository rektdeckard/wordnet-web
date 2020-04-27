import { useMemo } from "react";
import {
  isBefore,
  isAfter,
  startOfWeek,
  subWeeks,
  eachDayOfInterval,
} from "date-fns";

/**
 * Returns the ratio of sessions in the current calendar week
 * to the preivous week.
 *
 * @param {WordNet[]} sessions Domain `WordNets`
 * @return {number} Session ratio
 */
export const useWeekOverWeek = (sessions) =>
  useMemo(() => {
    const weekStart = startOfWeek(new Date());
    const previousWeekStart = subWeeks(weekStart, 1);

    // TODO: use timestamp property instead of creating new Date objects
    const currentWeekSessions =
      sessions?.filter((s) => {
        const date = new Date(s.createdAt);
        return isAfter(date, weekStart);
      }) ?? [];

    const previousWeekSessions =
      sessions?.filter((s) => {
        const date = new Date(s.createdAt);
        return isAfter(date, previousWeekStart) && isBefore(date, weekStart);
      }) ?? [];

    return (currentWeekSessions.length / previousWeekSessions.length - 1) * 100;
  }, [sessions]);

  /**
   * Takes an array of all session counts by day, and returns an array of those within
   * the past week, including zeros.
   * 
   * @param {{ day: string, value: number}[]} sessionsByDay array of daily session counts
   * @return array of daily session counts of the past week
   */
export const useWeekSessions = (sessionsByDay) =>
  useMemo(() => {
    const weekAgo = subWeeks(new Date(), 1);
    const weekDays = eachDayOfInterval({
      start: weekAgo,
      end: new Date(),
    }).reduce(
      (acc, curr) => ({
        ...acc,
        [curr.toISOString().split("T")[0]]: 0,
      }),
      {}
    );

    const weekMap = sessionsByDay.reduce((acc, curr) => {
      if (acc[curr.day] === 0) return { ...acc, [curr.day]: curr.value };
      return acc;
    }, weekDays);

    return Object.keys(weekMap).map((day) => ({ day, value: weekMap[day] }));
  }, [sessionsByDay]);
