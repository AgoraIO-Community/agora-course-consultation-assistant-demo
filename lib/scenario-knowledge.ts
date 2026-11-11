import { getDemoDates } from './prompt-context';

// Fictional public course and demonstration schedule; no enrollment records.
export const SCENARIO_KNOWLEDGE = {
  "source": {
    "kind": "Fictional course and session reference",
    "revision": "2026-11-08",
    "scope": "The venue, fee, weekend schedule and initial seat counts are fictional demo configuration, not a real course or enrollment system."
  },
  "timeZone": "America/Chicago",
  "course": {
    "title": "Beginner trial class",
    "location": "Austin, TX, United States",
    "minAge": 8,
    "maxAge": 12,
    "experience": "No prior basketball experience required",
    "durationMinutes": 60,
    "goals": [
      "Basic ball control and passing",
      "Simple movement and team play",
      "A supportive first experience without competitive selection"
    ],
    "venue": "Agora Youth Basketball Center — Court A",
    "address": "100 Example Court Lane, Austin, TX 78701, United States (fictional demo address; do not use for navigation)",
    "trialFeeUsd": 25,
    "feePolicy": "USD 25 per child for one 60-minute trial; demonstration total including any fees/tax. No discount, payment, recurring enrollment or regular-course price is configured."
  },
  "lesson": [
    {
      "minutes": 10,
      "activity": "Warm-up and simple movement games"
    },
    {
      "minutes": 15,
      "activity": "Ball handling and dribbling"
    },
    {
      "minutes": 15,
      "activity": "Passing and partner practice"
    },
    {
      "minutes": 15,
      "activity": "Small-sided games adapted to beginners"
    },
    {
      "minutes": 5,
      "activity": "Cool-down and a short reflection"
    }
  ],
  "preparation": {
    "bring": [
      "Comfortable athletic clothing",
      "Closed-toe athletic shoes",
      "Water"
    ],
    "provided": "Basketballs for the lesson are supplied in this example.",
    "parentObservation": "A parent may observe the example trial from the designated viewing area; no parent participation is required."
  },
  "commonConcerns": {
    "shyChild": "The example class starts with simple games and partner practice. Discuss what would help the child feel comfortable; do not guarantee how they will feel.",
    "noExperience": "The trial starts with basics and does not require a tryout or a skill test.",
    "commitment": "Discuss a trial as an opportunity to see whether the child enjoys the activity; do not imply enrollment or a payment obligation.",
    "outsideAgeRange": "Only the eight-to-twelve beginner course is defined. Do not invent an exception or a second course."
  },
  "unconfirmed": [
    "Real classes, enrollment and seats",
    "Individual accommodations",
    "Regular-course fees, subscriptions and discounts"
  ],
  "schedule": {
    "Saturday": {
      "start": "10:00 AM",
      "end": "11:00 AM",
      "initialDemoSeats": 6
    },
    "Sunday": {
      "start": "2:00 PM",
      "end": "3:00 PM",
      "initialDemoSeats": 4
    }
  },
  "demoEnrollment": "Offer only generated demoSessions. Track simulated enrollment in the current conversation after explicit consent, reducing that session count once; no seat is actually held. A repeated yes is not a second enrollment. Do not exceed a session count, enroll an ineligible child, invent another session or promise staff contact. If prior selections are no longer in context, say the count is uncertain."
} as const;

export function getScenarioKnowledge(now = new Date()) {
  const demoSessions = getDemoDates(SCENARIO_KNOWLEDGE.timeZone, now).slice(1).flatMap((date) => {
    const weekday = new Date(date + 'T12:00:00Z').getUTCDay();
    if (weekday !== 0 && weekday !== 6) return [];
    const day = weekday === 6 ? 'Saturday' : 'Sunday';
    const offset = new Intl.DateTimeFormat('en-US', {
      timeZone: SCENARIO_KNOWLEDGE.timeZone, timeZoneName: 'longOffset',
    }).formatToParts(new Date(date + 'T18:00:00Z'))
      .find((part) => part.type === 'timeZoneName')!.value.replace('GMT', 'UTC');
    return [{ date, day, ...SCENARIO_KNOWLEDGE.schedule[day], timeZone: SCENARIO_KNOWLEDGE.timeZone, offset }];
  });
  return { ...SCENARIO_KNOWLEDGE, demoSessions };
}
