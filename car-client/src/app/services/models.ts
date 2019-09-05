
export interface Car {
    color: string;
    make: string;
    model: string;
    vin: string;
    year: string;
}

export interface Page<T> {
    data?: {
        cars: Array<T>
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
