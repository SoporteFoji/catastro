from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone


class PersonalInformation(models.Model):
    first_name = models.CharField(
        max_length=256,
        null=True,
        blank=True,
    )

    last_name = models.CharField(
        max_length=256,
        null=True,
        blank=True,
    )

    birth_date = models.DateField(
        null=True,
        blank=True,
    )

    social_id = models.CharField(
        max_length=256,
        null=True,
        blank=True,
    )

    GENDER_CHOICES = (
        ('M', _('Male')),
        ('F', _('Female')),
        ('O', _('Other')),
    )

    gender = models.CharField(
        max_length=256,
        choices=GENDER_CHOICES,
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
        blank=True
    )

    phone_number_mobile = models.CharField(
        max_length=256,
        null=True,
        blank=True
    )

    class Meta:
        verbose_name = _('Personal information')
        verbose_name_plural = _('Personal information')

    def full_name(self):
        """
        Returns the full name.
        """
        first_name = self.first_name or ''
        last_name = self.last_name or ''
        email = self.email or 'no tiene email'

        if last_name:
            return first_name + ' ' + last_name + ' ' + email
        else:
            return first_name + ' ' + email

    def __str__(self):
        return self.full_name() or ''

    def age(self):
        try:
            age = timezone.now().year - self.birth_date.year
        except:
            age = None

        return age
