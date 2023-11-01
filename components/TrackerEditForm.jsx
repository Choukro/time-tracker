import * as React from "react";
import "./styles/TrackerEditForm.css";
import { TRACKER_CATEGORIES } from "./trackers/trackers.constants.js";
import useEditTracker from "../hooks/useEditTracker.js";
import { newDefaultTracker } from "../components/trackers/trackers.constants.js";

const TrackerEditForm = ({
  selectedTracker = { ...newDefaultTracker(), id: "" },
  onAddTracker,
  onDeleteTracker,
  onUpdateTracker,
}) => {
  const {
    tracker,
    activeButtons,
    activeInput,
    setTracker,
    editTracker,
    createTracker,
    updateTracker,
    deleteTracker,
    newTracker,
  } = useEditTracker(selectedTracker);

  const handleTrackerName = (e) => {
    setTracker({ ...tracker, name: e.target.value });
  };

  const handleTrackerStartTime = (e) => {
    setTracker({ ...tracker, starttime: e.target.value });
  };

  const handleTrackerEndTime = (e) => {
    setTracker({ ...tracker, endtime: e.target.value });
  };

  const handleTrackerCategory = (e) => {
    setTracker({ ...tracker, category: e.target.value });
  };

  React.useEffect(() => {
    if (selectedTracker?.id !== "") {
      editTracker(selectedTracker);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTracker]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    onAddTracker(tracker);
    createTracker();
  };

  const handleUpdateTracker = () => {
    onUpdateTracker(tracker);
    updateTracker();
  };

  const handleDeleteTracker = () => {
    onDeleteTracker(tracker);
    deleteTracker(newDefaultTracker());
  };

  const handleNewTracker = () => {
    newTracker(newDefaultTracker());
  };

  return (
    <>
      <form className="Form" onSubmit={handleOnSubmit}>
        <fieldset>
          <legend>Gestion des Trackers</legend>
          <label htmlFor="trackerName">Nom du tracker : </label>
          <input
            disabled={!activeInput}
            type="text"
            id="trackerName"
            placeholder="tracker name..."
            onChange={handleTrackerName}
            value={tracker.name}
          ></input>

          <label htmlFor="trackerDateStart">Date de début : </label>
          <input
            disabled={!activeInput}
            id="trackerDateStart"
            type="datetime-local"
            placeholder="durée..."
            onChange={handleTrackerStartTime}
            value={tracker.starttime}
            step="2"
          ></input>

          <label htmlFor="trackerDateEnd">Date de fin : </label>

          <input
            disabled={!activeInput}
            id="trackerDateEnd"
            type="datetime-local"
            placeholder="durée..."
            onChange={handleTrackerEndTime}
            value={tracker.endtime}
            step="2"
          ></input>

          <label>
            Categorie:
            <select
              disabled={!activeInput}
              value={tracker.category}
              onChange={handleTrackerCategory}
            >
              <option value={TRACKER_CATEGORIES.cat1}>
                {TRACKER_CATEGORIES.cat1}
              </option>
              <option value={TRACKER_CATEGORIES.cat2}>
                {TRACKER_CATEGORIES.cat2}
              </option>
              <option value={TRACKER_CATEGORIES.cat3}>
                {TRACKER_CATEGORIES.cat3}
              </option>
              <option value={TRACKER_CATEGORIES.cat4}>
                {TRACKER_CATEGORIES.cat4}
              </option>
              <option value={TRACKER_CATEGORIES.cat5}>
                {TRACKER_CATEGORIES.cat5}
              </option>
            </select>
          </label>

          <label>Actions</label>
          <div className="Action">
            <input
              type="button"
              value="Nouveau Tracker"
              onClick={handleNewTracker}
            ></input>
            <input
              disabled={!activeButtons.btnSave}
              type="submit"
              value="Ajouter"
            ></input>
            <input
              disabled={!activeButtons.btnDel}
              type="button"
              value="Supprimer"
              onClick={handleDeleteTracker}
            ></input>
            <input
              disabled={!activeButtons.btnUp}
              type="button"
              value="Mettre à jour"
              onClick={handleUpdateTracker}
            ></input>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export { TrackerEditForm };
