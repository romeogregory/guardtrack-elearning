import type { QuizQuestion } from '@/lib/types';

// ---------------------------------------------------------------------------
// Quiz Questions — 17 questions across 5 courses, all in Dutch
// ---------------------------------------------------------------------------

// ===== Crowd Control (4 questions) =========================================

const crowdControlQuestions: QuizQuestion[] = [
  {
    id: 'quiz-cc-1',
    courseId: 'course-crowd-control',
    question:
      'Tijdens een festival merk je dat de menigte bij de hoofdingang steeds dichter wordt en mensen beginnen te duwen. Wat is je eerste actie?',
    type: 'multiple-choice',
    situationDescription:
      'Het is 22:00 uur op de eerste avond van Lowlands Festival. De headliner begint over 30 minuten en duizenden bezoekers stromen naar de Alpha Stage. Bij de hoofdingang ontstaat gedrang.',
    options: [
      {
        id: 'quiz-cc-1-a',
        text: 'Onmiddellijk de ingang sluiten en niemand meer doorlaten',
      },
      {
        id: 'quiz-cc-1-b',
        text: 'Via de portofoon melden en een extra doorstroomroute openen terwijl je de menigte kalmeert',
      },
      {
        id: 'quiz-cc-1-c',
        text: 'Zelf proberen de menigte terug te duwen',
      },
      {
        id: 'quiz-cc-1-d',
        text: 'Wachten tot het vanzelf opgelost wordt, dit is normaal bij festivals',
      },
    ],
    correctOptionId: 'quiz-cc-1-b',
    explanation:
      'Bij toenemende drukte is directe communicatie met de controlekamer essentieel. Door een extra route te openen verminder je de druk, terwijl je door kalm te blijven paniek voorkomt. Nooit zelf fysiek duwen — dit kan de situatie verergeren.',
  },
  {
    id: 'quiz-cc-2',
    courseId: 'course-crowd-control',
    question:
      'Bij welke bezoekersdichtheid moet een festivalingang tijdelijk gesloten worden?',
    type: 'multiple-choice',
    options: [
      {
        id: 'quiz-cc-2-a',
        text: 'Bij meer dan 2 personen per vierkante meter',
      },
      {
        id: 'quiz-cc-2-b',
        text: 'Bij meer dan 4 personen per vierkante meter',
      },
      {
        id: 'quiz-cc-2-c',
        text: 'Bij meer dan 6 personen per vierkante meter',
      },
      {
        id: 'quiz-cc-2-d',
        text: 'Alleen als er daadwerkelijk gewonden vallen',
      },
    ],
    correctOptionId: 'quiz-cc-2-b',
    explanation:
      'Volgens de richtlijnen voor evenementenbeveiliging is 4 personen per m² de kritieke grens. Boven deze dichtheid verliezen mensen de controle over hun eigen beweging en ontstaat er risico op verdrukking. Preventief handelen is essentieel.',
  },
  {
    id: 'quiz-cc-3',
    courseId: 'course-crowd-control',
    question:
      'De maximale doorstroomcapaciteit van een 3 meter breed toegangspunt is circa 3.600 personen per uur.',
    type: 'true-false',
    options: [
      { id: 'quiz-cc-3-a', text: 'Waar' },
      { id: 'quiz-cc-3-b', text: 'Niet waar' },
    ],
    correctOptionId: 'quiz-cc-3-a',
    explanation:
      'De vuistregel is ongeveer 40 personen per meter breedte per minuut bij vlotte doorstroming. Een 3 meter breed punt levert dus circa 120 personen per minuut, oftewel 3.600 per uur. Bij fouillering of ticketcontrole ligt dit significant lager.',
  },
  {
    id: 'quiz-cc-4',
    courseId: 'course-crowd-control',
    question:
      'Welk communicatieprotocol gebruik je bij een crowd emergency op een festival?',
    type: 'multiple-choice',
    options: [
      {
        id: 'quiz-cc-4-a',
        text: 'Direct 112 bellen en de situatie uitleggen',
      },
      {
        id: 'quiz-cc-4-b',
        text: 'Code Rood melden via de portofoon aan de controlekamer met locatie en situatiebeschrijving',
      },
      {
        id: 'quiz-cc-4-c',
        text: 'Via je persoonlijke telefoon de eventmanager bellen',
      },
      {
        id: 'quiz-cc-4-d',
        text: 'Eerst collega\'s in de buurt mondeling informeren',
      },
    ],
    correctOptionId: 'quiz-cc-4-b',
    explanation:
      'Bij een crowd emergency gebruik je altijd de portofoon met het afgesproken codewoord (Code Rood). De controlekamer coördineert vervolgens de respons en alarmeert indien nodig de hulpdiensten. Directe melding via de commandostructuur is sneller en effectiever dan 112.',
  },
];

