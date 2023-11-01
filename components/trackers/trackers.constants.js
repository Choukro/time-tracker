import { v4 as uuidv4 } from "uuid";
import { getDateTimeForPicker } from "../../utils/trackers.util.js";

export const TRACKER_BY_DATE = "starttime";
export const TRACKER_BY_CATEGORY = "category";

export const TRACKER_CATEGORIES = {
  cat1: "Sport",
  cat2: "Code",
  cat3: "Films",
  cat4: "Documentation",
  cat5: "Défaut",
};

export const newDefaultTracker = () => ({
  id: uuidv4(),
  category: TRACKER_CATEGORIES.cat5,
  starttime: getDateTimeForPicker(),
  endtime: "",
  name: "",
});
