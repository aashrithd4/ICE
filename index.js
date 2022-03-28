import React, {useState,useCallback,useEffect} from 'react';
import ReactDOM from 'react-dom';
import {select,axisLeft,axisBottom, csv,arc,pie,scaleLinear,scaleBand,max,format} from 'd3';

const Urlcsv ='https://gist.githubusercontent.com/aashrithd4/b1bcad9e9e82ff8240f7335756bc30a9/raw/91921ca2b655a866e1ae9843f0d4e197a56906f9/Anime.csv';
const width=960;
const height=500;
const margin={top:20,right:20,bottom:50,left:200};




const App = () => {
    const [data,setData]=useState(null);

    useEffect(() => {
        const row = d => {
            d.animeid = +d['members'];
            return d;
        };
        csv(Urlcsv, row).then(data =>{
            setData(data.slice(0,10));
        });
    },[]);

    if(!data){
        return <pre>Loading...</pre>
    }

    const innerHeight = height - margin.top - margin.bottom - 100;
    const innerWidth = width - margin.left - margin.right;

    const yScale = scaleBand()
    .domain(data.map(d => d.rating))
    .range([0, innerHeight]);

    const xScale = scaleLinear()
    .domain([0, max(data, d => d.viewers)])
    .range([0, innerWidth]);

    return (
        <svg width={width} height={height}>
            <g transform={'translate(${margin.left},${margin.top})'}>
                {xScale.ticks().map(tickValue => (
                    <g key={tickValue} transform={'translate(${xScale(tickValue)},0)'}>
                        <line y2={innerHeight} stroke="blue" />
                        <text 
                            style={{textAnchor:'middle'}} 
                            dy=".70em"
                            y={innerHeight+3}
                            >
                                {tickValue}
                        </text>
                    </g>    
                ))}
                {yScale.domain().map(tickValue => (
                    <text
                        key={tickValue}
                        style={{textAnchor: 'end'}}
                        x={-3}
                        dy=".32"
                        y={yScale(tickValue)+yScale.bandwidth()/2}
                        >
                            {tickValue}
                    </text>
                ))}
                {data.map(d =>(
                    <rect 
                        key={d.rating}
                        x={0}
                        y={yScale(d.rating)}
                        width={xScale(d.viewers)}
                        height={yScale.bandwidth()}
                    />
                ))}
            </g>
        </svg>
    );
};
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);


