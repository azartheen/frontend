import React from 'react';
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import './index.css'
// renders all ATEs in a list
export default props => {
    const ATEs = Object.values(useSelector(state => state.ATE));
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
            <p style={{fontSize : "2rem", fontWeight : "700"}}>ATE's (automatic trading engines)</p>
            {
                ATEs.map((ATE, idx) => <div className={"ATEs-ATE"} key={ATE._id} style={{
                    height : window.screenH * 0.05,
                    width : "100%",
                    marginBottom : window.screenH * 0.01,
                }} onClick={() => {
                    history.push(`./ATEs/edit/${ATE._id}`);
                }}>
                    <p>{ATE.name}</p>
                </div>)
            }
        </div>
    </div>
}