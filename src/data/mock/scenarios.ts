import type { Scenario } from '@/lib/types';

// ---------------------------------------------------------------------------
// Scenario Exercises — 5 practical scenarios with Dutch festival contexts
// ---------------------------------------------------------------------------

export const scenarios: Scenario[] = [
  // =========================================================================
  // 1. Crowd Surge bij Festival Ingang
  // =========================================================================
  {
    id: 'scenario-crowd-surge',
    courseId: 'course-crowd-control',
    title: 'Crowd Surge bij Festival Ingang',
    situationDescription:
      'Het is vrijdagavond 22:00 uur op Lowlands Festival. De headliner begint over 20 minuten op de Alpha Stage. Duizenden bezoekers stromen tegelijk naar de hoofdingang van het podiumgebied. Je staat bij de ingang en ziet dat de menigte steeds dichter wordt. Mensen beginnen te duwen en je hoort ongeruste stemmen. De druk op de hekken neemt snel toe.',
    eventContext: 'Lowlands Festival, hoofdingang Alpha Stage',
    responseOptions: [
      {
        id: 'scenario-cs-a',
        text: 'Je roept luid dat iedereen moet stoppen met duwen en probeert de menigte met je armen tegen te houden.',
        feedback:
          'Fysiek proberen een menigte tegen te houden is gevaarlijk en ineffectief. De druk van duizenden mensen is niet te stoppen door één persoon. Je brengt jezelf in gevaar en de menigte wordt onrustiger.',
        score: 15,
      },
      {
        id: 'scenario-cs-b',
        text: 'Je meldt direct via de portofoon "Code Oranje, Hoofdingang Alpha" aan de controlekamer, opent de nooduitgang als extra doorstroompunt, en geeft kalme aanwijzingen naar de alternatieve route.',
        feedback:
          'Uitstekend! Directe communicatie met de controlekamer, het creëren van extra doorstroming en kalme begeleiding zijn precies de juiste stappen. Je voorkomt verdere opbouw van druk terwijl de coördinatie centraal wordt opgepakt.',
        score: 95,
      },
      {
        id: 'scenario-cs-c',
        text: 'Je sluit de ingang volledig af en stuurt iedereen terug. De show moet maar wachten.',
        feedback:
          'De ingang volledig sluiten zonder alternatief te bieden kan paniek veroorzaken. De menigte heeft geen ruimte om terug te gaan en de druk kan juist toenemen. Altijd eerst een alternatieve route bieden voordat je een ingang sluit.',
        score: 35,
      },
      {
        id: 'scenario-cs-d',
        text: 'Je belt 112 en wacht op de politie om de situatie over te nemen.',
        feedback:
          'Hoewel 112 bellen bij een ernstige situatie juist is, is wachten op de politie te langzaam. De situatie vereist directe actie van de beveiliging ter plaatse. De controlekamer kan indien nodig de hulpdiensten inschakelen.',
        score: 30,
      },
    ],
    bestOptionId: 'scenario-cs-b',
    expertExplanation:
      'Bij een crowd surge is snel handelen cruciaal. De gouden regel is: communiceer, creëer ruimte, en begeleid. Door direct de controlekamer te informeren kan er gecoördineerd worden (extra personeel, omroepberichten). Het openen van een extra doorstroompunt verlaagt de druk fysiek. Kalme, duidelijke aanwijzingen voorkomen paniek. Nooit alleen proberen een menigte fysiek te stoppen.',
  },

  // =========================================================================
  // 2. Medisch Noodgeval op Festivalterrein
  // =========================================================================
  {
    id: 'scenario-medisch',
    courseId: 'course-ehbo',
    title: 'Medisch Noodgeval op Festivalterrein',
    situationDescription:
      'Het is een hete zomerdag op Mysteryland (33°C). Tijdens je patrouille op het festivalterrein zie je een jonge vrouw die plotseling in elkaar zakt bij de foodcourt. Omstanders roepen om hulp. De vrouw is bewusteloos, haar huid is rood en droog, en ze reageert niet op aanspreken. Er zijn veel omstanders die de situatie bemoeilijken.',
    eventContext: 'Mysteryland, foodcourt gebied',
    responseOptions: [
      {
        id: 'scenario-med-a',
        text: 'Je geeft de vrouw water te drinken en wacht tot ze bijkomt.',
        feedback:
          'Nooit een bewusteloze persoon laten drinken — verstikkingsgevaar! De symptomen wijzen op hitteberoerte, wat een levensbedreigende situatie is die directe professionele hulp vereist.',
        score: 10,
      },
      {
        id: 'scenario-med-b',
        text: 'Je vraagt omstanders ruimte te maken, controleert ademhaling, meldt "medisch noodgeval" via de portofoon met locatie, start koeling met natte doeken en wacht op de medische dienst.',
        feedback:
          'Perfect gehandeld! Je volgt het protocol: veilige omgeving creëren, beoordelen, melden en eerste hulp verlenen. Door omstanders ruimte te laten maken en direct de medische dienst in te schakelen, geef je het slachtoffer de beste kans.',
        score: 95,
      },
      {
        id: 'scenario-med-c',
        text: 'Je tilt de vrouw op en brengt haar naar de EHBO-post.',
        feedback:
          'Een bewusteloze persoon verplaatsen zonder de situatie eerst te beoordelen is riskant. Bij mogelijke hitteberoerte of andere medische problemen kan verplaatsing de situatie verergeren. Laat de medische dienst naar het slachtoffer komen.',
        score: 25,
      },
      {
        id: 'scenario-med-d',
        text: 'Je belt direct 112 en beschrijft de situatie, zonder verdere actie te ondernemen.',
        feedback:
          'Het bellen van 112 is op zich goed, maar het is effectiever om via de portofoon de eigen medische dienst in te schakelen — die zijn sneller ter plaatse. Bovendien moet je in de tussentijd eerste hulp verlenen (koelen, ademhaling monitoren).',
        score: 40,
      },
    ],
    bestOptionId: 'scenario-med-b',
    expertExplanation:
      'Bij een vermoedelijke hitteberoerte op een festival is het protocol: (1) Veilige omgeving — ruimte maken, (2) Beoordelen — bewustzijn en ademhaling controleren, (3) Melden — via portofoon de medische dienst inschakelen met exacte locatie, (4) Koelen — natte doeken, schaduw, ventilatie. De interne medische dienst is vrijwel altijd sneller dan 112 op een festivalterrein. Nooit een bewusteloze persoon laten drinken of onnodig verplaatsen.',
  },

  // =========================================================================
  // 3. Agressieve Bezoeker bij Toegangscontrole
  // =========================================================================
  {
    id: 'scenario-agressief',
    courseId: 'course-toegangscontrole',
    title: 'Agressieve Bezoeker bij Toegangscontrole',
    situationDescription:
      'Bij de hoofdingang van Zwarte Cross weigert een mannelijke bezoeker (begin 30, duidelijk onder invloed) zijn tas te openen voor controle. Als je collega de huisregels uitlegt, begint de man te schelden en maakt dreigende gebaren. Achter hem staan tientallen wachtende bezoekers die ongeduldig worden. De sfeer wordt grimmig.',
    eventContext: 'Zwarte Cross, hoofdingang',
    responseOptions: [
      {
        id: 'scenario-agr-a',
        text: 'Je pakt de man bij de arm en zet hem fysiek aan de kant zodat de rij door kan lopen.',
        feedback:
          'Fysiek ingrijpen als eerste actie is disproportioneel en kan de situatie laten escaleren. Het kan ook juridische consequenties hebben. Fysiek contact is alleen gerechtvaardigd als directe bedreiging of gevaar.',
        score: 15,
      },
      {
        id: 'scenario-agr-b',
        text: 'Je laat de man zonder controle door om de rij niet op te houden.',
        feedback:
          'Een persoon onder invloed zonder controle doorlaten is een veiligheidsrisico voor alle bezoekers. Je bent verantwoordelijk voor de veiligheid op het terrein. Nooit de controle overslaan, ook niet onder druk.',
        score: 10,
      },
      {
        id: 'scenario-agr-c',
        text: 'Je spreekt de man kalm aan met zijn naam (als mogelijk), erkent zijn frustratie, legt uit dat de controle voor ieders veiligheid is, en biedt een alternatief. Bij aanhoudende agressie schakel je een collega en leidinggevende in terwijl de rij via een andere lijn doorloopt.',
        feedback:
          'Uitstekende de-escalatie! Door empathie te tonen, de regels helder uit te leggen en tegelijkertijd de doorstroom van andere bezoekers te waarborgen, beheer je de situatie professioneel. Het inschakelen van collega\'s zorgt voor veiligheid voor iedereen.',
        score: 90,
      },
      {
        id: 'scenario-agr-d',
        text: 'Je roept direct de politie erbij en weigert verder met de man te communiceren tot zij er zijn.',
        feedback:
          'De politie inschakelen is soms nodig, maar als eerste reactie is het te escalerend. De beveiligingsdienst moet eerst zelf proberen de situatie op te lossen. Weigeren te communiceren kan de man verder frustreren.',
        score: 30,
      },
    ],
    bestOptionId: 'scenario-agr-c',
    expertExplanation:
      'Bij een agressieve bezoeker is de-escalatie de sleutel. Het model is: Erkennen (frustratie benoemen), Uitleggen (waarom de controle nodig is), Alternatieven bieden (kluisjes, apart controleren), Grenzen stellen (bij aanhoudende agressie wordt de toegang geweigerd). Cruciaal is ook dat de rest van de rij niet geblokkeerd wordt — open een tweede lijn. Fysiek geweld alleen bij directe bedreiging, en altijd met collega\'s.',
  },

  // =========================================================================
  // 4. Evacuatie bij Brand in Tent
  // =========================================================================
  {
    id: 'scenario-brand',
    courseId: 'course-noodprocedures',
    title: 'Evacuatie bij Brand in Tent',
    situationDescription:
      'Je bent gepositioneerd bij de nooduitgang van de grote festivaltent (capaciteit 5.000 personen) tijdens een populair optreden. Plotseling gaat het brandalarm af en je ziet rook vanuit de technische ruimte achter het podium komen. De muziek stopt en bezoekers beginnen onrustig te worden. Sommigen rennen al naar de uitgangen.',
    eventContext: 'Festival hoofdtent, nooduitgang oost',
    responseOptions: [
      {
        id: 'scenario-brand-a',
        text: 'Je opent je nooduitgang, geeft luide en duidelijke aanwijzingen ("Rustig doorlopen, volg de groene borden"), meldt via portofoon "Brand, Hoofdtent, Evacuatie gestart" en begeleidt de stroom naar het verzamelpunt.',
        feedback:
          'Textbook-evacuatie! Je combineert alle essentiële elementen: nooduitgang openen, duidelijke communicatie met het publiek, directe melding aan de controlekamer, en begeleiding naar het verzamelpunt. Dit is precies hoe het hoort.',
        score: 95,
      },
      {
        id: 'scenario-brand-b',
        text: 'Je rent naar de technische ruimte om te kijken hoe ernstig de brand is voordat je actie onderneemt.',
        feedback:
          'Bij een brandalarm in een tent met 5.000 mensen is er geen tijd om de brand te beoordelen. Evacuatie start onmiddellijk — liever een keer te veel evacueren dan te laat. Brandbestrijding is voor de brandweer.',
        score: 10,
      },
      {
        id: 'scenario-brand-c',
        text: 'Je houdt de nooduitgang dicht zodat mensen via de hoofdingangen kunnen evacueren en er geen chaos bij jouw uitgang ontstaat.',
        feedback:
          'Nooduitgangen moeten bij alarm altijd open zijn — dat is wettelijk verplicht. Het blokkeren van een nooduitgang kan dodelijke gevolgen hebben. Alle uitgangen moeten tegelijk gebruikt worden om de tent zo snel mogelijk leeg te krijgen.',
        score: 5,
      },
      {
        id: 'scenario-brand-d',
        text: 'Je schreeuwt "BRAND!" zo hard mogelijk en rent zelf naar buiten om daar bezoekers op te vangen.',
        feedback:
          'Schreeuwen "BRAND!" veroorzaakt paniek, wat tot verdrukking kan leiden — juist het tegenovergestelde van wat je wilt. Je positie bij de nooduitgang is cruciaal; verlaat die niet. Geef kalme, duidelijke instructies.',
        score: 15,
      },
    ],
    bestOptionId: 'scenario-brand-a',
    expertExplanation:
      'Bij een evacuatie van een grote tent is het protocol: (1) Nooduitgang openen en open houden, (2) Kalme, luide aanwijzingen geven — nooit het woord "brand" roepen maar verwijzen naar de nooduitgang en het verzamelpunt, (3) Direct melden aan de controlekamer, (4) De mensenstroom begeleiden en eventueel trage of gewonde bezoekers assisteren. De beveiliger bij de nooduitgang is een cruciale positie — verlaat deze nooit. De controlekamer coördineert de brandweer en overige hulpdiensten.',
  },

  // =========================================================================
  // 5. Vermist Kind op Koningsdag
  // =========================================================================
  {
    id: 'scenario-vermist-kind',
    courseId: 'course-kinderen',
    title: 'Vermist Kind op Koningsdag',
    situationDescription:
      'Het is Koningsdag in Amsterdam en de binnenstad is overvol. Een paniekerige moeder komt naar je toe en vertelt dat ze haar 6-jarige dochter is kwijtgeraakt bij de vrijmarkt op het Vondelpark. Het meisje heet Emma, draagt een oranje jurk en heeft bruine krullen. De moeder is zichtbaar overstuur en huilt.',
    eventContext: 'Koningsdag Amsterdam, Vondelpark',
    responseOptions: [
      {
        id: 'scenario-vk-a',
        text: 'Je zegt tegen de moeder dat ze zelf moet zoeken en dat kinderen altijd terugkomen.',
        feedback:
          'Een vermist kind is altijd een serieuze situatie. De moeder wegsturen is nalatig en onprofessioneel. Elk vermist kind moet direct gemeld en actief gezocht worden.',
        score: 5,
      },
      {
        id: 'scenario-vk-b',
        text: 'Je stelt de moeder gerust, noteert het signalement (naam, leeftijd, kleding, uiterlijk), meldt "Vermist Kind" via de portofoon met signalement en laatste locatie, en blijft bij de moeder als contactpunt terwijl collega\'s zoeken.',
        feedback:
          'Perfect protocol! Je stelt de moeder gerust, verzamelt essentiële informatie, schakelt het netwerk in via de portofoon en blijft zelf als vast aanspreekpunt. Zo wordt het kind zo snel mogelijk gevonden terwijl de moeder niet alleen is.',
        score: 95,
      },
      {
        id: 'scenario-vk-c',
        text: 'Je gaat direct zelf zoeken in het Vondelpark en laat de moeder bij je positie wachten.',
        feedback:
          'Zelf gaan zoeken klinkt logisch maar is niet effectief. Je verlaat je positie en de moeder blijft alleen achter. Via de portofoon kun je een veel groter zoekgebied activeren. Bovendien kan het kind terug naar de oorspronkelijke locatie komen.',
        score: 35,
      },
      {
        id: 'scenario-vk-d',
        text: 'Je belt direct 112 en draagt de zaak over aan de politie.',
        feedback:
          'Bij een vermist kind op een evenement schakel je eerst het eigen beveiligingsnetwerk in — dat is sneller dan de politie. Als het kind na 15 minuten niet gevonden is of als er vermoedens zijn van ontvoering, wordt de politie ingeschakeld. De eerste minuten zijn cruciaal voor eigen zoekactie.',
        score: 40,
      },
    ],
    bestOptionId: 'scenario-vk-b',
    expertExplanation:
      'Het vermist-kind-protocol op evenementen is: (1) Ouder geruststellen en bij je houden, (2) Signalement noteren: naam, leeftijd, lengte, kleding, haarkleur, bijzonderheden, (3) Direct melden via portofoon: "Vermist Kind" met volledig signalement en laatst bekende locatie, (4) Alle in- en uitgangen worden extra alert, (5) Omroepbericht laten doen als beschikbaar, (6) Na 15 minuten zonder resultaat politie inschakelen. De beveiliger bij de ouder is het vaste contactpunt en verlaat die positie niet.',
  },
];
