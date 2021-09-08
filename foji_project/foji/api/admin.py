# -*- coding: utf-8 -*-
from rest_framework import generics
from rest_framework import serializers
from rest_framework import pagination

from ..models.coordinator import Coordinator
from ..serializers.coordinator import CoordinatorSerializer


class CoordinatorPagination(pagination.PageNumberPagination):
    page_size = 50




class CoordinatorList(generics.ListAPIView):
    serializer_class = CoordinatorSerializer
    pagination_class = CoordinatorPagination

    def get_queryset(self):
        # TODO: Implement different queries.
        queryset = Coordinator.objects.all()

        active = self.request.query_params.get('active', None)

        if active is not None:
            queryset = queryset.filter(
                is_active=active,
            )

        return queryset


class CoordinatorLatest(generics.ListAPIView):
    serializer_class = CoordinatorSerializer
    queryset = Coordinator.objects.all().order_by('-created_date')[:10]
