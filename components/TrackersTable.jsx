import * as React from "react";
import { groupBy } from "../utils/trackers.util.js";
import { TrackerCategory } from "./TrackerCategory";
import { TrackerRow } from "./TrackerRow";

const TrackersTable = ({ trackers, selectedTracker, onSelectedTracker }) => {
  const rows = [];
  let lastCategory = "";

  const trackersParCategory = groupBy(trackers, "category");
  Object.keys(trackersParCategory).forEach((category) => {
    trackersParCategory[category].forEach((tracker) => {
      if (tracker.category !== lastCategory) {
        rows.push(
          <TrackerCategory
            key={category}
            category={tracker.category}
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
      lastCategory = tracker.category;
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
