import * as React from "react";
import {
  groupBy,
  getDateAsString,
  sortObjectKeysAscendingOrder,
  sortObjectKeysDescendingOrder,
} from "@/utils/trackers.util.js";
import { TrackerCategory } from "./TrackerCategory.jsx";
import { TrackerCard } from "./TrackerCard.jsx";
import { TRACKER_BY_DATE, TRACKER_BY_CATEGORY } from "./trackers.constants.js";
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
      <Card className="md:m-10 mt-5 bg-gradient-to-r from-custom1 to-custom2">
        <CardHeader className="flex sm:flex-row flex-col justify-center sm:gap-4">
          <CardTitle className="md:text-3xl text-2xl font-bold dark:text-white sm:py-8">
            Liste filtrée par
          </CardTitle>
          <div className="sm:!my-auto">
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
          <ul className="xl:w-[60%] lg:mx-auto flex flex-col gap-4">{rows}</ul>
        </CardContent>
      </Card>
      <Toaster />
    </>
  );
};

export { TrackersList };
