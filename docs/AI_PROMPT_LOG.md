# AI Asszisztált Fejlesztés Naplója (AI_PROMPT_LOG)

Ez a dokumentum a ReflexPro webalkalmazás fejlesztése során az AI-val (Google Gemini) folytatott interakciókat, promptokat, mérnöki döntéseket és a felmerült problémák kezelését mutatja be. A napló hűen tükrözi a projekt fejlesztési ívét a három fő mérföldkőn keresztül.


---

## 1. Fázis: Projekttervezés és Specifikáció

**Prompt 1:** *"Egy egyetemi projektmunkához készítek webalkalmazást... Segíts teljes specifikációt készíteni az alkalmazáshoz. Cím: Reflex tesztelő játék. Környezet: Modern webfejlesztési keretrendszer."*
* **AI Válasza:** Adott egy 13 pontból álló, rendkívül részletes specifikációt (funkcionális és nem funkcionális követelmények, adatmodell, komponensfa).
* **Döntés:** ✅ **Elfogadva.** A struktúra kiváló alapot biztosított a fejlesztés megkezdéséhez.

**Prompt 2:** *"Angularban csinálnám meg. Írd át a specifikációt az Angular 17+ (Signals, Standalone components) szabványaira."*
* **AI Válasza:** Frissítette a specifikációt, behozta az `@angular/fire` és a Signals koncepcióját a State managementhez.
* **Döntés:** 🟡 **Módosítva.** Az AI által javasolt komponensfát kissé leegyszerűsítettem, összevonva a játéktér (ReactionArea) és az időzítő (Timer) komponenseket a könnyebb adatfolyam érdekében.

---

## 2. Fázis: Alapvető játéklogika és UI

**Prompt 3:** *"Kérlek írd meg a játék fő logikáját tartalmazó GameService-t Angular Signals használatával. Legyen benne reakcióidő mérés, pontszámítás és büntetés a korai gombnyomásért."*
* **AI Válasza:** Generált egy `GameService`-t, amely a `performance.now()` segítségével mérte az időt, és kiszámolta a pontokat.
* **Döntés:** ✅ **Elfogadva.** A `performance.now()` használata kiváló döntés volt az AI részéről a sima `Date.now()` helyett a milliszekundum pontosság miatt.

**Prompt 4:** *"Készítsd el a GameComponent-et, ami figyeli a WASD billentyűket a @HostListener segítségével, és mobilon is működik virtuális gombokkal."*
* **AI Válasza:** Megírta a komponenst az Angular 17 `@switch` és `@if` control flow szintaxisával, beépítve a mobil nézetet is.
* **Döntés:** 🟡 **Módosítva.** Az AI Tailwind CSS osztályai nem adtak elég vizuális visszajelzést (pl. gombnyomás animáció). Hozzáadtam az `active:scale-95` és `transition-all` osztályokat a jobb User Experience érdekében.

**Prompt 5:** *"Hogyan tudom elkerülni, hogy a játékos folyamatosan 'spammelje' a billentyűzetet, amíg várakozó (waiting) állapotban van a játék?"*
* **AI Válasza:** Javasolta, hogy adjunk egy flag-et a szervizhez (`isKeyLocked`), ami vár egy picit a büntetés kiosztása után, mielőtt újra regisztrálja a gombnyomást.
* **Döntés:** ✅ **Elfogadva.** Implementáltam az 500ms-os "lockout" mechanizmust, ami meggátolta a pontszám-manipulációt.

---

## 3. Fázis: Adatbázis és Backend integráció (Kritikus pontok)

**Prompt 6:** *"Szeretném bekötni a Firebase Firestore-t. Írd meg a kódot, ami a játék végén elmenti a pontszámot a 'leaderboard' kollekcióba."*
* **AI Válasza:** Generált egy aszinkron metódust az `@angular/fire/firestore` `addDoc` függvényével.
* **Döntés:** 🟡 **Módosítva.** Az AI kódja nem kezelte le azt az esetet, ha a hálózati kapcsolat megszakad a mentés közben. Betettem egy `try-catch` blokkot és egy hibaüzenet (Toast) megjelenítést.

**Prompt 7 (KRITIKUS HIBA 1):** *"Milyen Firestore Security Rules-t használjak a leaderboard kollekcióhoz, hogy a userek menthessék a pontjaikat?"*
* **AI Válasza:** A következőt javasolta:
  `allow read, write: if true;`
