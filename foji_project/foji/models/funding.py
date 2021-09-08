# -*- coding: utf-8 -*-
from django.db import models

from .orchestra import Orchestra


class Funding(models.Model):
    orchestra = models.ForeignKey(
        Orchestra,
        related_name='funding',
        on_delete=models.CASCADE,
    )

    value = models.CharField(max_length=256)
