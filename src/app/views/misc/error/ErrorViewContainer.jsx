import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { useAuthState } from 'react-firebase-hooks/auth';
import SiteContext from "../../../../utils/siteContext";
import Barrier from "../../../../static/img/misc/construction.svg";
import Heading from "../../../shared/Heading/HeadingComponent";
import Text from "../../../shared/Text/TextComponent";

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Img = styled.img`
  margin: 0 auto;
  max-height: 30vh;
`;

const Disclaimer = styled(Heading)`
  width: 80vw;
  text-align: center;
  margin: 0 auto;
`;


const ErrorViewContainer = ({ errorMsg, handleError }) => {

  const { state: { firebase } } = useContext(SiteContext);
  const { initialising, user } = useAuthState(firebase.auth);


  useEffect(() => {
    if(user) handleError(user);

  }, [initialising, user])

  return (
    <Container>
      <Img src={Barrier} />
      <Disclaimer size="big" weight="normal" color="error">
        Whoops! Something broke.
        <div>
          <Text size="0.5em" weight="normal" color="grey">
            Please try again. Error: {errorMsg}
          </Text>
        </div>
      </Disclaimer>

    </Container>
  );
};

export default ErrorViewContainer;
