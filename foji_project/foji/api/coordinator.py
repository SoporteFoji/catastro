from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..serializers.coordinator import CoordinatorSerializer
from ..models.coordinator import Coordinator
from ..models.personal_information import PersonalInformation
from ..models.user import User
from ..models.orchestra import Orchestra

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'Detail View': '/coordinator/<str:pk>/',
        'Create': '/coordinator-create/',
        'Update': '/coordinator-update/<str:pk>/',
        'Delete': '/coordinator-delete/<str:pk>/',
    }
    return Response(api_urls)


@api_view(['GET'])
def coordinatorDetail(request, pk):
    coordinator = Coordinator.objects.get(id=pk)
    serializer = CoordinatorSerializer(coordinator, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def coordinatorCreate(request):
    print(request)
    print(request.data['personal_information']['email'])
    print(request.data['user']['username'])
    pi, created1 = PersonalInformation.objects.update_or_create(email=request.data['personal_information']['email'],
    defaults=request.data['personal_information'])
    us, created2 = User.objects.update_or_create(username=request.data['user']['username'],defaults=request.data['user'])
    us.is_staff=False
    us.is_active=True
    us.is_superuser=False
    us.save()
    updatepass(request.data['user']['password'], us.id)
    try:
        coordi = Coordinator.objects.update_or_create(personal_information=pi,user=us)
        #obj = Person.objects.get(first_name='John', last_name='Lennon')
    except Coordinator.DoesNotExist:
        coordi = Coordinator(personal_information=pi,user=us)
        coordi.save()
        print(coordi)
    return Response('exito')
    
def updatepass(passw, pk):
    from django.contrib.auth.models import User  
    u = User.objects.get(id=pk)
    u.set_password(passw)
    u.save()

@api_view(['PUT'])
def coordinatorUpdate(request, pk):
    print(request)
    print("actualiza coordinador")
    coordinator = Coordinator.objects.get(id=pk)
    #print(personalinformation)
    serializer = CoordinatorSerializer(instance=coordinator, data=request.data)
    #print(serializer)
    #print(serializer.is_valid())
    if serializer.is_valid():
    #    print('es validoooo')
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def coordinatorUpdateOrchestra(request):
    print(request)
    print("actualiza coordinador")
    orchestra = Orchestra.objects.get(id=request.data['pkOrquesta'])
    
    coordinator = Coordinator.objects.get(id=request.data['pk'])
    orchestra.coordinator = coordinator
    orchestra.save()
    return Response('0')


@api_view(['DELETE'])
def coordinatorDelete(request, pk):
    coordinator = Coordinator.objects.get(id=pk)
    coordinator.delete()
    return Response('coordinator borrado exitosamente')