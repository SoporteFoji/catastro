# -*- coding: utf-8 -*-
from django import forms
from django.db import transaction
from django.shortcuts import render, redirect
from django.views import View
from django.http import Http404
from django.contrib import messages

from ..forms.registration import UserForm
from ..models.personal_information import PersonalInformation
from ..models.coordinator import Coordinator
from ..models.user import User


class CoordinatorForm(forms.ModelForm):
    class Meta:
        model = Coordinator
        fields = ('role',)


class PersonalInformationForm(forms.ModelForm):
    class Meta:
        model = PersonalInformation
        fields = '__all__'


class ChangePasswordForm(forms.Form):
    password = forms.CharField()
    new_password = forms.CharField()
    new_password_repeat = forms.CharField()

    def clean(self):
        cleaned_data = super().clean()

        new_password = cleaned_data.get('new_password')
        new_password_repeat = cleaned_data.get('new_password_repeat')
        
        if new_password != new_password_repeat:
            self.add_error('new_password_repeat', 'Contraseña no coincide.')


class ChangePassword(View):
    def get(self, request):
        if not request.user.is_authenticated:
            raise Http404()

        form = ChangePasswordForm()

        return render(
            request,
            'foji/dashboard/change_password.html',
            {
                'form': form,
            }
        )

    def post(self, request):
        if not request.user.is_authenticated:
            raise Http404()

        form = ChangePasswordForm(request.POST)

        if not form.is_valid():
            return render(
                request,
                'foji/dashboard/change_password.html',
                {
                    'form': form,
                }
            )

        if not request.user.check_password(form.cleaned_data.get('password')):
            form.add_error('password', 'Contraseña incorrecta.')

            return render(
                request,
                'foji/dashboard/change_password.html',
                {
                    'form': form,
                }
            )

        user = User.objects.get(pk=request.user.id)
        user.set_password(form.cleaned_data.get('new_password_repeat'))
        user.save()

        messages.success(request, 'Contraseña modificada exitosamente.')

        return redirect('/ingresar/')


class ForgotPassword(View):
    template_name = 'foji/dashboard/password_recovery.html'

    def get(self, request):
        return render(
            request,
            self.template_name,
            {},
        )

    def post(self, request):
        email = request.POST.get('email')

        if email is None:
            return render(
                request,
                self.template_name,
                {
                    'error': 'Ingresa un email',
                },
            )

        try:
            print(email)
            print('antes filtro')
            usuario = User.objects.get(username=email)
            print(usuario)
            print(usuario.email)
            print(usuario.id)
            print('despue')
            coordinator = Coordinator.objects.get(user_id=usuario.id)
            print('DESPUES DESPUE')
        except:
            return render(
                request,
                self.template_name,
                {
                    'error': 'No existe usuario con ese email',
                },
            )

        coordinator.recover_password()

        return render(
            request,
            self.template_name,
            {
                'success': True,
            },
        )


class CoordinatorProfile(View):
    def get(self, request):
        coordinator = request.user.coordinator

        user_form = UserForm(
            initial={
                'email': request.user.username,
            }
        )
        personal_information_form = PersonalInformationForm(
            instance=coordinator.personal_information,

        )
        coordinator_form = CoordinatorForm(
            instance=coordinator,
        )

        return render(
            request,
            'foji/dashboard/profile_edit.html',
            {
                'user_form': user_form,
                'personal_information_form': personal_information_form,
                'coordinator_form': coordinator_form,
            },
        )

    def post(self, request):
        coordinator = request.user.coordinator

        user_form = UserForm(
            initial={
                'email': request.user.username,
            }
        )
        personal_information_form = PersonalInformationForm(
            request.POST,
            instance=coordinator.personal_information,
            prefix='coordinator',
        )
        coordinator_form = CoordinatorForm(
            request.POST,
            instance=coordinator,
        )

        if personal_information_form.is_valid() and coordinator_form.is_valid():
            with transaction.atomic():
                personal_information_form.save()
                coordinator_form.save()
        else:
            print(personal_information_form.errors)
            print(coordinator_form.errors)
            return render(
                request,
                'foji/dashboard/profile_edit.html',
                {
                    'user_form': user_form,
                    'personal_information_form': personal_information_form,
                    'coordinator_form': coordinator_form,
                },
            )

        return redirect('/dashboard/')
