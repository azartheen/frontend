import React from 'react';
import {useSelector} from 'react-redux'
import {useParams} from "react-router-dom";
import {Spinner} from 'react-bootstrap'

// wrapper for configuration component. Provides the following functionality.
/*
* select from redux based on functino
* renders loading icon if the entity is not available
*/
export default props => {

    const { id } = useParams();

    const entity = useSelector(state => id ? props.getEntity(state, id) : null);

    const childProps = {}
    childProps[props.entityName] = entity;

    const ConfigurationComponent = props.ConfigurationComponent;

    return <div style={{
        width : "100%",
        height : "100%",
    }}>
        <div style={{
            width : "fit-content",
            minWidth : "50%",
            textAlign : "center",
            margin : "5vh auto"
        }}>
            <p style={{fontSize : "2rem", fontWeight : "700"}}>{id ? props.editTitle :  props.createTitle}</p>
            {(id && !entity) && <Spinner animation="border" variant="primary" />}
            {(!id || entity) && <ConfigurationComponent {...childProps} />}
        </div>
    </div>
}