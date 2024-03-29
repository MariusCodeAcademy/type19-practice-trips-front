# Galutine praktine uzduotis

Uzduotis skirta patikrinti ar mokate naudoti:

1. Back End - Node.js, Express, Mysql, REST API, Git, GitHub,
2. Front End - Vite, Typescript, Tailwind, React, Git, GitHub,

Reikes sukurti du projektus:

1. Back End - JSON REST API
2. Front End - React aplikacija

## Inspiration urls

1. https://www.figma.com/community/file/1182308758714734501
2. https://www.figma.com/community/file/1219890698200192960

## Back end url

https://github.com/MariusCodeAcademy/type19_12_NODE_Mysql

## Front end

inspiration https://www.figma.com/community/file/1219890698200192960

Sukurti projekta su vite, naudojant typescript.
Pradeti nuo boiler plate, su tailwind arba be.

1. Prisideti routeri
2. Sukurti Home, Trips, Countries puslapius
3. Sukurti Header navigacijai
4. Susikurti Button komponenta (UI)

### Trip Page

1. kreiptis i musu back end ir gauti visas keliones ir atvaizduotji jas korteliu pavidalu, be description ir be papildomu paveiksleliu.
2. Kiekviena kortele turi nuoroda ir veda i Single Trip Page, Paveiklelis irgi turi buti nuoroda i Single Trip Page
3. Sukurti pernaudojama komponenta TripCard ir atvaizduoti keliones
4. Sukurti filtravima pagal sali ir miesta

### Single Trip Page

1. Atejus i puslapi gaunam id keliones kuria atvaizduoti
2. Atvaizduojam visa informacija apie kelione su stylingu
3. Puslapis dalinamas i 2 dalis kaireje paveikslelis, desineje informacija.
4. Prideti mygtuka "Delete" kuris istrina kelione is back end jei vartotojas prisijunges ir savininkas

### Add Trip Page

1. Sukurti forma su laukais: name, date, country, city, rating, description, price, image_main, images_1, images_2, images_3
2. Forma valdyti su useFormik.
3. Validuoti visus laukus
4. Siusti duomenis i back end ir sukurti nauja kelione
5. Priklausomai nuo atsakymo parodyti pranesima ar pavyko ar ne
6. Jei sekminga uzklausa nukreipti i Trips Page

### Countries Page

1. kreiptis i musu back end ir gauti visas salis ir atvaizduoti jas korteliu pavidalu
2. Kiekviena kortele turi nuoroda ir veda i Single Country Page

### Single Country Page

1. Atejus i puslapi gaunam id salies kuria atvaizduoti
2. Atvaizduojam visa informacija apie sali su stylingu
3. Puslapis dalinamas i 2 dalis kaireje paveikslelis, desineje informacija.

### Auth Page

1. Sukurti Auth Page /auth

### Register forma

1. Sukurti forma su laukais: username, password, repeat password, email
2. Patikrinti ar slaptazodziai sutampa
3. Patikrinti ar email yra email formatas
4. Siusti duomenis i back end ir sukurti nauja vartotoja
5. Priklausomai nuo atsakymo parodyti pranesima ar pavyko ar ne

### Login forma

1. Sukurti forma su laukais: username, password
2. Siusti duomenis i back end ir prisijungti
3. Priklausomai nuo atsakymo parodyti pranesima ar pavyko ar ne

## Bendras aplikacijos state

Reikalingas bendras state kuris butu pasiekiamas visuose komponentuose.
Tai galima daryti su Context arba Redux.
State turi buti issaugomas i localstorage ir po puslapio persikrovimo tureti ta pati state.

## Header komponentas

1. Sukurti Header komponenta
2. Header turi tureti navigacija i Home, Trips, Countries, Add Trip, Auth
3. Padaryti headeri pilnai responsive su burger menu
4. sumazinus ekrana turi atsirasti burger menu kuri paspaudus matom navigacija
5. didesniame ekrane turi buti matoma navigacija
6. sukurti meniu taip kad "Add Trip" butu submeniu kuris atsidaro kai uzvedam pele ant jo
   pvz (principas toks)
   - desktop
     ![](assets/2024-03-15-12-56-03.png)
   - mobile
     ![](assets/2024-03-15-12-59-05.png)
