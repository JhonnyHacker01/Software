from rest_framework import viewsets
from . import models,serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from django.conf import settings

# Create your views here.

class UsuarioViewset(viewsets.ModelViewSet):
    queryset = models.Usuario.objects.all()
    serializer_class = serializers.UsuarioSerializer

class ClienteViewset(viewsets.ModelViewSet):
    queryset = models.Cliente.objects.all()
    serializer_class = serializers.ClienteSerializer

class ColaboradorViewset(viewsets.ModelViewSet):
    queryset = models.Colaborador.objects.all()
    serializer_class = serializers.ColaboradorSerializer

class MarcaViewset (viewsets.ModelViewSet):
    queryset = models.Marca.objects.all()
    serializer_class = serializers.MarcaSerializer

class ModeloViewset (viewsets.ModelViewSet):
    queryset = models.Modelo.objects.all()
    serializer_class = serializers.ModeloSerializer

class ProductoViewset(viewsets.ModelViewSet):
    queryset = models.Producto.objects.all()
    serializer_class = serializers.ProductoSerializer

class ListaPreciosViewset(viewsets.ModelViewSet):
    queryset = models.ListaPrecios.objects.all()
    serializer_class = serializers.ListaPreciosSerializer

class PedidoViewset(viewsets.ModelViewSet):
    queryset = models.Pedido.objects.all()
    serializer_class = serializers.PedidoSerializer

class PedidoDetalleViewset(viewsets.ModelViewSet):
    queryset = models.PedidoDetalle.objects.all()
    serializer_class = serializers.PedidoDetalleSerializer

class MedioPagoViewset(viewsets.ModelViewSet):
    queryset = models.MedioPago.objects.all()
    serializer_class = serializers.MedioPagoSerializer

class PagoViewset(viewsets.ModelViewSet):
    queryset = models.Pago.objects.all()
    serializer_class = serializers.PagoSerializer

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        api_key = request.headers.get('API-Key')
        if api_key != settings.API_KEY:
            return Response({"error": "API Key Inválida"}, status=403)

        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user is not None:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"token": token.key})
        else:
            return Response({"error": "Credenciales Inválidas"}, status=400)