// ===== EHBO (4 questions) ==================================================

const ehboQuestions: QuizQuestion[] = [
  {
    id: 'quiz-ehbo-1',
    courseId: 'course-ehbo',
    question:
      'Je vindt een bewusteloze persoon op het festivalterrein. Wat zijn de juiste eerste stappen in volgorde?',
    type: 'multiple-choice',
    options: [
      {
        id: 'quiz-ehbo-1-a',
        text: 'Stabiele zijligging — 112 bellen — AED halen',
      },
      {
        id: 'quiz-ehbo-1-b',
        text: 'Aanspreken en schudden — ademhaling controleren — 112 bellen',
      },
      {
        id: 'quiz-ehbo-1-c',
        text: '112 bellen — water geven — wachten op ambulance',
      },
      {
        id: 'quiz-ehbo-1-d',
        text: 'AED halen — reanimatie starten — 112 bellen',
      },
    ],
    correctOptionId: 'quiz-ehbo-1-b',
    explanation:
      'Volg altijd het EHBO-protocol: eerst aanspreken en schudden om bewustzijn te controleren, dan de ademhaling beoordelen. Pas daarna bel je 112 of laat je iemand bellen. De beoordeling bepaalt of je reanimatie, stabiele zijligging of andere actie moet ondernemen.',
  },
  {
    id: 'quiz-ehbo-2',
    courseId: 'course-ehbo',
    question:
      'Een AED mag alleen door gecertificeerde hulpverleners worden gebruikt.',
    type: 'true-false',
    options: [
      { id: 'quiz-ehbo-2-a', text: 'Waar' },
      { id: 'quiz-ehbo-2-b', text: 'Niet waar' },
    ],
    correctOptionId: 'quiz-ehbo-2-b',
    explanation:
      'Een AED is ontworpen voor gebruik door iedereen, ook zonder certificering. Het apparaat geeft gesproken instructies en analyseert zelf of een schok nodig is. In Nederland mag iedereen een AED gebruiken bij een hartstilstand — elke minuut telt.',
  },
  {
    id: 'quiz-ehbo-3',
    courseId: 'course-ehbo',
    question:
      'Op een warme festivaldag (35°C) treft je een bezoeker aan die verward is, niet meer zweet, en een rode, hete huid heeft. Wat is de meest waarschijnlijke diagnose en juiste actie?',
    type: 'multiple-choice',
    situationDescription:
      'Het is 15:00 uur op het Mysteryland-terrein. De temperatuur is opgelopen tot 35°C. Een bezoeker zit op de grond, is verward en zijn huid is rood en droog.',
    options: [
      {
        id: 'quiz-ehbo-3-a',
        text: 'Uitdroging — water laten drinken en in de schaduw zetten',
      },
      {
        id: 'quiz-ehbo-3-b',
        text: 'Hitteberoerte — direct koelen, 112 bellen, niet laten drinken bij verwardheid',
      },
      {
        id: 'quiz-ehbo-3-c',
        text: 'Zonnesteek — zonnebrand behandelen en laten rusten',
      },
      {
        id: 'quiz-ehbo-3-d',
        text: 'Alcohol-intoxicatie — naar de EHBO-post brengen',
      },
    ],
    correctOptionId: 'quiz-ehbo-3-b',
    explanation:
      'De symptomen (verwardheid, droge rode huid, stoppen met zweten) wijzen op hitteberoerte — een levensbedreigende situatie. Direct koelen (natte doeken, schaduw), 112 bellen, en NIET laten drinken vanwege het verminderde bewustzijn. Dit is urgenter dan gewone uitdroging.',
  },
  {
    id: 'quiz-ehbo-4',
    courseId: 'course-ehbo',
    question:
      'In welke situatie moet je als beveiligingsmedewerker direct 112 bellen?',
    type: 'multiple-choice',
    options: [
      {
        id: 'quiz-ehbo-4-a',
        text: 'Bij elke verwonding die je op het terrein aantreft',
      },
      {
        id: 'quiz-ehbo-4-b',
        text: 'Alleen als de EHBO-post niet bereikbaar is',
      },
      {
        id: 'quiz-ehbo-4-c',
        text: 'Bij bewusteloosheid, ademhalingsproblemen, ernstige bloedingen of vermoedelijke hartproblemen',
      },
      {
        id: 'quiz-ehbo-4-d',
        text: 'Nooit — altijd eerst de controlekamer informeren',
      },
    ],
    correctOptionId: 'quiz-ehbo-4-c',
    explanation:
      'Bij levensbedreigende situaties (bewusteloosheid, ademhalingsproblemen, ernstig bloedverlies, hartproblemen) bel je altijd direct 112. Tegelijkertijd meld je via de portofoon aan de controlekamer. Bij minder urgente situaties verwijs je naar de EHBO-post.',
  },
];

