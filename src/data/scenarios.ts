import { Scenario } from '../types';

export const DEFAULT_SCENARIOS: Scenario[] = [
  {
    id: 'cafe-order',
    title: 'Ordering at a Cozy Café',
    category: 'dining',
    level: 'A1',
    icon: 'Coffee',
    color: 'amber',
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=700&q=80',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    partnerName: 'Lucas',
    partnerRole: 'Friendly Barista',
    userRole: 'Coffee Shop Customer',
    setting: 'A bustling neighborhood café with fresh pastries and espresso aromas',
    situation: 'You just walked into a local café. You want to order a beverage and a small pastry, ask for recommendations, and pay.',
    objectives: [
      { id: 'obj-greet', description: 'Greet the barista politely', completed: false },
      { id: 'obj-order-drink', description: 'Order a coffee or tea with custom preference (hot/iced, milk, sugar)', completed: false },
      { id: 'obj-ask-pastry', description: 'Inquire about a pastry or snack recommendation', completed: false },
      { id: 'obj-ask-price-pay', description: 'Ask for the total price and method of payment', completed: false }
    ],
    starterPrompts: [
      { text: 'Hello, what drinks do you recommend today?', translation: 'Hello, what drinks do you recommend today?' },
      { text: 'Can I have an iced latte with oat milk please?', translation: 'Can I have an iced latte with oat milk please?' },
      { text: 'Do you have fresh croissants or muffins?', translation: 'Do you have fresh croissants or muffins?' }
    ]
  },
  {
    id: 'travel-directions',
    title: 'Lost in the Historic Center',
    category: 'travel',
    level: 'A2',
    icon: 'Compass',
    color: 'sky',
    imageUrl: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=700&q=80',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    partnerName: 'Elena',
    partnerRole: 'Helpful Local Resident',
    userRole: 'Tourist Exploring the City',
    setting: 'A picturesque cobblestone square in the old town',
    situation: 'You are looking for the central art museum and the nearest subway station, but your phone battery is dead.',
    objectives: [
      { id: 'obj-excuse', description: 'Politely interrupt and ask for directions', completed: false },
      { id: 'obj-landmark', description: 'Ask how far the museum is and whether to walk or take transit', completed: false },
      { id: 'obj-clarify', description: 'Ask for clarification on left/right turns or street landmarks', completed: false },
      { id: 'obj-thanks', description: 'Thank them warmly and say farewell', completed: false }
    ],
    starterPrompts: [
      { text: 'Excuse me, could you tell me how to get to the art museum?', translation: 'Excuse me, could you tell me how to get to the art museum?' },
      { text: 'Is it within walking distance from here?', translation: 'Is it within walking distance from here?' },
      { text: 'Should I turn left at the traffic light or keep going straight?', translation: 'Should I turn left at the traffic light or keep going straight?' }
    ]
  },
  {
    id: 'market-bargain',
    title: 'Shopping at the Farmers & Artisan Market',
    category: 'daily',
    level: 'A2',
    icon: 'ShoppingBag',
    color: 'emerald',
    imageUrl: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=700&q=80',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    partnerName: 'Mateo',
    partnerRole: 'Artisan Stall Vendor',
    userRole: 'Shopper Looking for Gifts & Produce',
    setting: 'A vibrant weekend open-air market with handmade crafts, spices, and fruits',
    situation: 'You are browsing handmade souvenirs and fresh seasonal fruits. You want to ask about origins, ingredients, and negotiate a bundle discount.',
    objectives: [
      { id: 'obj-ask-origin', description: 'Ask if the items are locally made or organic', completed: false },
      { id: 'obj-negotiate', description: 'Ask if you can get a discount for buying two or more items', completed: false },
      { id: 'obj-payment', description: 'Ask if they accept credit cards or cash only', completed: false },
      { id: 'obj-giftwrap', description: 'Ask if they can wrap it nicely as a souvenir', completed: false }
    ],
    starterPrompts: [
      { text: 'These crafts look wonderful! Were they made locally?', translation: 'These crafts look wonderful! Were they made locally?' },
      { text: 'How much for two of these ceramic bowls?', translation: 'How much for two of these ceramic bowls?' },
      { text: 'Can I pay with a card or do you prefer cash?', translation: 'Can I pay with a card or do you prefer cash?' }
    ]
  },
  {
    id: 'casual-friend',
    title: 'Catching Up with a Native Friend',
    category: 'social',
    level: 'B1',
    icon: 'MessageSquareHeart',
    color: 'rose',
    imageUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=700&q=80',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    partnerName: 'Sofia',
    partnerRole: 'Close University Friend',
    userRole: 'Language Exchange Partner & Friend',
    setting: 'Sitting on park benches on a sunny weekend afternoon',
    situation: 'You and your friend are catching up about hobbies, your recent weekend trips, favorite movies, and future vacation plans.',
    objectives: [
      { id: 'obj-weekend', description: 'Share what you did last weekend in detail', completed: false },
      { id: 'obj-ask-opinion', description: 'Ask about their thoughts on a recent movie, book, or hobby', completed: false },
      { id: 'obj-future-plans', description: 'Discuss plans for an upcoming holiday or festival', completed: false },
      { id: 'obj-idiom', description: 'Use at least one natural conversational expression or reaction', completed: false }
    ],
    starterPrompts: [
      { text: 'It has been so long! How has work and family been lately?', translation: 'It has been so long! How has work and family been lately?' },
      { text: 'Last weekend I tried cooking a traditional recipe for the first time.', translation: 'Last weekend I tried cooking a traditional recipe for the first time.' },
      { text: 'Have you seen any good movies or TV shows recently?', translation: 'Have you seen any good movies or TV shows recently?' }
    ]
  },
  {
    id: 'job-interview',
    title: 'Professional Job Interview',
    category: 'business',
    level: 'B2',
    icon: 'Briefcase',
    color: 'indigo',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=700&q=80',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    partnerName: 'Mr. Vance',
    partnerRole: 'Senior Hiring Manager',
    userRole: 'Candidate for International Project Lead',
    setting: 'A modern corporate conference room or virtual executive panel',
    situation: 'You are interviewing for a bilingual project management position. You need to speak formally, describe your background, handle behavioral questions, and ask insightful questions about company culture.',
    objectives: [
      { id: 'obj-pitch', description: 'Deliver a concise 2-minute introduction of your career and strengths', completed: false },
      { id: 'obj-challenge', description: 'Explain a past challenge at work and how you resolved it (STAR method)', completed: false },
      { id: 'obj-question-team', description: 'Ask thoughtful questions about the team dynamics and long-term vision', completed: false },
      { id: 'obj-formal-tone', description: 'Maintain formal and professional honorifics/vocabulary throughout', completed: false }
    ],
    starterPrompts: [
      { text: 'Good morning, thank you for the opportunity to speak with you today.', translation: 'Good morning, thank you for the opportunity to speak with you today.' },
      { text: 'In my previous position, I led cross-functional teams across three timezones.', translation: 'In my previous position, I led cross-functional teams across three timezones.' },
      { text: 'What are the main priorities and key milestones for this role in the first 90 days?', translation: 'What are the main priorities and key milestones for this role in the first 90 days?' }
    ]
  },
  {
    id: 'doctor-visit',
    title: 'Visiting a Medical Clinic / Pharmacy',
    category: 'emergency',
    level: 'B1',
    icon: 'Stethoscope',
    color: 'red',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=700&q=80',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80',
    partnerName: 'Dr. Clara',
    partnerRole: 'Attending Physician',
    userRole: 'Patient Seeking Care',
    setting: 'A community medical clinic consultation room',
    situation: 'You have been feeling unwell for three days with a sore throat, mild fever, and fatigue. You need to explain your symptoms clearly and ask about dosage and precautions.',
    objectives: [
      { id: 'obj-symptoms', description: 'Describe your symptoms, severity, and when they started', completed: false },
      { id: 'obj-allergies', description: 'Confirm whether you have any drug allergies or existing conditions', completed: false },
      { id: 'obj-dosage', description: 'Inquire about medication dosage, frequency, and side effects', completed: false },
      { id: 'obj-certificate', description: 'Request a medical note or prescription receipt', completed: false }
    ],
    starterPrompts: [
      { text: 'Doctor, I have had a severe throat ache and slight fever since Tuesday.', translation: 'Doctor, I have had a severe throat ache and slight fever since Tuesday.' },
      { text: 'I am allergic to penicillin, is this medication safe for me?', translation: 'I am allergic to penicillin, is this medication safe for me?' },
      { text: 'How many times a day should I take this syrup, and before or after meals?', translation: 'How many times a day should I take this syrup, and before or after meals?' }
    ]
  },
  {
    id: 'restaurant-dinner',
    title: 'Fine Dining & Dietary Inquiries',
    category: 'dining',
    level: 'B1',
    icon: 'UtensilsCrossed',
    color: 'orange',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=80',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    partnerName: 'Antoine',
    partnerRole: 'Head Waiter & Sommelier',
    userRole: 'Dinner Guest Celebrating an Occasion',
    setting: 'An elegant dining room with ambient candlelight and classical music',
    situation: 'You are having dinner at a renowned local restaurant. You want to ask about ingredients, wine pairings, and dietary accommodations.',
    objectives: [
      { id: 'obj-table-menu', description: 'Confirm reservation and ask for the seasonal chef specials', completed: false },
      { id: 'obj-dietary', description: 'Inquire about gluten-free or vegetarian substitutions', completed: false },
      { id: 'obj-wine', description: 'Ask for a wine pairing recommendation for the main course', completed: false },
      { id: 'obj-compliment-bill', description: 'Compliment the culinary presentation and ask for the check', completed: false }
    ],
    starterPrompts: [
      { text: 'Good evening, we have a table reserved under my name.', translation: 'Good evening, we have a table reserved under my name.' },
      { text: 'Could you tell us about the chef special for tonight?', translation: 'Could you tell us about the chef special for tonight?' },
      { text: 'Which wine would you recommend pairing with the grilled sea bass?', translation: 'Which wine would you recommend pairing with the grilled sea bass?' }
    ]
  },
  {
    id: 'language-tutor',
    title: 'Personal Grammar & Fluency Tutor',
    category: 'daily',
    level: 'A1',
    icon: 'GraduationCap',
    color: 'teal',
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=700&q=80',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    partnerName: 'Prof. Amara',
    partnerRole: 'Patient Language Teacher',
    userRole: 'Dedicated Language Student',
    setting: 'A cozy virtual classroom with a digital whiteboard and vocabulary drills',
    situation: 'Your tutor is here to practice specific verb tenses, idioms, and natural expressions with you. You can ask any grammar question or practice free-flowing sentences.',
    objectives: [
      { id: 'obj-tutor-ask', description: 'Ask how to express a specific idea in natural spoken language', completed: false },
      { id: 'obj-tutor-sentence', description: 'Construct a multi-clause sentence using a connector (because, although, if)', completed: false },
      { id: 'obj-tutor-correct', description: 'Ask the tutor to review and correct your phrasing', completed: false },
      { id: 'obj-tutor-drill', description: 'Complete a quick mini-dialogue challenge given by the tutor', completed: false }
    ],
    starterPrompts: [
      { text: 'Can you teach me the most natural way to express gratitude in different situations?', translation: 'Can you teach me the most natural way to express gratitude in different situations?' },
      { text: 'Could you give me a sentence to translate or practice together?', translation: 'Could you give me a sentence to translate or practice together?' },
      { text: 'What is the difference between these two similar words?', translation: 'What is the difference between these two similar words?' }
    ]
  }
];
