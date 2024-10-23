from rest_framework import routers
from . import views
from django.urls import path, include

router = routers.DefaultRouter()

router.register('usuarios', views.UsuarioViewset)
router.register('clientes', views.ClienteViewset)
router.register('colaboradores', views.ColaboradorViewset)
router.register('marcas', views.MarcaViewset)
router.register('modelos', views.ModeloViewset)
router.register('productos', views.ProductoViewset)
router.register('lista-precios', views.ListaPreciosViewset)
router.register('pedidos', views.PedidoViewset)
router.register('pedido-detalles', views.PedidoDetalleViewset)
router.register('medio-pagos', views.MedioPagoViewset)
router.register('pagos', views.PagoViewset)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', views.LoginView.as_view(), name = 'login'),
]