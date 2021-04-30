import WorldWind from 'worldwindjs';

// TODO - complete MVP logic for layers
export default class EnhancedAtmosphereLayer extends WorldWind.AtmosphereLayer {
    constructor(url) {
        super(url);

        this.opacity = 0.7;
    }
}
