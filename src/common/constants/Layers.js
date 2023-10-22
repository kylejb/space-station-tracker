const Constants = {
    BUTTON_TEXT_CANCEL: 'Cancel',
    BUTTON_TEXT_DELETE: 'Delete',
    BUTTON_TEXT_GOTO: 'Go To',
    BUTTON_TEXT_NO: 'No',
    BUTTON_TEXT_OK: 'OK',
    BUTTON_TEXT_SAVE: 'Save',
    BUTTON_TEXT_YES: 'Yes',
    GEOMETRY_POINT: 'point',
    GEOMETRY_POLYGON: 'polygon',
    GEOMETRY_POLYLINE: 'polyline',
    GEOMETRY_UNKNOWN: 'unknown',
    /**
     * Base URL for WMT application images. (Do not use a relative path.)
     */
    IMAGE_PATH: "assets/images/",
    //
    // Layer categories
    //
    LAYER_CATEGORY_BACKGROUND: "Background",
    LAYER_CATEGORY_BASE: "Base",
    LAYER_CATEGORY_DATA: "Data",
    LAYER_CATEGORY_EFFECT: "Effect",
    LAYER_CATEGORY_OVERLAY: "Overlay",
    LAYER_CATEGORY_WIDGET: "Widget",
    //
    // Layer Names
    //
    LAYER_NAME_ATMOSPHERE: "Atmosphere",
    LAYER_NAME_COMPASS: "Compass",
    LAYER_NAME_MARKERS: "Markers",
    LAYER_NAME_TACTICAL_SYMBOLS: "Tactical Symbols",
    LAYER_NAME_RETICLE: "Crosshairs",
    LAYER_NAME_SKY: "Sky",
    LAYER_NAME_STARS: "Stars",
    LAYER_NAME_TIME_ZONES: "Time Zones",
    LAYER_NAME_VIEW_CONTROLS: "Controls",
    LAYER_NAME_WEATHER: "Weather Scouts",
    LAYER_NAME_WIDGETS: "Widgets",
    MAP_SYMBOL_ALTITUDE_WEATHER: 500,
    MARKER_LABEL_LATLON: "markerLabelLatLon",
    MARKER_LABEL_NAME: "markerLabelName",
    MARKER_LABEL_NONE: "markerLabelNone",
    MARKER_LABEL_PLACE: "markerLabelPlace",
    /**
     * The maximum range that the globe can be zoomed out to.
     * @default 40,000,000 meters.
     */
    NAVIGATOR_MAX_RANGE: 40000000,
    PROJECTION_NAME_3D: "3D",
    PROJECTION_NAME_EQ_RECT: "Equirectangular",
    PROJECTION_NAME_MERCATOR: "Mercator",
    PROJECTION_NAME_NORTH_POLAR: "North Polar",
    PROJECTION_NAME_SOUTH_POLAR: "South Polar",
    PROJECTION_NAME_NORTH_UPS: "North UPS",
    PROJECTION_NAME_SOUTH_UPS: "South UPS",
    PROJECTION_NAME_NORTH_GNOMONIC: "North Gnomic",
    PROJECTION_NAME_SOUTH_GNOMONIC: "South Gnomic",
    /**
     * The local storage key for markers.
     */
    STORAGE_KEY_MARKERS: "markers",
    STORAGE_KEY_TACTICAL_SYMBOLS: "tactical_symbols",
    STORAGE_KEY_WEATHER_SCOUTS: "weather_scouts",
    /**
     * The URL for the weather REST service.
     */
    WEATHER_REST_SERVICE: "https://emxsys.net/wmt-rest/rs/weather",
    WEATHER_SCOUT_LABEL_LATLON: "weatherScoutLabelLatLon",
    WEATHER_SCOUT_LABEL_NAME: "weatherScoutLabelName",
    WEATHER_SCOUT_LABEL_NONE: "weatherScoutLabelNone",
    WEATHER_SCOUT_LABEL_PLACE: "weatherScoutLabelPlace",
}

export default Constants;
