'use client';

import { ChevronDown } from 'lucide-react';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

const questions = [
  {
    "question": "How do I start a conversation?",
    "answer": "Choose Start course consultation and allow microphone access when your browser asks. Speak in English and describe what you need. You can mute the microphone or end the conversation with the voice controls."
  },
  {
    "question": "What should I say?",
    "answer": "Try: “My child is nine and new to basketball. What is the trial price, where is it, and what weekend times can we choose?” You can ask to complete a simulated enrollment after discussing suitability."
  },
  {
    "question": "What are the trial fee, venue and times?",
    "answer": "The fictional trial costs USD 25 per child for 60 minutes, including any demo fees or tax. It takes place at Agora Youth Basketball Center, Court A, 100 Example Court Lane, Austin, TX 78701 — a fictional address, not a destination for navigation. Demo sessions run Saturdays 10–11 AM and Sundays 2–3 PM, America/Chicago local time, over the next four weeks."
  },
  {
    "question": "Can I enroll my child?",
    "answer": "For ages 8–12, you can choose a configured future session and confirm a simulated enrollment after reviewing the date, time, venue and total. Initial demo counts are six seats on Saturdays and four on Sundays. No real seat, submitted application, payment or saved enrollment is involved."
  },
  {
    "question": "What should we bring?",
    "answer": "The fictional course provides basketballs. Wear comfortable athletic clothing and closed-toe athletic shoes, and bring water. A parent can observe from the designated viewing area. Regular tuition, discounts and individual accommodations are not configured."
  },
  {
    "question": "Can I change what I said?",
    "answer": "Yes. Tell the assistant which detail to correct, ask it to repeat or clarify an answer, or request a verbal recap. Details are used within the current conversation; this demo does not save business results or remember them across sessions."
  },
  {
    "question": "What if my microphone does not work?",
    "answer": "Check that microphone access is allowed for this page and that the correct input device is selected in your browser or system settings. Make sure the microphone is not muted, then try Start course consultation again."
  }
];

export function ScenarioFaq() {
  return (
    <DialogContent className="demo-inspector demo-faq-drawer">
      <DialogHeader className="demo-faq-heading">
        <DialogTitle>Frequently asked questions</DialogTitle>
        <DialogDescription>How to get started, what to ask, and what to expect.</DialogDescription>
      </DialogHeader>
      <div className="demo-faq-list">
        {questions.map(({ question, answer }) => (
          <details className="demo-faq-item" key={question}>
            <summary>
              <span>{question}</span>
              <ChevronDown className="demo-faq-chevron" size={16} aria-hidden="true" />
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </DialogContent>
  );
}
