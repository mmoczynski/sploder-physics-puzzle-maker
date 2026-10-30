// Importing react libraries. These statements exist only for development and are ignorned by Webpack because they are marked as externals.
import React, {useEffect, useRef, useState } from 'react';
import { Container, createRoot } from 'react-dom/client';
import ModelObject from './modelObject';
import ColorGamut from './gamut';

import * as creatorUIStates from './creatorUIStates';


if(typeof globalThis === "object") {
    globalThis.ModelObject = ModelObject;
}

type EventStr = "levelBarObjectEdit";

const events = {

    levelBarObjectEdit: [],

    on: function(eventStr:EventStr, callback) {
        this.levelBarObjectEdit[eventStr].push(callback)
    },

    off: function(eventStr:EventStr, callback) {

        this.levelBarObjectEdit[eventStr].splice(
            this.levelBarObjectEdit[eventStr].indexOf(callback), 
            1
        );

    },

    call: function(eventStr:EventStr) {
        for(let i = 0; this.levelBarObjectEdit[eventStr].length; i++) {
            this.levelBarObjectEdit[eventStr]();
        }
    }

}

function MenuOption({innerText}) {
    return <div className="menu-option">{innerText}</div>
}

function LevelSelector() {
    return <div></div>
}

function AddLevel() {
    return <div></div>
}

function RemoveLevel() {
    return <div></div>
}

function Tray({children, hidden}) {
    return (
        <div className={"tray" + (hidden === "true" ? " hidden" : " shown")}> 
            <ul className="tray-contents">
                {children}
            </ul>
        </div>
    )
}

function TrayItem({name}) {
    return <li>{name}</li>
}

interface TrayItemDefinition {
    title: string
}

interface TrayDefinition {

    /*** Name that will appear in left bar */
    title: string,
    items: Array<TrayItemDefinition>
}

const trayDefinitions:Array<TrayDefinition> = [

    {
        title: "Prefabs",
        items: [
            { title : "Player" },
            { title : "Baddie" },
            { title : "Platform" },
            { title : "Coin" },
            { title : "Spikes" },
            { title : "ExtraLife" },
            { title : "KeyDoor" },
            { title : "Ship" },
            { title : "Turret" },
            { title : "Robot" },
            { title : "Balloon" },
            { title : "TurretCar" }
        ]
    },

    {
        title: "Physics",
        items: [
            { title:"Motor" },
            { title:"Bouncer" },
            { title:"PinJoint" },
            { title:"Groove" },
            { title:"Spring-T" },
            { title:"Spring-L" },
            { title:"GearJoint" }
        ]
    },

    {
        title: "Controls",
        items: [
            { title: "Rotator" },
            { title: "Mover" },
            { title: "Slider" },
            { title: "Jumper" },
            { title: "Arcade Mover" },
            { title: "Selector" },
            { title: "Adder" },
            { title: "Launcher" },
            { title: "Aimer" },
            { title: "Dragger" },
            { title: "Thruster" },
            { title: "Clicker" }
        ]
    },

    {
        title: "Widgets",
        items: [
            { title: "Elevator" },
            { title: "Spawner" },
            { title: "Connect" },
            { title: "Factory" },
            { title: "EventLink" },
            { title: "Switcher" },
            { title: "E-Magnet" },
            { title: "Pointer" },
            { title: "Propeller" }
        ]
    }

];

function TrayCollection() {
    
    var [state, setState] = useState(0);

    // Closure for index
    function clickGen(index) {
        return function() {
            setState(index);
            //alert(index);
        }
    }
   
    return(
        <div className="tray-collection col left">
            <ul className="tray-tabs">
                {
                    trayDefinitions.map(function(trayDefinition, index){
                        return <div onClick={clickGen(index)} className="tray-name">{trayDefinition.title}</div>
                    })
                }
            </ul>
            <div className="tray-containers">
                {

                    // Interate through tray definitions to create elements for each using Array.map method
                    trayDefinitions.map(function(trayDefinition, index){

                        let s:string;

                        // Set class for tray depending on selection state
                        if(index === state) {
                            s = "shown tray"    
                        }

                        else {
                            s = "hidden tray"
                        }

                        return (
                            <ul className={s}>
                                {trayDefinition.items.map(function(trayItemDefinition){
                                    return <li>{trayItemDefinition.title}</li>
                                })}
                            </ul>
                        )
                    })
                }
            </div>
        </div>
    );
}

function LevelBarTab({parentState, setParentState, stateStr}) {

    let styleObj = {
        backgroundImage: "url(" + "images/icons/" + stateStr + ".svg" + ")"
    }

    return (
        <div className={parentState === stateStr ? "tab-option selected" : "tab-option"} onClick={ () => setParentState(stateStr) } style={styleObj}></div>
    )
}

