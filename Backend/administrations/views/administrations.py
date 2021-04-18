from django.contrib.auth.decorators import login_required, permission_required 
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from django import template
import simplejson as json
from datetime import datetime as dt_class
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from apiHelper.apiHelper import ApiHelper
from django.utils import timezone
from rest_framework.decorators import authentication_classes, permission_classes, api_view
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt

from customer.models import *

@csrf_exempt
def createCustomer(request):  
    try:
        form =  ApiHelper.getData(request)
        
        username = form['username'] 
        password = form['password']
        first_name = form['first_name']
        last_name = form['last_name'] 
        female = form['female']
        phone_number = form['phone_number']
        date_of_birth = dt_class.strptime(form['date_of_birth'], '%Y-%m-%d') if 'date_of_birth' in form else None
        address = form['address'] if 'address' in form else None

        account = createAccount(username, None, password)

        if not account:
            return JsonResponse({
                'code': 100,
                'data': 'Tên tài khoản đã tồn tại!'
            })

        user_created = User.objects.filter(username="admin").first()
    
        customer = Customer(
            first_name = first_name,
            last_name = last_name,
            female = female,
            phone_number = phone_number,
            date_of_birth = date_of_birth,
            address = address,
            account = account,
            created_date = timezone.now(),
            created_by = user_created
        )
        customer.save()

        return ApiHelper.Response_ok("Success")
    except Exception as e:
        print(e)
        return ApiHelper.Response_error()


def createAccount(username, email, password):
    try:
        user = User.objects.create_user(username, email, password)
        return user
    except:
        return None

@csrf_exempt
def listCustomer(request):
    try:
        query = Customer.objects.filter(is_deleted=False).values(
            "first_name",
            "last_name",
            "is_active",
            "female",
            "phone_number",
            "date_of_birth",
            "address",
        )
        return ApiHelper.Response_ok(list(query))
    except Exception as ex:
        print(ex)
        return ApiHelper.Response_error()