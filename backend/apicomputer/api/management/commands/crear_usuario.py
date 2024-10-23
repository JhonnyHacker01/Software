from django.core.management.base import BaseCommand
from api.models import Usuario

class Command(BaseCommand):
    help = 'Crear un nuevo Usuario'

    def add_arguments(self, parser):
        parser.add_argument('username', type=str)
        parser.add_argument('email', type=str)
        parser.add_argument('password', type=str)

    def handle(self, *args, **kwargs):
        username = kwargs['username']
        email = kwargs['email']
        password = kwargs['password']

        user = Usuario.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        user.save()
        self.stdout.write(self.style.SUCCESS(f'Usuario {username} creado correctamente'))
    