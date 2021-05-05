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


