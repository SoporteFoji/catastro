# -*- coding: utf-8 -*-
from django.views.generic.list import ListView
from ..models.coordinator import Coordinator
from ..forms.testusuariocoordinador import CustomForm
from django.http import HttpResponseRedirect
from django.shortcuts import render

def get_name(request):
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = CustomForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            # process the data in form.cleaned_data as required
            # ...
            # redirect to a new URL:
            return HttpResponseRedirect('/thanks/')

    # if a GET (or any other method) we'll create a blank form
    else:
        form = CustomForm()

    return render(request, 'name.html', {'form': form})

