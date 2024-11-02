import { DateTime } from 'luxon';

import type geoMap from './data/geoMap.json';

export interface IChannelItem {
    description: string;
    guid: string;
    pubDate: string;
    title: string;
}
interface IChannel {
    title: string;
    link: string;
    description: string;
    language: string;
    pubDate: string;
    lastBuildDate: string;
    managingEditor: string;
    webMaster: string;
    item: IChannelItem[];
}
interface IRSS {
    channel: IChannel;
}
export interface SpotTheStationResponse {
    rss: IRSS;
}

export interface ICleanData {
    approachDeg: string;
    approachDir: string;
    date: DateTime | string; // TODO: rework
    departureDeg: string;
    departureDir: string;
    duration: string;
    maxElevation: string;
    time: string;
}

export interface ObservationPoint {
    latitude: number;
    longitude: number;
    city: string;
}

export type ValidCountry = keyof typeof geoMap;

export type ValidState<Country extends ValidCountry> = Country extends keyof typeof geoMap
    ? keyof (typeof geoMap)[Country]
    : never;

export type GeoMap = Readonly<{
    [country in ValidCountry]: {
        [state in ValidState<country>]: ReadonlyArray<ObservationPoint>;
    };
}>;
