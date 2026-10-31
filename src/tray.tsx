import React, {useEffect, useRef, useState } from 'react';


export function Tray({children, hidden}) {
    return (
        <div className={"tray" + (hidden === "true" ? " hidden" : " shown")}> 
            <ul className="tray-contents">
                {children}
            </ul>
        </div>
    )
}

export function TrayItem({name}) {
    return <li>{name}</li>
}

export interface TrayItemDefinition {
    title: string
}

export interface TrayDefinition {

    /*** Name that will appear in left bar */
    title: string,
    items: Array<TrayItemDefinition>
}

export const trayDefinitions:Array<TrayDefinition> = [

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

export function TrayCollection() {
    
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