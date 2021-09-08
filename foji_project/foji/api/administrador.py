from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..serializers.administrator import AdministratorSerializer
from ..models.administrator import Administrator
from ..models.personal_information import PersonalInformation
from ..models.user import User

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'Detail View': '/administrador/<str:pk>/',
        'Create': '/administrador-create/',
        'Update': '/administrador-update/<str:pk>/',
        'Delete': '/administrador-delete/<str:pk>/',
    }
    return Response(api_urls)


@api_view(['GET'])
def administradorDetail(request, pk):
    print("entra aqui")
    print(pk)
    administrador = Administrator.objects.get(id=pk)
    
    serializer = AdministratorSerializer(administrador, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def administradorCreate(request):
    print(request.data['personal_information']['id'])
    print(request.data['user']['id'])
    admin = Administrator(personal_information_id=request.data['personal_information']['id'],user_id=request.data['user']['id'])
    admin.save()
    return Response(admin)

@api_view(['POST'])
def administradorCrear(request):
    print(request.data)
    print(request.data['personal_information']['email'])
    print(request.data['user']['username'])
    pi, created1 = PersonalInformation.objects.update_or_create(email=request.data['personal_information']['email'],
    defaults=request.data['personal_information'])
    us, created2 = User.objects.update_or_create(username=request.data['user']['username'],defaults=request.data['user'])
    us.is_staff=True
    us.is_active=True
    us.is_superuser=True
    us.save()
    print(pi.id)
    updatepass(request.data['user']['password'], us.id)

    try:
        admin = Administrator.objects.update_or_create(personal_information=pi,user=us)
        #obj = Person.objects.get(first_name='John', last_name='Lennon')
    except Administrator.DoesNotExist:
        admin = Administrator(personal_information=pi,user=us)
        admin.save()
        print(admin)
    #admin.save()
    return Response('exito')

@api_view(['PUT'])
def administradorUpdate(request, pk):
    #print(pk)
    from django.contrib.auth.models import User  
    u = User.objects.get(id=request.data['userid'])
    print(u.id)
    #print(personalinformation)
    print(request.data['password'])
    u.set_password(request.data['password'])
    u.save()
    administrador = Administrator.objects.get(id=pk)
    #print(personalinformation)
    print(administrador.user.id)
    serializer = AdministratorSerializer(instance=administrador, data=request.data)
    #print(serializer)
    #print(serializer.is_valid())
    if serializer.is_valid():
        print('es validoooo')
        serializer.save()
    return Response(serializer.data)

def updatepass(passw, pk):
    from django.contrib.auth.models import User  
    u = User.objects.get(id=pk)
    u.set_password(passw)
    u.save()
'''
def updatepass(passw, pk):
    from django.contrib.auth.models import User  
    u = User.objects.get(id=pk)
    u.set_password(passw)
    u.save()
    '''


@api_view(['DELETE'])
def administradorDelete(request, pk):
    administrador = Administrator.objects.get(id=pk)
    administrador.delete()
    return Response('Administrador borrado exitosamente')