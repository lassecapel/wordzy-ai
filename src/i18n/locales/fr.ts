export default {
  translation: {
    common: {
      loading: 'Chargement...',
      error: 'Une erreur est survenue',
      save: 'Enregistrer',
      cancel: 'Annuler',
      delete: 'Supprimer',
      edit: 'Modifier',
      create: 'Créer',
      submit: 'Soumettre',
      back: 'Retour',
      next: 'Suivant',
      finish: 'Terminer',
      continue: 'Continuer',
    },
    auth: {
      signIn: 'Se connecter',
      signUp: "S'inscrire",
      signOut: 'Se déconnecter',
      email: 'Email',
      password: 'Mot de passe',
      continueAsGuest: 'Continuer en tant qu\'invité',
      welcomeBack: 'Bon retour!',
      createAccount: 'Créer un compte',
      alreadyHaveAccount: 'Vous avez déjà un compte?',
      dontHaveAccount: 'Vous n\'avez pas de compte?',
    },
    dashboard: {
      title: 'Vos listes de mots',
      empty: {
        title: 'Commencez votre voyage d\'apprentissage',
        subtitle: 'Créez votre première liste de mots ou utilisez nos exemples pour commencer à pratiquer!',
        createList: 'Créer une liste',
        loadSample: 'Charger les exemples',
      },
      recentPractices: 'Sessions récentes',
    },
    practice: {
      title: 'Pratique',
      modes: {
        flashcards: {
          title: 'Cartes mémoire',
          description: 'Pratique classique avec cartes',
        },
        writing: {
          title: 'Exercice d\'écriture',
          description: 'Écrivez les traductions',
        },
        quiz: {
          title: 'Choix multiple',
          description: 'Choisissez la bonne traduction',
        },
        listening: {
          title: 'Exercice d\'écoute',
          description: 'Pratiquez la prononciation et l\'écoute',
        },
      },
      complete: {
        title: 'Exercice terminé!',
        subtitle: 'Vous avez obtenu {{correct}} sur {{total}} mots',
        accuracy: '{{percentage}}% correct',
        backToDashboard: 'Retour au tableau de bord',
      },
    },
    wordList: {
      create: {
        title: 'Créer une nouvelle liste',
        nameLabel: 'Titre',
        namePlaceholder: 'ex., Phrases françaises essentielles',
        descriptionLabel: 'Description',
        descriptionPlaceholder: 'Décrivez votre liste de mots...',
        fromLanguage: 'De la langue',
        toLanguage: 'Vers la langue',
      },
      actions: {
        practice: 'Pratiquer',
        fork: 'Dupliquer',
        edit: 'Modifier',
        delete: 'Supprimer',
      },
    },
  },
};