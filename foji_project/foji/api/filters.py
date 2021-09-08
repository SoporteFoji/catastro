# -*- coding: utf-8 -*-
from rest_framework import generics
from rest_framework import pagination

from ..models.coordinator import Coordinator
from ..models.administrator import Administrator
from ..models.director import Director
from ..models.instructor import Instructor
from ..models.cast_member import CastMember
from ..models.personal_information import PersonalInformation
from ..models.user import User

from ..serializers.coordinator import CoordinatorSerializer
from ..serializers.administrator import AdministratorSerializer
from ..serializers.director import DirectorSerializer
from ..serializers.instructor import InstructorSerializer
from ..serializers.cast_member import CastMemberSerializer
from ..serializers.personal_information import PersonalInformationSerializer
from ..serializers.user import UserSerializer
from ..serializers.location import AreaSerializer, ProvinceSerializer, RegionSerializer
from ..models.location import Area, Province, Region

class DefaultPagination(pagination.PageNumberPagination):
    page_size = 16
    page_size_query_param = 'page_size'
    max_page_size = 32


class CoordinatorList(generics.ListAPIView):
    pagination_class = DefaultPagination
    serializer_class = CoordinatorSerializer

    def get_queryset(self):
        request = self.request
        queryset = Coordinator.objects.all()

        first_name = request.query_params.get('first_name', None)
        last_name = request.query_params.get('last_name', None)
        social_id = request.query_params.get('social_id', None)
        email = request.query_params.get('email', None)
        username = request.query_params.get('email', None)
        phone_number_mobile = request.query_params.get('phone_number_mobile', None)
        region = request.query_params.get('region', None)
        province = request.query_params.get('province', None)
        area = request.query_params.get('area', None)

        if first_name is not None:
            queryset = queryset.filter(
                personal_information__first_name__icontains=first_name,
            )

        if last_name is not None:
            queryset = queryset.filter(
                personal_information__last_name__icontains=last_name,
            )

        if social_id is not None:
            queryset = queryset.filter(
                personal_information__social_id__icontains=social_id,
            )

        '''if email is not None:
            queryset = queryset.filter(
                personal_information__email__icontains=email,
            )'''
        if username is not None:
            queryset = queryset.filter(
                user__username__icontains=email,
            )

        if phone_number_mobile is not None:
            queryset = queryset.filter(
                personal_information__phone_number_mobile__icontains=phone_number_mobile,
            )

        if region is not None:
            queryset = queryset.filter(
                orchestras__area__province__region_id=int(region),
            )

        if province is not None:
            queryset = queryset.filter(
                orchestras__area__province__id=int(province),
            )

        if area is not None:
            queryset = queryset.filter(
                orchestras__area__id=int(area),
            )

        return queryset


class AdministratorList(generics.ListAPIView):
    pagination_class = DefaultPagination
    serializer_class = AdministratorSerializer

    def get_queryset(self):
        request = self.request
        queryset = Administrator.objects.all()

        first_name = request.query_params.get('first_name', None)
        last_name = request.query_params.get('last_name', None)
        email = request.query_params.get('email', None)
        username = request.query_params.get('username', None)
        if first_name is not None:
            queryset = queryset.filter(
                personal_information__first_name__icontains=first_name,
            )

        if last_name is not None:
            queryset = queryset.filter(
                personal_information__last_name__icontains=last_name,
            )

        if email is not None:
            queryset = queryset.filter(
                personal_information__email__icontains=email,
            )
        if username is not None:
            queryset = queryset.filter(
                user__username__icontains=username,
            )

        return queryset


class DirectorList(generics.ListAPIView):
    pagination_class = DefaultPagination
    serializer_class = DirectorSerializer

    def get_queryset(self):
        request = self.request
        queryset = Director.objects.all()

        first_name = request.query_params.get('first_name', None)
        last_name = request.query_params.get('last_name', None)
        social_id = request.query_params.get('social_id', None)
        email = request.query_params.get('email', None)
        phone_number_mobile = request.query_params.get('phone_number_mobile', None)
        region = request.query_params.get('region', None)
        province = request.query_params.get('province', None)
        area = request.query_params.get('area', None)

        if first_name is not None:
            queryset = queryset.filter(
                personal_information__first_name__icontains=first_name,
            )

        if last_name is not None:
            queryset = queryset.filter(
                personal_information__last_name__icontains=last_name,
            )

        if social_id is not None:
            queryset = queryset.filter(
                personal_information__social_id__icontains=social_id,
            )

        if email is not None:
            queryset = queryset.filter(
                personal_information__email__icontains=email,
            )

        if phone_number_mobile is not None:
            queryset = queryset.filter(
                personal_information__phone_number_mobile__icontains=phone_number_mobile,
            )

        if region is not None:
            queryset = queryset.filter(
                orchestras__area__province__region_id=int(region),
            )

        if province is not None:
            queryset = queryset.filter(
                orchestras__area__province__id=int(province),
            )

        if area is not None:
            queryset = queryset.filter(
                orchestras__area__id=int(area),
            )

        return queryset


