import React, { useState } from "react";
import { Container, BottomButton } from "./style";
import ReactEcharts from "echarts-for-react";

export default function DataChart({ netChange = {}, params = {}, data = []}) {
    const [showNetdiff, setShowNetdiff] = useState(false);
    const arr = Array.from(data);

    arr.forEach(obj => {
        obj.net = obj[params?.upper_bound] - obj[params?.lower_bound];
    });

    arr.sort(function (a, b) {
        if (a.net > b.net) return 1;
        else if (a.net < b.net) return -1;
        return 0;
    })

    if (netChange?.net >= 0) {
        arr.reverse();
    }

    const setPos = (item, flag) => {
        let fac = -1;
        if(showNetdiff) fac = 1;
        if(flag && item?.net>=0) return 1*item?.net.toFixed(2);
        if(!flag && item.net<0) return fac*item?.net.toFixed(2);
        return '-';
    }

    var prev = 0;
    const setZeroValues = (item, ind) => {
        let fac = 1;
        if(netChange?.net<0) fac = -1;
        if(ind === 0) {
            prev += fac*item?.net;
            return 0;
        }
        else {
            const ret = prev;
            prev += fac*item?.net;
            if((item?.net>=0 && fac === 1) || ((item?.net<0 && fac === -1))) return ret;
            return prev;
        }
    }

    const xValues = arr.map(item => item[params?.dimension]);
    const zeroValues = arr.map((item, ind) => setZeroValues(item, ind))
    const netZeroValues = arr.map((item) => 0);
    const pos = arr.map(item => setPos(item, netChange?.net>=0));
    const neg = arr.map(item => setPos(item, netChange?.net<0));


    const option = {
        color: netChange?.net>=0 ? ["#AFE1AF", "#FFC0CB", "#ADD8E6"] : ["#FFC0CB", "#AFE1AF", "#ADD8E6"],
        title: {
            text: 'Accumulated Waterfall Chart'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                let tar;
                if (params[1].value !== '-') {
                    tar = params[1];
                } else {
                    tar = params[0];
                }
                return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
            }
        },
        legend: {
            data: ['Loss', 'Profit', 'Total']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: [...xValues, "Total"],
            axisLabel: {rotate: 90},
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                name: 'Placeholder',
                type: 'bar',
                stack: 'Total',
                itemStyle: {
                    borderColor: 'transparent',
                    color: 'transparent'
                },
                emphasis: {
                    itemStyle: {
                        borderColor: 'transparent',
                        color: 'transparent'
                    }
                },
                data: showNetdiff ? [...netZeroValues, 0] : [...zeroValues, 0]
            },
            {
                name: netChange?.net>=0 ? 'Profit' : 'Loss',
                type: 'bar',
                stack: 'Total',
                label: {
                    show: true,
                    position: netChange?.net>=0 ? 'top' : 'bottom',
                },
                data: [...pos, '-']
            },
            {
                name: netChange?.net>=0 ? 'Loss' : 'Profit',
                type: 'bar',
                stack: 'Total',
                label: {
                    show: true,
                    position: netChange?.net>=0 ? 'bottom' : 'top',
                },
                data: [...neg, '-']
            },
            {
                name: 'Total',
                type: 'bar',
                stack: 'Total',
                label: {
                    show: true,
                    position: 'top'
                },
                data: (function () {
                    let list = [];
                    for (let i = 1; i <= arr.length; i++) {
                      list.push('-');
                    }
                    list.push(showNetdiff || netChange?.net>0 ?  netChange?.net.toFixed(2): -1*netChange?.net.toFixed(2));
                    return list;
                })()
            },
        ]
    };

    return (
        <Container>
            <BottomButton color={showNetdiff ? "#008080" : "#4682B4"} onClick={() => setShowNetdiff(!showNetdiff)}>
                {
                    showNetdiff ? "Waterfall" : "Net Difference"
                } 
            </BottomButton>
            <ReactEcharts option={option} style={{ height: '90vh', width: '100%', marginTop: "16px" }}/>
        </Container>
    );
}