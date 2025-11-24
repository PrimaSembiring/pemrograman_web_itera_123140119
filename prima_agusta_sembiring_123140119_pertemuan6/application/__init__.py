from pyramid.config import Configurator
from .models.meta import configure_engine


def main(global_config, **settings):
    """
    Fungsi utama aplikasi Pyramid.
    Dipanggil oleh PasteDeploy lewat development.ini
    """
    # konfigurasi engine & DBSession
    configure_engine(settings)

    config = Configurator(settings=settings)

    # include routes
    config.include('.routes')

    # scan views
    config.scan('.views')

    return config.make_wsgi_app()
