import * as React from "react";
import {
  groupBy,
  getDateAsString,
  sortObjectKeysAscendingOrder,
  sortObjectKeysDescendingOrder,
} from "../utils/trackers.util.js";
import { TrackerCategory } from "./TrackerCategory";
import { TrackerRow } from "./TrackerRow";
import {
  TRACKER_CATEGORY,
  TRACKER_START_TIME,
} from "./trackers/trackers.constants.js";

const TrackersTable = ({ trackers, selectedTracker, onSelectedTracker }) => {
  const rows = [];
  let lastField = "";
  let fieldSelected = TRACKER_CATEGORY; // TRACKER_START_TIME || TRACKER_CATEGORY

  const trackersByField = groupBy(trackers, fieldSelected);
  const sortedTrackersByField =
    fieldSelected === TRACKER_START_TIME
      ? sortObjectKeysDescendingOrder(trackersByField)
      : sortObjectKeysAscendingOrder(trackersByField);
  Object.keys(sortedTrackersByField).forEach((field) => {
    sortedTrackersByField[field].forEach((tracker) => {
      if (
        (fieldSelected === TRACKER_START_TIME
          ? tracker[fieldSelected].substring(0, 10)
          : tracker[fieldSelected]) !== lastField
      ) {
        rows.push(
          <TrackerCategory
            key={field}
            field={
              fieldSelected === TRACKER_START_TIME
                ? getDateAsString(tracker[fieldSelected])
                : tracker[fieldSelected]
            }
          ></TrackerCategory>
        );
      }

      rows.push(
        <TrackerRow
          key={tracker.id}
          tracker={tracker}
          selectedId={selectedTracker?.id}
          onSelected={onSelectedTracker}
        ></TrackerRow>
      );
      lastField =
        fieldSelected === TRACKER_START_TIME
          ? tracker[fieldSelected].substring(0, 10)
          : tracker[fieldSelected];
    });
  });

  return (
    <>
      <h3 className="text-3xl font-bold dark:text-white py-4">
        Liste des Trackers
      </h3>
      <div>
        <ul className="flex flex-col gap-2">{rows}</ul>
      </div>
    </>
  );
};

export { TrackersTable };
