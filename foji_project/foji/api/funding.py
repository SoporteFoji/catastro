# -*- coding: utf-8 -*-
from django.db import transaction

from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from ..models.orchestra import Orchestra
from ..models.funding import Funding

from ..serializers.funding import FundingSerializer


class OrchestraFundingAPI(APIView):
    def patch(self, request, pk=None):
        return self.post(request, pk)

    def post(self, request, pk=None):
        orchestra = Orchestra.objects.get(pk=pk)

        print(request.data)

        serializer = FundingSerializer(
            data=request.data,
            many=True,
        )

        serializer_error = FundingSerializer(
            data=orchestra.funding,
            many=True,
        )

        serializer_error.is_valid()

        if serializer.is_valid():
            try:
                with transaction.atomic():
                    orchestra.funding.all().delete()

                    for funding in serializer.data:
                        print('funding in serializer:', funding)
                        Funding.objects.create(
                            orchestra=orchestra,
                            value=funding['value']
                        )
            except Exception as e:
                print(e)
                return Response(serializer_error.data, status=status.HTTP_400_BAD_REQUEST)
        else:
            print(serializer.errors)
            return Response(serializer_error.data, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.data)
