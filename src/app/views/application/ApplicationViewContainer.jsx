import React, { useContext, useEffect } from "react";
import { useDocument } from 'react-firebase-hooks/firestore';
import { compose } from "recompose";
import ApplicationViewComponent from './ApplicationViewComponent';
import { accessIfAuthenticated } from '../../../utils/siteAuth';
import SiteContext, { connectSiteContext } from "../../../utils/siteContext";

// The template for an application info, including options, etc.
const appTemplate = {};



// Fetches a hacker's application from Firestore.
// Returns a firebase.firestore.DocumentReference of the current user's
// application entry in the /applications Firestore collection.
const fetchApplication = firebase =>
  () => firebase.firestore.collection('applications').doc(firebase.auth.currentUser && firebase.auth.currentUser.uid);


// Updates a hacker's application with the new information they've provided.
const updateApplication = firebase => updatedAppInfo => {
  if(firebase.auth.currentUser) {
    firebase.firestore.collection('applications').doc(firebase.auth.currentUser.uid)
      .update(updatedAppInfo)
  }
}

// Submit a hacker's application. Non reversible.
const submitApplication = firebase => () => {
  if(firebase.auth.currentUser)
    firebase.firestore.collection('applications').doc(firebase.auth.currentUser.uid)
      .update({ submitted: true, submittedAt: firebase.firestore.Timestamp.fromDate(new Date()) })
}


const mapContextStateToProps = ({ state: { firebase } }) => ({
  fetchApp: fetchApplication(firebase),
  updateApp: updateApplication(firebase),
  submitApp: submitApplication(firebase),
});

const enhance = compose(
  accessIfAuthenticated,
  connectSiteContext(mapContextStateToProps),
);


const ApplicationViewContainer = ({
  fetchApp,
  updateApp,
  submitApp,
}) => {

  const { state, dispatch } = useContext(SiteContext);
  const { error, loading, value } = useDocument(fetchApp());

  const valueFetched = (error || loading || !value) ? "WAITING" : value.data();
  const curAppInfo = state.curAppInfo || valueFetched;

  console.log(valueFetched);

  const updateAppInState = updatedAppInfo => dispatch({ type: "UPDATE_HACKER_APPLICATION", data: updatedAppInfo })

  return (
    <ApplicationViewComponent updateApp={updateAppInState} curAppInfo={curAppInfo} appTemplate={appTemplate} />
  );
};


export default enhance(ApplicationViewContainer);
