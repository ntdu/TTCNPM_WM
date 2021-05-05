import { Component, OnInit } from '@angular/core';
import { MaterialManagementService } from '../material-management.service';
import { DateRenderComponent } from '../../../../_helpers/date-render.component';
import { GenderRenderComponent } from '../../../../_helpers/gender-render.component';
import { ToastrService } from '../../../../_helpers/toastrService';
import { NbDialogService } from '@nebular/theme';
import { CreateMaterialComponent } from '../create-material/create-material.component';

@Component({
  selector: 'ngx-list-material',
  styleUrls: ['./list-material.component.scss'],
  templateUrl: './list-material.component.html',
})
export class ListMaterialComponent implements OnInit {
  constructor(
    private toastrService: ToastrService,
		private materialManagementService: MaterialManagementService,
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
      code: {
        title: 'Mã sản phẩm',
        type: 'string',
        width: '17%',
        sort: true,
        filter: true
      },
      name: {
        title: 'Tên sản phẩm',
        type: 'string',
        width: '15%',
        sort: true,
        filter: true
      },
      description: {
        title: 'Mô tả',
        type: 'string',
        width: '15%',
        sort: true,
        filter: true
      },
      unit: {
        title: 'Đơn vị tính',
        type: 'string',
        width: '10%',
        filter: true
      },
      price: {
        title: 'Giá thành',
        type: 'number',
        width: '10%',
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

  listMaterial(){
    this.materialManagementService.httpGet('listMaterial', (response) => {
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
    // this.dialogService.open(CreateMaterialComponent, {
    //   context: {
    //     material_id: event.data.id,
    //   },
    //   closeOnBackdropClick: true
    // }).onClose.subscribe(data => {
      
    //   this.listMaterial();
    // });
  }
  
  createMaterial() {
    // this.dialogService.open(CreateMaterialComponent, {
    //   context: {
    //     material_id: 0,
    //   },
    //   closeOnBackdropClick: true
    // }).onClose.subscribe(data => {
    //   this.listMaterial();
    // });
  }

  deleteCustomer(event: any) {
    // this.loading = true;
    // let body = {
    //   id: event.data.id
    // }
    // console.log("abc");
    // this.materialManagementService.httpPost('deleteMaterial', body, (response) => {
    // if (response.code == 200) {
    //   this.source = this.source.filter(item => item.id !== event.data.id);
    //   this.toastrService.showToast('success', 'Thành công!', '');
    // }
    // else {
    //   this.toastrService.showToast('danger', 'Lỗi!', response.data);
    // }
    // }, () => {
    //   this.loading = false;
    // })
  }
}
