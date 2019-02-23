import React from "react";
import styled from "styled-components";

import PageWrapper from "../../shared/PageWrapper/PageWrapperComponent";
import TextInput from "../../shared/TextInput/TextInputComponent";
import TextArea from "../../shared/TextArea/TextAreaComponent";
import SelectDropdown from "../../shared/SelectDropdown/SelectDropdownComponent";
import Button from "../../shared/Button/ButtonComponent";
import Text from "../../shared/Text/TextComponent";


const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;


const ApplicationViewComponent = ({
  curAppInfo,
  updateApp,
  submitApp
}) => (
  <PageWrapper title="My Application">
    <Container>
      <Button
        label="Submit"
        disabled={false}
        onClickHandler={submitApp}
      />

    </Container>
  </PageWrapper>
);

export default ApplicationViewComponent;
