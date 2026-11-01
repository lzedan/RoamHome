import heroImage from './assets/point-reyes.jpg'
import goldenGate from './assets/events/golden-gate.jpg'
import greenLandscape from './assets/events/green-landscape.jpg'
import redwoods from './assets/events/redwoods.jpg'
import sfAcrossWater from './assets/events/sf-across-water.jpg'
import sfSkylineDay from './assets/events/sf-skyline-day.jpg'
import sfStreetcar from './assets/events/sf-streetcar.jpg'
import sfSunset from './assets/events/sf-sunset.jpg'
import sternGrove from './assets/events/stern-grove.jpg'

// Mock data carried over from the prototype. Photos are bundled (originally Unsplash
// URLs) so the app makes no network requests at all.

export { heroImage }

export type Event = {
  date: string
  month: string
  label: string
  title: string
  place: string
  time: string
  description: string
  image?: {
    src: string
    alt: string
  }
}

export const events: Event[] = [
  {
    date: '18',
    month: 'JUL',
    label: 'LIVE MUSIC',
    title: 'Sunset at Stern Grove',
    place: 'Sigmund Stern Recreation Grove',
    time: '18:30',
    description: 'An open-air evening of live music beneath the eucalyptus, with Bay Area artists, picnic blankets, and golden light filtering through the trees.',
    image: {
      src: sternGrove,
      alt: 'People relaxing together beneath tall California trees',
    },
  },
  {
    date: '19',
    month: 'JUL',
    label: 'OUTDOORS',
    title: 'Baylands Sunrise Walk',
    place: 'Palo Alto Baylands',
    time: '06:30',
    description: 'Start the morning with a naturalist-led walk through the marsh as shorebirds wake and the first light reaches across the South Bay.',
    image: {
      src: greenLandscape,
      alt: 'A green California landscape in soft morning light',
    },
  },
  {
    date: '20',
    month: 'JUL',
    label: 'LOCAL FOOD',
    title: 'Ferry Building Market',
    place: 'San Francisco Ferry Building',
    time: '09:00',
    description: 'Taste the Bay Area at its source with peak-season produce, artisan bread, local cheese, flowers, and waterfront coffee.',
    image: {
      src: sfSkylineDay,
      alt: 'San Francisco buildings beneath a clear blue sky',
    },
  },
  {
    date: '21',
    month: 'JUL',
    label: 'ART & CULTURE',
    title: 'After Hours at SFMOMA',
    place: 'SFMOMA',
    time: '17:00',
    description: 'A relaxed evening of contemporary art, rooftop views, music, and artist-led conversations in the heart of the city.',
    image: {
      src: sfStreetcar,
      alt: 'A San Francisco streetcar moving through the city',
    },
  },
  {
    date: '22',
    month: 'JUL',
    label: 'ADVENTURE',
    title: 'Point Reyes Coastal Hike',
    place: 'Chimney Rock Trail',
    time: '16:00',
    description: 'Follow a local guide along the headlands for sweeping ocean views, coastal wildlife, and sunset over the Pacific.',
    image: {
      src: heroImage,
      alt: 'Point Reyes headlands extending into the Pacific at sunset',
    },
  },
]

const juneEvents: Event[] = [
  {
    date: '12',
    month: 'JUN',
    label: 'LOCAL FOOD',
    title: 'Garden Table at Filoli',
    place: 'Filoli Historic House & Garden',
    time: '18:30',
    description: 'A long-table dinner celebrating Peninsula farms, California wines, and the first flavors of summer in the garden.',
    image: {
      src: greenLandscape,
      alt: 'A lush green California landscape',
    },
  },
  {
    date: '21',
    month: 'JUN',
    label: 'OUTDOORS',
    title: 'Redwood Forest Bathing',
    place: 'Purisima Creek Preserve',
    time: '09:30',
    description: 'A slow, restorative walk beneath the redwoods with guided moments for quiet observation, breathing, and tea.',
    image: {
      src: redwoods,
      alt: 'Tall redwood trees in a California forest',
    },
  },
  {
    date: '27',
    month: 'JUN',
    label: 'ART & CULTURE',
    title: 'Cinema in the Park',
    place: 'Dolores Park',
    time: '21:00',
    description: 'A favorite California film on the lawn with skyline views, neighborhood food stalls, blankets, and warm drinks.',
    image: {
      src: sfSunset,
      alt: 'San Francisco skyline silhouetted at sunset',
    },
  },
]

