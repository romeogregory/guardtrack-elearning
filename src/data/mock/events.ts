import type { Event } from '@/lib/types';

// ---------------------------------------------------------------------------
// Events — 7 Dutch events/festivals (4 upcoming, 3 past)
// ---------------------------------------------------------------------------

export const events: Event[] = [
  // === Upcoming ===

  {
    id: 'event-koningsdag',
    name: 'Koningsdag Amsterdam',
    location: 'Amsterdam Centrum',
    startDate: '2026-04-27',
    endDate: '2026-04-27',
    description:
      'De grootste vrijmarkt en het grootste feest van Nederland. Miljoenen bezoekers in de binnenstad van Amsterdam. Maximale inzet vereist voor crowd control, EHBO en noodprocedures.',
    expectedAttendees: 1000000,
    requiredCourseIds: [
      'course-crowd-control',
      'course-ehbo',
      'course-noodprocedures',
    ],
    status: 'upcoming',
    guardRole: 'Crowd Control Centrum',
  },

  {
    id: 'event-zwarte-cross',
    name: 'Zwarte Cross',
    location: 'Lichtenvoorde, Gelderland',
    startDate: '2026-07-16',
    endDate: '2026-07-19',
    description:
      'Het grootste festival van Nederland qua bezoekersaantallen per dag. Meerdaags evenement met muziek, motorcross en theater. Uitgebreide toegangscontrole en crowd management vereist.',
    expectedAttendees: 55000,
    requiredCourseIds: [
      'course-crowd-control',
      'course-toegangscontrole',
    ],
    status: 'upcoming',
    guardRole: 'Toegangscontrole Hoofdingang',
  },

  {
    id: 'event-lowlands',
    name: 'Lowlands Festival',
    location: 'Biddinghuizen, Flevoland',
    startDate: '2026-08-21',
    endDate: '2026-08-23',
    description:
      'Driedaags muziek- en kunstenfestival op het terrein van Walibi Holland. Internationaal publiek, camping, meerdere podia. Volledige beveiligingsinzet met nadruk op crowd control en noodprocedures.',
    expectedAttendees: 60000,
    requiredCourseIds: [
      'course-crowd-control',
      'course-ehbo',
      'course-noodprocedures',
      'course-toegangscontrole',
    ],
    status: 'upcoming',
    guardRole: 'Crowd Control Alpha Stage',
  },

  {
    id: 'event-mysteryland',
    name: 'Mysteryland',
    location: 'Haarlemmermeer, Noord-Holland',
    startDate: '2026-08-28',
    endDate: '2026-08-30',
    description:
      'Een van de langstlopende dance-festivals ter wereld. Meerdaags evenement met camping en nachtprogrammering. Focus op crowd control en noodprocedures in combinatie met nachtbeveiliging.',
    expectedAttendees: 40000,
    requiredCourseIds: [
      'course-crowd-control',
      'course-noodprocedures',
    ],
    status: 'upcoming',
    guardRole: 'Noodprocedures Coördinator',
  },

  // === Past ===

  {
    id: 'event-bevrijdingsdag',
    name: 'Bevrijdingsdag Festivals',
    location: 'Diverse locaties, Nederland',
    startDate: '2025-05-05',
    endDate: '2025-05-05',
    description:
      'Bevrijdingsfestivals verspreid over veertien steden in Nederland. Gratis toegankelijk, grote publieksstromen. Coördinatie tussen meerdere locaties vereist.',
    expectedAttendees: 800000,
    requiredCourseIds: [
      'course-crowd-control',
      'course-ehbo',
    ],
    status: 'completed',
    guardRole: 'Terreinbeveiliging Amsterdam',
  },

  {
    id: 'event-sail',
    name: 'SAIL Amsterdam',
    location: 'Amsterdam, IJ-oevers',
    startDate: '2025-08-13',
    endDate: '2025-08-17',
    description:
      'Vijfdaags maritiem evenement langs de IJ-oevers. Honderdduizenden bezoekers per dag die de tall ships bewonderen. Intensieve crowd management langs de kades vereist.',
    expectedAttendees: 600000,
    requiredCourseIds: [
      'course-crowd-control',
      'course-ehbo',
      'course-noodprocedures',
    ],
    status: 'completed',
    guardRole: 'Crowd Control IJ-kade',
  },

  {
    id: 'event-vierdaagse',
    name: 'Vierdaagsefeesten Nijmegen',
    location: 'Nijmegen, Gelderland',
    startDate: '2025-07-15',
    endDate: '2025-07-18',
    description:
      'Het grootste meerdaagse festival van Nederland, rondom de Vierdaagse wandeltocht. Uitgestrekt festivalgebied in de Nijmeegse binnenstad met diverse podia en horeca.',
    expectedAttendees: 1500000,
    requiredCourseIds: [
      'course-crowd-control',
      'course-ehbo',
      'course-communicatie',
    ],
    status: 'completed',
    guardRole: 'Beveiliging Waalkade',
  },
];
