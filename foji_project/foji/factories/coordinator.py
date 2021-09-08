# -*- coding: utf-8 -*-

import factory

from ..models.coordinator import Coordinator

from .user import UserFactory
from .personal_information import PersonalInformationFactory


class CoordinatorFactory(factory.DjangoModelFactory):
    user = factory.SubFactory(UserFactory)
    personal_information = factory.SubFactory(PersonalInformationFactory)

    class Meta:
        model = Coordinator
