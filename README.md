# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/0f81b5ab-5f59-402f-a34e-dc994f0c971f

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/0f81b5ab-5f59-402f-a34e-dc994f0c971f) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- OpenAI API integration for AI-powered summaries and tips

## OpenAI Integration Features

### Daily Summary Generation
- **Manual Generation**: Click "Generate Summary" on the Dashboard to create AI-powered daily summaries
- **Auto Generation**: Automatic summary generation in the evening (after 6 PM) when tasks are completed
- **Input Data**: Uses completed tasks, focus sessions, mindful minutes, and daily reflections
- **Output**: Provides personalized summary and motivational message

### Mindfulness Tips
- **Random Tips**: Generate AI-powered mindfulness tips on the Breaks page
- **Contextual**: Tips are tailored for work break scenarios
- **Refresh**: Get new tips anytime with the "Get New Tip" button

### Setup Instructions
1. Get your OpenAI API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Click "Setup AI" button on Dashboard or Insights page
3. Enter your API key and save
4. Start generating summaries and tips!

### Security Note
The current implementation stores the API key in localStorage for demo purposes. 
For production use, implement a secure backend to handle OpenAI API calls.

### Auto-Summary Features
- **Evening Trigger**: Automatically generates summaries after 6 PM
- **Smart Detection**: Only generates if tasks are completed and no summary exists for today
- **Notifications**: Browser notifications when summary is ready (with permission)
- **Persistent**: Remembers last summary date to avoid duplicates
## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/0f81b5ab-5f59-402f-a34e-dc994f0c971f) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
