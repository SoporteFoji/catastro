# -*- coding: utf-8 -*-
from django.urls import path
from django.conf.urls import url
from django.contrib.auth import views as auth_views
from django.views.generic.base import TemplateView

from .views import authentication
from .views import registration
from .views import dashboard
from .views import orchestra
from .views import members
from .views import profile
from .views import excel
from .views import administration
from .views import administrator
from .views import coordinator
from .views import activation
from .views import testview
from .views import crearcoordinator
from .views import personal_informationlist
from .views import area,region,provincia

urlpatterns = [
    path(
        'recuperar-clave/', profile.ForgotPassword.as_view(),
    ),
    path(
        'cambiar-clave/', profile.ChangePassword.as_view(),
    ),
    # Excel views
    path(
        'orquestas/', administration.AdministrationOrchestras.as_view(),
    ),
    path(
        'mantenedores/', administration.AdministrationMantenedores.as_view(),
    ),
    path(
        'usuarios/', administration.AdministrationUsers.as_view(),
    ),
        path(
        'administrator/<int:pk>', administrator.Profile.as_view(),
    ),

    path(
        'area/<int:pk>', area.Profile.as_view(),
    ),
    path(
        'area/', area.Creacion.as_view(),
    ),
    path(
        'provincia/<int:pk>', provincia.Profile.as_view(),
    ),
    path(
        'provincia/', provincia.Creacion.as_view(),
    ),
    path(
        'region/<int:pk>', region.Profile.as_view(),
    ),
    path(
        'region/', region.Creacion.as_view(),
    ),
    path(
        'orquesta/', orchestra.Creacion.as_view(),
    ),
    path(
        'coordinador/', coordinator.Creacion.as_view(),
    ),
    path(
        'administrador/', administrator.Creacion.as_view(),
    ),
    path(
        'coordinator/<int:pk>', coordinator.Profile.as_view(),
    ),
    path(
        'coordinator/delete/<int:pk>', coordinator.Delete.as_view(),
    ),
    path(
        'administrator/delete/<int:pk>', administrator.Delete.as_view(),
    ),
    path(
        'orchestras/excel/', excel.OrchestraExcelView.as_view(),
    ),
    path(
        'coordinators/excel/', excel.CoordinatorExcelView.as_view(),
    ),
    path(
        'administrators/excel/', excel.AdministratorExcelView.as_view(),
    ),
    path(
        'directors/excel/', excel.DirectorExcelView.as_view(),
    ),
    path(
        'instructors/excel/', excel.InstructorExcelView.as_view(),
    ),
    path(
        'cast_members/excel/', excel.CastMemberExcelView.as_view(),
    ),
    path(
        '',
        TemplateView.as_view(template_name='foji/public/home_public.html'),
    ),
    path(
        'home/',
        TemplateView.as_view(template_name='foji/public/home_public.html'),
    ),

    path(
        'activacion/',
        activation.ActivationView.as_view(),
    ),
    path(
        'perfil/',
        profile.CoordinatorProfile.as_view(),
    ),
    path(
        'registro/coordinador/',
        registration.CoordinatorRegistration.as_view(),
        name='coordinator-registration',
    ),
    path(
        'registro/orquesta/',
        registration.OrchestraRegistration.as_view(),
        name='orchestra-registration',
    ),
    path(
        'registro/financiamiento/',
        registration.OrchestraFundingRegistration.as_view(),
    ),
    path(
        'ingresar/',
        auth_views.LoginView.as_view(
            template_name='foji/login.html',
            redirect_authenticated_user=True,
        ),
    ),
    path(
        'cerrar-sesion/',
        authentication.logout_view,
    ),
    path(
        'dashboard/',
        dashboard.CoordinatorView.as_view(),
    ),
    path(
        'dashboard/orquesta/',
        orchestra.OrchestraView.as_view(),
        name='orchestra-create',
    ),
    path(
        'dashboard/orquesta/<int:pk>/institucion/',
        orchestra.InstitutionView.as_view(),
        name='institution-create',
    ),
    path(
        'dashboard/orquesta/<int:pk>/financiamiento/',
        orchestra.FundingView.as_view(),
        name='funding-create',
    ),
    path(
        'dashboard/orquesta/<int:pk>/integrantes/',
        orchestra.MembersView.as_view(),
        name='members-create',
    ),
    path(
        'orquesta/<int:pk>/',
        orchestra.Profile.as_view(),
    ),
    path(
        'orquesta/delete/<int:pk>/',
        orchestra.Delete.as_view(),
    ),
    path(
        'orquesta/<int:pk>/integrantes.xlsx',
        members.CastMembersExcelView.as_view(),
    ),
    path(
        'notificaciones/',
        TemplateView.as_view(template_name='foji/dashboard/administrator_notifications.html'),
    ),


    path(
        'coordinadoradd/',
        crearcoordinator.CoordinatorCreateView.as_view(), name='foji/create'
    ),
    url(r'^usercoordinador/$', testview.get_name, name='basic'),
    path(
        'personalinformationlist/',
        personal_informationlist.PersonaInformationList.as_view(), name='list'
    ),
    path('personalinformationdel/<int:pk>'
      ,
        personal_informationlist.PersonaInformationDelete.as_view(), name='delete'
    ),

    path(
        'orquestalist/',orchestra.OrchestraList.as_view(), name='list'
    ),
]
