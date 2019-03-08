import { dashboardTypes } from "./types";

export const loginActions = {
  updateDash: info => ({
    type: dashboardTypes.UPDATE_DASH,
    info
  })
};

export const dashboardActions = {};
