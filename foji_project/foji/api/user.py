from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..serializers.user import UserSerializer
from ..models.user import User

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List': '/user-list',
        'Detail View': '/user/<str:pk>/',
        'Create': '/user-create/',
        'Update': '/user-update/<str:pk>/',
        'Delete': '/user-delete/<str:pk>/',
    }
    return Response(api_urls)

@api_view(['GET'])
def userList(request):
    user = User.objects.all()
    serializer = UserSerializer(user, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def userDetail(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def userCreate(request):
    print(request)
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['PUT'])
def userUpdate(request, pk):
    print(request.data)
    #print(pk)
    user = User.objects.get(id=pk)
    #print(personalinformation)
    serializer = UserSerializer(instance=user, data=request.data)
    print("2")
    #print(serializer.is_valid())
    if serializer.is_valid():
    #    print('es validoooo')
        serializer.save()
    print(request.data['password'])
    if request.data['password'] is not None:
        updatepass(request.data['password'], pk)
    return Response(serializer.data)

def updatepass(passw, pk):
    from django.contrib.auth.models import User  
    u = User.objects.get(id=pk)
    u.set_password(passw)
    u.save()

@api_view(['DELETE'])
def userDelete(request, pk):
    user = User.objects.get(id=pk)
    user.delete()
    return Response('Informacion personal borrada exitosamente')