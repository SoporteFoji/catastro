# -*- coding: utf-8 -*-
from django.db import transaction

from rest_framework import serializers

from ..models.instructor import Instructor
from ..models.personal_information import PersonalInformation

from .personal_information import PersonalInformationSerializer


class InstructorSerializer(serializers.ModelSerializer):
    personal_information = PersonalInformationSerializer(required=False)
    orchestra = serializers.SerializerMethodField()

    class Meta:
        model = Instructor
        fields = '__all__'

    def get_orchestra(self, obj):
        try:
            orchestra_id = obj.orchestra.id
        except:
            orchestra_id = None

        try:
            orchestra_name = obj.orchestra.name
        except:
            orchestra_name = None

        return {
            'id': orchestra_id,
            'name': orchestra_name,
        }

    def create(self, validated_data):
        personal_information_data = validated_data.pop('personal_information', None)

        with transaction.atomic():
            if personal_information_data:
                personal_information = PersonalInformation.objects.create(
                    **personal_information_data
                )
            else:
                personal_information = None

            instructor = Instructor.objects.create(
                **validated_data
            )

            if personal_information:
                instructor.personal_information = personal_information
                instructor.save()

        return instructor

    def update(self, instance, validated_data):
        personal_information_data = validated_data.pop('personal_information', None)

        instance = super().update(instance, validated_data)

        if personal_information_data:
            if instance.personal_information is not None:
                personal_information_serializer = PersonalInformationSerializer(
                    instance.personal_information,
                    data=personal_information_data,
                )
            else:
                personal_information_serializer = PersonalInformationSerializer(
                    data=personal_information_data,
                )

            if personal_information_serializer.is_valid():
                personal_information = personal_information_serializer.save()
                instance.personal_information = personal_information

        instance.save()

        return instance
