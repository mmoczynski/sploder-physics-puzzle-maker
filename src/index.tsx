// Importing react libraries. These statements exist only for development and are ignorned by Webpack because they are marked as externals.
import React, { useRef, useState } from 'react';
import { Container, createRoot } from 'react-dom/client';
import ModelObject from './modelObject';

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

function LevelBar() {

    var [targetActionState, setTargetActionState] = useState(null);

    function generateClosure(arg) {
        return function() {
            setTargetActionState(arg);
        }
    }

    function checkStateValue(arg) {
        if(targetActionState === arg) {
            return "tab-option selected"
        }

        else {
            return "tab-option"
        }
    }

    return (

        <div className="levelbar">
            <div className="tabs">
                <div className={checkStateValue("new")} onClick={generateClosure("new")}>N</div>
                <div className={checkStateValue("select")} onClick={generateClosure("select")}>S</div>
                <div className={checkStateValue("multi")} onClick={generateClosure("multi")}>M</div>
                <div className={checkStateValue("appearance")} onClick={generateClosure("appearance")}>A</div>
                <div className={checkStateValue("sample")} onClick={generateClosure("sample")}>P</div>
            </div>
        </div>
    );
}


const root = createRoot(document.getElementById('root') as Container);

  -
root.render(
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
                <canvas width="800" height="600" id="level-canvas"></canvas>
            </div>
        </div>
        <div className="modal-screen">
            <div className="modal">
                <h2 className="modal-title"></h2>
                <div className="modal-body"></div> 
            </div>
        </div>
    </div>
);