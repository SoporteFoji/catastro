# -*- coding: utf-8 -*-
from django.db import models


class BaseModel(models.Model):
    """
    Base model for accounting creation and modification dates.
    """
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
