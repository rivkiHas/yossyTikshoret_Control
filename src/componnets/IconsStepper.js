import styled from "styled-components";

export const CompletedIconWrapper = styled.div`
  display: flex;
  width: 42px;
  height: 32px;
  padding: 4px 9px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  background: #f8bd00;
  border-radius: 6px;
`;

export const CompletedIcon = () => (
    // <CompletedIconWrapper>
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <path
                d="M9.87912 13.5199L12.2198 15.8605L16.1209 10.399"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    // </CompletedIconWrapper>
);


export const StepOneIcon = () => (
    <div style={{ width: "42px", height: "42px", flexShrink: 0 }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M15.3204 24.6147V16.1772C15.3204 15.9535 15.4093 15.7389 15.5675 15.5806C15.7257 15.4224 15.9404 15.3335 16.1641 15.3335H19.5391C19.7629 15.3335 19.9775 15.4224 20.1358 15.5806C20.294 15.7389 20.3829 15.9535 20.3829 16.1772V24.6147M15.3204 24.6147H2.78788M15.3204 24.6147H20.3829M20.3829 24.6147H24.4779M22.9141 24.6147V11.5074M22.9141 11.5074C22.2392 11.8967 21.4504 12.0407 20.6815 11.9148C19.9126 11.7889 19.2109 11.4009 18.6954 10.8166C18.0766 11.5164 17.1721 11.9585 16.1641 11.9585C15.6852 11.959 15.2117 11.8572 14.7752 11.6601C14.3387 11.463 13.9492 11.1751 13.6329 10.8155C13.0141 11.5164 12.1096 11.9585 11.1016 11.9585C10.6227 11.959 10.1492 11.8572 9.71267 11.6601C9.27617 11.463 8.88674 11.1751 8.57038 10.8155C8.05504 11.3999 7.3534 11.7881 6.58447 11.9143C5.81553 12.0404 5.02665 11.8966 4.35163 11.5074M22.9141 11.5074C23.3626 11.2485 23.7454 10.89 24.0331 10.4594C24.3207 10.0289 24.5055 9.53801 24.573 9.02467C24.6405 8.51132 24.5891 7.98932 24.4225 7.49905C24.256 7.00879 23.979 6.5634 23.6128 6.19737L22.274 4.85975C21.9578 4.54319 21.5289 4.36514 21.0815 4.36475H6.18313C5.73589 4.36484 5.30698 4.54248 4.99063 4.85862L3.653 6.19737C3.28764 6.56383 3.01132 7.00929 2.84533 7.49942C2.67934 7.98954 2.62812 8.51124 2.69562 9.02429C2.76312 9.53734 2.94754 10.028 3.23466 10.4585C3.52177 10.8891 3.90392 11.2479 4.35163 11.5074M4.35163 24.6147V11.5074M7.72663 21.2397H11.9454C12.1692 21.2397 12.3838 21.1509 12.542 20.9926C12.7002 20.8344 12.7891 20.6198 12.7891 20.396V16.1772C12.7891 15.9535 12.7002 15.7389 12.542 15.5806C12.3838 15.4224 12.1692 15.3335 11.9454 15.3335H7.72663C7.50285 15.3335 7.28824 15.4224 7.13001 15.5806C6.97177 15.7389 6.88288 15.9535 6.88288 16.1772V20.396C6.88288 20.8617 7.26088 21.2397 7.72663 21.2397Z" stroke="#F8BD00" stroke-width="1.73008" stroke-linecap="round" stroke-linejoin="round" />
        </svg></div>
);
export const StepTwoIcon = () => (
    <div style={{ width: "42px", height: "42px", flexShrink: 0 }}>

        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M17.1426 12.0624C17.1426 12.9575 16.787 13.8159 16.1541 14.4489C15.5211 15.0818 14.6627 15.4374 13.7676 15.4374C12.8725 15.4374 12.014 15.0818 11.3811 14.4489C10.7482 13.8159 10.3926 12.9575 10.3926 12.0624C10.3926 11.1673 10.7482 10.3088 11.3811 9.67589C12.014 9.04296 12.8725 8.68738 13.7676 8.68738C14.6627 8.68738 15.5211 9.04296 16.1541 9.67589C16.787 10.3088 17.1426 11.1673 17.1426 12.0624Z" stroke="#F8BD00" stroke-width="1.73008" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M22.2051 12.0624C22.2051 20.0971 13.7676 24.7186 13.7676 24.7186C13.7676 24.7186 5.33008 20.0971 5.33008 12.0624C5.33008 9.82461 6.21903 7.6785 7.80136 6.09616C9.3837 4.51383 11.5298 3.62488 13.7676 3.62488C16.0053 3.62488 18.1515 4.51383 19.7338 6.09616C21.3161 7.6785 22.2051 9.82461 22.2051 12.0624Z" stroke="#F8BD00" stroke-width="1.73008" stroke-linecap="round" stroke-linejoin="round" />
        </svg></div>
);
export const StepThreeIcon = () => (
    <div style={{ width: "42px", height: "42px", flexShrink: 0 }}>

        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M20.4974 21.5655C19.7113 20.5248 18.6943 19.6807 17.5265 19.1C16.3587 18.5192 15.0719 18.2175 13.7677 18.2187C12.4634 18.2175 11.1766 18.5192 10.0088 19.1C8.841 19.6807 7.82399 20.5248 7.0379 21.5655M20.4974 21.5655C22.0313 20.2011 23.1132 18.4027 23.6015 16.4086C24.0898 14.4146 23.9604 12.3193 23.2306 10.4005C22.5007 8.48164 21.2047 6.83004 19.5146 5.66467C17.8245 4.49931 15.82 3.87524 13.7671 3.87524C11.7141 3.87524 9.7097 4.49931 8.01958 5.66467C6.32946 6.83004 5.03352 8.48164 4.30363 10.4005C3.57374 12.3193 3.44437 14.4146 3.9327 16.4086C4.42103 18.4027 5.50397 20.2011 7.0379 21.5655M20.4974 21.5655C18.6457 23.2172 16.249 24.1284 13.7677 24.1249C11.2859 24.1287 8.88992 23.2175 7.0379 21.5655M17.1427 11.4687C17.1427 12.3638 16.7871 13.2222 16.1541 13.8551C15.5212 14.4881 14.6628 14.8437 13.7677 14.8437C12.8725 14.8437 12.0141 14.4881 11.3812 13.8551C10.7482 13.2222 10.3927 12.3638 10.3927 11.4687C10.3927 10.5736 10.7482 9.71511 11.3812 9.08218C12.0141 8.44924 12.8725 8.09366 13.7677 8.09366C14.6628 8.09366 15.5212 8.44924 16.1541 9.08218C16.7871 9.71511 17.1427 10.5736 17.1427 11.4687Z" stroke="#F8BD00" stroke-width="1.73008" stroke-linecap="round" stroke-linejoin="round" />
        </svg></div>
);
export const CircleIcon = () => (
    <div style={{ width: "42px", height: "42px", flexShrink: 0 }}>

        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
            <circle cx="16.4009" cy="16.0385" r="14.81" fill="white" stroke="#F8BD00" stroke-width="2.37993" />
        </svg></div>
);