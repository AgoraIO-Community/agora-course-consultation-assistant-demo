import type { ScenarioPresentation } from '@/types/presentation';
export type { ScenarioPresentation } from '@/types/presentation';

export const presentation: ScenarioPresentation = {
  "id": "04-basketball-trial-sales",
  "name": "Course Consultation Assistant",
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
  "startLabel": "Start course consultation",
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
    "sourceUrl": "https://github.com/AgoraIO-Community/agora-course-consultation-assistant-demo",
    "runCommand": "pnpm install --frozen-lockfile\npnpm run doctor\npnpm run dev",
    "assistantPrompt": "Help me create and run the Course Consultation Assistant using Agora CLI.\n\nCheck that Agora CLI is installed and ready. If installation or an upgrade is needed, ask before proceeding. Guide me through browser login when required.\n\nGet the recipe details:\nagora recipes show agora-course-consultation-assistant-demo --json\n\nRead its implementation guide:\nhttps://raw.githubusercontent.com/AgoraIO-Community/agora-course-consultation-assistant-demo/main/RECIPE.md\n\nReference source:\nhttps://github.com/AgoraIO-Community/agora-course-consultation-assistant-demo\n\nBefore initialization, confirm which Agora project to use. Ask before creating a new Agora project.\n\nInitialize the app in a new or empty directory. Replace <confirmed-project-id> with the actual ID of the project confirmed above before running:\nagora init my-course-app --recipe agora-course-consultation-assistant-demo --project <confirmed-project-id> --json\n\nLet the CLI configure the credentials. Never print the App Certificate in chat or expose it in browser code.\n\nFollow the returned nextSteps to install dependencies and start the app. Help diagnose and resolve any errors.\n\nProvide the local URL and guide me through microphone access. Help me test this request:\n\"What should I know before choosing a basketball trial class for my child?\"\n\nReport what was verified and what still needs testing. Follow the capabilities and limits in the implementation guide; do not claim external actions were completed without verification.",
    "docsUrl": "https://docs.agora.io/en/ai/build/build-server-client",
    "sdkUrl": "https://github.com/AgoraIO/agora-agents-ts",
    "consoleUrl": "https://console.agora.io/",
    "cliUrl": "https://github.com/AgoraIO/cli",
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
    ],
    "createCommand": "npx agora-course-consultation-assistant-demo@latest my-course-app\ncd my-course-app",
    "testRequest": "What should I know before choosing a basketball trial class for my child?"
  }
};

export function getScenarioPresentation(): ScenarioPresentation { return presentation; }
