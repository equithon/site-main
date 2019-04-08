import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { debounce } from "debounce";
import { mediaSize, universityListOptions } from "../../../utils/siteTools";

import LoadingSpinner from "../../../static/img/loaders/default_color_secondary.svg";
import TextInput from "../../shared/TextInput/TextInputComponent";
import TextArea from "../../shared/TextArea/TextAreaComponent";
import SelectDropdown from "../../shared/SelectDropdown/SelectDropdownComponent";
import Button from "../../shared/Button/ButtonComponent";
import Text from "../../shared/Text/TextComponent";
import Heading from "../../shared/Heading/HeadingComponent";
import Modal from "../../shared/Modal/ModalComponent";

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
          placeholder: "Type to search or specify 'Other' option",
          options: [
            { label: "High School Diploma", value: "highschool" },
            { label: "Bachelor's", value: "undergrad" },
            { label: "Master's", value: "masters" },
            { label: "PhD", value: "phd" }
          ],
          componentOptions: {
            allowCreate: true
          }
        }
      },
      {
        label: "What institution are you attending",
        type: "select",
        question: {
          id: "studyInstitution",
          type: "option",
          placeholder: "Select a school",
          options: universityListOptions,
          componentOptions: {
            allowCreate: true
          }
        }
      },
      {
        label: "What are you studying?",
        type: "text",
        question: {
          id: "studyProgram",
          type: "text",
          placeholder: "Underwater Basket Weaving"
        }
      },
      {
        label: "When are you graduating?",
        type: "select",
        question: {
          id: "studyGradYear",
          type: "option",
          placeholder: "Type to search or specify 'Other' option",
          options: [
            { label: "2019", value: "2019" },
            { label: "2020", value: "2020" },
            { label: "2021", value: "2021" },
            { label: "2022", value: "2022" },
            { label: "2023", value: "2023" },
            { label: "2024", value: "2024" },
            { label: "2025", value: "2025" }
          ],
          componentOptions: {
            allowCreate: true
          }
        }
      },
      {
        label: "Where are you travelling from?",
        type: "text",
        question: {
          id: "travellingFrom",
          type: "text",
          placeholder: "Mars"
        }
      }
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
            {
              label: "I'm the expert my grandma calls for tech support!",
              value: "expert"
            }
          ]
        }
      },
      {
        label: "Are there any activities or topics you're interested in?",
        type: "select",
        question: {
          id: "interestedTopics",
          type: "option",
          optional: true,
          placeholder: "Feel free to add your own!",
          options: [
            {
              label: "Workshops",
              options: [
                {
                  label: "Intro to Programming",
                  value: "intro-to-programming"
                },
                {
                  label: "Technical Interview Prep (Algorithms)",
                  value: "tech-prep"
                },
                {
                  label: "Intro to Web Dev (HTML, CSS, JS)",
                  value: "web-dev-intro"
                },
                {
                  label: "Advanced Web Dev (React, Backend, etc)",
                  value: "web-dev-advanced"
                },
                { label: "UI/UX Design", value: "ui/ux-design" },
                { label: "Pitching Your Idea", value: "pitching" },
                { label: "Ideation Workshop", value: "ideation" }
              ]
            },
            {
              label: "Activities",
              options: [
                { label: "LinkedIn Headshots", value: "linkedin-headshots" },
                { label: "Photobooth", value: "photobooth" },
                { label: "Therapy Dogs", value: "therapy-dogs" },
                { label: "Interactive Post-It Wall", value: "post-it-wall" },
                { label: "Networking Fair", value: "networking-fair" },
                { label: "Cookie Decorating", value: "cookie-decorating" }
              ]
            },
            {
              label: "Other",
              options: [
                { label: "Fostering Entrepreneurship", value: "fostering-ent" },
                { label: "Tech Talks", value: "tech-talks" },
                {
                  label: "Emerging Tech (ML, AI, CV, etc)",
                  value: "emerging-tech"
                },
                { label: "Recruiter Panel", value: "recruiter-panel" }
              ]
            }
          ],
          componentOptions: {
            grouped: true,
            allowCreate: true,
            allowMultiple: true
          }
        }
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
            {
              label: "Physical Accessibility",
              value: "physical-accessibility"
            },
            { label: "Not sure yet!", value: "undecided" }
          ],
          componentOptions: {
            allowMultiple: true
          }
        }
      }
    ]
  },
  {
    title: "Now, let's see your passion for social equity!",
    content: [
      {
        label:
          "Tell us about a social equity issue that you are interested in learning more about.",
        type: "textLong",
        question: {
          id: "responseSocialEquity",
          type: "textArea",
          placeholder: "No need to write an essay!"
        }
      }
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
            {
              label: "What is an achievement you are proud of?",
              value: "achievement-highlight"
            },
            {
              label: "Tell us about a time you learned something new.",
              value: "learning-new"
            }
          ]
        }
      },
      {
        label: "Write a bit about your chosen prompt above!",
        type: "textLong",
        question: {
          id: "responsePersonalAnswer",
          type: "textArea",
          placeholder: "No need to write an essay!"
        }
      },
      {
        label: "Are there any links that you want us to check out?",
        type: "text",
        question: {
          id: "externalLink",
          type: "url",
          optional: true,
          placeholder: "Portfolio, previous work, Github, LinkedIn, etc."
        }
      }
    ]
  },
  {
    title: "A bonus question, just for fun!",
    content: [
      {
        label: "What is your favourite smell?",
        type: "text",
        question: {
          id: "responseBonus",
          type: "text",
          optional: true,
          placeholder: "Be creative!"
        }
      }
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
  margin: 50vh 0;

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

    ${mediaSize.phone`
      margin-top: 0.5em;
    `}
  }

  ${mediaSize.phone`
    height: auto;
    flex-direction: column;
  `}
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
    margin: auto 0;
  `}
`;

const ModalFrame = styled.div`
  display: ${props => (props.show ? "flex" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(88, 88, 88, 0.49);
`;

const ConfirmSubmitModal = styled(Modal)`
  width: 40em;
  height: 20em;
  padding: 5em;

  border-radius: ${props => props.theme.app.border.radius};

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > * {
    margin: auto;
    text-align: center;
  }

  ${mediaSize.phone`
    width: 85vw;
    height: 60vw;
    padding: 2em;
  `}
`;

const ConfirmSubmit = ({ confirmSubmit, closeModal }) => (
  <ConfirmSubmitModal
    backgroundColor="lightBlack"
    handleClickOutside={closeModal}
    onClickCloseHandler={closeModal}
  >
    <div>
      <Text size="big" color="white">
        Are you sure you want to submit?
      </Text>
      <Text size="big" color="white">
        You won&apos;t be able to edit your application after.
      </Text>
    </div>
    <SubmitButton
      label="Yes, Submit"
      backgroundColor="secondary"
      color="white"
      onClickHandler={confirmSubmit}
    />
  </ConfirmSubmitModal>
);

const renderQuestion = (
  { label, type, question },
  defaultValue,
  saveResponseHandler,
  appSubmitted
) => {
  let QuestionComponent;
  switch (type) {
    case "text":
      QuestionComponent = (
        <TextInput
          placeholder={question.placeholder}
          name={question.id}
          type={question.type}
          defaultValue={defaultValue}
          disabled={appSubmitted}
          onChangeHandler={value => saveResponseHandler(question.id, value)}
        />
      );
      break;

    case "textLong":
      QuestionComponent = (
        <TextArea
          placeholder={question.placeholder}
          name={question.id}
          type={question.type}
          defaultValue={defaultValue}
          disabled={appSubmitted}
          onChangeHandler={value => saveResponseHandler(question.id, value)}
        />
      );
      break;

    case "select":
      QuestionComponent = (
        <SelectDropdown
          placeholder={question.placeholder}
          name={question.id}
          type={question.type}
          options={question.options}
          {...question.componentOptions}
          defaultValue={defaultValue}
          disabled={appSubmitted}
          onChangeHandler={value => saveResponseHandler(question.id, value)}
        />
      );
      break;

    default:
      QuestionComponent = <div>No type found</div>;
  }

  return (
    <Question key={question.id}>
      <QuestionLabel color="grey" size="small" weight="bold">
        {label.toUpperCase()}
        {question.optional ? "" : "*"}
      </QuestionLabel>
      {QuestionComponent}
    </Question>
  );
};

const renderQuestionSet = (
  { title, content },
  curAppInfo,
  saveResponseHandler,
  appSubmitted
) => (
  <QuestionSet key={title}>
    <QuestionTitle color="black" size="small" weight="normal">
      {title}
    </QuestionTitle>
    {content.map(q =>
      renderQuestion(
        q,
        curAppInfo[q.question.id],
        saveResponseHandler,
        appSubmitted
      )
    )}
  </QuestionSet>
);

const renderSubmit = (saveState, appState, appFilled, submitHandler) => {
  if (appState === "SUBMITTED") {
    return (
      <Text color="green" size="normal">
        Your application has been submitted!
      </Text>
    );
  }

  let saveMsg;
  if (saveState === "SAVING") saveMsg = "Saving...";
  else if (saveState === "SAVED") saveMsg = "Your responses have been saved.";
  return (
    <Submit>
      {
        <SubmitButton
          label="Submit"
          backgroundColor="secondary"
          color="white"
          disabled={appState === "SUBMITTING" || !appFilled}
          onClickHandler={submitHandler}
        />
      }
      <Text color="grey" size="normal">
        {saveMsg}
      </Text>
    </Submit>
  );
};

const ApplicationViewComponent = ({
  curUserName,
  curAppInfo,
  updateAppInfo,
  submitAppInfo,
  appState
}) => {
  const [saveState, updateSaveState] = useState("READY");
  const [confirmSaveOpen, toggleConfirmSave] = useState(false);
  const [renderContent, updateRenderContent] = useState(false);

  const appSubmitted = appState === "SUBMITTED";
  const appFilledOut = appTemplate.every(qs =>
    qs.content.every(
      q =>
        (Object.keys(curAppInfo).includes(q.question.id) &&
          curAppInfo &&
          curAppInfo[q.question.id] !== "") ||
        q.question.optional
    )
  );

  const delayedUpdateField = useCallback(
    debounce((fieldId, value, appInfo) => {
      const newAppInfo = {
        ...appInfo,
        [fieldId]: value
      };

      updateAppInfo(newAppInfo);
      updateSaveState("SAVED");
    }, 1000),
    [submitAppInfo]
  );

  useEffect(() => {
    const appTimer = setTimeout(() => updateRenderContent(true), 500);

    return () => clearTimeout(appTimer);
  }, []);

  const saveResponseField = (fieldId, value) => {
    updateSaveState("SAVING");
    delayedUpdateField(fieldId, value, curAppInfo);
  };

  const closeModal = () => toggleConfirmSave(false);

  const submitHandler = () => toggleConfirmSave(true);

  const confirmSubmit = () => {
    submitAppInfo();
    closeModal();
  };

  return (
    <Container>
      {appState !== "FETCHING" && renderContent ? (
        <>
          <Heading color="black" size="small" weight="normal">{`Hi ${
            curUserName.split(" ")[0]
          }! Let's get to know you!`}</Heading>
          {appTemplate.map(qs =>
            renderQuestionSet(qs, curAppInfo, saveResponseField, appSubmitted)
          )}
          {renderSubmit(saveState, appState, appFilledOut, submitHandler)}
        </>
      ) : (
        <Loading />
      )}

      <ModalFrame show={confirmSaveOpen}>
        <ConfirmSubmit confirmSubmit={confirmSubmit} closeModal={closeModal} />
      </ModalFrame>
    </Container>
  );
};

export default ApplicationViewComponent;
