import React from 'react';
import {useSelector} from 'react-redux'
import './index.css'
import {useHistory} from 'react-router-dom'
// renders a list of model templates
export default function ModelTemplates(props){
    const modelTemplates = Object.values(useSelector(state => state.modelTemplate));
    const history = useHistory();
    return <div style={{
        width : "100%",
        height : "100%"
    }}>
        <div style={{
            width : "fit-content",
            minWidth : "50%",
            textAlign : "center",
            margin : "5vh auto"
        }}>
            <p style={{fontSize : "2rem", fontWeight : "700"}}>Model templates</p>
            {
                modelTemplates.map((modelTemplate, idx) => <div className={"ModelTemplates-modelTemplate"} key={modelTemplate._id} style={{
                    height : window.screenH * 0.05,
                    width : "100%",
                    marginBottom : window.screenH * 0.01,
                }} onClick={() => {
                    history.push(`./model_templates/edit/${modelTemplate._id}`);
                }}>
                    <p>{modelTemplate.name}</p>
                </div>)
            }
        </div>
    </div>
}