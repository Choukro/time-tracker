import * as React from "react";
import trackerReducer from "../_components/Trackers/trackers.reducer";
import {
  TRACKER_SET_TRACKER_ACTION,
  TRACKER_CREATE_ACTION,
  TRACKER_UPDATE_ACTION,
  TRACKER_DELETE_ACTION,
  TRACKER_FAIL_ACTION,
} from "../_components/Trackers/trackers.reducer";

const useEditTracker = (defaultTracker) => {
  const [trackersState, dispatchTrackersAction] = React.useReducer(
    trackerReducer,
    {
      tracker: defaultTracker,
      error: null,
      status: "idle",
    }
  );
  const { tracker, error, status } = trackersState;

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

  return {
    tracker,
    error,
    status,
    setTracker,
    createTracker,
    updateTracker,
    deleteTracker,
  };
};

export default useEditTracker;
