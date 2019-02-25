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
export const HELP = "/help";
export const JUDGING_TOOL = "/judging";

export const FINDER = {
  "/": HOME,
  "/account": SIGNUP_LOGIN,
  "/application": APPLICATION,
  "/appreview": APP_REVIEW,
  "/checkin": ATTENDEE_LIST_VOLUNTEER,
  "/attendees": ATTENDEE_LIST_ORGANIZER,
  "/map": MAP,
  "/schedule": SCHEDULE,
  "/profile": PROFILE,
  "/help": HELP,
  "/judging": JUDGING_TOOL,
  "/404": PAGENOTFOUND
  // TODO: FINISH FILLING THIS IN
};
