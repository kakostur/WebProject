#/users/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import RegisterSerializer, UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'username'

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer
    
    def post(self, request, *args, **kwargs):
        print(f"Received login data: {request.data}")
        try:
            response = super().post(request, *args, **kwargs)
            print(f"Response: {response.data}, status: {response.status_code}")
            if response.status_code == 200:
                return Response({
                    'access': response.data.get('access'),
                    'refresh': response.data.get('refresh'),
                }, status=status.HTTP_200_OK)
            return response
        except Exception as e:
            print(f"Error during login: {str(e)}")
            raise  

class RegisterView(APIView):
    permission_classes = [AllowAny] 
    
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_status(request):
    user = request.user
    print(f"User in status view: {user}, authenticated: {user.is_authenticated}")
    return Response({
        "id": user.id, 
        "username": user.username, 
        "email": user.email, 
        "role": user.role
    })

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        refresh_token = request.data["refresh"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response(status=status.HTTP_205_RESET_CONTENT)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
import logging
logger = logging.getLogger(__name__)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer
    
    def post(self, request, *args, **kwargs):
        logger.info(f"Получен запрос на авторизацию: {request.data}")
        try:
            response = super().post(request, *args, **kwargs)
            logger.info(f"Успешный ответ: {response.data}")
            return response
        except Exception as e:
            logger.error(f"Ошибка авторизации: {str(e)}", exc_info=True)
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)