// Importing react libraries. These statements exist only for development and are ignorned by Webpack because they are marked as externals.
import React, {useEffect, useRef, useState } from 'react';
import { Container, createRoot } from 'react-dom/client';
import ModelObject from './modelObject';
import ColorGamut from './gamut';

import * as creatorUIStates from './creatorUIStates';
import { TrayCollection } from './tray';


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


function generateStyleObj(arg) {
    return { backgroundImage: "url(" + "images/icons/" + arg + ".svg" + ")" }
}

function TabOption({tabState, setTabState, tabStateID}) {
    return (
        <div className={ tabState === tabStateID ? "tab-option selected" : "tab-option"} style={ generateStyleObj(tabStateID) } onClick={ () => setTabState(tabStateID) }>
        </div>
    )
}


/**
 * The `submenuStateID` parameter is what the value of what the `stateSetterForSubmenu` will be.
 */

function SubmenuOption({submenuStateID, stateSetterForSubmenu, submenuStateSetter}) {

    function f() {
        submenuStateSetter("");
        stateSetterForSubmenu(submenuStateID);
    }

    return <div className="shape-menu-option" style={generateStyleObj(submenuStateID)} onClick={f}></div>
}

function LevelBar() {

    // State for tabs
    var [tabState, setTabState] = useState(creatorUIStates.TOOL_DRAW);

    // Menu for submenu that is being selected
    var [submenuState, setSubmenuState] = useState("");

    // States for submenu dropdowns
    var [shapeMenuState, setShapeMenuState] = useState(creatorUIStates.SHAPE_CIRCLE);
    var [movementMenuState, setMovementMenuState] = useState(null);
    var [materialMenuState, setMaterialMenuState] = useState(null);
    var [strengthMenuState, setStrengthMenuState] = useState(null);

    return (

        <div className="levelbar">
            <div className="tabs">
                <TabOption tabState={tabState} setTabState={setTabState} tabStateID={creatorUIStates.TOOL_DRAW}></TabOption> 
                <TabOption tabState={tabState} setTabState={setTabState} tabStateID={creatorUIStates.TOOL_SELECT}></TabOption>
                <TabOption tabState={tabState} setTabState={setTabState} tabStateID={creatorUIStates.TOOL_WINDOW}></TabOption>
                <TabOption tabState={tabState} setTabState={setTabState} tabStateID={creatorUIStates.TOOL_PAINT}></TabOption>
                <TabOption tabState={tabState} setTabState={setTabState} tabStateID={creatorUIStates.TOOL_PICK}></TabOption>
            </div>
            <div className="containers">
                <div className={tabState === creatorUIStates.TOOL_DRAW ? "container new" : "container new hidden"}>

                    <div className="new-shape-menu">
                        
                        <div className="menu-icon" style={generateStyleObj(shapeMenuState)} onClick={ () => setSubmenuState("new-shape-menu") }></div>

                        <div className={ submenuState === "new-shape-menu" ? "menu-options" : "menu-options hidden"}>
                            <SubmenuOption submenuStateSetter={setSubmenuState} submenuStateID={creatorUIStates.SHAPE_CIRCLE} stateSetterForSubmenu={setShapeMenuState}></SubmenuOption>
                            <SubmenuOption submenuStateSetter={setSubmenuState} submenuStateID={creatorUIStates.SHAPE_SQUARE} stateSetterForSubmenu={setShapeMenuState}></SubmenuOption>
                            <SubmenuOption submenuStateSetter={setSubmenuState} submenuStateID={creatorUIStates.SHAPE_BOX} stateSetterForSubmenu={setShapeMenuState}></SubmenuOption>
                            <SubmenuOption submenuStateSetter={setSubmenuState} submenuStateID={creatorUIStates.SHAPE_RAMP} stateSetterForSubmenu={setShapeMenuState}></SubmenuOption>
                            <SubmenuOption submenuStateSetter={setSubmenuState} submenuStateID={creatorUIStates.SHAPE_PENT} stateSetterForSubmenu={setShapeMenuState}></SubmenuOption>
                            <SubmenuOption submenuStateSetter={setSubmenuState} submenuStateID={creatorUIStates.SHAPE_HEX} stateSetterForSubmenu={setShapeMenuState}></SubmenuOption>
                            <SubmenuOption submenuStateSetter={setSubmenuState} submenuStateID={creatorUIStates.SHAPE_POLY} stateSetterForSubmenu={setShapeMenuState}></SubmenuOption>
                        </div>

                    </div>

                    <div className="movement-menu">

                        <div className="menu-icon" style={generateStyleObj(creatorUIStates.MOVEMENT_FREE)} onClick={ () => setSubmenuState("movement-menu")} ></div>

                        <div className={ submenuState === "movement-menu" ? "menu-options" : "menu-options hidden"}>
                            <div className="shape-menu-option" style={generateStyleObj(creatorUIStates.MOVEMENT_FREE)}></div>
                            <div className="shape-menu-option" style={generateStyleObj(creatorUIStates.MOVEMENT_PIN)}></div>
                            <div className="shape-menu-option" style={generateStyleObj(creatorUIStates.MOVEMENT_SLIDE)}></div>
                            <div className="shape-menu-option" style={generateStyleObj(creatorUIStates.MOVEMENT_STATIC)}></div>
                        </div>

                    </div>  
                    <div className="material-menu">

                        <div className="menu-icon" style={generateStyleObj(creatorUIStates.MATERIAL_WOOD)} onClick={ () => setSubmenuState("material-menu")}></div>

                        <div className={ submenuState === "material-menu" ? "menu-options" : "menu-options hidden"}>
                            <div className="shape-menu-option" style={generateStyleObj(creatorUIStates.MATERIAL_WOOD)}></div>
                            <div className="shape-menu-option" style={generateStyleObj(creatorUIStates.MATERIAL_STEEL)}></div>
                            <div className="shape-menu-option" style={generateStyleObj(creatorUIStates.MATERIAL_ICE)}></div>
                            <div className="shape-menu-option" style={generateStyleObj(creatorUIStates.MATERIAL_RUBBER)}></div>
                            <div className="shape-menu-option" style={generateStyleObj(creatorUIStates.MATERIAL_GLASS)}></div>
                            <div className="shape-menu-option" style={generateStyleObj(creatorUIStates.MATERIAL_TIRE)}></div>
                            <div className="shape-menu-option" style={generateStyleObj(creatorUIStates.MATERIAL_AIR_BALLOON)}></div>
                            <div className="shape-menu-option" style={generateStyleObj(creatorUIStates.MATERIAL_HELIUM_BALLOON)}></div>
                            <div className="shape-menu-option" style={generateStyleObj(creatorUIStates.MATERIAL_MAGNET)}></div>
                            <div className="shape-menu-option" style={generateStyleObj(creatorUIStates.MATERIAL_SUPERBALL)}></div>
                        </div>

                    </div>
                    <div className="strength-menu">

                        <div className="menu-icon" style={generateStyleObj(creatorUIStates.STRENGTH_PERM)} onClick={ () => setSubmenuState("strength-menu")}></div>

                        <div className={ submenuState === "strength-menu" ? "menu-options" : "menu-options hidden"}>
                            <div className="shape-menu-option" style={generateStyleObj(creatorUIStates.STRENGTH_PERM)}></div>
                            <div className="shape-menu-option" style={generateStyleObj(creatorUIStates.STRENGTH_STRONG)}></div>
                            <div className="shape-menu-option" style={generateStyleObj(creatorUIStates.STRENGTH_MEDIUM)}></div>
                            <div className="shape-menu-option" style={generateStyleObj(creatorUIStates.STRENGTH_WEAK)}></div>
                        </div>

                    </div>
                </div>
                <div className={tabState === creatorUIStates.TOOL_SELECT ? "container select" : "container select hidden"}>
                    <div className="button">Playfield</div>
                    <div className="button">Background</div>
                    <div className="button">Goals</div>
                </div>
                <div className={tabState === creatorUIStates.TOOL_WINDOW ? "container window" : "container window hidden"}>
                    <div className="button">Playfield</div>
                    <div className="button">Background</div>
                    <div className="button">Goals</div>
                </div>
                <div className={tabState === creatorUIStates.TOOL_PAINT ? "container paint" : "container paint hidden"}></div>
                <div className={tabState === creatorUIStates.TOOL_PICK ? "container pick" : "container pick hidden"}></div>
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