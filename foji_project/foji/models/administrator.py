# -*- coding: utf-8 -*-
from django.db import models
from django.utils.translation import ugettext_lazy as _

from .base import BaseModel
from .user import User
from .personal_information import PersonalInformation


class Administrator(BaseModel):
    """
    Represents an Administrator user.
    """
    user = models.OneToOneField(
        User,
        related_name='administrator',
        on_delete=models.CASCADE,
    )

    personal_information = models.OneToOneField(
        PersonalInformation,
        on_delete=models.PROTECT,
    )

    class Meta:
        verbose_name = _('Administrator')
        verbose_name_plural = _('Administrators')

    def __str__(self):
        try:
            full_name = self.personal_information.full_name()
        except:
            full_name = 'Sin nombre'

        return full_name
