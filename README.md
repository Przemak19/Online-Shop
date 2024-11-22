Online-Shop

Opis
Projekt zakłada stworzenie sklepu internetowego, który umożliwi użytkownikom przeglądanie produktów, filtorwanie, dodawanie ich do koszyka oraz składanie zamówień. Projekt opiera się na nowoczesnych technologiach zapewniających wysoką wydajność, bezpieczeństwo oraz skalowalność.

Stos technologiczny

Backend

Framework: Java Spring Boot

Autoryzacja i uwierzytelnianie: JSON Web Tokens (JWT)

Baza danych: PostgreSQL

ORM: Hibernate (JPA)

Frontend

Framework: Angular

Przechowywanie danych

Zdjęcia produktów: Amazon S3


Kluczowe funkcjonalności

Rejestracja i logowanie użytkowników: Bezpieczne przechowywanie danych z wykorzystaniem JWT.

Katalog produktów: Możliwość przeglądania, filtrowania i wyszukiwania produktów.

Koszyk: Dodawanie, aktualizowanie i usuwanie produktów.

Zarządzanie zamówieniami: Składanie zamówień oraz ich przeglądanie.

Panel administratora: Zarządzanie produktami, kategoriami i zamówieniami.

Przechowywanie obrazów: Wydajne przechowywanie zdjęć produktów w chmurze AWS S3.

Wymagania wstępne

Aby uruchomić projekt lokalnie, ptrzebujesz:

Java 21+ i Spring Boot 3+

Node.js i npm

PostgreSQL

AWS (z dostępem do konfiguracji dla S3)

Do uruchomienia wystarczy skonfigurować application.properties oraz dodać secretJwtString, aws.s3.accessKey, aws.s3.secretKey.
