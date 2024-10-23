from rest_framework import serializers
from . import models

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Usuario
        fields = '__all__'

class ClienteSerializer(serializers.ModelSerializer):
    nombreUsuario = serializers.ReadOnlyField(source='usuario.nombreUsuario')
    class Meta:
        model = models.Cliente
        fields = '__all__'

class ColaboradorSerializer(serializers.ModelSerializer):
    nombreUsuario = serializers.ReadOnlyField(source='cliente.nombreUsuario')
    class Meta:
        model = models.Colaborador
        fields = '__all__'

class MarcaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Marca
        fields = '__all__'

class ModeloSerializer(serializers.ModelSerializer):
    nombreMarca = serializers.ReadOnlyField(source='marca.marca')
    class Meta:
        model = models.Modelo
        fields = '__all__'

class ProductoSerializer(serializers.ModelSerializer):
    nombreMarca = serializers.ReadOnlyField(source='modelo.marca.marca')
    nombreModelo = serializers.ReadOnlyField(source='modelo.modelo')
    class Meta:
        model = models.Producto
        fields = '__all__'

class ListaPreciosSerializer(serializers.ModelSerializer):
    nombreProducto = serializers.ReadOnlyField(source='producto.nombreProducto')
    nombreColaborador = serializers.ReadOnlyField(source='colaborador.nombreColaborador')
    class Meta:
        model = models.ListaPrecios
        fields = '__all__'

class PedidoSerializer(serializers.ModelSerializer):
    nombreCliente = serializers.ReadOnlyField(source='cliente.nombreCliente')
    class Meta:
        model = models.Pedido
        fields = '__all__'

class PedidoDetalleSerializer(serializers.ModelSerializer):
    nombrePedido = serializers.ReadOnlyField(source='pedido.nombrePedido')
    nombreListaPrecios = serializers.ReadOnlyField(source='listaprecios.nombreListaPrecios')
    class Meta:
        model = models.PedidoDetalle
        fields = '__all__'

class MedioPagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MedioPago
        fields = '__all__'

class PagoSerializer(serializers.ModelSerializer):
    nombrePedido = serializers.ReadOnlyField(source='pedido.nombrePedido')
    nombreMedioPago = serializers.ReadOnlyField(source='medioPago.nombreMedioPago')
    class Meta:
        model = models.Pago
        fields = '__all__'
