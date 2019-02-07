import React from 'react';



const LoginSignupViewComponent = ({ logInUser, signUpUser }) => {

  const logIn = () => {
    logInUser('testuser@test.com', 'test123')
      .catch((error) => console.log(error.message))
  }

  return (
    <div>
      This is the login component.
      <div onClick={() => logIn()}>Log In</div>
    </div>
  );
};

export default LoginSignupViewComponent;
