import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from '../../../../_helpers/toastrService';
import { Options } from 'select2';
import { NbDialogRef } from '@nebular/theme';
import { CustomerAccountManagementService } from '../customer-account-management.service';

@Component({
  selector: 'ngx-create-customer-account',
  templateUrl: './create-customer-account.component.html',
  styleUrls: ['./create-customer-account.component.scss']
})
export class CreateCustomerAccountComponent implements OnInit {
  source: any = {};
  submitted: boolean = false;
  loading: boolean

  // @Input() account_id: number
  @Input() phone: number
  @Input() id: number
  //ng-select2
  listBankCompany: any = [];
  optionsSelect: any;
  bank_company: any = null;
  listGender = [
    {
      id: 'true',
      text: 'Nữ'
    },
    {
      id: 'false',
      text: 'Nam'
    }
  ];

  listStatus = [
    {
      id: 'true',
      text: 'Khích hoạt'
    },
    {
      id: 'false',
      text: 'Không kích hoạt'
    }
  ];
  constructor(
    private activatedRoute: ActivatedRoute,
    private customerAccountManagementService: CustomerAccountManagementService,
    private toastrService: ToastrService,
    private router: Router,
    protected ref: NbDialogRef<CreateCustomerAccountComponent>,
  ) { }

  ngOnInit(): void {

    this.optionsSelect = {
      placeholder: "ngân hàng",
      width: "100%",
      height: "100%"
    }

    if (this.phone) {
      this.getUser();
    }
  }

  onChangeBank(event) {
    this.source.bank_company = event;
  }

  getUser(): void {
    this.loading = true;
    let params = [{ key: 'phone', value: this.phone }];
    this.customerAccountManagementService.httpGetWithParams('getUser', params, (response) => {
      if (response.code == 200) {
        this.source = response.data[0];
        this.source.female = this.source.female.toString()
        console.log(this)
      }
      else {
        this.toastrService.showToast('danger', 'Lỗi!', response.data);
      }
    }, () => {
      this.loading = false;
    })
  }

  onSubmit(): void {
    this.submitted = true;
    this.loading = true;
    this.source.sort_order = 0;

    if (typeof (this.source.date_of_birth) != "string") {
      this.source.date_of_birth = this.dateFormatWithPad(this.source.date_of_birth);
    }
    if (!this.phone) {
      this.customerAccountManagementService.httpPost('createUser', this.source, (response) => {
        if (response.code == 200) {
          this.toastrService.showToast('success', 'Thành công!', '');
          this.cancel(response.data);
        }
        else {
          this.toastrService.showToast('danger', 'Lỗi!', response.data);
        }
      }, () => {
        this.loading = false;
      })
    }

    else {
      this.source.female = (this.source.female === 'true');
      this.customerAccountManagementService.httpPost('updateUser', this.source, (response) => {
        if (response.code == 200) {
          this.toastrService.showToast('success', 'Thành công!', '');
          this.cancel(response.data);
        }
        else {
          this.toastrService.showToast('danger', 'Lỗi!', response.data);
        }
      }, () => {
        this.loading = false;
      })
    }

  }

  dateFormatWithPad(date: Date) {
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yyyy = date.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
  }

  cancel(data = 0) {
    this.ref.close(data);
  }

}

