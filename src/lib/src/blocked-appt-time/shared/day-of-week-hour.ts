import { BlockedApptTime } from './blocked-appt-time';

export interface DayOfWeekHour {
  id?: number;
  blockedApptTimes?: BlockedApptTime[];
  dayOfWeekId?: number;
  dayOfWeek?: {
    id: number,
    name: string,
    abbreviation?: string
  };
  startTime?: string;
  endTime?: string;
}