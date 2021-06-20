import React, {useState, useRef} from 'react';
import ConfigurationWrapper from 'components/ConfigurationWrapper'

import {Form, Button, Table, ToggleButtonGroup, ToggleButton, ListGroup} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import StatePicker from 'components/StatePicker'
import {useHistory} from "react-router-dom";

import {post, patch} from 'state/ATE'

// wrapper for the ATE config
export default props => <ConfigurationWrapper 
    getEntity={(state, id) => state.ATE[id]}
    entityName={"ATE"}
    ConfigurationComponent={Configuration}
    editTitle={"Edit ATE (automatic trading engine)"}
    createTitle={"Create ATE (automatic trading engine)"}
/>

// returns an array of length, model.outputs.length, with all elements equal to "unset"
const getOutputMap = model => {
    const res = [];
    for(const i in model.outputs) res[i] = "unset";
    return res;
}

// configuration component. Configuration of an ATE. Supperts create and edit.
const Configuration = props => {
    
    const ATE = props.ATE;
    const getTrainedModels = state => {
        const res = {};
        for(const id in state.model){
            if(state.model[id].hasTrained){
                res[id] = state.model[id];
            }
        }
        return res;
    }

    const [modelValue, setModelValue] = useState(ATE ? {value : ATE.modelID} : null);

    const model = useSelector(state => modelValue && modelValue.value ? state.model[modelValue.value] : null);

    const refs = {
        name : useRef(null),
        description : useRef(null)
    };

    const dispatch = useDispatch();

    const history = useHistory();

    const [bidTrigger, setBidTrigger] = useState(ATE ? ATE.bidTrigger : null);
    const [sellTrigger, setSellTrigger] = useState(ATE ? ATE.sellTrigger : null);

    if(bidTrigger == null && model){
        setBidTrigger(getOutputMap(model));
    }
    if(sellTrigger == null && model){
        setSellTrigger(getOutputMap(model));
    }

    return (
    <Form onSubmit={e => {
        e.preventDefault();
        if(!ATE){
            post(dispatch, {
                name : refs.name.current.value,
                description : refs.description.current.value,
                modelID : modelValue.value,
                bidTrigger,
                sellTrigger
            }).then(() => {
                history.push("/dashboard/trading/ATEs")
            })
        }else{
            patch(dispatch, ATE._id, {
                name : refs.name.current.value,
                description : refs.description.current.value,
                modelID : modelValue.value,
                bidTrigger,
                sellTrigger
            }).then(() => {
                history.push("/dashboard/trading/ATEs")
            })
        }
    }}>template
        <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control ref={refs.name} required defaultValue={ATE ? ATE.name : ""} placeholder="Enter name" />
        </Form.Group>

        <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control ref={refs.description} as="textarea" defaultValue={ATE ? ATE.description : ""} placeholder="Enter description" />
        </Form.Group>
        {!ATE && <Form.Group>
            <Form.Label>Create ATE from: </Form.Label>
            <StatePicker value={modelValue} onPick={(val) => {
                setModelValue(val);
                setTimeout(() => setBidTrigger(null), 100)
                setTimeout(() => setSellTrigger(null), 100)
            }} getEntities={getTrainedModels}/>
        </Form.Group>}
        {ATE && <h5>ATE created from {model.name}</h5>}
        <br/>
        <h4>ATE bid trigger</h4>
        <ListGroup>
            {(model && bidTrigger) ? model.outputs.map((output, idx) => <ListGroup.Item key={idx}>
                    <div style={{width : "47%", marginRight : "3%", display : "inline-block", textAlign : "right"}}>
                        <Form.Label>{output.label}</Form.Label>
                    </div>
                    <div style={{width : "50%", display : "inline-block", textAlign : "left"}} >
                        <ToggleButtonGroup type="radio" name="options" value={bidTrigger[idx]} onChange={newValue => {
                            bidTrigger[idx] = newValue;
                            setBidTrigger([...bidTrigger])
                        }}>
                            <ToggleButton value={"false"}>False</ToggleButton>
                            <ToggleButton value={"unset"}>Unset</ToggleButton>
                            <ToggleButton value={"true"}>True</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                </ListGroup.Item>
            ) : <p>Choose a model</p>}
        </ListGroup>
        <br/>
        <h4>ATE sell trigger</h4>
        <ListGroup>
            {(model && sellTrigger) ? model.outputs.map((output, idx) => <ListGroup.Item key={idx}>
                    <div style={{width : "47%", marginRight : "3%", display : "inline-block", textAlign : "right"}}>
                        <Form.Label>{output.label}</Form.Label>
                    </div>
                    <div style={{width : "50%", display : "inline-block", textAlign : "left"}}>
                        <ToggleButtonGroup type="radio" name="options" value={sellTrigger[idx]} onChange={newValue => {
                            sellTrigger[idx] = newValue;
                            setSellTrigger([...sellTrigger])
                        }}>
                            <ToggleButton value={"false"}>False</ToggleButton>
                            <ToggleButton value={"unset"}>Unset</ToggleButton>
                            <ToggleButton value={"true"}>True</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                </ListGroup.Item>
            ) : <p>Choose a model</p>}
        </ListGroup>
        <br/>
        <Button type={"submit"}>
            {ATE ? "Save" : "Create"}
        </Button>
    </Form>
    )
}