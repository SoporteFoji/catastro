# -*- coding: utf-8 -*-

import factory

from ..models.personal_information import PersonalInformation



class PersonalInformationFactory(factory.DjangoModelFactory):
    first_name = factory.Faker('first_name', locale='es')
    last_name = factory.Faker('last_name', locale='es')

    class Meta:
        model = PersonalInformation
