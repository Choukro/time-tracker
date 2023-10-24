export const TRACKER_SET_TRACKER_ACTION = "tracker/setTracker";
export const TRACKER_NEW_ACTION = "tracker/new";
export const TRACKER_EDIT_ACTION = "tracker/edit";
export const TRACKER_CREATE_ACTION = "tracker/create";
export const TRACKER_UPDATE_ACTION = "tracker/update";
export const TRACKER_DELETE_ACTION = "tracker/delete";
export const TRACKER_FAIL_ACTION = "tracker/fail";

const trackerReducer = (state, action) => {
  switch (action.type) {
    case "tracker/setTracker":
      return {
        ...state,
        tracker: action.payload,
        error: null,
      };
    case "tracker/new":
      return {
        status: "new",
        tracker: action.payload,
        activeButtons: { btnSave: true, btnUp: false, btnDel: false },
        activeInput: true,
        error: null,
      };
    case "tracker/edit":
      return {
        status: "edition",
        tracker: action.payload,
        activeButtons: { btnSave: false, btnUp: true, btnDel: true },
        activeInput: true,
        error: null,
      };
    case "tracker/create":
      return {
        ...state,
        status: "created",
        activeButtons: { btnSave: false, btnUp: false, btnDel: false },
        activeInput: false,
        error: null,
      };
    case "tracker/update":
      return {
        ...state,
        status: "updated",
        activeButtons: { btnSave: false, btnUp: true, btnDel: true },
        activeInput: true,
        error: null,
      };
    case "tracker/delete":
      return {
        ...state,
        status: "deleted",
        tracker: action.payload,
        activeButtons: { btnSave: false, btnUp: false, btnDel: false },
        activeInput: false,
        error: null,
      };
    case "tracker/fail":
      return {
        status: "fail",
        tracker: null,
        activeButtons: { btnSave: true, btnUp: true, btnDel: true },
        activeInput: false,
        error: action.error,
      };
    default:
      throw new Error("Action non supportée");
  }
};

export default trackerReducer;
