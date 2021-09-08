# -*- coding: utf-8 -*-
from django.db import models
from django.utils.translation import ugettext_lazy as _


class Region(models.Model):
    code = models.CharField(max_length=256)
    name = models.CharField(max_length=256)

    class Meta:
        verbose_name = _('Region')
        verbose_name_plural = _('Regions')

    def __str__(self):
        return self.name

    def CUT(self):
        return self.code


class Province(models.Model):
    code = models.CharField(max_length=256)
    name = models.CharField(max_length=256)
    region = models.ForeignKey(
        Region,
        related_name='provinces',
        on_delete=models.CASCADE,
        null=False,
    )

    class Meta:
        verbose_name = _('Province')
        verbose_name_plural = _('Provinces')

    def __str__(self):
        return self.name

    def CUT(self):
        return self.code


class Area(models.Model):
    code = models.CharField(max_length=256)
    name = models.CharField(max_length=256)
    province = models.ForeignKey(
        Province,
        related_name='areas',
        on_delete=models.CASCADE,
        null=False,
    )

    class Meta:
        verbose_name = _('Area')
        verbose_name_plural = _('Areas')

    def __str__(self):
        return self.name

    def CUT(self):
        return self.code
