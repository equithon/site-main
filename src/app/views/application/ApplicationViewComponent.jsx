import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { debounce } from "debounce";
import { mediaSize } from "../../../utils/siteTools";

import LoadingSpinner from "../../../static/img/loaders/default_color_secondary.svg";
import PageWrapper from "../../shared/PageWrapper/PageWrapperComponent";
import TextInput from "../../shared/TextInput/TextInputComponent";
import TextArea from "../../shared/TextArea/TextAreaComponent";
import SelectDropdown from "../../shared/SelectDropdown/SelectDropdownComponent";
import Button from "../../shared/Button/ButtonComponent";
import Text from "../../shared/Text/TextComponent";

// The template for an application info, including options, etc.
const appTemplate = [
  {
    label: "What are you pursuing?",
    type: "select",
    question: {
      id: "studyType",
      type: "option",
      placeholder: "Bachelor's",
      options: [
        { label: "High School Diploma", value: "highschool" },
        { label: "Bachelor's", value: "undergrad" },
        { label: "Master's", value: "masters" },
        { label: "PhD", value: "phd" },
      ]
    }
  },
  {
    label: "What are you studying?",
    type: "select",
    question: {
      id: "studyProgram",
      type: "option",
      placeholder: "Underwater Basket Weaving",
      options: [
        { label: "Engineering", value: "engineering" },
        { label: "Computer Science", value: "cs" },
        { label: "Math", value: "math" },
        { label: "Literature", value: "literature" },
      ]
    },
  },
  {
    label: "When are you graduating?",
    type: "text",
    question: {
      id: "studyGradYear",
      type: "number",
      placeholder: "2021"
    },
  },
  {
    label: "Where are you travelling from?",
    type: "text",
    question: {
      id: "travellingFrom",
      type: "text",
      placeholder: "Mars"
    },
  },
  {
    label: "What is your coding experience?",
    type: "select",
    question: {
      id: "technicalExperience",
      type: "option",
      placeholder: "Looking to learn!",
      options: [
        { label: "None, but looking to learn!", value: "little" },
        { label: "Some", value: "some" },
        { label: "Lots", value: "lots" },
        { label: "Code Wizard", value: "expert" },
      ]
    },
  },
  {
    label: "Any topics you're interested in?",
    type: "select",
    question: {
      id: "interestedTopics",
      type: "option",
      placeholder: "Looking to learn!",
      options: [
        { label: "None, but looking to learn!", value: "little" },
        { label: "Some", value: "some" },
        { label: "Lots", value: "lots" },
        { label: "Code Wizard", value: "expert" },
      ]
    },
  },
  {
    label: "Any categories you're interested in?",
    type: "select",
    question: {
      id: "interestedCategories",
      type: "option",
      placeholder: "Looking to learn!",
      options: [
        { label: "None, but looking to learn!", value: "little" },
        { label: "Some", value: "some" },
        { label: "Lots", value: "lots" },
        { label: "Code Wizard", value: "expert" },
      ]
    },
  },
  {
    label: "Are there any links that you want us to check out?",
    type: "text",
    question: {
      id: "externalLink",
      type: "url",
      placeholder: "Portfolio, previous work, Github, LinkedIn, etc."
    },
  },
  {
    label: "What is a social equity issue that you are interest in learning more about, and why?",
    type: "textLong",
    question: {
      id: "responseSocialEquity",
      type: "textArea",
      placeholder: "A paragraph or two is fine!"
    },
  },
  {
    label: "What is an achievement that you are proud of?",
    type: "textLong",
    question: {
      id: "responsePersonal",
      type: "textArea",
      placeholder: "A paragraph or two is fine!"
    },
  },
  {
    label: "What is your favourite smell?",
    type: "text",
    question: {
      id: "responseBonus",
      type: "text",
      placeholder: "Be creative!"
    },
  },
];



const Container = styled.div`
  width: 50vw;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${mediaSize.tablet`
    width: 100%;
  `}
`;

const Question = styled.div`
  margin-bottom: 1em;
`;

const QuestionLabel = styled(Text)`
  margin-bottom: 10px;
`;

