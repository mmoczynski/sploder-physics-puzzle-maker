//package com.sploder.texturegen_internal

//import com.sploder.texturegen_internal.util.ColorTools;
//import com.sploder.texturegen_internal.util.PM_PRNG;
//import haxe.Serializer;
//import haxe.Unserializer;

class TextureAttributes {

    public static TYPE_BRICK:String = "brick";
    public static TYPE_STONE:String = "stone";
    public static geometryAttribs:Array<string> = ["seed", "type", "tilesU", "tilesV", "offsetU", "offsetV", "interleave", "skipFactor", "isVertical", "bricksA", "bricksB", "bricksFactorA", "bricksFactorB", "courses", "coursingOffset", "coursingABFactor", "bevelAmount", "mortarAmount", "perturbFactor", "perturbAngle"];
    public static renderingAttribs:Array<string> = ["rseed", "lightColor", "lightAngle", "shadowColor", "depthColor", "highlightColor", "gradientRadial", "bevelRatio", "lightFactor", "depthFactor", "roundFactor", "overExposure", "contrastPower", "blurAmount", "noiseFactor", "noiseScale", "reducedColors", "ditherMode"];
    
    public ditherMode:number;
    public reducedColors:number;
    public noiseScale:number;
    public noiseFactor:number;
    public blurAmount:number;
    public contrastPower:number;
    public overExposure:number;
    public roundFactor:number;
    public depthFactor:number;
    public lightFactor:number;
    public bevelRatio:number;
    public bevelAmount:number;
    public gradientRadial:Boolean;
    public mortarColor:number;
    public highlightColor:number;
    public depthColor:number;
    public shadowColor:number;
    public lightAngle:number;
    public lightColor:number;
    public diffuseColor:number;
    public rseed:number;
    public perturbAngle:number;
    public perturbFactor:number;
    public mortarAmount:number;
    public coursingABFactor:number;
    public coursingOffset:number;
    public courses:number;
    public bricksFactorB:number;
    public bricksFactorA:number;
    public bricksB:number;
    public bricksA:number;
    public isVertical:Boolean;
    public skipFactor:number;
    public interleave:Boolean;
    public offsetV:number;
    public offsetU:number;
    public tilesV:number;
    public tilesU:number;
    public type:String;
    public seed:number;
    
    public get spliceThreshold():number
    {
        return this.get_spliceThreshold();
    }
    
    protected set spliceThreshold(__v:number):void
    {
        this.$spliceThreshold = __v;
    }
    protected $spliceThreshold:number;
    
    public TextureAttributes():void
    {
    }
    
    public get_spliceThreshold():number
    {
        if (isNaN(this.tilesU))
            return 0;
        return Math.floor(Math.min(48, Math.floor(128 / this.tilesU)));
    }
    
    public init():any
    {
        this.initFromSeed(1, 1);
        return this;
    }
    
    public initWithData(data:string|null = null):any
    {
        if (data != null && data.length > 0)
            this.unserialize(data);
        else
            this.initFromSeed(1, 1);
        return this;
    }
    
