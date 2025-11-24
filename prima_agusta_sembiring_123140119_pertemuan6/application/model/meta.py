from sqlalchemy import engine_from_config
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.orm import declarative_base

DBSession = scoped_session(sessionmaker())
Base = declarative_base()


def get_engine(settings, prefix='sqlalchemy.'):
    """
    Membuat engine dari settings di .ini (sqlalchemy.url)
    """
    return engine_from_config(settings, prefix)


def configure_engine(settings):
    """
    Konfigurasi engine + bind ke DBSession dan Base.
    Dipanggil di application/__init__.py
    """
    engine = get_engine(settings)
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine
    return engine
