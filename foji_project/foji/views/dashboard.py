# -*- coding: utf-8 -*-
from django.views import View
from django.shortcuts import render

class CoordinatorView(View):
    def get(self, request):  
        response = render(
            request,
            'foji/dashboard/dashboard_coordinator.html',
        )
        if(request.user):
            if(hasattr(request.user, 'administrator') is False and hasattr(request.user, 'coordinator') is False):
                if(request.COOKIES['sessionid']):
                    response.delete_cookie('sessionid')
        return response

