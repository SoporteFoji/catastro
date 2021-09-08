from django.db import models
from django.utils.translation import ugettext_lazy as _

from .base import BaseModel
from .coordinator import Coordinator
from .director import Director
from .institution_information import InstitutionInformation
from .social_network_information import SocialNetworkInformation
from .location import Area


class OrchestraManager(models.Manager):
    def create(self, **kwargs):
        name = kwargs['name']
        creation_date = kwargs.get('creation_date')
        area = kwargs.get('area')
        city = kwargs.get('city')
        is_active = kwargs.get('is_active', False)
        orchestra_type = kwargs.get('orchestra_type')
        orchestra_status = kwargs.get('orchestra_status', 'paused')
        coordinator = kwargs.get('coordinator')
        director = kwargs.get('director')
        institution = kwargs.get('institution')

        orchestra = Orchestra(
            name=name,
            creation_date=creation_date,
            area=area,
            city=city,
            is_active=is_active,
            orchestra_type=orchestra_type,
            orchestra_status=orchestra_status,
            coordinator=coordinator,
            director=director,
            institution=institution,
        )

        orchestra.save()

        return orchestra


class Orchestra(BaseModel):
    name = models.CharField(
        max_length=256,
        null=True,
        blank=True,
    )

    ORCHESTRA_STATUS_CHOICES = (
        ('inactive', 'Inactiva'),
        ('paused', 'En pausa'),
        ('active', 'Activa'),
    )

    orchestra_status = models.CharField(
        max_length=256,
        choices=ORCHESTRA_STATUS_CHOICES,
        default='paused',
        blank=True,
    )

    ORCHESTRA_TYPE_CHOICES = (
        ('infantil', 'Infantil'),
        ('juvenil', 'Juvenil'),
        ('infantil-juvenil', 'Infantil-Juvenil'),
    )

    orchestra_type = models.CharField(
        max_length=256,
        choices=ORCHESTRA_TYPE_CHOICES,
        null=True,
        blank=True,
    )

    coordinator = models.ForeignKey(
        Coordinator,
        related_name='orchestras',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    director = models.ForeignKey(
        Director,
        related_name='orchestras',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    institution = models.ForeignKey(
        InstitutionInformation,
        related_name='orchestras',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    area = models.ForeignKey(
        Area,
        related_name='orchestras',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    city = models.CharField(
        max_length=256,
        null=True,
        blank=True,
    )

    # When the orchestra was created, not the model.
    creation_date = models.DateField(
        null=True,
        blank=True,
    )

    photo = models.FileField(
        null=True,
        blank=True,
    )

    website = models.CharField(
        max_length=1024,
        null=True,
        blank=True,
    )

    social_networks = models.ForeignKey(
        SocialNetworkInformation,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    is_active = models.BooleanField(
        default=False,
    )

    objects = models.Manager()
    orchestras = OrchestraManager()

    class Meta:
        verbose_name = _('Orchestra')
        verbose_name_plural = _('Orchestras')

    def __str__(self):
        return self.name or ''

    def members_count(self):
        return self.cast_members.all().count()
