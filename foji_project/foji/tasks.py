# -*- coding: utf-8 -*-

from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.core import signing

from celery import shared_task

from foji.models.coordinator import Coordinator


@shared_task
def send_coordinator_activation_email(coordinator_id):
    coordinator = Coordinator.objects.get(pk=coordinator_id)

    # Generate token
    token = signing.dumps({
        'coordinator_id': coordinator.id,
    })


    activation_url = '{}/activacion/?tkn={}'.format(
        'http://186.67.83.36:9000',
        token,
    )

    subject = 'FOJI: Activación cuenta coordinador'
    # TODO: Change to correct email.
    from_email = 'catastro@foji.cl'
    to_email = coordinator.user.email

    text_content = ''
    html_content = render_to_string(
        'foji/email/coordinator-activation.html',
        {
            'activation_url': activation_url,
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


@shared_task
def send_coordinator_recover_password_email(coordinator_id, new_password):
    coordinator = Coordinator.objects.get(pk=coordinator_id)
    print('entra en envio')

    activation_url = '{}/activacion/'.format(settings.DOMAIN)

    subject = 'FOJI: Recuperación de cuenta'
    # TODO: Change to correct email.
    from_email = 'polivarez@foji.cl'
    to_email = coordinator.user.email

    text_content = ''
    html_content = render_to_string(
        'foji/email/coordinator-recover-password.html',
        {
            'coordinator': coordinator,
            'new_password': new_password,
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


@shared_task
def send_coordinator_beta_email(coordinator_id, password):
    coordinator = Coordinator.objects.get(pk=coordinator_id)

    activation_url = '{}/activacion/'.format(settings.DOMAIN)

    subject = 'FOJI: Nueva plataforma de Catastros (BETA)'
    # TODO: Change to correct email.
    from_email = 'catastro@foji.cl'
    to_email = coordinator.user.email

    text_content = ''
    html_content = render_to_string(
        'foji/email/coordinator-beta.html',
        {
            'activation_url': 'http://186.67.83.36:9000/ingresar/',
            'coordinator_email': coordinator.user.username,
            'coordinator_password': password,
        },
    )

    email = EmailMultiAlternatives(
        subject,
        text_content,
        from_email,
        [to_email],
        bcc=['assidman@gmail.com'],
    )

    email.attach_alternative(html_content, 'text/html')

    email.send()