* **Értékelés és Kezelés:** ❌ **Elutasítva (AI Tévedés).** Az AI a legegyszerűbb, de legveszélyesebb teszt-szabályt adta, amivel bárki (akár autentikáció nélkül is) felülírhatta volna a teljes adatbázist. Ezt felismerve **átírtam** a szabályt arra, hogy olvasni bárki tudjon, de írni csak bejelentkezett felhasználó: `allow read: if true; allow write: if request.auth != null;`

---

## 4. Fázis: Állapotkezelési és Memória Problémák

**Prompt 8 (KRITIKUS HIBA 2):** *"A játék újraindításakor néha duplán jelennek meg az ingerek, és felgyorsul a játék. Mi lehet a baj a GameService kódjával?"*
* **AI Válasza:** Azt javasolta, hogy használjak `Subject`-et a Signals helyett, mert "valószínűleg a reaktivitással van a baj".
* **Értékelés és Kezelés:** ❌ **Elutasítva (AI Tévedés).** Az AI félrediagnosztizálta a problémát és az architektúra (Signals) lecserélését javasolta, ami indokolatlan lett volna. Saját kódolvasással rájöttem, hogy egyszerű **memóriaszivárgás (memory leak)** történt: a `setTimeout` nem lett törölve (`clearTimeout`), amikor a komponensből elnavigált a felhasználó. Ezt én magam javítottam az `ngOnDestroy` lifecycle hook implementálásával, az AI téves tanácsát figyelmen kívül hagyva.

---

## 5. Fázis: Tesztelés és Finomhangolás

**Prompt 9:** *"Írj egy unit tesztet a GameService átlagos reakcióidő számításához (avgReactionTime computed signal)."*
* **AI Válasza:** Megírta a Jasmine tesztet, ami feltöltötte a `reactionTimes` tömböt mock adatokkal, és ellenőrizte az eredményt.
* **Döntés:** ✅ **Elfogadva.** A teszt azonnal lefutott és zöld lett, jól szemléltette a computed signals tesztelhetőségét.

**Prompt 10:** *"Készíts egy alap Cypress E2E tesztet, ami megnyitja az oldalt, rákattint a Start gombra, és vár 3 másodpercet."*
* **AI Válasza:** Generált egy alap `spec.cy.ts` fájlt a `cy.visit('/')` és `cy.get('button').click()` parancsokkal.
* **Döntés:** 🟡 **Módosítva.** Az AI által írt `cy.wait(3000)` anti-pattern a Cypress-ben. Helyette módosítottam a tesztet úgy, hogy egy adott UI elem (pl. a felvillanó inger) megjelenésére várjon dynamikusan (`cy.get('.bg-green-600').should('be.visible')`).

---
## 1. Fejlesztési promptok és AI válaszok (A projekt íve)
---

### 1. Mérföldkő: Specifikáció, UI és megjelenés
**1. Prompt:** *Kérés:* Képernyőfotó csatolása a hibás UI-ról: "Ha a reflexteszte megyek akkor marad ezen az oldalon és a vissza a játékmódhoz megjelenik és ahányszor megnyomom megtöbbszörözi a gombokat..."  
*AI válasz:* Elemezte a képet, megállapította, hogy a `GamePage.jsx`-ben a régi és új kód összeakadt, és egy letisztult, javított komponenst generált.

**2. Prompt:** *Kérés:* Újabb képernyőfotó csatolásával: "Ami viszont kell az az hogymint a képen látható a két játék balra tolódik, nem szimetrikus, legyen az, valamint azt szeretném hogy ennek a másik játéknak is legyen külön ranglistája..."  
*AI válasz:* Megállapította, hogy a CSS Grid 3 oszlopos beállítása okozza a csúszást 2 kártya esetén. Javasolt egy Flexbox alapú középre igazítást, és felépítette a füles (tab) navigációt a ranglistához.

**3. Prompt:** *Kérés:* "a játékválasztó felületen és a véllövölde felületen is legyen ott az ambiens fény váltó gomb"  
*AI válasz:* Javasolta a React Router `useSearchParams` hookjának használatát, hogy az URL-ben (pl. `?mode=aim`) tároljuk a játékmódot. A `ThemeController` ez alapján logikusan elrejtette vagy mutatta a paletta gombot.

