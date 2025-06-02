# myapp/routes.py

def includeme(config):
    # Static view jika Anda butuh serve file‐static (optional)
    config.add_static_view(name='static', path='static', cache_max_age=3600)

    # Rute “home” (bisa Anda gunakan sebagai health‐check atau landing)
    config.add_route('home', '/')

    # Rute login/signup (jika memang dibutuhkan)
    config.add_route('login', '/api/login')
    config.add_route('signup', '/api/signup')

    # Rute CRUD untuk “Siswa”
    config.add_route('api_siswa_list',   '/api/siswa')       # GET + POST
    config.add_route('api_siswa_detail', '/api/siswa/{id}')  # GET (optional single), PUT, DELETE
