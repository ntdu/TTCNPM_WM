import { Injectable } from '@angular/core';
import { ApiClientService } from '../../../config/api-client.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerAccountManagementService extends ApiClientService {
  list_api = [
    { key: 'listUser', link: 'administrations/list-user' },
    { key: 'getUser', link: 'administrations/get-user' },
    { key: 'createUser', link: 'administrations/create-user' },
    { key: 'updateUser', link: 'administrations/update-user' }
  ]
}
