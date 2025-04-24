# myproject/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from users.views import CustomTokenObtainPairView

urlpatterns = [
   path("admin/", admin.site.urls),
   path("api/auth/", include("users.urls")),
   path("api/auth/token/", CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
   path("api/auth/token/refresh/", jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
   path("api/events/", include("events.urls")),
   path("api/contact/", include("contact.urls")),
   path("api/faq/", include("faq.urls")),
]