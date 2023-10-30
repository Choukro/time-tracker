import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import { getDateTimeForPicker } from "../utils/trackers.util.js";
import "./styles/TrackerEditForm.css";
import {
  TRACKER_CATEGORY_1,
  TRACKER_CATEGORY_2,
  TRACKER_CATEGORY_3,
  TRACKER_CATEGORY_4,
  TRACKER_CATEGORY_5,
} from "./trackers/trackers.constants.js";
import useEditTracker from "../hooks/useEditTracker.js";

const newDefaultTracker = () => ({
  id: uuidv4(),
  category: TRACKER_CATEGORY_5,
  starttime: getDateTimeForPicker(),
  endtime: "",
  name: "",
});

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
              <option value={TRACKER_CATEGORY_1}>{TRACKER_CATEGORY_1}</option>
              <option value={TRACKER_CATEGORY_2}>{TRACKER_CATEGORY_2}</option>
              <option value={TRACKER_CATEGORY_3}>{TRACKER_CATEGORY_3}</option>
              <option value={TRACKER_CATEGORY_4}>{TRACKER_CATEGORY_4}</option>
              <option value={TRACKER_CATEGORY_5}>{TRACKER_CATEGORY_5}</option>
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
