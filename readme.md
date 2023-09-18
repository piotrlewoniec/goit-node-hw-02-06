## GoIT Node.js Course Template Homework

Wykonaj forka tego repozytorium, aby wykonywać zadania domowe (2-6). Fork utworzy repozytorium na Twoim koncie na http://github.com

Dodaj mentora jako collaboratora.

Dla każdego zadania domowego utwórz nową gałąź (branch).

- hw02
- hw03
- hw04
- hw05
- hw06

Każda nowa gałąź dla zadania powinna być tworzona z gałęzi master.

Po zakończeniu wykonania zadania domowego na swojej gałęzi, należy zrobić pull request (PR). Następnie dodaj mentora do przeglądu kodu. Dopiero po zatwierdzeniu PR przez mentora możesz scalić gałąź z zadaniem domowym do gałęzi master.

Uważnie czytaj komentarze mentora. Popraw uwagi i zrób commit na gałęzi z zadaniem domowym. Zmiany automatycznie pojawią się w PR po wysłaniu commitu z poprawkami na GitHub. Po poprawkach ponownie dodaj mentora do przeglądu kodu.

- Podczas oddawania zadania domowego podaj link do PR.
- Kod JS jest czytelny i zrozumiały, do formatowania używany jest Prettier.

### Komendy:

- `npm start` &mdash; uruchamia serwer w trybie produkcyjnym
- `npm run start:dev` &mdash; uruchamia serwer w trybie deweloperskim (development)
- `npm run lint` &mdash; uruchamia sprawdzanie kodu z ESLint, należy wykonać przed każdym PR i poprawić wszystkie błędy lintera
- `npm lint:fix` &mdash; to samo co powyższe, ale również automatycznie poprawia proste błędy.

///////////////////////////////////////////////////////////////////////////////////
HW2
Kryteria zaliczenia pracy domowej #2-6
Utworzone zostało repozytorium z pracą domową — aplikacja REST API.
Przy utworzeniu repozytorium wykorzystuje się boilerplate. https://github.com/goitacademy/nodejs-homework-template
Pull request (PR) z odpowiednią pracą domową został wysłany do mentora w LMS w celu sprawdzenia (link do PR). https://www.edu.goit.global/pl/account/login
Kod odpowiada technicznemu zadaniu projektu.
Przy wykonaniu kodu nie pojawiają się nieopracowane błędy.
Nazwy zmiennych, właściwości i metod zaczynają się z małej litery i zapisane zostały w notacji - - - CamelCase. Wykorzystywane są angielskie rzeczowniki.
Nazwy funkcji lub metod zawierają czasownik.
W kodzie nie ma komentarzy dodanych do fragmentów kodu.
Projekt działa poprawnie w aktualnej wersji LTS Node.

Utwórz fork repozytorium na swoim koncie github.
https://github.com/goitacademy/nodejs-homework-template

Obejrzyj nagranie wyjaśniające, jak prawidłowo wykonać i oddać pracę domową.
https://youtu.be/K3xlKRuiDP8

Napisz REST API do pracy ze zbiorem kontaktów. Do pracy z REST API wykorzystaj Postman.
https://www.getpostman.com/

Przeczytaj uważnie readme w sklonowanym boilerplate, opisany tam został mechanizm oddawania pracy domowej. Zacznij wykonywać zadanie domowe.

Krok 1
Utwórz gałąź hw02-express z gałęzi master.

Zainstaluj moduł przy pomocy polecenia:

npm i

Następujące moduły są już w projekcie:

express https://www.npmjs.com/package/express
morgan https://www.npmjs.com/package/morgan
cors https://www.npmjs.com/package/cors

Krok 2

W app.js – serwer webowy na express, dodane są warstwy morgan i cors. Zacznij konfigurować routing do pracy ze zbiorem kontaktów.

REST API powinien wspierać następujące routy:

@ GET /api/contacts
niczego nie otrzymuje;
wywołuje funkcję listContacts do pracy z plikiem json contacts.json;
zwraca tablicę wszystkich kontaktów w formacie json ze statusem 200.

@ GET /api/contacts/:id
Nie otrzymuje body; – otrzymuje parametr id;
wywołuje funkcję getById do pracy z plikami json contacts.json;
jeżeli takie id istnieje, zwraca obiekt kontaktu w formacie json ze statusem 200;
jeżeli takiego id nie ma, zwraca json z kluczem "message": "Not found" i statusem 404.

