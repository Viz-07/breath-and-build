import OpenAI from 'openai';

// Initialize OpenAI client
let openai: OpenAI | null = null;

export const initializeOpenAI = (apiKey: string) => {
  openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true // Note: In production, API calls should go through your backend
  });
};

export const getOpenAIClient = () => {
  if (!openai) {
    throw new Error('OpenAI client not initialized. Please set your API key first.');
  }
  return openai;
};

export interface TaskSummaryInput {
  completedTasks: Array<{
    title: string;
    description?: string;
    category: string;
    completedAt?: string;
  }>;
  reflections?: {
    mood: string;
    gratitude: string[];
    reflection: string;
    wins: string[];
    improvements: string;
  };
  focusSessions: number;
  mindfulMinutes: number;
}

export const generateDailySummary = async (input: TaskSummaryInput): Promise<{
  summary: string;
  motivationalMessage: string;
}> => {
  const client = getOpenAIClient();
  
  const prompt = `
Based on the following daily productivity and mindfulness data, generate a personalized summary and motivational message:

COMPLETED TASKS (${input.completedTasks.length} total):
${input.completedTasks.map(task => `- ${task.title} (${task.category})`).join('\n')}

FOCUS SESSIONS: ${input.focusSessions}
MINDFUL MINUTES: ${input.mindfulMinutes}

${input.reflections ? `
DAILY REFLECTION:
- Mood: ${input.reflections.mood}
- Gratitude: ${input.reflections.gratitude.filter(g => g.trim()).join(', ')}
- Reflection: ${input.reflections.reflection}
- Wins: ${input.reflections.wins.filter(w => w.trim()).join(', ')}
- Areas for improvement: ${input.reflections.improvements}
` : ''}

Please provide:
1. A concise summary (2-3 sentences) highlighting key accomplishments and patterns
2. One motivational message (1-2 sentences) that's encouraging and forward-looking

Format as JSON:
{
  "summary": "Your summary here...",
  "motivationalMessage": "Your motivational message here..."
}
`;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a mindful productivity coach. Provide encouraging, insightful summaries that help users reflect on their progress and stay motivated. Keep responses concise and positive."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 300
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    try {
      return JSON.parse(content);
    } catch {
      // Fallback if JSON parsing fails
      return {
        summary: content.split('\n')[0] || "Great work today! You've made meaningful progress.",
        motivationalMessage: "Keep up the excellent work! Tomorrow is another opportunity to grow."
      };
    }
  } catch (error) {
    console.error('Error generating summary:', error);
    throw new Error('Failed to generate summary. Please try again.');
  }
};

export const generateMindfulnessTip = async (): Promise<string> => {
  const client = getOpenAIClient();
  
  try {
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a mindfulness expert. Provide practical, actionable mindfulness tips that can be applied during work breaks. Keep tips concise (1-2 sentences) and focused on immediate application."
        },
        {
          role: "user",
          content: "Generate a random mindfulness tip for someone taking a work break. Focus on breathing, awareness, or simple mindful activities."
        }
      ],
      temperature: 0.8,
      max_tokens: 100
    });

    return response.choices[0]?.message?.content || "Take three deep breaths and notice how your body feels right now. This simple awareness can reset your mind and reduce stress.";
  } catch (error) {
    console.error('Error generating mindfulness tip:', error);
    throw new Error('Failed to generate mindfulness tip. Please try again.');
  }
};