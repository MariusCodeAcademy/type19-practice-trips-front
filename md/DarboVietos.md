## Naujas projektas

Pasitreniruokite sukurti nauja projekta nuo pradziu. Pasiziuekite kur stringate ir klauskite kur neaisku.

Sukurkite projekta patys nesistenkite perkopijuoti dideliu kodo gabalu is seno projekto.

Sukurtikte Darbo vietu CRUD

1. Naujas back end nuo boiler plate ar nulio
2. Naujas front end nuo boiler plate ar nulio
3. Sukurti darbo vietu CRUD

### back end

1. Sukurti darbo vietu lentele su stulpeliais: id, title, town, description, pay, is_active
2. Pridekite 5 darbo vietos irasus

### routes

1. GET /jobs grazina visas darbo vietas
2. GET /jobs/:id grazina viena darbo vieta
3. GET /jobs/:town grazina visas darbo vietas pagal miesta

### front end

1. Prisideti routeri.
2. Sukurti puslapius: Home, Jobs, SingleJob

### Home

1. Atvaizduoti trumpa aprasyma apie projekta
2. Atvaizduoti visas darbo vietas
3. Paspaudus ant darbo vietos pavadinimo nueiti i SingleJob puslapi

### Jobs

1. Atvaizduoti visas darbo vietas
2. Paspaudus ant darbo vietos pavadinimo nueiti i SingleJob puslapi

### SingleJob

1. Atvaizduoti visa informacija apie darbo vieta
2. Atvaizduoti mygtuka "Back to jobs" kuris veda i Jobs puslapi

## extra (kas noresite toliau dirbti)

### routes

1. POST /jobs sukurti nauja darbo vieta
2. PUT /jobs/:id atnaujinti darbo vieta
3. DELETE /jobs/:id istrinti darbo vieta

### front end

1. Sukurti forma naujai darbo vietai sukurti
2. Sukurti forma darbo vietai atnaujinti
3. Mygtukas istrinti darbo vietai istrinti
