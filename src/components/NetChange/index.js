import React from 'react'
import {Container, Field, Sep} from './style'
export default function NetChange({ netChange }) {
    return (
        <Container>
            <h2> Net Change</h2>
            {
                Object.keys(netChange).map((key, ind) => {
                    return (
                        <div key={ind}>
                            <Sep />
                            <Field>
                                <> {key}:</> 
                                <div>{netChange[key].toFixed(2)}</div>
                            </Field>
                        </div>
                    );
                })
            }
            <Sep />
        </Container>
    );
}