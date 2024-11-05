export default {
  translation: {
    common: {
      loading: 'Laden...',
      error: 'Ein Fehler ist aufgetreten',
      save: 'Speichern',
      cancel: 'Abbrechen',
      delete: 'Löschen',
      edit: 'Bearbeiten',
      create: 'Erstellen',
      submit: 'Absenden',
      back: 'Zurück',
      next: 'Weiter',
      finish: 'Beenden',
      continue: 'Fortfahren',
    },
    auth: {
      signIn: 'Anmelden',
      signUp: 'Registrieren',
      signOut: 'Abmelden',
      email: 'E-Mail',
      password: 'Passwort',
      continueAsGuest: 'Als Gast fortfahren',
      welcomeBack: 'Willkommen zurück!',
      createAccount: 'Konto erstellen',
      alreadyHaveAccount: 'Bereits ein Konto?',
      dontHaveAccount: 'Noch kein Konto?',
    },
    dashboard: {
      title: 'Ihre Wortlisten',
      empty: {
        title: 'Starten Sie Ihre Lernreise',
        subtitle: 'Erstellen Sie Ihre erste Wortliste oder nutzen Sie unsere Beispieldaten zum Üben!',
        createList: 'Liste erstellen',
        loadSample: 'Beispieldaten laden',
      },
      recentPractices: 'Letzte Übungen',
    },
    practice: {
      title: 'Üben',
      modes: {
        flashcards: {
          title: 'Karteikarten',
          description: 'Klassisches Karteikarten-Training',
        },
        writing: {
          title: 'Schreibübung',
          description: 'Üben Sie das Schreiben von Übersetzungen',
        },
        quiz: {
          title: 'Multiple Choice',
          description: 'Wählen Sie die richtige Übersetzung',
        },
        listening: {
          title: 'Hörübung',
          description: 'Üben Sie Aussprache und Hören',
        },
      },
      complete: {
        title: 'Übung abgeschlossen!',
        subtitle: 'Sie haben {{correct}} von {{total}} Wörtern richtig',
        accuracy: '{{percentage}}% korrekt',
        backToDashboard: 'Zurück zur Übersicht',
      },
    },
    wordList: {
      create: {
        title: 'Neue Liste erstellen',
        nameLabel: 'Titel',
        namePlaceholder: 'z.B., Wichtige französische Sätze',
        descriptionLabel: 'Beschreibung',
        descriptionPlaceholder: 'Beschreiben Sie Ihre Wortliste...',
        fromLanguage: 'Von Sprache',
        toLanguage: 'Zu Sprache',
      },
      actions: {
        practice: 'Üben',
        fork: 'Liste kopieren',
        edit: 'Bearbeiten',
        delete: 'Löschen',
      },
    },
  },
};