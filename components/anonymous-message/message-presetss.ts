
type PresetMessage = {
  id: string
  title: string
  message: string
}

export const messagePresets: PresetMessage[] = [
  {
    id: "valentine",
    title: "💝 Valentine",
    message: "Send me your sweetest Valentine's message anonymously! 💌",
  },
  {
    id: "birthday",
    title: "🎂 Birthday",
    message:
      "It's my birthday! Leave me your wishes and make my day special! 🎉",
  },
  {
    id: "feedback",
    title: "💭 Honest Feedback",
    message:
      "I want to hear your honest thoughts about me! Don't worry, it's anonymous 🤫",
  },
  {
    id: "secret",
    title: "🤫 Secret",
    message:
      "Tell me a secret you've never told me before! Your identity is safe 🔒",
  },
  {
    id: "crush",
    title: "💘 Crush",
    message: "Do you have a crush on me? Tell me anonymously! No pressure 😊",
  },
];
