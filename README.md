# Online-Shop
* [Opis](#opis)
* [Kluczowe funkcjonalności](#kluczowe-funkcjonalności)
* [Wykorzystanie Spring Security](#wykorzystanie-spring-security)
* [Stos technologiczny](#stos-technologiczny)
* [Ustawienia](#ustawienia)
* [Wygląd aplikacji](#wygląd-aplikacji)

## Opis
<details>
<summary>Naciśnij aby zobaczyć więcej informacji o <b>Projekcie</b>!</summary>
<b>Onlisne-Shop</b> zakłada stworzenie sklepu internetowego, który umożliwi użytkownikom przeglądanie produktów, filtorwanie, dodawanie ich do koszyka oraz składanie zamówień. Projekt opiera się na nowoczesnych technologiach zapewniających wysoką wydajność, bezpieczeństwo oraz skalowalność.
</details>

## Kluczowe funkcjonalności
<b>Główne założenia projektu</b>
<ul>
<li>Rejestracja i logowanie użytkowników: Bezpieczne przechowywanie danych z wykorzystaniem JWT.</li>
<li>Katalog produktów: Możliwość przeglądania, filtrowania i wyszukiwania produktów.</li>
<li>Koszyk: Dodawanie, aktualizowanie i usuwanie produktów.</li>
<li>Zarządzanie zamówieniami: Składanie zamówień oraz ich przeglądanie.</li>
<li>Panel administratora: Zarządzanie produktami, kategoriami i zamówieniami.</li>
<li>Przechowywanie obrazów: Wydajne przechowywanie zdjęć produktów w chmurze AWS S3.</li>
</ul>

## Wykorzystanie Spring Security
<img src="https://github.com/user-attachments/assets/5f33af0d-cac6-4ae1-97c8-092979f3d285" width="50%" height="50%"></img>

## Stos technologiczny
<b>Backend</b>
<ul>
<li>Framework: Java Spring Boot</li>
<li>Autoryzacja i uwierzytelnianie: JSON Web Tokens (JWT)</li>
<li>Baza danych: PostgreSQL</li>
<li>ORM: Hibernate (JPA)</li>
</ul>
<b>Frontend</b>
<ul>
<li>Framework: Angular</li>
</ul>
<b>Zewnętrzne oprogramowanie</b>
<ul>
<li>Amazon S3: Przechowywanie plików graficznych</li>
</ul>

## Ustawienia
<b>Aby uruchomić projekt lokalnie, ptrzebujesz</b>
<ul>
<li>Java 21+ i Spring Boot 3+</li>
<li>Node.js i npm</li>
<li>PostgreSQL</li>
<li>AWS (z dostępem do konfiguracji dla S3)</li>
</ul>
<details>
<summary>Naciśnij aby zobaczyć więcej informacji o <b>Ustawieniach</b>.</summary>
<b>Konfiguracja</b>, do uruchomienia wystarczy skonfigurować application.properties (dostęp do bazy danych: url, username, password) oraz dodać secretJwtString (musi zawierać minimum 32 znaki), aws.s3.accessKey (klucz dostępu do AWS S3), aws.s3.secretKey (sekretny klucz do AWS S3). Na koniec w pliku AwsS3Service.java należy podać własną nazwę "bucketName".
</details>

## Wygląd aplikacji
<h4><strong>Panel logowania i rejestracji</strong></h4>
<img src="https://github.com/user-attachments/assets/f405b9f7-a024-448f-822d-48cbedb240a4" width="500px" height="250px"></img>
<img src="https://github.com/user-attachments/assets/cd306006-2bd3-49e0-9a47-9efa87264e8e" width="500px" height="250px"></img>

<h4><strong>Panel główny</strong></h4>
<img src="https://github.com/user-attachments/assets/13a66019-6063-4d73-b3e6-bb319ed490ff" width="500px" height="250px"></img>
<img src="https://github.com/user-attachments/assets/da526cc8-00e1-47b5-9b33-428117a4d228" width="500px" height="250px"></img>

<h4><strong>Szczegóły produktu</strong></h4>
<img src="https://github.com/user-attachments/assets/72488989-f286-4be6-b8d1-26919fc0aeb2" width="500px" height="250px"></img>

<h4><strong>Aktualnie dostępne kategorie</strong></h4>
<img src="https://github.com/user-attachments/assets/e765b1d6-737b-4397-907e-589b4a2b451e" width="500px" height="250px"></img>

<h4><strong>Koszyk z zakupami</strong></h4>
<img src="https://github.com/user-attachments/assets/e8035739-8b35-4a8d-be24-1edeca8d23e9" width="500px" height="250px"></img>

<h4><strong>Profil użytkownika i historia zamówień</strong></h4>
<img src="https://github.com/user-attachments/assets/bdccc6e0-289f-4b04-a862-a3d5d7df7e1a" width="500px" height="250px"></img>

<h4><strong>Panel edycji adresu użytkownika</strong></h4>
<img src="https://github.com/user-attachments/assets/b4acf82d-6d6d-4ebb-a9ec-bb2af1c693c4" width="500px" height="250px"></img>

<h4><strong>Panel administratora do zarządzania</strong></h4>
<img src="https://github.com/user-attachments/assets/67f38dbe-b344-4ac9-988f-226a54520242" width="500px" height="250px"></img>

<h4><strong>Panel administratora do zarządzania kategoriami</strong></h4>
<img src="https://github.com/user-attachments/assets/aae9308e-4a51-49d2-b119-9b561fe8cac4" width="500px" height="250px"></img>

<h4><strong>Dodawanie i edycja kategorii</strong></h4>
<img src="https://github.com/user-attachments/assets/ebad5e84-9690-47a7-87fd-f8673e05ea61" width="500px" height="200px"></img>
<img src="https://github.com/user-attachments/assets/4a57eb60-f506-4a96-a55f-52f38e5a6472" width="500px" height="200px"></img>

<h4><strong>Panel administratora do zarządzania produktami</strong></h4>
<img src="https://github.com/user-attachments/assets/ab571f1c-db12-4fda-937a-dc2807fa37aa" width="500px" height="250px"></img>

<h4><strong>Dodawanie i edycja produktów</strong></h4>
<img src="https://github.com/user-attachments/assets/207ecf87-0ab1-4c8c-a516-0f340314bc77" width="500px" height="250px"></img>
<img src="https://github.com/user-attachments/assets/4054a850-1c4b-47d8-a682-3731eed86b4e" width="500px" height="250px"></img>

<h4><strong>Panel administratora do filtrowania i zarządzania zamówieniami</strong></h4>
<img src="https://github.com/user-attachments/assets/db08df6f-0865-43e5-8717-c313b851a8d8" width="500px" height="250px"></img>
<img src="https://github.com/user-attachments/assets/0136d775-a0ff-420e-be53-fb5c4983238a" width="500px" height="150px"></img>

<h4><strong>Panel podglądu i edycji statusu zamówienia</strong></h4>
<img src="https://github.com/user-attachments/assets/f092153a-181f-40d2-8e1f-34c9408802c7" width="500px" height="250px"></img>

