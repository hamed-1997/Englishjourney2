// ENGLISH JOURNEY — Full 180-Day Curriculum Backbone
// Fixed roadmap: day/stage/topic/grammar/goal are predefined and never change.
// The app generates each day's concrete Steps from this data (see buildSteps in app.js).

const CURRICULUM_DAYS = [
  {
    "day": 1,
    "stage": 1,
    "stageTheme": "Getting Started",
    "cefr": "A2",
    "topic": "Introducing Yourself",
    "grammarFocus": "Verb to be, subject pronouns, basic sentence structure",
    "communicationGoal": "Introduce yourself and give basic personal information",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 2,
    "stage": 1,
    "stageTheme": "Getting Started",
    "cefr": "A2",
    "topic": "Personal Information",
    "grammarFocus": "Wh- questions (What, Where, When, Who, Why, How)",
    "communicationGoal": "Ask and answer basic questions about personal information",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 3,
    "stage": 1,
    "stageTheme": "Getting Started",
    "cefr": "A2",
    "topic": "Daily Routine",
    "grammarFocus": "Present Simple",
    "communicationGoal": "Describe a normal day",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 4,
    "stage": 1,
    "stageTheme": "Getting Started",
    "cefr": "A2",
    "topic": "Time and Schedules",
    "grammarFocus": "Prepositions of time (at, on, in)",
    "communicationGoal": "Talk about times and schedules",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 5,
    "stage": 1,
    "stageTheme": "Getting Started",
    "cefr": "A2",
    "topic": "Likes and Dislikes",
    "grammarFocus": "like/love/hate + noun/gerund",
    "communicationGoal": "Express preferences",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 6,
    "stage": 1,
    "stageTheme": "Getting Started",
    "cefr": "A2",
    "topic": "My Typical Day",
    "grammarFocus": "Present Simple review",
    "communicationGoal": "Combine personal information, routine and preferences",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Shadowing",
      "Writing"
    ],
    "isChallenge": true
  },
  {
    "day": 7,
    "stage": 2,
    "stageTheme": "Family and Social Life",
    "cefr": "A2",
    "topic": "Family",
    "grammarFocus": "Possessive adjectives and possessive forms",
    "communicationGoal": "Describe family members",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 8,
    "stage": 2,
    "stageTheme": "Family and Social Life",
    "cefr": "A2",
    "topic": "Describing People",
    "grammarFocus": "Adjectives and basic adjective order",
    "communicationGoal": "Describe appearance and personality",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 9,
    "stage": 2,
    "stageTheme": "Family and Social Life",
    "cefr": "A2",
    "topic": "Friends",
    "grammarFocus": "Present Simple review",
    "communicationGoal": "Talk about friends and relationships",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 10,
    "stage": 2,
    "stageTheme": "Family and Social Life",
    "cefr": "A2",
    "topic": "Free Time",
    "grammarFocus": "Adverbs of frequency",
    "communicationGoal": "Talk about how often activities happen",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 11,
    "stage": 2,
    "stageTheme": "Family and Social Life",
    "cefr": "A2",
    "topic": "Invitations",
    "grammarFocus": "Would you like...? / Let's... / How about...?",
    "communicationGoal": "Invite someone and respond naturally",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 12,
    "stage": 2,
    "stageTheme": "Family and Social Life",
    "cefr": "A2",
    "topic": "Social Introduction Challenge",
    "grammarFocus": "Review",
    "communicationGoal": "Hold a complete basic social conversation",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Shadowing",
      "Writing"
    ],
    "isChallenge": true
  },
  {
    "day": 13,
    "stage": 3,
    "stageTheme": "Home and Neighborhood",
    "cefr": "A2",
    "topic": "My Home",
    "grammarFocus": "There is / There are",
    "communicationGoal": "Describe a home",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 14,
    "stage": 3,
    "stageTheme": "Home and Neighborhood",
    "cefr": "A2",
    "topic": "Rooms and Furniture",
    "grammarFocus": "Prepositions of place",
    "communicationGoal": "Describe where things are",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 15,
    "stage": 3,
    "stageTheme": "Home and Neighborhood",
    "cefr": "A2",
    "topic": "My Neighborhood",
    "grammarFocus": "There is / There are (review)",
    "communicationGoal": "Describe the local area",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 16,
    "stage": 3,
    "stageTheme": "Home and Neighborhood",
    "cefr": "A2",
    "topic": "Places Around Me",
    "grammarFocus": "Can / Can't",
    "communicationGoal": "Talk about available facilities",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 17,
    "stage": 3,
    "stageTheme": "Home and Neighborhood",
    "cefr": "A2",
    "topic": "Asking for Directions",
    "grammarFocus": "Imperatives",
    "communicationGoal": "Ask for directions",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 18,
    "stage": 3,
    "stageTheme": "Home and Neighborhood",
    "cefr": "A2",
    "topic": "Finding Your Way",
    "grammarFocus": "Review",
    "communicationGoal": "Complete a realistic directions conversation",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Shadowing",
      "Writing"
    ],
    "isChallenge": true
  },
  {
    "day": 19,
    "stage": 4,
    "stageTheme": "Shopping and Clothes",
    "cefr": "A2",
    "topic": "Clothes Shopping",
    "grammarFocus": "This / That / These / Those",
    "communicationGoal": "Identify and ask about clothing",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 20,
    "stage": 4,
    "stageTheme": "Shopping and Clothes",
    "cefr": "A2",
    "topic": "Sizes and Colors",
    "grammarFocus": "Adjectives",
    "communicationGoal": "Ask about size, color and appearance",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 21,
    "stage": 4,
    "stageTheme": "Shopping and Clothes",
    "cefr": "A2",
    "topic": "Prices and Payment",
    "grammarFocus": "How much / How many",
    "communicationGoal": "Ask about prices and quantities",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 22,
    "stage": 4,
    "stageTheme": "Shopping and Clothes",
    "cefr": "A2",
    "topic": "Trying Clothes On",
    "grammarFocus": "Can / Could for polite requests",
    "communicationGoal": "Ask to try something on and ask for help",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 23,
    "stage": 4,
    "stageTheme": "Shopping and Clothes",
    "cefr": "A2",
    "topic": "Returning an Item",
    "grammarFocus": "Past Simple",
    "communicationGoal": "Explain a purchase problem",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 24,
    "stage": 4,
    "stageTheme": "Shopping and Clothes",
    "cefr": "A2",
    "topic": "Shopping Challenge",
    "grammarFocus": "Integrated review",
    "communicationGoal": "Complete a realistic clothing-shopping role-play",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Shadowing",
      "Writing"
    ],
    "isChallenge": true
  },
  {
    "day": 25,
    "stage": 5,
    "stageTheme": "Food and Restaurants",
    "cefr": "A2",
    "topic": "Food Preferences",
    "grammarFocus": "Countable / Uncountable nouns",
    "communicationGoal": "Talk about food preferences",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 26,
    "stage": 5,
    "stageTheme": "Food and Restaurants",
    "cefr": "A2",
    "topic": "At a Restaurant",
    "grammarFocus": "Some / Any",
    "communicationGoal": "Discuss available food",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 27,
    "stage": 5,
    "stageTheme": "Food and Restaurants",
    "cefr": "A2",
    "topic": "Ordering Food",
    "grammarFocus": "Would like",
    "communicationGoal": "Order food politely",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 28,
    "stage": 5,
    "stageTheme": "Food and Restaurants",
    "cefr": "A2",
    "topic": "Cooking",
    "grammarFocus": "Imperatives",
    "communicationGoal": "Explain a simple recipe",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 29,
    "stage": 5,
    "stageTheme": "Food and Restaurants",
    "cefr": "A2",
    "topic": "Restaurant Problems",
    "grammarFocus": "Past Simple",
    "communicationGoal": "Explain a problem with an order",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 30,
    "stage": 5,
    "stageTheme": "Food and Restaurants",
    "cefr": "A2",
    "topic": "Checkpoint — Review & Connect",
    "grammarFocus": "Integrated review",
    "communicationGoal": "Blend recent topics into one natural conversation: Getting Started, Family and Social Life, Home and Neighborhood, Shopping and Clothes, Food and Restaurants.",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Shadowing",
      "Writing"
    ],
    "isChallenge": true,
    "isCheckpoint": true,
    "reviewStages": [
      1,
      2,
      3,
      4,
      5
    ],
    "originalTopic": "Restaurant Challenge"
  },
  {
    "day": 31,
    "stage": 6,
    "stageTheme": "Transportation",
    "cefr": "A2+",
    "topic": "Public Transportation",
    "grammarFocus": "Present Simple",
    "communicationGoal": "Talk about buses, trains and public transport",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 32,
    "stage": 6,
    "stageTheme": "Transportation",
    "cefr": "A2+",
    "topic": "Bus and Train",
    "grammarFocus": "Question forms",
    "communicationGoal": "Ask for transportation information",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 33,
    "stage": 6,
    "stageTheme": "Transportation",
    "cefr": "A2+",
    "topic": "Tickets",
    "grammarFocus": "Can / Could",
    "communicationGoal": "Buy a ticket",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 34,
    "stage": 6,
    "stageTheme": "Transportation",
    "cefr": "A2+",
    "topic": "Delays",
    "grammarFocus": "Present Continuous",
    "communicationGoal": "Talk about current transportation problems",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 35,
    "stage": 6,
    "stageTheme": "Transportation",
    "cefr": "A2+",
    "topic": "Getting Around",
    "grammarFocus": "Prepositions",
    "communicationGoal": "Explain how to get somewhere",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 36,
    "stage": 6,
    "stageTheme": "Transportation",
    "cefr": "A2+",
    "topic": "Transportation Challenge",
    "grammarFocus": "Review",
    "communicationGoal": "Complete a transportation scenario",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Shadowing",
      "Writing"
    ],
    "isChallenge": true
  },
  {
    "day": 37,
    "stage": 7,
    "stageTheme": "Money and Banking",
    "cefr": "A2+",
    "topic": "Money and Prices",
    "grammarFocus": "Numbers and quantifiers",
    "communicationGoal": "Talk about money and prices",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 38,
    "stage": 7,
    "stageTheme": "Money and Banking",
    "cefr": "A2+",
    "topic": "Payments",
    "grammarFocus": "Can / Could",
    "communicationGoal": "Ask about payment methods",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 39,
    "stage": 7,
    "stageTheme": "Money and Banking",
    "cefr": "A2+",
    "topic": "Banking",
    "grammarFocus": "Present Simple",
    "communicationGoal": "Talk about everyday banking",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 40,
    "stage": 7,
    "stageTheme": "Money and Banking",
    "cefr": "A2+",
    "topic": "Bank Problems",
    "grammarFocus": "Past Simple",
    "communicationGoal": "Explain a banking problem",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 41,
    "stage": 7,
    "stageTheme": "Money and Banking",
    "cefr": "A2+",
    "topic": "Saving Money",
    "grammarFocus": "Should",
    "communicationGoal": "Give advice about saving money",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 42,
    "stage": 7,
    "stageTheme": "Money and Banking",
    "cefr": "A2+",
    "topic": "Banking Challenge",
    "grammarFocus": "Integrated review",
    "communicationGoal": "Complete a practical banking scenario",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Shadowing",
      "Writing"
    ],
    "isChallenge": true
  },
  {
    "day": 43,
    "stage": 8,
    "stageTheme": "Workplace Basics",
    "cefr": "A2+",
    "topic": "My Job",
    "grammarFocus": "Present Simple",
    "communicationGoal": "Describe your job",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 44,
    "stage": 8,
    "stageTheme": "Workplace Basics",
    "cefr": "A2+",
    "topic": "Work Responsibilities",
    "grammarFocus": "Have to / Need to",
    "communicationGoal": "Talk about work responsibilities",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 45,
    "stage": 8,
    "stageTheme": "Workplace Basics",
    "cefr": "A2+",
    "topic": "Daily Work",
    "grammarFocus": "Present Simple vs Present Continuous",
    "communicationGoal": "Describe daily work tasks",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 46,
    "stage": 8,
    "stageTheme": "Workplace Basics",
    "cefr": "A2+",
    "topic": "Workplace Requests",
    "grammarFocus": "Could / Would",
    "communicationGoal": "Make polite requests at work",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 47,
    "stage": 8,
    "stageTheme": "Workplace Basics",
    "cefr": "A2+",
    "topic": "Work Experience",
    "grammarFocus": "Present Perfect",
    "communicationGoal": "Talk about work experience",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 48,
    "stage": 8,
    "stageTheme": "Workplace Basics",
    "cefr": "A2+",
    "topic": "Workplace Challenge",
    "grammarFocus": "Integrated review",
    "communicationGoal": "Handle a basic workplace conversation",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Shadowing",
      "Writing"
    ],
    "isChallenge": true
  },
  {
    "day": 49,
    "stage": 9,
    "stageTheme": "Health",
    "cefr": "A2+",
    "topic": "Body and Symptoms",
    "grammarFocus": "Have / Have got",
    "communicationGoal": "Describe symptoms",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 50,
    "stage": 9,
    "stageTheme": "Health",
    "cefr": "A2+",
    "topic": "At the Doctor",
    "grammarFocus": "Present Simple",
    "communicationGoal": "Explain a health problem",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 51,
    "stage": 9,
    "stageTheme": "Health",
    "cefr": "A2+",
    "topic": "Giving Advice",
    "grammarFocus": "Should / Shouldn't",
    "communicationGoal": "Give basic advice",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 52,
    "stage": 9,
    "stageTheme": "Health",
    "cefr": "A2+",
    "topic": "Medicine",
    "grammarFocus": "Must / Have to",
    "communicationGoal": "Understand instructions and obligations",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 53,
    "stage": 9,
    "stageTheme": "Health",
    "cefr": "A2+",
    "topic": "Past Health Problems",
    "grammarFocus": "Past Simple",
    "communicationGoal": "Describe a previous problem",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 54,
    "stage": 9,
    "stageTheme": "Health",
    "cefr": "A2+",
    "topic": "Doctor Challenge",
    "grammarFocus": "Review",
    "communicationGoal": "Complete a doctor-patient simulation",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Shadowing",
      "Writing"
    ],
    "isChallenge": true
  },
  {
    "day": 55,
    "stage": 10,
    "stageTheme": "City and Directions",
    "cefr": "A2+",
    "topic": "My City",
    "grammarFocus": "Comparatives",
    "communicationGoal": "Compare places",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 56,
    "stage": 10,
    "stageTheme": "City and Directions",
    "cefr": "A2+",
    "topic": "Places in the City",
    "grammarFocus": "Superlatives",
    "communicationGoal": "Describe the best/biggest/closest places",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 57,
    "stage": 10,
    "stageTheme": "City and Directions",
    "cefr": "A2+",
    "topic": "Asking for Directions",
    "grammarFocus": "Question forms",
    "communicationGoal": "Ask for directions naturally",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 58,
    "stage": 10,
    "stageTheme": "City and Directions",
    "cefr": "A2+",
    "topic": "Giving Directions",
    "grammarFocus": "Imperatives and sequencing",
    "communicationGoal": "Give clear directions",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 59,
    "stage": 10,
    "stageTheme": "City and Directions",
    "cefr": "A2+",
    "topic": "Making Plans in the City",
    "grammarFocus": "Going to",
    "communicationGoal": "Make plans",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 60,
    "stage": 10,
    "stageTheme": "City and Directions",
    "cefr": "A2+",
    "topic": "Checkpoint — Review & Connect",
    "grammarFocus": "Review",
    "communicationGoal": "Blend recent topics into one natural conversation: Transportation, Money and Banking, Workplace Basics, Health, City and Directions.",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Shadowing",
      "Writing"
    ],
    "isChallenge": true,
    "isCheckpoint": true,
    "reviewStages": [
      6,
      7,
      8,
      9,
      10
    ],
    "originalTopic": "City Challenge"
  },
  {
    "day": 61,
    "stage": 11,
    "stageTheme": "Technology",
    "cefr": "B1",
    "topic": "Phones and Apps",
    "grammarFocus": "Present Simple",
    "communicationGoal": "Talk about phones and apps",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 62,
    "stage": 11,
    "stageTheme": "Technology",
    "cefr": "B1",
    "topic": "Internet Problems",
    "grammarFocus": "Present Continuous",
    "communicationGoal": "Describe current internet problems",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 63,
    "stage": 11,
    "stageTheme": "Technology",
    "cefr": "B1",
    "topic": "Online Services",
    "grammarFocus": "Present Perfect (introduction)",
    "communicationGoal": "Talk about online services used",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 64,
    "stage": 11,
    "stageTheme": "Technology",
    "cefr": "B1",
    "topic": "Digital Communication",
    "grammarFocus": "Modal verbs",
    "communicationGoal": "Discuss digital communication habits",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 65,
    "stage": 11,
    "stageTheme": "Technology",
    "cefr": "B1",
    "topic": "Technology Habits",
    "grammarFocus": "Used to",
    "communicationGoal": "Compare past and present tech habits",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 66,
    "stage": 11,
    "stageTheme": "Technology",
    "cefr": "B1",
    "topic": "Technology Challenge",
    "grammarFocus": "Integrated review",
    "communicationGoal": "Discuss technology and personal habits",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Shadowing",
      "Writing"
    ],
    "isChallenge": true
  },
  {
    "day": 67,
    "stage": 12,
    "stageTheme": "Meetings",
    "cefr": "B1",
    "topic": "Starting a Meeting",
    "grammarFocus": "Meeting language + Present Perfect",
    "communicationGoal": "Open and structure a meeting",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 68,
    "stage": 12,
    "stageTheme": "Meetings",
    "cefr": "B1",
    "topic": "Giving Updates",
    "grammarFocus": "Present Perfect",
    "communicationGoal": "Give a status update",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 69,
    "stage": 12,
    "stageTheme": "Meetings",
    "cefr": "B1",
    "topic": "Asking Questions",
    "grammarFocus": "Question forms",
    "communicationGoal": "Ask clarifying questions in a meeting",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 70,
    "stage": 12,
    "stageTheme": "Meetings",
    "cefr": "B1",
    "topic": "Agreeing and Disagreeing",
    "grammarFocus": "So / Neither + agreement structures",
    "communicationGoal": "Agree and disagree in a meeting",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 71,
    "stage": 12,
    "stageTheme": "Meetings",
    "cefr": "B1",
    "topic": "Making Suggestions",
    "grammarFocus": "Could / Should",
    "communicationGoal": "Make suggestions in a meeting",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 72,
    "stage": 12,
    "stageTheme": "Meetings",
    "cefr": "B1",
    "topic": "Meeting Simulation",
    "grammarFocus": "Integrated review",
    "communicationGoal": "Participate in a basic professional meeting",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Shadowing",
      "Writing"
    ],
    "isChallenge": true
  },
  {
    "day": 73,
    "stage": 13,
    "stageTheme": "Travel",
    "cefr": "B1",
    "topic": "Planning a Trip",
    "grammarFocus": "Going to",
    "communicationGoal": "Talk about travel plans",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 74,
    "stage": 13,
    "stageTheme": "Travel",
    "cefr": "B1",
    "topic": "At the Airport",
    "grammarFocus": "Present Continuous for arrangements",
    "communicationGoal": "Handle basic airport situations",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 75,
    "stage": 13,
    "stageTheme": "Travel",
    "cefr": "B1",
    "topic": "Hotel Check-in",
    "grammarFocus": "Can / Could",
    "communicationGoal": "Check into a hotel",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 76,
    "stage": 13,
    "stageTheme": "Travel",
    "cefr": "B1",
    "topic": "Hotel Problems",
    "grammarFocus": "There is / There are",
    "communicationGoal": "Explain accommodation problems",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 77,
    "stage": 13,
    "stageTheme": "Travel",
    "cefr": "B1",
    "topic": "Sightseeing",
    "grammarFocus": "Past Simple",
    "communicationGoal": "Talk about places visited",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 78,
    "stage": 13,
    "stageTheme": "Travel",
    "cefr": "B1",
    "topic": "Travel Challenge",
    "grammarFocus": "Review",
    "communicationGoal": "Complete a travel simulation",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Shadowing",
      "Writing"
    ],
    "isChallenge": true
  },
  {
    "day": 79,
    "stage": 14,
    "stageTheme": "Job Search",
    "cefr": "B1",
    "topic": "Finding Jobs",
    "grammarFocus": "Present Perfect",
    "communicationGoal": "Talk about job searching",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 80,
    "stage": 14,
    "stageTheme": "Job Search",
    "cefr": "B1",
    "topic": "CV Vocabulary",
    "grammarFocus": "Past Simple",
    "communicationGoal": "Describe past roles for a CV",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 81,
    "stage": 14,
    "stageTheme": "Job Search",
    "cefr": "B1",
    "topic": "Describing Experience",
    "grammarFocus": "Present Perfect vs Past Simple",
    "communicationGoal": "Describe work experience",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 82,
    "stage": 14,
    "stageTheme": "Job Search",
    "cefr": "B1",
    "topic": "Skills and Strengths",
    "grammarFocus": "Can / Be able to",
    "communicationGoal": "Describe skills and strengths",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 83,
    "stage": 14,
    "stageTheme": "Job Search",
    "cefr": "B1",
    "topic": "Cover Letters",
    "grammarFocus": "Formal English structures",
    "communicationGoal": "Write formally about qualifications",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 84,
    "stage": 14,
    "stageTheme": "Job Search",
    "cefr": "B1",
    "topic": "Job Search Challenge",
    "grammarFocus": "Integrated review",
    "communicationGoal": "Describe qualifications and experience professionally",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Shadowing",
      "Writing"
    ],
    "isChallenge": true
  },
  {
    "day": 85,
    "stage": 15,
    "stageTheme": "Social Life",
    "cefr": "B1",
    "topic": "Meeting New People",
    "grammarFocus": "Question forms",
    "communicationGoal": "Meet and question new people",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 86,
    "stage": 15,
    "stageTheme": "Social Life",
    "cefr": "B1",
    "topic": "Small Talk",
    "grammarFocus": "Present Perfect",
    "communicationGoal": "Make small talk",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 87,
    "stage": 15,
    "stageTheme": "Social Life",
    "cefr": "B1",
    "topic": "Making Plans",
    "grammarFocus": "Future forms",
    "communicationGoal": "Make social plans",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 88,
    "stage": 15,
    "stageTheme": "Social Life",
    "cefr": "B1",
    "topic": "Invitations",
    "grammarFocus": "Would / Could",
    "communicationGoal": "Invite and respond to invitations",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 89,
    "stage": 15,
    "stageTheme": "Social Life",
    "cefr": "B1",
    "topic": "Social Problems",
    "grammarFocus": "Conditionals",
    "communicationGoal": "Discuss social problems",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 90,
    "stage": 15,
    "stageTheme": "Social Life",
    "cefr": "B1",
    "topic": "Checkpoint — Review & Connect",
    "grammarFocus": "Integrated review",
    "communicationGoal": "Blend recent topics into one natural conversation: Technology, Meetings, Travel, Job Search, Social Life.",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Shadowing",
      "Writing"
    ],
    "isChallenge": true,
    "isCheckpoint": true,
    "reviewStages": [
      11,
      12,
      13,
      14,
      15
    ],
    "originalTopic": "Social Challenge"
  },
  {
    "day": 91,
    "stage": 16,
    "stageTheme": "Job Interviews",
    "cefr": "B1+",
    "topic": "Tell Me About Yourself",
    "grammarFocus": "Present / Past review",
    "communicationGoal": "Answer a common interview opener",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 92,
    "stage": 16,
    "stageTheme": "Job Interviews",
    "cefr": "B1+",
    "topic": "Work Experience",
    "grammarFocus": "Present Perfect",
    "communicationGoal": "Talk through your work history",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 93,
    "stage": 16,
    "stageTheme": "Job Interviews",
    "cefr": "B1+",
    "topic": "Strengths and Weaknesses",
    "grammarFocus": "Comparatives and descriptive structures",
    "communicationGoal": "Discuss strengths and weaknesses",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 94,
    "stage": 16,
    "stageTheme": "Job Interviews",
    "cefr": "B1+",
    "topic": "Past Challenges",
    "grammarFocus": "Past Simple",
    "communicationGoal": "Describe a past professional challenge",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 95,
    "stage": 16,
    "stageTheme": "Job Interviews",
    "cefr": "B1+",
    "topic": "Future Career",
    "grammarFocus": "Will / Going to",
    "communicationGoal": "Talk about career plans",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 96,
    "stage": 16,
    "stageTheme": "Job Interviews",
    "cefr": "B1+",
    "topic": "Interview Simulation",
    "grammarFocus": "Integrated review",
    "communicationGoal": "Complete a realistic job interview",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Shadowing",
      "Writing"
    ],
    "isChallenge": true
  },
  {
    "day": 97,
    "stage": 17,
    "stageTheme": "Housing",
    "cefr": "B1+",
    "topic": "Finding a Home",
    "grammarFocus": "Comparatives",
    "communicationGoal": "Compare housing options",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 98,
    "stage": 17,
    "stageTheme": "Housing",
    "cefr": "B1+",
    "topic": "Renting",
    "grammarFocus": "Modal verbs",
    "communicationGoal": "Discuss renting a home",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 99,
    "stage": 17,
    "stageTheme": "Housing",
    "cefr": "B1+",
    "topic": "Talking to a Landlord",
    "grammarFocus": "Polite requests",
    "communicationGoal": "Talk to a landlord",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 100,
    "stage": 17,
    "stageTheme": "Housing",
    "cefr": "B1+",
    "topic": "Repairs and Problems",
    "grammarFocus": "Passive voice",
    "communicationGoal": "Report repairs and problems",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 101,
    "stage": 17,
    "stageTheme": "Housing",
    "cefr": "B1+",
    "topic": "Utilities and Bills",
    "grammarFocus": "Conditionals",
    "communicationGoal": "Discuss utilities and bills",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 102,
    "stage": 17,
    "stageTheme": "Housing",
    "cefr": "B1+",
    "topic": "Housing Challenge",
    "grammarFocus": "Integrated review",
    "communicationGoal": "Handle a realistic housing problem",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Shadowing",
      "Writing"
    ],
    "isChallenge": true
  },
  {
    "day": 103,
    "stage": 18,
    "stageTheme": "Professional Communication",
    "cefr": "B1+",
    "topic": "Writing Emails",
    "grammarFocus": "Formal structures",
    "communicationGoal": "Write a professional email",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 104,
    "stage": 18,
    "stageTheme": "Professional Communication",
    "cefr": "B1+",
    "topic": "Asking for Information",
    "grammarFocus": "Polite indirect questions",
    "communicationGoal": "Politely request information",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 105,
    "stage": 18,
    "stageTheme": "Professional Communication",
    "cefr": "B1+",
    "topic": "Following Up",
    "grammarFocus": "Present Perfect",
    "communicationGoal": "Write a follow-up message",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 106,
    "stage": 18,
    "stageTheme": "Professional Communication",
    "cefr": "B1+",
    "topic": "Scheduling",
    "grammarFocus": "Future forms",
    "communicationGoal": "Arrange a meeting time by email",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 107,
    "stage": 18,
    "stageTheme": "Professional Communication",
    "cefr": "B1+",
    "topic": "Confirming Details",
    "grammarFocus": "Reported information",
    "communicationGoal": "Confirm details in writing",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 108,
    "stage": 18,
    "stageTheme": "Professional Communication",
    "cefr": "B1+",
    "topic": "Email Challenge",
    "grammarFocus": "Integrated review",
    "communicationGoal": "Write and understand practical professional emails",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Shadowing",
      "Writing"
    ],
    "isChallenge": true
  },
  {
    "day": 109,
    "stage": 19,
    "stageTheme": "Government and Services",
    "cefr": "B1+",
    "topic": "Government Offices",
    "grammarFocus": "Passive (introduction)",
    "communicationGoal": "Talk about government offices and procedures",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 110,
    "stage": 19,
    "stageTheme": "Government and Services",
    "cefr": "B1+",
    "topic": "Forms and Documents",
    "grammarFocus": "Need to / Have to",
    "communicationGoal": "Talk about required forms and documents",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 111,
    "stage": 19,
    "stageTheme": "Government and Services",
    "cefr": "B1+",
    "topic": "Appointments",
    "grammarFocus": "Future forms",
    "communicationGoal": "Arrange an official appointment",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 112,
    "stage": 19,
    "stageTheme": "Government and Services",
    "cefr": "B1+",
    "topic": "Official Questions",
    "grammarFocus": "Indirect questions",
    "communicationGoal": "Ask official questions politely",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 113,
    "stage": 19,
    "stageTheme": "Government and Services",
    "cefr": "B1+",
    "topic": "Explaining a Situation",
    "grammarFocus": "Past Simple + Present Perfect",
    "communicationGoal": "Explain your situation to an official",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 114,
    "stage": 19,
    "stageTheme": "Government and Services",
    "cefr": "B1+",
    "topic": "Government Services Simulation",
    "grammarFocus": "Integrated review",
    "communicationGoal": "Handle an official-service interaction",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Shadowing",
      "Writing"
    ],
    "isChallenge": true
  },
  {
    "day": 115,
    "stage": 20,
    "stageTheme": "Problems and Complaints",
    "cefr": "B1+",
    "topic": "Explaining Problems",
    "grammarFocus": "Present Perfect",
    "communicationGoal": "Explain a problem clearly",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 116,
    "stage": 20,
    "stageTheme": "Problems and Complaints",
    "cefr": "B1+",
    "topic": "Complaining Politely",
    "grammarFocus": "Could / Would",
    "communicationGoal": "Make a polite complaint",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 117,
    "stage": 20,
    "stageTheme": "Problems and Complaints",
    "cefr": "B1+",
    "topic": "Customer Service",
    "grammarFocus": "First Conditional (introduction)",
    "communicationGoal": "Interact with customer service",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 118,
    "stage": 20,
    "stageTheme": "Problems and Complaints",
    "cefr": "B1+",
    "topic": "Finding Solutions",
    "grammarFocus": "Should / Could",
    "communicationGoal": "Suggest solutions to a problem",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 119,
    "stage": 20,
    "stageTheme": "Problems and Complaints",
    "cefr": "B1+",
    "topic": "Negotiating",
    "grammarFocus": "Comparatives",
    "communicationGoal": "Negotiate a resolution",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 120,
    "stage": 20,
    "stageTheme": "Problems and Complaints",
    "cefr": "B1+",
    "topic": "Checkpoint — Review & Connect",
    "grammarFocus": "Integrated review",
    "communicationGoal": "Blend recent topics into one natural conversation: Job Interviews, Housing, Professional Communication, Government and Services, Problems and Complaints.",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Shadowing",
      "Writing"
    ],
    "isChallenge": true,
    "isCheckpoint": true,
    "reviewStages": [
      16,
      17,
      18,
      19,
      20
    ],
    "originalTopic": "Problem-Solving Challenge"
  },
  {
    "day": 121,
    "stage": 21,
    "stageTheme": "Opinions",
    "cefr": "B1+ → B2",
    "topic": "Giving Opinions",
    "grammarFocus": "Opinion structures",
    "communicationGoal": "Give your opinion",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 122,
    "stage": 21,
    "stageTheme": "Opinions",
    "cefr": "B1+ → B2",
    "topic": "Giving Reasons",
    "grammarFocus": "Because / Since / As",
    "communicationGoal": "Give reasons for an opinion",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 123,
    "stage": 21,
    "stageTheme": "Opinions",
    "cefr": "B1+ → B2",
    "topic": "Comparing Ideas",
    "grammarFocus": "Comparatives",
    "communicationGoal": "Compare ideas",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 124,
    "stage": 21,
    "stageTheme": "Opinions",
    "cefr": "B1+ → B2",
    "topic": "Agreeing and Disagreeing",
    "grammarFocus": "Linking words",
    "communicationGoal": "Agree and disagree with an opinion",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 125,
    "stage": 21,
    "stageTheme": "Opinions",
    "cefr": "B1+ → B2",
    "topic": "Supporting an Opinion",
    "grammarFocus": "Modal verbs",
    "communicationGoal": "Support an opinion with modals",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 126,
    "stage": 21,
    "stageTheme": "Opinions",
    "cefr": "B1+ → B2",
    "topic": "Opinion Discussion",
    "grammarFocus": "Integrated review",
    "communicationGoal": "Express and defend an opinion",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Shadowing",
      "Writing"
    ],
    "isChallenge": true
  },
  {
    "day": 127,
    "stage": 22,
    "stageTheme": "Storytelling",
    "cefr": "B1+ → B2",
    "topic": "Telling a Story",
    "grammarFocus": "Past Simple",
    "communicationGoal": "Tell a simple story",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 128,
    "stage": 22,
    "stageTheme": "Storytelling",
    "cefr": "B1+ → B2",
    "topic": "Background Events",
    "grammarFocus": "Past Continuous",
    "communicationGoal": "Describe background events in a story",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 129,
    "stage": 22,
    "stageTheme": "Storytelling",
    "cefr": "B1+ → B2",
    "topic": "Life Experiences",
    "grammarFocus": "Present Perfect",
    "communicationGoal": "Talk about life experiences",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 130,
    "stage": 22,
    "stageTheme": "Storytelling",
    "cefr": "B1+ → B2",
    "topic": "Unexpected Events",
    "grammarFocus": "Past Perfect",
    "communicationGoal": "Describe unexpected events",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 131,
    "stage": 22,
    "stageTheme": "Storytelling",
    "cefr": "B1+ → B2",
    "topic": "Complete Storytelling",
    "grammarFocus": "Narrative tenses",
    "communicationGoal": "Tell a story using narrative tenses",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 132,
    "stage": 22,
    "stageTheme": "Storytelling",
    "cefr": "B1+ → B2",
    "topic": "Storytelling Challenge",
    "grammarFocus": "Integrated review",
    "communicationGoal": "Tell a clear, connected story",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Shadowing",
      "Writing"
    ],
    "isChallenge": true
  },
  {
    "day": 133,
    "stage": 23,
    "stageTheme": "Future and Goals",
    "cefr": "B1+ → B2",
    "topic": "Personal Goals",
    "grammarFocus": "Future forms",
    "communicationGoal": "Talk about personal goals",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 134,
    "stage": 23,
    "stageTheme": "Future and Goals",
    "cefr": "B1+ → B2",
    "topic": "Career Plans",
    "grammarFocus": "Going to / Will",
    "communicationGoal": "Talk about career plans",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 135,
    "stage": 23,
    "stageTheme": "Future and Goals",
    "cefr": "B1+ → B2",
    "topic": "Predictions",
    "grammarFocus": "Will / May / Might",
    "communicationGoal": "Make predictions",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 136,
    "stage": 23,
    "stageTheme": "Future and Goals",
    "cefr": "B1+ → B2",
    "topic": "Possibilities",
    "grammarFocus": "First Conditional",
    "communicationGoal": "Discuss possibilities",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 137,
    "stage": 23,
    "stageTheme": "Future and Goals",
    "cefr": "B1+ → B2",
    "topic": "Long-Term Plans",
    "grammarFocus": "Future Continuous",
    "communicationGoal": "Talk about long-term plans",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 138,
    "stage": 23,
    "stageTheme": "Future and Goals",
    "cefr": "B1+ → B2",
    "topic": "Future Challenge",
    "grammarFocus": "Integrated review",
    "communicationGoal": "Discuss plans, predictions and possibilities",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Shadowing",
      "Writing"
    ],
    "isChallenge": true
  },
  {
    "day": 139,
    "stage": 24,
    "stageTheme": "News and Media",
    "cefr": "B1+ → B2",
    "topic": "Understanding News",
    "grammarFocus": "Passive voice",
    "communicationGoal": "Understand a news report",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 140,
    "stage": 24,
    "stageTheme": "News and Media",
    "cefr": "B1+ → B2",
    "topic": "Reporting Events",
    "grammarFocus": "Reported Speech",
    "communicationGoal": "Report what someone said",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 141,
    "stage": 24,
    "stageTheme": "News and Media",
    "cefr": "B1+ → B2",
    "topic": "News Opinions",
    "grammarFocus": "Linking words",
    "communicationGoal": "Give an opinion about the news",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 142,
    "stage": 24,
    "stageTheme": "News and Media",
    "cefr": "B1+ → B2",
    "topic": "Comparing Sources",
    "grammarFocus": "Comparatives",
    "communicationGoal": "Compare news sources",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 143,
    "stage": 24,
    "stageTheme": "News and Media",
    "cefr": "B1+ → B2",
    "topic": "Current Issues",
    "grammarFocus": "Modals for speculation/opinion",
    "communicationGoal": "Discuss a current issue",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 144,
    "stage": 24,
    "stageTheme": "News and Media",
    "cefr": "B1+ → B2",
    "topic": "News Discussion",
    "grammarFocus": "Integrated review",
    "communicationGoal": "Understand and discuss a current issue",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Shadowing",
      "Writing"
    ],
    "isChallenge": true
  },
  {
    "day": 145,
    "stage": 25,
    "stageTheme": "Technology and Society",
    "cefr": "B1+ → B2",
    "topic": "AI and Technology",
    "grammarFocus": "Passive voice",
    "communicationGoal": "Discuss AI and technology",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 146,
    "stage": 25,
    "stageTheme": "Technology and Society",
    "cefr": "B1+ → B2",
    "topic": "Social Media",
    "grammarFocus": "Present Perfect",
    "communicationGoal": "Discuss social media habits",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 147,
    "stage": 25,
    "stageTheme": "Technology and Society",
    "cefr": "B1+ → B2",
    "topic": "Advantages and Disadvantages",
    "grammarFocus": "Comparative structures",
    "communicationGoal": "Weigh advantages and disadvantages",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 148,
    "stage": 25,
    "stageTheme": "Technology and Society",
    "cefr": "B1+ → B2",
    "topic": "Technology Problems",
    "grammarFocus": "Conditionals",
    "communicationGoal": "Discuss technology problems",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 149,
    "stage": 25,
    "stageTheme": "Technology and Society",
    "cefr": "B1+ → B2",
    "topic": "Future Technology",
    "grammarFocus": "Future forms",
    "communicationGoal": "Discuss future technology",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 150,
    "stage": 25,
    "stageTheme": "Technology and Society",
    "cefr": "B1+ → B2",
    "topic": "Checkpoint — Review & Connect",
    "grammarFocus": "Integrated review",
    "communicationGoal": "Blend recent topics into one natural conversation: Opinions, Storytelling, Future and Goals, News and Media, Technology and Society.",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Shadowing",
      "Writing"
    ],
    "isChallenge": true,
    "isCheckpoint": true,
    "reviewStages": [
      21,
      22,
      23,
      24,
      25
    ],
    "originalTopic": "Technology Debate"
  },
  {
    "day": 151,
    "stage": 26,
    "stageTheme": "Environment and Society",
    "cefr": "B2",
    "topic": "Environmental Problems",
    "grammarFocus": "Passive voice",
    "communicationGoal": "Discuss environmental problems",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 152,
    "stage": 26,
    "stageTheme": "Environment and Society",
    "cefr": "B2",
    "topic": "Causes and Effects",
    "grammarFocus": "Cause/effect structures",
    "communicationGoal": "Explain causes and effects",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 153,
    "stage": 26,
    "stageTheme": "Environment and Society",
    "cefr": "B2",
    "topic": "Solutions",
    "grammarFocus": "Conditionals",
    "communicationGoal": "Propose solutions",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 154,
    "stage": 26,
    "stageTheme": "Environment and Society",
    "cefr": "B2",
    "topic": "Social Problems",
    "grammarFocus": "Modal verbs",
    "communicationGoal": "Discuss social problems",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 155,
    "stage": 26,
    "stageTheme": "Environment and Society",
    "cefr": "B2",
    "topic": "Personal Responsibility",
    "grammarFocus": "Should / Must / Have to",
    "communicationGoal": "Discuss personal responsibility",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 156,
    "stage": 26,
    "stageTheme": "Environment and Society",
    "cefr": "B2",
    "topic": "Society Discussion",
    "grammarFocus": "Integrated review",
    "communicationGoal": "Explain a social problem and propose solutions",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Shadowing",
      "Writing"
    ],
    "isChallenge": true
  },
  {
    "day": 157,
    "stage": 27,
    "stageTheme": "Discussions and Arguments",
    "cefr": "B2",
    "topic": "Building an Argument",
    "grammarFocus": "Linking and sequencing expressions",
    "communicationGoal": "Build a structured argument",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 158,
    "stage": 27,
    "stageTheme": "Discussions and Arguments",
    "cefr": "B2",
    "topic": "Agreeing Politely",
    "grammarFocus": "Hedging",
    "communicationGoal": "Agree politely",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 159,
    "stage": 27,
    "stageTheme": "Discussions and Arguments",
    "cefr": "B2",
    "topic": "Disagreeing Politely",
    "grammarFocus": "Modal and softening structures",
    "communicationGoal": "Disagree politely",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 160,
    "stage": 27,
    "stageTheme": "Discussions and Arguments",
    "cefr": "B2",
    "topic": "Giving Evidence",
    "grammarFocus": "Reported Speech",
    "communicationGoal": "Give evidence for a claim",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 161,
    "stage": 27,
    "stageTheme": "Discussions and Arguments",
    "cefr": "B2",
    "topic": "Counterarguments",
    "grammarFocus": "Although / However / Whereas",
    "communicationGoal": "Respond to counterarguments",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 162,
    "stage": 27,
    "stageTheme": "Discussions and Arguments",
    "cefr": "B2",
    "topic": "Debate Challenge",
    "grammarFocus": "Integrated review",
    "communicationGoal": "Participate in a structured English debate",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Shadowing",
      "Writing"
    ],
    "isChallenge": true
  },
  {
    "day": 163,
    "stage": 28,
    "stageTheme": "Advanced Workplace Communication",
    "cefr": "B2",
    "topic": "Presenting Ideas",
    "grammarFocus": "Signposting language",
    "communicationGoal": "Present an idea clearly",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 164,
    "stage": 28,
    "stageTheme": "Advanced Workplace Communication",
    "cefr": "B2",
    "topic": "Explaining Processes",
    "grammarFocus": "Passive Voice",
    "communicationGoal": "Explain a process",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 165,
    "stage": 28,
    "stageTheme": "Advanced Workplace Communication",
    "cefr": "B2",
    "topic": "Negotiating",
    "grammarFocus": "Conditionals",
    "communicationGoal": "Negotiate at work",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 166,
    "stage": 28,
    "stageTheme": "Advanced Workplace Communication",
    "cefr": "B2",
    "topic": "Handling Conflict",
    "grammarFocus": "Modals + hedging",
    "communicationGoal": "Handle workplace conflict",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 167,
    "stage": 28,
    "stageTheme": "Advanced Workplace Communication",
    "cefr": "B2",
    "topic": "Giving Professional Feedback",
    "grammarFocus": "Softening language",
    "communicationGoal": "Give professional feedback",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 168,
    "stage": 28,
    "stageTheme": "Advanced Workplace Communication",
    "cefr": "B2",
    "topic": "Workplace Simulation",
    "grammarFocus": "Integrated review",
    "communicationGoal": "Handle a realistic professional communication scenario",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Shadowing",
      "Writing"
    ],
    "isChallenge": true
  },
  {
    "day": 169,
    "stage": 29,
    "stageTheme": "Real-Life Problem Solving",
    "cefr": "B2",
    "topic": "Unexpected Problems",
    "grammarFocus": "Narrative tenses",
    "communicationGoal": "Describe an unexpected problem",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 170,
    "stage": 29,
    "stageTheme": "Real-Life Problem Solving",
    "cefr": "B2",
    "topic": "Finding Solutions",
    "grammarFocus": "Conditionals",
    "communicationGoal": "Find a solution to a problem",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 171,
    "stage": 29,
    "stageTheme": "Real-Life Problem Solving",
    "cefr": "B2",
    "topic": "Complaining Effectively",
    "grammarFocus": "Polite structures",
    "communicationGoal": "Complain effectively",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 172,
    "stage": 29,
    "stageTheme": "Real-Life Problem Solving",
    "cefr": "B2",
    "topic": "Negotiating Solutions",
    "grammarFocus": "Modal verbs",
    "communicationGoal": "Negotiate a solution",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 173,
    "stage": 29,
    "stageTheme": "Real-Life Problem Solving",
    "cefr": "B2",
    "topic": "Explaining Complex Situations",
    "grammarFocus": "Complex sentences",
    "communicationGoal": "Explain a complex situation",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary"
    ],
    "isChallenge": false
  },
  {
    "day": 174,
    "stage": 29,
    "stageTheme": "Real-Life Problem Solving",
    "cefr": "B2",
    "topic": "Problem-Solving Simulation",
    "grammarFocus": "Integrated review",
    "communicationGoal": "Explain, negotiate and solve a realistic problem",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Shadowing",
      "Writing"
    ],
    "isChallenge": true
  },
  {
    "day": 175,
    "stage": 30,
    "stageTheme": "B2 Integration",
    "cefr": "B2",
    "topic": "Personal Life Simulation",
    "grammarFocus": "Integrated review",
    "communicationGoal": "Handle a realistic everyday conversation",
    "primarySkills": [
      "Listening",
      "Speaking",
      "Reading"
    ],
    "secondarySkills": [],
    "isChallenge": false
  },
  {
    "day": 176,
    "stage": 30,
    "stageTheme": "B2 Integration",
    "cefr": "B2",
    "topic": "Workplace Simulation",
    "grammarFocus": "Integrated review",
    "communicationGoal": "Handle a workplace situation from beginning to end",
    "primarySkills": [
      "Listening",
      "Speaking",
      "Writing"
    ],
    "secondarySkills": [],
    "isChallenge": false
  },
  {
    "day": 177,
    "stage": 30,
    "stageTheme": "B2 Integration",
    "cefr": "B2",
    "topic": "Job Interview Simulation",
    "grammarFocus": "Integrated review",
    "communicationGoal": "Complete a realistic B2-level interview",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [],
    "isChallenge": false
  },
  {
    "day": 178,
    "stage": 30,
    "stageTheme": "B2 Integration",
    "cefr": "B2",
    "topic": "Real-Life Problem Simulation",
    "grammarFocus": "Integrated review",
    "communicationGoal": "Explain a problem, respond to questions and negotiate a solution",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Problem Solving"
    ],
    "isChallenge": false
  },
  {
    "day": 179,
    "stage": 30,
    "stageTheme": "B2 Integration",
    "cefr": "B2",
    "topic": "B2 Conversation Challenge",
    "grammarFocus": "Integrated review",
    "communicationGoal": "Maintain a longer natural conversation, express opinions, explain reasons and respond spontaneously",
    "primarySkills": [
      "Listening",
      "Speaking"
    ],
    "secondarySkills": [
      "Vocabulary",
      "Pronunciation"
    ],
    "isChallenge": false
  },
  {
    "day": 180,
    "stage": 30,
    "stageTheme": "B2 Integration",
    "cefr": "B2",
    "topic": "FINAL ENGLISH CHALLENGE",
    "grammarFocus": "Integrated review",
    "communicationGoal": "Complete an integrated B2 assessment: listening, reading, speaking, writing, real-life communication, opinions, problem solving",
    "primarySkills": [
      "Listening",
      "Reading",
      "Speaking",
      "Writing"
    ],
    "secondarySkills": [],
    "isChallenge": true
  }
];

