/** @license
 * Copyright (c) 2013-2017 Ephox Corp. All rights reserved.
 * This software is provided "AS IS," without a warranty of any kind.
 */
!function(){var a=function(){return{a11y:{widget:{title:"Kontrolprogram til hj\xe6lp til handicappede",running:"Kontrollerer...",issue:{counter:"Problem {0} af {1}",help:"WCAG 2,0 reference \u2013 \xe5bner i et nyt vindue",none:"Ingen problemer vedr\xf8rende hj\xe6lp til handicappede registreret"},previous:"Forrige problem",next:"N\xe6ste problem",repair:"Udbedr problem",available:"Udbedring tilg\xe6ngelig",ignore:"Ignorer"},image:{alttext:{empty:"Billeder skal have en alternativ tekstbeskrivelse",filenameduplicate:"Den alternative tekst m\xe5 ikke v\xe6re den samme som billedets filnavn",set:"Angiv alternativ tekst:",validation:{empty:"Alternativ tekst m\xe5 ikke v\xe6re tom",filenameduplicate:"Alternativ tekst m\xe5 ikke v\xe6re den samme som filnavnet"}}},table:{caption:{empty:"Tabeller skal have billedtekster",summaryduplicate:"En tabels billedtekst og resum\xe9 m\xe5 ikke have samme v\xe6rdi",set:"Angiv billedtekst:",validation:{empty:"Billedtekst m\xe5 ikke v\xe6re tom",summaryduplicate:"Billedtekst til tabel m\xe5 ikke v\xe6re den samme som tabellens resum\xe9"}},summary:{empty:"Komplekse tabeller skal have resum\xe9er",set:"Angiv et resum\xe9 for tabellen:",validation:{empty:"Resum\xe9 m\xe5 ikke v\xe6re tomt",captionduplicate:"Resum\xe9 til tabel m\xe5 ikke v\xe6re identisk med tabellens billedtekst"}},rowscells:{none:"Tabelelementer skal indeholde TR- og TD-tags"},headers:{none:"Tabeller skal have mindst \xe9n overskriftscelle",set:"V\xe6lg tabeloverskrift:",validation:{none:"V\xe6lg enten r\xe6kke- eller kolonneoverskrift"}},headerscope:{none:"Tabeloverskrifter skal anvendes p\xe5 en r\xe6kke eller en kolonne",set:"V\xe6lg overskriftsomr\xe5de:",scope:{row:"R\xe6kke",col:"Kolonne",rowgroup:"R\xe6kkegruppe",colgroup:"Kolonnegruppe"}}},heading:{nonsequential:"Overskrifter skal anvendes i sekventiel r\xe6kkef\xf8lge. For eksempel: Overskrift 1 skal f\xf8lges af Overskrift 2, ikke Overskrift 3.",paragraphmisuse:"Dette afsnit ligner en overskrift. Hvis det er en overskrift, skal du v\xe6lge et overskriftsniveau.",set:"V\xe6lg et overskriftsniveau:"},link:{adjacent:"Links ved siden af hinanden med samme URL skal sl\xe5s sammen til \xe9t link"},list:{paragraphmisuse:"Den valgte tekst ser ud til at v\xe6re en liste. Lister skal formateres med et liste-tag."},contrast:{smalltext:"Tekst skal have et kontrastforhold p\xe5 mindst 4,5:1",largetext:"Stor tekst skal have et kontrastforhold p\xe5 mindst 3:1"},severity:{error:"Fejl",warning:"Advarsel",info:"Vigtigt"}},aria:{autocorrect:{announce:"Autokorrektur {0}"},label:{toolbar:"V\xe6rkt\xf8jslinje til redigeringsprogram til rig tekst",editor:"Textbox.io redigeringsprogram til rig tekst \u2013 {0}",fullscreen:"Textbox.io redigeringsprogram til rig tekst i fuld sk\xe6rm \u2013 {0}",content:"Redigerbart indhold",more:"Klik for at \xe5bne eller lukke"},help:{mac:"Tryk p\xe5 \u2303\u2325H for at f\xe5 hj\xe6lp",ctrl:"Tryk p\xe5 CTRL SHIFT H for at f\xe5 hj\xe6lp"},color:{picker:"Farvev\xe6lger",menu:"Farvev\xe6lgermenu"},font:{color:"Tekstfarver",highlight:"Fremh\xe6vningsfarver",palette:"Farvepalet"},context:{menu:{generic:"Genvejsmenu"}},stepper:{input:{invalid:"St\xf8rrelsesv\xe6rdien er ugyldig"}},table:{headerdescription:"Tryk p\xe5 mellemrumstasten for at aktivere indstillingen. Tryk p\xe5 tab-tasten for at vende tilbage til tabelv\xe6lgeren.",cell:{border:{size:"Kantst\xf8rrelse"}}},input:{invalid:"Ugyldigt input"},widget:{navigation:"Brug piletasterne til at navigere."},image:{crop:{size:"Tilpasset st\xf8rrelse er {0} pixels gange {1} pixels"}}},color:{white:"Hvid",black:"Sort",gray:"Gr\xe5",metal:"Metalfarvet",smoke:"R\xf8gfarvet",red:"R\xf8d",darkred:"M\xf8rker\xf8d",darkorange:"M\xf8rkeorange",orange:"Orange",yellow:"Gul",green:"Gr\xf8n",darkgreen:"M\xf8rkegr\xf8n",mediumseagreen:"Medium havgr\xf8n",lightgreen:"Lysegr\xf8n",lime:"Limegr\xf8n",mediumblue:"Medium bl\xe5",navy:"Navybl\xe5",blue:"Bl\xe5",lightblue:"Lysebl\xe5",violet:"Lilla"},directionality:{rtldir:"Retning fra h\xf8jre mod venstre",ltrdir:"Retning fra venstre mod h\xf8jre"},parlance:{menu:"Sprogmenu",set:"Indstil sprog",ar:"Arabisk",ca:"Catalansk",zh_cn:"Kinesisk (forenklet)",zh_tw:"Kinesisk (traditionelt)",hr:"Kroatisk",cs:"Tjekkisk",da:"Dansk",nl:"Hollandsk",en:"Engelsk",en_au:"Engelsk (Australien)",en_ca:"Engelsk (Canada)",en_gb:"Engelsk (Storbritannien)",en_us:"Engelsk (USA)",fa:"Farsi",fi:"Finsk",fr:"Fransk",fr_ca:"Fransk (Canada)",de:"Tysk",el:"Gr\xe6sk",he:"Hebr\xe6isk",hu:"Ungarsk",it:"Italiensk",ja:"Japansk",kk:"Kasakhisk",ko:"Koreansk",no:"Norsk",pl:"Polsk",pt_br:"Portugisisk (Brasilien)",pt_pt:"Portugisisk (Portugal)",ro:"Rum\xe6nsk",ru:"Russisk",sk:"Slovakisk",sl:"Slovensk",es:"Spansk",es_419:"Spansk (Latinamerika)",es_es:"Spansk (Spanien)",sv:"Svensk",tt:"Tatar",th:"Thai",tr:"Tyrkisk",uk:"Ukrainsk"},taptoedit:"Tryk for at redigere",plaincode:{dialog:{title:"Kodevisning",editor:"Redigeringsprogram til HTML-kilde"}},help:{dialog:{accessibility:"Navigation med tastatur",a11ycheck:"Kontrollerer hj\xe6lp til handicappede",about:"Om Textbox.io",markdown:"Markdown-formatering",shortcuts:"Tastaturgenveje"}},spelling:{context:{more:"Mere",morelabel:"Undermenuen Flere stavemuligheder"},none:"Ingen",menu:"Stavekontrolsprog"},specialchar:{open:"Specialtegn",dialog:"Inds\xe6t specialtegn",latin:"Latin",insert:"Inds\xe6t",punctuation:"Tegns\xe6tning",currency:"Valutaer","extended-latin-a":"Udvidet Latin A","extended-latin-b":"Udvidet Latin B",arrows:"Pile",mathematical:"Matematiske tegn",miscellaneous:"Diverse",selects:"Valgte tegn",grid:"Specialtegn"},insert:{"menu-button":"Inds\xe6tningsmenu",menu:"Inds\xe6t",link:"Link",bookmark:"Bogm\xe6rke",image:"Billede",table:"Tabel",horizontalrule:"Vandret regel",media:"Medie"},media:{embed:"Medieindlejringskode",insert:"Inds\xe6t",placeholder:"Inds\xe6t indlejringskode her."},bookmark:{name:"Bogm\xe6rkenavn",insert:"Inds\xe6t",placeholder:"Indtast bogm\xe6rkenavn"},wordcount:{open:"Ordantal",dialog:"Ordantal",counts:"Antal",selection:"Valg",document:"Dokument",characters:"Tegn",charactersnospaces:"Tegn (uden mellemrum)",words:"Ord"},list:{unordered:{menu:"Valgmuligheder for uordnede lister",default:"Standard uordnet",circle:"Cirkel uordnet",square:"Kvadrat uordnet",disc:"Skive uordnet"},ordered:{menu:"Valgmuligheder for ordnede lister",default:"Standard ordnet",decimal:"Decimal ordnet","upper-alpha":"Stort alfanumerisk ordnet","lower-alpha":"Lille alfanumerisk ordnet","upper-roman":"Stort romertalordnet","lower-roman":"Lille romertalordnet","lower-greek":"Lille gr\xe6sk ordnet"}},tag:{inline:{class:"span ({0})"},img:"billede"},block:{normal:"Normal",p:"Afsnit",h1:"Overskrift 1",h2:"Overskrift 2",h3:"Overskrift 3",h4:"Overskrift 4",h5:"Overskrift 5",h6:"Overskrift 6",div:"Div",pre:"Pre",li:"Listepunkt",td:"Celle",th:"Overskriftscelle",styles:"Typografimenu",dropdown:"Blokke",describe:"Nuv\xe6rende typografi {0}",menu:"Typografier",label:{inline:"Inline-typografier",table:"Tabeltypografier",line:"Linjetypografier",media:"Medietypografier",list:"Listetypografier",link:"Linktypografier"}},font:{"menu-button":"Skrifttypemenu",menu:"Skrifttype",face:"Skrifttype",size:"Skriftst\xf8rrelse",coloroption:"Farve",describe:"Nuv\xe6rende skrifttype {0}",color:"Tekst",colorcustom:"Brugerdefineret...",highlight:"Fremh\xe6v",stepper:{input:"Indstil skriftst\xf8rrelse",increase:"\xd8g skriftst\xf8rrelse",decrease:"Reducer skriftst\xf8rrelse"}},colorcustom:{button:"Brugerdefineret",rgb:{red:{label:"R",description:"R\xf8d komponent"},green:{label:"G",description:"Gr\xf8n komponent"},blue:{label:"B",description:"Bl\xe5 komponent"},hex:{label:"#",description:"Hexfarvekode"},range:"Interval p\xe5 0 til 255"},sb:{saturation:"M\xe6tning",brightness:"Lysstyrke",picker:"M\xe6tnings- og lysstyrkev\xe6lger",palette:"M\xe6tnings- og lysstyrkepalet",instructions:"Brug piletasterne til at v\xe6lge m\xe6tning og lysstyrke p\xe5 x- og y-aksen"},hue:{hue:"Nuance",slider:"Nuanceskyder",palette:"Nuancepalet",instructions:"Brug piletasterne til at v\xe6lge en nuance"}},cog:{"menu-button":"Indstillingsmenu",menu:"Indstillinger",spellcheck:"Stavekontrol",capitalisation:"Store bogstaver",autocorrect:"Autokorrektur",linkpreviews:"Forh\xe5ndsvisning af links",help:"Hj\xe6lp"},alignment:{toolbar:"Justeringsmenu",menu:"Justering",left:"Juster til venstre",center:"Centrer",right:"Juster til h\xf8jre",justify:"Juster margen",describe:"Nuv\xe6rende justering {0}"},category:{language:"Sproggruppe",undo:"Fortryd og gendan gruppe",insert:"Inds\xe6t gruppe",style:"Typografigruppe",emphasis:"Formateringsgruppe",align:"Justeringsgruppe",listindent:"Liste- og indrykningsgruppe",format:"Skrifttypegruppe",tools:"V\xe6rkt\xf8jsgruppe",table:"Tabelgruppe",image:"Billedredigeringsgruppe"},action:{undo:"Fortryd",redo:"Gendan",bold:"Fed",italic:"Kursiv",underline:"Understreget",strikethrough:"Gennemstreget",subscript:"S\xe6nket skrift",superscript:"H\xe6vet skrift",removeformat:"Fjern formatering",bullist:"Uordnet liste",numlist:"Sorteret liste",indent:"Indryk mere",outdent:"Indryk mindre",blockquote:"Blockquote",fullscreen:"Fuld sk\xe6rm",search:"Find og erstat dialog",a11ycheck:"Kontroller hj\xe6lp til handicappede",toggle:{fullscreen:"Forlad fuld sk\xe6rm"}},table:{menu:"Inds\xe6t tabel","column-header":"Overskriftskolonne","row-header":"Overskriftsr\xe6kke",float:"Flydende justering",cell:{alignment:{top:"Juster top",middle:"Juster midte",bottom:"Juster bund",toolbar:"Vertikal cellejustering"},color:{border:"Kantfarve",background:"Baggrundsfarve"},border:{width:"Kantbredde",stepper:{input:"Indstil kantbredde",increase:"\xd8g kantbredde",decrease:"Reducer kantbredde"}}},context:{row:{title:"R\xe6kke-undermenu",menu:"R\xe6kke",insertabove:"Inds\xe6t ovenover",insertbelow:"Inds\xe6t nedenunder"},column:{title:"Kolonne-undermenu",menu:"Kolonne",insertleft:"Inds\xe6t til venstre",insertright:"Inds\xe6t til h\xf8jre"},cell:{merge:"Flet celler",unmerge:"Opdel celle","split-cols":"Opdel i kolonner","split-rows":"Opdel i r\xe6kker"},table:{title:"Tabel-undermenu",menu:"Tabel",properties:"Egenskaber",delete:"Slet"},common:{delete:"Slet",normal:"Indstil som normal",header:"Indstil som overskrift"},palette:{show:"Tabelredigeringsmuligheder tilg\xe6ngelige i v\xe6rkt\xf8jslinje",hide:"Tabelredigeringsmuligheder ikke l\xe6ngere tilg\xe6ngelige"}},picker:{header:"Overskriftsindstilling",label:"Tabelv\xe6lger",describepicker:"Brug piletasterne til at indstille tabelst\xf8rrelsen.  Tryk p\xe5 tab-tasten for at komme til tabeloverskriftsindstillingerne. Tryk p\xe5 mellemrum eller Enter-tasten for at inds\xe6tte en tabel.",rows:"{0} h\xf8j",cols:"{0} bred"},border:"Kant",summary:"Oversigt",dialog:"Egenskaber for tabel",caption:"Tabeltitel",width:"Bredde",height:"H\xf8jde"},align:{none:"Ingen justering",center:"Centrer",left:"Juster til venstre",right:"Juster til h\xf8jre"},button:{ok:"OK",cancel:"Annuller",close:"Annuller dialog"},banner:{close:"Luk banner"},border:{on:"Til",off:"Fra",labels:{on:"Kant til",off:"Kant fra"}},loading:{wait:"Vent venligst"},toolbar:{more:"Mere",backbutton:"Tilbage","switch-code":"Skift til kodevisning","switch-pencil":"Skift til designvisning"},link:{context:{edit:"Rediger link",follow:"\xc5bn link",ignore:"Ignorer defekt link",remove:"Fjern link"},dialog:{aria:{update:"Opdater link",insert:"Inds\xe6t link",properties:"Link-egenskaber",quick:"Hurtige valg"},autocomplete:{open:"Autoudf\xf8relsesliste for link tilg\xe6ngelig. Forts\xe6t indtastningen, eller brug op- og ned-tasterne til at v\xe6lge forslag.",close:"Autoudf\xf8relsesliste for link lukket",accept:"Valgt linkforslag {0}"},edit:"Rediger",remove:"Fjern",preview:"Eksempelvisning",update:"Opdater",insert:"Inds\xe6t",tooltip:"Link"},properties:{dialog:{title:"Link-egenskaber"},text:{label:"Tekst som skal vises",placeholder:"Indtast eller inds\xe6t teksten, som skal vises"},url:{label:"Link-URL eller bogm\xe6rke",placeholder:"Indtast link-URL eller bogm\xe6rke",invalid:"Din link-URL kan v\xe6re forkert"},title:{label:"Titel",placeholder:"Indtast eller inds\xe6t linktitel"},button:{remove:"Fjern"},target:{label:"Destination",none:"Ingen",blank:"Nyt vindue",top:"Hele siden",self:"Samme ramme",parent:"Overordnet ramme"}},anchor:{top:"Dokumentets top",bottom:"Dokumentets bund"}},fileupload:{title:"Inds\xe6t billeder",tablocal:"Lokale filer",tabweburl:"Web-URL",dropimages:"Tr\xe6k billeder hertil",chooseimage:"V\xe6lg billede, som skal uploades",web:{url:"URL til web-billede:"},weburlhelp:"Indtast din URL for at se et billedeksempel. Store billeder tager l\xe6ngere tid om at blive vist.",invalid1:"Vi kan ikke finde et billede p\xe5 den URL, du bruger.",invalid2:"Kontroller din URL for tastefejl.",invalid3:"S\xf8rg for, at det billede, du tilg\xe5r, er offentligt, og at det ikke er beskyttet med adgangskode eller er p\xe5 et privat netv\xe6rk."},image:{context:{properties:"Egenskaber for billede",palette:{show:"Billedredigeringsmuligheder tilg\xe6ngelige i v\xe6rkt\xf8jslinje",hide:"Billedredigeringsmuligheder ikke l\xe6ngere tilg\xe6ngelige"}},dialog:{title:"Egenskaber for billede",fields:{align:"Flydende justering",url:"URL",urllocal:"Billede ikke gemt endnu",alt:"Alternativ tekst",width:"Bredde",height:"H\xf8jde",constrain:{label:"Begr\xe6ns proportioner",on:"L\xe5ste proportioner",off:"Frie proportioner"}}},menu:"Inds\xe6t billede","menu-button":"Billedinds\xe6tningsmenu","from-url":"Web-URL","from-camera":"Kamerarulle",toolbar:{rotateleft:"Roter til venstre",rotateright:"Roter til h\xf8jre",fliphorizontal:"Spejlvend vandret",flipvertical:"Spejlvend lodret",properties:"Egenskaber for billede"},crop:{announce:"\xc5bner besk\xe6ringsgr\xe6nseflade. Tryk p\xe5 Enter for at anvende, Escape for at annullere.",cancel:"Annullerer besk\xe6ring",begin:"Besk\xe6r billede",apply:"Anvend besk\xe6ring",handle:{nw:"\xd8verste venstre h\xe5ndtag til besk\xe6ring",ne:"\xd8verste h\xf8jre h\xe5ndtag til besk\xe6ring",se:"Nederste h\xf8jre h\xe5ndtag til besk\xe6ring",sw:"Nederste venstre h\xe5ndtag til besk\xe6ring",shade:"Besk\xe6ringsmaske"}}},units:{"amount-of-total":"{0} af {1}"},search:{menu:"Find og erstat",field:{replace:"Erstatningsfelt",search:"S\xf8gefelt"},search:"S\xf8g",previous:"Forrige",next:"N\xe6ste",replace:"Erstat","replace-all":"Erstat alle",matchcase:"Forskel p\xe5 store og sm\xe5 bogstaver"},mentions:{initiated:"Bem\xe6rkning oprettet; forts\xe6t med at taste for at for at se mulig match",lookahead:{open:"Pr\xe6indtastningsboks",cancelled:"Bem\xe6rkning annulleret",searching:"S\xf8ger efter resultater",selected:"Indsat bem\xe6rkning om {0}",noresults:"Ingen resultater"}},cement:{dialog:{paste:{title:"Inds\xe6t formatering",instructions:"V\xe6lg at beholde eller fjerne formatering i det indsatte indhold.",merge:"Behold formatering",clean:"Fjern formatering"},flash:{title:"Import af lokalt billede","trigger-paste":"Udl\xf8s inds\xe6t fra tastaturet igen for at inds\xe6tte indhold med billeder.",missing:'Der kr\xe6ves Adobe Flash for at importere billeder fra Microsoft Office. Installer <a href="http://get.adobe.com/flashplayer/" target="_blank">Adobe Flash Player</a>.',"press-escape":'Tryk p\xe5 <span class="ephox-polish-help-kbd">ESC</span> for at ignorere lokale billeder og forts\xe6tte med at redigere.'}}},cloud:{error:{apikey:"Din API-n\xf8gle er ugyldig.",domain:"Dit dom\xe6ne ({0}) er ikke underst\xf8ttet af din API-n\xf8gle.",plan:"Du har overskredet antallet af redigeringsprogramdownloads, der er tilg\xe6ngelige p\xe5 dit abonnement. Bes\xf8g hjemmesiden for at opgradere."},dashboard:"G\xe5 til Administratorpanelet"},errors:{paste:{notready:"Funktionen til ordimport er ikke indl\xe6st. Vent og fors\xf8g igen.",generic:"Der opstod en fejl ved inds\xe6ttelse af indhold."},toolbar:{missing:{custom:{string:'En brugertilpasset kommando skal have egenskaben "{0}" og skal v\xe6re en streng'}},invalid:"Konfigurationen af v\xe6rkt\xf8jslinjen er ugyldig ({0}). Se konsol for detaljer."},spelling:{missing:{service:"Stavetjenesten blev ikke fundet: ({0})."}},images:{edit:{needsproxy:"Der kr\xe6ves en proxy for at redigere billeder fra dette dom\xe6ne: ({0})",proxyerror:"Kunne ikke kommunikere med proxy for at redigere dette billede. Se konsol for detaljer.",generic:"Der opstod en fejl under redigeringen af billedet. Se konsol for detaljer."},disallowed:{local:"Inds\xe6tning af lokale billeder er sl\xe5et fra. Lokale billeder er fjernet fra det indsatte indhold.",dragdrop:"Tr\xe6k og slip er sl\xe5et fra."},upload:{unknown:"Billedet blev ikke uploadet",invalid:"Ikke alle filer blev behandlet \u2013 nogle af dem var ikke gyldige billeder",failed:"Billedet blev ikke uploadet: ({0}).",cors:"Kunne ikke kontakte billeduploadtjenesten. Mulig CORS-fejl: ({0})"},missing:{service:"Billedtjenesten blev ikke fundet: ({0}).",flash:"Din browsers sikkerhedsindstillinger forhindrer muligvis import af billeder."},import:{failed:"Nogle billeder blev ikke importeret.",unsupported:"Ikke-underst\xf8ttet billedtype.",invalid:"Billedet er ugyldigt."}},webview:{image:"Direkte kopierede billeder kan inds\xe6ttes."},safari:{image:"Safari underst\xf8tter ikke direkte inds\xe6tning af billeder.",url:"Foresl\xe5ede l\xf8sninger",rtf:"L\xe6r hvordan","browser-settings":"For at inds\xe6tte billeder skal du justere dine browserindstillinger."},flash:{crashed:"Billederne er ikke er blevet importeret, da Adobe Flash tilsyneladende er g\xe5et ned. Dette kan skyldes inds\xe6tning af store dokumenter."},http:{400:"Forkert anmodning: {0}",401:"Uautoriseret: {0}",403:"Forbudt: {0}",404:"Ikke fundet: {0}",407:"Proxy-godkendelse p\xe5kr\xe6vet: {0}",409:"Filkonflikt: {0}",413:"Datam\xe6ngde for stor: {0}",415:"Ikke-underst\xf8ttet medietype: {0}",500:"Intern serverfejl: {0}",501:"Ikke implementeret: {0}"}}}},b=function(a,b){var c=a.src.indexOf("?");return a.src.indexOf(b)+b.length===c},c=function(a){for(var b=a.split("."),c=window,d=0;d<b.length&&void 0!==c&&null!==c;++d)c=c[b[d]];return c},d=function(a,b){if(a){var d=a.getAttribute("data-main");if(d){a.removeAttribute("data-main");var e=c(d);if("function"==typeof e)return e;console.warn("attribute on "+b+" does not reference a global method")}else console.warn("no data-main attribute found on "+b+" script tag")}};!function(a,c){var e=d(document.currentScript,c);if(e)return e;for(var f=document.getElementsByTagName("script"),g=0;g<f.length;g++)if(b(f[g],a)){var h=d(f[g],c);if(h)return h}throw"cannot locate "+c+" script tag"}("tbio_da.js","strings for language da")({version:"2.4.2",strings:a})}();