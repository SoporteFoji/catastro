# -*- coding: utf-8 -*-

import factory

from .coordinator import CoordinatorFactory

from ..models.orchestra import Orchestra


class OrchestraFactory(factory.DjangoModelFactory):
    name = factory.Faker('name')
    coordinator = factory.SubFactory(CoordinatorFactory)

    class Meta:
        model = Orchestra
