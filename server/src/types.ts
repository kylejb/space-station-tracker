import { DateTime } from 'luxon';

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
