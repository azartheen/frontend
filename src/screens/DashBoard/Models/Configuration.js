import React, {useState, useRef} from 'react';
import {Form, Button, Table} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import InputOptions from 'components/InputOptions'
import OutputOptions from 'components/OutputOptions'
import {useHistory, useParams} from "react-router-dom";
import {post, patch, deleteModel} from 'state/model'
import {Spinner} from 'react-bootstrap'
import StatePicker from 'components/StatePicker'
import ConfigurationWrapper from 'components/ConfigurationWrapper'

// configuration wrapper for model configuration
export default props => <ConfigurationWrapper 
    getEntity={(state, id) => state.model[id]}
    entityName={"model"}
    ConfigurationComponent={Configuration}
    editTitle={"Edit model"}
    createTitle={"Create model"}
/>

// model configuration. Supports create and edit.
const Configuration = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const model = props.model;
    
    const [amountOfHiddenLayers, setAmountOfHiddenLayers] = useState(model ? model.amountOfHiddenLayers : null);
    
    const [modelTemplate, setModelTemplate] = useState(null);
    
    const [nodeCount, setNodeCount] = useState(() => {
        const res = {
            input : model ? model.amountOfInputNodes : 1,
            output : model ? model.amountOfOutputNodes : 1
        }
        if(model){
            for(let i = 1; i <= model.amountOfHiddenLayers; i++){
                res[i] = model.amountOfHiddenLayerNodes[i-1];
            }
        }
        return res;
    });

    const [inputs, setInputs] = useState(() => {
        if(!model) return {};
        const res = {};
        for(let i = 0; i < model.amountOfInputNodes; i++){
            res[i + 1] = model.inputs[i];
        }
        return res;
    });

    const [outputs, setOutputs] = useState(() => {
        if(!model) return {};
        const res = {};
        for(let i = 0; i < model.amountOfOutputNodes; i++){
            res[i + 1] = model.outputs[i];
        }
        return res;
    });

    const refs = {
        name : useRef(null),
        description : useRef(null)
    };

    return  <Form onSubmit={(e) => {
                e.preventDefault();
                const body = {
                    name : refs.name.current.value,
                    description : refs.description.current.value
                }
                if(model) patch(dispatch, model._id, body);
                else post(dispatch, {
                    ...body,
                    modelTemplateID : modelTemplate.value
                });
                history.push("/dashboard/models");
            }}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control ref={refs.name} required defaultValue={model ? model.name : ""} placeholder="Enter name" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control ref={refs.description} as="textarea" defaultValue={model ? model.description : ""} placeholder="Enter description" />
                </Form.Group>

                {!model && <Form.Group>
                    <Form.Label>Create model from: </Form.Label>
                    <StatePicker value={modelTemplate} onPick={(val) => setModelTemplate(val)} getEntities={state => state.modelTemplate}/>
                </Form.Group>}

                {model && <>

                <Form.Group >
                    <Form.Label>Amount of hidden layers: {amountOfHiddenLayers}</Form.Label>
                </Form.Group>

                <Form.Label>Layer configuration</Form.Label>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Layer</th>
                            <th># of nodes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Input</td>
                            <td>
                                {nodeCount.input}
                            </td>
                        </tr>
                        {
                            (() => {
                                const res = [];
                                for(let i = 1; i <= amountOfHiddenLayers; i++){
                                    res.push(
                                        <tr key={i}>
                                            <td>Hidden layer {i}</td>
                                            <td>
                                                {nodeCount[i]}
                                            </td>
                                        </tr>
                                    );
                                }
                                return res;
                            })()
                        }
                        <tr>
                            <td>Output</td>
                            <td>
                                {nodeCount.output}
                            </td>
                        </tr>
                    </tbody>
                </Table>

                <Form.Label>Input layer</Form.Label>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Node #</th>
                            <th>Input</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (() => {
                                const res = [];
                                for(let i = 1; i <= nodeCount.input; i++){
                                    res.push(
                                        <tr key={i}>
                                            <td>Node {i}</td>
                                            <td>
                                                {inputs[i].label}
                                            </td>
                                        </tr>
                                    );
                                }
                                return res;
                            })()
                        }
                    </tbody>
                </Table>

                <Form.Label>Output layer</Form.Label>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Node #</th>
                            <th>Output</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (() => {
                                const res = [];
                                for(let i = 1; i <= nodeCount.output; i++){
                                    res.push(
                                        <tr key={i}>
                                            <td>Node {i}</td>
                                            <td>
                                                {outputs[i].label}
                                            </td>
                                        </tr>
                                    );
                                }
                                return res;
                            })()
                        }
                    </tbody>
                </Table>

                </>}

                <Button variant="primary" type="submit">
                    {model ? "Save" : "Create"}
                </Button>

                {model && <Button style={{marginLeft : "10%"}} variant="danger" onClick={() => {
                    deleteModel(dispatch, model._id);
                    history.push("/dashboard/models");
                }}>
                    Delete
                </Button>}
            </Form>
}