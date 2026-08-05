// Implementation of Actionscript point class: https://airsdk.dev/reference/actionscript/3.0/flash/geom/Point.html

export default class Point {

    public x: Number | undefined;
    public y: Number | undefined;
    
    constructor(x?: Number, y?:Number) {

        if(x === undefined) this.x = 0;
        if(y === undefined) this.y = 0;

        this.x = x;
        this.y = y
    }
}