// ===== Noodprocedures (3 questions) ========================================

const noodproceduresQuestions: QuizQuestion[] = [
  {
    id: 'quiz-nood-1',
    courseId: 'course-noodprocedures',
    question:
      'Wat is de juiste prioriteitsvolgorde bij een evacuatie van een festivalterrein?',
    type: 'multiple-choice',
    options: [
      {
        id: 'quiz-nood-1-a',
        text: 'VIP-gasten — personeel — gewone bezoekers — mensen met beperking',
      },
      {
        id: 'quiz-nood-1-b',
        text: 'Mensen met beperking en kinderen — bezoekers dichtst bij gevaar — overige bezoekers — personeel',
      },
      {
        id: 'quiz-nood-1-c',
        text: 'Iedereen tegelijk evacueren, geen prioriteitsvolgorde',
      },
      {
        id: 'quiz-nood-1-d',
        text: 'Personeel eerst, zodat zij bezoekers buiten kunnen opvangen',
      },
    ],
    correctOptionId: 'quiz-nood-1-b',
    explanation:
      'Bij evacuatie hebben kwetsbare personen (mensen met een beperking, kinderen, ouderen) altijd prioriteit, gevolgd door de mensen die het dichtst bij het gevaar zijn. Personeel evacueert als laatste, aangezien zij een rol hebben in het begeleiden van bezoekers.',
  },
  {
    id: 'quiz-nood-2',
    courseId: 'course-noodprocedures',
    question:
      'Tijdens een concert gaat het brandalarm af in een grote festivaltent met 5.000 bezoekers. Wat doe je als beveiliger bij de uitgang?',
    type: 'multiple-choice',
    situationDescription:
      'Je staat bij de nooduitgang van de grootste tent op het festivalterrein. Het brandalarm gaat af en je ziet rook vanuit de technische ruimte. Bezoekers beginnen onrustig te worden.',
    options: [
      {
        id: 'quiz-nood-2-a',
        text: 'Nooduitgangen openen, kalm aanwijzingen geven, melden via portofoon',
      },
      {
        id: 'quiz-nood-2-b',
        text: 'Eerst de brand proberen te blussen, dan evacueren',
      },
      {
        id: 'quiz-nood-2-c',
        text: 'Bezoekers vragen rustig te blijven zitten tot de brandweer komt',
      },
      {
        id: 'quiz-nood-2-d',
        text: 'Via het podiumgeluid een evacuatiebericht laten afspelen',
      },
    ],
    correctOptionId: 'quiz-nood-2-a',
    explanation:
      'Bij een brandalarm in een tent met grote menigte is directe evacuatie essentieel. Open alle nooduitgangen, geef kalme en duidelijke aanwijzingen, en meld de situatie via de portofoon. Brandbestrijding is de taak van de brandweer — jouw prioriteit is de veiligheid van het publiek.',
  },
  {
    id: 'quiz-nood-3',
    courseId: 'course-noodprocedures',
    question:
      'Na een evacuatie moeten alle bezoekers zich verzamelen op het dichtstbijzijnde parkeerterrein.',
    type: 'true-false',
    options: [
      { id: 'quiz-nood-3-a', text: 'Waar' },
      { id: 'quiz-nood-3-b', text: 'Niet waar' },
    ],
    correctOptionId: 'quiz-nood-3-b',
    explanation:
      'Bezoekers moeten naar de vooraf aangewezen verzamelpunten, niet naar het parkeerterrein. Verzamelpunten zijn specifiek gekozen op veilige afstand van het gevaar, met goede bereikbaarheid voor hulpdiensten. Het parkeerterrein kan juist gevaarlijk zijn als evacuatieroutes erdoorheen lopen.',
  },
];

