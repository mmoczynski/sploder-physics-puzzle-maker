import DataManifest from "./dataManifest";
import Point from "./point";

export default class ModelObjectProperties {

    /*** Array of verticies for object**/
    protected _vertices:Array<Point> = [];

    protected _custom_texture:string = "";

    protected _attribs:TextureAttributes;
    
    public toString ():any {
    
        var m:Array<string> = DataManifest.modelObjectPropertiesProps;
        var p:Array<any> = [];
        var v:Array<any>;
        
        for (var i = 0; i < m.length; i++) {
            
            if (m[i] == "vertices") {
                if (this._vertices) {
                    v = [];
                    for (var j = 0; j < this._vertices.length; j++) {
                        v.push(DataManifest.pointToString(this._vertices[j]));
                    }
                    p.push(v.join(","));
                } else {
                    p.push("");
                }
            } else if (m[i] == "custom_texture") {
                p.push((this._custom_texture != null) ? this._custom_texture : "");
            } else {
                if (this[m[i]] instanceof String && DataManifest.stringMap.indexOf(this[m[i]]) != -1) {
                    p.push(DataManifest.stringMap.indexOf(this[m[i]]));
                } else if (this[m[i]] instanceof Boolean) {
                    p.push(this[m[i]] ? 1 : 0);
                } else {
                    p.push(this[m[i]]);
                }
            }
            
        }

        return p.join(";");
    }

    public fromString (data:String):void {
			
        if (data == null || data == "") return;
        
        var m:Array<string> = DataManifest.modelObjectPropertiesProps;
        var p:Array<any> = data.split(";");
        var v:Array<any>;
        var pt:Array<any>;
        
        for (var i = 0; i < p.length; i++) {
            
            if (m[i] == "vertices") {
                
                if (String(p[i]).length) {
                    
                    v = String(p[i]).split(",");
                    if (this._vertices == null) this._vertices = new Array<Point>();
                    
                    var j = v.length;
                    
                    while (j--) {
                        this._vertices.unshift(DataManifest.stringToPoint(v[j]))
                    }
                    
                }
                
            } else if (m[i] == "custom_texture") {
                
                this._custom_texture = "";
                if (p[i] != null && p[i] instanceof String && String(p[i]).length > 0) 
                {
                    this._custom_texture = String(p[i]);
                    this._attribs = new TextureAttributes().initWithData(this._custom_texture);
                }
                
            } else {
                
                if (this[m[i]] instanceof String && DataManifest.stringMap.length > parseInt(p[i])) {
                    this[m[i]] = DataManifest.stringMap[parseInt(p[i])];
                } else if (this[m[i]] instanceof Boolean) {
                    this[m[i]] = (parseInt(p[i]) == 1);
                } else {
                    this[m[i]] = p[i];
                }
                
            }
            
        }
			
			//dispatchEvent(new Event(Event.CHANGE));

	}
}