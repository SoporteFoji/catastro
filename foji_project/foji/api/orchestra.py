# -*- coding: utf-8 -*-
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework import serializers
from rest_framework import viewsets
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import pagination
from rest_framework import permissions, status
import json
from ..models.location import Area
from ..models.orchestra import Orchestra
from ..models.social_network_information import SocialNetworkInformation
from ..serializers.orchestra import OrchestraSerializer, OrquestaSerializer
from django.http import JsonResponse


class CoordinatorOrchestraViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = OrchestraSerializer

    def get_queryset(self):
        return Orchestra.objects.filter(
            coordinator__user=self.request.user,
        )


class OrchestraPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orchestra
        fields = ('photo',)


class OrchestraPhotoAPIView(generics.UpdateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = Orchestra.objects.all()
    serializer_class = OrchestraPhotoSerializer


################

class SocialNetworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialNetworkInformation
        exclude = ('id',)


class OrchestraUpdateSerializer(serializers.ModelSerializer):
    social_networks = SocialNetworkSerializer(required=False)
    creation_date = serializers.DateField(
        input_formats=[
            'iso-8601',
            '%d/%m/%Y',
        ],
        required=False,
    )

    class Meta:
        model = Orchestra
        fields = (
            'name',
            'orchestra_status',
            'orchestra_type',
            'social_networks',
            'area',
            'city',
            'website',
            'creation_date',
        )

    def create(self, validated_data):
        social_networks_data = validated_data.pop('social_networks')
        orchestra = Orchestra.objects.create(
            **validated_data
        )

        if social_networks_data:
            social_networks = SocialNetworkInformation.objects.create(
                **social_networks_data
            )

            orchestra.social_networks = social_networks
            orchestra.save()

        return orchestra

    def update(self, instance, validated_data):
        social_networks_data = validated_data.pop('social_networks', None)
        social_networks = instance.social_networks

        instance.name = validated_data.get('name', instance.name)
        instance.orchestra_status = validated_data.get('orchestra_status',
                instance.orchestra_status)
        instance.orchestra_type = validated_data.get('orchestra_type', instance.orchestra_type)
        instance.area = validated_data.get('area', instance.area)
        instance.city = validated_data.get('city', instance.city)
        instance.creation_date = validated_data.get('creation_date', instance.creation_date)
        instance.website = validated_data.get('website', instance.website)

        instance.save()

        if social_networks_data and social_networks:
            social_networks.facebook = social_networks_data.get('facebook', social_networks.facebook)
            social_networks.instagram = social_networks_data.get('instagram', social_networks.instagram)
            social_networks.twitter = social_networks_data.get('twitter', social_networks.twitter)
            social_networks.youtube = social_networks_data.get('youtube', social_networks.youtube)
            social_networks.pinterest = social_networks_data.get('pinterest', social_networks.pinterest)
            social_networks.vimeo = social_networks_data.get('vimeo', social_networks.vimeo)

            social_networks.save()

        if social_networks_data and not social_networks:
            social_networks = SocialNetworkInformation.objects.create(
                **social_networks_data
            )

            instance.social_networks = social_networks
            instance.save()

        return instance


class OrchestraViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = Orchestra.objects.all()
    serializer_class = OrchestraSerializer

    restricted_actions = [
        'create',
        'update',
    ]

    def get_serializer_class(self):
        if self.action in self.restricted_actions:
            return OrchestraUpdateSerializer
        else:
            return self.serializer_class


class OrchestraUpdateAPIView(generics.UpdateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = Orchestra.objects.all()
    serializer_class = OrchestraUpdateSerializer


class OrchestraActivate(APIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    def post(self, request, pk):
        orchestra = Orchestra.objects.get(pk=pk)

        orchestra.is_active = True
        orchestra.save()

        return Response(True)


class OrchestraDeactivate(APIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    def post(self, request, pk):
        orchestra = Orchestra.objects.get(pk=pk)

        orchestra.is_active = False
        orchestra.save()

        return Response(False)


class OrchestraDelete(APIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    def delete(self, request, pk):
        orchestra = Orchestra.objects.get(pk=pk)

        orchestra.delete()

        return Response(True)


class OrchestraLatest(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = OrchestraSerializer
    queryset = Orchestra.objects.all().order_by('-created_date')[:5]


#################### Filtering endpoint

class OrchestraPagination(pagination.PageNumberPagination):
    page_size = 16
    page_size_query_param = 'page_size'
    max_page_size = 32


class OrchestraList(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = OrchestraSerializer
    pagination_class = OrchestraPagination

    def get_queryset(self):
        # Filter by queries.
        request = self.request

        queryset = Orchestra.objects.all()

        code = request.query_params.get('code', None)
        name = request.query_params.get('name', None)
        region = request.query_params.get('region', None)
        province = request.query_params.get('province', None)
        area = request.query_params.get('area', None)
        city = request.query_params.get('city', None)
        active = request.query_params.get('active', None)
        orchestra_type = request.query_params.get('orchestra_type', None)

        if code is not None:
            splitted = code.split('-')
            r = splitted[0]

            queryset = queryset.filter(
                area__province__region__code__icontains=r,
            )

            try:
                a = splitted[1]
                queryset = queryset.filter(
                    area__code__icontains=a,
                )
            except:
                pass

            try:
                i = int(splitted[2])
                queryset = queryset.filter(
                    id=i,
                )
            except:
                pass

        if name is not None:
            queryset = queryset.filter(
                name__icontains=name,
            )

        if region is not None:
            print(region)
            print('despues de error')
            queryset = queryset.filter(
                area__province__region__id=int(region),
            )

        if province is not None:
            queryset = queryset.filter(
                area__province__id=int(province),
            )

        if area is not None:
            queryset = queryset.filter(
                area__id=int(area),
            )

        if city is not None:
            queryset = queryset.filter(
                city__icontains=city,
            )

        if active is not None:
            if active == 'true':
                active = True
            else:
                active = False

            queryset = queryset.filter(
                is_active=active,
            )

        if orchestra_type is not None:
            queryset = queryset.filter(
                orchestra_type=orchestra_type,
            )

        return queryset


@api_view(['POST'])
def orquestaCreate(request):
    print(request.data)
    fecha=request.data["creation_date"].split("/")[2]+"-"+request.data["creation_date"].split("/")[1]+"-"+request.data["creation_date"].split("/")[0]
    orquesta = Orchestra(
            name=request.data["name"],
            orchestra_type=request.data["orchestra_type"],
            creation_date=fecha,
            city=request.data["city"],
            area_id=1,
            coordinator_id=1
        )
    print('se inserta?')
    orquesta.save()
    print(orquesta)
    orquestainsertada = Orchestra.objects.get(name__exact=orquesta.name)
    print(orquestainsertada.id)
    print('si')

    return Response({'id':orquestainsertada.id})
    try:
        orquesta = Orchestra(
                name=request.data["name"],
                orchestra_type=request.data["orchestra_type"],
                creation_date=request.data["creation_date"],
                city=request.data["city"],
                area_id=1
            )
        orquesta.save()
        return JsonResponse(request.data)
    except Exception:
        return JsonResponse({'error': 'Something terrible went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
  
@api_view(['DELETE'])
def orquestaDelete(request, pk):
    orquesta = Orchestra.objects.get(id=pk)
    orquesta.delete()
    return Response('Orquesta Borrada exitosamente')
'''try:
        orquesta = Orchestra.objects.create(
            name=request.data["name"],
            orchestra_type=request.data["orchestra_type"],
            creation_date=request.data["creation_date"],
            city=request.data["city"]
        )
        serializer = OrquestaSerializer(orquesta)
        if serializer.is_valid():
            serializer.save()
        return JsonResponse(serializer.data)
    except Exception:
        return JsonResponse({'error': 'Something terrible went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    '''