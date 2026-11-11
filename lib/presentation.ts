import type { ScenarioPresentation } from '@/types/presentation';
export type { ScenarioPresentation } from '@/types/presentation';

export const presentation: ScenarioPresentation = {
  "id": "04-basketball-trial-sales",
  "name": "Parent Trial Follow-up",
  "purpose": "Trial details and simulated enrollment",
  "summary": "Explore a fictional Austin basketball trial: USD 25, a specific venue and upcoming weekend sessions.",
  "featuresHeading": "In this conversation",
  "features": [
    {
      "emoji": "💬",
      "title": "Course fee, venue & preparation"
    },
    {
      "emoji": "🎙️",
      "title": "Weekend sessions & demo seats"
    },
    {
      "emoji": "📝",
      "title": "Simulated trial enrollment"
    }
  ],
  "builtWith": [
    "Agora Conversational AI",
    "Agents SDK",
    "Next.js"
  ],
  "startLabel": "Start parent follow-up",
  "boundaryShort": "Simulation only. No real trial seat is held, no payment is taken, and no enrollment is saved.",
  "outcomes": [
    {
      "id": "helpful",
      "label": "The conversation helped"
    },
    {
      "id": "needs-guidance",
      "label": "I need more guidance"
    }
  ],
  "developer": {
    "sourceUrl": "https://github.com/AgoraIO-Community/agora-parent-trial-follow-up-demo",
    "runCommand": "pnpm install --frozen-lockfile\npnpm run doctor\npnpm run dev",
    "skillsCommand": "npx skills add github:AgoraIO/skills",
    "assistantPrompt": "Work in this existing Parent Trial Follow-up voice demo. Preserve RTC/RTM and the phase-one conversation-only boundary. Use configured fictional references and explicitly labeled current-conversation simulations where supported. Keep tools disabled, results unsaved and real business actions unavailable. Keep entry copy, FAQ and prompt behavior aligned.",
    "docsUrl": "https://docs.agora.io/en/ai/build/build-server-client",
    "sdkUrl": "https://www.npmjs.com/package/agora-agents",
    "consoleUrl": "https://console.agora.io/",
    "cliUrl": "https://github.com/AgoraIO/cli",
    "skillsUrl": "https://github.com/AgoraIO/skills",
    "extensionPoints": [
      {
        "title": "Change the conversation",
        "path": "lib/agent-config.ts"
      },
      {
        "title": "Choose models and voice",
        "path": "lib/runtime-profile.ts"
      },
      {
        "title": "Adapt scenario UI copy",
        "path": "lib/presentation.ts"
      }
    ]
  }
};

export function getScenarioPresentation(): ScenarioPresentation { return presentation; }
