export interface CurrentData {
    coord: {
        lon: number;
        lat: number;
    }
    weather: [{
        id: number;
        main: string;
        description: string;
        icon: string;
    }];
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
    dt: number;
    sys: {
        type: number;
        id: number;
        message: string;
        country: string;
        sunrise: number;
        sunset: number;
    }
    id: number;
    name: string;
    cod: number;
    dateSunrise: Date;
    dateSunset: Date;
}

export interface PreviousData {

}

export interface FutureData {
    
}