import { Component, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
    template: `
        {{ text }}
    `,
})
export class GenderRenderComponent implements ViewCell {
    @Input() value: any;    // This hold the cell value
    @Input() rowData: any;  // This holds the entire row object

    text: any;

    ngOnInit(): void {
        if(this.value == 0) {
            this.text = 'Nam';
        }
        else {
            this.text = 'Nữ';
        }
    }
}