    public initFromSeed(geometrySeed:number = 0, renderingSeed:number = 1):any
    {
        var rand:PM_PRNG;
        if (geometrySeed > 0)
        {
            this.seed = geometrySeed;
            rand = new PM_PRNG().initWithSeed(this.seed);
            this.type = ((rand.nextDouble() < 0.5) ? "brick" : "stone");
            rand = new PM_PRNG().initWithSeed(this.seed);
            rand.nextDouble();
            this.tilesU = rand.nextIntRange(2, 5);
            this.tilesV = rand.nextIntRange(2, 5);
            this.offsetU = this.offsetV = 0;
            this.interleave = rand.nextDouble() > 0.5;
            this.skipFactor = ((rand.nextDouble() > 0.7) ? 0.1 : rand.nextDouble() * 0.4);
            rand = new PM_PRNG().initWithSeed(this.seed);
            this.isVertical = rand.nextDouble() > 0.4;
            this.bricksA = rand.nextIntRange(0, 6);
            this.bricksB = rand.nextIntRange(0, 6);
            this.bricksFactorA = ((rand.nextDouble() > 0.5) ? 0.5 : rand.nextIntRange(0, 2) * 0.25 + 0.25);
            this.bricksFactorB = ((rand.nextDouble() > 0.5) ? 0.5 : rand.nextIntRange(0, 2) * 0.25 + 0.25);
            this.courses = rand.nextIntRange(1, 8);
            this.coursingOffset = ((rand.nextDouble() > 0.5) ? 0.5 : ((rand.nextDouble() > 0.5) ? 0 : rand.nextIntRange(0, 3) * 0.25));
            this.coursingABFactor = ((rand.nextDouble() > 0.5) ? 0.5 : ((rand.nextDouble() > 0.5) ? 0.25 : 0.25 + rand.nextIntRange(0, 2) * 0.25));
            rand = new PM_PRNG().initWithSeed(this.seed);
            var p_threshold:number = ((this.type == "brick") ? 0.75 : 0.25);
            this.perturbFactor = ((rand.nextDouble() > p_threshold) ? rand.nextDouble() * (1.5 - p_threshold) : 0);
            this.perturbAngle = ((this.perturbFactor > 0) ? rand.nextDoubleRange(0, Math.PI * 2) : 0);
            this.bevelAmount = Math.min(100, rand.nextIntRange(0, 120));
            this.mortarAmount = ((rand.nextDouble() > 0.5) ? 0 : rand.nextIntRange(0, 8));
        }
        if (renderingSeed == 1)
        {
            this.lightColor = 16777215;
            this.lightAngle = 315;
            this.shadowColor = 51;
            this.depthColor = 0;
            this.highlightColor = 0;
            this.bevelRatio = 255;
            this.lightFactor = 0.75;
            this.depthFactor = 0.25;
            this.roundFactor = 0;
            this.overExposure = 0;
            this.contrastPower = 0;
            this.blurAmount = 0;
            this.noiseFactor = 0;
            this.noiseScale = 1;
            this.reducedColors = 8;
            this.ditherMode = 0;
            this.diffuseColor = 6710886;
            this.mortarColor = 0;
        }
        else if (renderingSeed > 0)
        {
            this.rseed = renderingSeed;
            rand = new PM_PRNG().initWithSeed(this.rseed);
            this.lightColor = ColorTools.hsv2hex(rand.nextIntRange(0, 360), 20, 100);
            this.lightAngle = 315;
            this.shadowColor = ((rand.nextDouble() < 0.5) ? 0 : ColorTools.hsv2hex(rand.nextIntRange(0, 360), 80, 25));
            this.depthColor = ((rand.nextDouble() < 0.5) ? 0 : ColorTools.hsv2hex(rand.nextIntRange(0, 360), 80, 25));
            this.highlightColor = ((rand.nextDouble() < 0.5) ? 0 : ColorTools.hsv2hex(rand.nextIntRange(0, 360), 80, 50));
            this.gradientRadial = rand.nextDouble() < 0.5;
            this.bevelRatio = ((rand.nextDouble() < 0.5) ? 255 : rand.nextIntRange(1, 255));
            this.lightFactor = rand.nextDouble();
            this.depthFactor = rand.nextDouble();
            this.roundFactor = rand.nextDouble();
            this.overExposure = ((rand.nextDouble() < 0.5) ? 0 : rand.nextDouble());
            this.contrastPower = rand.nextIntRange(0, 10) / 5;
            this.blurAmount = ((rand.nextDouble() < 0.75) ? 0 : rand.nextIntRange(0, 36));
            this.noiseFactor = ((rand.nextDouble() < 0.5) ? 0 : rand.nextDouble() * 0.5);
            this.noiseScale = ((rand.nextDouble() < 0.5) ? 0 : rand.nextIntRange(1, 8));
            this.reducedColors = ((rand.nextDouble() < 0.25) ? 0 : rand.nextIntRange(1, 8) * 2);
            this.ditherMode = ((rand.nextDouble() < 0.5) ? 0 : rand.nextIntRange(1, 33));
            this.diffuseColor = ColorTools.hsv2hex(rand.nextIntRange(0, 360), rand.nextIntRange(0, 100), rand.nextIntRange(20, 75));
            this.mortarColor = ((rand.nextDouble() < 0.5) ? 0 : ColorTools.hsv2hex(rand.nextIntRange(0, 360), 0, 60));
        }
        return this;
    }
    
