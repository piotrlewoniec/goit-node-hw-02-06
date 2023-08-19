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
