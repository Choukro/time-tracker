import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import { getDateTimeForPicker } from "../utils/trackers.util.js";
import "./styles/TrackerEditForm.css";
import trackerReducer from "./trackers/trackers.reducer.js";
import {
  TRACKER_SET_TRACKER_ACTION,
  TRACKER_NEW_ACTION,
  TRACKER_EDIT_ACTION,
  TRACKER_CREATE_ACTION,
  TRACKER_UPDATE_ACTION,
  TRACKER_DELETE_ACTION,
  TRACKER_FAIL_ACTION,
} from "./trackers/trackers.reducer.js";

function useEditTracker(defaultTracker) {
  const [trackersState, dispatchTrackersAction] = React.useReducer(
    trackerReducer,
    {
      tracker: defaultTracker,
      error: null,
      status: "idle",
      activeInput: false,
      activeButtons: { btnSave: false, btnUp: false, btnDel: false },
    }
  );
  const { tracker, error, status, activeButtons, activeInput } = trackersState;

  const setTracker = (tracker) => {
    try {
      dispatchTrackersAction({
        type: TRACKER_SET_TRACKER_ACTION,
        payload: tracker,
      });
    } catch (error) {
      dispatchTrackersAction({
        type: TRACKER_FAIL_ACTION,
        payload: error.message,
      });
    }
  };

  const editTracker = (tracker) => {
    try {
      dispatchTrackersAction({
        type: TRACKER_EDIT_ACTION,
        payload: tracker,
      });
    } catch (error) {
      dispatchTrackersAction({
        type: TRACKER_FAIL_ACTION,
        payload: error.message,
      });
    }
  };

  const createTracker = () => {
    try {
      dispatchTrackersAction({ type: TRACKER_CREATE_ACTION });
    } catch (error) {
      dispatchTrackersAction({
        type: TRACKER_FAIL_ACTION,
        payload: error.message,
      });
    }
  };

  const updateTracker = () => {
    try {
      dispatchTrackersAction({ type: TRACKER_UPDATE_ACTION });
    } catch (error) {
      dispatchTrackersAction({
        type: TRACKER_FAIL_ACTION,
        payload: error.message,
      });
    }
  };

  const deleteTracker = () => {
    try {
      dispatchTrackersAction({ type: TRACKER_DELETE_ACTION, payload: tracker });
    } catch (error) {
      dispatchTrackersAction({
        type: TRACKER_FAIL_ACTION,
        payload: error.message,
      });
    }
  };

  const newTracker = (tracker) => {
    try {
      dispatchTrackersAction({
        type: TRACKER_NEW_ACTION,
        payload: tracker,
      });
    } catch (error) {
      dispatchTrackersAction({
        type: TRACKER_FAIL_ACTION,
        payload: error.message,
      });
    }
  };

  return {
    tracker,
    error,
    status,
    activeButtons,
    activeInput,
    setTracker,
    editTracker,
    createTracker,
    updateTracker,
    deleteTracker,
    newTracker,
  };
}

const newDefaultTracker = () => ({
  id: uuidv4(),
  category: "Défaut",
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
              <option value="Sport">Sport</option>
              <option value="Code">Code</option>
              <option value="Perso">Perso</option>
              <option value="Défaut">Défaut</option>
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
