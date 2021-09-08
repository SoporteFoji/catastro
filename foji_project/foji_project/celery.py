# -*- coding: utf-8 -*-

import os
from celery import Celery


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'foji_project.settings_docker')

app = Celery('foji_project')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
