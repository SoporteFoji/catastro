# -*- coding: utf-8 -*-

from django.db import models
from django.db import transaction
from django.utils.translation import ugettext_lazy as _

from .personal_information import PersonalInformation


class InstitutionInformationManager(models.Manager):
    def create(self, **kwargs):
        with transaction.atomic():
            name = kwargs.get('name')
            social_id = kwargs.get('social_id')
            email = kwargs.get('email')
            phone_number_home = kwargs.get('phone_number_home')
            address = kwargs.get('address')
            legal_representation = kwargs.get('legal_representation')

            if legal_representation is None:
                legal_representation = PersonalInformation.objects.create()

            institution_information = InstitutionInformation(
                name=name,
                social_id=social_id,
                email=email,
                phone_number_home=phone_number_home,
                address=address,
                legal_representation=legal_representation,
            )

            institution_information.save()

        return institution_information


class InstitutionInformation(models.Model):
    name = models.CharField(
        max_length=256,
        null=True,
        blank=True,
    )

    social_id = models.CharField(
        max_length=256,
        null=True,
        blank=True,
    )

    email = models.EmailField(
        null=True,
        blank=True,
    )

    phone_number_home = models.CharField(
        max_length=256,
        null=True,
        blank=True,
    )

    address = models.CharField(
        max_length=256,
        null=True,
        blank=True,
    )

    legal_representation = models.ForeignKey(
        PersonalInformation,
        related_name='institutions',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    objects = models.Manager()
    institution_information = InstitutionInformationManager()

    class Meta:
        verbose_name = _('Institution information')
        verbose_name_plural = _('Institution information')

    def __str__(self):
        return self.name or ''
