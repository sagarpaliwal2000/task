import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    margin: 16px;

    @media only screen and (max-width: 800px) {
        flex-direction: column;
    }
`;

export const Chart = styled.div`
    flex:10;
`;

export const Net = styled.div`
    flex:2;
`;

export const SubmitButton = styled.button`
    cursor: pointer;
    background-color: #FFC0CB;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 18px;
    border:none;
    margin-top: 6px;
    text-transform: uppercase;
    &:hover {
        opacity: 0.8;
    }
`;

export const FormContainer = styled.div`
    text-align: left;

    .error {
        color: #811331;
    }
`;