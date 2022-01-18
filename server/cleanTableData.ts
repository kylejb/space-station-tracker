import { DateTime } from 'luxon';

import { IChannelItem, ICleanData } from './types';

const FILTER_BY_DEGREES_GREATER_THAN = 20;
const FILTER_BY_DURATION_GREATER_THAN = 1; // in minutes
const LIMIT_BY_N_DAYS = 14;

// TODO: Replace with .toISODate()
const bareDate = (dateObject: Date): DateTime => {
    const yearMonthDateArray = dateObject.toISOString().split('T')[0].split('-');
    const [year, month, day] = yearMonthDateArray;
    return DateTime.utc(parseInt(year, 10), parseInt(month, 10), parseInt(day, 10));
};

// TODO: Refactor
const shouldIncludeSightingCard = (
    bareSightingCardDate: DateTime,
    limitByNumOfDays = LIMIT_BY_N_DAYS,
): boolean => {
    const fromDate = DateTime.now().toUTC();
    const toDate = fromDate.plus({ day: limitByNumOfDays });

    // bareDate scrubs time to simplify consistency when calculating range
    const bareFromDate = bareDate(fromDate.toJSDate());
    const bareToDate = bareDate(toDate.toJSDate()).plus({ day: 1 });

    const result =
        bareFromDate.toMillis() <= bareSightingCardDate.toMillis() &&
        bareSightingCardDate.toMillis() <= bareToDate.toMillis();

    return result;
};

const prepareDateForClient = (sightingRecordDate: DateTime): string => {
    return sightingRecordDate.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY).replace(',', '');
};

// TODO: Refactor date handling for UI
const filterTableData = (cleanData: ICleanData[]): ICleanData[] => {
    return cleanData
        ?.filter(
            (rowObj: any) =>
                shouldIncludeSightingCard(rowObj.date) &&
                parseInt(rowObj.maxElevation, 10) >= FILTER_BY_DEGREES_GREATER_THAN &&
                parseInt(rowObj.duration[0], 10) >= FILTER_BY_DURATION_GREATER_THAN,
        )
        .map((sightingRecord: any) => ({
            ...sightingRecord,
            date: prepareDateForClient(sightingRecord.date),
        }));
};

export const cleanTableData = (rawData: IChannelItem | IChannelItem[] | null): ICleanData[] => {
    if (!rawData) {
        return [] as ICleanData[];
    }
    //TODO Refactor - make if statement into reusable helper function
    if (!Array.isArray(rawData)) {
        const htmlString = rawData.description.trim();
        const rowArray = htmlString.split('<br/>');
        const approachObj = rowArray[4].split(': ')[1].replace('&#176;', '°');
        // 'Departure: 10&#176; above NE &lt;br/&gt;'
        const departureObj = rowArray[5]
            .split(': ')[1]
            .replace('&lt;br/&gt;', '')
            .trim()
            .replace('&#176;', '°');

        const rowObj = {
            date: bareDate(new Date(rowArray[0].split(': ')[1])), // 'Date: Monday Mar 29, 2021'
            time: rowArray[1].split(': ')[1].trim(),
            duration: rowArray[2]
                .split(': ')[1]
                .replace(/minute/, 'min')
                .trim(),
            maxElevation: rowArray[3].split(': ')[1].split('&')[0],
            approachDir: approachObj.split('above')[1].trim(),
            approachDeg: approachObj.split(' ')[0].trim(),
            // 'Departure: 10&#176; above NE &lt;br/&gt;'
            departureDir: departureObj.split('above')[1].trim(),
            departureDeg: departureObj.split(' ')[0].trim(),
        };

        return filterTableData([rowObj]);
    }

    if (Array.isArray(rawData)) {
        const arrayOfHTMLStrings = rawData.map((issSighting) => issSighting.description.trim());
        const cleanData = [];
        for (const row of arrayOfHTMLStrings) {
            const rowArray = row.split('<br/>');
            const approachObj = rowArray[4].split(': ')[1].replace('&#176;', '°');
            // 'Departure: 10&#176; above NE &lt;br/&gt;'
            const departureObj = rowArray[5]
                .split(': ')[1]
                .replace('&lt;br/&gt;', '')
                .trim()
                .replace('&#176;', '°');

            const rowObj = {
                date: bareDate(new Date(rowArray[0].split(': ')[1])), // 'Date: Monday Mar 29, 2021'
                time: rowArray[1].split(': ')[1].trim(),
                duration: rowArray[2]
                    .split(': ')[1]
                    .replace(/minute/, 'min')
                    .trim(),
                maxElevation: rowArray[3].split(': ')[1].split('&')[0],
                approachDir: approachObj.split('above')[1].trim(),
                approachDeg: approachObj.split(' ')[0].trim(),
                // 'Departure: 10&#176; above NE &lt;br/&gt;'
                departureDir: departureObj.split('above')[1].trim(),
                departureDeg: departureObj.split(' ')[0].trim(),
            };
            cleanData.push(rowObj);
        }
        return filterTableData(cleanData);
    }
    return [] as ICleanData[];
};
