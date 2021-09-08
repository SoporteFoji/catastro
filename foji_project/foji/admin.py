from django.contrib import admin

from .models.user import User
from .models.personal_information import PersonalInformation
from .models.administrator import Administrator
from .models.coordinator import Coordinator
from .models.orchestra import Orchestra
from .models.director import Director
from .models.instructor import Instructor
from .models.cast_member import CastMember
from .models.institution_information import InstitutionInformation
from .models.social_network_information import SocialNetworkInformation
from .models.location import Region, Province, Area
from .models.funding import Funding


class UserModelAdmin(admin.ModelAdmin):
    list_display = (
        'username',
    )

    search_fields = [
        'username',
        'email',
    ]


class PersonalInformationModelAdmin(admin.ModelAdmin):
    list_display = (
        'first_name',
        'last_name',
        'social_id',
        'phone_number_mobile',
    )

    search_fields = [
        'first_name',
        'last_name',
        'email',
    ]


class AdministratorModelAdmin(admin.ModelAdmin):
    list_display = (
        'first_name',
        'last_name',
    )

    search_fields = [
        'personal_information__first_name',
        'personal_information__last_name',
        'personal_information__email',
        'user__username',
        'user__email',
    ]

    def first_name(self, obj):
        try:
            result = obj.personal_information.first_name
        except:
            result = ''

        return result

    def last_name(self, obj):
        try:
            result = obj.personal_information.last_name
        except:
            result = ''

        return result


class CoordinatorModelAdmin(admin.ModelAdmin):
    list_display = (
        'first_name',
        'last_name',
        'role',
    )

    actions = ['validate', 'invalidate', 'send_invitation']

    search_fields = [
        'personal_information__first_name',
        'personal_information__last_name',
        'personal_information__email',
        'user__username',
        'user__email',
    ]

    def first_name(self, obj):
        try:
            result = obj.personal_information.first_name
        except:
            result = ''

        return result

    def last_name(self, obj):
        try:
            result = obj.personal_information.last_name
        except:
            result = ''

        return result

    def validate(self, request, queryset):
        for coordinator in queryset:
            try:
                coordinator.user.is_active = True
                coordinator.save()
            except:
                pass

    def invalidate(self, request, queryset):
        for coordinator in queryset:
            try:
                coordinator.user.is_active = False
                coordinator.save()
            except:
                pass

    def send_invitation(self, request, queryset):
        for coordinator in queryset:
            try:
                coordinator.send_beta_email()
            except:
                pass


    validate.short_description = 'Validar usuarios seleccionados'
    invalidate.short_description = 'Invalidar usuarios seleccionados'
    send_invitation.short_description = 'Reenviar correo de invitación'


class OrchestraModelAdmin(admin.ModelAdmin):
    pass

class DirectorModelAdmin(admin.ModelAdmin):
    list_display = (
        'first_name',
        'last_name',
    )

    search_fields = [
        'personal_information__first_name',
        'personal_information__last_name',
        'personal_information__email',
    ]

    def first_name(self, obj):
        try:
            result = obj.personal_information.first_name
        except:
            result = ''

        return result

    def last_name(self, obj):
        try:
            result = obj.personal_information.last_name
        except:
            result = ''

        return result


class InstructorModelAdmin(admin.ModelAdmin):
    list_display = (
        'first_name',
        'last_name',
    )

    search_fields = [
        'personal_information__first_name',
        'personal_information__last_name',
        'personal_information__email',
    ]

    def first_name(self, obj):
        try:
            result = obj.personal_information.first_name
        except:
            result = ''

        return result

    def last_name(self, obj):
        try:
            result = obj.personal_information.last_name
        except:
            result = ''

        return result


class CastMemberModelAdmin(admin.ModelAdmin):
    list_display = (
        'first_name',
        'last_name',
    )

    search_fields = [
        'personal_information__first_name',
        'personal_information__last_name',
        'personal_information__email',
    ]

    def first_name(self, obj):
        try:
            result = obj.personal_information.first_name
        except:
            result = ''

        return result

    def last_name(self, obj):
        try:
            result = obj.personal_information.last_name
        except:
            result = ''

        return result


class InstitutionInformationModelAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'legal_representation',
    )

    search_fields = [
        'name',
    ]


class SocialNetworkInformationModelAdmin(admin.ModelAdmin):
    pass


class RegionModelAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'code',
    )


class ProvinceModelAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'code',
    )


class AreaModelAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'code',
    )

class FundingModelAdmin(admin.ModelAdmin):
    pass


admin.site.register(User, UserModelAdmin)
admin.site.register(PersonalInformation, PersonalInformationModelAdmin)
admin.site.register(Administrator, AdministratorModelAdmin)
admin.site.register(Coordinator, CoordinatorModelAdmin)
admin.site.register(Orchestra, OrchestraModelAdmin)
admin.site.register(Director, DirectorModelAdmin)
admin.site.register(Instructor, InstructorModelAdmin)
admin.site.register(CastMember, CastMemberModelAdmin)
admin.site.register(InstitutionInformation, InstitutionInformationModelAdmin)
admin.site.register(SocialNetworkInformation, SocialNetworkInformationModelAdmin)
admin.site.register(Region, RegionModelAdmin)
admin.site.register(Province, ProvinceModelAdmin)
admin.site.register(Area, AreaModelAdmin)
admin.site.register(Funding, FundingModelAdmin)
