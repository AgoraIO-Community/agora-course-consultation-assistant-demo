import { getScenarioKnowledge } from '../lib/scenario-knowledge';
import { getConversationContext, getDemoDates } from '../lib/prompt-context';
import assert from 'node:assert/strict';
import { getScenarioConfig, getScenarioPrompt } from '../lib/agent-config';
import { getScenarioPresentation } from '../lib/presentation';
const config = getScenarioConfig();
assert.equal(config.id, "04-basketball-trial-sales");
assert.equal(getScenarioPresentation().id, config.id);
for (const key of ['role', 'workflow', 'guardrails', 'greeting'] as const) assert.ok(config[key]);
assert.match(getScenarioPrompt(), /# Goal and conversation flow/);
assert.match(getScenarioPrompt(), /# First-version boundary/);
assert.match(getScenarioPrompt(), /No business data lookup/);
assert.doesNotMatch(getScenarioPrompt(), /AG-100[123]|patient-alex|AST-R3001|travelerKey|participantId/);
console.log('Scenario conversation contract passed: ' + config.id);

// Calendar regressions: U.S. dates can differ from UTC and offsets change with DST.
const localNight = getConversationContext('America/New_York', new Date('2026-11-05T02:30:00Z'));
assert.match(localNight, /Current local date: 2026-11-04/);
assert.match(localNight, /UTC-05:00/);
assert.match(getConversationContext('America/New_York', new Date('2026-03-08T06:30:00Z')), /UTC-05:00/);
assert.match(getConversationContext('America/New_York', new Date('2026-03-08T07:30:00Z')), /UTC-04:00/);
assert.match(getConversationContext('America/Chicago', new Date('2026-07-01T03:30:00Z')), /Current local date: 2026-06-30/);
assert.match(getConversationContext('America/New_York', new Date('2026-12-31T17:00:00Z')), /2027-01-01 Friday/);
assert.match(getConversationContext('America/New_York', new Date('2028-02-28T17:00:00Z')), /2028-02-29 Tuesday; 2028-03-01 Wednesday/);
console.log('Prompt local-date, DST and calendar regressions passed.');

// Public demo windows must follow business-local dates through leap days and year boundaries.
assert.equal(getDemoDates('America/New_York', new Date('2026-11-05T02:30:00Z'))[0], '2026-11-04');
const leapDemoDates = getDemoDates('America/New_York', new Date('2028-02-28T17:00:00Z'));
assert.equal(leapDemoDates[1], '2028-02-29');
assert.equal(leapDemoDates[2], '2028-03-01');
assert.equal(new Set(leapDemoDates).size, 29);
assert.equal(getDemoDates('America/Chicago', new Date('2026-12-31T18:00:00Z'))[28], '2027-01-28');
// Sessions exclude today; class-time offsets must reflect the date, not today's offset.
const beforeSpring = getScenarioKnowledge(new Date('2027-03-12T18:00:00Z'));
assert.equal(beforeSpring.demoSessions.length, 8);
assert.equal(beforeSpring.demoSessions[0].date, '2027-03-13');
assert.equal(beforeSpring.demoSessions[0].offset, 'UTC-06:00');
assert.equal(beforeSpring.demoSessions[1].date, '2027-03-14');
assert.equal(beforeSpring.demoSessions[1].offset, 'UTC-05:00');
const beforeFall = getScenarioKnowledge(new Date('2027-11-05T18:00:00Z'));
assert.equal(beforeFall.demoSessions[0].offset, 'UTC-05:00');
assert.equal(beforeFall.demoSessions[1].offset, 'UTC-06:00');
const sunday = getScenarioKnowledge(new Date('2026-11-08T18:00:00Z'));
assert.ok(sunday.demoSessions.every((slot) => slot.date > '2026-11-08'));
assert.equal(new Set(sunday.demoSessions.map((slot) => slot.date)).size, 8);
assert.equal(sunday.lesson.reduce((sum, part) => sum + part.minutes, 0), sunday.course.durationMinutes);
for (const slot of sunday.demoSessions) {
  assert.ok(slot.day === 'Saturday' || slot.day === 'Sunday');
  assert.ok(slot.initialDemoSeats > 0);
  assert.equal(slot.timeZone, 'America/Chicago');
}
console.log('Phase-one generated reference regressions passed.');
