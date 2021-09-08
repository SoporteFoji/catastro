# -*- coding: utf-8 -*-

from django.http import Http404
from django.views import View
from django.views.generic import ListView
from django.shortcuts import render


class AdministrationMantenedores(View):
    def get(self, request):
        try:
            administrator = request.user.administrator
            is_administrator = True
        except:
            is_administrator = False

        if request.user.is_staff == True:
            can_add = 'false'
        else:
            can_add = 'true'
        if request.user.is_superuser or is_administrator:
            return render(
                request,
                'foji/dashboard/administrator_mantenedor.html',
                {'can_add':can_add},
            )
        else:
            raise Http404()


class AdministrationOrchestras(View):
    def get(self, request):
        try:
            administrator = request.user.administrator
            is_administrator = True
        except:
            is_administrator = False

        if request.user.is_staff == True:
            can_add = 'false'
        else:
            can_add = 'true'
        if request.user.is_superuser or is_administrator:
            
            return render(
                request,
                'foji/dashboard/administrator_orchestra_list.html',
                {'can_add':can_add},
            )
        else:
            raise Http404()

'''
context['can_edit'] = 'false'

class AdministrationOrchestras(View):
    template_name = 'foji/dashboard/orchestra_profile.html'
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        # By default no one can edit the orchestra.
        context['can_add'] = 'true'
        return context
'''

class AdministrationUsers(View):
    def get(self, request):
        try:
            administrator = request.user.administrator
            is_administrator = True
        except:
            is_administrator = False
        
        if request.user.is_staff == True:
            can_add = 'false'
        else:
            can_add = 'true'

        print(request.user)
        if request.user.is_superuser or is_administrator:
            return render(
                request,
                'foji/dashboard/administrator_user_list.html',
                {'can_add':can_add},
            )
        else:
            raise Http404()
