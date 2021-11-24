from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverView, name='api-overview'),
    path('list/', views.customerList, name='list'),
    path('detail/<str:pk>/', views.customerDetail, name='detail'),
    path('create/', views.customerCreate, name='create'),
    path('update/<str:pk>/', views.customerUpdate, name='update'),
    path('delete/<str:pk>/', views.customerDelete, name='delete'),
]