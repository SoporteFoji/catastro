# -*- coding: utf-8 -*-
from django.db import models
from django.utils.translation import ugettext_lazy as _

from .personal_information import PersonalInformation
from .orchestra import Orchestra
from .instructor import Instructor


class CastMember(models.Model):
    """
    Represents a cast member of an orchestra.
    """
    personal_information = models.ForeignKey(
        PersonalInformation,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    orchestra = models.ForeignKey(
        Orchestra,
        on_delete=models.SET_NULL,
        related_name='cast_members',
        null=True,
        blank=True,
    )

    instrument = models.CharField(
        max_length=256,
        null=True,
        blank=True,
    )

    class Meta:
        verbose_name = _('Cast member')
        verbose_name = _('Cast members')
