import React from "react";
import { Container } from "./style";

export default function Loading() {
    return (
        <Container>
            <h2>Loading</h2>
            <div className="loading" />
        </Container>
    );
}