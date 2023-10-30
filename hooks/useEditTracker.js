import * as React from "react";
import trackerReducer from "../components/trackers/trackers.reducer";
import {
  TRACKER_SET_TRACKER_ACTION,
  TRACKER_NEW_ACTION,
  TRACKER_EDIT_ACTION,
  TRACKER_CREATE_ACTION,
  TRACKER_UPDATE_ACTION,
  TRACKER_DELETE_ACTION,
  TRACKER_FAIL_ACTION,
} from "../components/trackers/trackers.reducer";

const useEditTracker = (defaultTracker) => {
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
};

export default useEditTracker;
