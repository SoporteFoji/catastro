# -*- coding: utf-8 -*-

from django.db import models
from django.db import transaction
from django.utils.translation import ugettext_lazy as _

from .personal_information import PersonalInformation


class DirectorManager(models.Manager):
    def create(self, **kwargs):
        with transaction.atomic():
            first_name = kwargs.get('first_name')
            last_name = kwargs.get('last_name')
            email = kwargs.get('email')
            instrument = kwargs.get('instrument')

            personal_information = PersonalInformation.objects.create(
                first_name=first_name,
                last_name=last_name,
                email=email,
            )

            director = Director(
                personal_information=personal_information,
                instrument=instrument,
            )

            director.save()

        return director


class Director(models.Model):
    personal_information = models.ForeignKey(
        PersonalInformation,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    instrument = models.CharField(
        max_length=256,
        null=True,
        blank=True,
    )

    objects = models.Manager()
    directors = DirectorManager()

    class Meta:
        verbose_name = _('Director')
        verbose_name_plural = _('Directors')

    def __str__(self):
        try:
            full_name = self.personal_information.full_name()
        except:
            full_name = 'Sin nombre'

        return full_name
