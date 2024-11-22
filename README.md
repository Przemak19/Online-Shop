# Online-Shop
* [Opis](#opis)
* [Kluczowe funkcjonalności](#kluczowe-funkcjonalności)
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

