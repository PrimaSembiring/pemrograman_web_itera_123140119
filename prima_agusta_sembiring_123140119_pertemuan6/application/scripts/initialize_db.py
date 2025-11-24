from application.models.meta import Base, DBSession
from application.models import Matakuliah


def initialize_db():
    """
    Membuat tabel dan menambahkan minimal 3 data awal Matakuliah.
    Panggil fungsi ini secara manual kalau mau seeding data.
    """
    engine = Base.metadata.bind
    Base.metadata.create_all(engine)

    if DBSession.query(Matakuliah).count() == 0:
        mk1 = Matakuliah(
            kode_mk='IF101',
            nama_mk='Algoritma dan Pemrograman',
            sks=3,
            semester=1
        )
        mk2 = Matakuliah(
            kode_mk='IF102',
            nama_mk='Struktur Data',
            sks=3,
            semester=2
        )
        mk3 = Matakuliah(
            kode_mk='IF201',
            nama_mk='Pemrograman Web',
            sks=3,
            semester=3
        )

        DBSession.add_all([mk1, mk2, mk3])
        DBSession.commit()
        print("Data awal matakuliah berhasil ditambahkan.")
    else:
        print("Data matakuliah sudah ada, tidak menambahkan lagi.")
