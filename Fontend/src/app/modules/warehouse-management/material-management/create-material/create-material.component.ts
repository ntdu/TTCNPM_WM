import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from '../../../../_helpers/toastrService';
import { Options } from 'select2';
import { NbDialogRef } from '@nebular/theme';
import { MaterialManagementService } from '../material-management.service';


@Component({
  selector: 'ngx-create-material',
  templateUrl: './create-material.component.html',
  styleUrls: ['./create-material.component.scss']
})
export class CreateMaterialComponent implements OnInit {
  source: any = {};
  submitted: boolean = false;
  loading: boolean

  // @Input() account_id: number
  @Input() material_id: number

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
    private materialManagementService: MaterialManagementService,
    private toastrService: ToastrService,
    private router: Router,
    protected ref: NbDialogRef<CreateMaterialComponent>,
  ) { }

  ngOnInit(): void {

    this.optionsSelect = {
      placeholder: "ngân hàng",
      width: "100%",
      height: "100%"
    }

    if (this.material_id){
      this.getMaterial();
    }
  }

  getMaterial(): void {
    this.loading = true;
    let params = [{ key: 'material_id', value: this.material_id }];
    this.materialManagementService.httpGetWithParams('getMaterial', params, (response) => {
      if (response.code == 200) {
        this.source = response.data[0];
        console.log(this.source);
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

    if (!this.material_id) {
      this.materialManagementService.httpPost('createMaterial', this.source, (response) => {
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
      this.materialManagementService.httpPost('updateMaterial', this.source, (response) => {
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
    let yyyy = date. getFullYear();
    return yyyy + '-' + mm + '-' + dd;
  }

  cancel(data=0) {
    this.ref.close(data);
  }

}

