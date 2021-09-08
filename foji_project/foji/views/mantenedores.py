# -*- coding: utf-8 -*-
from django.views import View
from django.views.generic.detail import DetailView
from django.shortcuts import render, redirect
from django.utils.decorators import method_decorator
from django.db import transaction

from ..models.orchestra import Orchestra
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

class OrchestraView(View):
    template_name = 'foji/registration/registration_orchestra.html'

    def get(self, request, orchestra=None):
        return render(
            request,
            self.template_name,
        )

    def post(self, request, pk=None):
        coordinator = request.user.coordinator

        orchestra_data = request.POST.copy()
        orchestra_data['coordinator'] = coordinator.id

        social_networks_form = SocialNetworkInformationForm(
            request.POST,
            prefix='socialnetwork',
        )

        print(request.POST)

        try:
            with transaction.atomic():
                if social_networks_form.is_valid():
                    social_networks = social_networks_form.save()
                    orchestra_data['social_networks'] = social_networks.id
                else:
                    social_networks = None

                orchestra_form = OrchestraForm(
                    orchestra_data,
                    request.FILES,
                )

                if orchestra_form.is_valid():
                    orchestra = orchestra_form.save()
                else:
                    orchestra = None
        except:
            orchestra = None

        if orchestra is None:
            return render(
                request,
                self.template_name,
                {
                    'orchestra_form': orchestra_form,
                },
            )
        else:
            return redirect('/dashboard/orquesta/{}/institucion/'.format(orchestra.id))


class InstitutionView(View):
    template_name = 'foji/registration/registration_institution.html'

    def get(self, request, pk=None):
        return render(
            request,
            self.template_name,
        )

    def post(self, request, pk=None):
        orchestra = Orchestra.objects.get(pk=pk)

        institution_form = InstitutionInformationForm(prefix='institution')
        legal_representation_form = LegalRepresentationForm(request.POST)

        if not legal_representation_form.is_valid():
            print('legal wrong')
            print(legal_representation_form.errors)
            return render(
                request,
                self.template_name,
                {
                    'institution_form': institution_form,
                    'legal_representation_form': legal_representation_form,
                }
            )

        legal_representation = PersonalInformation.objects.create(
            **legal_representation_form.cleaned_data
        )

        institution_data = request.POST.copy()
        institution_data['institution-legal_representation'] = legal_representation.id
        institution_form = InstitutionInformationForm(institution_data, prefix='institution')

        if not institution_form.is_valid():
            print('institution wrong')
            print(institution_form.errors)
            return render(
                request,
                self.template_name,
                {
                    'institution_form': institution_form,
                    'legal_representation_form': legal_representation_form,
                }
            )

        institution = institution_form.save()

        orchestra.institution = institution
        orchestra.save()

        return redirect('/dashboard/orquesta/{}/financiamiento/'.format(orchestra.id))


class FundingView(View):
    template_name = 'foji/registration/registration_funding.html'

    def get(self, request, pk=None):
        orchestra = Orchestra.objects.get(pk=pk)

        return render(
            request,
            self.template_name,
            {
                'object': orchestra,
            },
        )

    def post(self, request, pk=None):
        return redirect('/dashboard/orquesta/{}/integrantes/'.format(pk))


class MembersView(View):
    template_name = 'foji/registration/excel_upload.html'

    def get(self, request, pk=None):
        orchestra = Orchestra.objects.get(pk=pk)

        return render(
            request,
            self.template_name,
            {
                'object': orchestra,
            }
        )

    def post(self, request, pk=None):
        pass


class Profile(DetailView):
    model = Orchestra
    template_name = 'foji/dashboard/orchestra_profile.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        # By default no one can edit the orchestra.
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
        try:
            coordinator = user.coordinator
        except:
            coordinator = None

        if coordinator is not None:
            if self.object.coordinator.id == coordinator.id:
                context['can_edit'] = 'true'

        return context





class OrchestraList(ListView):
    model = Orchestra
    paginate_by = 20

    def get_context_data(self, **kwargs):
        context = super(OrchestraList, self).get_context_data(**kwargs)
        orchestra = Orchestra.objects.all()
        paginator = Paginator(orchestra, self.paginate_by)

        page = self.request.GET.get('page')

        try:
            orchestras = paginator.page(page)
        except PageNotAnInteger:
            orchestras = paginator.page(1)
        except EmptyPage:
            orchestras = paginator.page(paginator.num_pages)

        context['object_list'] = orchestras
        return context



