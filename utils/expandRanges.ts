import { parseLocalDate, formatYMD } from "./date";

export const expandDateRanges = (events: Record<string, any>) => {
  const result: Record<string, any> = {};

  for (const [key, info] of Object.entries(events)) {
    if (!key.includes(" a ")) {
      result[key] = info;
      continue;
    }

    const [startStr, endStr] = key.split(" a ").map((s) => s.trim());
    let current = parseLocalDate(startStr);
    const end = parseLocalDate(endStr);

    while (current <= end) {
      result[formatYMD(current)] = info;
      current.setDate(current.getDate() + 1);
    }
  }

  return result;
};
