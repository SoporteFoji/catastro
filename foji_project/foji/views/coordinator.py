# -*- coding: utf-8 -*-
from django.views import View
from django.views.generic.detail import DetailView
from django.views.generic import CreateView
from django.shortcuts import render, redirect
from django.utils.decorators import method_decorator
from django.db import transaction

from ..models.orchestra import Coordinator
from ..models.personal_information import PersonalInformation

from ..forms.orchestra import SocialNetworkInformationForm
from ..forms.registration import PersonalInformationForm
from ..forms.registration import InstitutionInformationForm
from django.core.paginator import Paginator
from django.core.paginator import EmptyPage
from django.core.paginator import PageNotAnInteger
from django.views.generic.list import ListView

class Profile(DetailView):
    model = Coordinator
    template_name = 'foji/dashboard/coordinator_profile.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # By default no one can edit the administrator.
        context['can_edit'] = 'false'
        user = self.request.user
        # Check if user is an administrator.
        try:
            administrator = user.administrator
        except:
            administrator = None

        if administrator is not None and user.is_staff is False:
            context['can_edit'] = 'true'
        # Check if user is a coordinator.
        return context


class Creacion(CreateView):
    model = Coordinator
    fields = '__all__'
    template_name = 'foji/dashboard/coordinador_add.html'

class Delete(DetailView):
    model = Coordinator
    fields = '__all__'
    template_name = 'foji/dashboard/coordinator_del.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # By default no one can edit the administrator.
        context['can_edit'] = 'false'
        user = self.request.user
        # Check if user is an administrator.
        try:
            administrator = user.administrator
        except:
            administrator = None

        if administrator is not None and user.is_staff is False:
            context['can_edit'] = 'true'
        # Check if user is a coordinator.
        return context
