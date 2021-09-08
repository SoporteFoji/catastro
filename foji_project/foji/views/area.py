# -*- coding: utf-8 -*-
from django.views import View
from django.views.generic.detail import DetailView
from django.views.generic import CreateView
from django.shortcuts import render, redirect
from django.utils.decorators import method_decorator
from django.db import transaction

from ..models.location import Area
from ..models.orchestra import Orchestra
from ..models.administrator import Administrator 
from ..models.personal_information import PersonalInformation
from ..models.institution_information import InstitutionInformation

from ..forms.orchestra import OrchestraForm
from ..forms.orchestra import LegalRepresentationForm
from ..forms.orchestra import SocialNetworkInformationForm
from ..forms.registration import PersonalInformationForm
from ..forms.registration import InstitutionInformationForm
from django.core.paginator import Paginator
from django.core.paginator import EmptyPage
from django.core.paginator import PageNotAnInteger
from django.views.generic.list import ListView

class Profile(DetailView):
    model = Area
    template_name = 'foji/dashboard/area_profile.html'

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

        if administrator is not None:
            context['can_edit'] = 'true'
        # Check if user is a coordinator.
        return context




class Creacion(CreateView):
    model = Area
    fields = '__all__'
    template_name = 'foji/dashboard/area_profile.html'