/**
* ...
* @author Default
* @version 0.1
* Ported by @mmoczynski
*
* Original: https://github.com/neurofuzzy/sploder-platformer/blob/master/client/fuz2d/util/as
* 
*/

/**
 * Get red component of color integer
 * @param {Number} color - Unsigned Integer 
 * @returns 
 */

export function getRedComponent (color) {
    return color >> 16;
}

export function getGreenComponent (color) {
    return color >> 8 & 0xff;
}

export function getBlueComponent (color) {
    return color & 0xff;
}

export function getRedOffset (tintColor, amount) {
    var tintRed = getRedComponent(tintColor);
    return tintRed * amount;
}

export function getGreenOffset (tintColor, amount) {
    var tintGreen = getGreenComponent(tintColor);
    return tintGreen * amount;
}

export function getBlueOffset (tintColor, amount) {
    var tintBlue = getBlueComponent(tintColor);
    return tintBlue * amount;
}

export function getTintedColor (baseColor, tintColor, amount) {
		
    var red = getRedComponent(baseColor);
    var green = getGreenComponent(baseColor);
    var blue = getBlueComponent(baseColor);
    
    var tintRed = getRedComponent(tintColor);
    var tintGreen = getGreenComponent(tintColor);
    var tintBlue = getBlueComponent(tintColor);
    
    return (red + (tintRed - red) * amount) << 16 | (green + (tintGreen - green) * amount) << 8 | (blue + (tintBlue - blue) * amount);
    
}

export function getInverseColor (baseColor) {
        
    var red = getRedComponent(baseColor);
    var green = getGreenComponent(baseColor);
    var blue = getBlueComponent(baseColor);
    
    return (255 - red) << 16 | (255 - green) << 8 | (255 - blue);
    
}

export function getBrightness (color) {
            
    var redLevel = getRedComponent(color);
    var greenLevel = getGreenComponent(color);
    var blueLevel = getBlueComponent(color);
    
    return Math.floor((redLevel + greenLevel + blueLevel) / 3);
    
}

export function getSaturatedColor (color, amount) {
            
    amount = amount / 100;

    var redLevel = getRedComponent(color) / 255;
    var greenLevel = getGreenComponent(color) / 255;
    var blueLevel = getBlueComponent(color) / 255;

    var red = interpolate(0.5, redLevel, amount) * 255;
    var green = interpolate(0.5, greenLevel, amount) * 255;
    var blue = interpolate(0.5, blueLevel, amount) * 255;
    
    return (red) << 16 | (green) << 8 | (blue);
    
}

export function interpolate (luma, comp, t) {
    return Math.min(1, Math.max(0, luma + (comp - luma) * t));
}

export function numberToHTMLColor (col) {
    var c = col.toString(16);
    while (c.length < 6) c = "0" + c;
    return "#" + c;
}

export function HTMLColorToNumber (html) {
    return parseInt("0x" + html.split("#").join("").split("0x").join(""), 16);
}