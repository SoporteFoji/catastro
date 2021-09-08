# -*- coding: utf-8 -*-
from rest_framework import serializers

from ..models.funding import Funding


class FundingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Funding
        fields = ('value',)
