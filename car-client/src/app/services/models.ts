
export interface Car {
    color: string;
    make: string;
    model: string;
    vin: string;
    year: string;
}

export interface Page {
    data?: {
        cars: Array<Car>
    };
    meta?: {
        page: {
            offset: number;
            size: number;
        },
        totalElements: number;
        totalPages: number;
    };
    errors?: {
        code: string;
        datetime: {
            value: string;
            timezone: string;
        };
        path: string;
        reason: string;
        resourceId: string;
        rootCauses: []
    };
}

export interface Filter {
    page: {
        offset: any;
        size: any;
    };
    projections?: string;
    sort?: string;
    filter?: {
        make: string;
        vin: string;
    };
}
