# RedTekk Code Rules

Pre pocetka svake sesije procitati ovaj fajl i primeniti pravila u nastavku.

## Angular access modifiers

- `public` koristiti za funkcije i propertije koje se koriste van komponente, direktive ili servisa, ukljucujuci `@Input`, `@Output`, lifecycle hook metode i API koji koristi Angular runtime.
- `protected` koristiti za funkcije i propertije koje se koriste u template-u.
- `private` koristiti za funkcije i propertije koje se koriste samo u TypeScript fajlu.
- Sva `private` polja i metode moraju imati `_` prefix.

## Interfaces and types

- Sve custom `interface` i `type` definicije drzati u `src/app/interfaces`.
- Ne pisati lokalne custom interfejse ili tipove unutar komponenti, direktiva ili servisa.

## Component structure

- Koristiti standalone Angular komponente.
- UI elemente koji se ponavljaju izdvajati u zasebne komponente, npr. button i input.
- Layout delove izdvajati u komponente, npr. header, nav, footer i brand.
- Podatke koji hrane template drzati kao `readonly` kolekcije i tipizirati ih interfejsima iz `src/app/interfaces`.

## Styling and behavior

- Globalne dizajn tokene i postojece site stilove drzati u `src/styles.scss`.
- DOM animacije i browser-only behavior drzati u Angular direktivama ili servisima, ne u globalnim script fajlovima.
- Ne dodavati novu arhitekturu ako postojeci Angular pattern resava stvar jednostavno.
