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

from warehouse.models import Material


@api_view(['GET'])
@authentication_classes([BasicAuthentication])
@permission_classes([IsAuthenticated])
def listMaterial(request):  
    try:
        list_material = list(Material.objects.filter(is_deleted=False).values(
            'code',
            'name',
            'description',
            'unit',
            'price',
        ))
        
        return ApiHelper.Response_ok(list_material)
    except Exception as e:
        print(e)
        return ApiHelper.Response_error()


@api_view(['GET'])
@authentication_classes([BasicAuthentication])
@permission_classes([IsAuthenticated])
def getMaterial(request):  
    try:
        material_id = request.GET.get('material_id')
        material = list(Material.objects.filter(is_deleted=False).values(
            'code',
            'name',
            'description',
            'unit',
            'price',
        ).first())
        
        return ApiHelper.Response_ok(material)
    except Exception as e:
        print(e)
        return ApiHelper.Response_error()


@api_view(['POST'])
@authentication_classes([BasicAuthentication])
@permission_classes([IsAuthenticated])
def createMaterial(request):  
    try:
        form =  ApiHelper.getData(request)
        
        code = form['code'] 
        name = form['name']
        description = form['description']
        unit = form['unit']
        price = form['price']

        created_material = Material(
            code = code,
            name = name,
            description = description,
            unit = unit,
            price = price,
            created_by = request.user
        )
        created_material.save()

        return ApiHelper.Response_ok(created_material.id)
    except Exception as e:
        print(e)
        return ApiHelper.Response_error()


@api_view(['POST'])
@authentication_classes([BasicAuthentication])
@permission_classes([IsAuthenticated])
def updateMaterial(request):  
    try:
        form =  ApiHelper.getData(request)

        material_id = form['material_id'] 
        code = form['code'] 
        name = form['name']
        description = form['description']
        unit = form['unit']
        price = form['price']

        updated_material = Material.objects.filter(is_deleted=False, id=material_id)
        updated_material.code = code
        updated_material.name = name
        updated_material.description = description
        updated_material.unit = unit
        updated_material.price = price
        updated_material.last_updated_date = timezone.now()
        updated_material.last_updated_by = request.user
        updated_material.save()

        return ApiHelper.Response_ok(updated_material.id)
    except Exception as e:
        print(e)
        return ApiHelper.Response_error()
