def includeme(config):
    """
    Registrasi semua route API untuk Matakuliah.
    Jangan lupa request_method, sesuai instruksi tugas.
    """
    # GET semua
    config.add_route(
        'get_all_mk',
        '/api/matakuliah',
        request_method='GET'
    )

    # GET satu
    config.add_route(
        'get_one_mk',
        '/api/matakuliah/{id}',
        request_method='GET'
    )

    # POST
    config.add_route(
        'create_mk',
        '/api/matakuliah',
        request_method='POST'
    )

    # PUT
    config.add_route(
        'update_mk',
        '/api/matakuliah/{id}',
        request_method='PUT'
    )

    # DELETE
    config.add_route(
        'delete_mk',
        '/api/matakuliah/{id}',
        request_method='DELETE'
    )
