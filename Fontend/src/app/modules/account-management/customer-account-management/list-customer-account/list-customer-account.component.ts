import { Component, OnInit } from '@angular/core';
import { CustomerAccountManagementService } from '../customer-account-management.service';
import { DateRenderComponent } from '../../../../_helpers/date-render.component';
import { GenderRenderComponent } from '../../../../_helpers/gender-render.component';
import { SelectEmployeeComponent } from '../select-status/select-status.component';
import { ToastrService } from '../../../../_helpers/toastrService';
import { NbDialogService } from '@nebular/theme';
import { CreateCustomerAccountComponent } from '../create-customer-account/create-customer-account.component';

@Component({
  selector: 'ngx-list-customer',
  styleUrls: ['./list-customer-account.component.scss'],
  templateUrl: './list-customer-account.component.html',
})
export class ListCustomerComponent implements OnInit {
  constructor(
    private toastrService: ToastrService,
		private customerAccountManagementService: CustomerAccountManagementService,
    private dialogService: NbDialogService,
	) { }

  loading = false;
  source: any;

	ngOnInit(): void {
    this.listCustomer();
	}

  settings = {
    columns: {
      sort_order: {
        title: 'STT',
        type: 'number',
        filter: false,
        width: '3%',
      },
      first_name: {
        title: 'Họ và Tên',
        type: 'string',
        width: '17%',
        sort: true,
        filter: true
      },
      phone_number: {
        title: 'Số điện thoại',
        type: 'string',
        width: '15%',
        sort: true,
        filter: true
      },
      email: {
        title: 'Email',
        type: 'string',
        width: '15%',
        sort: true,
        filter: true
      },
      date_of_birth: {
        title: 'Ngày sinh',
        type: 'custom',
        width: '10%',
        renderComponent: DateRenderComponent,
        filter: true
      },
      female: {
        title: 'Giới tính',
        type: 'custom',
        width: '7%',
        renderComponent: GenderRenderComponent,
        sort: true,
        filter: true
      },
      address: {
        title: 'Địa chỉ',
        type: 'string',
        width: '15%',
        filter: true
      },
      is_active: {
        title: 'Trạng thái',
        type: 'custom',
        width: '10%',
        renderComponent: SelectEmployeeComponent,
        sort: true,
        filter: false
      },
    },
    mode: 'external',
    actions: {
      columnTitle: '',
      add: false,
      edit: true,
      delete: true,
      position: 'right'
    },
    edit: {
      editButtonContent: '<i class="fa fa-edit"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="fa fa-trash-alt"></i>',
    },
    attr: {
      class: 'ng2-smart-table'
    }
  };

  listCustomer(){
    let params = [
      { key: 'offset', value: 1 },
      { key: 'limit', value: 100 }
    ];
    this.customerAccountManagementService.httpGetWithParams('listUser', params, (response) => {
      if (response.code == 200) {
        this.source = response.data;
        for(let i = 0; i < this.source.length; i ++ ){
          this.source[i].sort_order = i + 1;
          this.source[i].first_name = this.source[i].last_name +" " + this.source[i].first_name;
        }
      }
      else {
        console.log(response)
      }
    }, () => {
      this.loading = false;
    });
  }

  editCustomer(event: any) {
    this.dialogService.open(CreateCustomerAccountComponent, {
      context: {
        // account_id: this.account_id,
        phone: event.data.phone_number,
      },
      closeOnBackdropClick: true
    }).onClose.subscribe(data => {
      // this.getListUserBankAccount(this.source.from_account);
      // this.source.from_bank_account = data;
      this.listCustomer();
    });
  }
  
  createCustomer() {
    this.dialogService.open(CreateCustomerAccountComponent, {
      context: {
        phone: 0,
      },
      closeOnBackdropClick: true
    }).onClose.subscribe(data => {
      this.listCustomer();
    });
  }

  deleteCustomer(event: any) {
    this.loading = true;
    let body = {
      id: event.data.id
    }

    this.customerAccountManagementService.httpPost('deleteCustomer', body, (response) => {
    if (response.code == 200) {
      this.source = this.source.filter(item => item.id !== event.data.id);
      this.toastrService.showToast('success', 'Thành công!', '');
    }
    else {
      this.toastrService.showToast('danger', 'Lỗi!', response.data);
    }
    }, () => {
      this.loading = false;
    })
  }
}
