"use client";

/* eslint-disable no-unused-vars */
import * as React from "react";
import { TrackersList } from "./TrackersList";
import { TrackerEditForm } from "./TrackerEditForm";
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
  const [filterText, setFilterText] = React.useState("");
  const [searchBy, setSearchBy] = React.useState(false);
  const [selectedTrackers, setSelectedTrackers] = React.useState(allTrackers);
  const [selectedTracker, setSelectedTracker] = React.useState();

  const handleTextChange = (text) => {
    setFilterText(text);
    const filteredTracker = allTrackers.filter(
      (track) => track.name.toLowerCase().indexOf(text) !== -1
    );
    setSelectedTrackers(filteredTracker);
    setSearchBy(true);
  };

  const handleAllTrackers = () => {
    allTrackers.length < trackersCount
      ? setAllTrackers(getTrackersFromLocalStorage())
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
    if (tracker.id === "") {
      alert(
        "❌ Impossible d'ajouter ce nouveau tracker!\n\n💡 Essayez d'actualisez la page !"
      );
      return;
    }
    if (tracker.name === "") {
      alert("📝 Veuillez renseigner le nom du tracker");
      return;
    }
    if (tracker.starttime === "") {
      alert("📅 Veuillez renseigner la date de début");
      return;
    }
    if (tracker.category === "") {
      alert("📑 Veuillez renseigner la catégorie");
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
      />
      <TrackerEditForm
        selectedTracker={selectedTracker}
        onAddTracker={handleAddTracker}
        onUpdateTracker={handleUpdateTracker}
        onDeleteTracker={handleDeleteTracker}
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
