export const TRACKER_SET_TRACKER_ACTION = "tracker/setTracker";
export const TRACKER_CREATE_ACTION = "tracker/create";
export const TRACKER_UPDATE_ACTION = "tracker/update";
export const TRACKER_DELETE_ACTION = "tracker/delete";
export const TRACKER_FAIL_ACTION = "tracker/fail";

const trackerReducer = (state, action) => {
  switch (action.type) {
    case TRACKER_SET_TRACKER_ACTION:
      return {
        ...state,
        tracker: action.payload,
        error: null,
      };
    case TRACKER_CREATE_ACTION:
      return {
        ...state,
        status: "created",
        error: null,
      };
    case TRACKER_UPDATE_ACTION:
      return {
        ...state,
        status: "updated",
        error: null,
      };
    case TRACKER_DELETE_ACTION:
      return {
        ...state,
        status: "deleted",
        tracker: action.payload,
        error: null,
      };
    case TRACKER_FAIL_ACTION:
      return {
        ...state,
        status: "fail",
        error: action.payload,
      };
    default:
      throw new Error("Action non supportée");
  }
};

export default trackerReducer;
