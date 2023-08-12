"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const parseComment = (commentFromRequest) => {
    if (!isString(commentFromRequest)) {
        throw new Error('Incorrect or missing comment from request');
    }
    return commentFromRequest;
};
const parseDate = (dateFromRequest) => {
    if (!isDate(dateFromRequest))
        throw new Error('Invalid or missing date from request');
    return dateFromRequest;
};
const isDate = (dateFromRequest) => {
    return Boolean(Date.parse(dateFromRequest));
};
const isString = (string) => {
    return typeof string === 'string';
};
const parseWeather = (weatherFromRequest) => {
    if (!isString(weatherFromRequest) || !isWeather(weatherFromRequest))
        throw new Error('Invalid or missing weather from request');
    return weatherFromRequest;
};
const parseVisibility = (visibilityFromRequest) => {
    if (!isString(visibilityFromRequest) || !isWeather(visibilityFromRequest))
        throw new Error('Invalid or missing visibility from request');
    return visibilityFromRequest;
};
const isWeather = (weatherFromRequest) => {
    return Object.values(types_1.Weather).includes(weatherFromRequest);
};
const toNewDiaryEntry = (object) => {
    const newEntry = {
        comment: parseComment(object.comment),
        date: parseDate(object.date),
        weather: parseWeather(object.weather),
        visibility: parseVisibility(object.visibility)
    };
    return newEntry;
};
exports.default = toNewDiaryEntry;
