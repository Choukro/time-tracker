/* eslint-disable no-unused-vars */
import * as React from "react";
import { TrackersList } from "./TrackersList";
import { TrackersFollowUp } from "./TrackersFollowUp.jsx";
import db from "../data/data.js";
import {
  trackersFinished,
  trackersInProgress,
  hasEmptyPropertyExcludingKey,
  getTrackersFromLocalStorage,
} from "../utils/trackers.util.js";
import useLocalStorage from "@/hooks/useLocalStorage.js";

function TrackersApp() {
  const [allTrackers, setAllTrackers, sizeTrackers, isLoading] =
    useLocalStorage("trackers", db);
  const [, setFilterText] = React.useState("");
  const [searchBy, setSearchBy] = React.useState(false);
  const [selectedTrackers, setSelectedTrackers] = React.useState(allTrackers);

  const handleTextChange = (text) => {
    setFilterText(text);
    const filteredTracker = allTrackers.filter(
      (track) => track.name.toLowerCase().indexOf(text.toLowerCase()) !== -1
    );
    setSelectedTrackers(filteredTracker);
    setSearchBy(true);
  };

  const handleAllTrackers = () => {
    allTrackers.length < sizeTrackers
      ? setAllTrackers(getTrackersFromLocalStorage("trackers", db))
      : setSelectedTrackers(allTrackers);
  };

  const handleTrackersInProgress = () => {
    const trackersOngoing = trackersInProgress(allTrackers);
    setSelectedTrackers(trackersOngoing);
    setSearchBy(true);
  };

  const handleTrackersFinished = () => {
    const trackersCompleted = trackersFinished(allTrackers);
    setSelectedTrackers(trackersCompleted);
    setSearchBy(true);
  };

  const handleAddTracker = (tracker) => {
    if (hasEmptyPropertyExcludingKey(tracker, "endtime")) {
      return;
    }
    setAllTrackers([...allTrackers, tracker]);
    setSearchBy(false);
  };

  const handleDeleteTracker = (tracker) => {
    if (tracker.id === "") {
      // alert(
      //   "❌ Impossible de supprimer le tracker !\n\n💡 Essayez d'actualiser la page !"
      // );
      return;
    }
    setAllTrackers(allTrackers.filter((item) => item.id !== tracker.id));
    setSearchBy(false);
  };

  const handleUpdateTracker = (tracker) => {
    if (hasEmptyPropertyExcludingKey(tracker, "endtime")) {
      return;
    }
    let updatedList = allTrackers.map((item) =>
      item.id === tracker.id ? tracker : item
    );
    setAllTrackers(updatedList);
    setSearchBy(false);
  };

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      )}
      {!isLoading && (
        <div>
          <TrackersFollowUp
            trackers={searchBy ? selectedTrackers : allTrackers}
            trackersCount={sizeTrackers}
            onTextChange={handleTextChange}
            onAllTracker={handleAllTrackers}
            onTrackersInProgress={handleTrackersInProgress}
            onTrackersFinished={handleTrackersFinished}
            onAddTracker={handleAddTracker}
          />
          <TrackersList
            trackers={searchBy ? selectedTrackers : allTrackers}
            onUpdateTracker={handleUpdateTracker}
            onDeleteTracker={handleDeleteTracker}
          />
        </div>
      )}
    </>
  );
}
export { TrackersApp };
