# myapp/__init__.py

from pyramid.config import Configurator
from pyramid.events import NewRequest
from pyramid.response import Response
from sqlalchemy import engine_from_config
from zope.sqlalchemy import register  # Tambahkan ini
from .models import DBSession, Base

def add_cors_headers_response_callback(event):
    def cors_headers(request, response):
        response.headers.update({
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Credentials': 'true'
        })
    event.request.add_response_callback(cors_headers)

def options_view(request):
    response = Response()
    response.status_code = 200
    response.headers.update({
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true'
    })
    return response

def main(global_config, **settings):
    with Configurator(settings=settings) as config:
        config.include('pyramid_jinja2')
        config.include('pyramid_tm')
        config.include('.routes')  # panggil routes.py

        # Tambahkan Subscriber untuk CORS header
        config.add_subscriber(add_cors_headers_response_callback, NewRequest)

        # Tambahkan handler untuk preflight (OPTIONS)
        config.add_view(options_view, route_name='api_siswa_list', request_method='OPTIONS')
        config.add_view(options_view, route_name='api_siswa_detail', request_method='OPTIONS')

        # Inisialisasi DB
        engine = engine_from_config(settings, prefix='sqlalchemy.')
        DBSession.configure(bind=engine)
        Base.metadata.bind = engine

        # Registrasi SQLAlchemy session dengan Zope transaction manager
        register(DBSession)

        config.scan()  # atau config.scan() jika mau scan semua

        return config.make_wsgi_app()