/**
 * Submenu Option
 * @param param0 
 * @returns
 */

function SubmenuOption({setParentState, stateStr}) {

    let styleObj = {
        backgroundImage: "url(" + "images/icons/" + stateStr + ".svg" + ")"
    }

    return (
        <div onClick={() => setParentState(stateStr)} className="shape-menu-option" style={styleObj}></div>
    )
}

function LevelBarSubmenu({menuName, children}) {

    var [isOpenState, setIsOpenState] = useState(false);
    var [optionState, setOptionState] = useState(children[0]);

    var submenuOptions = (            
        <div className={isOpenState ? "menu-options" : "menu-options hidden"}>
            {
                children.map(function(str){
                    return <SubmenuOption setParentState={setOptionState} stateStr={str}></SubmenuOption>
                })
            }
        </div>
    ) 

    let styleObj = {
        backgroundImage: "url(" + "images/icons/" + optionState + ".svg" + ")"
    }

    function handleSubmenuClick(event) {
        setIsOpenState(!isOpenState)
    }

    return(                    
        <div className={menuName} onClick={handleSubmenuClick}>
            <div className="menu-icon" style={styleObj}></div>   
            {submenuOptions}
        </div>
    )
}

function LevelBar() {

    var [currentTabState, setTabState] = useState(creatorUIStates.TOOL_DRAW);

    return (

        <div className="levelbar">
            <div className="tabs">
                <LevelBarTab parentState={currentTabState} setParentState={setTabState} stateStr={creatorUIStates.TOOL_DRAW}></LevelBarTab>
                <LevelBarTab parentState={currentTabState} setParentState={setTabState} stateStr={creatorUIStates.TOOL_SELECT}></LevelBarTab>
                <LevelBarTab parentState={currentTabState} setParentState={setTabState} stateStr={creatorUIStates.TOOL_WINDOW}></LevelBarTab>
                <LevelBarTab parentState={currentTabState} setParentState={setTabState} stateStr={creatorUIStates.TOOL_PAINT}></LevelBarTab>
                <LevelBarTab parentState={currentTabState} setParentState={setTabState} stateStr={creatorUIStates.TOOL_PICK}></LevelBarTab>
            </div>
            <div className="containers">
                <div className={currentTabState === creatorUIStates.TOOL_DRAW ? "container new" : "container new hidden"}>
                    <LevelBarSubmenu menuName="new-shape-menu">
                        {[
                            creatorUIStates.SHAPE_CIRCLE,
                            creatorUIStates.SHAPE_SQUARE,
                            creatorUIStates.SHAPE_BOX,
                            creatorUIStates.SHAPE_RAMP,
                            creatorUIStates.SHAPE_PENT,
                            creatorUIStates.SHAPE_HEX,
                            creatorUIStates.SHAPE_POLY
                        ]}
                    </LevelBarSubmenu>
                    <LevelBarSubmenu menuName="motion-menu">
                        {[
                            creatorUIStates.MOVEMENT_FREE,
                            creatorUIStates.MOVEMENT_PIN,
                            creatorUIStates.MOVEMENT_SLIDE,
                            creatorUIStates.MOVEMENT_STATIC
                        ]}
                    </LevelBarSubmenu>
                    <LevelBarSubmenu menuName="material">
                        {[ 
                            creatorUIStates.MATERIAL_WOOD,
                            creatorUIStates.MATERIAL_STEEL,
                            creatorUIStates.MATERIAL_ICE,
                            creatorUIStates.MATERIAL_RUBBER,
                            creatorUIStates.MATERIAL_GLASS,
                            creatorUIStates.MATERIAL_TIRE,
                            creatorUIStates.MATERIAL_AIR_BALLOON,
                            creatorUIStates.MATERIAL_HELIUM_BALLOON,
                            creatorUIStates.MATERIAL_MAGNET,
                            creatorUIStates.MATERIAL_SUPERBALL
                        ]}
                    </LevelBarSubmenu>
                    <LevelBarSubmenu menuName="material">
                        {[ 
                            creatorUIStates.STRENGTH_PERM,
                            creatorUIStates.STRENGTH_STRONG,
                            creatorUIStates.STRENGTH_MEDIUM,
                            creatorUIStates.STRENGTH_WEAK
                        ]}
                    </LevelBarSubmenu>
                </div>
                <div className={currentTabState === creatorUIStates.TOOL_SELECT ? "container select" : "container select hidden"}>
                    <div className="button">Playfield</div>
                    <div className="button">Background</div>
                    <div className="button">Goals</div>
                </div>
                <div className={currentTabState === creatorUIStates.TOOL_WINDOW ? "container window" : "container window hidden"}>
                    <div className="button">Playfield</div>
                    <div className="button">Background</div>
                    <div className="button">Goals</div>
                </div>
                <div className={currentTabState === creatorUIStates.TOOL_PAINT ? "container paint" : "container paint hidden"}></div>
                <div className={currentTabState === creatorUIStates.TOOL_PICK ? "container pick" : "container pick hidden"}></div>
            </div>
        </div>
    );
}


