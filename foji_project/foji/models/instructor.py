# -*- coding: utf-8 -*-
from django.db import models
from django.utils.translation import ugettext_lazy as _

from .personal_information import PersonalInformation
from .orchestra import Orchestra


class Instructor(models.Model):
    """
    Represents an instructor in an orchestra.
    """
    personal_information = models.ForeignKey(
        PersonalInformation,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
    )

    orchestra = models.ForeignKey(
        Orchestra,
        on_delete=models.SET_NULL,
        related_name='instructors',
        null=True,
        blank=True,
    )

    instrument = models.CharField(
        max_length=256,
        null=True,
        blank=True,
    )

    students = models.IntegerField(
        default=0,
        null=True,
        blank=True,
    )

    class Meta:
        verbose_name = _('Instructor')
        verbose_name_plural = _('Instructors')
