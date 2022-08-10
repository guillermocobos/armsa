/** @license
 * Copyright (c) 2013-2017 Ephox Corp. All rights reserved.
 * This software is provided "AS IS," without a warranty of any kind.
 */
!function(){var a=function(a){return function(){return a}},b=function(a,b){var c=a.src.indexOf("?");return a.src.indexOf(b)+b.length===c},c=function(a){for(var b=a.split("."),c=window,d=0;d<b.length&&void 0!==c&&null!==c;++d)c=c[b[d]];return c},d=function(a,b){if(a){var d=a.getAttribute("data-main");if(d){a.removeAttribute("data-main");var e=c(d);if("function"==typeof e)return e;console.warn("attribute on "+b+" does not reference a global method")}else console.warn("no data-main attribute found on "+b+" script tag")}};!function(a,c){var e=d(document.currentScript,c);if(e)return e;for(var f=document.getElementsByTagName("script"),g=0;g<f.length;g++)if(b(f[g],a)){var h=d(f[g],c);if(h)return h}throw"cannot locate "+c+" script tag"}("help_fi.js","help for language fi")({version:"2.4.2",about:a('\ufeff<div role=presentation class="ephox-polish-help-article ephox-polish-help-about">\n  <div class="ephox-polish-help-h1" role="heading" aria-level="1">Tietoja</div>\n  <p>Textbox.io on WYSIWYG-ty\xf6kalu upean sis\xe4ll\xf6n luomiseen verkkosovelluksissa. Olipa kyse sosiaalisista yhteis\xf6ist\xe4, blogeista, s\xe4hk\xf6posteista tai n\xe4iden yhdistelmist\xe4, Textbox.io antaa ihmisten ilmaista itse\xe4\xe4n verkossa.</p>\n  <p>&nbsp;</p>\n  <p>Textbox.io @@FULL_VERSION@@</p>\n  <p>Asiakasohjelma koontiversio @@CLIENT_VERSION@@</p>\n  <p class="ephox-polish-help-integration">Integraatio tyypille @@INTEGRATION_TYPE@@, versio @@INTEGRATION_VERSION@@</p>\n  <p>&nbsp;</p>\n  <p>Copyright 2017 Ephox Corporation, Kaikki oikeudet pid\xe4tet\xe4\xe4n.</p>\n  <p><a href="javascript:void(0)" class="ephox-license-link">Kolmannen osapuolen lisenssit</a></p>\n</div>'),accessibility:a('\ufeff<div role=presentation class="ephox-polish-help-article">\n  <div role="heading" aria-level="1" class="ephox-polish-help-h1">N\xe4pp\xe4imist\xf6navigointi</div>\n  <div role="heading" aria-level="2" class="ephox-polish-help-h2">N\xe4pp\xe4imist\xf6navigoinnin aktivointi</div>\n  <p>N\xe4pp\xe4imist\xf6navigointi otetaan k\xe4ytt\xf6\xf6n painamalla F10 Windows- tai ALT + F10 Mac OSX -k\xe4ytt\xf6j\xe4rjestelm\xe4ss\xe4. Ty\xf6kalurivin ensimm\xe4inen kohta korostuu sinisell\xe4 \xe4\xe4riviivalla osoituksena valinnasta. </p>\n\n  <div role="heading" aria-level="2" class="ephox-polish-help-h2">Liikkuminen ryhmien v\xe4lill\xe4</div>\n  <p>Ty\xf6kalurivin sis\xe4ll\xe4 olevat painikkeet on eroteltu samankaltaisten toimintojen ryhmiin. Kun n\xe4pp\xe4imist\xf6navigointi on aktiivinen, sarkainn\xe4pp\xe4imen painallus siirt\xe4\xe4 valinnan seuraavaan ryhm\xe4\xe4n ja vaihto + sarkain siirt\xe4\xe4 valinnan takaisin edelliseen ryhm\xe4\xe4n. Sarkaimen painaminen viimeisess\xe4 ryhm\xe4ss\xe4 kiert\xe4\xe4 takaisiin ensimm\xe4iseen painikeryhm\xe4\xe4n.</p>\n\n  <div role="heading" aria-level="2" class="ephox-polish-help-h2">Kohteiden tai painikkeiden v\xe4lill\xe4 liikkuminen</div>\n  <p>Kohteiden v\xe4lill\xe4 liikutaan painamalla nuolin\xe4pp\xe4imi\xe4. Kohteet kiert\xe4v\xe4t ryhm\xe4ns\xe4 sis\xe4ll\xe4 ja seuraavaan ryhm\xe4\xe4n hyp\xe4t\xe4\xe4n painamalla sarkainta ja k\xe4ytt\xe4m\xe4ll\xe4 nuolin\xe4pp\xe4imi\xe4 liikkumaan ryhm\xe4n sis\xe4ll\xe4.</p>\n\n  <div role="heading" aria-level="2" class="ephox-polish-help-h2">Komentojen suorittaminen</div>\n  <p>Komento suoritetaan navigoimalla valinta haluttuun painikkeeseen ja painamalla v\xe4lily\xf6nti tai enter.</p>\n\n  <div role="heading" aria-level="2" class="ephox-polish-help-h2">Valikkojen avaaminen, navigointi ja sulkeminen</div>\n  <p>Kun ty\xf6kalurivin painike sis\xe4lt\xe4\xe4 valikon, v\xe4lily\xf6nnin tai enterin painaminen avaa valikon. Kun valikko aukeaa, sen ensimm\xe4inen kohta on valittuna, k\xe4yt\xe4 nuolin\xe4pp\xe4imi\xe4 navigoimaan valikossa. Valikossa liikutaan yl\xf6s tai alas painamalla yl\xf6s- tai alas-nuolta vastaavasti, sama koskee alivalikkoja.</p>\n\n  <p>Alivalikkoja sis\xe4lt\xe4v\xe4t valikkokohdat on merkitty v\xe4k\xe4ssymbolilla. V\xe4k\xe4ssymbolin suuntaa vastaavan nuolin\xe4pp\xe4imen k\xe4ytt\xf6 laajentaa alivalikon, kun taas vastakkainen nuolin\xe4pp\xe4in sulkee alivalikon.</p>\n\n  <p>Mik\xe4 tahansa aktiivinen valikko suljetaan painamalla escape-n\xe4pp\xe4int\xe4. Kun valikko suljetaan, valinta palautuu aiempaan valintaan.</p>\n\n  <div role="heading" aria-level="2" class="ephox-polish-help-h2">Hyperlinkkien muokkaus tai poisto</div>\n\n  <p>Linkki\xe4 muokataan tai se poistetaan navigoimalla Lis\xe4\xe4-valikkoon ja valitsemalla Lis\xe4\xe4 linkki. Editori esitt\xe4\xe4 linkin muokkausvalintaikkunan. </p>\n\n  <p>Muokkaa linkki antamalla uusi url linkin p\xe4ivitys -sy\xf6tt\xf6ruutuun ja painamalla enter. Poista linkki asiakirjasta valitsemalla poista-painike. Dialogista poistutaan tekem\xe4tt\xe4 muutoksia painamalla esc.</p>\n\n  <div role="heading" aria-level="2" class="ephox-polish-help-h2">Fonttikokojen ja taulukon rajojen koon muuttaminen</div>\n\n  <p>Fontin kokoa muutetaan navigoimalla fonttivalikkoon ja valitsemalla fontin koko. Editori esitt\xe4\xe4 koon valintaikkunan valikossa ja asettaa fokuksen valintaikkunaan.</p>\n\n  <p>Rajanviivan kokoa muutetaan navigoimalla taulukon rajaviivan koon ty\xf6kalurivikohtaan ja valitsemalla taulukon rajaviivan koko. Editori esitt\xe4\xe4 koon valintaikkunan valikossa ja asettaa fokuksen valintaikkunaan. Huomautus: taulukon rajaviivan koon ty\xf6kalurivin kohta on k\xe4ytett\xe4viss\xe4 vain, kun kursori on taulukon sis\xe4ll\xe4.</p>\n\n  <p>Koon valintaikkunan sis\xe4ll\xe4 sarkainpainikkeen painaminen siirt\xe4\xe4 valinnan seuraavaan ohjaimeen. Vaihto + sarkain siirt\xe4\xe4 valinnan edelliseen ohjaimeen.</p>\n\n  <p>Kokoa muokataan antamalla uusi arvo koon sy\xf6tt\xf6kentt\xe4\xe4n. Esimerkiksi 14px tai 1em. Muutokset l\xe4hetet\xe4\xe4n painamalla enter. Huomaa, ett\xe4 enterin painaminen sulkee valintaikkunan ja siirt\xe4\xe4 fokuksen asiakirjaan.</p>\n\n  <p>Kokoa muutetaan poistumatta valintaikkunasta aktivoimalla lis\xe4\xe4 kokoa- tai v\xe4henn\xe4 kokoa -painikkeita. Koon muuttaminen lis\xe4\xe4- tai v\xe4henn\xe4-painikkeilla v\xe4litt\xf6m\xe4sti muuttaa valitun elementin kokoa ja samalla pit\xe4\xe4 nykyisen yksikk\xf6arvon. Koon valintaikkunasta poistutaan painamalla esc.</p>\n\n  <div role="heading" aria-level="2" class="ephox-polish-help-h2">Kuvan rajaus</div>\n\n  <p>Rajausominaisuuteen saadaan p\xe4\xe4sy valitsemalla kuva kuvatoimintojen esitt\xe4miseksi ty\xf6kalurivill\xe4. N\xe4m\xe4 toiminnot ovat saatavan my\xf6s kontekstivalikossa. Kun rajaus aktivoidaan, rajausmaski asetetaan kuvan p\xe4\xe4lle ja vasen yl\xe4kulma on valittuna.</p>\n\n  <p>Navigoi k\xe4ytt\xe4en sarkainta. Kukin 4 kulmasta voidaan valita, samoin kuin rajausmaskin kokonaisruutu. Kukin kulma voidaan sijoittaa yksil\xf6llisesti tai kaikkia kulmia voidaan siirt\xe4\xe4 samaan aikaan siirt\xe4m\xe4ll\xe4 rajausmaskin kokonaisruutua.</p>\n\n  <p>Valinnan siirt\xe4minen kuvan poikki tehd\xe4\xe4n nuolin\xe4pp\xe4imill\xe4. Kukin nuolin\xe4pp\xe4imen painallus siirt\xe4\xe4 10 pikseli\xe4, pienempi\xe4 askelia varten pid\xe4 vaihto-n\xe4pp\xe4int\xe4 painettuna ja paina nuolin\xe4pp\xe4int\xe4 yhden pikselin siirt\xe4miseksi.</p>\n\n  <p>Rajaus k\xe4ytet\xe4\xe4n kuvaan painamalla enter.</p>\n\n  <p>Rajaustoiminto peruutetaan vaikuttamatta kuvaan painamalla ESC-painiketta.</p>\n\n  <table aria-readonly="true" cellpadding="0" cellspacing="0" class="ephox-polish-tabular ephox-polish-help-table ephox-polish-help-table-shortcuts">\n      <caption>N\xe4pp\xe4imist\xf6navigointi</caption>\n      <thead>\n        <tr>\n          <th scope="col">Toiminto</th>\n          <th scope="col">Windows</th>\n          <th scope="col">Mac OS</th>\n        </tr>\n      </thead>\n      <tbody>\n      <tr>\n        <td>Aktivoi ty\xf6kalurivi</td>\n        <td>F10</td>\n        <td>ALT + F10</td>\n      </tr>\n      <tr>\n        <td>Valitse seuraava/edellinen ryhm\xe4painike</td>\n        <td>\u2190 tai \u2192</td>\n        <td>\u2190 tai \u2192</td>\n      </tr>\n      <tr>\n        <td>Siirry seuraavaan ryhm\xe4\xe4n</td>\n        <td>SARKAIN</td>\n        <td>SARKAIN</td>\n      </tr>\n      <tr>\n        <td>Siirry edelliseen ryhm\xe4\xe4n</td>\n        <td>VAIHTO + SARKAIN</td>\n        <td>VAIHTO + SARKAIN</td>\n      </tr>\n      <tr>\n        <td>Suorita komento</td>\n        <td>V\xc4LILY\xd6NTI tai ENTER</td>\n        <td>V\xc4LILY\xd6NTI tai ENTER</td>\n      </tr>\n      <tr>\n        <td>Avaa p\xe4\xe4valikko</td>\n        <td>V\xc4LILY\xd6NTI tai ENTER</td>\n        <td>V\xc4LILY\xd6NTI tai ENTER</td>\n      </tr>\n      <tr>\n        <td>Avaa/laajenna alivalikko</td>\n        <td>V\xc4LILY\xd6NTI tai ENTER tai \u2192</td>\n        <td>V\xc4LILY\xd6NTI tai ENTER tai \u2192</td>\n      </tr>\n      <tr>\n        <td>Valitse seuraava/edellinen valikkokohta</td>\n        <td>\u2193 tai \u2191</td>\n        <td>\u2193 tai \u2191</td>\n      </tr>\n      <tr>\n        <td>Sulje valikko</td>\n        <td>ESC</td>\n        <td>ESC</td>\n      </tr>\n      <tr>\n        <td>Sulje/supista alivalikko</td>\n        <td>ESC tai \u2190</td>\n        <td>ESC tai \u2190</td>\n      </tr>\n      <tr>\n        <td>Siirr\xe4 kuvanrajauksen valintaa</td>\n        <td>\u2190 tai \u2192 tai \u2193 tai \u2191</td>\n        <td>\u2190 tai \u2192 tai \u2193 tai \u2191</td>\n      </tr>\n      <tr>\n        <td>Siirr\xe4 kuvanrajauksen valintaa tarkasti</td>\n        <td>Pid\xe4 VAIHTO pohjassa liikuttamisen aikana</td>\n        <td>Pid\xe4 VAIHTO pohjassa liikuttamisen aikana</td>\n      </tr>\n      <tr>\n        <td>K\xe4yt\xe4 rajausta</td>\n        <td>ENTER</td>\n        <td>ENTER</td>\n      </tr>\n      <tr>\n        <td>Peruuta rajaus</td>\n        <td>ESC</td>\n        <td>ESC</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n'),a11ycheck:a('\ufeff<div role=presentation class="ephox-polish-help-article">\n  <div role="heading" aria-level="1" class="ephox-polish-help-h1">K\xe4ytett\xe4vyyden tarkistus</div>\n  <p>K\xe4ytett\xe4vyyden tarkistusty\xf6kalu (mik\xe4li k\xe4yt\xf6ss\xe4) voi tunnistaa seuraavat k\xe4ytett\xe4vyysongelmat HTML-asiakirjoissa.</p>\n  <table aria-readonly="true" cellpadding="0" cellspacing="0" class="ephox-polish-tabular ephox-polish-a11ycheck-table">\n      <caption>Ongelmam\xe4\xe4ritykset</caption>\n      <thead>\n        <tr>\n          <th scope="col">Ongelma</th>\n          <th scope="col">WCAG</th>\n          <th scope="col">Kuvaus</th>\n        </tr>\n      </thead>\n      <tbody>\n      <tr>\n        <td>Kuvilla on oltava vaihtoehtoinen tekstikuvaus</td>\n        <td>1.1.1</td>\n        <td>Kuvilla pit\xe4\xe4 olla vaihtoehtoinen tekstiarvosarja, joka kuvaa kuvan aiheen n\xe4k\xf6rajoitteisille k\xe4ytt\xe4jill\xe4. </td>\n      </tr>\n      <tr>\n        <td>Vaihtoehtoinen teksti ei saa olla sama kuin kuvan tiedostonimi</td>\n        <td>1.1.1</td>\n        <td>V\xe4lt\xe4 kuvan tiedostonimen k\xe4ytt\xf6\xe4 vaihtoehtoisen tekstin arvona. Valitse vaihtoehtoiselle tekstille arvo, joka kertoo kuvan aiheen.</td>\n      </tr>\n      <tr>\n        <td>Taulukoissa on oltava kuvatekstit</td>\n        <td>1.3.1</td>\n        <td>Taulukoilla pit\xe4\xe4 olla lyhyt kuvaava teksti, joka kertoo taulukon sis\xe4ll\xf6n.</td>\n      </tr>\n      <tr>\n        <td>Monimutkaisissa taulukoissa tulee olla yhteenvetoja</td>\n        <td>1.3.1</td>\n        <td>Monimutkaisen rakenteen omaavilla taulukoilla (solut ulottuvat useille riveille tai sarakkeisiin) pit\xe4\xe4 olla yhteenveto, joka kuvaa taulukon rakenteen. </td>\n      </tr>\n      <tr>\n        <td>Taulukon kuvatekstill\xe4 ja yhteenvedolla ei saa olla sama arvo</td>\n        <td>1.3.1</td>\n        <td>Taulukon kuvatekstin tulee kuvata taulukon sis\xe4lt\xf6, kun taas taulukon yhteenvedon tulee kuvata monimutkaisten taulukkojen rakenne. </td>\n      </tr>\n      <tr>\n        <td>Taulukoissa on oltava ainakin yksi yl\xe4tunnistesolu</td>\n        <td>1.3.1</td>\n        <td>Taulukkojen tulee sis\xe4lt\xe4\xe4 asianmukaiset rivi- tai sarakeyl\xe4tunnisteet, jotka kuvaavat rivin tai sarakkeen sis\xe4ll\xf6n.<br/><a href="http://webaim.org/techniques/tables/data#th" target="_blank">Lis\xe4tietoja t\xe4st\xe4 aiheesta (webaim.org).</a> </td>\n      </tr>\n      <tr>\n        <td>Taulukon yl\xe4tunnisteita pit\xe4\xe4 k\xe4ytt\xe4\xe4 riviin tai sarakkeeseen</td>\n        <td>1.3.1</td>\n        <td>Taulukon yl\xe4tunnisteet tulee yhdist\xe4\xe4 riviin tai sarakkeeseen, joita ne kuvaavat.<br/><a href="http://webaim.org/techniques/tables/data#th" target="_blank">Lis\xe4tietoja t\xe4st\xe4 aiheesta (webaim.org).</a> </td>\n      </tr>\n      <tr>\n        <td>T\xe4m\xe4 kappale n\xe4ytt\xe4\xe4 otsikolta. Jos se on otsikko, valitse otsikkotaso.</td>\n        <td>1.3.1</td>\n        <td>K\xe4yt\xe4 otsikkoja erottamaan asiakirjat osioihin. V\xe4lt\xe4 muotoiltujen kappaleiden k\xe4ytt\xf6\xe4 otsikkojen sijasta.<br/><a href="http://webaim.org/techniques/semanticstructure/#correctly" target="_blank">Lis\xe4tietoja t\xe4st\xe4 aiheesta (webaim.org).</a> </td>\n      </tr>\n      <tr>\n        <td>Otsakkeita on lis\xe4tt\xe4v\xe4 jaksottaisessa j\xe4rjestyksess\xe4. Esimerkki: otsikko1:t\xe4 pit\xe4\xe4 seurata otsikko 2, ei otsikko 3.</td>\n        <td>1.3.1</td>\n        <td>Seuraavien asiakirjaotsikkojen tulee esiinty\xe4 hierarkian mukaisesti, joko nousevassa tai vastaavassa j\xe4rjestyksess\xe4.<br/><a href="http://webaim.org/techniques/semanticstructure/#contentstructure" target="_blank">Lis\xe4tietoja t\xe4st\xe4 aiheesta (webaim.org).</a> </td>\n      </tr>\n      <tr>\n        <td>K\xe4yt\xe4 listamerkint\xf6j\xe4 listoja varten</td>\n        <td>1.3.1</td>\n        <td>Varmista, ett\xe4 listan kohdat k\xe4ytt\xe4v\xe4t HTML-listarakennetta esitt\xe4m\xe4\xe4n listoja (<code>&lt;ul&gt;</code> tai <code>&lt;ol&gt;</code> ja <code>&lt;li&gt;</code>).</td>\n      </tr>\n      <tr>\n        <td>Tekstin kontrastisuhteen on oltava 4,5:1</td>\n        <td>1.4.3</td>\n        <td>Tekstill\xe4 ja sen taustalla on oltava sellainen kontrastisuhde, ett\xe4 se on helposti luettava henkil\xf6ille, joiden n\xe4k\xf6kyky on suhteellisen alhainen.</td>\n      </tr>\n      <tr>\n        <td>Viereiset linkit tulee sulauttaa yhteen.</td>\n        <td>2.4.4</td>\n        <td>Viereiset samaa resurssiin osoittavat hyperlinkin tulee sulauttaa yhdeksi hyperlinkiksi.</td>\n      </tr>\n    </tbody>\n  </table>\n  <div role="heading" aria-level="2" class="ephox-polish-help-h2">Lis\xe4tietoja</div>\n  <p>\n    <a href="http://webaim.org/intro/" target="_blank">Johdanto verkon k\xe4ytett\xe4vyyteen (webaim.org)</a> <br/>\n    <a href="http://www.w3.org/WAI/intro/wcag" target="_blank">Johdanto WCAG 2.0:aan (w3.org)</a> <br/>\n    <a href="http://www.section508.gov/" target="_blank">Yhdysvaltojen kuntoutusasetuksen kappale 508 (section508.gov)</a>\n  </p>\n</div>'),markdown:a('\ufeff<div role=presentation class="ephox-polish-help-article">\n  <div class="ephox-polish-help-h1" role="heading" aria-level="1">Markdown-muotoilu</div>\n  <p>Markdown on syntaksi, jota k\xe4ytet\xe4\xe4n luomaan HTML-rakenteita ja -muotoiluja ilman n\xe4pp\xe4imist\xf6pikavalintoja tai k\xe4ytt\xf6valikkoja. Markdown-muotoilua k\xe4ytet\xe4\xe4n antamalla haluttu syntaksi ja painamalla sen j\xe4lkeen enter- tai v\xe4lily\xf6ntin\xe4pp\xe4int\xe4.</p>\n  <table cellpadding="0" cellspacing="0" class="ephox-polish-tabular ephox-polish-help-table ephox-polish-help-table-markdown" aria-readonly="true">\n      <caption>N\xe4pp\xe4imist\xf6muotoilun syntaksi</caption>\n      <thead>\n        <tr>\n          <th scope="col">Syntaksi</th>\n          <th scope="col">HTML-tulos</th>\n        </tr>\n      </thead>\n      <tbody>\n      <tr>\n        <td><pre># Suurin otsikko</pre></td>\n        <td><pre>&lt;h1&gt; Suurin otsikko&lt;/h1&gt;</pre></td>\n      </tr>\n      <tr>\n        <td><pre>## Suurempi otsikko</pre></td>\n        <td><pre>&lt;h2&gt;Suurempi otsikko&lt;/h2&gt;</pre></td>\n      </tr>\n      <tr>\n        <td><pre>### Suuri otsikko</pre></td>\n        <td><pre>&lt;h3&gt;Suuri otsikko&lt;/h3&gt;</pre></td>\n      </tr>\n      <tr>\n        <td><pre>####  Otsikko</pre></td>\n        <td><pre>&lt;h4&gt;Otsikko&lt;/h4&gt;</pre></td>\n      </tr>\n      <tr>\n        <td><pre>##### Pieni otsikko</pre></td>\n        <td><pre>&lt;h5&gt;Pieni otsikko&lt;/h5&gt;</pre></td>\n      </tr>\n      <tr>\n        <td><pre>###### Pienin otsikko</pre></td>\n        <td><pre>&lt;h6&gt;Pienin otsikko&lt;/h6&gt;</pre></td>\n      </tr>\n      <tr>\n        <td><pre>* J\xe4rjest\xe4m\xe4t\xf6n luettelo</pre></td>\n        <td><pre>&lt;ul&gt;&lt;li&gt;J\xe4rjest\xe4m\xe4t\xf6n luettelo&lt;/li&gt;&lt;/ul&gt;</pre></td>\n      </tr>\n      <tr>\n        <td><pre>1. J\xe4rjestetty luettelo</pre></td>\n        <td><pre>&lt;ol&gt;&lt;li&gt;J\xe4rjestetty luettelo&lt;/li&gt;&lt;/ol&gt;</pre></td>\n      </tr>\n      <tr>\n        <td><pre>*Kursivoitu*</pre></td>\n        <td><pre>&lt;em&gt;Kursivoitu&lt;/em&gt;</pre></td>\n      </tr>\n      <tr>\n        <td><pre>**Lihavoitu**</pre></td>\n        <td><pre>&lt;strong&gt;Lihavoitu&lt;/strong&gt;</pre></td>\n      </tr>\n      <tr>\n        <td><pre>---</pre></td>\n        <td><pre>&lt;hr/&gt;</pre></td>\n      </tr>\n    </tbody>\n  </table>\n</div>'),shortcuts:a('\ufeff<div role=presentation class="ephox-polish-help-article">\n  <div role="heading" aria-level="1" class="ephox-polish-help-h1">N\xe4pp\xe4imist\xf6oikopolut</div>\n  <table aria-readonly="true" cellpadding="0" cellspacing="0" class="ephox-polish-tabular ephox-polish-help-table ephox-polish-help-table-shortcuts">\n    <caption>Editorin komennot</caption>\n    <thead>\n      <tr>\n        <th scope="col">Toiminto</th>\n        <th scope="col">Windows</th>\n        <th scope="col">Mac OS</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>Kumoa</td>\n        <td>CTRL + Z</td>\n        <td>\u2318Z</td>\n      </tr>\n      <tr>\n        <td>Tee uudelleen</td>\n        <td>CTRL + Y</td>\n        <td>\u2318\u21e7Z</td>\n      </tr>\n      <tr>\n        <td>Lihavoitu</td>\n        <td>CTRL + B</td>\n        <td>\u2318B</td>\n      </tr>\n      <tr>\n        <td>Kursivoitu</td>\n        <td>CTRL + I</td>\n        <td>\u2318I</td>\n      </tr>\n      <tr>\n        <td>Alleviivaus</td>\n        <td>CTRL + U</td>\n        <td>\u2318U</td>\n      </tr>\n      <tr>\n        <td>Sisenn\xe4</td>\n        <td>CTRL + ]</td>\n        <td>\u2318]</td>\n      </tr>\n      <tr>\n        <td>Pienenn\xe4 sisennyst\xe4</td>\n        <td>CTRL + [</td>\n        <td>\u2318[</td>\n      </tr>\n      <tr>\n        <td>Lis\xe4\xe4 linkki</td>\n        <td>CTRL + K</td>\n        <td>\u2318K</td>\n      </tr>\n      <tr>\n        <td>Etsi</td>\n        <td>CTRL + F</td>\n        <td>\u2318F</td>\n      </tr>\n      <tr>\n        <td>Kokon\xe4ytt\xf6tila (p\xe4\xe4lle/pois)</td>\n        <td>CTRL + VAIHTO + F</td>\n        <td>\u2318\u21e7F</td>\n      </tr>\n      <tr>\n        <td>Ohje-valintaikkuna (avaa)</td>\n        <td>CTRL + VAIHTO + H</td>\n        <td>\u2303\u2325H</td>\n      </tr>\n      <tr>\n        <td>Kontekstivalikko (avaa)</td>\n        <td>VAIHTO + F10</td>\n        <td>\u21e7F10\u200e\u200f</td>\n      </tr>\n      <tr>\n        <td>Koodin automaattinen t\xe4ydennys</td>\n        <td>CTRL + V\xc4LILY\xd6NTI</td>\n        <td>\u2303V\xc4LILY\xd6NTI</td>\n      </tr>\n      <tr>\n        <td>K\xe4ytett\xe4viss\xe4 oleva koodin\xe4kym\xe4</td>\n        <td>CTRL + VAIHTO + U</td>\n        <td>\u2318\u2325U</td>\n      </tr>\n    </tbody>\n  </table>\n  <div class="ephox-polish-help-note" role="note">*Huomautus: jotkin toiminnot voivat olla estettyin\xe4 p\xe4\xe4k\xe4ytt\xe4j\xe4n toimesta.</div>\n</div>\n')})}();