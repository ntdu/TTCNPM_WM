import { Injectable } from '@angular/core';
import { ApiClientService } from '../../../config/api-client.service';

@Injectable({
  providedIn: 'root'
})
export class MaterialManagementService extends ApiClientService {
  list_api = [
    { key: 'listMaterial', link: 'warehouse/list-material' },
    { key: 'getMaterial', link: 'warehouse/get-material' },
    { key: 'createMaterial', link: 'warehouse/create-material' },
    { key: 'updateMaterial', link: 'warehouse/update-material' },
    { key: 'deleteMaterial', link: 'warehouse/delete-material' }
  ]
}
