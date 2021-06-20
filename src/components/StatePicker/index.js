import React, {useState} from 'react';
import Select, { components } from 'react-select';
import {useSelector} from 'react-redux'

// dropdown of all entities of a specified type from the redux store
export default props => {
    const entities = Object.values(useSelector(state => props.getEntities(state)));
    return <div style={{position : "relative"}}>
        <Select
            required
            onChange={(val) => {
                props.onPick(val);
            }}
            value={props.value}
            options={entities.map((entity, idx) => {
                return {
                    value : entity._id,
                    label : entity.name
                }
            })}
            styles={{
                menu : (provided, state) => ({
                    ...provided,
                    zIndex : "1000"
                })
            }}
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