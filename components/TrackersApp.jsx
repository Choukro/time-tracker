"use client";

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
  const [allTrackers, setAllTrackers] = useLocalStorage("trackers", db);
  const [trackersCount, setTrackersCount] = React.useState(allTrackers.length);
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
    allTrackers.length < trackersCount
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
    setTrackersCount(trackersCount + 1);
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
    setTrackersCount(trackersCount - 1);
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
    <div>
      <TrackersFollowUp
        trackers={searchBy ? selectedTrackers : allTrackers}
        trackersCount={trackersCount}
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
  );
}
export { TrackersApp };
