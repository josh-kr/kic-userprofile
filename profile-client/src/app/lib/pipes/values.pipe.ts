import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'values' })
export class ValuesPipe implements PipeTransform {
    transform(value): any {
        const values = [];
        for (const key in value) {
            if (value.hasOwnProperty(key)) {
                values.push(value[key].value);
            }
        }
        return values;
    }
}
