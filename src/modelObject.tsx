

// Example: 4#140:80#0:0#0#0#6;100;100;;11;17;21;0;31;-1;0;10040064;13395456;0;3;1;0;0;0;0;0;0;$

import DataManifest from "./dataManifest";
import ModelObjectProperties from "./modelObjectProperties";
import Point from "./point";

export default class ModelObject {

    /*
    * Numeric ID for the specific object
    */
    public localID:Number;

    /**
     * Numeric ID for identifiying the category the entity fits in.
     */
    public groupID:Number;

    public origin:Point;
    public pin:Point;
    public rotation:Number;

    public props:ModelObjectProperties;

    constructor(localID: Number, origin:Point, pin:Point, rotation:Number, groupID: Number) {
        this.localID = localID;
        this.groupID = groupID;

        this.origin = origin;
        this.pin = pin;
        this.rotation = rotation;

        this.props = new ModelObjectProperties();
    }


    static fromString(str: string) {

        let v:Array<string> = str.split("#");

        var o = new ModelObject(
            parseInt(v[0]),
            DataManifest.stringToPoint(v[1], new Point()),
            DataManifest.stringToPoint(v[2], new Point()),
            parseFloat(v[3]),
            parseInt(v[4]),
        );

        o.props.fromString(v[5]);

        return o;

    }




}

/** 
{
    var v:Array = data.split("#");
    
    _clip.suspend();
    var localID:int = parseInt(v[0]);

    DataManifest.stringToPoint(v[1], _origin);
    DataManifest.stringToPoint(v[2], _pin);
    _rotation = parseInt(v[3]);
    _groupID = parseInt(v[4]),
    _props.fromString(v[5]);
    _state = STATE_IDLE;
    _clip.release();
    
    update();
    
    return localID;
    
}
**/