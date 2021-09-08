# -*- coding: utf-8 -*-
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import serializers

from ..models.location import Region, Area
from ..models.orchestra import Orchestra


class AreaOptionSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source='name')
    value = serializers.IntegerField(source='id')

    class Meta:
        model = Area
        fields = ('title', 'value')


class RegionOptionSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source='name')
    value = serializers.IntegerField(source='id')
    options = serializers.SerializerMethodField()

    class Meta:
        model = Region
        fields = ('title', 'value', 'options')

    def get_options(self, obj):
        region_areas = Area.objects.filter(
            province__region=obj,
        )

        return AreaOptionSerializer(region_areas, many=True).data


class LocationOptionsAPIView(generics.ListAPIView):
    queryset = Region.objects.all()
    serializer_class = RegionOptionSerializer


class RegionOrchestrasSerializer(serializers.ModelSerializer):
    count = serializers.SerializerMethodField()

    class Meta:
        model = Region
        fields = '__all__'

    def get_count(self, obj):
        return Orchestra.objects.filter(
            area__province__region=obj,
            is_active=True,
            orchestra_status='active',
        ).count()


class RegionOrchestrasAPIView(generics.ListAPIView):
    queryset = Region.objects.all()
    serializer_class = RegionOrchestrasSerializer
