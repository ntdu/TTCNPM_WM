import { Component, OnInit } from '@angular/core';
import { InventoryManagementService } from '../inventory-management.service';
import { DateRenderComponent } from '../../../../_helpers/date-render.component';
import { GenderRenderComponent } from '../../../../_helpers/gender-render.component';
import { ToastrService } from '../../../../_helpers/toastrService';
import { NbDialogService } from '@nebular/theme';
import { GoodsReceiptComponent } from '../goods-receipt/goods-receipt.component'

@Component({
  selector: 'ngx-list-inventory',
  styleUrls: ['./list-inventory.component.scss'],
  templateUrl: './list-inventory.component.html',
})
export class ListInventoryComponent implements OnInit {
  constructor(
    private toastrService: ToastrService,
		private inventoryManagementService: InventoryManagementService,
    private dialogService: NbDialogService,
	) { }

  loading = false;
  source: any;

	ngOnInit(): void {
    this.listMaterial();
	}
 
  settings = {
    columns: {
      sort_order: {
        title: 'STT',
        type: 'number',
        filter: false,
        width: '3%',
      },
      material__code: {
        title: 'Mã sản phẩm',
        type: 'string',
        width: '17%',
        sort: true,
        filter: true
      },
      material__name: {
        title: 'Tên sản phẩm',
        type: 'string',
        width: '20%',
        sort: true,
        filter: true
      },
      amount: {
        title: 'Số lượng',
        type: 'string',
        width: '25%',
        sort: true,
        filter: true
      },
      price: {
        title: 'Giá thành',
        type: 'string',
        width: '10%',
        filter: true
      },
      total_money: {
        title: 'Tổng tiền',
        type: 'number',
        width: '10%',
        sort: true,
      },
    },
    mode: 'external',
    actions: {
      columnTitle: '',
      add: false,
      edit: false,
      delete: false,
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

  listMaterial(){
    this.inventoryManagementService.httpGet('listInventory', (response) => {
      if (response.code == 200) {
        this.source = response.data;
        for(let i = 0; i < this.source.length; i ++ ){
          this.source[i].sort_order = i + 1;
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
    // this.dialogService.open(GoodsReceiptComponent, {
    //   context: {
    //     material_id: event.data.id,
    //   },
    //   closeOnBackdropClick: true
    // }).onClose.subscribe(data => {
      
    //   this.listMaterial();
    // });
  }
  
  createMaterial() {
    this.dialogService.open(GoodsReceiptComponent, {
      context: {
        inventory_id: 0,
      },
      closeOnBackdropClick: true
    }).onClose.subscribe(data => {
      this.listMaterial();
    });
  }

  deleteCustomer(event: any) {
    this.loading = true;
    let body = {
      inventory_id: event.data.id
    }
    this.inventoryManagementService.httpPost('deleteMaterial', body, (response) => {
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
