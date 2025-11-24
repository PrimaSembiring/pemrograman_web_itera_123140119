import json

from pyramid.view import view_config
from pyramid.httpexceptions import HTTPNotFound, HTTPBadRequest, HTTPCreated

from application.models import DBSession, Matakuliah


@view_config(route_name='get_all_mk', renderer='json')
def get_all_mk(request):
    """
    GET /api/matakuliah
    Mengembalikan semua data matakuliah.
    """
    mks = DBSession.query(Matakuliah).all()
    return {"matakuliahs": [mk.to_dict() for mk in mks]}


@view_config(route_name='get_one_mk', renderer='json')
def get_one_mk(request):
    """
    GET /api/matakuliah/{id}
    Mengembalikan satu matakuliah berdasarkan id.
    """
    mk_id = request.matchdict.get('id')
    mk = DBSession.query(Matakuliah).get(mk_id)

    if mk is None:
        raise HTTPNotFound(json_body={"error": "Matakuliah tidak ditemukan"})

    return mk.to_dict()


@view_config(route_name='create_mk', renderer='json')
def create_mk(request):
    """
    POST /api/matakuliah
    Menambah matakuliah baru.
    """
    try:
        data = request.json_body
        kode_mk = data['kode_mk']
        nama_mk = data['nama_mk']
        sks = int(data['sks'])
        semester = int(data['semester'])
    except Exception:
        raise HTTPBadRequest(json_body={"error": "Data tidak lengkap atau format salah"})

    # Cek unique kode_mk
    existing = DBSession.query(Matakuliah).filter_by(kode_mk=kode_mk).first()
    if existing:
        raise HTTPBadRequest(json_body={"error": "kode_mk sudah digunakan"})

    mk = Matakuliah(
        kode_mk=kode_mk,
        nama_mk=nama_mk,
        sks=sks,
        semester=semester,
    )

    DBSession.add(mk)
    DBSession.commit()

    return HTTPCreated(json_body={
        "message": "Matakuliah berhasil ditambahkan",
        "data": mk.to_dict()
    })


@view_config(route_name='update_mk', renderer='json')
def update_mk(request):
    """
    PUT /api/matakuliah/{id}
    Mengubah data matakuliah.
    """
    mk_id = request.matchdict.get('id')
    mk = DBSession.query(Matakuliah).get(mk_id)

    if mk is None:
        raise HTTPNotFound(json_body={"error": "Matakuliah tidak ditemukan"})

    data = request.json_body

    # optional update: kalau tidak dikirim, pakai nilai lama
    if 'kode_mk' in data:
        # cek kalau ganti kode_mk, tetap unique
        existing = DBSession.query(Matakuliah).filter_by(kode_mk=data['kode_mk']).first()
        if existing and existing.id != mk.id:
            raise HTTPBadRequest(json_body={"error": "kode_mk sudah digunakan matakuliah lain"})
        mk.kode_mk = data['kode_mk']

    if 'nama_mk' in data:
        mk.nama_mk = data['nama_mk']

    if 'sks' in data:
        mk.sks = int(data['sks'])

    if 'semester' in data:
        mk.semester = int(data['semester'])

    DBSession.commit()

    return {
        "message": "Matakuliah berhasil diperbarui",
        "data": mk.to_dict()
    }


@view_config(route_name='delete_mk', renderer='json')
def delete_mk(request):
    """
    DELETE /api/matakuliah/{id}
    Menghapus matakuliah.
    """
    mk_id = request.matchdict.get('id')
    mk = DBSession.query(Matakuliah).get(mk_id)

    if mk is None:
        raise HTTPNotFound(json_body={"error": "Matakuliah tidak ditemukan"})

    DBSession.delete(mk)
    DBSession.commit()

    return {"message": "Matakuliah berhasil dihapus"}
