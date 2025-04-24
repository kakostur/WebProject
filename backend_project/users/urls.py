#/users/urls.py
from django.urls import path
from .views import RegisterView, user_status, logout, CustomTokenObtainPairView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('status/', user_status, name='status'),
    path('logout/', logout, name='logout'),
        path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),

]
