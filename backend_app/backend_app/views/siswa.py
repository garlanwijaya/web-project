# myapp/views/siswa.py

import json
from pyramid.view import view_config
from pyramid.httpexceptions import HTTPBadRequest, HTTPNotFound
from sqlalchemy.exc import DBAPIError

from ..models import DBSession, Siswa

@view_config(route_name='api_siswa_list', renderer='json', request_method='GET')
def get_all_siswa(request):
    """
    GET /api/siswa
    Kembalikan semua siswa sebagai JSON array.
    """
    try:
        siswas = DBSession.query(Siswa).all()
        return [s.to_dict() for s in siswas]
    except DBAPIError:
        request.response.status = 500
        return {'message': 'Gagal mengambil data siswa dari database.'}


@view_config(route_name='api_siswa_list', renderer='json', request_method='POST')
def create_siswa(request):
    """
    POST /api/siswa
    Tambah siswa baru. Body JSON: {"nama": "...", "umur":10, "kelas":"B", "alamat":"..."}
    """
    try:
        data = request.json_body
    except json.JSONDecodeError:
        raise HTTPBadRequest(json_body={'message': 'Payload bukan JSON valid.'})

    # Validasi sederhana: field wajib ada dan tidak kosong
    nama   = data.get('nama')
    umur   = data.get('umur')
    kelas  = data.get('kelas')
    alamat = data.get('alamat')

    if not nama or umur is None or not kelas or not alamat:
        raise HTTPBadRequest(json_body={'message': 'Field nama, umur, kelas, dan alamat wajib diisi.'})

    try:
        new_s = Siswa(
            nama   = nama.strip(),
            umur   = int(umur),
            kelas  = kelas.strip(),
            alamat = alamat.strip()
        )
        DBSession.add(new_s)
        # Commit otomatis oleh pyramid_tm
        return new_s.to_dict()
    except (ValueError, DBAPIError):
        request.response.status = 500
        return {'message': 'Terjadi kesalahan saat menyimpan data siswa.'}


@view_config(route_name='api_siswa_detail', renderer='json', request_method='GET')
def get_siswa_by_id(request):
    """
    GET /api/siswa/{id}
    (Opsional) Ambil satu siswa berdasarkan ID.
    """
    try:
        siswa_id = int(request.matchdict['id'])
    except (KeyError, ValueError):
        raise HTTPBadRequest(json_body={'message': 'ID siswa tidak valid.'})

    s = DBSession.query(Siswa).get(siswa_id)
    if not s:
        raise HTTPNotFound(json_body={'message': f'Siswa dengan ID {siswa_id} tidak ditemukan.'})
    return s.to_dict()


@view_config(route_name='api_siswa_detail', renderer='json', request_method='PUT')
def update_siswa(request):
    """
    PUT /api/siswa/{id}
    Update data siswa. Body JSON: {"nama": "...", "umur":10, "kelas":"C", "alamat":"..."}
    """
    try:
        siswa_id = int(request.matchdict['id'])
    except (KeyError, ValueError):
        raise HTTPBadRequest(json_body={'message': 'ID siswa tidak valid.'})

    s = DBSession.query(Siswa).get(siswa_id)
    if not s:
        raise HTTPNotFound(json_body={'message': f'Siswa dengan ID {siswa_id} tidak ditemukan.'})

    try:
        data = request.json_body
    except json.JSONDecodeError:
        raise HTTPBadRequest(json_body={'message': 'Payload bukan JSON valid.'})

    # Validasi sederhana
    nama   = data.get('nama')
    umur   = data.get('umur')
    kelas  = data.get('kelas')
    alamat = data.get('alamat')

    if not nama or umur is None or not kelas or not alamat:
        raise HTTPBadRequest(json_body={'message': 'Field nama, umur, kelas, dan alamat wajib diisi.'})

    try:
        s.nama   = nama.strip()
        s.umur   = int(umur)
        s.kelas  = kelas.strip()
        s.alamat = alamat.strip()
        # Commit otomatis oleh pyramid_tm
        return s.to_dict()
    except (ValueError, DBAPIError):
        request.response.status = 500
        return {'message': 'Terjadi kesalahan saat memperbarui data siswa.'}


@view_config(route_name='api_siswa_detail', renderer='json', request_method='DELETE')
def delete_siswa(request):
    """
    DELETE /api/siswa/{id}
    Hapus satu siswa berdasarkan ID.
    """
    try:
        siswa_id = int(request.matchdict['id'])
    except (KeyError, ValueError):
        raise HTTPBadRequest(json_body={'message': 'ID siswa tidak valid.'})

    s = DBSession.query(Siswa).get(siswa_id)
    if not s:
        raise HTTPNotFound(json_body={'message': f'Siswa dengan ID {siswa_id} tidak ditemukan.'})

    try:
        DBSession.delete(s)
        # Commit otomatis
        return {'message': 'Siswa berhasil dihapus.'}
    except DBAPIError:
        request.response.status = 500
        return {'message': 'Terjadi kesalahan saat menghapus data siswa.'}
