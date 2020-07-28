import {createGlobalStyle} from "styled-components";

export default createGlobalStyle`
    ul {
        margin:0;
        padding:0;
        list-style: none;
        li+li{
            margin-left: ${({theme}) => theme.spacing.xs}px;
        }
    }
`;