import styled from 'styled-components';



// Generic form components that are meant to be styled by the user.

export const Button = styled.button`
  cursor: pointer;
  border-radius: ${props => props.rounded ? '50px' : '10px'};

  transition: transform 300ms ease-in-out;
  transform: translateY(0);
  &:hover {
    transform: translateY(-2px);
  }
`;


export const Input = styled.input`
  border-radius: ${props => props.rounded ? '50px' : '10px'};
`;
