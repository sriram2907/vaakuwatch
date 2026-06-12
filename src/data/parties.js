// Reference data for parties shown in the UI (logos/colors are placeholders —
// swap in real assets via the admin dashboard once built).
export const parties = [
  { id: 'dmk', name: 'Dravida Munnetra Kazhagam', abbreviation: 'DMK', color: '#FF4136', founded: 1949 },
  { id: 'aiadmk', name: 'All India Anna Dravida Munnetra Kazhagam', abbreviation: 'AIADMK', color: '#22C55E', founded: 1972 },
  { id: 'bjp', name: 'Bharatiya Janata Party', abbreviation: 'BJP', color: '#FB923C', founded: 1980 },
  { id: 'ntk', name: 'Naam Tamilar Katchi', abbreviation: 'NTK', color: '#EAB308', founded: 2010 },
  { id: 'pmk', name: 'Pattali Makkal Katchi', abbreviation: 'PMK', color: '#38BDF8', founded: 1989 },
  { id: 'inc', name: 'Indian National Congress', abbreviation: 'INC', color: '#3B82F6', founded: 1885 },
]

export const categories = [
  'Education', 'Healthcare', 'Agriculture', 'Employment', 'Women Welfare',
  'Youth Welfare', 'Infrastructure', 'Housing', 'Environment', 'Economy',
  'Technology', 'Transportation', 'Industry', 'Public Safety', 'Social Welfare',
]

export const electionYears = [
  1967, 1971, 1977, 1980, 1984, 1989, 1991, 1996, 2001, 2006, 2011, 2016, 2021, 2026,
]

export const statusConfig = {
  Completed: { color: '#22C55E', label: 'Completed' },
  Ongoing: { color: '#38BDF8', label: 'Ongoing' },
  'In Progress': { color: '#EAB308', label: 'In Progress' },
  'Not Fulfilled': { color: '#FF4136', label: 'Not Fulfilled' },
  'Insufficient Data': { color: '#737373', label: 'Insufficient Data' },
}
