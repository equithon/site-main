import styled from "styled-components";

const headingSizes = {
  big: "2em",
  med: "1.5em",
  small: "1.2em"
};

const Heading = styled.div`
  color: ${props =>
    props.theme.colors[props.color] || props.color || props.theme.colors.black};
  font-size: ${props => headingSizes[props.size]};
  font-weight: 600;

  margin-bottom: ${props => (props.noMargin ? 0 : "0.5em")};
`;

export default Heading;
