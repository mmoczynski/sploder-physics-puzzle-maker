import { numberToHTMLColor } from "./colorTools";

function createGamutArray() {
    var colors:Array<number> = [];
    var r;
    var g;
    var b;
    var bw;

    colors.push(0);

    for (bw = 0; bw <= 0xff; bw += 0x11) {
        colors.push(bw << 16 | bw << 8 | bw);
    }

    for (b = 0; b <= 0xff; b += 0x33) {
        for (r = 0; r <= 0x66; r += 0x33) {
            for (g = 0; g <= 0xff; g += 0x33) {
            colors.push(r << 16 | g << 8 | b);
            }				
        }
    }

    for (b = 0; b <= 0xff; b += 0x33) {
        for (r = 0x99; r <= 0xff; r += 0x33) {
            for (g = 0; g <= 0xff; g += 0x33) {
                colors.push(r << 16 | g << 8 | b);
            }				
        }
    }

    return colors;
}

var colors = createGamutArray();

var hexCodes = colors.map(function(n){
  return numberToHTMLColor(n.toString(16));
})

function ColorGamut() {

    var html = hexCodes.map(function(s){
        return <div style={{background: s}} className="color-square"></div>;
    });

    return (
        <div className="gamut">
            <div className="color-square no-color"></div>
            {html}
        </div>
    )
}

export default ColorGamut;