const Loading = styled.div`
  width: 100%;
  height: 10vh;
  // prevent from collapsing when there's no content during loading
  &:empty:after {
    content: "&nbsp;";
    visibility: hidden;
  }

  background: center / contain no-repeat url(${LoadingSpinner});
  opacity: 0.75;
`;

const Submit = styled.div`

`;

const SubmitButton = styled(Button)`
  width: 10em;
  margin: 1em 1em 1em 0;

  display: inline-block;

  // prevent button from collapsing when there's no content during loading
  &:empty:after {
    content: "&nbsp;";
    visibility: hidden;
  }

  &:disabled {
    background: ${props =>
      `${
        props.theme.colors.secondary
      } center / contain no-repeat url(${LoadingSpinner})`};
    opacity: 0.75;
  }

  ${mediaSize.phone`
    width: 100%;
  `}
`;



const renderQuestion = ({ label, type, question }, defaultValue, saveResponseField, appSubmitted) => {
  let QuestionComponent;
  switch(type) {
    case "text":
      QuestionComponent = <TextInput placeholder={question.placeholder} name={question.id} type={question.type} defaultValue={defaultValue} disabled={appSubmitted} onChangeHandler={value => saveResponseField(question.id, value)} />;
      break;

    case "textLong":
      QuestionComponent = <TextArea placeholder={question.placeholder} name={question.id} type={question.type} defaultValue={defaultValue} disabled={appSubmitted} onChangeHandler={value => saveResponseField(question.id, value)} />;
      break;

    case "select":
      QuestionComponent = <SelectDropdown placeholder={question.placeholder} name={question.id} type={question.type} options={question.options} defaultValue={defaultValue} disabled={appSubmitted} onChangeHandler={value => saveResponseField(question.id, value)} />;
      break;

    default:
      QuestionComponent = <div>No type found</div>;
  }

  return (
    <Question key={question.id}>
      <QuestionLabel color="grey" size="small" weight="600">{label.toUpperCase()}</QuestionLabel>
      {QuestionComponent}
    </Question>
  );
}

const renderSubmit = (saveState, appState, appFilled, submitHandler) => {
  if(appState === "SUBMITTED") {
    return <Text color="green" size="normal">Your application has been submitted!</Text>
  }

  let saveMsg;
  if(saveState === "SAVING") saveMsg = "Saving...";
  else if(saveState === "SAVED") saveMsg = "Your responses have been saved.";
  return (
    <Submit>
      {appFilled && <SubmitButton
        label="Submit"
        backgroundColor="secondary"
        color="white"
        disabled={appState === "SUBMITTING"}
        onClickHandler={submitHandler}
                    />}
      <Text color="grey" size="normal">{saveMsg}</Text>
    </Submit>
  );
}




const ApplicationViewComponent = ({
  curAppInfo,
  updateAppInfo,
  submitAppInfo,
  appState,
}) => {

  const [ saveState, updateSaveState ] = useState("READY");
  const appSubmitted = appState === "SUBMITTED";
  const appFilledOut = appTemplate.every(q => (Object.keys(curAppInfo).includes(q.question.id) && curAppInfo && curAppInfo[q.question.id] !== ""));

  const delayedUpdateField = useCallback(debounce((fieldId, value, appInfo) => {
    const newAppInfo = {
      ...appInfo,
      [fieldId]: value
    }

    updateAppInfo(newAppInfo);
    updateSaveState("SAVED");
  }, 1000), [submitAppInfo]);

  const saveResponseField = (fieldId, value) => {
    updateSaveState("SAVING");
    delayedUpdateField(fieldId, value, curAppInfo);
  }

  return (
    <PageWrapper title="My Application">
      <Container>
        {(appState !== "FETCHING")
          ?
            <>
              {appTemplate.map(q => renderQuestion(q, curAppInfo[q.question.id], saveResponseField, appSubmitted))}
              {renderSubmit(saveState, appState, appFilledOut, submitAppInfo)}
            </>
          :
          <Loading />
        }

      </Container>
    </PageWrapper>
  );
};

export default ApplicationViewComponent;
