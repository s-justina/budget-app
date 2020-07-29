import {createGlobalStyle} from "styled-components";
import { normalize } from 'styled-normalize';


export default createGlobalStyle`
${normalize}
    ul {
        margin:0;
        padding:0;
        list-style: none;
        li+li{
            margin-left: ${({theme}) => theme.spacing.xs}px;
        }
    }
`;