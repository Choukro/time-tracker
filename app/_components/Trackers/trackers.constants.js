import { v4 as uuidv4 } from "uuid";
import { getDateTimeForPicker } from "../../../utils/trackers.util.js";

export const TRACKER_BY_DATE = "starttime";
export const TRACKER_BY_CATEGORY = "category";
export const KEY_LOCALSTORAGE = "trackers";
export const END_TIME = "endtime";

export const MESSAGE = {
  error: "⚠️ Impossible de réaliser cette action !",
  add: " 🎉 Nouveau tracker ajouté avec succès !",
  delete: " 🎉 Tracker supprimé avec succès !",
  update: " 🎉 Tracker mis à jour avec succès !",
  inProgress: "en cours...",
};

export const TRACKER_CATEGORIES = {
  cat1: "Sport",
  cat2: "Loisir",
  cat3: "Vie quotidienne",
  cat4: "Transport",
  cat5: "Réunion",
  cat6: "RDV Client",
  cat7: "Gestion de projet",
  cat8: "Suivi client",
  cat9: "Gestion administrative",
  cat10: "Gestion comptable",
  cat11: "Autre",
};

export const newDefaultTracker = () => ({
  id: uuidv4(),
  category: TRACKER_CATEGORIES.cat5,
  starttime: getDateTimeForPicker(),
  endtime: "",
  name: "",
});
