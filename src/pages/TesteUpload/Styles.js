import styled, { css } from 'styled-components';

export const DragActive = css`
  border-color: blue;
  
`;

export const DragReject = css`
  border-color: red;

`;


export const Body = styled.div`
   height: 100%;
   background-color: #ffffff;
   
`

export const DropContainer = styled.div.attrs({ className: "dropzone"})`
   border: 1px dashed #ddd;
   border-radius: 4px;
   cursor: pointer;

   transition: height 0.2s ease;

   ${props => props.isDragActive && DragActive};
   ${props => props.isDragReject && DragReject};
`;

export const UploadMessage = styled.p`


`