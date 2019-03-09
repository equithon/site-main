import React, { useContext, useEffect, useRef, useState } from "react";
import { useDocument } from 'react-firebase-hooks/firestore';
import { compose } from "recompose";
import { accessIfRole } from '../../../utils/siteAuth';
import SiteContext, { connectSiteContext } from "../../../utils/siteContext";
import { withPageWrapper } from "../../shared/PageWrapper/PageWrapperComponent";

import RsvpViewComponent from './RsvpViewComponent';


// Fetches a hacker's RSVP from Firestore.
// Returns a firebase.firestore.DocumentReference of the current user's
// application entry in the /applications Firestore collection.
const fetchRsvp = firebase =>
  () => firebase.firestore.collection('rsvps').doc(firebase.auth.currentUser && firebase.auth.currentUser.uid);


const createRsvp = firebase =>
  () => firebase.firestore.collection('rsvps').doc(firebase.auth.currentUser && firebase.auth.currentUser.uid).set({ submitted: false });


// Updates a hacker's RSVP with the new information they've provided.
const updateRsvp = firebase => updatedRsvpInfo => {

  if(firebase.auth.currentUser && !updatedRsvpInfo.submitted && firebase.auth.currentUser.accepted)
    firebase.firestore.collection('rsvps').doc(firebase.auth.currentUser.uid)
      .update(updatedRsvpInfo);
}

// Submit a hacker's application. Non reversible.
const submitRsvp = firebase => updatedRsvpInfo => {
  if(firebase.auth.currentUser && firebase.auth.currentUser.accepted)
    firebase.firestore.collection('rsvps').doc(firebase.auth.currentUser.uid)
      .update({ ...updatedRsvpInfo, submitted: true, submittedAt: firebase.getTimestamp(new Date()) })
}


const mapContextStateToProps = ({ state: { firebase } }) => ({
  fetchRsvpFirestore: fetchRsvp(firebase),
  createRsvpFirestore: createRsvp(firebase),
  updateRsvpFirestore: updateRsvp(firebase),
  submitRsvpFirestore: submitRsvp(firebase),
});

const enhance = compose(
  accessIfRole("HACKER"),
  withPageWrapper({ title: "Application Status" }),
  connectSiteContext(mapContextStateToProps),
);



const RsvpViewContainer = ({
  curUser,
  fetchRsvpFirestore,
  createRsvpFirestore,
  updateRsvpFirestore,
  submitRsvpFirestore,
}) => {

  const { dispatch } = useContext(SiteContext);
  const { loading, error, value } = useDocument(fetchRsvpFirestore());
  const [ rsvpState, updateRsvpState ] = useState("FETCHING");
  const [ localRsvpInfo, updateLocalRsvpInfo ] = useState({ submitted: false });
  const rsvpRef = useRef();
  rsvpRef.current = localRsvpInfo;

  const updateRsvpInfo = newRsvpInfo => {
    const newLocalRsvpInfo = {
      ...localRsvpInfo,
      ...newRsvpInfo,
    };

    updateLocalRsvpInfo(newLocalRsvpInfo);
    if(!newLocalRsvpInfo.submitted) dispatch({ type: "UPDATE_DASHBOARD_TOAST", data: { toastName: "rsvpModified" } });
    // TODO add handler in dispatch
  }

  const submitRsvpInfo = () => {
    submitRsvpFirestore(rsvpRef.current);
    updateRsvpState("SUBMITTING");
    dispatch({ type: "UPDATE_DASHBOARD_TOAST", data: { toastName: "rsvpSubmitted" } });
    // TODO add handler in dispatch
  }

  console.log(loading, error, value, value && value.exists, rsvpState)

  if(value) {
    if(value.exists && ((rsvpState === "FETCHING") || (value.data().submitted && rsvpState === "SUBMITTING"))) {
      updateLocalRsvpInfo(value.data());
      updateRsvpState("FETCHED");
      console.log('fe', rsvpState)
      if(value.data().submitted) {
        updateRsvpState("SUBMITTED");
        dispatch({ type: "UPDATE_DASHBOARD_TOAST", data: { toastName: "rsvpSubmitted" } });
      }
    } else if(!value.exists && (rsvpState === "FETCHING")) {
      console.log('creating')
      createRsvpFirestore();
      updateRsvpState("FETCHED");
    }
  }


  // save to firestore before component unmounts or page unloads
  useEffect(() => {
    window.addEventListener('beforeunload', () => updateRsvpFirestore(rsvpRef.current));
    dispatch({ type: "UPDATE_TITLE", data: { title: "Application Status" }});

    return () => {
      window.removeEventListener('beforeunload', () => updateRsvpFirestore(rsvpRef.current))
      updateRsvpFirestore(rsvpRef.current);
    }
  }, [])


  return (
      <RsvpViewComponent
        curUser={curUser}
        updateRsvpInfo={updateRsvpInfo}
        submitRsvpInfo={submitRsvpInfo}
        rsvpState={rsvpState}
        curRsvpInfo={localRsvpInfo}
      />
  );
};


export default enhance(RsvpViewContainer);
