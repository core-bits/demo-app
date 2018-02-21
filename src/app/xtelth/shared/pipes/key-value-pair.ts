import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'mapToIterable' })
export class MapToIterablePipe implements PipeTransform {
    transform(m: any): Object[] {
        var arr: Object[] = [];
        for (var k in m) {
            if (m.hasOwnProperty(k)) {
                arr.push({ key: k, value: m[k] });
            }
        }
        return arr;
    }
}
