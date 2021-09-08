# -*- coding: utf-8 -*-
from django.db import transaction

from rest_framework import serializers

from ..models.administrator import Administrator
from ..models.personal_information import PersonalInformation

from .user import UserSerializer
from .personal_information import PersonalInformationSerializer


class AdministratorSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=False)
    personal_information = PersonalInformationSerializer(required=False)

    class Meta:
        model = Administrator
        fields = '__all__'

    def create(self, validated_data):
        personal_information_data = validated_data.pop('personal_information', None)

        with transaction.atomic():
            if personal_information_data:
                personal_information = PersonalInformation.objects.create(
                    **personal_information_data
                )
            else:
                personal_information = None

            administrator = Administrator.objects.create(
                **validated_data
            )

            if personal_information:
                administrator.personal_information = personal_information
                administrator.save()

        return administrator

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