const CURRICULUM_STAGES = [
  {
    "stage": 1,
    "theme": "Getting Started",
    "cefr": "A2"
  },
  {
    "stage": 2,
    "theme": "Family and Social Life",
    "cefr": "A2"
  },
  {
    "stage": 3,
    "theme": "Home and Neighborhood",
    "cefr": "A2"
  },
  {
    "stage": 4,
    "theme": "Shopping and Clothes",
    "cefr": "A2"
  },
  {
    "stage": 5,
    "theme": "Food and Restaurants",
    "cefr": "A2"
  },
  {
    "stage": 6,
    "theme": "Transportation",
    "cefr": "A2+"
  },
  {
    "stage": 7,
    "theme": "Money and Banking",
    "cefr": "A2+"
  },
  {
    "stage": 8,
    "theme": "Workplace Basics",
    "cefr": "A2+"
  },
  {
    "stage": 9,
    "theme": "Health",
    "cefr": "A2+"
  },
  {
    "stage": 10,
    "theme": "City and Directions",
    "cefr": "A2+"
  },
  {
    "stage": 11,
    "theme": "Technology",
    "cefr": "B1"
  },
  {
    "stage": 12,
    "theme": "Meetings",
    "cefr": "B1"
  },
  {
    "stage": 13,
    "theme": "Travel",
    "cefr": "B1"
  },
  {
    "stage": 14,
    "theme": "Job Search",
    "cefr": "B1"
  },
  {
    "stage": 15,
    "theme": "Social Life",
    "cefr": "B1"
  },
  {
    "stage": 16,
    "theme": "Job Interviews",
    "cefr": "B1+"
  },
  {
    "stage": 17,
    "theme": "Housing",
    "cefr": "B1+"
  },
  {
    "stage": 18,
    "theme": "Professional Communication",
    "cefr": "B1+"
  },
  {
    "stage": 19,
    "theme": "Government and Services",
    "cefr": "B1+"
  },
  {
    "stage": 20,
    "theme": "Problems and Complaints",
    "cefr": "B1+"
  },
  {
    "stage": 21,
    "theme": "Opinions",
    "cefr": "B1+ → B2"
  },
  {
    "stage": 22,
    "theme": "Storytelling",
    "cefr": "B1+ → B2"
  },
  {
    "stage": 23,
    "theme": "Future and Goals",
    "cefr": "B1+ → B2"
  },
  {
    "stage": 24,
    "theme": "News and Media",
    "cefr": "B1+ → B2"
  },
  {
    "stage": 25,
    "theme": "Technology and Society",
    "cefr": "B1+ → B2"
  },
  {
    "stage": 26,
    "theme": "Environment and Society",
    "cefr": "B2"
  },
  {
    "stage": 27,
    "theme": "Discussions and Arguments",
    "cefr": "B2"
  },
  {
    "stage": 28,
    "theme": "Advanced Workplace Communication",
    "cefr": "B2"
  },
  {
    "stage": 29,
    "theme": "Real-Life Problem Solving",
    "cefr": "B2"
  },
  {
    "stage": 30,
    "theme": "B2 Integration",
    "cefr": "B2"
  }
];
