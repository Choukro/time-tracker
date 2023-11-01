import * as React from "react";
import {
  groupBy,
  getDateAsString,
  sortObjectKeysAscendingOrder,
  sortObjectKeysDescendingOrder,
} from "../utils/trackers.util.js";
import { TrackerCategory } from "./TrackerCategory";
import { TrackerCard } from "./TrackerCard";
import {
  TRACKER_BY_DATE,
  TRACKER_BY_CATEGORY,
} from "./trackers/trackers.constants.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Toaster } from "@/components/ui/toaster";

const TrackersList = ({ trackers, onUpdateTracker, onDeleteTracker }) => {
  const rows = [];
  let lastFilter = "";
  const [trackersFilter, setTrackersFilter] = React.useState(TRACKER_BY_DATE);

  const handleFilterByDate = () => {
    setTrackersFilter(TRACKER_BY_DATE);
  };

  const handleFilterByCategory = () => {
    setTrackersFilter(TRACKER_BY_CATEGORY);
  };

  const trackersByField = groupBy(trackers, trackersFilter);
  const sortedTrackersByField =
    trackersFilter === TRACKER_BY_DATE
      ? sortObjectKeysDescendingOrder(trackersByField)
      : sortObjectKeysAscendingOrder(trackersByField);
  Object.keys(sortedTrackersByField).forEach((field) => {
    sortedTrackersByField[field].forEach((tracker) => {
      if (
        (trackersFilter === TRACKER_BY_DATE
          ? tracker[trackersFilter].substring(0, 10)
          : tracker[trackersFilter]) !== lastFilter
      ) {
        rows.push(
          <TrackerCategory
            key={field}
            field={
              trackersFilter === TRACKER_BY_DATE
                ? getDateAsString(tracker[trackersFilter])
                : tracker[trackersFilter]
            }
          ></TrackerCategory>
        );
      }

      rows.push(
        <TrackerCard
          key={tracker.id}
          tracker={tracker}
          onUpdateTracker={onUpdateTracker}
          onDeleteTracker={onDeleteTracker}
        ></TrackerCard>
      );
      lastFilter =
        trackersFilter === TRACKER_BY_DATE
          ? tracker[trackersFilter].substring(0, 10)
          : tracker[trackersFilter];
    });
  });

  return (
    <>
      <Card className="m-10 bg-gradient-to-r from-[#c084fc99] to-[#f472b699]">
        <CardHeader className="flex flex-col">
          <CardTitle className="text-3xl font-bold dark:text-white py-4">
            Liste filtrée par
          </CardTitle>
          <div className="mx-auto">
            <RadioGroup defaultValue="date">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="date"
                  id="date"
                  onClick={handleFilterByDate}
                />
                <Label htmlFor="date">Date</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="catégorie"
                  id="categorie"
                  onClick={handleFilterByCategory}
                />
                <Label htmlFor="categorie">Catégorie</Label>
              </div>
            </RadioGroup>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-4">{rows}</ul>
        </CardContent>
      </Card>
      <Toaster />
    </>
  );
};

export { TrackersList };