const game = {

    levels: [

        {
            objects: [
                ModelObject.fromString("1#200:220#0:0#0#0#6;200;200;;11;17;21;0;31;-1;0;6749952;13382400;0;3;1;0;0;0;0;0;0;$"),
                ModelObject.fromString("21#130:100#0:0#0#0#6;140;140;;11;17;21;0;31;-1;0;10040064;13395456;0;3;1;0;0;0;0;0;0;"),
                ModelObject.fromString("22#470:90#0:0#0#0#6;60;60;;11;17;21;0;31;-1;0;10040064;13395456;0;3;1;0;0;0;0;0;0;"),
                ModelObject.fromString("23#270:290#0:0#0#0#6;60;60;;11;17;21;0;31;-1;0;10040064;13395456;0;3;1;0;0;0;0;0;0;$")
            ],

            topColor: "blue",

            bottomColor: "#00007f"
        }
    ]

}


function handleCanvasClick(event) {
    alert(event.target);
}

function EditorCanvas() {

    // Reference to canvas
    var canvasRef:{current:(HTMLCanvasElement|null)} = useRef(null);

    // Code to run after canvas renders in react
    useEffect(function(){

        let canvas = canvasRef.current;

        if(canvas instanceof HTMLCanvasElement) {

            let ctx = canvas.getContext("2d");

            if(ctx instanceof CanvasRenderingContext2D) {
                setInterval(function() {

                    ctx.clearRect(0,0, canvas.width, canvas.height);

                    // Background gradient

                    let grad = ctx.createLinearGradient(
                        canvas.width / 2, 
                        0, 
                        canvas.width / 2,
                        canvas.height
                    );

                    let level = game.levels[0];

                    grad.addColorStop(0, level.topColor);
                    grad.addColorStop(1, level.bottomColor);

                    ctx.fillStyle = grad;
                    ctx.fillRect(0,0,canvas.width,canvas.height);


                    for(let i = 0; i < level.objects.length; i++) {

                        // Draw Circle

                        ctx.beginPath();

                        let radius = 0;

                        let o = level.objects[i];

                        if(typeof radius === "number") {
                            radius = Number.parseInt(o.props.width) / 2;
                        }

                        // Fill Color

                        let colorStr = "#" + parseInt(o.props.color, 10).toString(16)
                        ctx.fillStyle = colorStr;

                        // Stroke Color
                        ctx.strokeStyle = "#" + parseInt(o.props.line).toString(16);

                        ctx.arc(
                            o.origin.x as number,
                            o.origin.y as number,
                            radius,
                            0,
                            2 * Math.PI
                        );

                        ctx.closePath();
                        ctx.fill();
                        ctx.stroke();
                    }


                },16.6)
            }

            else {
                alert("Fatal error");
                throw "Null canvas rendering context";
            }

        }

        else {
            alert("Fatal error");
            throw "Null canvas reference";
        }


        //console.log(canvasRef.current);

    }, []);

    return (
        <canvas ref={canvasRef} onClick={handleCanvasClick} width="800" height="600" id="level-canvas"></canvas>
    );
}

function Editor() {
    return (
        <div className="creator">     
            <div className="filebar">
                <div className="file-menu">
                    <MenuOption innerText="New" />
                    <MenuOption innerText="Load"/>
                    <MenuOption innerText="Save"/>
                    <MenuOption innerText="Save As" />
                    <MenuOption innerText="Test" />
                    <MenuOption innerText="Publish" />
                </div> 
                <LevelSelector />
                <AddLevel />
                <RemoveLevel />
            </div>
            <div className="leveleditor">
                <TrayCollection>
                </TrayCollection>
                <div className="col right">
                    <LevelBar/>
                    <EditorCanvas></EditorCanvas>
                </div>
            </div>
            <ColorGamut></ColorGamut>
            <div className="modal-screen">
                <div className="modal">
                    <h2 className="modal-title"></h2>
                    <div className="modal-body"></div> 
                </div>
            </div>
        </div>
    )
}

// Render React Elements
const root = createRoot(document.getElementById('root') as Container);
root.render(<Editor></Editor>);