import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from '../../../../_helpers/toastrService';
import { Options } from 'select2';
import { NbDialogRef } from '@nebular/theme';
import { InventoryManagementService } from '../inventory-management.service';

@Component({
  selector: 'ngx-goods-receipt',
  templateUrl: './goods-receipt.component.html',
  styleUrls: ['./goods-receipt.component.scss']
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
  listMaterial = [
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
    private inventoryManagementService: InventoryManagementService,
    private toastrService: ToastrService,
    private router: Router,
    protected ref: NbDialogRef<GoodsReceiptComponent>,
  ) { }

  ngOnInit(): void {

    this.optionsSelect = {
      placeholder: "ngân hàng",
      width: "100%",
      height: "100%"
    }
    this.getlistMaterial();
    
    if (this.inventory_id){
      this.getMaterial();
    }
  }

  getMaterial(): void {
    this.loading = true;
    let params = [{ key: 'material_id', value: this.inventory_id }];
    this.inventoryManagementService.httpGetWithParams('getMaterial', params, (response) => {
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

  getlistMaterial(): void {
    this.loading = true;
    let params = [{ key: 'material_id', value: 0 }];
    this.inventoryManagementService.httpGetWithParams('listMaterial', params, (response) => {
      if (response.code == 200) {
        response.data.forEach(element => {
          this.listMaterial.push({
            id: element.id,
            text: element.name
        })
        });
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

    if (!this.inventory_id) {
      this.inventoryManagementService.httpPost('pushInventory', this.source, (response) => {
        if (response.code == 200) {
          console.log(this.source);
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
      this.source['material_id'] = this.source['id'];
      this.inventoryManagementService.httpPost('updateMaterial', this.source, (response) => {
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

