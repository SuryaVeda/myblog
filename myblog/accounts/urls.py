from django.urls import path
from django.views.generic.base import TemplateView
from . import views
from django.views.generic import TemplateView
app_name = 'accounts'

urlpatterns = [
path('register', TemplateView.as_view(template_name = 'index.html'), name = 'User'),
path('registerUser', views.CreateUser.as_view(), name = 'create_user'),
path('logoutUser', views.logout, name = 'logout'),

]
