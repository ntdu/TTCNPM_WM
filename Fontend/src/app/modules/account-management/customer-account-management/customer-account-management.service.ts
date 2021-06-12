import { Injectable } from '@angular/core';
import { ApiClientService } from '../../../config/api-client.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerAccountManagementService extends ApiClientService {
  list_api = [
    { key: 'listUser', link: 'admins/list-customer' },
    { key: 'getUser', link: 'admins/get-customer' },
    { key: 'createUser', link: 'admins/create-customer' },
    { key: 'updateUser', link: 'admins/update-customer' },
    { key: 'deleteUser', link: 'admins/delete-customer' },
  ]
}
