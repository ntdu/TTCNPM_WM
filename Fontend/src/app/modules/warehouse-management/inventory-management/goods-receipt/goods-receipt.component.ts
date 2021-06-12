import { Component, Input, OnInit } from '@angular/core';
import { InventoryManagementService } from '../inventory-management.service';
import { ToastrService } from '../../../../_helpers/toastrService';
import { NbDialogService } from '@nebular/theme';
import { NbDialogRef } from '@nebular/theme';
// import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'ngx-goods-receipt',
  styleUrls: ['./goods-receipt.component.scss'],
  templateUrl: './goods-receipt.component.html'
})
export class GoodsReceiptComponent implements OnInit {
  source: any = {};
  submitted: boolean = false;
  loading: boolean

  // @Input() account_id: number
  @Input() inventory_id: number
 

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
    // private activatedRoute: ActivatedRoute,
    private inventoryManagementService: InventoryManagementService,
    private toastrService: ToastrService,
    // private router: Router,
    protected ref: NbDialogRef<InventoryManagementService>,

  ) { }

  ngOnInit(): void {

    this.optionsSelect = {
      placeholder: "ngân hàng",
      width: "100%",
      height: "100%"
    }
    if (this.inventory_id){
      this.getInventory();
    }
   
  }

  getInventory(): void {
    this.loading = true;
    let params = [{ key: 'material_id', value: this.inventory_id }];
    this.inventoryManagementService.httpGetWithParams('getInventory', params, (response) => {
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
    console.log()
    this.submitted = true;
    this.loading = true;
    this.source.sort_order = 0;

    if (!this.inventory_id) {
      
      this.inventoryManagementService.httpPost('pushInventory', this.source, (response) => {
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
      this.source['inventory_id'] = this.source['id'];
      this.inventoryManagementService.httpPost('pushInventory', this.source, (response) => {
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
