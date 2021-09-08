# -*- coding: utf-8 -*-
from django.db import transaction

from rest_framework import generics
from rest_framework import serializers

from ..models.orchestra import Orchestra
from ..models.personal_information import PersonalInformation
from ..models.coordinator import Coordinator
from ..models.director import Director
from ..models.instructor import Instructor
from ..models.cast_member import CastMember

from ..serializers.coordinator import CoordinatorSerializer
from ..serializers.director import DirectorSerializer
from ..serializers.instructor import InstructorSerializer
from ..serializers.cast_member import CastMemberSerializer


class OrchestraMembersSerializer(serializers.ModelSerializer):
    coordinator = CoordinatorSerializer(required=False)
    director = DirectorSerializer(required=False)
    instructors = InstructorSerializer(many=True, required=False)
    cast_members = CastMemberSerializer(many=True, required=False)

    class Meta:
        model = Orchestra
        fields = (
            'coordinator',
            'director',
            'instructors',
            'cast_members',
        )

    def update(self, instance, validated_data):
        coordinator_data = validated_data.get('coordinator')
        director_data = validated_data.get('director')
        instructors_data = validated_data.get('instructors')
        cast_members_data = validated_data.get('cast_members')

        if coordinator_data:
            coordinator_serializer = CoordinatorSerializer(
                instance.coordinator,
                data=coordinator_data,
            )

            if coordinator_serializer.is_valid():
                coordinator = coordinator_serializer.save()

        if director_data and instance.director:
            director_serializer = DirectorSerializer(
                instance.director,
                data=director_data,
            )
        elif director_data:
            director_serializer = DirectorSerializer(
                data=director_data,
            )
        else:
            director_serializer = None

        if director_serializer and director_serializer.is_valid():
            director = director_serializer.save()
            instance.director = director
        elif director_serializer:
            print(director_serializer.errors)

        if instructors_data is not None:
            with transaction.atomic():
                instance.instructors.all().delete()

                for instructor_data in instructors_data:
                    instructor_serializer = InstructorSerializer(
                        data=instructor_data,
                    )

                    if instructor_serializer.is_valid():
                        instructor = instructor_serializer.save(
                            orchestra=instance
                        )

        if cast_members_data is not None:
            with transaction.atomic():
                instance.cast_members.all().delete()

                for cast_member_data in cast_members_data:
                    cast_member_serializer = CastMemberSerializer(
                        data=cast_member_data,
                    )

                    if cast_member_serializer.is_valid():
                        cast_member = cast_member_serializer.save(
                            orchestra=instance,
                        )
                    else:
                        print(cast_member_serializer.errors)

        instance.save()

        return instance


class OrchestraMembersAPI(generics.UpdateAPIView):
    queryset = Orchestra.objects.all()
    serializer_class = OrchestraMembersSerializer
