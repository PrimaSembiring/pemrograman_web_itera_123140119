from setuptools import setup, find_packages

requires = [
    'pyramid',
    'SQLAlchemy',
    'psycopg2-binary',
    'alembic',
]

setup(
    name='matakuliah_app',
    version='0.1',
    description='Aplikasi Manajemen Matakuliah dengan Pyramid',
    author='Prima 123140119',
    packages=find_packages(),
    include_package_data=True,
    install_requires=requires,
    entry_points={
        'paste.app_factory': [
            'main = application:main',
        ],
    },
)