@ POST /api/contacts
Otrzymuje body w formacie name, email, phone} (wszystkie pola są obowiązkowe);
jeśli w body brak jakichś obowiązkowych pól, zwraca json z kluczem {"message": "missing required name - field"} i statusem 400;
jeśli z body wszystko w porządku, dodaje unikalny identyfikator do obiektu kontaktu;
wywołuje funkcję addContact(body) do zapisania kontaktu w pliku contacts.json;
w rezultacie pracy funkcji zwraca obiekt z dodanymi id {id, name, email, phone} i statusem 201.

@ DELETE /api/contacts/:id
Nie otrzymuje body;
otrzymuje parametr id;
wywołuje funkcję removeContact do pracy z plikiem json contacts.json;
jeżeli takie id istnieje, zwraca formaty json {"message": "contact deleted"} ze statusem 200;
jeśli nie ma takiego id, zwraca json z kluczem "message": "Not found" i statusem 404.

@ PUT /api/contacts/:id
Otrzymuje parametr id;
otrzymuje body w formacie json z aktualizacją dowolnych pól name, email i phone;
jeżeli nie ma body, zwraca json z kluczem {"message": "missing fields"} i statusem 400
jeśli z body wszystko w porządku, wywołuje funkcję pdateContact(contactId, body) (napisz ją) dla aktualizacji kontaktu w pliku contacts.json;
w rezultacie pracy funkcji zwraca zaktualizowany obiekt kontaktu ze statusem 200. W przeciwnym razie - zwraca json z kluczem "message": "Not found" i statusem 404.

Krok 3
Dla tras, które przyjmują dane (POST i PUT), przemyśl sprawdzenie (walidację) przyjmowanych danych. Do walidacji wykorzystaj pakiet joi.

https://github.com/sideway/joi

///////////////////////////////////////////////////////////////////////////////////
HW3
Utwórz gałąź hw03-mongodb z gałęzi master.

Kontynuuj tworzenie REST API do pracy ze zbiorem kontaktów.

Krok 1

Stwórz konto na MongoDB Atlas, a następnie na koncie utwórz nowy projekt i skonfiguruj bezpłatny klaster. W czasie konfigurowania klastera wybierz provider i region, jak na screenshocie poniżej. Jeżeli wybierzesz zbyt oddalony region, serwer odpowie wolniej.

https://www.mongodb.com/products/compass

Krok 2

Skonfiguruj edytor graficzny MongoDB Compass do wygodnej pracy z bazą danych dla MongoDB. Skonfiguruj podłączenie swojej chmury do Compass. W MongoDB Atlas nie zapomnij utworzyć użytkownika z prawami administratora.

https://www.mongodb.com/download-center/compass

Krok 3

Przez Compass utwórz bazę danych db-contacts, a w niej zbiór contacts. Weź link do json i przy pomocy Compass wypełnij zbiór contacts (zaimportuj) jego zawartością.

https://github.com/goitacademy/nodejs-homework/blob/master/homework-03/contacts.json

Jeżeli wszystko zrobiłeś prawidłowo, dane powinny się pojawić w twojej bazie w zbiorze contacts

Krok 4

Wykorzystaj kod źródłowy zadania domowego #2 i zamień zapisywanie kontaktów z pliku json na utworzoną przez siebie bazę danych.

Napisz kod do utworzenia podłączenia do MongoDB przy pomocy Mongoose. https://mongoosejs.com/
Przy sukcesie podłączenia wyprowadź na konsolę wiadomość "Database connection successful".
Obowiązkowo opracuj błąd podłączenia. Wyprowadź na konsolę wiadomość o błędzie i zakończ proces, wykorzystując process.exit(1).
W funkcjach opracowywania zapytań zamień kod operacji CRUD na kontaktach z pliku, na metody Mongoose do pracy ze zbiorem kontaktów w bazie danych.

Schemat modeli dla zbioru contacts:

{
name: {
type: String,
required: [true, 'Set name for contact'],
},
email: {
type: String,
},
phone: {
type: String,
},
favorite: {
type: Boolean,
default: false,
},
}

Krok 5

W naszych kontaktach pojawiło się dodatkowe pole statusu favorite, które przyjmuje logiczną wartość true lub false. Odpowiada ono za to, że wskazany kontakt znajduje się lub nie w ulubionych. Zrealizuj dla aktualizacji statusu kontaktu nową trasę.

@ PATCH /api/contacts/:contactId/favorite

