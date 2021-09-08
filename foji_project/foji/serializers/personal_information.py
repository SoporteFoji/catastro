# -*- coding: utf-8 -*-
from rest_framework import serializers

from ..models.personal_information import PersonalInformation


class PersonalInformationSerializer(serializers.ModelSerializer):
    birth_date = serializers.DateField(
        input_formats=[
            'iso-8601',
            '%d/%m/%Y',
        ],
        required=False,
    )

    age = serializers.SerializerMethodField()

    class Meta:
        model = PersonalInformation
        fields = '__all__'

    def get_age(self, obj):
        return obj.age()
