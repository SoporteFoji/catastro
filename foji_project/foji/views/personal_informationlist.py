# -*- coding: utf-8 -*-
from django.views.generic.list import ListView
from django.views.generic.edit import (CreateView, UpdateView, DeleteView)
from ..models.personal_information import PersonalInformation
from django.urls import reverse
from django.core.paginator import Paginator
from django.core.paginator import EmptyPage
from django.core.paginator import PageNotAnInteger
from django.http import HttpResponse
import json


class PersonaInformationList(ListView):
    model = PersonalInformation
    paginate_by = 10

    def get_context_data(self, **kwargs):
        context = super(PersonaInformationList, self).get_context_data(**kwargs)
        personal_information = PersonalInformation.objects.all().filter(first_name=None)
        paginator = Paginator(personal_information, self.paginate_by)

        page = self.request.GET.get('page')

        try:
            file_exams = paginator.page(page)
        except PageNotAnInteger:
            file_exams = paginator.page(1)
        except EmptyPage:
            file_exams = paginator.page(paginator.num_pages)

        context['object_list'] = file_exams
        return context

    def busqueda(request):
        usuario = {'nombre': 'Eduardo Ismael'}
        return HttpResponse(json.dumps(usuario), content_type='application/json')


class PersonaInformationDelete(DeleteView):
    model = PersonalInformation
    success_url = '/personalinformationlist/'# reverse('PersonalInformation:list')


