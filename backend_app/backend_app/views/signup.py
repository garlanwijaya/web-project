from pyramid.view import view_config
from pyramid.response import Response
from ..models import DBSession, Admin

@view_config(route_name='signup', request_method='POST', renderer='json')
def signup_view(request):
    try:
        data = request.json_body
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return {'status': 'error', 'message': 'Username dan password harus diisi'}, 400

        # Cek username unik
        exists = DBSession.query(Admin).filter_by(nama_admin=username).first()
        if exists:
            return {'status': 'error', 'message': 'Username sudah terdaftar'}, 409

        # Buat objek Admin baru
        new_admin = Admin(nama_admin=username, password_admin=password)
        DBSession.add(new_admin)

        return {'status': 'success', 'message': 'Signup berhasil, silakan login'}
    except Exception as e:
        return Response(
            json_body={'status': 'error', 'message': str(e)},
            status=500,
            content_type='application/json'
        )
        
# Handler untuk preflight request (OPTIONS)
@view_config(route_name='signup', request_method='OPTIONS')
def signup_options_view(request):
  response = Response()
  response.headers.update({
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Credentials': 'true'
  })
  return response