# -*- coding: utf-8 -*-
from rest_framework import serializers
from rest_framework import generics
from rest_framework import pagination

from ..models.orchestra import Orchestra
from ..models.social_network_information import SocialNetworkInformation
from ..models.location import Region


class OrchestraPagination(pagination.PageNumberPagination):
    page_size = 16
    page_size_query_param = 'page_size'
    max_page_size = 32


class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = '__all__'


class SocialNetworkInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialNetworkInformation
        fields = '__all__'


class OrchestraSerializer(serializers.ModelSerializer):
    util = serializers.SerializerMethodField()
    social_networks = SocialNetworkInformationSerializer()

    class Meta:
        model = Orchestra
        fields = '__all__'

    def get_util(self, obj):
        try:
            region = obj.area.province.region
        except Exception as e:
            print(e)
            print(obj.id)
            return None

        region_serializer = RegionSerializer(region)

        return {
            'region': region_serializer.data
        }


class OrchestraList(generics.ListAPIView):
    serializer_class = OrchestraSerializer
    pagination_class = OrchestraPagination

    def get_queryset(self):
        """
        Filters orchestras by region specified in the url query parameters.
        """
        queryset = Orchestra.objects.filter(
            is_active=True,
            orchestra_status='active',
        )

        region = self.request.query_params.get('region', None)

        if region is not None:
            queryset = queryset.filter(
                area__province__region=region,
            )

        return queryset
