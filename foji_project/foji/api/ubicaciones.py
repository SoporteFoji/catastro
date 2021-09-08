from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..serializers.location import AreaSerializer,RegionSerializer,ProvinceSerializer
from ..models.location import Area,Region,Province

@api_view(['GET'])
def apiOverviewRegion(request):
    api_urls = {
        'List': '/region-list',
        'Detail View': '/region/<str:pk>/',
        'Create': '/region-create/',
        'Update': '/region-update/<str:pk>/',
        'Delete': '/region-delete/<str:pk>/',
    }
    return Response(api_urls)


@api_view(['GET'])
def apiOverviewArea(request):
    api_urls = {
        'List': '/area-list',
        'Detail View': '/area/<str:pk>/',
        'Create': '/area-create/',
        'Update': '/area-update/<str:pk>/',
        'Delete': '/area-delete/<str:pk>/',
    }
    return Response(api_urls)

@api_view(['GET'])
def apiOverviewProvincia(request):
    api_urls = {
        'List': '/provincia-list',
        'Detail View': '/provincia/<str:pk>/',
        'Create': '/provincia-create/',
        'Update': '/provincia-update/<str:pk>/',
        'Delete': '/provincia-delete/<str:pk>/',
    }
    return Response(api_urls)


@api_view(['GET'])
def regionList(request):
    region = Region.objects.all()
    serializer = RegionSerializer(region, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def areaList(request):
    area = Area.objects.all()
    serializer = AreaSerializer(area, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def provinciaList(request):
    provincia = Province.objects.all()
    serializer = ProvinceSerializer(provincia, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def regionDetail(request, pk):
    region = Region.objects.get(id=pk)
    serializer = RegionSerializer(region, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def areaDetail(request, pk):
    area = Area.objects.get(id=pk)
    serializer = AreaSerializer(area, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def provinciaDetail(request, pk):
    provincia = Province.objects.get(id=pk)
    serializer = ProvinceSerializer(provincia, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def regionCreate(request):
    print(request)
    serializer = RegionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['POST'])
def areaCreate(request):
    print(request)
    serializer = AreaSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def provinciaCreate(request):
    print(request)
    serializer = ProvinceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['PUT'])
def regionUpdate(request, pk):
    region = Region.objects.get(id=pk)
    serializer = RegionSerializer(instance=region, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['PUT'])
def areaUpdate(request, pk):
    area = Area.objects.get(id=pk)
    serializer = AreaSerializer(instance=area, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['PUT'])
def provinciaUpdate(request, pk):
    provincia = Province.objects.get(id=pk)
    serializer = ProvinceSerializer(instance=provincia, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['DELETE'])
def regionDelete(request, pk):
    region = Region.objects.get(id=pk)
    region.delete()
    return Response('Informacion personal borrada exitosamente')

@api_view(['DELETE'])
def areaDelete(request, pk):
    area = Area.objects.get(id=pk)
    area.delete()
    return Response('Informacion personal borrada exitosamente')

@api_view(['DELETE'])
def provinciaDelete(request, pk):
    provincia = Province.objects.get(id=pk)
    provincia.delete()
    return Response('Informacion personal borrada exitosamente')
