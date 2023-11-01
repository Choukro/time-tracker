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
} from "../utils/trackers.util.js";

function TrackersApp() {
  const [allTrackers, setAllTrackers] = React.useState(db);
  const [trackersCount, setTrackersCount] = React.useState(db.length);
  const [filterText, setFilterText] = React.useState("");
  const [selectedTracker, setSelectedTracker] = React.useState();

  const handleTextChange = (text) => {
    setFilterText(text);
    const filteredTracker = db.filter(
      (track) => track.name.toLowerCase().indexOf(text) !== -1
    );
    setAllTrackers(filteredTracker);
  };

  const handleAllTrackers = () => {
    allTrackers.length < trackersCount
      ? setAllTrackers(db)
      : setAllTrackers(allTrackers);
  };

  const handleTrackersInProgress = () => {
    const trackersOngoing = trackersInProgress(allTrackers);
    setAllTrackers(trackersOngoing);
  };

  const handleTrackersFinished = () => {
    const trackersCompleted = trackersFinished(allTrackers);
    setAllTrackers(trackersCompleted);
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
  };

  const handleUpdateTracker = (tracker) => {
    if (hasEmptyPropertyExcludingKey(tracker, "endtime")) {
      return;
    }
    let updatedList = allTrackers.map((item) =>
      item.id === tracker.id ? tracker : item
    );
    setAllTrackers(updatedList);
  };

  return (
    <div>
      <TrackersFollowUp
        trackers={allTrackers}
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
        trackers={allTrackers}
        onUpdateTracker={handleUpdateTracker}
        onDeleteTracker={handleDeleteTracker}
      />
    </div>
  );
}
export { TrackersApp };
