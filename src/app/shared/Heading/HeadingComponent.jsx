import styled from "styled-components";


const Heading = styled.span`
  display: block;
  margin-bottom: ${props => (props.noMargin ? 0 : "0.5em")};

  color: ${props =>
    props.theme.colors[props.color] || props.color || props.theme.colors.black};
  font-size: ${props => props.theme.sizes.heading[props.size] || props.size};
  font-weight: 600;
`;

export default Heading;
