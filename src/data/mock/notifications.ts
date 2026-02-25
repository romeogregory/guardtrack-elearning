import type { Notification } from '@/lib/types';

// ---------------------------------------------------------------------------
// Notifications for Jan de Vries — 10 items, newest first
// Timestamps distributed over the past 2 weeks from 2026-02-25
// ---------------------------------------------------------------------------

export const notifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'overdue',
    title: 'Cursus deadline verlopen',
    message:
      'De deadline voor "EHBO voor Beveiligingspersoneel" is verstreken. Rond deze verplichte cursus zo snel mogelijk af.',
    timestamp: '2026-02-25T09:00:00Z',
    isRead: false,
    linkedCourseId: 'course-ehbo',
  },
  {
    id: 'notif-2',
    type: 'assignment',
    title: 'Nieuwe cursus toegewezen',
    message:
      'Je bent ingeschreven voor de cursus "Noodprocedures en Evacuatie". Deze is verplicht voor Lowlands Festival.',
    timestamp: '2026-02-24T14:30:00Z',
    isRead: false,
    linkedCourseId: 'course-noodprocedures',
    linkedEventId: 'event-lowlands',
  },
  {
    id: 'notif-3',
    type: 'certification',
    title: 'Certificaat verloopt binnenkort',
    message:
      'Je BHV Certificaat verloopt over 30 dagen. Plan tijdig een hernieuwing in.',
    timestamp: '2026-02-23T10:15:00Z',
    isRead: false,
  },
  {
    id: 'notif-4',
    type: 'overdue',
    title: 'Herinnering: verplichte cursus',
    message:
      'Voltooi "Toegangscontrole en Fouillering" voor de deadline van Zwarte Cross. Je voortgang is momenteel 50%.',
    timestamp: '2026-02-22T08:00:00Z',
    isRead: false,
    linkedCourseId: 'course-toegangscontrole',
    linkedEventId: 'event-zwarte-cross',
  },
  {
    id: 'notif-5',
    type: 'event',
    title: 'Koningsdag Amsterdam',
    message:
      'Koningsdag nadert — je hebt nog 2 verplichte cursussen om af te ronden. Zorg dat je op tijd klaar bent.',
    timestamp: '2026-02-20T11:00:00Z',
    isRead: true,
    linkedEventId: 'event-koningsdag',
  },
  {
    id: 'notif-6',
    type: 'achievement',
    title: 'Badge verdiend: EHBO Expert',
    message:
      'Gefeliciteerd! Je hebt de badge "EHBO Expert" verdiend door alle EHBO-cursussen met 90%+ score af te ronden.',
    timestamp: '2026-02-18T16:45:00Z',
    isRead: true,
  },
  {
    id: 'notif-7',
    type: 'assignment',
    title: 'Verplichte cursus voor Lowlands',
    message:
      'De cursus "Crowd Control bij Grootschalige Evenementen" is verplicht voor je inzet bij Lowlands Festival. Deadline: 15 april.',
    timestamp: '2026-02-16T09:30:00Z',
    isRead: true,
    linkedCourseId: 'course-crowd-control',
    linkedEventId: 'event-lowlands',
  },
  {
    id: 'notif-8',
    type: 'certification',
    title: 'EHBO Diploma vernieuwd',
    message:
      'Je EHBO Diploma is succesvol vernieuwd en is nu geldig tot 10 juni 2026.',
    timestamp: '2026-02-14T13:00:00Z',
    isRead: true,
  },
  {
    id: 'notif-9',
    type: 'event',
    title: 'Inzet bevestigd: Zwarte Cross',
    message:
      'Je inzet voor Zwarte Cross 2026 is bevestigd. Locatie: Toegangscontrole Hoofdingang. Zorg dat alle verplichte cursussen zijn afgerond.',
    timestamp: '2026-02-12T10:00:00Z',
    isRead: true,
    linkedEventId: 'event-zwarte-cross',
  },
  {
    id: 'notif-10',
    type: 'achievement',
    title: '30 dagen streak bereikt!',
    message:
      'Fantastisch! Je hebt 30 opeenvolgende dagen het platform bezocht. Ga zo door!',
    timestamp: '2026-02-11T08:30:00Z',
    isRead: true,
  },
];
