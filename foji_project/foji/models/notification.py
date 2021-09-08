# -*- coding: utf-8 -*-

from django.db import models
from django.utils.translation import ugettext_lazy as _

from .user import User


class Notification(models.Model):
    user = models.ForeignKey(
        User,
        related_name='notifications',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )

    group = models.CharField(
        max_length=256,
        null=True,
        blank=True,
    )

    type = models.CharField(
        max_leength=256,
        choices=TYPE_CHOICES,
    )

    text = models.TextField()

    action = models.CharField(
        max_length=1024,
        null=True,
        blank=True,
    )
    
    created_date = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:
        verbose_name = _('Notification')
        verbose_name_plural = _('Notifications')
