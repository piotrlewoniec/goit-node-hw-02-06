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