Otrzymuje parametr contactId.
Otrzymuje body w formacie json z aktualizacją pola favorite.
Jeżeli body nie ma, zwraca json z kluczem {"message": "missing field favorite"} i statusem 400.
Jeżeli w body wszystko się zgadza to wywołaj funkcję updateStatusContact(contactId, body) (napisz ją), aby zaktualizować kontakt w bazie danych
W wyniku pracy funkcji zwraca zaktualizowany obiekt kontaktu ze statusem 200. W przeciwnym razie zwraca json z kluczem "message": "Not found" i statusem 404.

///////////////////////////////////////////////////////////////////////////////////
HW4
Utwórz gałąź hw04-auth z gałęzi master.

Kontynuuj tworzenie REST API do pracy ze zbiorem kontaktów. Dodaj logikę uwierzytelnienia/autoryzacji użytkownika przy pomocy JWT.
https://jwt.io/

Krok 1
Utwórz w kodzie schemat i model użytkownika dla zbioru users.

{
password: {
type: String,
required: [true, 'Password is required'],
},
email: {
type: String,
required: [true, 'Email is required'],
unique: true,
},
subscription: {
type: String,
enum: ["starter", "pro", "business"],
default: "starter"
},
token: {
type: String,
default: null,
},
}

Aby każdy użytkownik działał i widział tylko swoje kontakty w schemacie kontaktów, dodaj właściwość owner

owner: {
type: Schema.Types.ObjectId,
ref: 'user',
}

Uwaga: 'user' - nazwa zbioru (w liczbie pojedynczej), w którym zapisują się użytkownicy.

Krok 2

Rejestracja

Utwórz endpoint /users/signup
Zrób walidację wszystkich obowiązkowych pól (email i password). W przypadku błędu walidacji zwróć Błąd walidacji.
W przypadku pomyślnej walidacji w modelu User utwórz użytkownika z danymi, które przeszły walidację. Dla wprowadzenia soli do haseł wykorzystaj bcrypt https://www.npmjs.com/package/bcrypt lub bcryptjs](https://www.npmjs.com/package/bcryptjs).
Jeśli poczta jest już wykorzystywana przez kogoś innego, zwróć Błąd Conflict. W przeciwnym razie zwróć Sukces odpowiedzi.

Registration request
POST /users/signup
Content-Type: application/json
RequestBody: {
"email": "example@example.com",
"password": "examplepassword"
}

Registration validation error
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Błąd z Joi lub innej biblioteki walidacji>

Registration conflict error
Status: 409 Conflict
Content-Type: application/json
ResponseBody: {
"message": "Email in use"
}

Registration success response
Status: 201 Created
Content-Type: application/json
ResponseBody: {
"user": {
"email": "example@example.com",
"subscription": "starter"
}
}

Login

Utwórz endpoint /users/login.

W modelu User znajdź użytkownika po email.

Utwórz walidację wszystkich pól obowiązkowych (email i password). W przypadku błędu walidacji zwróć Błąd walidacji.

W przeciwnym razie porównaj hasło dla znalezionego usera. Jeżeli hasła pokrywają się, utwórz token, zapisz w obecnym userze i zwróć Sukces odpowiedzi. Jeżeli hasło lub email nie są dokładne, zwróć Błąd Unauthorized.

Login request

POST /users/login
Content-Type: application/json
RequestBody: {
"email": "example@example.com",
"password": "examplepassword"
}

Login validation error

Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Błąd z Joi lub innej biblioteki walidacji>

Login success response

Status: 200 OK
Content-Type: application/json
ResponseBody: {
"token": "exampletoken",
"user": {
"email": "example@example.com",
"subscription": "starter"
}
}

Login auth error

Status: 401 Unauthorized
ResponseBody: {
"message": "Email or password is wrong"
}

Krok 3

Sprawdzenie tokena

Utwórz oprogramowanie pośredniczące tokena i dodaj je do wszystkich tras, które powinny być chronione.

Oprogramowanie pośredniczące bierze token z nagłówków Authorization, sprawdza token pod względem ważności. W przypadku błędu zwróć Błąd Unauthorized. Jeżeli walidacja przeszła pomyślnie, otrzymaj z tokena id użytkownika. Znajdź użytkownika w bazie danych po tym id. Jeśli użytkownik istnieje i token pokrywa się z tym, co znajduje się w bazie, zapisz jego dane w req.user i wywołaj metodę next(). Jeżeli użytkownika z takim id nie ma lub tokeny nie pokrywają się, zwróć Błąd Unauthorized.

Middleware unauthorized error

Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
"message": "Not authorized"
}

Krok 4

Logout

Utwórz endpoint /users/logout

Dodaj do trasy program pośredniczący sprawdzania tokena.

W modelu User znajdź użytkownika po \_id. Jeżeli nie można zwrócić użytkownika Błąd Unauthorized. W przeciwnym razie usuń token w obecnym userze i zwróć Sukces odpowiedzi.

