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


@api_view(['GET'])
@authentication_classes([BasicAuthentication])
@permission_classes([IsAuthenticated])
def getCustomer(request):
    try:

        query = Customer.objects.filter(is_deleted=False, account=request.user).values(
            'id',
            'account__username',
            'first_name',
            'last_name',
            'is_active',
            'gender',
            'phone_number',
            'date_of_birth',
            'address'
        )

        return ApiHelper.Response_ok(list(query))
    except Exception as e:
        print(e)
        return ApiHelper.Response_error()


@api_view(['POST'])
@authentication_classes([BasicAuthentication])
@permission_classes([IsAuthenticated])
def updateCustomer(request):  
    try:
        form =  ApiHelper.getData(request)
        
        first_name = form['first_name']
        last_name = form['last_name'] 
        gender = form['gender'] if 'gender' in form else None
        phone_number = form['phone_number']
        date_of_birth = dt_class.strptime(form['date_of_birth'], '%Y-%m-%d') if 'date_of_birth' in form else None
        address = form['address'] if 'address' in form else None

        customer_update = Customer.objects.filter(is_deleted=False, account=request.user).first()

        customer_update.first_name = first_name
        customer_update.last_name = last_name
        customer_update.gender = gender
        customer_update.phone_number = phone_number
        customer_update.date_of_birth = date_of_birth
        customer_update.address = address
        customer_update.last_updated_date = timezone.now()
        customer_update.last_updated_by = request.user
        customer_update.save()

        return ApiHelper.Response_ok("Success")
    except Exception as e:
        print(e)
        return ApiHelper.Response_error()


@api_view(['POST'])
@authentication_classes([BasicAuthentication])
@permission_classes([IsAuthenticated])
def updatePassword(request):  
    try:
        form =  ApiHelper.getData(request)
        
        password = form['password']
        
        user = User.objects.filter(username=request.user.username).first()
        user.set_password(password)   
        user.save()

        return ApiHelper.Response_ok("Success")
    except Exception as e:
        print(e)
        return ApiHelper.Response_error()


