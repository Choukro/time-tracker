/**
 * groupe en fonction d'une proprieté par
 * exemple si on veut grouper par category
 * groupBy(array,'category')
 *
 * [{name: "PH", category:"sport"},
 * {name: "PH", category:"sport"},
 * {name: "PH", category:"perso"}]
 * donnera
 * {
 *  'sport':[...],
 *  'perso':[...]
 * }
 * @param {*} tableauObjets
 * @param {*} propriete
 * @returns
 */
export function groupBy(tableauObjets, propriete) {
  return tableauObjets.reduce(function (acc, obj) {
    var cle = obj[propriete];
    if (!acc[cle]) {
      acc[cle] = [];
    }
    acc[cle].push(obj);
    return acc;
  }, {});
}

/**
 * Trie par ordre décroissant les objets d'un tableau
 *
 * @param {*} tableauObjets
 * @returns
 */
export function sortObjectKeysDescendingOrder(tableauObjets) {
  const sortedKeys = Object.keys(tableauObjets).sort().reverse();
  const sortedObj = {};
  sortedKeys.forEach((key) => {
    sortedObj[key] = tableauObjets[key];
  });
  return sortedObj;
}

/**
 * Trie par ordre croissant les objets d'un tableau
 *
 * @param {*} tableauObjets
 * @returns
 */
export function sortObjectKeysAscendingOrder(tableauObjets) {
  const sortedKeys = Object.keys(tableauObjets).sort();
  const sortedObj = {};
  sortedKeys.forEach((key) => {
    sortedObj[key] = tableauObjets[key];
  });
  return sortedObj;
}

/**
 * Difference entre 2 dates :
 * 1 : date de depart et date de fin (date de fin peut etre undefined = now)
 * 2 : calcul delta diff /1000 pour avoir en seconde
 * 3 : calcul nb days : delta/ 86400 : nombre de seconde / 86400 (seconde dans days) pour avoir le nombre de days
 * 4 : calcul nb heures  :delta / 3600 : nombre de seconde restante / 3600 polur avoir le nombre d'heures restante
 * 5 : calcul nb minutes  :delta / 60 : nombre de seconde restant / 60 pour avoir les minutes
 * 6 : calcul nb sec  :delta / 60 : nombre de seconde restant / 60 pour avoir les minutes
 * @param string (date de début, date de fin)
 * @returns Durée au format days : hours : minutes : seconds
 */
export const diffTime = (start, end) => {
  start = new Date(start);
  end = end ? new Date(end) : new Date();

  let durationStr = "";

  var delta = Math.abs(start - end) / 1000;

  // calculate (and subtract) whole days
  var days = Math.floor(delta / 86400);
  delta -= days * 86400;

  if (days > 0) {
    durationStr = days + " j ";
  }
  // calculate (and subtract) whole hours
  var hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  if (hours > 0) {
    durationStr = durationStr + hours + " h ";
  }
  // calculate (and subtract) whole minutes
  var minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;
  if (minutes > 0) {
    durationStr = durationStr + minutes + " min ";
  }
  // what's left is seconds
  var seconds = Math.floor(delta % 60);
  if (seconds > 0) {
    durationStr = durationStr + seconds + " sec ";
  }

  return durationStr;
};

/**
 * @param string (date)
 * @returns date au format ISO 8601 incluant timezone offset - 6 derniers caracteres supprimés
 */
const toISOStringWithTimezone = (date) => {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? "+" : "-";
  const pad = (n) => `${Math.floor(Math.abs(n))}`.padStart(2, "0");
  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes()) +
    ":" +
    pad(date.getSeconds()) +
    diff +
    pad(tzOffset / 60) +
    ":" +
    pad(tzOffset % 60)
  );
};
export const getDateTimeForPicker = (date = new Date()) => {
  const dateIso = toISOStringWithTimezone(date);
  return dateIso.substring(0, dateIso.length - 6);
};

/**
 * @param string (date au format ISO 8601)
 * @returns heure au format hh:mm
 */
export const getHourAsString = (date) => {
  const newDate = new Date(date);
  return newDate.toLocaleString().substring(11, date.length);
};

/**
 * @param string (date au format ISO 8601)
 * @returns Affiche "Aujourd'hui" si la date est la même que la date actuelle, "Hier" si la date est différente d'un jour par rapport à la date actuelle, sinon date au format jour mois aaaa
 */
export const getDateAsString = (date) => {
  const formattedDate = new Date(date);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (formattedDate.toDateString() === today.toDateString()) {
    return "Aujourd'hui";
  } else if (formattedDate.toDateString() === yesterday.toDateString()) {
    return "Hier";
  } else {
    return formattedDate.toLocaleString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
};