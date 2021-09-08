from django.db import transaction

from rest_framework import serializers

from ..models.institution_information import InstitutionInformation

from .personal_information import PersonalInformationSerializer


class InstitutionInformationSerializer(serializers.ModelSerializer):
    legal_representation = PersonalInformationSerializer(required=False)

    class Meta:
        model = InstitutionInformation
        fields = '__all__'

    def create(self, validated_data):
        legal_representation_data = validated_data.pop(
            'legal_representation',
            None,
        )

        with transaction.atomic():
            institution_information = super().create(validated_data)

            if legal_representation_data:
                legal_representation_serializer = \
                    PersonalInformationSerializer(
                        data=legal_representation_data,
                    )

            if legal_representation_serializer.is_valid():
                legal_representation = legal_representation_serializer.save()
                institution_information.legal_representation = \
                    legal_representation

                institution_information.save()

        return institution_information

        
    def update(self, instance, validated_data):
        legal_representation_data = validated_data.pop(
            'legal_representation',
            None,
        )

        institution_information = super().update(instance, validated_data)

        if legal_representation_data:
            if institution_information.legal_representation:
                legal_representation_serializer = \
                    PersonalInformationSerializer(
                        institution_information.legal_representation,
                        data=legal_representation_data,
                    )
            else:
                legal_representation_serializer = \
                    PersonalInformationSerializer(
                        data=legal_representation_data,
                    )

            if legal_representation_serializer.is_valid():
                legal_representation = legal_representation_serializer.save()
                institution_information.legal_representation = \
                    legal_representation

        institution_information.save()

        return institution_information
