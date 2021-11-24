from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework import serializers
from api.models import Customer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.serializers import CustomerSerializer


@api_view(['GET'])
def apiOverView(request):
    api_urls = {
        'List': '/customer-list/',
        'Create': '/customer-create/',
        'Update': 'customer-update/<str:pk>/',
        'Delete': 'customer-delete/<str:pk>/',
    }
    return Response(api_urls)

@api_view(['GET'])
def customerList(request):
	customers = Customer.objects.all()
	serializer = CustomerSerializer(customers, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def customerDetail(request,pk):
	customers = Customer.objects.get(id=pk)
	serializer = CustomerSerializer(customers, many=False)
	return Response(serializer.data)


@api_view(['POST'])
def customerCreate(request):
    serializer = CustomerSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)

@api_view(['POST'])
def customerUpdate(request, pk):
	customer = Customer.objects.get(id=pk)
	serializer = CustomerSerializer(instance=customer, data=request.data)

	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)

@api_view(['DELETE'])
def customerDelete(request, pk):
	customer = Customer.objects.get(id=pk)
	customer.delete()

	return Response('Item succsesfully delete!')


