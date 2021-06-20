import React from 'react';
import './index.css';
const screenW = window.screen.availWidth;
const screenH = window.screen.availHeight;
// the overall SidePanel component. Renders a modular sidepanel based on the described datamodel.
export default function SidePanel(props){
    const data = props.data;
    const elements = [];
    const recursiveBuildElements = (items, depth, id) => {
        for(let i = 0; i < items.length; i++){
            const item = items[i];
            elements.push(
                <Item 
                    key={id + " " + i}
                    title={item.title} depth={depth} 
                    active={data.active == item.title}
                    onClick={item.onClick}
                />
            );
            if(item.items) recursiveBuildElements(item.items, depth + 1, id + " " + i);
        }
    }
    if(data && data.items) recursiveBuildElements(data.items, 1, "");
    return <div style={{
        height : "100%",
        width : "100%",
        background : "#f2f2f2"
    }}>
        {elements}
    </div>
}

// a single item / element in the SidePanel
const Item = (props) => {
    return <div style={{
        width : "97%",
        height : screenH * (5 - (props.depth - 1) * 0.7) / 100,
        padding : "1% 0",
        marginLeft : "3%",
        position : "relative"
    }}>
        <div 
            className={"SidePanel-item" + (props.onClick ? " SidePanel-item-clickable" : "")} 
            onClick={props.onClick}
            style={{
                width : `${100 - 10 * (props.depth - 1) - (props.active ? 2.5 : 0)}%`,
                left : `${10 * (props.depth - 1)}%`
            }}
        >
            <div style={{
                position : "absolute",
                top : 0, bottom : 0, margin : "auto",
                height : "fit-content",
                fontSize : `${1.2 - (props.depth - 1) * 0.13}rem`,
                fontWeight : "700",
                left : screenH * 0.01,
                userSelect: "none"
            }}>
                {props.title}
            </div>
        </div>
        {
            props.active && <div
                style={{
                    position : "absolute",
                    right : 0,
                    top : 0,
                    height : "-webkit-fill-available",
                    width : "2.5%",
                    backgroundColor : "#0b5364"
                }}
            />
        }
    </div>
}