import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from '../../../../_helpers/toastrService';
import { CustomerAccountManagementService } from '../customer-account-management.service';

@Component({
  selector: 'ngx-select-status',
  templateUrl: './select-status.component.html',
  styleUrls: ['./select-status.component.scss']
})
export class SelectEmployeeComponent implements OnInit {
  status_id: number = null;
  loading: boolean;
  listStatus: any = [];
  show_select: boolean; 

  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object

  optionsSelect = {
    placeholder: "Chọn trạng thái",
    width: "100%",
    height: "100%"
  }

  employee_index: number;
  label: string;

  constructor(
    private toastrService: ToastrService,
    private customerAccountManagementService: CustomerAccountManagementService     
  ) { }

  ngOnInit(): void {
    this.listStatus = [
      {
        id: 'true',
        text: 'Kích hoạt'
      },
      {
        id: 'false',
        text: 'Chưa kích hoạt'
      }
    ];
    this.status_id = this.value;
  }

  onChangeStatus(event) {
    if(event != this.value) {
      this.deActivateBiker(event);
    }
  }

  deActivateBiker(event) {
    this.loading = true;
    let body = {
      id: this.rowData.id,
    }

    this.customerAccountManagementService.httpPost('deActivateCustomer', body, (response) => {
    if (response.code == 200) {
      this.toastrService.showToast('success', 'Thành công!', '');
    }
    else {
      this.toastrService.showToast('danger', 'Lỗi!', response.data);
    }
    }, () => {
      this.loading = false;
    })
  }

  setColor(index) {
    switch (index) {
      case 1:
          this.label = 'one';
          break;
      case 2:
          this.label = 'two';
          break;
      case 3:
          this.label = 'three';
          break;
      case 4:
          this.label = 'four';
          break;
      case 5:
        this.label = 'five';
        break;
      case 6:
        this.label = 'six';
        break;
      case 7:
        this.label = 'seven';
        break;
      case 8:
        this.label = 'eight';
        break;
      case 9:
        this.label = 'nine';
        break;
      case 10:
        this.label = 'ten';
        break;
      }
  }

}
