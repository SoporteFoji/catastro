# -*- coding: utf-8 -*-

import factory

from ..models.user import User



class UserFactory(factory.DjangoModelFactory):
    username = factory.Faker('email')

    class Meta:
        model = User
