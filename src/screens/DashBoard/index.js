import React from 'react';
import Overview from './Overview'
import ModelTemplates from './ModelTemplates/index'
import ModelTemplateConfiguration from './ModelTemplates/Configuration'
import Models from './Models'
import ModelConfiguration from './Models/Configuration'
import Trades from './Trading/Trades'
import Trading from './Trading'
import ATEConfiguration from './Trading/ATEs/Configuration'
import ATEs from './Trading/ATEs'
import SidePanel from 'components/SidePanel/index.js'
import {
  Route,
  useHistory
} from "react-router-dom";
import { Badge } from 'react-bootstrap';

const screenW = window.screen.availWidth;
const screenH = window.screen.availHeight;

// returns DashBoard distributor component
export default function DashBoard(props){
    return <div>
        <Route exact path={"/dashboard"}
            component={() => <Wrapper active={"Dashboard"}><Overview/></Wrapper>}
        />


        <Route exact path={"/dashboard/model_templates"} 
            component={() => <Wrapper active={"ModelTemplates"}><ModelTemplates/></Wrapper>}
        />
        <Route path={"/dashboard/model_templates/edit/:id"}
            component={() => <Wrapper><ModelTemplateConfiguration {...props}/></Wrapper>}
        />
        <Route exact path={"/dashboard/model_templates/create"}
            component={() => <Wrapper active={"+ Create model template"}><ModelTemplateConfiguration/></Wrapper>}
        />


        <Route exact path={"/dashboard/models"} 
            component={() => <Wrapper active={"Models"}><Models/></Wrapper>}
        />
        <Route path={"/dashboard/models/edit/:id"}
            component={() => <Wrapper><ModelConfiguration {...props}/></Wrapper>}
        />
        <Route exact path={"/dashboard/models/create"}
            component={() => <Wrapper active={"+ Create model"}><ModelConfiguration/></Wrapper>}
        />


        <Route exact path={"/dashboard/trading"}
            component={() => <Wrapper active={"Trading"}><Trading/></Wrapper>}
        />
        <Route exact path={"/dashboard/trading/ates/create"}
            component={() => <Wrapper active={"+ Create ATE"}><ATEConfiguration/></Wrapper>}
        />
        <Route exact path={"/dashboard/trading/ates/edit/:id"}
            component={() => <Wrapper><ATEConfiguration/></Wrapper>}
        />
        <Route exact path={"/dashboard/trading/ates"}
            component={() => <Wrapper active={"ATE's"}><ATEs/></Wrapper>}
        />
        <Route exact path={"/dashboard/trading/trades"}
            component={() => <Wrapper active={"View trades"}><Trades/></Wrapper>}
        />

   </div>
}

// for testing
const testMenuContent = {
    items : [
        {
            title : "test1",
            onClick : () => {
                console.log("test1")
            },
            items : [
                {
                    title : "test1_1",
                    onClick : () => {
                        console.log("test1_1")
                    }
                },
                {
                    title : "test1_2"
                }
            ],
        },
        {
            title : "test2",
            items : [
                {
                    title : "test2_1"
                },
                {
                    title : "test2_2",
                    items : [
                        {
                            title : "test2_2_1",
                            onClick : () => {
                                console.log("test2_2_1")
                            }
                        }
                    ]
                },
                {
                    title : "test2_3"
                }
            ]
        }
    ]
};

// renders the children by the side of the sidepanel
function Wrapper(props){
    const history = useHistory();
    const menuContent = {
        active : props.active,
        items : [
            {
                title : "Dashboard",
                onClick : () => {
                    history.push("/dashboard")
                }
            },
            {
                title : "Model Templates",
                onClick : () => {
                    history.push("/dashboard/model_templates")
                },
                items : [
                    {
                        title : "+ Create model template",
                        onClick : () => {
                            history.push("/dashboard/model_templates/create")
                        }
                    }
                ]
            },
            {
                title : "Models",
                onClick : () => {
                    history.push("/dashboard/models")
                },
                items : [
                    {
                        title : "+ Create model",
                        onClick : () => {
                            history.push("/dashboard/models/create")
                        }
                    }
                ]
            },
            {
                title : "Trading",
                onClick : () => {
                    history.push("/dashboard/trading")
                },
                items : [
                    {
                        title : <>View trades <Badge variant="primary">Coming soon</Badge></>,
                    },
                    {
                        title : "ATE's",
                        onClick : () => {
                            history.push("/dashboard/trading/ates")
                        },
                        items : [
                            {
                                title : "+ Create ATE",
                                onClick : () => {
                                    history.push("/dashboard/trading/ates/create")
                                },
                            }
                        ]
                    }
                ]
            },
            {
                title : <>Analytics <Badge variant="primary">Coming soon</Badge></>
            },
            {
                title : <>Multimodels <Badge variant="primary">Coming soon</Badge></>,
                items : [
                    {
                        title : <div style={{fontSize : "0.9rem"}}>Create multimodel <Badge variant="primary">Coming soon</Badge></div>
                    }
                ]
            }
        ]
    };
    return <div height={{
        width : "100vw",
        overflow : "hidden"
    }}>
        <div style={{
            height : "100vh",
            width : screenW * 0.2,
            boxShadow : "0px 0px 1vw 0.1vw grey",
            paddingTop : screenH * 0.02,
            overflowY : "auto",
            display : "block",
            float : "left"
        }}>
            <SidePanel data={menuContent}/>
        </div>
        <div style={{
            left : screenW * 0.2,
            height : "100vh",
            width : "-webkit-fill-available",
            overflowY : "auto",
            display : "flex"
        }}>
            {props.children}
        </div>
    </div>
}