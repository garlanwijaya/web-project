# myapp/models.py

from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker
from zope.sqlalchemy import register

Base = declarative_base()

# Buat DBSession tanpa extension; nanti di __init__.py kita bind dan register-nya
DBSession = scoped_session(sessionmaker())

# Setelah DBSession.configure(bind=engine) di __init__.py, kita jalankan:
#     register(DBSession)
# agar session ini ikut di-manage oleh pyramid_tm.

class Admin(Base):
    __tablename__ = 'admin'
    id             = Column(Integer, primary_key=True, autoincrement=True)
    nama_admin     = Column(String(100), nullable=False, unique=True)
    password_admin = Column(String(255), nullable=False)

    def __repr__(self):
        return f"<Admin(id={self.id}, nama_admin={self.nama_admin!r})>"

class Siswa(Base):
    __tablename__ = 'daftar_siswa'
    id     = Column(Integer, primary_key=True, autoincrement=True)
    nama   = Column(String(100), nullable=False)
    umur   = Column(Integer, nullable=False)
    kelas  = Column(String(1), nullable=False)    # Misal: "A", "B", "C", "D"
    alamat = Column(String(255), nullable=False)

    def __repr__(self):
        return f"<Siswa(id={self.id}, nama={self.nama!r}, umur={self.umur}, kelas={self.kelas!r})>"

    def to_dict(self):
        return {
            'id':     self.id,
            'nama':   self.nama,
            'umur':   self.umur,
            'kelas':  self.kelas,
            'alamat': self.alamat,
        }
