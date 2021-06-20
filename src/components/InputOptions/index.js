import React, {useState} from 'react';
import Select, { components } from 'react-select';
import {useSelector} from 'react-redux'

/*const stocks = ["Apple", "Amazon", "Google", "Microsoft"];
const stockOptions = [];
for(const stock of stocks){
    stockOptions.push({
        type : 'stock',
        value : `stock/${stock}`,
        label : stock
    });
}

const metrics = [
    "Price-to-Earnings Ratio",
    "Price-to-Book Ratio",
    "Debt-to-Equity",
    "Free Cash Flow",
    "PEG Ratio",
    "The Bottom Line"
];
const metricOptions = [];
for(const metric of metrics){
    metricOptions.push({
        type : 'metric',
        value : `metric/${metric}`,
        label : metric
    })
};

export const options = [
  {
    label: 'Stocks',
    options: stockOptions,
  },
  {
    label: 'Metrics',
    options: metricOptions,
  }
];*/

// renders all input options as a dropdown picker
export default function InputOptions(props){
    const options = useSelector(state => state.trading.modelInputs);
    return <div style={{position : "relative"}}>
        <Select
            required
            menuPlacement="top"
            onChange={(val) => {
                props.onPick(val);
            }}
            value={props.value}
            options={options || []}
            components={{ Group : components.Group }}
        />
        <input
            tabIndex={-1}
            autoComplete="off"
            style={{ opacity: 0, height: 0, position : "absolute" }}
            value={props.value ? props.value.value : ""}
            required
        />
    </div>
}