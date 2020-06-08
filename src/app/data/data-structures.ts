interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface CurrentData {
    coord: {
        lon: number;
        lat: number;
    }
    weather: Weather[];
    base: string;
    main: {
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
        temp_min: number;
        temp_max: number;
    }
    visibility: number;
    wind: {
        speed: number;
        deg: number;
    }
    clouds: {
        all: number;
    }
    rain: {
        _1h: string;
        _3h: string;
    };
    snow: {
        _1h: string;
        _3h: string;
    }
    dt: number;
    sys: {
        type: number;
        id: number;
        message: string;
        country: string;
        sunrise: number;
        sunset: number;
    }
    timeZone: number;
    id: number;
    name: string;
    cod: number;
    dateSunrise: Date;
    dateSunset: Date;
    rain_bool_1h: boolean;
    rain_bool_3h: boolean;
    snow_bool_1h: boolean;
    snow_bool_3h: boolean;
}

export interface PreviousData {

}

interface Hourly {
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    clouds: number;
    wind_speed: number;
    wind_deg: number;
    weather: Weather[]
    time: Date;
}

interface Daily {

}

export interface FutureData {
    lat: number;
    lon: number;
    timeZone: string;
    timeZoneOffset: number;
    hourly: Hourly[];
    daily: Daily[];
}