from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..serializers.personal_information import PersonalInformationSerializer
from ..models.personal_information import PersonalInformation

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List': '/personalinformation-list',
        'Detail View': '/personalinformation/<str:pk>/',
        'Create': '/personalinformation-create/',
        'Update': '/personalinformation-update/<str:pk>/',
        'Delete': '/personalinformation-delete/<str:pk>/',
    }
    return Response(api_urls)

@api_view(['GET'])
def personalinformationList(request):
    personalinformation = PersonalInformation.objects.all()
    serializer = PersonalInformationSerializer(personalinformation, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def personalinformationDetail(request, pk):
    personalinformation = PersonalInformation.objects.get(id=pk)
    serializer = PersonalInformationSerializer(personalinformation, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def personalInformationCreate(request):
    print(request)
    serializer = PersonalInformationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['PUT'])
def personalInformationUpdate(request, pk):
    print(request)
    #print(pk)
    personalinformation = PersonalInformation.objects.get(id=pk)
    #print(personalinformation)
    serializer = PersonalInformationSerializer(instance=personalinformation, data=request.data)
    #print(serializer)
    #print(serializer.is_valid())
    if serializer.is_valid():
    #    print('es validoooo')
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def personalInformationDelete(request, pk):
    personalinformation = PersonalInformation.objects.get(id=pk)
    personalinformation.delete()
    return Response('Informacion personal borrada exitosamente')