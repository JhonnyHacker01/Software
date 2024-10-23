from django.contrib.auth.models import AbstractUser
from django.db import models

class Usuario(AbstractUser):
    usuario = models.CharField(max_length=100)
    clave = models.CharField(max_length=100)

    def __str__(self):
        return self.usuario

class Cliente(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    apellidos = models.CharField(max_length=50)
    nombres = models.CharField(max_length=50)
    telefono = models.CharField(max_length=20)
    direccion = models.CharField(max_length=100)
    correo = models.EmailField()

class Colaborador(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    apellidos = models.CharField(max_length=50)
    nombres = models.CharField(max_length=50)
    telefono = models.CharField(max_length=20)
    direccion = models.CharField(max_length=100)
    correo = models.EmailField()

class Marca(models.Model):
    marca = models.CharField(max_length=50)

    def __str__(self):
        return self.marca
    
class Modelo(models.Model):
    marca = models.ForeignKey(Marca,on_delete=models.CASCADE)
    modelo = models.CharField(max_length=50)

    def __str__(self):
        return self.modelo

class Producto(models.Model):
    modelo = models.ForeignKey(Modelo, on_delete=models.CASCADE)
    producto = models.CharField(max_length=50)
    descripcion = models.TextField()
    def __str__(self):
        return self.producto

class ListaPrecios(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    colaborador = models.ForeignKey(Colaborador, on_delete=models.CASCADE)
    fecha = models.DateField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)

class Pedido(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    fecha_hora = models.DateTimeField()
    total = models.DecimalField(max_digits=10, decimal_places=2)

class PedidoDetalle(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)
    listaPrecios = models.ForeignKey(ListaPrecios, on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    total = models.DecimalField(max_digits=10, decimal_places=2)

class MedioPago(models.Model):
    nombre = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre

class Pago(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)
    medioPago = models.ForeignKey(MedioPago, on_delete=models.CASCADE)
    fecha_hora = models.DateTimeField()
    no_operacion = models.CharField(max_length=50)
    total = models.DecimalField(max_digits=10, decimal_places=2)
 