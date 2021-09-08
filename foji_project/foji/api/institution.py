# -*- coding: utf-8 -*-
from rest_framework import serializers
from rest_framework import generics

from ..models.orchestra import Orchestra
from ..serializers.institution_information import InstitutionInformationSerializer


class OrchestraInstitutionSerializer(serializers.ModelSerializer):
    institution = InstitutionInformationSerializer()

    class Meta:
        model = Orchestra
        fields = (
            'institution',
        )

    def update(self, instance, validated_data):
        institution_data = validated_data.pop('institution', None)

        print(institution_data)

        if institution_data is None:
            print('No institution data')
            return instance

        if instance.institution:
            print('There was an institution.')
            institution_serializer = InstitutionInformationSerializer(
                instance.institution,
                data=institution_data,
            )
        else:
            print('There is not an institution.')
            institution_serializer = InstitutionInformationSerializer(
                data=institution_data,
            )

        if institution_serializer.is_valid():
            print('I was valid')
            institution = institution_serializer.save()
            instance.institution = institution
        else:
            print(institution_serializer.errors)

        instance.save()

        return instance


class OrchestraInstitutionAPI(generics.UpdateAPIView):
    queryset = Orchestra.objects.all()
    serializer_class = OrchestraInstitutionSerializer
