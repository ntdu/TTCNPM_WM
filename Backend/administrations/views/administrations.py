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

from customer.models import Customer
import random,string
import logging
logger = logging.getLogger(__name__)
import traceback

@csrf_exempt
def createCustomer(request):  
    try:
        form =  ApiHelper.getData(request)
        
        # username = form['username'] if 'username' in form else ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(5))

        password = form['password'] if 'password' in form else '123'
        first_name = form['first_name']
        last_name = form['last_name'] 
        female =  False if form['female'] == 'false' else True
        phone_number = form['phone_number']
        username = phone_number #form['username']
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
            created_by = user_created,
            
        )
        customer.save()

        return ApiHelper.Response_ok("Success")
    except Exception as e:
        print(e)
        # print(traceback.format_exc())
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
            "id",
            "account",
            "first_name",
            "last_name",
            "is_active",
            "female",
            "phone_number",
            "date_of_birth",
            "address",            
            "is_deleted"
        )
        query=list(query)
        # print("qr",
        # User.objects.filter(id=x["account"],is_deleted=False).first()
        for x in range(len(query)):
            query[x]["account"] =User.objects.filter(id=query[x]["account"]).first().username
        # print("rq",query)
        # print("ls",ls)
        # print("rr",list(query)[0]["account"])
        return ApiHelper.Response_ok(list(query))
    except Exception as ex:
        print(ex)
        return ApiHelper.Response_error()

@api_view(['POST'])
def deleteCustomer(request):
    try:
        form =  ApiHelper.getData(request)
        customer_id = form['id'] 
        deleted_customer = Customer.objects.filter(is_deleted=False, id=customer_id).first()
        deleted_customer.is_deleted = True
        deleted_customer.save()
        print("123 123",deleted_customer)
        return ApiHelper.Response_ok(deleted_customer.id)
    except Exception as e:
        print(e)
        return ApiHelper.Response_error()

@api_view(['POST'])
def updateCustomer(request):
    try:
        form =  ApiHelper.getData(request)
        # aidi = request.GET.get('phone')
        phone_number =  request.GET.get('phone')
        
        customer = Customer.objects.filter(is_deleted=False, phone_number=phone_number).first()
        customer.first_name = form['first_name'] if form['first_name'] is not None else customer.first_name
        customer.last_name =  form['last_name'] or customer.last_name
        customer.female = True if form['female'] =='true' else False
        customer.phone_number =  form['phone_number'] or customer.phone_number
        customer.date_of_birth =  form['date_of_birth'] or customer.date_of_birth
        customer.address =  form['address'] or customer.address
        customer.save()
        # print("u123",customer.account.username )
        return ApiHelper.Response_ok(customer.id)
    except Exception as e:
        print(e)
        return ApiHelper.Response_error()

@api_view(['GET'])
def getCustomer(request):
    try:
        aidi = request.GET.get('phone')
        ocao = list(Customer.objects.filter(is_deleted=False,phone_number=aidi).values(
            "account",
            "first_name",
            "last_name",
            "is_active",
            "female",
            "phone_number",
            "date_of_birth",
            "address",            
            "is_deleted",
        ))
        print (ocao)
        return ApiHelper.Response_ok(ocao)
    except Exception as e:
        print(e)
        return ApiHelper.Response_error()
# @api_view(['POST'])
# def updateCustomer(request):
#     try:
#         form =  ApiHelper.getData(request)
#         aidi = request.GET.get('phone')
#         upday_ocao = Customer.objects.filter(is_deleted=False, id=aidi).first()
#         upday_ocao.
#         return ApiHelper.Response_ok("ocao")
#     except Exception as e:
#         print(e)
#         return ApiHelper.Response_error()
@api_view(['POST'])
def deactiveCustomer(request):
    try:
        form =  ApiHelper.getData(request)
        id = form['id']
        customer =Customer.objects.filter(is_deleted=False, id=id).first()
        customer.is_active  = not customer.is_active
        customer.save()
        print(customer.is_active)
        return ApiHelper.Response_ok("ok")
    except Exception as e:
        print(e)
        return ApiHelper.Response_error()