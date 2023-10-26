import * as React from "react";
import {
  groupBy,
  getDateAsString,
  sortObjectKeysAscendingOrder,
  sortObjectKeysDescendingOrder,
} from "../utils/trackers.util.js";
import { TrackerCategory } from "./TrackerCategory";
import { TrackerRow } from "./TrackerRow";

const TrackersTable = ({ trackers, selectedTracker, onSelectedTracker }) => {
  const rows = [];
  let lastField = "";
  let fieldSelected = "starttime";
  const trackersByField = groupBy(trackers, fieldSelected);
  const sortedTrackersByField =
    fieldSelected === "starttime"
      ? sortObjectKeysDescendingOrder(trackersByField)
      : sortObjectKeysAscendingOrder(trackersByField);
  Object.keys(sortedTrackersByField).forEach((field) => {
    sortedTrackersByField[field].forEach((tracker) => {
      if (tracker[fieldSelected] !== lastField) {
        rows.push(
          <TrackerCategory
            key={field}
            field={
              fieldSelected === "starttime"
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
      lastField = tracker[fieldSelected];
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
