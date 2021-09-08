from django.urls import path
from django.conf.urls import url, include
from django.views.decorators.csrf import csrf_exempt

from rest_framework.routers import DefaultRouter

from . import orchestra
from . import members
from . import utils
from . import home
from . import location
from . import funding
from . import institution
from . import statistics
from . import filters
from . import admin
from . import notifications
from . import excel
from . import members_excel
from . import administrator
from . import administrador
from . import personalinformation
from . import user
from . import coordinator
from . import ubicaciones

router = DefaultRouter()
router.register(r'me/orchestras', orchestra.CoordinatorOrchestraViewSet, basename='orchestrasCoordinator')
router.register(r'orchestras', orchestra.OrchestraViewSet, basename='orchestras')

#router.register(r'administrator', administrator.AdministratorViewSet, basename='administrator')

exempt_photo_upload = csrf_exempt(orchestra.OrchestraPhotoAPIView.as_view())

exempt_members = csrf_exempt(members.OrchestraMembersAPI.as_view())

urlpatterns = [
    
    path('coordinator-overview', coordinator.apiOverview, name="coordinator-overview"),
    path('coordinator-list/', filters.CoordinatorList.as_view(), name="coordinator-list"),
    path('coordinator/<str:pk>/', coordinator.coordinatorDetail, name="coordinator-detail"),
    path('coordinator-create/', coordinator.coordinatorCreate, name="coordinator-create"),
    path('coordinator-update/<str:pk>/', coordinator.coordinatorUpdate, name="coordinator-update"),
    path('coordinator-orchesta-update/', coordinator.coordinatorUpdateOrchestra, name="coordinator-orchestra-update"),
    path('coordinator-delete/<str:pk>/', coordinator.coordinatorDelete, name="coordinator-delete"),

    path('personalinformation-overview', personalinformation.apiOverview, name="personalinformation-overview"),
    path('personalinformation-list', filters.PersonalInformationList.as_view(), name="personalinformation-list"),
    path('personalinformation/<str:pk>/', personalinformation.personalinformationDetail, name="personalinformation-detail"),
    path('personalinformation-create/', personalinformation.personalInformationCreate, name="personalinformation-create"),
    path('personalinformation-update/<str:pk>/', personalinformation.personalInformationUpdate, name="personalinformation-update"),
    path('personalinformation-delete/<str:pk>/', personalinformation.personalInformationDelete, name="personalinformation-delete"),

    path('user-overview', user.apiOverview, name="user-overview"),
    path('user-list/', filters.UserList.as_view(), name="user-list"),
    path('user/<str:pk>/', user.userDetail, name="user-detail"),
    path('user-create/', user.userCreate, name="user-create"),
    path('user-update/<str:pk>/', user.userUpdate, name="user-update"),
    path('user-delete/<str:pk>/', user.userDelete, name="user-delete"),

    path('region-overview', ubicaciones.apiOverviewRegion, name="region-overview"),
    path('region-list/', filters.RegionList.as_view(), name="region-list"),
    path('region/<str:pk>/', ubicaciones.regionDetail, name="region-detail"),
    path('region-create/', ubicaciones.regionCreate, name="region-create"),
    path('region-update/<str:pk>/', ubicaciones.regionUpdate, name="region-update"),
    path('region-delete/<str:pk>/', ubicaciones.regionDelete, name="region-delete"),

    path('orquesta-list/', orchestra.OrchestraList.as_view()),

    path('orquesta-create/', orchestra.orquestaCreate, name="orquesta-create"),
    path('orquesta-delete/<str:pk>/', orchestra.orquestaDelete, name="orquesta-delete"),

    path('area-overview', ubicaciones.apiOverviewArea, name="area-overview"),
    path('area-list/', filters.AreaList.as_view(), name="area-list"),
    path('area/<str:pk>/', ubicaciones.areaDetail, name="area-detail"),
    path('area-create/', ubicaciones.areaCreate, name="area-create"),
    path('area-update/<str:pk>/', ubicaciones.areaUpdate, name="area-update"),
    path('area-delete/<str:pk>/', ubicaciones.areaDelete, name="area-delete"),

    path('provincia-overview', ubicaciones.apiOverviewProvincia, name="provincia-overview"),
    path('provincia-list/', filters.ProvinciaList.as_view(), name="provincia-list"),
    path('provincia/<str:pk>/', ubicaciones.provinciaDetail, name="provincia-detail"),
    path('provincia-create/', ubicaciones.provinciaCreate, name="provincia-create"),
    path('provincia-update/<str:pk>/', ubicaciones.provinciaUpdate, name="provincia-update"),
    path('provincia-delete/<str:pk>/', ubicaciones.provinciaDelete, name="provincia-delete"),
    
    path('administrator-overview', administrador.apiOverview, name="administrator-overview"),
    path('administrator/<str:pk>/', administrador.administradorDetail, name="administrator-detail"),
    path('administrator-create/', administrador.administradorCrear, name="administrator-create"),
    path('administrator-update/<str:pk>/', administrador.administradorUpdate, name="administrator-update"),
    path('administrator-delete/<str:pk>/', administrador.administradorDelete, name="administrator-delete"),


    #personalinformation
    #path('personalinformations', filters.PersonalInformationList.as_view()),
    #administrator
    path('administrators', administrator.AdministratorList.as_view()),
    #path('administrator/<int:pk>', administrator.AdministratorDetail.as_view()),
    # Excel upload
    path('v1/orchestras/<int:pk>/excel/',
        members_excel.CastMembersExcelUploadAPI.as_view()),
    # Filter views
    path('v1/coordinators/', filters.CoordinatorList.as_view()),
    path('v1/administrators/', filters.AdministratorList.as_view()),
    path('v1/directors/', filters.DirectorList.as_view()),
    path('v1/instructors/', filters.InstructorList.as_view()),
    path('v1/cast_members/', filters.CastMemberList.as_view()),

    path('v1/orchestras/', orchestra.OrchestraList.as_view()),

    # actions
    path('v1/administrators/<int:pk>/delete/', filters.AdministratorList.as_view()),

    path('v1/orchestras/latest/', orchestra.OrchestraLatest.as_view()),
    path('v1/coordinators/latest/',  admin.CoordinatorLatest.as_view()),

    path('v1/statistics/', statistics.StatisticsAPIView.as_view()),
    path('v1/orchestras/<int:pk>/activate/', orchestra.OrchestraActivate.as_view()),
    path('v1/orchestras/<int:pk>/deactivate/', orchestra.OrchestraDeactivate.as_view()),
    path('v1/orchestras/<int:pk>/delete/', orchestra.OrchestraDelete.as_view()),

    path('v1/home/orchestras/', home.OrchestraList.as_view()),
    path('dashboard/orchestras/<int:pk>/', orchestra.OrchestraUpdateAPIView.as_view()),
    path('dashboard/orchestras/<int:pk>/members/', exempt_members),
    path('orchestras/<int:pk>/photo/', exempt_photo_upload),
    url(r'^util/location-options/$', utils.LocationOptionsAPIView.as_view()),
    url(r'^util/region-orchestras/$', utils.RegionOrchestrasAPIView.as_view()),


    # API for locations
    path('v1/regions/', location.RegionList.as_view()),
    path('v1/provinces/', location.ProvinceList.as_view()),
    path('v1/areas/', location.AreaList.as_view()),

    # Funding
    path('v1/dashboard/orchestras/<int:pk>/funding/',
        funding.OrchestraFundingAPI.as_view()),

    # Institution
    path('v1/dashboard/orchestras/<int:pk>/institution/',
        institution.OrchestraInstitutionAPI.as_view()),

    path('v0/notifications/me/', notifications.NotificationAPIView.as_view()),
] + router.urls
