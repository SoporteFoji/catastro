# -*- coding: utf-8 -*-
from rest_framework import generics

from ..models.location import Region
from ..models.location import Province
from ..models.location import Area

from ..serializers.location import RegionSerializer
from ..serializers.location import ProvinceSerializer
from ..serializers.location import AreaSerializer



class RegionList(generics.ListAPIView):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer


class ProvinceList(generics.ListAPIView):
    queryset = Province.objects.all()
    serializer_class = ProvinceSerializer


class AreaList(generics.ListAPIView):
    queryset = Area.objects.all()
    serializer_class = AreaSerializer
