import WorldWind from 'worldwindjs';

// TODO - complete MVP logic for layers
export default class EnhancedAtmosphereLayer extends WorldWind.AtmosphereLayer {
    constructor(url, opacityValue = 0.1) {
        super(url);

        this.opacity = opacityValue;
    }
}
