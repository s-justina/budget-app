import styled from "styled-components";

export const Wrapper = styled.aside`
position: fixed;
height: 100%;
width: 100%;
top:0;
left:0;
display:flex;
align-items:center;
justify-content: center;
z-index: 100;
background-color: rgba(0,0,0,0.5);
`;

export const Content = styled.div`
background: #fff;
position: absolute;
margin: auto;
padding: 20px;
height: 300px;
width: 300px;
box-shadow: ${({theme})=>`0 5px 10px 2px ${theme.colors.gray.dark}`};
text-align: center;
`;

export const CloseIcon = styled.div`
position: absolute;
top: 5px;
right: 7px;
cursor: pointer;
font-size: 20px;
`;