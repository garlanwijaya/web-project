from pyramid.view import view_config
from pyramid.response import Response
from ..models import DBSession, Admin
import secrets

@view_config(route_name='login', request_method='POST', renderer='json')
def login_view(request):
    try:
        data = request.json_body
        username = data.get('username')
        password = data.get('password')

        # Ambil data dari tabel admin
        admin = DBSession.query(Admin).filter_by(nama_admin=username).first()

        if not admin:
            return {'status': 'error', 'message': 'User tidak ditemukan'}, 404
        if admin.password_admin != password:
            return {'status': 'error', 'message': 'Password salah'}, 401
        
        # Generate Token acak
        token = secrets.token_urlsafe(32)

        return {
            'status': 'success',
            'message': 'Login berhasil',
            'token': token,
            'data': {'id': admin.id, 'nama_admin': admin.nama_admin}
        }

    except Exception as e:
        return Response(
            json_body={'status': 'error', 'message': str(e)},
            status=500,
            content_type='application/json'
        )

# Handler untuk preflight request (OPTIONS)
@view_config(route_name='login', request_method='OPTIONS')
def login_options_view(request):
    response = Response()
    response.headers.update({
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': 'true'
    })
    return response