    public randomize():void
    {
        this.initFromSeed(Math.floor(Math.random() * 100000), Math.floor(Math.random() * 100000));
    }
    
    public unserialize(val:string):void
    {
        var obj:any = null;
        var attrib:string;
        var i;
        
        try
        {
            obj = JSON.parse(val);
        }
        catch (e:any)
        {
            console.trace("Unserializer error: " + e);
        }
        if (obj != null)
        {
            var g_attribs:Array<any> = obj["g"];
            var r_attribs:Array<any> = obj["r"];
            var diffuse_color:number = obj["c"];
            var mortar_color:number = obj["c2"];
            
            if (g_attribs != null && r_attribs != null)
            {
                this.initFromSeed(g_attribs[0], r_attribs[0]);
                
                for (i = 0; i < g_attribs.length; i++)
                {
                    attrib = TextureAttributes.geometryAttribs[i];
                    this[attrib] = g_attribs[i];
                }
                
                for (i = 0; i < r_attribs.length; i++)
                {
                    attrib = TextureAttributes.renderingAttribs[i];
                    this[attrib] = r_attribs[i];
                    
                }
                
                if (!isNaN(diffuse_color))
                    this.diffuseColor = diffuse_color;
                if (!isNaN(mortar_color))
                    this.mortarColor = mortar_color;
            }
        }
    }
    
    public serialize():String
    {
        var g_attribs:Array<any> = [];
        var r_attribs:Array<any> = [];
        var attrib:string;
        var default_attribs:TextureAttributes = new TextureAttributes().initFromSeed(this.seed, this.rseed);
        var geometry_tweaked:Boolean = false;
        var rendering_tweaked:Boolean = false;
        var i;
        
        for (i = 0; i < TextureAttributes.geometryAttribs.length; i++)
        {
            attrib = TextureAttributes.geometryAttribs[i];
            g_attribs.push(this[attrib]);
            if (!geometry_tweaked && this[attrib] != default_attribs[attrib])
                geometry_tweaked = true;
        }
        
        for (i = 0; i < TextureAttributes.renderingAttribs.length; i++)
        {
            attrib = TextureAttributes.renderingAttribs[i];
            r_attribs.push(this[attrib]);
            if (!rendering_tweaked && this[attrib] != default_attribs[attrib])
                rendering_tweaked = true;
        }
            
        if (!geometry_tweaked)
            g_attribs = [this.seed];
        if (!rendering_tweaked)
            r_attribs = [this.rseed];
            
        var obj:any = {g: g_attribs, r: r_attribs, c: this.diffuseColor, c2: this.mortarColor}
        return JSON.stringify(obj);
    }
    
    public copy():TextureAttributes
    {
        var new_attribs:TextureAttributes = new TextureAttributes();
        var attrib:string;
        var i;
        
        for (i = 0; i < TextureAttributes.geometryAttribs.length; i++)
        {
            attrib = TextureAttributes.geometryAttribs[i];
            new_attribs[attrib] = this[attrib];
        }

        for (i = 0; i < TextureAttributes.renderingAttribs.length; i++)
        {
            attrib = TextureAttributes.renderingAttribs[i];
            new_attribs[attrib] = this[attrib];
        }
        
        new_attribs.diffuseColor = this.diffuseColor;
        new_attribs.mortarColor = this.mortarColor;
        return new_attribs;
    }
}

