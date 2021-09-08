# -*- coding: utf-8 -*-
from rest_framework.views import APIView
from rest_framework.response import Response

from ..models.orchestra import Orchestra
from ..models.administrator import Administrator
from ..models.coordinator import Coordinator
from ..models.director import Director
from ..models.instructor import Instructor
from ..models.cast_member import CastMember


class StatisticsAPIView(APIView):
    def get(self, request):
        data = {
            'orchestras': Orchestra.objects.all().count(),
            'administrators': Administrator.objects.all().count(),
            'coordinators': Coordinator.objects.all().count(),
            'directors': Director.objects.all().count(),
            'instructors': Instructor.objects.all().count(),
            'cast_members': CastMember.objects.all().count(),
        }

        return Response(data)
