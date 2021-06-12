import { Injectable } from '@angular/core';
import { ApiClientService } from '../../../config/api-client.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryManagementService extends ApiClientService {
  list_api = [
    { key: 'listMaterial', link: 'warehouse/list-material' },
    { key: 'getMaterial', link: 'warehouse/get-material' },
    { key: 'createMaterial', link: 'warehouse/create-material' },
    { key: 'updateMaterial', link: 'warehouse/update-material' },
    { key: 'deleteMaterial', link: 'warehouse/delete-material' },
    { key: 'pushInventory', link: 'warehouse/push-inventory' },
    { key: 'listInventory', link: 'warehouse/list-inventory' },
    { key: 'getInventory', link: 'warehouse/get-inventory' }

    
  ]
}
