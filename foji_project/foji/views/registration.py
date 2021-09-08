# -*- coding: utf-8 -*-
import logging

from django.views import View
from django.views.generic.base import TemplateView
from django.shortcuts import render, redirect
from django.db import transaction
from django.contrib.auth import login
from django.conf import settings
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required

from ..models.user import User
from ..models.personal_information import PersonalInformation
from ..models.orchestra import Orchestra

from ..forms.registration import UserForm
from ..forms.registration import PersonalInformationForm
from ..forms.registration import CoordinatorForm
from ..forms.registration import InstitutionInformationForm
from ..forms.registration import OrchestraForm


logger = logging.getLogger(__name__)


class CoordinatorRegistration(View):
    registration_template_name = \
        'foji/registration/registration_coordinator.html'
    registration_success_template_name = \
        'foji/registration/registration_success.html'

    def get(self, request):
        if request.user.is_authenticated:
            return redirect('/dashboard/')

        return render(
            request,
            self.registration_template_name,
        )

    def post(self, request):
        user_form = UserForm(request.POST)
        personal_information_form = PersonalInformationForm(
            request.POST,
            prefix='coordinator',
        )
        coordinator_form = CoordinatorForm(request.POST)

        user = None
        coordinator = None
        personal_information = None


        if not (user_form.is_valid() and personal_information_form.is_valid()):
            print(user_form.errors)
            print(personal_information_form.errors)
            return render(
                request,
                self.registration_template_name,
                {
                    'user_form': user_form,
                    'personal_information_form': personal_information_form,
                    'coordinator_form': coordinator_form,
                    'was_validated': 'was-validated',
                },
            )


        try:
            with transaction.atomic():
                user = User.objects.create_user(
                    username=user_form.cleaned_data['email'],
                    email=user_form.cleaned_data['email'],
                    password=user_form.cleaned_data['password'],
                    is_active=False
                )

                print(personal_information_form.errors)

                personal_information = PersonalInformation.objects.create(
                    **personal_information_form.cleaned_data
                )

                coordinator_data = request.POST.copy()
                coordinator_data['user'] = user.id
                coordinator_data['personal_information'] = \
                    personal_information.id
                coordinator_form = CoordinatorForm(coordinator_data)

                if coordinator_form.is_valid():
                    coordinator = coordinator_form.save()
        except Exception as e:
            print(e)
            logger.debug(str(e))
            logger.info('Could\'t  create coordinator user.')

        if user and coordinator:
            try:
                coordinator.send_activation_email()
            except Exception as e:
                print(e)
                pass

            return render(
                request,
                self.registration_success_template_name,
                {
                    'user_form': user_form,
                    'personal_information_form': personal_information_form,
                    'coordinator_form': coordinator_form,
                    'was_validated': 'was-validated',
                },
            )
        else:
            return render(
                request,
                self.registration_template_name,
                {
                    'user_form': user_form,
                    'personal_information_form': personal_information_form,
                    'coordinator_form': coordinator_form,
                    'was_validated': 'was-validated',
                },
            )




@method_decorator(login_required, name='dispatch')
class OrchestraRegistration(View):
    template_name = 'foji/registration/registration_orchestra.html'

    def get(self, request):
        return render(
            request,
            self.template_name,
        )

    def post(self, request):
        orchestra = Orchestra.objects.get(
            coordinator__user=request.user,
        )

        orchesta_form = OrchestraForm(
            request.POST,
            request.FILES,
            instance=orchestra,
        )


        if orchesta_form.is_valid():
            orchestra.save()

            return redirect('/registro/financiamiento/')

        return render(
            request,
            self.template,
        )


class OrchestraFundingRegistration(TemplateView):
    template_name = 'foji/registration/registration_funding.html'
