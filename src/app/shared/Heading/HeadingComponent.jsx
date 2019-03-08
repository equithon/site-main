import styled from "styled-components";


const Heading = styled.h1`
  display: block;
  margin: 0;

  color: ${props =>
    props.theme.colors[props.color] || props.color || props.theme.colors.black};
  font-size: ${props => props.theme.sizes.heading[props.size] || props.size || props.theme.sizes.heading.normal};
  font-weight: ${props => props.theme.app.font.weight[props.weight] || props.theme.app.font.weight.bold};
`;

export default Heading;
