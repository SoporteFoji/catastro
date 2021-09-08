# -*- coding: utf-8 -*-
from django import forms

from ..models.orchestra import Orchestra
from ..models.social_network_information import SocialNetworkInformation


class OrchestraForm(forms.ModelForm):
    class Meta:
        model = Orchestra

        exclude = ('institution', 'orchestra_status')


class SocialNetworkInformationForm(forms.ModelForm):
    class Meta:
        model = SocialNetworkInformation
        fields = '__all__'


class LegalRepresentationForm(forms.Form):
    first_name = forms.CharField()
    last_name = forms.CharField()
    email = forms.EmailField()
    phone_number_mobile = forms.CharField()
