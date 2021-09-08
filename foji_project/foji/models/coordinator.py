# -*- coding: utf-8 -*-
import logging

from django.db import models
from django.db import transaction
from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils.translation import ugettext_lazy as _
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

from .base import BaseModel
from .user import User
from .personal_information import PersonalInformation



logger = logging.getLogger(__name__)


class CoordinatorManager(models.Model):
    def create(self, **kwargs):
        username = kwargs.get('email', None)

        if username is None:
            return None

        password = kwargs.get('password', self.generate_random_password())
        active = kwargs.get('is_active', False)

        first_name = kwargs.get('first_name')
        last_name = kwargs.get('last_name')
        phone_number_mobile = kwargs.get('phone_number_mobile')
        role = kwargs.get('role')
        email = username

        try:
            with transaction.atomic():
                user = User.objects.create_user(
                    username=username,
                    email=email,
                    password=password,
                )

                personal_information = PersonalInformation.objects.create(
                    first_name=first_name,
                    last_name=last_name,
                    phone_number_mobile=phone_number_mobile,
                )

                coordinator = Coordinator(
                    user=user,
                    personal_information=personal_information,
                    role=role,
                )

                coordinator.save()
        except Exception as e:
            print(e)
            return None

        return coordinator
        

    def generate_random_password(self):
        import random

        password = ''

        for i in range(10):
            password += random.choice('ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890')

        return password


class Coordinator(BaseModel):
    """
    Represents a Coordinator user.
    """
    user = models.OneToOneField(
        User,
        related_name='coordinator',
        on_delete=models.CASCADE,
    )

    personal_information = models.OneToOneField(
        PersonalInformation,
        on_delete=models.PROTECT,
    )

    # Role in the orchestra.
    role = models.CharField(
        max_length=256,
        null=True,
        blank=True,
    )

    objects = models.Manager()
    coordinators = CoordinatorManager()

    class Meta:
        verbose_name = _('Coordinator')
        verbose_name_plural = _('Coordinators')

    def send_activation_email(self):
        from ..tasks import send_coordinator_activation_email
        send_coordinator_activation_email.delay(self.id)

    def recover_password(self):
        import random
        from ..tasks import send_coordinator_recover_password_email

        random_password = ''

        for i in range(10):
            random_password += random.choice(
                'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
            )

        #user = self.user
        #user.set_password(random_password)
        #user.save()
        print('recober ')
        coordinator = Coordinator.objects.get(pk=self.id)
        user = User.objects.get(pk=coordinator.user_id)
        
        user.set_password(random_password)
        user.save()
        print('entra en envio')

        activation_url = '{}/activacion/'.format(settings.DOMAIN)

        subject = 'FOJI: Recuperación de cuenta'
        # TODO: Change to correct email.
        from_email = 'catastroinfo@foji.cl'
        to_email = user.email

        text_content = ''
        html_content = render_to_string(
            'foji/email/coordinator-recover-password.html',
            {
                'coordinator': coordinator,
                'new_password': random_password,
            },
        )

        email = EmailMultiAlternatives(
            subject,
            text_content,
            from_email,
            [to_email],
        )

        email.attach_alternative(html_content, 'text/html')

        email.send()
        #send_coordinator_recover_password_email.delay(self.id, random_password)

    def send_beta_email(self):
        import random
        from ..tasks import send_coordinator_beta_email

        random_password = ''

        for i in range(10):
            random_password += random.choice(
                'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
            )

        user = self.user
        user.set_password(random_password)
        user.save()

        send_coordinator_beta_email.delay(self.id, random_password)

    def __str__(self):
        try:
            full_name = self.personal_information.full_name()
        except:
            full_name = 'Sin nombre'

        return full_name

    def activate(self):
        user = self.user
        user.is_active = True
        user.save()

    def deactivate(self):
        user = self.user
        user.is_active = False
        user.save()