class InstructorList(generics.ListAPIView):
    pagination_class = DefaultPagination
    serializer_class = InstructorSerializer

    def get_queryset(self):
        request = self.request
        queryset = Instructor.objects.all()

        first_name = request.query_params.get('first_name', None)
        last_name = request.query_params.get('last_name', None)
        social_id = request.query_params.get('social_id', None)
        email = request.query_params.get('email', None)
        phone_number_mobile = request.query_params.get('phone_number_mobile', None)
        region = request.query_params.get('region', None)
        province = request.query_params.get('province', None)
        area = request.query_params.get('area', None)
        instrument = request.query_params.get('instrument', None)

        if first_name is not None:
            queryset = queryset.filter(
                personal_information__first_name__icontains=first_name,
            )

        if last_name is not None:
            queryset = queryset.filter(
                personal_information__last_name__icontains=last_name,
            )

        if social_id is not None:
            queryset = queryset.filter(
                personal_information__social_id__icontains=social_id,
            )

        if email is not None:
            queryset = queryset.filter(
                personal_information__email__icontains=email,
            )

        if phone_number_mobile is not None:
            queryset = queryset.filter(
                personal_information__phone_number_mobile__icontains=phone_number_mobile,
            )

        if region is not None:
            queryset = queryset.filter(
                orchestra__area__province__region_id=int(region),
            )

        if province is not None:
            queryset = queryset.filter(
                orchestra__area__province__id=int(province),
            )

        if area is not None:
            queryset = queryset.filter(
                orchestra__area__id=int(area),
            )

        if instrument is not None:
            queryset = queryset.filter(
                instrument__icontains=instrument,
            )

        return queryset

class PersonalInformationList(generics.ListAPIView):
    pagination_class = DefaultPagination
    serializer_class = PersonalInformationSerializer

    def get_queryset(self):
        request = self.request
        queryset = PersonalInformation.objects.all()
        email = request.query_params.get('email', None)
        if email is not None:
            queryset = queryset.filter(
                email__icontains=email,
            )
        
        return queryset

class UserList(generics.ListAPIView):
    pagination_class = DefaultPagination
    serializer_class = UserSerializer

    def get_queryset(self):
        request = self.request
        queryset = User.objects.all()
        username = request.query_params.get('username', None)
        if username is not None:
            queryset = queryset.filter(
                username__icontains=username,
            )
        return queryset

class RegionList(generics.ListAPIView):
    pagination_class = DefaultPagination
    serializer_class = RegionSerializer

    def get_queryset(self):
        request = self.request
        queryset = Region.objects.all()
        code = request.query_params.get('code', None)
        name = request.query_params.get('name', None)

        if code is not None:
            splitted = code.split('-')
            r = splitted[0]

            queryset = queryset.filter(
                region__code__icontains=r,
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
        return queryset

class AreaList(generics.ListAPIView):
    pagination_class = DefaultPagination
    serializer_class = AreaSerializer

    def get_queryset(self):
        request = self.request
        queryset = Area.objects.all()
        return queryset

class ProvinciaList(generics.ListAPIView):
    pagination_class = DefaultPagination
    serializer_class = ProvinceSerializer

    def get_queryset(self):
        request = self.request
        queryset = Province.objects.all()
        return queryset
class CastMemberList(generics.ListAPIView):
    pagination_class = DefaultPagination
    serializer_class = CastMemberSerializer

    def get_queryset(self):
        request = self.request
        queryset = CastMember.objects.all()

        first_name = request.query_params.get('first_name', None)
        last_name = request.query_params.get('last_name', None)
        social_id = request.query_params.get('social_id', None)
        gender = request.query_params.get('gender', None)
        email = request.query_params.get('email', None)
        phone_number_mobile = request.query_params.get('phone_number_mobile', None)
        region = request.query_params.get('region', None)
        province = request.query_params.get('province', None)
        area = request.query_params.get('area', None)
        instrument = request.query_params.get('instrument', None)

        if first_name is not None:
            queryset = queryset.filter(
                personal_information__first_name__icontains=first_name,
            )

        if last_name is not None:
            queryset = queryset.filter(
                personal_information__last_name__icontains=last_name,
            )

        if social_id is not None:
            queryset = queryset.filter(
                personal_information__social_id__icontains=social_id,
            )

        if gender is not None:
            queryset = queryset.filter(
                personal_information__gender=gender,
            )

        if email is not None:
            queryset = queryset.filter(
                personal_information__email__icontains=email,
            )

        if phone_number_mobile is not None:
            queryset = queryset.filter(
                personal_information__phone_number_mobile__icontains=phone_number_mobile,
            )

        if region is not None:
            queryset = queryset.filter(
                orchestra__area__province__region_id=int(region),
            )

        if province is not None:
            queryset = queryset.filter(
                orchestra__area__province__id=int(province),
            )

        if area is not None:
            queryset = queryset.filter(
                orchestra__area__id=int(area),
            )

        if instrument is not None:
            queryset = queryset.filter(
                instrument__icontains=instrument,
            )

        return queryset
