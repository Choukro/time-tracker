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
} from "../utils/trackers.util.js";

function TrackersApp() {
  const [allTrackers, setAllTrackers] = React.useState(db);
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
    allTrackers.length < db.length
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
      alert("il manque le tracker id");
      return;
    }
    if (tracker.name === "") {
      alert("veuillez renseigner le nom du tracker");
      return;
    }
    if (tracker.starttime === "") {
      alert("veuillez renseigner la date de début");
      return;
    }
    if (tracker.category === "") {
      alert("veuillez renseigner la categorie");
      return;
    }
    setAllTrackers([...allTrackers, tracker]);
  };
  const handleDeleteTracker = (tracker) => {
    if (tracker.id === "") {
      alert("il manque le tracker id");
      return;
    }
    setAllTrackers(allTrackers.filter((item) => item.id !== tracker.id));
  };
  const handleUpdateTracker = (tracker) => {
    if (tracker.id === "") {
      alert("il manque le tracker id");
      return;
    }
    if (tracker.name === "") {
      alert("veuillez renseigner le nom du tracker");
      return;
    }
    if (tracker.starttime === "") {
      alert("veuillez renseigner la date de début");
      return;
    }
    if (tracker.category === "") {
      alert("veuillez renseigner la categorie");
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
        selectedTracker={selectedTracker}
        onSelectedTracker={setSelectedTracker}
      />
    </div>
  );
}
export { TrackersApp };
