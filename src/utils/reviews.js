export default function reviews() {
  const reviewsData = [
    {
      name: "John Davidson",
      job_title: "Freelance Writer",
      review:
        "An all-in-one tool that boosts my productivity with seamless note-taking, task management, and AI-assisted organization.",
    },
    {
      name: "Sarah Mitchell",
      job_title: "Digital Strategist",
      review:
        "Perfect balance of simplicity and advanced features, allowing me to juggle projects, notes, and deadlines effortlessly.",
    },
    {
      name: "Timothy Clark",
      job_title: "Software Engineer",
      review:
        "Highly intuitive and feature-packed. It has completely transformed how I organize ideas, track tasks, and plan projects.",
    },
    {
      name: "Anna Williams",
      job_title: "Researcher",
      review:
        "A powerful, AI-driven app that has enhanced my note-taking experience while keeping all my research organized and accessible.",
    },
    {
      name: "Kevin Turner",
      job_title: "Startup Founder",
      review:
        "Smart, fast, and efficient—this app lets me manage everything from brainstorming to task execution with ease!",
    },
  ];
  
  return reviewsData[Math.floor(Math.random() * reviewsData.length)]
}