const augustEvents: Event[] = [
  {
    date: '03',
    month: 'AUG',
    label: 'LOCAL CULTURE',
    title: 'Night at the Exploratorium',
    place: 'Pier 15, San Francisco',
    time: '20:00',
    description: 'An adults-only evening of curious experiments, waterfront views, cocktails, and live conversations with local makers.',
    image: {
      src: sfAcrossWater,
      alt: 'San Francisco skyline across the water',
    },
  },
  {
    date: '14',
    month: 'AUG',
    label: 'ADVENTURE',
    title: 'Golden Gate Sunrise Ride',
    place: 'Crissy Field',
    time: '07:00',
    description: 'A social bicycle ride across the bridge and into the Marin Headlands, followed by coffee and pastries in Sausalito.',
    image: {
      src: goldenGate,
      alt: 'The Golden Gate Bridge on a clear California day',
    },
  },
  {
    date: '23',
    month: 'AUG',
    label: 'LOCAL FOOD',
    title: 'Tomales Bay Picnic',
    place: 'Point Reyes Station',
    time: '10:00',
    description: 'A leisurely day of local oysters, artisan bread, coastal cheese, and a picnic assembled from West Marin producers.',
    image: {
      src: heroImage,
      alt: 'Point Reyes headlands extending into the Pacific at sunset',
    },
  },
]

export const eventMonths = [
  { name: 'June', year: 2025, monthIndex: 5, events: juneEvents },
  { name: 'July', year: 2025, monthIndex: 6, events },
  { name: 'August', year: 2025, monthIndex: 7, events: augustEvents },
]

export const monthNames: Record<string, string> = {
  JAN: 'January',
  FEB: 'February',
  MAR: 'March',
  APR: 'April',
  MAY: 'May',
  JUN: 'June',
  JUL: 'July',
  AUG: 'August',
  SEP: 'September',
  OCT: 'October',
  NOV: 'November',
  DEC: 'December',
}

export const pinnedApps = [
  { name: 'YouTube', color: 'app-youtube', icon: 'youtube' },
  { name: 'Disney+', color: 'app-disney', icon: 'disney' },
  { name: 'Netflix', color: 'app-netflix', icon: 'netflix' },
  { name: 'Spotify', color: 'app-spotify', icon: 'spotify' },
  { name: 'HDMI 3', color: 'app-hdmi', icon: 'hdmi' },
] as const

export const additionalApps = [
  { name: 'News', color: 'app-coral', glyph: 'N' },
  { name: 'Maps', color: 'app-blue', glyph: '⌖' },
  { name: 'Transport', color: 'app-slate', glyph: '→' },
  { name: 'Concierge', color: 'app-gold', glyph: 'C' },
  { name: 'TV', color: 'app-sky', glyph: '▭' },
]

export const accentOptions = [
  { id: 'honey', name: 'Honey', color: '#f4c96b', rgb: '244 201 107' },
  { id: 'terracotta', name: 'Terracotta', color: '#df9675', rgb: '223 150 117' },
  { id: 'clay-rose', name: 'Clay rose', color: '#d8948f', rgb: '216 148 143' },
  { id: 'sage', name: 'Sage', color: '#afbf91', rgb: '175 191 145' },
  { id: 'dusty-blue', name: 'Dusty blue', color: '#91afbd', rgb: '145 175 189' },
  { id: 'mauve', name: 'Mauve', color: '#b99caf', rgb: '185 156 175' },
] as const

export type AccentId = (typeof accentOptions)[number]['id']
