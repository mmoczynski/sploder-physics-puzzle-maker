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
        <div className={ tabState === tabStateID ? "tab-option selected" : "tab-option"} style={ generateStyleObj(tabStateID) } onClick={ () => setTabState({...tabState, tab: tabStateID}) }>
        </div>
    )
}


/**
 * The `submenuStateID` parameter is what the value of what the `stateSetterForSubmenu` will be.
 */

type SubmenuString = "shape" | "movement" | "material" | "strength" | "";

type SubmenuOptionArgs = {
    parentMenuID:SubmenuString, 
    submenuStateID: string, 
    levelBarStateSetter:Function,
    levelBarState
}

function SubmenuOption({parentMenuID, submenuStateID, levelBarStateSetter, levelBarState}:SubmenuOptionArgs) {

    function f() {
        levelBarStateSetter({
            ...levelBarState,
            [parentMenuID]: submenuStateID
        })

        console.log(levelBarState);
    }

    return <div className="shape-menu-option" style={generateStyleObj(submenuStateID)} onClick={f}></div>
}

function LevelBar() {

    /**
     * Object for traking state of level bar
     * The tab property is used to track if the user clicked on the draw, select, multiselect/window, paint and pick tool
     * The 
     * 
     * It uses braket notation for dynamic keys
     */

    var [state, setState] = useState({

        tab: creatorUIStates.TOOL_DRAW,
        currentSubmenu: "",

        // Draw tool submenus
        shape: creatorUIStates.SHAPE_CIRCLE,
        movement: creatorUIStates.MOVEMENT_FREE,
        material: creatorUIStates.MATERIAL_WOOD,
        strength: creatorUIStates.STRENGTH_PERM

    });

    return (

        <div className="levelbar">
            <div className="tabs">
                <TabOption tabState={state} setTabState={setState} tabStateID={creatorUIStates.TOOL_DRAW}></TabOption> 
                <TabOption tabState={state} setTabState={setState} tabStateID={creatorUIStates.TOOL_SELECT}></TabOption>
                <TabOption tabState={state} setTabState={setState} tabStateID={creatorUIStates.TOOL_WINDOW}></TabOption>
                <TabOption tabState={state} setTabState={setState} tabStateID={creatorUIStates.TOOL_PAINT}></TabOption>
                <TabOption tabState={state} setTabState={setState} tabStateID={creatorUIStates.TOOL_PICK}></TabOption>
            </div>
            <div className="containers">
                <div className={state.tab === creatorUIStates.TOOL_DRAW ? "container new" : "container new hidden"}>

                    <div className="submenu">
                        
                        <div className="menu-icon" style={generateStyleObj(state["shape"])} onClick={ () => setState({...state, currentSubmenu: "shape"}) }></div>

                        <div className={ state.currentSubmenu === "shape" ? "menu-options" : "menu-options hidden"}>
                            <SubmenuOption parentMenuID="shape" submenuStateID={creatorUIStates.SHAPE_CIRCLE} levelBarStateSetter={setState} levelBarState={state}></SubmenuOption>
                            <SubmenuOption parentMenuID="shape" submenuStateID={creatorUIStates.SHAPE_SQUARE} levelBarStateSetter={setState} levelBarState={state}></SubmenuOption>
                            <SubmenuOption parentMenuID="shape" submenuStateID={creatorUIStates.SHAPE_BOX} levelBarStateSetter={setState} levelBarState={state}></SubmenuOption>
                            <SubmenuOption parentMenuID="shape" submenuStateID={creatorUIStates.SHAPE_RAMP} levelBarStateSetter={setState} levelBarState={state}></SubmenuOption>
                            <SubmenuOption parentMenuID="shape" submenuStateID={creatorUIStates.SHAPE_PENT} levelBarStateSetter={setState} levelBarState={state}></SubmenuOption>
                            <SubmenuOption parentMenuID="shape" submenuStateID={creatorUIStates.SHAPE_HEX} levelBarStateSetter={setState} levelBarState={state}></SubmenuOption>
                            <SubmenuOption parentMenuID="shape" submenuStateID={creatorUIStates.SHAPE_POLY} levelBarStateSetter={setState} levelBarState={state}></SubmenuOption>
                        </div>

                    </div>

                    <div className="submenu">

                        <div className="menu-icon" style={generateStyleObj(state["movement"])} onClick={ () => setState({...state, currentSubmenu: "movement"}) }></div>

                        <div className={ state.currentSubmenu === "movement" ? "menu-options" : "menu-options hidden"}>
                            <SubmenuOption parentMenuID="movement" submenuStateID={creatorUIStates.MOVEMENT_FREE} levelBarStateSetter={setState} levelBarState={state}></SubmenuOption>
                            <SubmenuOption parentMenuID="movement" submenuStateID={creatorUIStates.MOVEMENT_PIN} levelBarStateSetter={setState} levelBarState={state}></SubmenuOption>
                            <SubmenuOption parentMenuID="movement" submenuStateID={creatorUIStates.MOVEMENT_SLIDE} levelBarStateSetter={setState} levelBarState={state}></SubmenuOption>
                            <SubmenuOption parentMenuID="movement" submenuStateID={creatorUIStates.MOVEMENT_STATIC} levelBarStateSetter={setState} levelBarState={state}></SubmenuOption>
                        </div>

                    </div>  
                    <div className="submenu">

                        <div className="menu-icon" style={generateStyleObj(state["material"])} onClick={ () => setState({...state, currentSubmenu: "material"}) }></div>

                        <div className={ state.currentSubmenu === "material" ? "menu-options" : "menu-options hidden"}>
                            <SubmenuOption parentMenuID="material" submenuStateID={creatorUIStates.MATERIAL_WOOD} levelBarStateSetter={setState} levelBarState={state}></SubmenuOption>
                            <SubmenuOption parentMenuID="material" submenuStateID={creatorUIStates.MATERIAL_STEEL} levelBarStateSetter={setState} levelBarState={state}></SubmenuOption>
                            <SubmenuOption parentMenuID="material" submenuStateID={creatorUIStates.MATERIAL_ICE} levelBarStateSetter={setState} levelBarState={state}></SubmenuOption>
                            <SubmenuOption parentMenuID="material" submenuStateID={creatorUIStates.MATERIAL_RUBBER} levelBarStateSetter={setState} levelBarState={state}></SubmenuOption>
                            <SubmenuOption parentMenuID="material" submenuStateID={creatorUIStates.MATERIAL_GLASS} levelBarStateSetter={setState} levelBarState={state}></SubmenuOption>
                            <SubmenuOption parentMenuID="material" submenuStateID={creatorUIStates.MATERIAL_TIRE} levelBarStateSetter={setState} levelBarState={state}></SubmenuOption>
                            <SubmenuOption parentMenuID="material" submenuStateID={creatorUIStates.MATERIAL_AIR_BALLOON} levelBarStateSetter={setState} levelBarState={state}></SubmenuOption>
                            <SubmenuOption parentMenuID="material" submenuStateID={creatorUIStates.MATERIAL_HELIUM_BALLOON} levelBarStateSetter={setState} levelBarState={state}></SubmenuOption>
                            <SubmenuOption parentMenuID="material" submenuStateID={creatorUIStates.MATERIAL_MAGNET} levelBarStateSetter={setState} levelBarState={state}></SubmenuOption>
                            <SubmenuOption parentMenuID="material" submenuStateID={creatorUIStates.MATERIAL_SUPERBALL} levelBarStateSetter={setState} levelBarState={state}></SubmenuOption>
                        </div>

                    </div>
                    <div className="submenu">

                        <div className="menu-icon" style={generateStyleObj(state["strength"])} onClick={ () => setState({...state, currentSubmenu: "strength"}) }></div>

                        <div className={ state.currentSubmenu === "strength" ? "menu-options" : "menu-options hidden"}>
                            <SubmenuOption parentMenuID="strength" submenuStateID={creatorUIStates.STRENGTH_PERM} levelBarStateSetter={setState} levelBarState={state}></SubmenuOption>
                            <SubmenuOption parentMenuID="strength" submenuStateID={creatorUIStates.STRENGTH_STRONG} levelBarStateSetter={setState} levelBarState={state}></SubmenuOption>
                            <SubmenuOption parentMenuID="strength" submenuStateID={creatorUIStates.STRENGTH_MEDIUM} levelBarStateSetter={setState} levelBarState={state}></SubmenuOption>
                            <SubmenuOption parentMenuID="strength" submenuStateID={creatorUIStates.STRENGTH_WEAK} levelBarStateSetter={setState} levelBarState={state}></SubmenuOption>
                        </div>

                    </div>
                </div>
                <div className={state.tab === creatorUIStates.TOOL_SELECT ? "container select" : "container select hidden"}>
                    <div className="button">Playfield</div>
                    <div className="button">Background</div>
                    <div className="button">Goals</div>
                </div>
                <div className={state.tab === creatorUIStates.TOOL_WINDOW ? "container window" : "container window hidden"}>
                    <div className="button">Playfield</div>
                    <div className="button">Background</div>
                    <div className="button">Goals</div>
                </div>
                <div className={state.tab === creatorUIStates.TOOL_PAINT ? "container paint" : "container paint hidden"}></div>
                <div className={state.tab === creatorUIStates.TOOL_PICK ? "container pick" : "container pick hidden"}></div>
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