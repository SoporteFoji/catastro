from django.db import models
from django.utils.translation import ugettext_lazy as _


class SocialNetworkInformation(models.Model):
    facebook = models.CharField(
        max_length=512,
        null=True,
        blank=True,
    )

    instagram = models.CharField(
        max_length=512,
        null=True,
        blank=True,
    )

    twitter = models.CharField(
        max_length=512,
        null=True,
        blank=True,
    )

    youtube = models.CharField(
        max_length=512,
        null=True,
        blank=True,
    )

    pinterest = models.CharField(
        max_length=512,
        null=True,
        blank=True,
    )

    vimeo = models.CharField(
        max_length=512,
        null=True,
        blank=True,
    )

    class Meta:
        verbose_name = 'Social Network information'
        verbose_name = 'Social Network information'
