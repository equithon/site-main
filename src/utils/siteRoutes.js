export const HOME = "/";
export const SIGNUP_LOGIN = "/account";
export const APPLICATION = "/application";
export const APP_REVIEW = "/appreview";
export const ATTENDEE_LIST_VOLUNTEER = {
  pathname: "/attendees",
  state: { as: "VOLUNTEER" }
};
export const ATTENDEE_LIST_ORGANIZER = {
  pathname: "/attendees",
  state: { as: "ORGANIZER" }
};
export const MAP = "/map";
export const SCHEDULE = "/schedule";
export const PROFILE = {
  pathname: "/profile",
  state: { modal: true, onTopOf: "/" }
};
export const EVENT = "/schedule/:eventId";
export const PAGENOTFOUND = "/404";