### 2. Mérföldkő: Backend, Adatmodell és Állapotkezelés
**4. Prompt:** *Kérés:* "megfelelünk eddig a második mérföldkőnek? kész van már?"  
*AI válasz:* A pontozási táblázat alapján kielemezte a kódot. Jelezte, hogy a CRUD műveletekből hiányzik az "Update" (Szerkesztés), és csak 2 Entitásunk van a Firebase-ben a várt 5 helyett.

**5. Prompt:** *Kérés:* "hiba van, amikor regisztrálok akkor megadok ugye egy nevet, de amikor bejelentkezek akkor nem ez a név lesz a profilnév hanem az emailcím... javítsd ki és csinálj egy névváltoztató funkciót is"  
*AI válasz:* Elismerte a hibát, lecserélte a fallback megoldást a Firebase `updateProfile` metódusára, és írt egy globális névváltoztató funkciót, ami az összes korábbi Firestore dokumentumot is frissíti az új névre.

**6. Prompt:** *Kérés:* "csináljuk meg hogy a profilon ne csak a reakcióidő hanem a céllövölde statisztikáit is megnézzük. Legyen olyan statisztika hogy azt is számolja milyen arányba találjuk el a céltáblát"  
*AI válasz:* Kibővítette az `AimBoard.jsx`-et egy "miss" (mellékattintás) számlálóval, kiszámolta a pontosságot százalékban, és hozzáadta a Firebase mentéshez, majd frissítette a Profil oldal füles nézetét.

**7. Prompt:** *Kérés:* "a céllövöldét nem menti le a profilra, vagy legalábbis a profil nem mutatja a céllövölde statisztikáit"  
*AI válasz:* Rámutatott az adatbázis hibára: a Firestore új kollekciója összetett lekérdezési indexet (Composite Index) igényel, és leírta, hol találom a böngésző konzoljában a generáló linket.

**8. Prompt:** *Kérés:* "csináld meg a szerkesztés gombot, valamint akkor csináljum meg ezet: pl. csinálhatunk egy user_profiles kollekciót a felhasználók adatainak, egy achievements kollekciót, és mondjuk egy feedback kollekciót"  
*AI válasz:* Beépítette az `updateDoc` függvényt a megjegyzések szerkesztéséhez a Profilra, és bevezette a hiányzó 3 új Firestore kollekciót a 2. mérföldkő adatmodell elvárásainak kimaxolásához.

### 3. Mérföldkő: Biztonság, Tesztelés és Deploy
**9. Prompt:** *Kérés:* "Kezdjük el a 3. mérföldkövet" (Jogosultságkezelés megvalósítása).  
*AI válasz:* Létrehozott egy `ProtectedRoute.jsx` komponenst, amivel "körbeölelte" a privát oldalakat a kliens-oldali routingban (React Router), és visszairányítást (Redirect) írt a `/login` oldalra.

**10. Prompt:** *Kérés:* "lehessen játszani bejelentkezés nélkül, de a profil az maradhat védett"  
*AI válasz:* Módosította az `App.jsx` útválasztását, kivéve a `GamePage`-et a védett útvonalak közül, így javítva a UX-et a vendég felhasználók számára.

**11. Prompt:** *Kérés:* A 3.4-es tesztelési szempontok (5 pont) bemásolása, majd a kérdés: "Ennek eleget tesz?"  
*AI válasz:* Őszintén elemezte, hogy jelenleg nem (csak 3 teszt volt 10 helyett, és nem volt E2E). Javasolt egy kétlépcsős tervet a Vitest és a Cypress bevezetésére.

**12. Prompt:** *Kérés:* "kezdjük akkor az 1.lépéssel" (Vitest és JSDOM konfiguráció 7 új teszttel).  
*AI válasz:* Generált egy `vite.config.js` frissítést és 3 új tesztfájlt a React komponensek vizuális renderelésének és logikájának ellenőrzésére.

**13. Prompt:** *Kérés:* Konzol kimenet bemásolása: "Test Files 1 failed | 3 passed (4) Tests 3 failed | 7 passed (10)"  
*AI válasz:* Észrevette, hogy a tesztek túl szigorú (és téves) szöveges egyezést vártak (pl. "Eredmény:" helyett "Reakcióidő:" volt a kódban). Átírta a teszteket a valós kódhoz igazítva, Regex használatával.

