import WorldWind from 'worldwindjs';
import Constants from 'common/constants/Layers';

export default class EnhancedStarFieldLayer extends WorldWind.StarFieldLayer {
    constructor(url) {
        super(url);
        // WorldWind.StarFieldLayer.call(this, url);

        this.displayName = Constants.LAYER_NAME_STARS;

        this.sunEnabled = false;
        // Update the star and sun location based on the Globe's current time
        // globe.dateTime.subscribe(function (newDateTime) {
        //     if (self.sunEnabled) {
        //         self.time = newDateTime;
        //     } else {
        //         self.time = null;
        //     }
        // });
    };
}