Logout request

GET /users/logout
Authorization: "Bearer {{token}}"

Logout unauthorized error

Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
"message": "Not authorized"
}

Logout success response

Status: 204 No Content

Krok 5

Obecny użytkownik – otrzymaj dane usera zgodnie z tokenem

Utwórz endpoint /users/current

Dodaj do trasy program pośredniczący sprawdzania tokena.

Jeżeli użytkownik nie istnieje, zwróć Błąd Unauthorized
W przeciwnym razie zwróć Sukces odpowiedzi

Current user request

GET /users/current
Authorization: "Bearer {{token}}"

Current user unauthorized error

Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
"message": "Not authorized"
}

Current user success response

Status: 200 OK
Content-Type: application/json
ResponseBody: {
"email": "example@example.com",
"subscription": "starter"
}

Zadanie dodatkowe – nieobowiązkowe
Stwórz paginację dla zbioru kontaktów (GET /contacts?page=1&limit=20).
Utwórz filtrowanie kontaktów zgodnie z polem wybranego (GET /contacts?favorite=true).
Aktualizacja subskrypcji (subscription) użytkownika przez endpoint PATCH /users. Subskrypcja powinna mieć jedną z następujących wartości ['starter', 'pro', 'business'].

///////////////////////////////////////////////////////////////////////////////////
HW5
Utwórz gałąź hw05-avatars z gałęzi master.

Kontynuuj tworzenie REST API do pracy ze zbiorem kontaktów. Dodaj opcję ładowania awataru użytkownika przez Multer. https://github.com/expressjs/multer

Krok 1

Stwórz folder public do rozdawania statyki. W tym folderze utwórz folder avatars. Narzędzie Express do rozdawania plików statycznych z folderu public.

Umieść dowolny obraz w folderze public/avatars i sprawdź, czy rozdawanie statyki działa. Po przejściu po takim URL przeglądarka wyświetli obraz.

http://localhost:<port>/avatars/<nazwa pliku z rozszerzeniem>

Krok 2
Do schematu użytkownika dodaj nową właściwość avatarURL dla przechowywania obrazu.

{
...
avatarURL: String,
...
}

Wykorzystaj pakiet gravatar, aby przy rejestracji nowego użytkownika od razu wygenerować mu awatar po jego email.
https://www.npmjs.com/package/gravatar

Krok 3

Przy rejestracji użytkownika:

Utwórz odnośnik do awatara użytkownika przy pomocy gravatar. https://www.npmjs.com/package/gravatar
Otrzymany URL zapisz w polu avatarURL w czasie tworzenia użytkownika.

Krok 4

Dodaj możliwość aktualizacji awatara, tworząc endpoint /users/avatars i wykorzystując metodę PATCH.

# Zapytanie

PATCH /users/avatars
Content-Type: multipart/form-data
Authorization: "Bearer {{token}}"
RequestBody: załadowany plik

# Poprawna odpowiedź

Status: 200 OK
Content-Type: application/json
ResponseBody: {
"avatarURL": "tu będzie odnośnik do obrazu"
}

# Błędna odpowiedź

Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
"message": "Not authorized"
}

Utwórz folder tmp w root projektu i zapisuj w nim załadowany awatar. Opracuj awatar przy pomocy pakietu jimp i wprowadź dla niego wymiary 250 na 250. Przenieś awatar użytkownika z folderu tmp do folderu public/avatars i nadaj mu unikalną nazwę dla konkretnego użytkownika. Otrzymany URL /avatars/<nazwa pliku z rozszerzeniem> zapisz w polu avatarURL użytkownika.
https://www.npmjs.com/package/jimp

Zadanie dodatkowe – nieobowiązkowe

1. Napisać unit-testy dla kontrolera wejścia (login/signin)
   Przy pomocy Jest https://jestjs.io/ru/docs/getting-started
   odpowiedź powinna mieć status kod 200; w odpowiedzi powinien być zwracany token; w odpowiedzi powinien być zwracany obiekt user z 2 polami email i subscription, mającymi typ danych String.

///////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////
HW5 ToDo
Zadanie dodatkowe – nieobowiązkowe

1. Napisać unit-testy dla kontrolera wejścia (login/signin)
   Przy pomocy Jest https://jestjs.io/ru/docs/getting-started
   odpowiedź powinna mieć status kod 200; w odpowiedzi powinien być zwracany token; w odpowiedzi powinien być zwracany obiekt user z 2 polami email i subscription, mającymi typ danych String.
