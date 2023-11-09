import styled from "styled-components";
import { CardDisplay } from "./cardDisplay";

type Props ={
  width?: string
  height?: string
  bg?: string
  border?: string
}
export const StyledCardDisplay = styled(CardDisplay)<Props>`
width: ${props => props.width || '19rem'};
height: ${props => props.height || 'fit-content'};
background-color: ${props => props.bg || '#fff8e0'};
border: ${props => props.border || '0.5rem solid #FFB184'};
border-radius: 2rem;
box-shadow: 0 0.2rem 0.5rem 0 rgba(0, 0, 0, 0.25);
display: flex;
flex-direction: column;
padding: 0.5rem;
`;