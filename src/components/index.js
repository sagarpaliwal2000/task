import React, { useState, useEffect } from 'react'
import DataChart from './DataChart';
import Loading from './Loading';
import NetChange from './NetChange'
import { getInfo } from './getInfo';
import { Container, Chart, Net, SubmitButton, FormContainer } from './style'

export default function Home() {
    const [customData, setCustomData] = useState("");
    const [res, setRes] = useState({
        params: {},
        data: {},
        hasError: false,
        customDataHasError: false,
        customDataMessage: "",
        loading: false
    })

    const [netChange, setChange] = useState({
        profit: 0,
        loss: 0,
        net: 0
    });

    const handleSumbit = (e) => {
        e.preventDefault();
        var res = "";
        try{
            res = JSON.parse(customData);
            getInfo(res, setRes, setChange);
        } catch (e) {
            setRes((p) => ({...p, customDataHasError: true, customDataMessage: "Please enter a valid JSON data"}));
        }

    }

    const handleChange = (e) => {
        setCustomData(e.target.value); 
        if(res?.customDataHasError) setRes((p) => ({...p, customDataHasError: false, customDataMessage: ""}));
    }

    useEffect(() => {
        setRes((p) => ({ ...p, loading: true }));
        fetch('https://run.mocky.io/v3/e2ffac92-48e0-4826-a59f-bf76fc727383')
            .then((resp) => resp.json())
            .then((d) => {
                getInfo(d, setRes, setChange);
        });
    }, [])
    if (res?.hasError) {
        return (
            <div>
                Oops! some error occurred
            </div>
        );
    }
    if (res?.loading) {
        return (
            <Loading />
        );
    }
    return (
        <Container>
            <Chart >
                <DataChart params={res?.params} netChange={netChange} data={res?.data} />
                <FormContainer>
                    <p><b>Try custom input: -</b></p>
                    <p className="error">{res?.customDataHasError ? res?.customDataMessage : ""}</p>
                    <form onSubmit={(e) => handleSumbit(e)} >
                        <textarea value={customData} onChange={(e) => handleChange(e)} rows="10" cols="150"></textarea>
                        <br />
                        <SubmitButton type="submit" >Create</SubmitButton>
                    </form>
                </FormContainer>
            </Chart>
            <Net>
                <NetChange netChange={netChange} />
            </Net>
        </Container>
    );
}

