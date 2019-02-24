import React, { useContext, useEffect } from "react";
import { useCollection } from 'react-firebase-hooks/firestore';
import { compose } from "recompose";
import AppReviewViewComponent from './AppReviewViewComponent';
import { accessIfOrganizer } from '../../../utils/siteAuth';
import SiteContext, { connectSiteContext } from "../../../utils/siteContext";


// Fetches a random hacker's application that needs review from Firestore.
// Returns a firebase.firestore.DocumentReference to an entry in the /applications
// Firestore collection.
const fetchAppsNeedingReview = firebase =>
  firebase.firestore.collection('appplications')
    .where("submitted", "==", true)
    .where("reviewCount", "<", 2);


// Updates the review of a hacker's application with the new review scores.
const updateReviewOfApplication = firebase => updatedReview => {}


// Submit a review of a hacker's application, making sure to update
// reviewCount as needed.
const submitReviewOfApplication = firebase => () => {};


const mapContextStateToProps = ({ state: { firebase } }) => ({
  appsNeedingReview: fetchAppsNeedingReview(firebase),
  updateReviewOfApp: updateReviewOfApplication(firebase),
  submitReviewOfApp: submitReviewOfApplication(firebase),
});

const enhance = compose(
  accessIfOrganizer,
  connectSiteContext(mapContextStateToProps),
);


const AppReviewViewContainer = ({
  appsNeedingReview,
  updateReviewOfApp,
  submitReviewOfApp,
}) => {

  const { state, dispatch } = useContext(SiteContext);
  const { error, loading, value } = useCollection(appsNeedingReview);

  const valueFetched = (error || loading || !value) ? "WAITING" : value.data();
  let curAppReview = (state.curAppReview && state.curAppReview !== "SUBMITTED") ? state.curAppReview : valueFetched;

  console.log(valueFetched);

  const updateReviewInState = updatedReview => dispatch({ type: "UPDATE_APP_REVIEW", data: updatedReview });
  const submitReviewInState = () => {
    dispatch({ type: "SUBMIT_APP_REVIEW" });
    submitReviewOfApp();
    curAppReview = valueFetched;
  }


  return (
    <AppReviewViewComponent updateReview={updateReviewInState} submitReview={submitReviewInState} curAppReview={curAppReview} />
  );
};


export default enhance(AppReviewViewContainer);