// ===== Toegangscontrole (3 questions) ======================================

const toegangscontroleQuestions: QuizQuestion[] = [
  {
    id: 'quiz-tc-1',
    courseId: 'course-toegangscontrole',
    question:
      'Welk van de volgende voorwerpen staat NIET standaard op de lijst verboden voorwerpen bij Nederlandse festivals?',
    type: 'multiple-choice',
    options: [
      { id: 'quiz-tc-1-a', text: 'Glazen flessen' },
      { id: 'quiz-tc-1-b', text: 'Professionele camera\'s met verwisselbare lens' },
      { id: 'quiz-tc-1-c', text: 'Vuurwerk en fakkels' },
      { id: 'quiz-tc-1-d', text: 'Messen en scherpe voorwerpen' },
    ],
    correctOptionId: 'quiz-tc-1-b',
    explanation:
      'Professionele camera\'s staan niet standaard op de verboden-voorwerpenlijst, hoewel sommige evenementen hier apart beleid voor hebben (persaccreditatie). Glazen flessen, vuurwerk en messen zijn altijd verboden op festivalterreinen vanwege veiligheidsrisico\'s.',
  },
  {
    id: 'quiz-tc-2',
    courseId: 'course-toegangscontrole',
    question:
      'Een bezoeker weigert gefouilleerd te worden en wordt agressief. Wat is de juiste handelwijze?',
    type: 'multiple-choice',
    situationDescription:
      'Bij de ingang van Zwarte Cross weigert een mannelijke bezoeker de tassencontrole. Hij begint te schelden en maakt dreigende gebaren naar je collega.',
    options: [
      {
        id: 'quiz-tc-2-a',
        text: 'Fysiek blokkeren en dwingen mee te werken aan de fouillering',
      },
      {
        id: 'quiz-tc-2-b',
        text: 'Rustig de regels uitleggen, alternatief bieden (kluisjes), bij aanhoudende agressie collega\'s en leidinggevende inschakelen',
      },
      {
        id: 'quiz-tc-2-c',
        text: 'De bezoeker zonder controle doorlaten om escalatie te voorkomen',
      },
      {
        id: 'quiz-tc-2-d',
        text: 'Direct de politie bellen',
      },
    ],
    correctOptionId: 'quiz-tc-2-b',
    explanation:
      'De-escalatie is altijd de eerste stap. Leg kalm uit dat fouillering verplicht is voor alle bezoekers en bied alternatieven (bijv. kluisjes voor verboden voorwerpen). Bij aanhoudende agressie schakel je collega\'s en je leidinggevende in. Nooit fysiek dwingen of ongecontroleerd doorlaten.',
  },
  {
    id: 'quiz-tc-3',
    courseId: 'course-toegangscontrole',
    question:
      'Bij evenementen met alcoholverkoop moet je altijd een ID-bewijs controleren bij alle bezoekers, ongeacht leeftijd.',
    type: 'true-false',
    options: [
      { id: 'quiz-tc-3-a', text: 'Waar' },
      { id: 'quiz-tc-3-b', text: 'Niet waar' },
    ],
    correctOptionId: 'quiz-tc-3-b',
    explanation:
      'Je bent niet verplicht bij iedereen een ID te controleren. De Drank- en Horecawet vereist leeftijdscontrole wanneer je twijfelt of iemand 18 jaar is. Bij twijfel altijd controleren, maar bij personen die duidelijk meerderjarig zijn is het niet noodzakelijk.',
  },
];

