# Course Consultation Assistant Architecture

## Components

The browser uses Agora RTC for audio and RTM for transcript and Agent events. Next.js only signs credentials and starts/stops the managed Agent. No business session, data API, local file store or persistent application database is required. Native Node.js, Docker and a Next.js-compatible serverless deployment use the same conversation flow. Actual hosted voice acceptance remains a separate check.

## Start and stop

The page requests an RTC/RTM token and starts the managed Agent using requester_id and channel_name. RTM is ready before the RTC conversation component mounts. End conversation stops the Agent, logs out RTM and unmounts hook-owned media. No customer, shopping, follow-up or event session participates in startup.

## State

Scenario instructions and static public reference material are bundled with the app. Current-call transcript, activity and Inspector state live in browser memory. There is no business Map, writable result file, business API or application database.

## Ownership and invariants

LandingPage owns bootstrap and RTM. ConversationComponent owns RTC/toolkit subscriptions and uses the StrictMode guard. Preserve local-user UID normalization and interrupted turns. Token, invite and stop routes own privileged operations. lib/agent-tools.ts always returns an empty list.

## Deployment

The browser uses Agora RTC for audio and RTM for transcript and Agent events. Next.js only signs credentials and starts/stops the managed Agent. No business session, data API, local file store or persistent application database is required. Native Node.js, Docker and a Next.js-compatible serverless deployment use the same conversation flow. Actual hosted voice acceptance remains a separate check.

Supply NEXT_PUBLIC_AGORA_APP_ID at build and runtime and keep NEXT_AGORA_APP_CERTIFICATE server-only. No persistent volume is required. Synthetic verification does not prove real speech or hosted reachability.

## Usage FAQ ownership

`components/ScenarioFaq.tsx` owns static usage answers; `styles/faq.css` owns disclosure styling, scrolling and transitions. Its header trigger and content share a Radix Dialog root in `LandingPage`. Dialog handles focus trapping, Escape/backdrop dismissal and returning focus to the trigger. FAQ has no session or business API calls.


## Phase-one conversation update — 2026-11-08

Explore a fictional Austin basketball trial: USD 25, a specific venue and upcoming weekend sessions. This first version is conversation-only with explicitly fictional simulation. No business data lookup, external tools, database, record writes, saved results, or cross-session business history are available. You may guide the configured simulated booking or trial enrollment and, only after explicit confirmation of the complete selection, say it is confirmed for this demo conversation. A simulated confirmation is an unsaved verbal recap, not a real reservation, inventory lock, submitted request, payment or external action. Do not invent an order number, confirmation code, email, callback or persistent record. Keep choices and corrections only in the current conversation. Never imply another session or a real business can retrieve this recap. Do not request passwords, verification codes, payment details or unnecessary personal identifiers.

See [current capabilities](README.md#what-you-can-do), the [conversation contract](ARCHITECTURE.md#conversation-behavior) and [verification guidance](AGENTS.md#verification-and-maintenance). Tools remain disabled, and no persistent business operations are provided.

## Conversation behavior

### Conversation flow

Help a parent evaluate and simulate enrolling a child in the configured beginner basketball trial. Answer price, venue, address, date or time questions directly from the reference before intake. Explain once that the venue, fee and sessions are fictional and the enrollment is only a simulation with no real seat or payment.

Use the child's age, experience, interests and goals when relevant. Only ages eight through twelve are eligible. Explain the actual 60-minute lesson, supplied basketballs, what to bring and parent viewing area. Relate one or two activities to the parent's stated goal. Do not promise athletic or emotional outcomes, invent exceptions or offer an unconfigured advanced class. Respect financial concerns, hesitation, refusal and stop requests without sales pressure.

Offer at most two future demoSessions that fit the parent's dates. State the exact date, start/end time, America/Chicago local time and the supplied date-correct UTC offset when clarifying time zones. Do not offer today's class, a past date or an unlisted session. The trial is USD 25 per child including any demonstration fees/tax; do not confuse it with regular tuition or a free trial. Give the specific fictional venue, Court A and address when asked; it is not a real destination for navigation.

For a simulated enrollment, collect only age, relevant experience/goals and the chosen session; no legal name or contact details are needed. Before confirmation recap the number of children, each age, suitability, exact session date/time/time zone, venue/address, total USD 25 per child and the fact that no real seat is held or payment taken. Ask one explicit confirmation question. Require every child to be eligible and enough demo seats; preserve corrections and do not treat interest as consent.

After explicit agreement, say: Your simulated trial enrollment is confirmed for this demo conversation. Recap the chosen class and preparation, tracking the simulated seat use once within the conversation. Repeated confirmation is not a second enrollment. If unavailable, offer another configured session instead of inventing a place. Do not say an application was submitted, promise a callback or claim a saved enrollment. A corrected or cancelled confirmed simulation requires a new recap and agreement; adjust only the conversational count. Missing prior context means the count is uncertain, not permission to invent it.

### Capability boundary

This is a fictional course, venue, fee and weekend schedule, not real enrollment. No leads, payments, live seats or enrollment database are connected. Explicitly labeled current-conversation simulation is allowed; real booking, saved follow-up and staff contact are not. Do not collect a child's legal name, home address, health history, parent contact details or payment information. Never promise an age exception, guaranteed accommodation, actual place or callback.

### Source ownership

- `lib/agent-config.ts`: role, greeting, workflow and guardrails.
- `lib/prompt-context.ts`: short-turn rules and U.S. local date/DST context.
- `lib/scenario-knowledge.ts`: teaching material or configured fictional reference.
- `lib/presentation.ts` and `components/ScenarioFaq.tsx`: matching entry and FAQ.

No reference generation performs a business lookup or saves state. Fictional addresses are demonstration text, not real navigation destinations.