**14. Prompt:** *Kérés:* Cypress futtatási hiba bemásolása: "Could not find a Cypress configuration file in this folder..."  
*AI válasz:* Elmagyarázta a fájlrendszer-struktúra problémát (a `cypress.config.js` nem a gyökérkönyvtárban volt), és pontos instrukciókat adott az áthelyezéshez.

**15. Prompt:** *Kérés:* "írd meg a README"  
*AI válasz:* Generált egy formázott, szakszerű Markdown README-t a projekt céljával, a technológiai stackkel, a lokális futtatás és a tesztelés lépéseivel, majd segített a Vercel segítségével történő élesítésben (Deploy).

---

## 2. Elfogadás, Módosítás és Elutasítás Dokumentálása (Mérnöki Döntések)

1. **Elutasítás:** A játékmód-választó kártyák aszimmetriájának javításakor az AI egy korábbi kódot is módosított volna, amit én jeleztem felé: *"bocs előbb én hibáztam ezt az utolsó javítás nem kell"*. A felesleges módosítást elutasítottam, és csak a CSS/Flexbox javítást tartottuk meg.
2. **Módosítás (UX):** Az AI eredetileg "szigorú" útvonalvédelmet (Route guard) javasolt, ami bejelentkezéshez kötötte volna a játékot is. Én ezt módosítottam: *"lehessen játszani bejelentkezés nélkül, de a profil az maradhat védett"*. Ezt UX szempontból tartottam fontosnak.
3. **Módosítás (Adatmodell):** Az AI által generált Firebase adatbázis entitások számának növelése érdekében (hogy meglegyen a mérföldkőhöz az 5 entitás), én specifikáltam a `user_profiles`, `achievements` és `feedback` kollekciók bevezetését. Az AI kódját ezen az én döntésem alapján integráltuk.
4. **Módosítás (Auth):** Az autentikáció megvalósításánál az AI eredetileg csak levágta az e-mail cím elejét profilnévként. Ezt a megoldást módosíttattam vele úgy, hogy regisztrációkor kérjen be egy felhasználónevet, és azt mentse el a Google Auth `displayName` mezőjébe.
5. **Elfogadás:** Az AI javasolta a `useSearchParams` hook használatát a játékmódok tárolására az URL-ben. Ezt a megoldást változtatás nélkül elfogadtam, mivel elegánsabb állapotkezelést biztosított, és a pontozásnál külön kitért a "URL-szinkronizált állapotra".

---

## 3. Kritikus Gondolkodás és AI Korlátok (Amikor az AI tévedett)

**1. Eset: Hibás Unit Teszt elvárások (Szöveges egyezés kontextusának hiánya)**
* **A hiba:** Amikor a Vitest segítségével írtunk 7 új komponenstesztet, az AI "vakon" olyan szövegekre írt `expect` keresést, amik nem egyeztek a kódommal. (Például a `ScoreDisplay` tesztben "Eredmény:"-t keresett, miközben a korábban megírt kódomban "Reakcióidő:" szerepelt). A tesztek elbuktak.
* **Hogyan kezeltem:** Kritikusan értékeltem a helyzetet: tudtam, hogy a *kód* a jó és a *teszt* a rossz. Kimásoltam a terminálból a hibaüzeneteket és a tényleges DOM kimenetet, megmutattam az AI-nak, majd rákényszerítettem, hogy a tesztfájlokat a valós kódhoz igazítsa (pl. Regex bevezetésével a darabolt szövegekhez).

**2. Eset: Cypress konfigurációs hiba a fájlrendszerben**
* **A hiba:** Az E2E (Cypress) teszt írásakor a terminál "Could not find a Cypress configuration file" hibát dobott. Az AI instrukciói alapján létrehoztam a fájlokat, de az AI nem hangsúlyozta ki eléggé, hogy a `cypress.config.js` fájlnak a projekt gyökerében kell lennie, és véletlenül egy almappába hoztam létre.
* **Hogyan kezeltem:** Felismertem, hogy ez egy környezeti (environment) probléma, nem pedig kódolási hiba. Bemásoltam a hibaüzenetet az AI-nak ("C:\Users\jancs\WebstormProjects\reflex-tester" mappában keresi a fájlt), majd az iránymutatása alapján korrigáltam a projekt mappaszerkezetét, áthelyezve a config fájlt a legfelső szintre.