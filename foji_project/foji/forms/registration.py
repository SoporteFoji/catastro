from django import forms

from ..models.user import User
from ..models.coordinator import Coordinator
from ..models.personal_information import PersonalInformation
from ..models.institution_information import InstitutionInformation
from ..models.orchestra import Orchestra


class UserForm(forms.Form):
    email = forms.EmailField()
    password = forms.CharField()
    password_repeat = forms.CharField()

    def clean(self):
        """
        If both password differ raise `ValidationError'.
        """
        cleaned_data = super().clean()

        # Check if user already exists
        try:
            user = User.objects.get(username=cleaned_data['email'])
        except:
            user = None

        if user is not None:
            self.add_error('email', 'Usuario ya existe.')

        password = cleaned_data.get('password')
        password_repeat = cleaned_data.get('password_repeat')

        if not password:
            self.add_error('password', 'Debes ingresar una contraseña.')

        if not password_repeat:
            self.add_error('password_repeat', 'Debes ingresar una contraseña.')

        if password and password_repeat:
            if password != password_repeat:
                self.add_error('password_repeat', 'Contraseñas distintas.')




class CoordinatorForm(forms.ModelForm):
    class Meta:
        model = Coordinator

        fields = '__all__'


class PersonalInformationForm(forms.Form):
    first_name = forms.CharField()
    last_name = forms.CharField()
    birth_date = forms.DateField()
    social_id = forms.CharField()
    phone_number_mobile = forms.CharField()



class InstitutionInformationForm(forms.ModelForm):
    class Meta:
        model = InstitutionInformation

        fields = '__all__'


class OrchestraForm(forms.ModelForm):
    class Meta:
        model = Orchestra

        exclude = ('coordinator', 'institution')
