from django import forms
from ..models.coordinator import Coordinator
from ..models.personal_information import PersonalInformation
from ..models.administrator import Administrator

class CustomForm(forms.Form):
    coordinador = forms.ModelChoiceField(queryset=Coordinator.objects.all())
    personalinfo = forms.ModelChoiceField(queryset=PersonalInformation.objects.all().filter(coordinator__in=Coordinator.objects.all()))
    administrator = forms.ModelChoiceField(queryset=(Administrator.objects.all()))
    personalinfo2 = forms.ModelChoiceField(
     queryset = PersonalInformation.objects.all().filter().exclude(
         coordinator__in=Coordinator.objects.all(),
         administrator__in = Administrator.objects.all(),
         email__isnull=True
     )
    )
    #personalinfo2 = forms.ModelChoiceField(
    #    queryset = PersonalInformation.objects.all().exclude(
    #        administrator__in=Administrator.objects.all()
    #    ).exclude(email__isnull=False)
    #)
