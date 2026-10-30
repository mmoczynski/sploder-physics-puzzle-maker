// Importing react libraries. These statements exist only for development and are ignorned by Webpack because they are marked as externals.
import React, {useEffect, useRef, useState } from 'react';
import { Container, createRoot } from 'react-dom/client';
import ModelObject from './modelObject';
import ColorGamut from './gamut';


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

function LevelBarTab({parentState, setParentState, stateStr, innerText}) {
    return (
        <div className={parentState === stateStr ? "tab-option selected" : "tab-option"} onClick={ () => setParentState(stateStr) }>
            {innerText}
        </div>
    )
}

function LevelBar() {

    var [targetActionState, setTargetActionState] = useState("new");

    return (

        <div className="levelbar">
            <div className="tabs">
                <LevelBarTab parentState={targetActionState} setParentState={setTargetActionState} stateStr="new" innerText="N"></LevelBarTab>
                <LevelBarTab parentState={targetActionState} setParentState={setTargetActionState} stateStr="select" innerText="S"></LevelBarTab>
                <LevelBarTab parentState={targetActionState} setParentState={setTargetActionState} stateStr="multi" innerText="M"></LevelBarTab>
                <LevelBarTab parentState={targetActionState} setParentState={setTargetActionState} stateStr="appearance" innerText="A"></LevelBarTab>
                <LevelBarTab parentState={targetActionState} setParentState={setTargetActionState} stateStr="sample" innerText="P"></LevelBarTab>
            </div>
            <div className="containers">
                <div className="container new">
                    <div className="new-shape-menu">
                        <div className="menu-icon">X</div>
                        <div className="menu-options hidden">
                            <div className="shape-menu-option circle">C</div>
                            <div className="shape-menu-option square">S</div>
                            <div className="shape-menu-option rectangle">R</div>
                            <div className="shape-menu-option right-triangle">T</div>
                            <div className="shape-menu-option right-pentagon">P</div>
                            <div className="shape-menu-option right-hexagon">H</div>
                            <div className="shape-menu-option polygon">P</div>
                        </div>
                    </div>
                    <div className="motion-menu">
                        <div className="menu-icon">Y</div>
                        <div className="menu-options hidden">
                            <div className="motion-menu-option regular">R</div>
                            <div className="motion-menu-option circular">C</div>
                            <div className="motion-menu-option no-rotate">N</div>
                            <div className="motion-menu-option fixed">F</div>
                        </div> 
                    </div>
                    <div className="material-menu">
                        <div className="menu-icon">Z</div>
                        <div className="menu-options hidden">
                            <div className="material-menu-option wood">W</div>
                            <div className="material-menu-option steel">S</div>
                            <div className="material-menu-option ice">I</div>
                            <div className="material-menu-option rubber">R</div>
                            <div className="material-menu-option glass">G</div>
                            <div className="material-menu-option tire">T</div>
                            <div className="material-menu-option air-balloon">A</div>
                            <div className="material-menu-option helium-balloon">H</div>
                            <div className="material-menu-option magnet">M</div>
                            <div className="material-menu-option superball">S</div>
                        </div>
                    </div>
                    <div className="strength-menu">
                        <div className="menu-icon">A</div>
                        <div className="menu-options hidden">
                            <div className="motion-menu-option perm">P</div>
                            <div className="motion-menu-option strong">S</div>
                            <div className="motion-menu-option medium">M</div>
                            <div className="motion-menu-option weak">W</div>
                        </div>
                    </div>
                </div>
                <div className="container select"></div>
                <div className="container multi"></div>
                <div className="container appearance"></div>
                <div className="container sample"></div>
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