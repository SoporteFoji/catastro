# -*- coding: utf-8 -*-
from rest_framework import serializers

from ..models.location import Region
from ..models.location import Province
from ..models.location import Area


class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = '__all__'


class ProvinceSerializer(serializers.ModelSerializer):
    region = RegionSerializer()

    class Meta:
        model = Province
        fields = '__all__'


class AreaSerializer(serializers.ModelSerializer):
    province = ProvinceSerializer()

    class Meta:
        model = Area
        fields = '__all__'
