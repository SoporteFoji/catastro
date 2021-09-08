# -*- coding: utf-8 -*-
from django.db import transaction

from rest_framework import serializers

from ..models.coordinator import Coordinator
from ..models.personal_information import PersonalInformation
from ..models.orchestra import Orchestra

from .user import UserSerializer
from .personal_information import PersonalInformationSerializer


class CoordinatorSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    orchestras = serializers.SerializerMethodField()
    personal_information = PersonalInformationSerializer(required=False)

    class Meta:
        model = Coordinator
        fields = '__all__'

    def get_orchestras(self, obj):
        orchestras = Orchestra.objects.filter(
            coordinator=obj,
        )
        return [ { 'id': o.id, 'name': o.name } for o in orchestras ]

    def create(self, validated_data):
        personal_information_data = validated_data.pop('personal_information', None)

        with transaction.atomic():
            if personal_information_data:
                personal_information = PersonalInformation.objects.create(
                    **personal_information_data
                )
            else:
                personal_information = None

            coordinator = Coordinator.objects.create(
                **validated_data
            )

            if personal_information:
                coordinator.personal_information = personal_information
                coordinator.save()

        return coordinator

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
