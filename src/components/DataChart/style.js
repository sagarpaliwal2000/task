import styled from "styled-components";

export const Container = styled.div`
    margin:4px;
`;

export const BottomButton = styled.button`
    cursor: pointer;
    margin-right: 4px;
    background-color: ${(props) => props?.color ? props?.color: "#FFC0CB"};
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 18px;
    border:none;
    text-transform: uppercase;
    &:hover {
        opacity: 0.8;
    }
`;