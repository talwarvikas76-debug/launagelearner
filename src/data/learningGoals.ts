import { UserGoal, UserGoalId } from '../types';

export const LEARNING_GOALS: UserGoal[] = [
  {
    id: 'study_abroad',
    number: 1,
    title: 'Study Abroad',
    emoji: '🎓',
    tagline: 'University lectures, campus life, academic seminars & student exchange',
    description: 'Master academic discussions, campus admissions, library research, dorm life, and pass student visa & university language requirements.',
    targetCEFRLevel: 'B2 / C1 Academic Standard',
    estimatedWeeks: 10,
    dailyMinutes: 20,
    badgeLabel: 'Campus & Academic Fluency',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80',
    focusSkills: ['Academic Discourse', 'Lecture Comprehension', 'University Applications', 'Campus Small Talk'],
    sampleScenarios: ['University Seminar Debate', 'Dormitory Roommate Check-in', 'Professor Office Hours', 'Academic Library & Research'],
    starterRoadmap: {
      week1: 'Campus orientation vocabulary & introducing your academic background',
      week2: 'Asking questions in lectures & participating in seminar group discussions',
      week3: 'Writing structured academic opinions & defending your viewpoint',
      week4: 'Official university oral interview simulation & academic presentations'
    }
  },
  {
    id: 'job',
    number: 2,
    title: 'Get a Job',
    emoji: '💼',
    tagline: 'Job interviews, corporate meetings, client presentations & salary negotiation',
    description: 'Achieve professional workplace fluency, ace international job interviews using the STAR method, and handle business emails & negotiations.',
    targetCEFRLevel: 'B2 / C1 Professional Standard',
    estimatedWeeks: 8,
    dailyMinutes: 20,
    badgeLabel: 'Career & Executive Fluency',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    focusSkills: ['STAR Method Interviews', 'Business Meetings', 'Salary & Contract Terms', 'Client Communication'],
    sampleScenarios: ['Professional Job Interview', 'Executive Strategy Meeting', 'Client Pitch & Q&A', 'Negotiating Job Offer & Benefits'],
    starterRoadmap: {
      week1: '2-minute executive self-introduction & resume walkthrough',
      week2: 'Behavioral interview questions (STAR method) & workplace challenge resolution',
      week3: 'Leading business meetings, expressing polite disagreement & pitching proposals',
      week4: 'Full bilingual executive mock interview & final round negotiation'
    }
  },
  {
    id: 'travel',
    number: 3,
    title: 'Travel',
    emoji: '✈️',
    tagline: 'Airports, hotels, ordering cuisine, asking directions & local culture',
    description: 'Travel with absolute confidence. Navigate airports, train stations, local boutique shops, authentic restaurants, and spontaneous street conversations.',
    targetCEFRLevel: 'A2 / B1 Travel Nomad Standard',
    estimatedWeeks: 4,
    dailyMinutes: 15,
    badgeLabel: 'Travel & Cultural Explorer',
    imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80',
    focusSkills: ['Directions & Transit', 'Ordering Food & Drinks', 'Hotel Check-in & Concierge', 'Emergency & Lost Items'],
    sampleScenarios: ['Ordering at a Cozy Café', 'Lost in the Historic Center', 'Shopping at the Farmers Market', 'Fine Dining & Dietary Inquiries'],
    starterRoadmap: {
      week1: 'Essential airport check-in, customs declarations & taxi navigation',
      week2: 'Ordering coffee, pastries & authentic restaurant meals with dietary preferences',
      week3: 'Asking for street directions, buying train tickets & museum tours',
      week4: 'Hotel check-in, handling unexpected luggage issues & local friend chat'
    }
  },
  {
    id: 'immigration',
    number: 4,
    title: 'Immigration',
    emoji: '🛂',
    tagline: 'Official visa interviews, citizenship tests, apartment leases & healthcare',
    description: 'Prepare for official permanent residency (PR) tests, embassy appointments, apartment rental contracts, healthcare clinic visits, and bank setups.',
    targetCEFRLevel: 'B1 / B2 Integration Standard',
    estimatedWeeks: 12,
    dailyMinutes: 25,
    badgeLabel: 'PR & Citizenship Integration',
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80',
    focusSkills: ['Official Embassy Interviews', 'Apartment Leases & Utilities', 'Healthcare Consultations', 'Banking & Tax Forms'],
    sampleScenarios: ['Embassy Visa & PR Interview', 'Apartment Lease Agreement Signing', 'Visiting a Medical Clinic', 'City Hall Registration'],
    starterRoadmap: {
      week1: 'Personal biography, family background & official documents vocabulary',
      week2: 'Navigating city hall registration (Bürgeramt/Empadronamiento/Mairie) & banking',
      week3: 'Describing medical symptoms, allergies & doctor consultations',
      week4: 'Full simulated immigration officer interview & civic integration quiz'
    }
  },
  {
    id: 'speaking',
    number: 5,
    title: 'Improve Speaking',
    emoji: '🗣️',
    tagline: 'Overcome language hesitation, master native pronunciation & spontaneous flow',
    description: 'Break through the fear of speaking. Build rapid sentence reflexes, master accent nuances with AI spectrograms, and talk freely without translating in your head.',
    targetCEFRLevel: 'B1 / B2 Spontaneous Spoken Fluency',
    estimatedWeeks: 6,
    dailyMinutes: 15,
    badgeLabel: 'Daily Spoken Fluency & Accent',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80',
    focusSkills: ['Rapid Spoken Reflexes', 'Pronunciation & Pitch Accent', 'Conversational Idioms', 'Storytelling Flow'],
    sampleScenarios: ['Catching Up with a Native Friend', 'Personal Grammar & Fluency Tutor', 'Coffee Shop Chit-Chat', 'Daily Life & Weekend Plans'],
    starterRoadmap: {
      week1: 'High-frequency conversational connectors & daily storytelling',
      week2: 'Pronunciation drills with real-time AI phoneme accuracy coaching',
      week3: 'Expressing opinions, agreement, disagreement & cultural humor',
      week4: '15-minute uninterrupted spontaneous AI voice roleplay sprint'
    }
  },
  {
    id: 'personal',
    number: 6,
    title: 'Learn for Yourself',
    emoji: '❤️',
    tagline: 'Hobby, personal passion, heritage culture, foreign cinema & literature',
    description: 'Learn at your own joyful pace. Explore literature, cinema, music, cuisine, history, and connect with your family heritage or personal curiosity.',
    targetCEFRLevel: 'A1 to B2 Flexible Self-Paced',
    estimatedWeeks: 8,
    dailyMinutes: 15,
    badgeLabel: 'Passion & Heritage Learner',
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    focusSkills: ['Culture & Media', 'Culinary & Cooking', 'Personal Storytelling', 'Literature & Music'],
    sampleScenarios: ['Cooking Traditional Recipe with Chef', 'Art & History Museum Tour', 'Catching Up with a Native Friend', 'Personal Grammar Tutor'],
    starterRoadmap: {
      week1: 'Core 100 most frequent words & beautiful native greetings',
      week2: 'Discovering traditional cuisine, recipes & cultural landmarks',
      week3: 'Discussing favorite songs, movies, books & life passions',
      week4: 'Forming meaningful personal connections with native speakers'
    }
  }
];

export function getGoalById(id?: UserGoalId | string): UserGoal {
  const found = LEARNING_GOALS.find(g => g.id === id);
  return found || LEARNING_GOALS[4]; // Default to 'Improve Speaking' (5)
}

export function getGoalByNumber(num: number | string): UserGoal {
  const n = typeof num === 'string' ? parseInt(num, 10) : num;
  const found = LEARNING_GOALS.find(g => g.number === n);
  return found || LEARNING_GOALS[4];
}
