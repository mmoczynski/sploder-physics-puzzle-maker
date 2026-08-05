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



function TrayCollection() {
    
    var [state, setState] = useState(0);

    function clickGen(index) {
        return function() {
            setState(index);
            alert(index);
        }
    }
    
    return(
        <div className="tray-collection col left">
            <ul className="tray-tabs">
                <li onClick={clickGen(0)}>Prefabs</li>
                <li onClick={clickGen(1)}>Physics</li>  
                <li onClick={clickGen(2)}>Controls</li>
                <li onClick={clickGen(3)}>Widgets</li>
            </ul>
            <div className="tray-containers">
                <Tray hidden={state === 0 ? "true" : "false"}>
                    <TrayItem name="Player"/>
                    <TrayItem name="Baddie"/>
                    <TrayItem name="Platform"/>
                    <TrayItem name="Coin"/>
                    <TrayItem name="Spikes"/>
                    <TrayItem name="ExtraLife"/>
                    <TrayItem name="KeyDoor"/>
                    <TrayItem name="Ship"/>
                    <TrayItem name="Turret"/>
                    <TrayItem name="Robot"/>
                    <TrayItem name="Balloon"/>
                    <TrayItem name="TurretCar"/>
                </Tray>
                <Tray hidden={state === 1 ? "true" : "false"}>
                    <TrayItem name="Motor"/>
                    <TrayItem name="Bouncer"/>
                    <TrayItem name="PinJoint"/>
                    <TrayItem name="Groove"/>
                    <TrayItem name="Spring-T"/>
                    <TrayItem name="Spring-L"/>
                    <TrayItem name="GearJoint"/>
                </Tray>
                <Tray hidden={state === 2 ? "true" : "false"}>
                    <TrayItem name="Rotator"/>
                    <TrayItem name="Mover"/>
                    <TrayItem name="Slider"/>
                    <TrayItem name="Jumper"/>
                    <TrayItem name="Arcade Mover"/>
                    <TrayItem name="Selector"/>
                    <TrayItem name="Adder"/>
                    <TrayItem name="Launcher"/>
                    <TrayItem name="Aimer"/>
                    <TrayItem name="Dragger"/>
                    <TrayItem name="Thruster"/>
                    <TrayItem name="Clicker"/>
                </Tray>
                <Tray hidden={state === 3 ? "true" : "false"}>
                    <TrayItem name="Elevator"/>
                    <TrayItem name="Spawner"/>
                    <TrayItem name="Connect"/>
                    <TrayItem name="Factory"/>
                    <TrayItem name="EventLink"/>
                    <TrayItem name="Switcher"/>
                    <TrayItem name="E-Magnet"/>
                    <TrayItem name="Pointer"/>
                    <TrayItem name="Propeller"/>
                </Tray>
            </div>
        </div>
    );
}

function LevelBar() {
    return <div></div>
}


const root = createRoot(document.getElementById('root') as Container);


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