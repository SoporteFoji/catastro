# -*- coding: utf-8 -*-
from rest_framework import serializers

from ..models.orchestra import Orchestra
from ..models.director import Director
from ..models.instructor import Instructor
from ..models.cast_member import CastMember
from ..models.location import Area

from ..serializers import location as location_serializers

from .coordinator import CoordinatorSerializer
from .director import DirectorSerializer
from .institution_information import InstitutionInformationSerializer
from .instructor import InstructorSerializer
from .cast_member import CastMemberSerializer
from .social_network_information import SocialNetworkSerializer
from .funding import FundingSerializer


class OrquestaSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Orchestra
        fields = ['name','orchestra_type','creation_date','city']


class OrchestraSerializer(serializers.ModelSerializer):
    institution = InstitutionInformationSerializer()
    coordinator = CoordinatorSerializer()
    director = DirectorSerializer()
    instructors = InstructorSerializer(many=True)
    cast_members = CastMemberSerializer(many=True)
    area = location_serializers.AreaSerializer()
    social_networks = SocialNetworkSerializer()
    funding = FundingSerializer(many=True)
    orchestra_code = serializers.SerializerMethodField()

    orchestra_members_count = serializers.SerializerMethodField()

    class Meta:
        model = Orchestra
        fields = '__all__'

    def get_orchestra_members_count(self, obj):
        return obj.members_count()

    def get_orchestra_code(self, obj):
        try:
            region_code = str(obj.area.province.region.code)
            area_code = str(obj.area.code)
            id_code = self.generate_id_code(obj.id)
        except:
            return 'N/A'

        return '{}-{}-{}'.format(
            region_code,
            area_code,
            id_code,
        )

    def generate_id_code(self, obj_id):
        id_len = len(str(obj_id))

        if id_len >= 10:
            return str(obj_id)

        padding = '0' * (10 - id_len)
        return '{}{}'.format(
            padding,
            obj_id,
        )