// ===== Communicatie (3 questions) ==========================================

const communicatieQuestions: QuizQuestion[] = [
  {
    id: 'quiz-comm-1',
    courseId: 'course-communicatie',
    question:
      'Wat is de eerste stap bij het de-escaleren van een conflict met een boze bezoeker?',
    type: 'multiple-choice',
    options: [
      {
        id: 'quiz-comm-1-a',
        text: 'Direct de regels herhalen en aangeven dat het gedrag niet getolereerd wordt',
      },
      {
        id: 'quiz-comm-1-b',
        text: 'Actief luisteren, oogcontact maken en de emotie van de persoon erkennen',
      },
      {
        id: 'quiz-comm-1-c',
        text: 'Een collega erbij halen voor intimidatie-effect',
      },
      {
        id: 'quiz-comm-1-d',
        text: 'De persoon vragen het terrein te verlaten',
      },
    ],
    correctOptionId: 'quiz-comm-1-b',
    explanation:
      'De-escalatie begint altijd met luisteren en erkenning. Door de emotie van de ander te benoemen ("Ik zie dat u gefrustreerd bent") voelt de persoon zich gehoord, wat de spanning verlaagt. Pas daarna kun je naar oplossingen toewerken.',
  },
  {
    id: 'quiz-comm-2',
    courseId: 'course-communicatie',
    question:
      'Een dronken bezoeker begint een ruzie met een andere festivalbezoeker bij de bar. Beide personen schreeuwen. Wat is de beste aanpak?',
    type: 'multiple-choice',
    situationDescription:
      'Bij de hoofdbar van het festival staan twee mannen tegenover elkaar te schreeuwen. Omstanders vormen een kring. De situatie escaleert snel.',
    options: [
      {
        id: 'quiz-comm-2-a',
        text: 'Tussen de twee personen gaan staan en scheiden',
      },
      {
        id: 'quiz-comm-2-b',
        text: 'Met een collega de personen apart nemen, rustig aanspreken en de situatie de-escaleren',
      },
      {
        id: 'quiz-comm-2-c',
        text: 'Luid roepen dat ze moeten stoppen en dreigen met verwijdering',
      },
      {
        id: 'quiz-comm-2-d',
        text: 'Wachten tot het fysiek wordt en dan ingrijpen',
      },
    ],
    correctOptionId: 'quiz-comm-2-b',
    explanation:
      'De veiligste en effectiefste aanpak is met een collega de personen te scheiden door ze apart te nemen (niet ertussen gaan staan — gevaar voor jezelf). Rustig aanspreken, situatie afkoelen, en indien nodig doorverwijzen naar de uitgaing.',
  },
  {
    id: 'quiz-comm-3',
    courseId: 'course-communicatie',
    question:
      'Bij portofoongebruik moet je altijd je eigen naam en locatie noemen voordat je je bericht geeft.',
    type: 'true-false',
    options: [
      { id: 'quiz-comm-3-a', text: 'Waar' },
      { id: 'quiz-comm-3-b', text: 'Niet waar' },
    ],
    correctOptionId: 'quiz-comm-3-a',
    explanation:
      'Het standaard portofoonprotocol vereist dat je jezelf identificeert en je locatie noemt voordat je je bericht doorgeeft. Bijvoorbeeld: "Controlekamer, hier Jan, Ingang Noord. Melding: ..." Dit zorgt voor duidelijke communicatie en snelle coördinatie.',
  },
];

// ---------------------------------------------------------------------------
// Combined export — all 17 questions
// ---------------------------------------------------------------------------

export const quizQuestions: QuizQuestion[] = [
  ...crowdControlQuestions,
  ...ehboQuestions,
  ...noodproceduresQuestions,
  ...toegangscontroleQuestions,
  ...communicatieQuestions,
];
