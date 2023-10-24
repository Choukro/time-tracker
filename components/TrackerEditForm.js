import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import { getDateTimeForPicker } from "../app/helper";
import "./styles/TrackerEditForm.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "new":
      return {
        status: "new",
        tracker: action.payload,
        activeButtons: { btnSave: true, btnUp: false, btnDel: false },
        activeInput: true,
        error: null,
      };
    case "edit":
      return {
        status: "edition",
        tracker: action.payload,
        activeButtons: { btnSave: false, btnUp: true, btnDel: true },
        activeInput: true,
        error: null,
      };
    case "save":
      return {
        ...state,
        status: "saved",
        activeButtons: { btnSave: false, btnUp: false, btnDel: false },
        activeInput: false,
        error: null,
      };
    case "update":
      return {
        ...state,
        status: "updated",
        activeButtons: { btnSave: false, btnUp: true, btnDel: true },
        activeInput: true,
        error: null,
      };
    case "delete":
      return {
        ...state,
        status: "deleted",
        tracker: action.payload,
        activeButtons: { btnSave: false, btnUp: false, btnDel: false },
        activeInput: false,
        error: null,
      };
    case "fail":
      return {
        status: "fail",
        tracker: null,
        activeButtons: { btnSave: true, btnUp: true, btnDel: true },
        activeInput: false,
        error: action.error,
      };
    case "trackerChange":
      return {
        ...state,
        tracker: action.payload,
        error: null,
      };
    default:
      throw new Error("Action non supporté");
  }
};

function useEditTracker(defaultTracker) {
  const [state, dispatch] = React.useReducer(reducer, {
    tracker: defaultTracker,
    error: null,
    status: "idle",
    activeInput: false,
    activeButtons: { btnSave: false, btnUp: false, btnDel: false },
  });
  const { tracker, error, status, activeButtons, activeInput } = state;

  const setTracker = (tracker) => {
    dispatch({
      type: "trackerChange",
      payload: tracker,
    });
  };
  const editTracker = (tracker) => {
    dispatch({
      type: "edit",
      payload: tracker,
    });
  };
  const saveTracker = () => {
    dispatch({ type: "save" });
  };
  const updateTracker = () => {
    dispatch({ type: "update" });
  };
  const deleteTracker = () => {
    dispatch({ type: "update" });
  };
  const newTracker = (tracker) => {
    dispatch({
      type: "new",
      payload: tracker,
    });
  };

  return {
    tracker,
    error,
    status,
    activeButtons,
    activeInput,
    setTracker,
    editTracker,
    saveTracker,
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
    saveTracker,
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
    saveTracker();
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
