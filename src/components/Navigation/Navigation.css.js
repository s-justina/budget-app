import styled from "styled-components";


export const Container = styled.div`
display: flex;
padding: ${({theme}) => theme.spacing.sm}px 0;
justify-content: space-between;
background-color: ${({theme}) => theme.colors.gray.light};
`;

export const List = styled.ul`
display:flex;
`;