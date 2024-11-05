export default {
  translation: {
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      create: 'Create',
      submit: 'Submit',
      back: 'Back',
      next: 'Next',
      finish: 'Finish',
      continue: 'Continue',
    },
    auth: {
      signIn: 'Sign In',
      signUp: 'Sign Up',
      signOut: 'Sign Out',
      email: 'Email',
      password: 'Password',
      continueAsGuest: 'Continue as Guest',
      welcomeBack: 'Welcome Back!',
      createAccount: 'Create Account',
      alreadyHaveAccount: 'Already have an account?',
      dontHaveAccount: "Don't have an account?",
    },
    dashboard: {
      title: 'Your Word Lists',
      empty: {
        title: 'Start Your Learning Journey',
        subtitle: 'Create your first word list or use our sample data to begin practicing right away!',
        createList: 'Create Word List',
        loadSample: 'Load Sample Data',
      },
      recentPractices: 'Recent Practice Sessions',
    },
    practice: {
      title: 'Practice',
      checkAnswer: 'Check Answer',
      correct: 'Correct',
      incorrect: 'Incorrect',
      modes: {
        flashcards: {
          title: 'Flashcards',
          description: 'Classic flashcard practice',
        },
        writing: {
          title: 'Writing Practice',
          description: 'Write translations of words',
          placeholder: 'Type the translation...',
        },
        quiz: {
          title: 'Multiple Choice',
          description: 'Choose the correct translation',
        },
        listening: {
          title: 'Listening Practice',
          description: 'Practice pronunciation and listening',
          instruction: 'Listen to the word and type what you hear',
          placeholder: 'Type what you hear...',
        },
      },
      flashcards: {
        showAnswer: 'Show Answer',
        flipCard: 'Flip Card',
      },
      feedback: {
        correct: '🎉 Correct!',
        incorrect: '💪 Keep practicing!',
        greatJob: 'Great job!',
        correctAnswer: 'The correct answer was: {{answer}}',
      },
      complete: {
        title: 'Practice Complete!',
        subtitle: 'You got {{correct}} out of {{total}} words correct',
        accuracy: '{{percentage}}% correct',
        backToDashboard: 'Back to Dashboard',
      },
    },
    wordList: {
      create: {
        title: 'Create New List',
        nameLabel: 'Title',
        namePlaceholder: 'e.g., Essential French Phrases',
        descriptionLabel: 'Description',
        descriptionPlaceholder: 'Describe your word list...',
        fromLanguage: 'From Language',
        toLanguage: 'To Language',
      },
      actions: {
        practice: 'Practice',
        fork: 'Fork List',
        edit: 'Edit',
        delete: 'Delete',
      },
    },
  },
};