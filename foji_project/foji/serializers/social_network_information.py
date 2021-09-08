# -*- coding: utf-8 -*-
from rest_framework import serializers

from ..models.social_network_information import SocialNetworkInformation


class SocialNetworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialNetworkInformation
        exclude = ('id',)
