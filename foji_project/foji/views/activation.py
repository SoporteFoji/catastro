# -*- coding: utf-8 -*-

from django.views import View
from django.http import Http404
from django.core import signing
from django.shortcuts import render, redirect

from ..models.coordinator import Coordinator


class ActivationView(View):
    template_name = 'foji/registration/email_validation.html'

    def get(self, request):
        token = request.GET.get('tkn')

        if token is None:
            print('No token')
            raise Http404('')

        # 1 Week
        week = 60 * 60 * 24 * 7
        try:
            data = signing.loads(token, max_age=week)
            coordinator_id = int(data['coordinator_id'])
        except Exception as e:
            print(e)
            print('Could not use token')
            raise Http404('')

        # Activate user
        try:
            coordinator = Coordinator.objects.get(pk=coordinator_id)
        except:
            print('No coordinator with id')
            raise Http404('')

        coordinator.activate()

        return render(
            request,
            self.template_name,
            {},
        )
