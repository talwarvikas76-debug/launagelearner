import { Scenario } from '../types';

export const DEFAULT_SCENARIOS: Scenario[] = [
  {
    id: 'cafe-order',
    title: 'Ordering at a Café',
    category: 'dining',
    level: 'A1',
    icon: 'Coffee',
    color: 'amber',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=85',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
    partnerName: 'Lucas',
    partnerRole: 'Café Barista',
    userRole: 'Coffee Shop Customer',
    setting: 'A sunlit European sidewalk café with outdoor wicker chairs and fresh espresso aromas',
    situation: 'You just walked into a charming neighborhood café. Order your morning beverage, ask for a fresh pastry recommendation, and pay.',
    objectives: [
      { id: 'obj-greet', description: 'Greet the barista politely', completed: false },
      { id: 'obj-order-drink', description: 'Order a coffee with milk and sugar preferences', completed: false },
      { id: 'obj-ask-pastry', description: 'Inquire about fresh pastries or baked goods', completed: false },
      { id: 'obj-ask-price-pay', description: 'Ask for the total price and pay by card', completed: false }
    ],
    starterPrompts: [
      { text: 'Hello, could I get a cappuccino with oat milk, please?', translation: 'Hello, could I get a cappuccino with oat milk, please?' },
      { text: 'What fresh pastries do you have this morning?', translation: 'What fresh pastries do you have this morning?' },
      { text: 'Can I pay with credit card or contactless?', translation: 'Can I pay with credit card or contactless?' }
    ]
  },
  {
    id: 'job-interview',
    title: 'Job Interview',
    category: 'business',
    level: 'B2',
    icon: 'Briefcase',
    color: 'indigo',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=85',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    partnerName: 'Mr. Vance',
    partnerRole: 'Senior Hiring Director',
    userRole: 'Candidate for Global Operations Lead',
    setting: 'A high-rise executive boardroom with panoramic city skyline views',
    situation: 'You are interviewing for a bilingual leadership role. Introduce yourself, answer behavioral competency questions, and ask about team culture.',
    objectives: [
      { id: 'obj-pitch', description: 'Deliver a concise 2-minute elevator summary of your career', completed: false },
      { id: 'obj-challenge', description: 'Explain a past challenge and resolution using STAR method', completed: false },
      { id: 'obj-question-team', description: 'Ask strategic questions about the company roadmap', completed: false },
      { id: 'obj-formal-tone', description: 'Maintain polished professional vocabulary throughout', completed: false }
    ],
    starterPrompts: [
      { text: 'Good morning, thank you for welcoming me to your headquarters today.', translation: 'Good morning, thank you for welcoming me to your headquarters today.' },
      { text: 'In my previous position, I led cross-functional international teams.', translation: 'In my previous position, I led cross-functional international teams.' },
      { text: 'Could you elaborate on the team key milestones for the upcoming quarter?', translation: 'Could you elaborate on the team key milestones for the upcoming quarter?' }
    ]
  },
  {
    id: 'travel-directions',
    title: 'Lost in the Center',
    category: 'travel',
    level: 'B2',
    icon: 'Compass',
    color: 'sky',
    imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1000&q=85',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    partnerName: 'Elena',
    partnerRole: 'Local Resident & City Guide',
    userRole: 'Traveler Exploring Old Town',
    setting: 'A historic cobblestone street bordered by classic architecture and arches',
    situation: 'Your phone battery just ran out in the historic center. Ask a friendly passerby how to reach the grand cathedral and subway line.',
    objectives: [
      { id: 'obj-excuse', description: 'Politely interrupt and ask for directions', completed: false },
      { id: 'obj-landmark', description: 'Ask for key landmarks and walking distance', completed: false },
      { id: 'obj-clarify', description: 'Clarify left and right turns along the route', completed: false },
      { id: 'obj-thanks', description: 'Thank them warmly and exchange farewells', completed: false }
    ],
    starterPrompts: [
      { text: 'Excuse me, could you tell me how to get to the main cathedral square?', translation: 'Excuse me, could you tell me how to get to the main cathedral square?' },
      { text: 'Is it within walking distance or should I take the tram?', translation: 'Is it within walking distance or should I take the tram?' },
      { text: 'Should I turn left past the clock tower or keep going straight?', translation: 'Should I turn left past the clock tower or keep going straight?' }
    ]
  },
  {
    id: 'hotel-checkin',
    title: 'Boutique Hotel Check-In',
    category: 'travel',
    level: 'A2',
    icon: 'Compass',
    color: 'emerald',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=85',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    partnerName: 'Julien',
    partnerRole: 'Chief Concierge',
    userRole: 'Hotel Guest Arriving from International Flight',
    setting: 'A luxury boutique hotel lobby featuring marble reception counters and warm ambient lighting',
    situation: 'You have just arrived after a long flight. Check into your booked suite, ask about breakfast timings, luggage storage, and high-speed Wi-Fi.',
    objectives: [
      { id: 'obj-hotel-res', description: 'State your reservation name and booking details', completed: false },
      { id: 'obj-hotel-wifi', description: 'Inquire about Wi-Fi access and gym or rooftop amenities', completed: false },
      { id: 'obj-hotel-breakfast', description: 'Ask about breakfast hours and dietary options', completed: false },
      { id: 'obj-hotel-luggage', description: 'Request early check-in or luggage assistance', completed: false }
    ],
    starterPrompts: [
      { text: 'Good afternoon, I have a reservation for three nights under my name.', translation: 'Good afternoon, I have a reservation for three nights under my name.' },
      { text: 'Could you tell me the Wi-Fi password and breakfast hours?', translation: 'Could you tell me the Wi-Fi password and breakfast hours?' },
      { text: 'Would it be possible to get a room on a higher floor with a quiet view?', translation: 'Would it be possible to get a room on a higher floor with a quiet view?' }
    ]
  },
  {
    id: 'airport-customs',
    title: 'Airport Customs & Immigration',
    category: 'travel',
    level: 'B1',
    icon: 'Compass',
    color: 'blue',
    imageUrl: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=1000&q=85',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    partnerName: 'Officer Miller',
    partnerRole: 'Border Control Officer',
    userRole: 'Arriving International Traveler',
    setting: 'Sleek international airport terminal passport control counter',
    situation: 'You are passing through border control. Answer questions regarding your trip purpose, duration of stay, accommodation, and return ticket.',
    objectives: [
      { id: 'obj-passport', description: 'Present your passport and state the purpose of travel', completed: false },
      { id: 'obj-duration', description: 'State the exact duration and planned cities of your visit', completed: false },
      { id: 'obj-hotel-show', description: 'Provide your accommodation address and contact details', completed: false },
      { id: 'obj-customs', description: 'Declare whether you have goods or currency to declare', completed: false }
    ],
    starterPrompts: [
      { text: 'Good day officer. Here is my passport and entry declaration card.', translation: 'Good day officer. Here is my passport and entry declaration card.' },
      { text: 'I am here on vacation for two weeks visiting historical sites.', translation: 'I am here on vacation for two weeks visiting historical sites.' },
      { text: 'I will be staying at the Grand Hotel in the city center.', translation: 'I will be staying at the Grand Hotel in the city center.' }
    ]
  },
  {
    id: 'market-bargain',
    title: 'Artisan Farmers Market',
    category: 'daily',
    level: 'A2',
    icon: 'ShoppingBag',
    color: 'emerald',
    imageUrl: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1000&q=85',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    partnerName: 'Mateo',
    partnerRole: 'Local Artisan Merchant',
    userRole: 'Shopper Looking for Handcrafted Goods',
    setting: 'A vibrant weekend open-air market with colorful stalls, fresh fruits, and hand-painted ceramics',
    situation: 'Browse handmade souvenirs, ask about local materials and production, and negotiate a bundle price.',
    objectives: [
      { id: 'obj-origin', description: 'Ask if products are handmade locally', completed: false },
      { id: 'obj-taste', description: 'Ask if you may sample or inspect an item', completed: false },
      { id: 'obj-bargain', description: 'Politely negotiate a bundle price for two items', completed: false },
      { id: 'obj-cash', description: 'Ask about cash versus card payment methods', completed: false }
    ],
    starterPrompts: [
      { text: 'These ceramic pieces look beautiful! Were they made locally?', translation: 'These ceramic pieces look beautiful! Were they made locally?' },
      { text: 'Can I try a small sample of this regional honey?', translation: 'Can I try a small sample of this regional honey?' },
      { text: 'If I take two of these bowls, could you do a bundle discount?', translation: 'If I take two of these bowls, could you do a bundle discount?' }
    ]
  },
  {
    id: 'casual-friend',
    title: 'Catching Up with a Friend',
    category: 'social',
    level: 'B1',
    icon: 'MessageSquareHeart',
    color: 'rose',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=85',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    partnerName: 'Sofia',
    partnerRole: 'University Friend',
    userRole: 'Close Friend Reconnecting',
    setting: 'A vibrant outdoor café patio overlooking a city park on a sunny afternoon',
    situation: 'Meet up with your friend to discuss weekend trips, new personal projects, favorite movies, and future travel plans.',
    objectives: [
      { id: 'obj-weekend', description: 'Share what you have been doing recently', completed: false },
      { id: 'obj-listen', description: 'React warmly with natural conversational expressions', completed: false },
      { id: 'obj-opinion', description: 'Exchange opinions on music, movies, or books', completed: false },
      { id: 'obj-future', description: 'Propose an idea for your next hangout together', completed: false }
    ],
    starterPrompts: [
      { text: 'It is so great to see you! How have things been going lately?', translation: 'It is so great to see you! How have things been going lately?' },
      { text: 'I finally started that photography course I told you about.', translation: 'I finally started that photography course I told you about.' },
      { text: 'We should definitely plan a road trip together next month!', translation: 'We should definitely plan a road trip together next month!' }
    ]
  },
  {
    id: 'apartment-renting',
    title: 'Apartment Hunting & Tour',
    category: 'daily',
    level: 'B2',
    icon: 'Briefcase',
    color: 'teal',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=85',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    partnerName: 'Claire',
    partnerRole: 'Property Landlord & Agent',
    userRole: 'Prospective Tenant',
    setting: 'A bright, minimalist European loft apartment with large windows and hardwood floors',
    situation: 'Tour a candidate apartment. Inquire about utility bills, deposit requirements, heating, pets, and public transit links.',
    objectives: [
      { id: 'obj-apt-features', description: 'Ask about square footage, natural light, and quietness', completed: false },
      { id: 'obj-apt-utilities', description: 'Clarify whether heating, water, and internet are included in the rent', completed: false },
      { id: 'obj-apt-lease', description: 'Ask about the lease duration and security deposit terms', completed: false },
      { id: 'obj-apt-transit', description: 'Inquire about grocery stores and metro connections nearby', completed: false }
    ],
    starterPrompts: [
      { text: 'Thank you for showing me the apartment. The natural light here is fantastic.', translation: 'Thank you for showing me the apartment. The natural light here is fantastic.' },
      { text: 'Are heating and municipal charges included in the monthly rent?', translation: 'Are heating and municipal charges included in the monthly rent?' },
      { text: 'How long is the standard lease term and what deposit is required?', translation: 'How long is the standard lease term and what deposit is required?' }
    ]
  },
  {
    id: 'tapas-bar',
    title: 'Tapas & Wine Bar Social',
    category: 'dining',
    level: 'A2',
    icon: 'UtensilsCrossed',
    color: 'orange',
    imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1000&q=85',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80',
    partnerName: 'Carlos',
    partnerRole: 'Tavern Host & Bartender',
    userRole: 'Evening Guest Looking for Local Flavors',
    setting: 'A lively, candlelit bodega with oak barrels, hanging curing hams, and background Spanish guitar',
    situation: 'Step up to a bustling bar. Order regional small plates (tapas), ask for a local red wine recommendation, and chat with the host.',
    objectives: [
      { id: 'obj-tapas-order', description: 'Order two popular regional tapas plates', completed: false },
      { id: 'obj-wine-rec', description: 'Ask for a dry red or crisp white wine suggestion', completed: false },
      { id: 'obj-specialty', description: 'Ask what dish the tavern is most famous for', completed: false },
      { id: 'obj-bill', description: 'Ask for the bill and leave a friendly tip', completed: false }
    ],
    starterPrompts: [
      { text: 'Good evening! What are your two most popular tapas dishes tonight?', translation: 'Good evening! What are your two most popular tapas dishes tonight?' },
      { text: 'Can you recommend a glass of local wine to pair with the cheeses?', translation: 'Can you recommend a glass of local wine to pair with the cheeses?' },
      { text: 'Everything was delicious! May we please have the bill?', translation: 'Everything was delicious! May we please have the bill?' }
    ]
  },
  {
    id: 'restaurant-dinner',
    title: 'Fine Dining & Sommelier',
    category: 'dining',
    level: 'B1',
    icon: 'UtensilsCrossed',
    color: 'orange',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    partnerName: 'Antoine',
    partnerRole: 'Head Waiter & Sommelier',
    userRole: 'Dinner Guest Celebrating an Occasion',
    setting: 'An elegant dining room with ambient candlelight, crisp white tablecloths, and classical music',
    situation: 'Enjoy a gourmet multi-course dinner. Ask about seasonal chef specials, wine pairings, and dietary accommodations.',
    objectives: [
      { id: 'obj-table-menu', description: 'Confirm reservation and ask for the chef tasting menu', completed: false },
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
    id: 'doctor-visit',
    title: 'Medical Clinic & Pharmacy',
    category: 'emergency',
    level: 'B1',
    icon: 'Stethoscope',
    color: 'red',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=85',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80',
    partnerName: 'Dr. Clara',
    partnerRole: 'Attending Physician',
    userRole: 'Patient Seeking Consultation',
    setting: 'A quiet, modern consultation room in a city healthcare clinic',
    situation: 'Explain symptoms of a throat ache and fever that started three days ago. Ask about dosages, allergies, and preventive care.',
    objectives: [
      { id: 'obj-symptoms', description: 'Describe symptoms, onset timing, and pain levels', completed: false },
      { id: 'obj-allergies', description: 'Clarify any medication allergies or pre-existing conditions', completed: false },
      { id: 'obj-dosage', description: 'Ask how often and when to take prescribed medicine', completed: false },
      { id: 'obj-receipt', description: 'Request a medical certificate or pharmacy prescription receipt', completed: false }
    ],
    starterPrompts: [
      { text: 'Doctor, I have had a severe throat ache and slight fever since Tuesday.', translation: 'Doctor, I have had a severe throat ache and slight fever since Tuesday.' },
      { text: 'I am allergic to penicillin, is this medication safe for me?', translation: 'I am allergic to penicillin, is this medication safe for me?' },
      { text: 'How many times a day should I take this syrup, and before or after meals?', translation: 'How many times a day should I take this syrup, and before or after meals?' }
    ]
  },
  {
    id: 'taxi-rideshare',
    title: 'City Taxi & Navigation',
    category: 'travel',
    level: 'A1',
    icon: 'Compass',
    color: 'amber',
    imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1000&q=85',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
    partnerName: 'Marco',
    partnerRole: 'City Cab Driver',
    userRole: 'Passenger in a Hurry',
    setting: 'Inside a classic yellow taxi driving through illuminated city streets at dusk',
    situation: 'Hail a taxi at a busy station. Tell the driver your destination address, request a route that avoids rush-hour traffic, and ask for a receipt.',
    objectives: [
      { id: 'obj-taxi-dest', description: 'State your destination street name and landmark clearly', completed: false },
      { id: 'obj-taxi-time', description: 'Ask estimated travel time to reach before your appointment', completed: false },
      { id: 'obj-taxi-ac', description: 'Politely ask to turn on the air conditioning or adjust window', completed: false },
      { id: 'obj-taxi-receipt', description: 'Pay the meter fare and request a printed receipt', completed: false }
    ],
    starterPrompts: [
      { text: 'Hello! Could you take me to the central museum on Madison Avenue?', translation: 'Hello! Could you take me to the central museum on Madison Avenue?' },
      { text: 'How long do you think it will take with current traffic?', translation: 'How long do you think it will take with current traffic?' },
      { text: 'Could I please pay by credit card and get a receipt?', translation: 'Could I please pay by credit card and get a receipt?' }
    ]
  },
  {
    id: 'tech-pitch',
    title: 'Startup Pitch & Q&A',
    category: 'business',
    level: 'C1',
    icon: 'Briefcase',
    color: 'indigo',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=85',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    partnerName: 'Victoria Chen',
    partnerRole: 'Venture Partner & Investor',
    userRole: 'Tech Founder Pitching Seed Round',
    setting: 'A high-energy startup incubator boardroom with smart screens and whiteboard blueprints',
    situation: 'Pitch your AI product to venture capitalists. Defend market size metrics, unit economics, customer acquisition loops, and competitive moats.',
    objectives: [
      { id: 'obj-hook', description: 'Deliver a powerful 60-second problem statement and solution hook', completed: false },
      { id: 'obj-traction', description: 'Highlight month-over-month growth metrics and retention rates', completed: false },
      { id: 'obj-defensibility', description: 'Articulate your unfair advantage and technology moat', completed: false },
      { id: 'obj-terms', description: 'Confidently discuss funding valuation and use of capital', completed: false }
    ],
    starterPrompts: [
      { text: 'We are solving the multi-billion dollar problem of asynchronous cross-border voice latency.', translation: 'We are solving the multi-billion dollar problem of asynchronous cross-border voice latency.' },
      { text: 'Our user retention has increased 34% quarter-over-quarter through organic viral loops.', translation: 'Our user retention has increased 34% quarter-over-quarter through organic viral loops.' },
      { text: 'With this round of funding, we are doubling our core engineering team.', translation: 'With this round of funding, we are doubling our core engineering team.' }
    ]
  },
  {
    id: 'train-station',
    title: 'Central Train Station Tickets',
    category: 'travel',
    level: 'A1',
    icon: 'Compass',
    color: 'sky',
    imageUrl: 'https://images.unsplash.com/photo-1515165562839-978bbcf18277?auto=format&fit=crop&w=1000&q=85',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    partnerName: 'Stefan',
    partnerRole: 'Station Booking Agent',
    userRole: 'Traveler Catching High-Speed Rail',
    setting: 'A grand European central railway terminal with soaring arched glass ceilings and departure boards',
    situation: 'Buy a round-trip high-speed train ticket. Choose a window seat, inquire about luggage allowances, and find out which platform your train departs from.',
    objectives: [
      { id: 'obj-ticket-dest', description: 'Request a round-trip ticket to your destination city', completed: false },
      { id: 'obj-seat-pref', description: 'Request a window seat in a quiet coach', completed: false },
      { id: 'obj-platform', description: 'Ask for the departure platform number and departure time', completed: false },
      { id: 'obj-discount', description: 'Inquire if there are student, youth, or weekend discounts', completed: false }
    ],
    starterPrompts: [
      { text: 'Hello, I would like a round-trip ticket to Munich for tomorrow morning, please.', translation: 'Hello, I would like a round-trip ticket to Munich for tomorrow morning, please.' },
      { text: 'Is there a window seat available in the quiet carriage?', translation: 'Is there a window seat available in the quiet carriage?' },
      { text: 'Which platform does the 10:15 express train leave from?', translation: 'Which platform does the 10:15 express train leave from?' }
    ]
  },
  {
    id: 'french-bakery',
    title: 'Artisan Bakery & Patisserie',
    category: 'daily',
    level: 'A1',
    icon: 'ShoppingBag',
    color: 'amber',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=85',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    partnerName: 'Camille',
    partnerRole: 'Master Baker & Shopkeeper',
    userRole: 'Morning Bakery Customer',
    setting: 'A cozy neighborhood boulangerie with rows of freshly baked golden baguettes, tarts, and pain au chocolat',
    situation: 'Select fresh bread for breakfast. Ask which loaves just came out of the oven, order traditional pastries, and pay.',
    objectives: [
      { id: 'obj-bread-order', description: 'Order a traditional crusty baguette and two croissants', completed: false },
      { id: 'obj-freshness', description: 'Ask which items were baked this morning', completed: false },
      { id: 'obj-slice', description: 'Ask if the bakery can slice the sourdough loaf', completed: false },
      { id: 'obj-total', description: 'Ask for the total amount and pay with coins or card', completed: false }
    ],
    starterPrompts: [
      { text: 'Good morning! Could I please have a traditional baguette and two butter croissants?', translation: 'Good morning! Could I please have a traditional baguette and two butter croissants?' },
      { text: 'Which sourdough loaves just came out of the oven?', translation: 'Which sourdough loaves just came out of the oven?' },
      { text: 'Could you please slice this loaf for me?', translation: 'Could you please slice this loaf for me?' }
    ]
  },
  {
    id: 'museum-tour',
    title: 'Art Museum & Gallery Tour',
    category: 'social',
    level: 'B2',
    icon: 'GraduationCap',
    color: 'indigo',
    imageUrl: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1000&q=85',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    partnerName: 'Genevieve',
    partnerRole: 'Curator & Art Historian',
    userRole: 'Gallery Visitor & Art Enthusiast',
    setting: 'A pristine modern museum gallery featuring impressionist masterworks under soft skylights',
    situation: 'Discuss artistic techniques, historical context, and the symbolism behind classic masterpieces with a museum curator.',
    objectives: [
      { id: 'obj-art-meaning', description: 'Inquire about the symbolism and inspiration of a focal painting', completed: false },
      { id: 'obj-art-technique', description: 'Discuss brushwork, color palette, and lighting contrasts', completed: false },
      { id: 'obj-audio-guide', description: 'Ask for recommendations on the temporary exhibition hall', completed: false },
      { id: 'obj-reflection', description: 'Express a personal interpretation of the artist emotional intent', completed: false }
    ],
    starterPrompts: [
      { text: 'Could you tell me more about the historical context behind this masterpiece?', translation: 'Could you tell me more about the historical context behind this masterpiece?' },
      { text: 'The contrast of shadows and light in this gallery is striking.', translation: 'The contrast of shadows and light in this gallery is striking.' },
      { text: 'Which wing would you recommend visiting next for contemporary sculptures?', translation: 'Which wing would you recommend visiting next for contemporary sculptures?' }
    ]
  },
  {
    id: 'flight-boarding',
    title: 'Boarding a Flight & In-Flight Service',
    category: 'travel',
    level: 'A2',
    icon: 'Plane',
    color: 'sky',
    imageUrl: 'https://images.unsplash.com/photo-1540339832862-474599807836?auto=format&fit=crop&w=1000&q=85',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    partnerName: 'Charlotte',
    partnerRole: 'Senior Flight Attendant',
    userRole: 'International Airline Passenger',
    setting: 'Inside a wide-body international flight during boarding and cruising altitude',
    situation: 'Locate your assigned window seat, request assistance with overhead luggage stowage, and select your in-flight dinner service.',
    objectives: [
      { id: 'obj-seat-find', description: 'Confirm your seat number and aisle location', completed: false },
      { id: 'obj-luggage-help', description: 'Ask politely for room in the overhead compartment', completed: false },
      { id: 'obj-meal-choice', description: 'Order a warm meal and beverage with dietary preferences', completed: false },
      { id: 'obj-comfort-item', description: 'Request an extra blanket or noise-cancelling headphones', completed: false }
    ],
    starterPrompts: [
      { text: 'Excuse me, could you point me towards seat 14A?', translation: 'Excuse me, could you point me towards seat 14A?' },
      { text: 'Is there any space left in this overhead locker for my small trolley?', translation: 'Is there any space left in this overhead locker for my small trolley?' },
      { text: 'Could I please have sparkling water and the vegetarian meal?', translation: 'Could I please have sparkling water and the vegetarian meal?' }
    ]
  },
  {
    id: 'car-rental',
    title: 'Car Rental & Scenic Road Trip',
    category: 'travel',
    level: 'B1',
    icon: 'Car',
    color: 'amber',
    imageUrl: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1000&q=85',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    partnerName: 'Matteo',
    partnerRole: 'Airport Rental Fleet Manager',
    userRole: 'Traveler & Road Trip Driver',
    setting: 'A modern vehicle rental desk at the airport arrivals terminal with keys and maps',
    situation: 'Pick up your reserved SUV, review comprehensive insurance coverage, ask about toll transponders, and verify fuel return policies.',
    objectives: [
      { id: 'obj-reservation-check', description: 'Present confirmation voucher and international driving permit', completed: false },
      { id: 'obj-insurance-inquiry', description: 'Discuss collision damage waiver and zero-deductible options', completed: false },
      { id: 'obj-toll-system', description: 'Ask how automatic electronic toll passes work on highways', completed: false },
      { id: 'obj-fuel-policy', description: 'Clarify full-to-full fuel return requirements', completed: false }
    ],
    starterPrompts: [
      { text: 'Hello, I have a reservation under the name for a mid-size automatic SUV.', translation: 'Hello, I have a reservation under the name for a mid-size automatic SUV.' },
      { text: 'Does this rental rate include full comprehensive insurance with zero deductible?', translation: 'Does this rental rate include full comprehensive insurance with zero deductible?' },
      { text: 'Are highways in this region equipped with automatic electronic toll systems?', translation: 'Are highways in this region equipped with automatic electronic toll systems?' }
    ]
  },
  {
    id: 'salary-negotiation',
    title: 'Salary & Compensation Review',
    category: 'business',
    level: 'C1',
    icon: 'Briefcase',
    color: 'emerald',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80',
    partnerName: 'Evelyn Vance',
    partnerRole: 'Vice President of People Operations',
    userRole: 'High-Impact Senior Team Lead',
    setting: 'A modern corner executive office overlooking the metropolitan financial district',
    situation: 'Articulate your measurable contributions, cite market benchmarks, and negotiate base compensation, performance bonuses, and equity grants.',
    objectives: [
      { id: 'obj-value-pitch', description: 'Summarize key project outcomes and revenue milestones delivered this year', completed: false },
      { id: 'obj-market-comp', description: 'Cite competitive industry compensation ranges for your seniority', completed: false },
      { id: 'obj-equity-bonus', description: 'Propose a balanced split of performance bonus and equity vesting', completed: false },
      { id: 'obj-professional-close', description: 'Confirm next review steps in a collaborative executive tone', completed: false }
    ],
    starterPrompts: [
      { text: 'Thank you for making time today Evelyn. I would love to review my annual impact and discuss adjusting my compensation package.', translation: 'Thank you for making time today Evelyn. I would love to review my annual impact and discuss adjusting my compensation package.' },
      { text: 'Based on our team 40% growth and standard industry benchmarks, I am targeting a base salary adjustment to reflect those results.', translation: 'Based on our team 40% growth and standard industry benchmarks, I am targeting a base salary adjustment to reflect those results.' },
      { text: 'Could we explore combining an updated base salary with structured quarterly performance milestones?', translation: 'Could we explore combining an updated base salary with structured quarterly performance milestones?' }
    ]
  },
  {
    id: 'boutique-shopping',
    title: 'Designer Boutique & Fitting',
    category: 'daily',
    level: 'A2',
    icon: 'ShoppingBag',
    color: 'rose',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=85',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    partnerName: 'Camille',
    partnerRole: 'Personal Stylist & Fashion Advisor',
    userRole: 'Shopper Looking for a Smart Wardrobe',
    setting: 'An elegant designer apparel boutique with minimalist brass racks and velvet changing rooms',
    situation: 'Request specific sizes, ask for fashion advice on fabric quality, try on clothing items, and inquire about seasonal promotions.',
    objectives: [
      { id: 'obj-size-check', description: 'Ask for a different size or cut of a linen blazer', completed: false },
      { id: 'obj-fitting-room', description: 'Inquire about available fitting rooms and mirrors', completed: false },
      { id: 'obj-fabric-care', description: 'Ask how to care for delicate wool and silk fabrics', completed: false },
      { id: 'obj-tax-free', description: 'Ask if the shop provides duty-free VAT refund forms', completed: false }
    ],
    starterPrompts: [
      { text: 'Excuse me, do you have this structured jacket in a European size 38 or medium?', translation: 'Excuse me, do you have this structured jacket in a European size 38 or medium?' },
      { text: 'Could I try these two pairs of trousers on in the fitting room?', translation: 'Could I try these two pairs of trousers on in the fitting room?' },
      { text: 'Does this boutique offer international tax-free shopping for visitors?', translation: 'Does this boutique offer international tax-free shopping for visitors?' }
    ]
  },
  {
    id: 'networking-mixer',
    title: 'Rooftop Tech & Business Mixer',
    category: 'business',
    level: 'B2',
    icon: 'Users',
    color: 'violet',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=85',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    partnerName: 'Julian Rossi',
    partnerRole: 'Fintech Founder & Angel Investor',
    userRole: 'Tech Professional & New Attendee',
    setting: 'A panoramic rooftop terrace overlooking the illuminated city skyline at twilight',
    situation: 'Break the ice with fellow attendees, introduce your professional background, exchange LinkedIn contacts, and discuss emerging AI trends.',
    objectives: [
      { id: 'obj-icebreaker', description: 'Introduce yourself naturally to someone standing nearby', completed: false },
      { id: 'obj-elevator-pitch', description: 'Deliver a concise 30-second summary of your current focus', completed: false },
      { id: 'obj-industry-insight', description: 'Share an observation on AI-driven automation', completed: false },
      { id: 'obj-contact-exchange', description: 'Exchange contacts and agree to follow up for coffee', completed: false }
    ],
    starterPrompts: [
      { text: 'Good evening! That view of the skyline is incredible. Mind if I join you?', translation: 'Good evening! That view of the skyline is incredible. Mind if I join you?' },
      { text: 'I am currently building tools for real-time natural language coaching. What brings you to tonight event?', translation: 'I am currently building tools for real-time natural language coaching. What brings you to tonight event?' },
      { text: 'Let connect on LinkedIn — I would love to continue this conversation over a quick virtual coffee next week.', translation: 'Let connect on LinkedIn — I would love to continue this conversation over a quick virtual coffee next week.' }
    ]
  },
  {
    id: 'vineyard-tour',
    title: 'Tuscan Vineyard & Cellar Tasting',
    category: 'travel',
    level: 'B2',
    icon: 'Wine',
    color: 'amber',
    imageUrl: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1000&q=85',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    partnerName: 'Lorenzo',
    partnerRole: 'Third-Generation Estate Winemaker',
    userRole: 'Wine Enthusiast & Curious Traveler',
    setting: 'Sun-drenched hillside vineyards with centuries-old stone vaulted aging cellars',
    situation: 'Tour historic oak barrel cellars, discuss organic harvesting methods, and taste vintage reserve wines with the estate master.',
    objectives: [
      { id: 'obj-harvest-questions', description: 'Inquire about grape varietals and this year harvest conditions', completed: false },
      { id: 'obj-aging-process', description: 'Discuss the difference between French and Slavonian oak barrels', completed: false },
      { id: 'obj-tasting-notes', description: 'Identify aromas of dark cherry, leather, and minerality', completed: false },
      { id: 'obj-purchase-shipping', description: 'Inquire about purchasing a case with worldwide shipping', completed: false }
    ],
    starterPrompts: [
      { text: 'How has the warmer summer affected the acidity and sugar levels in this vintage?', translation: 'How has the warmer summer affected the acidity and sugar levels in this vintage?' },
      { text: 'The tannins on this reserve are remarkably smooth — how many months did it spend in oak barrels?', translation: 'The tannins on this reserve are remarkably smooth — how many months did it spend in oak barrels?' },
      { text: 'Do you offer temperature-controlled international shipping if I purchase a case?', translation: 'Do you offer temperature-controlled international shipping if I purchase a case?' }
    ]
  },
  {
    id: 'fitness-studio',
    title: 'Boutique Fitness Coaching & Wellness',
    category: 'daily',
    level: 'A2',
    icon: 'Activity',
    color: 'teal',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=85',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    partnerName: 'Maya',
    partnerRole: 'Certified Strength Coach & Physiologist',
    userRole: 'New Gym Member Setting Up a Routine',
    setting: 'A bright, Scandinavian-inspired boutique gym with natural timber and modern equipment',
    situation: 'Sign up for a studio membership, explain your personal fitness and flexibility goals, and learn proper machine adjustments.',
    objectives: [
      { id: 'obj-goals-discuss', description: 'Explain your focus on posture, stamina, and injury prevention', completed: false },
      { id: 'obj-schedule-session', description: 'Book a recurring weekly personal training time slot', completed: false },
      { id: 'obj-facility-tour', description: 'Ask about locker rooms, recovery saunas, and towel service', completed: false },
      { id: 'obj-nutrition-advice', description: 'Ask for simple hydration and post-workout protein tips', completed: false }
    ],
    starterPrompts: [
      { text: 'Hi Maya, I am looking to establish a sustainable 3-day weekly strength training routine.', translation: 'Hi Maya, I am looking to establish a sustainable 3-day weekly strength training routine.' },
      { text: 'Because I sit at a desk all day, my main priorities are improving posture and lower back mobility.', translation: 'Because I sit at a desk all day, my main priorities are improving posture and lower back mobility.' },
      { text: 'Could you walk me through the best warm-up routine before lifting weights?', translation: 'Could you walk me through the best warm-up routine before lifting weights?' }
    ]
  },
  {
    id: 'night-market',
    title: 'Street Food Night Market Discovery',
    category: 'daily',
    level: 'A1',
    icon: 'Utensils',
    color: 'orange',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=85',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    partnerName: 'Bao',
    partnerRole: 'Artisanal Street Food Chef',
    userRole: 'Hungry Night Market Explorer',
    setting: 'A vibrant open-air evening night market glowing with paper lanterns and sizzling woks',
    situation: 'Explore popular skewers and steamed dumplings, ask about spice heat levels, order fresh portions, and pay with small cash or QR code.',
    objectives: [
      { id: 'obj-dish-ask', description: 'Inquire about the house specialty dish at the stall', completed: false },
      { id: 'obj-spice-level', description: 'Ask for mild spice or sauce on the side', completed: false },
      { id: 'obj-order-portions', description: 'Order two skewers and a refreshing herbal tea', completed: false },
      { id: 'obj-payment-method', description: 'Ask if contactless mobile payment or cash is preferred', completed: false }
    ],
    starterPrompts: [
      { text: 'Everything smells delicious! What is your most popular specialty tonight?', translation: 'Everything smells delicious! What is your most popular specialty tonight?' },
      { text: 'Can you make this mild? I cannot handle too much chili.', translation: 'Can you make this mild? I cannot handle too much chili.' },
      { text: 'Could I get two portions to go, and do you take mobile payment?', translation: 'Could I get two portions to go, and do you take mobile payment?' }
    ]
  },
  {
    id: 'berlin-cafe',
    title: 'Berlin Café & Street Life',
    category: 'daily',
    level: 'A2',
    icon: 'Coffee',
    color: 'emerald',
    imageUrl: 'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?auto=format&fit=crop&w=1000&q=85',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    partnerName: 'Greta',
    partnerRole: 'Berlin Café Barista & Student',
    userRole: 'Traveler & German Learner',
    setting: 'A hip, bustling coffee shop in Berlin Mitte with vintage furniture and courtyard seating',
    situation: 'Practice your conversational German with zero fear. Order a Flat White, ask for recommendations on local indie art galleries, and pay.',
    objectives: [
      { id: 'obj-berlin-greet', description: 'Greet Greta politely and order your favorite coffee', completed: false },
      { id: 'obj-berlin-oat', description: 'Ask if oat milk is available (Hafermilch)', completed: false },
      { id: 'obj-berlin-art', description: 'Inquire about galleries or exhibitions nearby in Mitte', completed: false },
      { id: 'obj-berlin-pay', description: 'Ask to pay with EC-Karte or contactless mobile payment', completed: false }
    ],
    starterPrompts: [
      { text: 'Guten Tag! Ich hätte gerne einen Flat White mit Hafermilch, bitte.', translation: 'Guten Tag! Ich hätte gerne einen Flat White mit Hafermilch, bitte.' },
      { text: 'Können Sie mir eine nette Kunstgalerie hier in der Nähe empfehlen?', translation: 'Können Sie mir eine nette Kunstgalerie hier in der Nähe empfehlen?' },
      { text: 'Kann ich mit Karte oder kontaktlos bezahlen?', translation: 'Kann ich mit Karte oder kontaktlos bezahlen?' }
    ]
  },
  {
    id: 'university-seminar',
    title: 'University Seminar & Thesis Debate',
    category: 'education',
    level: 'B2',
    icon: 'GraduationCap',
    color: 'blue',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=85',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    partnerName: 'Prof. Laurent',
    partnerRole: 'Department Seminar Chair',
    userRole: 'Visiting Graduate Student',
    setting: 'A university seminar room with bookshelves, amphitheater seating, and academic discussion',
    situation: 'Participate in a university seminar discussion. Present your core thesis argument, defend your research methodology, and respond thoughtfully to academic counterarguments.',
    objectives: [
      { id: 'obj-thesis-summary', description: 'Present a concise summary of your research thesis', completed: false },
      { id: 'obj-method-defense', description: 'Explain your chosen analytical methodology and sources', completed: false },
      { id: 'obj-counterarg', description: 'Politely address a constructive counterargument raised by the professor', completed: false },
      { id: 'obj-academic-vocab', description: 'Use formal academic discourse connectors and terminology', completed: false }
    ],
    starterPrompts: [
      { text: 'In our research, we examined the cultural impact of modern language learning.', translation: 'In our research, we examined the cultural impact of modern language learning.' },
      { text: 'While I understand the counter-argument, the empirical data highlights a clear trend.', translation: 'While I understand the counter-argument, the empirical data highlights a clear trend.' },
      { text: 'Could we examine the comparative findings from the second case study?', translation: 'Could we examine the comparative findings from the second case study?' }
    ]
  },
  {
    id: 'study-abroad-housing',
    title: 'Study Abroad Campus & Roommate Chat',
    category: 'education',
    level: 'A2',
    icon: 'BookOpen',
    color: 'emerald',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=85',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    partnerName: 'Mateo',
    partnerRole: 'International Exchange Roommate',
    userRole: 'New International Student',
    setting: 'A sunny university dorm common area on orientation day',
    situation: 'You just arrived for your study abroad semester. Meet your international roommate, introduce your background and major, agree on shared dorm chores, and plan a weekend campus tour.',
    objectives: [
      { id: 'obj-dorm-intro', description: 'Introduce your name, hometown, and field of study', completed: false },
      { id: 'obj-dorm-habits', description: 'Discuss morning/evening study routines and quiet hours', completed: false },
      { id: 'obj-dorm-chores', description: 'Propose a fair rotation for kitchen cleanup and grocery shopping', completed: false },
      { id: 'obj-dorm-campus', description: 'Plan to attend the campus student club fair together this weekend', completed: false }
    ],
    starterPrompts: [
      { text: 'Hi! So great to finally meet you in person. I am studying international relations.', translation: 'Hi! So great to finally meet you in person. I am studying international relations.' },
      { text: 'I usually study in the evenings, so quiet hours around 10 PM work great for me.', translation: 'I usually study in the evenings, so quiet hours around 10 PM work great for me.' },
      { text: 'Should we make a quick list for shared kitchen supplies and groceries?', translation: 'Should we make a quick list for shared kitchen supplies and groceries?' }
    ]
  },
  {
    id: 'cefr-oral-exam',
    title: 'CEFR Official Oral Examination',
    category: 'education',
    level: 'B1',
    icon: 'Award',
    color: 'amber',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000&q=85',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80',
    partnerName: 'Madame Dubois',
    partnerRole: 'Certified CEFR Oral Examiner',
    userRole: 'Candidate Taking Speaking Test',
    setting: 'A formal language institute examination office with recording equipment',
    situation: 'Practice for your official CEFR speaking assessment (Goethe-Zertifikat, DELE, DELF, JLPT oral, IELTS speaking). Express opinions, justify viewpoints on social trends, and describe personal experiences with confidence.',
    objectives: [
      { id: 'obj-exam-intro', description: 'Give a structured self-introduction detailing goals and milestones', completed: false },
      { id: 'obj-exam-opinion', description: 'Express and justify your opinion on a current social or cultural topic', completed: false },
      { id: 'obj-exam-experience', description: 'Narrate a memorable past challenge and what you learned from it', completed: false },
      { id: 'obj-exam-clarify', description: 'Ask the examiner to clarify or rephrase an advanced question if needed', completed: false }
    ],
    starterPrompts: [
      { text: 'Good morning, Madame Examiner. I am ready to begin the speaking section.', translation: 'Good morning, Madame Examiner. I am ready to begin the speaking section.' },
      { text: 'In my personal experience, language immersion accelerates fluency tremendously.', translation: 'In my personal experience, language immersion accelerates fluency tremendously.' },
      { text: 'Could you please rephrase that question with an example?', translation: 'Could you please rephrase that question with an example?' }
    ]
  },
  {
    id: 'academic-advising',
    title: 'Academic Advising & Course Registration',
    category: 'education',
    level: 'B2',
    icon: 'Library',
    color: 'indigo',
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1000&q=85',
    partnerAvatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    partnerName: 'Dr. Fischer',
    partnerRole: 'University Academic Advisor',
    userRole: 'Undergraduate Student Planning Semester',
    setting: 'An academic dean office lined with journals, university course catalogs, and diploma certificates',
    situation: 'Meet with your university academic advisor to finalize your upcoming semester curriculum. Inquire about prerequisite waivers, credit transfers, and research internships.',
    objectives: [
      { id: 'obj-adv-goals', description: 'Explain your graduation timeline and desired course load', completed: false },
      { id: 'obj-adv-prereq', description: 'Inquire about waiving a prerequisite course based on prior coursework', completed: false },
      { id: 'obj-adv-intern', description: 'Ask for advice on university-accredited summer research opportunities', completed: false },
      { id: 'obj-adv-schedule', description: 'Confirm your balanced weekly class and laboratory schedule', completed: false }
    ],
    starterPrompts: [
      { text: 'Good afternoon, Dr. Fischer. I would like to review my proposed schedule for next term.', translation: 'Good afternoon, Dr. Fischer. I would like to review my proposed schedule for next term.' },
      { text: 'I completed an equivalent statistics course last year; could I apply for credit transfer?', translation: 'I completed an equivalent statistics course last year; could I apply for credit transfer?' },
      { text: 'Are there faculty openings for undergraduate research assistants in the language lab?', translation: 'Are there faculty openings for undergraduate research assistants in the language lab?' }
    ]
  }
];
