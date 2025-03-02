/**
 * Base de données des prompts
 */
const promptCategories = [
    { id: "all", name: "Tous" },
    { id: "strategie", name: "Stratégie" },
    { id: "leadership", name: "Leadership" },
    { id: "communication", name: "Communication" },
    { id: "productivite", name: "Productivité" },
    { id: "innovation", name: "Innovation" },
    { id: "finance", name: "Finance" },
    { id: "fabric", name: "Fabric" }
];

const promptsDatabase = [
    // Stratégie
    {
        id: "s1",
        category: "strategie",
        categoryName: "Stratégie",
        subcategory: "Analyse de marché et tendances",
        text: "Identifie les trois transformations économiques, technologiques et sociétales les plus influentes sur le marché [secteur] d'ici 5 ans. Propose des scénarios d'adaptation et les ressources nécessaires pour chaque stratégie."
    },
    {
        id: "s2",
        category: "strategie",
        categoryName: "Stratégie",
        subcategory: "Analyse de marché et tendances",
        text: "Compare les stratégies de croissance de [3 concurrents] sur les cinq dernières années. Dégage les tendances clés, les erreurs à éviter et les opportunités sous-exploitées dans notre secteur."
    },
    {
        id: "s3",
        category: "strategie",
        categoryName: "Stratégie",
        subcategory: "Planification stratégique",
        text: "Développe un plan stratégique sur 3 ans pour [entreprise/département] qui intègre les innovations technologiques émergentes, les changements de comportement des consommateurs et les contraintes réglementaires prévisibles."
    },
    {
        id: "s4",
        category: "strategie",
        categoryName: "Stratégie",
        subcategory: "Planification stratégique",
        text: "Crée une matrice de priorisation pour nos 10 initiatives stratégiques en fonction de leur impact potentiel, des ressources requises, des risques associés et de l'alignement avec notre mission."
    },
    {
        id: "s5",
        category: "strategie",
        categoryName: "Stratégie",
        subcategory: "Gestion des risques",
        text: "Identifie les 5 principaux risques stratégiques pour notre entreprise dans le secteur [secteur] et propose un plan de mitigation pour chacun, incluant des indicateurs d'alerte précoce."
    },
    
    // Leadership
    {
        id: "l1",
        category: "leadership",
        categoryName: "Leadership",
        subcategory: "Mobilisation d'équipe",
        text: "Crée un message puissant destiné aux équipes après une année difficile, en insistant sur la résilience, les apprentissages et la vision d'avenir."
    },
    {
        id: "l2",
        category: "leadership",
        categoryName: "Leadership",
        subcategory: "Mobilisation d'équipe",
        text: "Développe un plan de communication en cascade pour annoncer et accompagner un changement organisationnel majeur, en anticipant les résistances et en valorisant les bénéfices attendus."
    },
    {
        id: "l3",
        category: "leadership",
        categoryName: "Leadership",
        subcategory: "Développement des talents",
        text: "Conçois un programme de développement des hauts potentiels sur 18 mois, incluant des expériences d'apprentissage variées, du mentorat et des projets stratégiques transverses."
    },
    {
        id: "l4",
        category: "leadership",
        categoryName: "Leadership",
        subcategory: "Gestion du changement",
        text: "Crée une intervention destinée à remobiliser une équipe en perte de motivation. Identifie les freins existants et propose des leviers d'engagement concrets."
    },
    {
        id: "l5",
        category: "leadership",
        categoryName: "Leadership",
        subcategory: "Gestion du changement",
        text: "Développe une feuille de route opérationnelle pour que les managers intermédiaires puissent accompagner efficacement une transformation digitale majeure."
    },
    
    // Communication
    {
        id: "c1",
        category: "communication",
        categoryName: "Communication",
        subcategory: "Prise de parole",
        text: "Rédige un discours percutant pour un événement corporate mettant en avant notre engagement en matière d'innovation, d'éthique et de transformation digitale."
    },
    {
        id: "c2",
        category: "communication",
        categoryName: "Communication",
        subcategory: "Prise de parole",
        text: "Crée une présentation de 10 minutes pour convaincre le comité exécutif d'investir dans [projet/initiative]. Structure ton argumentaire autour de la valeur ajoutée, du ROI et de l'alignement stratégique."
    },
    {
        id: "c3",
        category: "communication",
        categoryName: "Communication",
        subcategory: "Communication de crise",
        text: "Développe un plan de communication de crise pour gérer [situation critique potentielle]. Inclus les messages clés, les canaux prioritaires et la séquence temporelle des actions."
    },
    {
        id: "c4",
        category: "communication",
        categoryName: "Communication",
        subcategory: "Communication externe",
        text: "Rédige un communiqué de presse annonçant [nouvelle initiative/produit/partenariat] qui met en valeur notre positionnement stratégique et l'impact positif attendu."
    },
    {
        id: "c5",
        category: "communication",
        categoryName: "Communication",
        subcategory: "Communication interne",
        text: "Crée une campagne de communication interne pour renforcer l'adhésion aux valeurs de l'entreprise. Propose des actions concrètes sur 3 mois avec des messages adaptés à chaque niveau hiérarchique."
    },
    
    // Productivité
    {
        id: "p1",
        category: "productivite",
        categoryName: "Productivité",
        subcategory: "Optimisation des processus",
        text: "Analyse notre processus de [processus spécifique] et identifie les goulots d'étranglement, les redondances et les opportunités d'automatisation. Propose un plan d'optimisation avec des gains estimés."
    },
    {
        id: "p2",
        category: "productivite",
        categoryName: "Productivité",
        subcategory: "Optimisation des processus",
        text: "Développe une méthodologie pour auditer et améliorer l'efficacité des réunions dans notre organisation, incluant des critères d'évaluation et des modèles de formats adaptés à différents objectifs."
    },
    {
        id: "p3",
        category: "productivite",
        categoryName: "Productivité",
        subcategory: "Gestion du temps",
        text: "Crée un guide pratique pour aider les managers à mieux prioriser leurs tâches et déléguer efficacement, en tenant compte des contraintes spécifiques à notre secteur d'activité."
    },
    {
        id: "p4",
        category: "productivite",
        categoryName: "Productivité",
        subcategory: "Gestion du temps",
        text: "Propose une structure de semaine type pour un [rôle spécifique] qui optimise la concentration, la collaboration et l'équilibre vie professionnelle-vie personnelle."
    },
    {
        id: "p5",
        category: "productivite",
        categoryName: "Productivité",
        subcategory: "Collaboration d'équipe",
        text: "Conçois un cadre de travail pour améliorer la collaboration entre les équipes [équipe 1] et [équipe 2], incluant des rituels partagés, des outils communs et des indicateurs de performance collaboratifs."
    },
    
    // Innovation
    {
        id: "i1",
        category: "innovation",
        categoryName: "Innovation",
        subcategory: "Idéation",
        text: "Organise une session d'idéation structurée pour résoudre [problème spécifique]. Détaille les phases, les techniques de créativité à utiliser et la méthode de sélection des idées à fort potentiel."
    },
    {
        id: "i2",
        category: "innovation",
        categoryName: "Innovation",
        subcategory: "Idéation",
        text: "Génère 10 concepts innovants pour [produit/service] qui répondent aux tendances émergentes dans notre secteur tout en s'alignant sur notre positionnement de marque."
    },
    {
        id: "i3",
        category: "innovation",
        categoryName: "Innovation",
        subcategory: "Développement de produit",
        text: "Crée un canvas de proposition de valeur pour un nouveau [produit/service] ciblant le segment [segment client], en détaillant les gains créés et les douleurs soulagées."
    },
    {
        id: "i4",
        category: "innovation",
        categoryName: "Innovation",
        subcategory: "Développement de produit",
        text: "Développe un plan de test pour valider les hypothèses critiques de notre nouveau concept de [produit/service] avec un budget et un calendrier contraints."
    },
    {
        id: "i5",
        category: "innovation",
        categoryName: "Innovation",
        subcategory: "Culture d'innovation",
        text: "Propose un programme pour développer une culture d'innovation au sein de notre organisation, incluant des changements de pratiques managériales, des mécanismes d'incitation et des espaces dédiés."
    },
    
    // Finance
    {
        id: "f1",
        category: "finance",
        categoryName: "Finance",
        subcategory: "Analyse financière",
        text: "Crée un modèle d'analyse pour évaluer la rentabilité de [projet/investissement] en tenant compte des coûts directs et indirects, des revenus projetés et des risques spécifiques."
    },
    {
        id: "f2",
        category: "finance",
        categoryName: "Finance",
        subcategory: "Analyse financière",
        text: "Développe un tableau de bord financier pour notre comité de direction qui met en évidence les indicateurs clés de performance, les tendances significatives et les alertes précoces."
    },
    {
        id: "f3",
        category: "finance",
        categoryName: "Finance",
        subcategory: "Budgétisation",
        text: "Propose une méthodologie de budgétisation basée sur la valeur pour notre département [département], qui aligne les allocations de ressources sur les priorités stratégiques."
    },
    {
        id: "f4",
        category: "finance",
        categoryName: "Finance",
        subcategory: "Budgétisation",
        text: "Crée un guide pour optimiser la gestion des coûts dans notre organisation sans compromettre la qualité et l'innovation, en identifiant les leviers d'efficience spécifiques à notre secteur."
    },
    {
        id: "f5",
        category: "finance",
        categoryName: "Finance",
        subcategory: "Investissement",
        text: "Développe un cadre d'évaluation pour prioriser nos investissements technologiques en fonction de leur impact stratégique, de leur faisabilité technique et de leur retour sur investissement."
    },
    
    // Fabric (traduits)
    {
        id: "fab1",
        category: "fabric",
        categoryName: "Fabric",
        subcategory: "Analyse de Contenu",
        text: "Analyse ce texte et identifie les principaux arguments, les preuves présentées, et évalue la solidité du raisonnement : [TEXTE]"
    },
    {
        id: "fab2",
        category: "fabric",
        categoryName: "Fabric",
        subcategory: "Analyse de Contenu",
        text: "Examine ce document et identifie les biais potentiels, les lacunes logiques, et les affirmations non étayées : [DOCUMENT]"
    },
    {
        id: "fab3",
        category: "fabric",
        categoryName: "Fabric",
        subcategory: "Analyse Comparative",
        text: "Compare et contraste ces deux perspectives sur [SUJET]. Identifie les points d'accord, de désaccord, et évalue la force de chaque argument."
    },
    {
        id: "fab4",
        category: "fabric",
        categoryName: "Fabric",
        subcategory: "Rédaction",
        text: "Rédige un article de blog informatif et engageant sur [SUJET] qui explique les concepts clés de manière accessible pour un public non-expert."
    },
    {
        id: "fab5",
        category: "fabric",
        categoryName: "Fabric",
        subcategory: "Rédaction",
        text: "Crée un guide étape par étape détaillé sur la façon de [TÂCHE], incluant des conseils pratiques et des erreurs courantes à éviter."
    },
    {
        id: "fab6",
        category: "fabric",
        categoryName: "Fabric",
        subcategory: "Storytelling",
        text: "Développe une histoire captivante qui illustre l'impact de [CONCEPT/TECHNOLOGIE] sur la vie quotidienne, en mettant l'accent sur les aspects humains et émotionnels."
    },
    {
        id: "fab7",
        category: "fabric",
        categoryName: "Fabric",
        subcategory: "Visualisation de Données",
        text: "Décris comment présenter visuellement ces données [DONNÉES] pour mettre en évidence les tendances clés et communiquer efficacement le message principal à [PUBLIC CIBLE]."
    },
    {
        id: "fab8",
        category: "fabric",
        categoryName: "Fabric",
        subcategory: "Brainstorming",
        text: "Génère 10 idées créatives pour résoudre le problème suivant : [PROBLÈME]. Assure-toi que les idées soient diverses en termes d'approche et de faisabilité."
    },
    {
        id: "fab9",
        category: "fabric",
        categoryName: "Fabric",
        subcategory: "Brainstorming",
        text: "Propose 5 approches non conventionnelles pour [OBJECTIF/TÂCHE] qui pourraient conduire à des résultats innovants ou inattendus."
    },
    {
        id: "fab10",
        category: "fabric",
        categoryName: "Fabric",
        subcategory: "Résolution de Problèmes",
        text: "Analyse ce problème complexe : [PROBLÈME]. Décompose-le en ses composantes, identifie les causes profondes potentielles, et suggère des approches structurées pour le résoudre."
    }
]; 