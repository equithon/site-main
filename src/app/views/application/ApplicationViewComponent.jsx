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
import Heading from "../../shared/Heading/HeadingComponent";


// The template for an application info, including options, etc.
const appTemplate = [
  {
    title: "",
    content: [
      {
        label: "What level of education are you pursuing?",
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
            { label: "Business", value: "business" },
            { label: "Graphic Design", value: "graphicdesign" },
            { label: "Fine Arts", value: "finearts" },
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
    ]
  },
  {
    title: "Tell us a bit about your past experience.",
    content: [
      {
        label: "What is your experience with hackathons or programming?",
        type: "select",
        question: {
          id: "technicalExperience",
          type: "option",
          placeholder: "All experience levels welcome!",
          options: [
            { label: "Not a lot, but looking to learn!", value: "little" },
            { label: "I have some.", value: "some" },
            { label: "I have a decent amount.", value: "more" },
            { label: "I'm the expert my grandma calls for tech support!", value: "expert" },
          ]
        },
      },
      {
        label: "Are there any topics you're interested in learning about?",
        type: "select",
        question: {
          id: "interestedTopics",
          type: "option",
          optional: true,
          placeholder: "??",
          options: [
            { label: "?", value: "?" },
            { label: "??", value: "??" },
            { label: "???", value: "???" },
            { label: "????", value: "????" },
          ]
        },
      },
      {
        label: "Do you have a category you want to work on at Equithon?",
        type: "select",
        question: {
          id: "interestedCategories",
          type: "option",
          optional: true,
          placeholder: "All of them!",
          options: [
            { label: "Economic Disparity", value: "economic-disparity" },
            { label: "Female Empowerment", value: "female-empowerment" },
            { label: "Mental Health", value: "mental-health" },
            { label: "Mobility Rights", value: "mobility-rights" },
            { label: "Physical Accessibility", value: "physical-accessibility" },
            { label: "Not sure yet!", value: "undecided" },
          ]
        },
      },
    ]
  },
  {
    title: "Now, let's see your passion for social equity!",
    content: [
      {
        label: "Tell us about a social equity issue that you are interested in learning more about.",
        type: "textLong",
        question: {
          id: "responseSocialEquity",
          type: "textArea",
          placeholder: "A paragraph or two is fine!"
        },
      },
    ]
  },
  {
    title: "We want to hear about some cool stuff you've done 😁",
    content: [
      {
        label: "Pick a topic you want to write about.",
        type: "select",
        question: {
          id: "responsePersonalQuestion",
          type: "option",
          placeholder: "Up to you!",
          options: [
            { label: "What is an achievement you are proud of?", value: "achievement-highlight" },
            { label: "Tell us about a time you learned something new.", value: "learning-new" },
          ]
        },
      },
      {
        label: "Write a bit about your chosen prompt above!",
        type: "textLong",
        question: {
          id: "responsePersonalAnswer",
          type: "textArea",
          placeholder: "A paragraph or two is fine!"
        },
      },
      {
        label: "Are there any links that you want us to check out?",
        type: "text",
        question: {
          id: "externalLink",
          type: "url",
          optional: true,
          placeholder: "Portfolio, previous work, Github, LinkedIn, etc."
        },
      }
    ]
  },
  {
    title: "A bonus question, just for fun.",
    content: [
      {
        label: "What is your favourite smell?",
        type: "text",
        question: {
          id: "responseBonus",
          type: "text",
          optional: true,
          placeholder: "Be creative!"
        },
      },
    ]
  }
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

const QuestionSet = styled.div`
  margin-bottom: 1em;

  &:first-of-type {
    margin-top: 0;
  }
`;

const QuestionTitle = styled(Heading)`
  margin: 0.5em 0;
`

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
  height: 4em;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  & > p {
    margin: auto 0;
  }
`;

const SubmitButton = styled(Button)`
  width: 10em;
  margin: auto 1em auto 0;

  display: inline-block;

  // prevent button from collapsing when there's no content during loading
  &:empty:after {
    content: "&nbsp;";
    visibility: hidden;
  }

  &:disabled {
    cursor: auto;
    background-color: ${props => props.theme.colors.grey};
    opacity: 0.75;
  }

  ${mediaSize.phone`
    width: 100%;
  `}
`;





const renderQuestion = ({ label, type, question }, defaultValue, saveResponseHandler, appSubmitted) => {
  let QuestionComponent;
  switch(type) {
    case "text":
      QuestionComponent = <TextInput placeholder={question.placeholder} name={question.id} type={question.type} defaultValue={defaultValue} disabled={appSubmitted} onChangeHandler={value => saveResponseHandler(question.id, value)} />;
      break;

    case "textLong":
      QuestionComponent = <TextArea placeholder={question.placeholder} name={question.id} type={question.type} defaultValue={defaultValue} disabled={appSubmitted} onChangeHandler={value => saveResponseHandler(question.id, value)} />;
      break;

    case "select":
      QuestionComponent = <SelectDropdown placeholder={question.placeholder} name={question.id} type={question.type} options={question.options} defaultValue={defaultValue} disabled={appSubmitted} onChangeHandler={value => saveResponseHandler(question.id, value)} />;
      break;

    default:
      QuestionComponent = <div>No type found</div>;
  }

  return (
    <Question key={question.id}>
      <QuestionLabel color="grey" size="small" weight="bold">{label.toUpperCase()}{question.optional ? "" : "*"}</QuestionLabel>
      {QuestionComponent}
    </Question>
  );
}

const renderQuestionSet = ({ title, content}, curAppInfo, saveResponseHandler, appSubmitted) => (
  <QuestionSet key={title}>
    <QuestionTitle color="black" size="small" weight="normal">{title}</QuestionTitle>
    {content.map(q => renderQuestion(q, curAppInfo[q.question.id], saveResponseHandler, appSubmitted))}
  </QuestionSet>
)

const renderSubmit = (saveState, appState, appFilled, submitHandler) => {
  if(appState === "SUBMITTED") {
    return <Text color="green" size="normal">Your application has been submitted!</Text>
  }

  let saveMsg;
  if(saveState === "SAVING") saveMsg = "Saving...";
  else if(saveState === "SAVED") saveMsg = "Your responses have been saved.";
  return (
    <Submit>
      {<SubmitButton
        label="Submit"
        backgroundColor="secondary"
        color="white"
        disabled={appState === "SUBMITTING" || !appFilled}
        onClickHandler={submitHandler}
                    />}
      <Text color="grey" size="normal">{saveMsg}</Text>
    </Submit>
  );
}




const ApplicationViewComponent = ({
  curUserName,
  curAppInfo,
  updateAppInfo,
  submitAppInfo,
  appState,
}) => {

  const [ saveState, updateSaveState ] = useState("READY");
  const appSubmitted = appState === "SUBMITTED";
  const appFilledOut = appTemplate.every(qs => qs.content.every(q => (Object.keys(curAppInfo).includes(q.question.id) && curAppInfo && curAppInfo[q.question.id] !== "") || q.question.optional));

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

  console.log(curUserName, curAppInfo)

  return (
    <PageWrapper title="My Application">
      <Container>
        {(appState !== "FETCHING")
          ?
            <>
              <Heading color="black" size="small" weight="normal">{`Hi ${curUserName}! Let's get to know you!.`}</Heading>
              {appTemplate.map(qs => renderQuestionSet(qs, curAppInfo, saveResponseField, appSubmitted))}
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
