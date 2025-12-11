// ===== Mobile Menu Toggle =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on a nav link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ===== Search Tabs =====
const searchTabs = document.querySelectorAll('.search-tab');
const searchContents = document.querySelectorAll('.search-content');

/**
 * Active un onglet de recherche spécifique
 * @param {string} tabName - Nom de l'onglet à activer ('vols', 'hotels', 'voitures')
 */
function activateSearchTab(tabName) {
    // Remove active class from all tabs and contents
    searchTabs.forEach(t => t.classList.remove('active'));
    searchContents.forEach(c => c.classList.remove('active'));
    
    // Find and activate the target tab
    const targetTab = document.querySelector(`.search-tab[data-tab="${tabName}"]`);
    const targetContent = document.getElementById(`${tabName}-search`);
    
    if (targetTab && targetContent) {
        targetTab.classList.add('active');
        targetContent.classList.add('active');
    }
}

// Add click listeners to search tabs
searchTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');
        activateSearchTab(targetTab);
    });
});

// ===== AI Chat Modal =====
const aiChatBtn = document.getElementById('aiChatBtn');
const chatModal = document.getElementById('chatModal');
const closeChat = document.getElementById('closeChat');
const chatInput = document.getElementById('chatInput');
const sendChat = document.getElementById('sendChat');
const chatMessages = document.getElementById('chatMessages');

if (aiChatBtn) {
    aiChatBtn.addEventListener('click', () => {
        chatModal.classList.add('active');
    });
}

if (closeChat) {
    closeChat.addEventListener('click', () => {
        chatModal.classList.remove('active');
    });
}

// Chat functionality
const chatResponses = {
    'bonjour': 'Bonjour ! Comment puis-je vous aider avec votre voyage aujourd\'hui ?',
    'salut': 'Salut ! Je suis là pour vous aider à planifier votre voyage parfait.',
    'vol': 'Pour rechercher des vols, utilisez la barre de recherche en haut de la page. Je peux vous aider à trouver les meilleures offres !',
    'hôtel': 'Nous avons une large sélection d\'hôtels. Utilisez notre barre de recherche pour trouver l\'hôtel parfait pour votre séjour.',
    'voiture': 'Pour louer une voiture, sélectionnez l\'onglet "Voitures" dans la barre de recherche et remplissez les informations demandées.',
    'promotion': 'Consultez notre section Promotions pour découvrir nos meilleures offres du moment !',
    'prix': 'Les prix varient selon la destination, la saison et la disponibilité. Utilisez notre moteur de recherche pour voir les tarifs actuels.',
    'aide': 'Je peux vous aider à trouver des vols, des hôtels, des voitures de location, et vous informer sur nos promotions. Que souhaitez-vous savoir ?',
    'merci': 'De rien ! N\'hésitez pas si vous avez d\'autres questions.',
};

function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message
    addChatMessage(message, 'user');
    chatInput.value = '';
    
    // Simulate bot response
    setTimeout(() => {
        const response = getChatResponse(message);
        addChatMessage(response, 'bot');
    }, 500);
}

function addChatMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}`;
    messageDiv.innerHTML = `<p>${text}</p>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getChatResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    for (const [key, value] of Object.entries(chatResponses)) {
        if (lowerMessage.includes(key)) {
            return value;
        }
    }
    
    return 'Merci pour votre message ! Pour plus d\'informations, utilisez notre barre de recherche ou consultez nos astuces de voyage.';
}

if (sendChat) {
    sendChat.addEventListener('click', sendMessage);
}

if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// ===== Language Selector & Translation System =====
const translations = {
    fr: {
        // Navigation
        'nav-accueil': 'Accueil',
        'nav-vols': 'Vols',
        'nav-hotels': 'Hôtels',
        'nav-voitures': 'Voitures',
        'nav-promotions': 'Promotions',
        'nav-ai-chat': 'AI Chat',
        
        // Hero Section
        'hero-title': 'Explorez le Monde avec SAFARIHOO',
        'hero-subtitle': 'Trouvez les meilleures offres pour vos voyages',
        'search-tab-vols': 'Vols',
        'search-tab-hotels': 'Hôtels',
        'search-tab-voitures': 'Voitures',
        'search-origin': 'Ville de départ',
        'search-destination': 'Destination',
        'search-departure': 'Date départ',
        'search-return': 'Date retour',
        'search-passengers': 'Passagers & Classe',
        'search-passengers-text': '1 passager, Économie',
        'search-passengers-label': 'Nombre de passagers',
        'search-adults': 'Adultes',
        'search-adults-age': '12 ans et plus',
        'search-children': 'Enfants',
        'search-children-age': '2-11 ans',
        'search-infants': 'Bébés',
        'search-infants-age': 'Moins de 2 ans',
        'search-class': 'Classe',
        'search-class-economy': 'Économie',
        'search-class-comfort': 'Confort',
        'search-class-business': 'Affaires',
        'search-class-first': 'Première',
        'search-hotel-destination': 'Où allez-vous?',
        'search-hotel-checkin': 'Arrivée',
        'search-hotel-checkout': 'Départ',
        'search-hotel-guests': 'Chambres & Personnes',
        'search-hotel-guests-text': '2 chambres, 2 adultes, 0 enfants',
        'search-hotel-rooms': 'Chambres',
        'search-hotel-rooms-label': 'Nombre de chambres',
        'search-hotel-adults': 'Adultes',
        'search-hotel-adults-age': '18 ans et plus',
        'search-hotel-children': 'Enfants',
        'search-hotel-children-age': '0-17 ans',
        'search-hotel-done': 'Terminé',
        'search-car-pickup': 'Lieu de ramassage',
        'search-car-pickup-placeholder': 'Ville ou aéroport',
        'search-car-pickup-date': 'Date de ramassage',
        'search-car-return-date': 'Date retour',
        'search-btn-vols': 'Rechercher des vols',
        'search-btn-hotels': 'Rechercher',
        'search-btn-cars': 'Rechercher',
        
        // Travel Tips
        'tips-title': 'Astuces de Voyage',
        'tips-subtitle': 'Découvrez nos guides pratiques pour voyager en toute sérénité',
        'tip-animals-title': 'Voyager avec un Animal',
        'tip-animals-desc': 'Conseils essentiels pour voyager avec votre compagnon à quatre pattes en toute sécurité et confort.',
        'tip-animals-btn': 'Lire l\'article',
        'tip-hotels-animals-title': 'Hôtels qui Acceptent les Animaux',
        'tip-hotels-animals-desc': 'Découvrez comment trouver les meilleurs hôtels accueillant vos animaux de compagnie.',
        'tip-families-title': 'Hôtels pour Familles',
        'tip-families-desc': 'Les meilleures destinations et hôtels adaptés aux voyages en famille avec enfants.',
        'tip-long-flight-title': 'Conseils pour Vols Long Courrier',
        'tip-long-flight-desc': 'Comment rendre vos longs trajets en avion plus confortables et agréables.',
        'tip-suitcase-title': 'Préparer sa Valise',
        'tip-suitcase-desc': 'Guide complet pour préparer votre valise selon votre destination et la durée du voyage.',
        'tip-responsible-title': 'Voyager Responsable',
        'tip-responsible-desc': 'Découvrez comment voyager de manière éco-responsable et respectueuse de l\'environnement.',
        
        // Promotions
        'promo-title': 'Promotions Exclusives',
        'promo-subtitle': 'Profitez de nos meilleures offres du moment',
        'promo-view-all': 'Voir toutes les promotions →',
        'promo-europe-title': 'Vols vers l\'Europe',
        'promo-europe-desc': 'Profitez de réductions exceptionnelles sur vos vols vers les plus belles destinations européennes.',
        'promo-europe-btn': 'Réserver maintenant',
        'promo-hotels-title': 'Hôtels de Luxe',
        'promo-hotels-desc': 'Offres spéciales sur une sélection d\'hôtels 5 étoiles dans le monde entier.',
        'promo-cars-title': 'Location de Voitures',
        'promo-cars-desc': 'Économisez sur vos locations de voitures pour vos prochaines vacances.',
        
        // Promotions Page
        'promo-page-title': 'Promotions Exclusives',
        'promo-page-subtitle': 'Découvrez nos meilleures offres et économisez sur vos prochains voyages',
        'promo-filter-all': 'Toutes',
        'promo-filter-vols': 'Vols',
        'promo-filter-hotels': 'Hôtels',
        'promo-filter-voitures': 'Voitures',
        'promo-filter-packages': 'Packages',
        
        // Promotion 1: Everyday Escape
        'promo-everyday-category': 'Échappées Quotidiennes',
        'promo-everyday-title': 'Everyday Escape',
        'promo-everyday-desc': 'Profitez d\'offres exceptionnelles chaque jour ! Des promotions quotidiennes sur les vols, hôtels et packages pour satisfaire toutes vos envies de voyage.',
        'promo-everyday-daily': 'Offres quotidiennes renouvelées',
        'promo-everyday-destinations': 'Destinations mondiales',
        'promo-everyday-prices': 'Meilleurs prix garantis',
        'promo-everyday-exclusive': 'Promotions exclusives',
        'promo-everyday-btn': 'Découvrir les offres',
        
        // Promotion 2: Holiday Deals
        'promo-holiday-category': 'Vacances 2025',
        'promo-holiday-title': 'Holiday Deals 2025',
        'promo-holiday-desc': 'Préparez vos vacances 2025 dès maintenant ! Des offres incroyables sur les packages vacances, vols et hôtels pour toute l\'année. Réservez tôt et économisez !',
        'promo-holiday-valid': 'Valable toute l\'année 2025',
        'promo-holiday-included': 'Vols + Hôtels inclus',
        'promo-holiday-benefits': 'Avantages exclusifs',
        'promo-holiday-per-person': 'par personne',
        'promo-holiday-btn': 'Réserver maintenant',
        
        // Promotion 3: Special Promotions
        'promo-special-category': 'Promotions Spéciales',
        'promo-special-title': 'Promotions Exclusives',
        'promo-special-desc': 'Découvrez nos promotions spéciales sur une sélection de destinations. Des réductions exceptionnelles sur les vols et séjours pour des vacances inoubliables.',
        'promo-special-flights': 'Vols à prix réduits',
        'promo-special-hotels': 'Hôtels sélectionnés',
        'promo-special-limited': 'Offres limitées',
        'promo-special-btn': 'Voir les offres',
        
        // Promotion 4: Citi
        'promo-citi-category': 'Carte Citi',
        'promo-citi-title': '50% de Réduction Citi',
        'promo-citi-desc': 'Détenteurs de carte Citi, profitez de 50% de réduction sur vos réservations ! Une offre exclusive pour les membres Citi avec des économies exceptionnelles.',
        'promo-citi-exclusive': 'Exclusif carte Citi',
        'promo-citi-discount': '50% de réduction',
        'promo-citi-limited': 'Offre limitée',
        'promo-citi-with-card': 'avec carte Citi',
        'promo-citi-btn': 'Profiter de l\'offre',
        
        // Promotion 5: DBS
        'promo-dbs-category': 'DBS',
        'promo-dbs-title': 'DBS Mon Yays',
        'promo-dbs-desc': 'Offres spéciales DBS ! Profitez de réductions exclusives sur les hôtels et séjours pour les détenteurs de carte DBS. Des économies sur vos prochaines escapades.',
        'promo-dbs-exclusive': 'Exclusif carte DBS',
        'promo-dbs-selected': 'Hôtels sélectionnés',
        'promo-dbs-members': 'Avantages membres',
        'promo-dbs-with-card': 'avec carte DBS',
        'promo-dbs-btn': 'Réserver maintenant',
        
        // Promotion 6: Travel Ideas
        'promo-ideas-category': 'Inspiration',
        'promo-ideas-title': 'Idées de Voyage',
        'promo-ideas-desc': 'Besoin d\'inspiration pour votre prochain voyage ? Découvrez nos idées de voyage, destinations tendances et packages personnalisés pour créer des souvenirs inoubliables.',
        'promo-ideas-trending': 'Destinations tendances',
        'promo-ideas-guides': 'Guides de voyage',
        'promo-ideas-personalized': 'Packages personnalisés',
        'promo-ideas-discover': 'Découvrez nos idées',
        'promo-ideas-btn': 'Explorer',
        
        // Promotions Page
        'promo-page-title': 'Promotions Exclusives',
        'promo-page-subtitle': 'Découvrez nos meilleures offres et économisez sur vos prochains voyages',
        'promo-page-title-tag': 'Promotions - SAFARIHOO',
        'promo-filter-all': 'Toutes',
        'promo-filter-vols': 'Vols',
        'promo-filter-hotels': 'Hôtels',
        'promo-filter-voitures': 'Voitures',
        'promo-filter-packages': 'Packages',
        'promo-everyday-category': 'Échappées Quotidiennes',
        'promo-everyday-title': 'Everyday Escape',
        'promo-everyday-desc': 'Profitez d\'offres exceptionnelles chaque jour ! Des promotions quotidiennes sur les vols, hôtels et packages pour satisfaire toutes vos envies de voyage.',
        'promo-everyday-daily': 'Offres quotidiennes renouvelées',
        'promo-everyday-destinations': 'Destinations mondiales',
        'promo-everyday-prices': 'Meilleurs prix garantis',
        'promo-everyday-exclusive': 'Promotions exclusives',
        'promo-everyday-btn': 'Découvrir les offres',
        'promo-holiday-category': 'Vacances 2025',
        'promo-holiday-title': 'Holiday Deals 2025',
        'promo-holiday-desc': 'Préparez vos vacances 2025 dès maintenant ! Des offres incroyables sur les packages vacances, vols et hôtels pour toute l\'année. Réservez tôt et économisez !',
        'promo-holiday-valid': 'Valable toute l\'année 2025',
        'promo-holiday-included': 'Vols + Hôtels inclus',
        'promo-holiday-benefits': 'Avantages exclusifs',
        'promo-holiday-per-person': 'par personne',
        'promo-holiday-btn': 'Réserver maintenant',
        'promo-special-category': 'Promotions Spéciales',
        'promo-special-title': 'Promotions Exclusives',
        'promo-special-desc': 'Découvrez nos promotions spéciales sur une sélection de destinations. Des réductions exceptionnelles sur les vols et séjours pour des vacances inoubliables.',
        'promo-special-flights': 'Vols à prix réduits',
        'promo-special-hotels': 'Hôtels sélectionnés',
        'promo-special-limited': 'Offres limitées',
        'promo-special-btn': 'Voir les offres',
        'promo-citi-category': 'Carte Citi',
        'promo-citi-title': '50% de Réduction Citi',
        'promo-citi-desc': 'Détenteurs de carte Citi, profitez de 50% de réduction sur vos réservations ! Une offre exclusive pour les membres Citi avec des économies exceptionnelles.',
        'promo-citi-exclusive': 'Exclusif carte Citi',
        'promo-citi-discount': '50% de réduction',
        'promo-citi-limited': 'Offre limitée',
        'promo-citi-with-card': 'avec carte Citi',
        'promo-citi-btn': 'Profiter de l\'offre',
        'promo-dbs-category': 'DBS',
        'promo-dbs-title': 'DBS Mon Yays',
        'promo-dbs-desc': 'Offres spéciales DBS ! Profitez de réductions exclusives sur les hôtels et séjours pour les détenteurs de carte DBS. Des économies sur vos prochaines escapades.',
        'promo-dbs-exclusive': 'Exclusif carte DBS',
        'promo-dbs-selected': 'Hôtels sélectionnés',
        'promo-dbs-members': 'Avantages membres',
        'promo-dbs-with-card': 'avec carte DBS',
        'promo-dbs-btn': 'Réserver maintenant',
        'promo-ideas-category': 'Inspiration',
        'promo-ideas-title': 'Idées de Voyage',
        'promo-ideas-desc': 'Besoin d\'inspiration pour votre prochain voyage ? Découvrez nos idées de voyage, destinations tendances et packages personnalisés pour créer des souvenirs inoubliables.',
        'promo-ideas-trending': 'Destinations tendances',
        'promo-ideas-guides': 'Guides de voyage',
        'promo-ideas-personalized': 'Packages personnalisés',
        'promo-ideas-discover': 'Découvrez nos idées',
        'promo-ideas-btn': 'Explorer',
        
        // Footer
        'footer-desc': 'Votre compagnon de voyage de confiance. Nous vous aidons à découvrir le monde avec les meilleures offres.',
        'footer-services': 'Services',
        'footer-info': 'Informations',
        'footer-legal': 'Légal',
        'footer-about': 'À propos',
        'footer-contact': 'Contact',
        'footer-faq': 'FAQ',
        'footer-legal-mentions': 'Mentions légales',
        'footer-legal-privacy': 'Politique de confidentialité',
        'footer-legal-terms': 'Conditions d\'utilisation',
        'footer-copyright': 'Tous droits réservés.',
        
        // Chat
        'chat-title': 'AI Chat Assistant',
        'chat-placeholder': 'Tapez votre message...',
        'chat-send': 'Envoyer',
        'chat-welcome': 'Bonjour ! Je suis votre assistant de voyage. Comment puis-je vous aider aujourd\'hui ?',
        
        // Articles
        'article-published': 'Publié le',
        'article-by': 'Par SAFARIHOO',
        'article-back': '← Retour aux astuces',
        
        // Article: Animaux
        'article-animaux-title': 'Voyager avec un Animal',
        'article-animaux-intro': 'Voyager avec votre animal de compagnie peut être une expérience enrichissante, mais cela nécessite une préparation minutieuse. Que vous partiez en avion, en train ou en voiture, voici nos conseils essentiels pour garantir un voyage sûr et confortable pour vous et votre compagnon à quatre pattes.',
        'article-animaux-prepare-title': 'Préparer le voyage',
        'article-animaux-prepare-text': 'Avant de partir, il est crucial de bien préparer votre animal et tous les documents nécessaires :',
        'article-animaux-docs-title': 'Documents requis',
        'article-animaux-docs-1': 'Carnet de santé à jour : Assurez-vous que toutes les vaccinations sont à jour',
        'article-animaux-docs-2': 'Passeport pour animal : Obligatoire pour les voyages internationaux en Europe',
        'article-animaux-docs-3': 'Certificat vétérinaire : Généralement requis dans les 10 jours précédant le voyage',
        'article-animaux-docs-4': 'Assurance voyage : Vérifiez que votre assurance couvre votre animal',
        'article-animaux-prepare-animal-title': 'Préparer votre animal',
        'article-animaux-prepare-animal-1': 'Faites une visite chez le vétérinaire avant le départ',
        'article-animaux-prepare-animal-2': 'Assurez-vous que votre animal est identifié (puce électronique ou tatouage)',
        'article-animaux-prepare-animal-3': 'Entraînez votre animal à voyager dans sa caisse de transport',
        'article-animaux-prepare-animal-4': 'Préparez une trousse de secours avec les médicaments nécessaires',
        'article-animaux-avion-title': 'Voyager en avion',
        'article-animaux-avion-text': 'Les compagnies aériennes ont des règles strictes concernant le transport d\'animaux. Voici ce que vous devez savoir :',
        'article-animaux-cabine-title': 'En cabine',
        'article-animaux-cabine-1': 'Généralement autorisé pour les petits animaux (moins de 8 kg avec la caisse)',
        'article-animaux-cabine-2': 'La caisse doit être approuvée IATA et s\'adapter sous le siège devant vous',
        'article-animaux-cabine-3': 'Réservation obligatoire à l\'avance (places limitées)',
        'article-animaux-cabine-4': 'Frais supplémentaires généralement entre 50€ et 150€',
        'article-animaux-soute-title': 'En soute',
        'article-animaux-soute-1': 'Pour les animaux plus grands ou certaines races',
        'article-animaux-soute-2': 'Caisse de transport rigide et ventilée obligatoire',
        'article-animaux-soute-3': 'Vérifiez les restrictions de température (certaines compagnies refusent par temps chaud)',
        'article-animaux-soute-4': 'Évitez de donner des tranquillisants sans avis vétérinaire',
        'article-animaux-voiture-title': 'Voyager en voiture',
        'article-animaux-voiture-text': 'Pour les voyages en voiture, la sécurité est primordiale :',
        'article-animaux-voiture-1': 'Utilisez une caisse de transport ou un harnais de sécurité',
        'article-animaux-voiture-2': 'Ne laissez jamais votre animal libre dans la voiture',
        'article-animaux-voiture-3': 'Faites des pauses régulières pour permettre à votre animal de se dégourdir',
        'article-animaux-voiture-4': 'Gardez toujours de l\'eau fraîche à disposition',
        'article-animaux-voiture-5': 'Ne laissez jamais votre animal seul dans la voiture, surtout par temps chaud',
        'article-animaux-conseils-title': 'Conseils généraux',
        'article-animaux-conseils-1': 'Préparez une trousse de secours avec les médicaments de votre animal',
        'article-animaux-conseils-2': 'Apportez suffisamment de nourriture pour le voyage',
        'article-animaux-conseils-3': 'Emportez les jouets préférés de votre animal pour le rassurer',
        'article-animaux-conseils-4': 'Informez-vous sur les règles spécifiques de votre destination',
        'article-animaux-conseils-5': 'Prévoyez un plan B en cas d\'urgence',
        'article-animaux-conclusion': 'En suivant ces conseils, vous et votre animal pourrez profiter d\'un voyage agréable et sans stress. N\'oubliez pas que chaque animal est unique, adaptez ces conseils selon les besoins spécifiques de votre compagnon.',
        
        // Article: Hotels Animaux
        'article-hotels-animaux-title': 'Hôtels qui Acceptent les Animaux',
        'article-hotels-animaux-intro': 'Trouver un hôtel qui accepte les animaux de compagnie peut parfois être un défi. Heureusement, de plus en plus d\'établissements ouvrent leurs portes à nos compagnons à quatre pattes. Voici un guide complet pour trouver les meilleurs hôtels accueillant les animaux.',
        'article-hotels-animaux-trouver-title': 'Comment trouver un hôtel pet-friendly',
        'article-hotels-animaux-filtres-title': '1. Utilisez les filtres de recherche',
        'article-hotels-animaux-filtres-text': 'La plupart des sites de réservation en ligne offrent des filtres spécifiques pour les hôtels acceptant les animaux. Recherchez les options "Animaux acceptés" ou "Pet-friendly" lors de votre recherche.',
        'article-hotels-animaux-contacter-title': '2. Contactez directement l\'hôtel',
        'article-hotels-animaux-contacter-text': 'Même si un hôtel n\'affiche pas explicitement qu\'il accepte les animaux, il vaut toujours la peine de les contacter directement. Certains établissements font des exceptions ou ont des politiques flexibles.',
        'article-hotels-animaux-restrictions-title': '3. Vérifiez les restrictions',
        'article-hotels-animaux-restrictions-1': 'Taille et poids : Certains hôtels n\'acceptent que les petits animaux',
        'article-hotels-animaux-restrictions-2': 'Nombre d\'animaux : Limite souvent à 1 ou 2 animaux par chambre',
        'article-hotels-animaux-restrictions-3': 'Races : Certaines races peuvent être interdites',
        'article-hotels-animaux-restrictions-4': 'Frais supplémentaires : Prévoyez généralement entre 10€ et 50€ par nuit',
        'article-hotels-animaux-chaines-title': 'Chaines d\'hôtels pet-friendly',
        'article-hotels-animaux-chaines-text': 'Plusieurs chaînes d\'hôtels sont réputées pour leur accueil des animaux :',
        'article-hotels-animaux-services-title': 'Services offerts par les hôtels pet-friendly',
        'article-hotels-animaux-services-text': 'Les meilleurs hôtels pour animaux offrent des services supplémentaires :',
        'article-hotels-animaux-services-1': 'Bol d\'eau et de nourriture à l\'arrivée',
        'article-hotels-animaux-services-2': 'Lit et couverture pour votre animal',
        'article-hotels-animaux-services-3': 'Jouets et friandises',
        'article-hotels-animaux-services-4': 'Service de garde d\'animaux',
        'article-hotels-animaux-services-5': 'Promenades avec un dog-sitter',
        'article-hotels-animaux-services-6': 'Menus spéciaux pour animaux',
        'article-hotels-animaux-services-7': 'Zones désignées pour les promenades',
        'article-hotels-animaux-reserver-title': 'Conseils pour réserver',
        'article-hotels-animaux-reserver-1': 'Mentionnez toujours que vous voyagez avec un animal lors de la réservation',
        'article-hotels-animaux-reserver-2': 'Demandez les règles spécifiques de l\'hôtel concernant les animaux',
        'article-hotels-animaux-reserver-3': 'Vérifiez les frais supplémentaires à l\'avance',
        'article-hotels-animaux-reserver-4': 'Demandez une chambre au rez-de-chaussée si possible (plus pratique pour les sorties)',
        'article-hotels-animaux-reserver-5': 'Apportez les documents de vaccination de votre animal',
        'article-hotels-animaux-pratiques-title': 'Bonnes pratiques pendant le séjour',
        'article-hotels-animaux-pratiques-1': 'Respectez les règles de l\'hôtel concernant les animaux',
        'article-hotels-animaux-pratiques-2': 'Ne laissez pas votre animal seul dans la chambre s\'il aboie',
        'article-hotels-animaux-pratiques-3': 'Utilisez toujours une laisse dans les espaces communs',
        'article-hotels-animaux-pratiques-4': 'Nettoyez après votre animal',
        'article-hotels-animaux-pratiques-5': 'Respectez les autres clients',
        'article-hotels-animaux-conclusion': 'Avec ces conseils, vous devriez pouvoir trouver facilement un hôtel accueillant pour vous et votre animal de compagnie. N\'oubliez pas de réserver à l\'avance, car les chambres pet-friendly sont souvent limitées !',
        
        // Article: Hotels Famille
        'article-hotels-famille-title': 'Hôtels pour Familles',
        'article-hotels-famille-intro': 'Voyager en famille avec des enfants nécessite une planification particulière, surtout en ce qui concerne le choix de l\'hébergement. Un bon hôtel pour familles peut faire toute la différence entre des vacances réussies et un séjour stressant. Voici nos conseils pour trouver les meilleurs hôtels adaptés aux familles.',
        'article-hotels-famille-conclusion': 'En choisissant le bon hôtel, vous pouvez créer des souvenirs inoubliables pour toute la famille. Prenez le temps de bien rechercher et n\'hésitez pas à poser des questions pour vous assurer que l\'hôtel répond à tous vos besoins familiaux.',
        
        // Article: Vols Long Courrier
        'article-vols-long-courrier-title': 'Conseils pour Vols Long Courrier',
        'article-vols-long-courrier-intro': 'Les vols long courrier peuvent être éprouvants, mais avec les bonnes préparations et astuces, vous pouvez rendre votre voyage beaucoup plus confortable et agréable. Voici nos meilleurs conseils pour survivre et même profiter d\'un vol de plusieurs heures.',
        'article-vols-long-courrier-conclusion': 'Avec ces conseils, vous devriez pouvoir rendre vos vols long courrier beaucoup plus agréables. N\'oubliez pas que la préparation est la clé d\'un voyage confortable !',
        
        // Article: Valise
        'article-valise-title': 'Préparer sa Valise',
        'article-valise-intro': 'Préparer sa valise peut sembler simple, mais c\'est un art qui peut faire toute la différence entre un voyage agréable et un séjour stressant. Que vous partiez pour un week-end ou un mois, voici notre guide complet pour préparer la valise parfaite.',
        'article-valise-conclusion': 'En suivant cette checklist et ces conseils, vous serez bien préparé pour votre voyage. N\'oubliez pas : il vaut mieux emporter moins et laver sur place que de surcharger votre valise !',
        
        // Article: Voyage Responsable
        'article-voyage-responsable-title': 'Voyager Responsable',
        'article-voyage-responsable-intro': 'Le tourisme responsable est devenu essentiel pour préserver notre planète et soutenir les communautés locales. Voyager de manière éco-responsable ne signifie pas renoncer au confort, mais plutôt faire des choix conscients qui bénéficient à l\'environnement et aux populations locales. Voici comment voyager de manière responsable.',
        'article-voyage-responsable-conclusion': 'Voyager de manière responsable enrichit non seulement votre expérience, mais contribue également à préserver notre planète et à soutenir les communautés que vous visitez. Chaque petit geste compte !'
    },
    en: {
        // Navigation
        'nav-accueil': 'Home',
        'nav-vols': 'Flights',
        'nav-hotels': 'Hotels',
        'nav-voitures': 'Cars',
        'nav-promotions': 'Promotions',
        'nav-ai-chat': 'AI Chat',
        
        // Hero Section
        'hero-title': 'Explore the World with SAFARIHOO',
        'hero-subtitle': 'Find the best deals for your travels',
        'search-tab-vols': 'Flights',
        'search-tab-hotels': 'Hotels',
        'search-tab-voitures': 'Cars',
        'search-origin': 'Departure city',
        'search-destination': 'Destination',
        'search-departure': 'Departure date',
        'search-return': 'Return date',
        'search-passengers': 'Passengers & Class',
        'search-passengers-text': '1 passenger, Economy',
        'search-passengers-label': 'Number of passengers',
        'search-adults': 'Adults',
        'search-adults-age': '12 years and older',
        'search-children': 'Children',
        'search-children-age': '2-11 years',
        'search-infants': 'Infants',
        'search-infants-age': 'Under 2 years',
        'search-class': 'Class',
        'search-class-economy': 'Economy',
        'search-class-comfort': 'Comfort',
        'search-class-business': 'Business',
        'search-class-first': 'First',
        'search-hotel-destination': 'Where are you going?',
        'search-hotel-checkin': 'Check-in',
        'search-hotel-checkout': 'Check-out',
        'search-hotel-guests': 'Rooms & Guests',
        'search-hotel-guests-text': '2 rooms, 2 adults, 0 children',
        'search-hotel-rooms': 'Rooms',
        'search-hotel-rooms-label': 'Number of rooms',
        'search-hotel-adults': 'Adults',
        'search-hotel-adults-age': '18 years and older',
        'search-hotel-children': 'Children',
        'search-hotel-children-age': '0-17 years',
        'search-hotel-done': 'Done',
        'search-car-pickup': 'Pickup location',
        'search-car-pickup-placeholder': 'City or airport',
        'search-car-pickup-date': 'Pickup date',
        'search-car-return-date': 'Return date',
        'search-btn-vols': 'Search flights',
        'search-btn-hotels': 'Search',
        'search-btn-cars': 'Search',
        
        // Travel Tips
        'tips-title': 'Travel Tips',
        'tips-subtitle': 'Discover our practical guides to travel with peace of mind',
        'tip-animals-title': 'Traveling with a Pet',
        'tip-animals-desc': 'Essential tips for traveling with your four-legged companion safely and comfortably.',
        'tip-animals-btn': 'Read article',
        'tip-hotels-animals-title': 'Pet-Friendly Hotels',
        'tip-hotels-animals-desc': 'Discover how to find the best hotels welcoming your pets.',
        'tip-families-title': 'Family Hotels',
        'tip-families-desc': 'The best destinations and hotels adapted for family travel with children.',
        'tip-long-flight-title': 'Long-Haul Flight Tips',
        'tip-long-flight-desc': 'How to make your long flights more comfortable and enjoyable.',
        'tip-suitcase-title': 'Packing Your Suitcase',
        'tip-suitcase-desc': 'Complete guide to packing your suitcase according to your destination and trip duration.',
        'tip-responsible-title': 'Responsible Travel',
        'tip-responsible-desc': 'Discover how to travel in an eco-friendly and environmentally respectful way.',
        
        // Promotions
        'promo-title': 'Exclusive Promotions',
        'promo-subtitle': 'Enjoy our best offers of the moment',
        'promo-view-all': 'View all promotions →',
        'promo-europe-title': 'Flights to Europe',
        'promo-europe-desc': 'Enjoy exceptional discounts on flights to the most beautiful European destinations.',
        'promo-europe-btn': 'Book now',
        'promo-hotels-title': 'Luxury Hotels',
        'promo-hotels-desc': 'Special offers on a selection of 5-star hotels worldwide.',
        'promo-cars-title': 'Car Rental',
        'promo-cars-desc': 'Save on your car rentals for your next vacation.',
        
        // Promotions Page
        'promo-page-title': 'Exclusive Promotions',
        'promo-page-subtitle': 'Discover our best offers and save on your next trips',
        'promo-filter-all': 'All',
        'promo-filter-vols': 'Flights',
        'promo-filter-hotels': 'Hotels',
        'promo-filter-voitures': 'Cars',
        'promo-filter-packages': 'Packages',
        
        // Promotion 1: Everyday Escape
        'promo-everyday-category': 'Daily Escapes',
        'promo-everyday-title': 'Everyday Escape',
        'promo-everyday-desc': 'Enjoy exceptional offers every day! Daily promotions on flights, hotels and packages to satisfy all your travel desires.',
        'promo-everyday-daily': 'Daily renewed offers',
        'promo-everyday-destinations': 'Worldwide destinations',
        'promo-everyday-prices': 'Best prices guaranteed',
        'promo-everyday-exclusive': 'Exclusive promotions',
        'promo-everyday-btn': 'Discover offers',
        
        // Promotion 2: Holiday Deals
        'promo-holiday-category': '2025 Holidays',
        'promo-holiday-title': 'Holiday Deals 2025',
        'promo-holiday-desc': 'Prepare your 2025 vacations now! Amazing offers on vacation packages, flights and hotels for the whole year. Book early and save!',
        'promo-holiday-valid': 'Valid all year 2025',
        'promo-holiday-included': 'Flights + Hotels included',
        'promo-holiday-benefits': 'Exclusive benefits',
        'promo-holiday-per-person': 'per person',
        'promo-holiday-btn': 'Book now',
        
        // Promotion 3: Special Promotions
        'promo-special-category': 'Special Promotions',
        'promo-special-title': 'Exclusive Promotions',
        'promo-special-desc': 'Discover our special promotions on a selection of destinations. Exceptional discounts on flights and stays for unforgettable vacations.',
        'promo-special-flights': 'Discounted flights',
        'promo-special-hotels': 'Selected hotels',
        'promo-special-limited': 'Limited offers',
        'promo-special-btn': 'View offers',
        
        // Promotion 4: Citi
        'promo-citi-category': 'Citi Card',
        'promo-citi-title': 'Citi 50% Off',
        'promo-citi-desc': 'Citi cardholders, enjoy 50% off on your bookings! An exclusive offer for Citi members with exceptional savings.',
        'promo-citi-exclusive': 'Exclusive Citi card',
        'promo-citi-discount': '50% discount',
        'promo-citi-limited': 'Limited offer',
        'promo-citi-with-card': 'with Citi card',
        'promo-citi-btn': 'Take advantage',
        
        // Promotion 5: DBS
        'promo-dbs-category': 'DBS',
        'promo-dbs-title': 'DBS Mon Yays',
        'promo-dbs-desc': 'Special DBS offers! Enjoy exclusive discounts on hotels and stays for DBS cardholders. Savings on your next getaways.',
        'promo-dbs-exclusive': 'Exclusive DBS card',
        'promo-dbs-selected': 'Selected hotels',
        'promo-dbs-members': 'Member benefits',
        'promo-dbs-with-card': 'with DBS card',
        'promo-dbs-btn': 'Book now',
        
        // Promotion 6: Travel Ideas
        'promo-ideas-category': 'Inspiration',
        'promo-ideas-title': 'Travel Ideas',
        'promo-ideas-desc': 'Need inspiration for your next trip? Discover our travel ideas, trending destinations and personalized packages to create unforgettable memories.',
        'promo-ideas-trending': 'Trending destinations',
        'promo-ideas-guides': 'Travel guides',
        'promo-ideas-personalized': 'Personalized packages',
        'promo-ideas-discover': 'Discover our ideas',
        'promo-ideas-btn': 'Explore',
        
        // Promotions Page
        'promo-page-title': 'Exclusive Promotions',
        'promo-page-subtitle': 'Discover our best offers and save on your next trips',
        'promo-filter-all': 'All',
        'promo-filter-vols': 'Flights',
        'promo-filter-hotels': 'Hotels',
        'promo-filter-voitures': 'Cars',
        'promo-filter-packages': 'Packages',
        'promo-everyday-category': 'Daily Escapes',
        'promo-everyday-title': 'Everyday Escape',
        'promo-everyday-desc': 'Enjoy exceptional offers every day! Daily promotions on flights, hotels and packages to satisfy all your travel desires.',
        'promo-everyday-daily': 'Daily renewed offers',
        'promo-everyday-destinations': 'Worldwide destinations',
        'promo-everyday-prices': 'Best prices guaranteed',
        'promo-everyday-exclusive': 'Exclusive promotions',
        'promo-everyday-btn': 'Discover offers',
        'promo-holiday-category': '2025 Holidays',
        'promo-holiday-title': 'Holiday Deals 2025',
        'promo-holiday-desc': 'Prepare your 2025 holidays now! Incredible offers on vacation packages, flights and hotels for the whole year. Book early and save!',
        'promo-holiday-valid': 'Valid all year 2025',
        'promo-holiday-included': 'Flights + Hotels included',
        'promo-holiday-benefits': 'Exclusive benefits',
        'promo-holiday-per-person': 'per person',
        'promo-holiday-btn': 'Book now',
        'promo-special-category': 'Special Promotions',
        'promo-special-title': 'Exclusive Promotions',
        'promo-special-desc': 'Discover our special promotions on a selection of destinations. Exceptional discounts on flights and stays for unforgettable vacations.',
        'promo-special-flights': 'Discounted flights',
        'promo-special-hotels': 'Selected hotels',
        'promo-special-limited': 'Limited offers',
        'promo-special-btn': 'View offers',
        'promo-citi-category': 'Citi Card',
        'promo-citi-title': '50% Off Citi',
        'promo-citi-desc': 'Citi cardholders, enjoy 50% off on your bookings! An exclusive offer for Citi members with exceptional savings.',
        'promo-citi-exclusive': 'Exclusive Citi card',
        'promo-citi-discount': '50% discount',
        'promo-citi-limited': 'Limited offer',
        'promo-citi-with-card': 'with Citi card',
        'promo-citi-btn': 'Take advantage',
        'promo-dbs-category': 'DBS',
        'promo-dbs-title': 'DBS Mon Yays',
        'promo-dbs-desc': 'Special DBS offers! Enjoy exclusive discounts on hotels and stays for DBS cardholders. Savings on your next getaways.',
        'promo-dbs-exclusive': 'Exclusive DBS card',
        'promo-dbs-selected': 'Selected hotels',
        'promo-dbs-members': 'Member benefits',
        'promo-dbs-with-card': 'with DBS card',
        'promo-dbs-btn': 'Book now',
        'promo-ideas-category': 'Inspiration',
        'promo-ideas-title': 'Travel Ideas',
        'promo-ideas-desc': 'Need inspiration for your next trip? Discover our travel ideas, trending destinations and personalized packages to create unforgettable memories.',
        'promo-ideas-trending': 'Trending destinations',
        'promo-ideas-guides': 'Travel guides',
        'promo-ideas-personalized': 'Personalized packages',
        'promo-ideas-discover': 'Discover our ideas',
        'promo-ideas-btn': 'Explore',
        
        // Footer
        'footer-desc': 'Your trusted travel companion. We help you discover the world with the best offers.',
        'footer-services': 'Services',
        'footer-info': 'Information',
        'footer-legal': 'Legal',
        'footer-about': 'About',
        'footer-contact': 'Contact',
        'footer-faq': 'FAQ',
        'footer-legal-mentions': 'Legal notice',
        'footer-legal-privacy': 'Privacy policy',
        'footer-legal-terms': 'Terms of use',
        'footer-copyright': 'All rights reserved.',
        
        // Chat
        'chat-title': 'AI Chat Assistant',
        'chat-placeholder': 'Type your message...',
        'chat-send': 'Send',
        'chat-welcome': 'Hello! I am your travel assistant. How can I help you today?',
        
        // Articles
        'article-published': 'Published on',
        'article-by': 'By SAFARIHOO',
        'article-back': '← Back to tips',
        
        // Article: Animaux
        'article-animaux-title': 'Traveling with a Pet',
        'article-animaux-intro': 'Traveling with your pet can be a rewarding experience, but it requires careful preparation. Whether you\'re traveling by plane, train, or car, here are our essential tips to ensure a safe and comfortable journey for you and your four-legged companion.',
        'article-animaux-prepare-title': 'Preparing for travel',
        'article-animaux-prepare-text': 'Before leaving, it\'s crucial to properly prepare your pet and all necessary documents:',
        'article-animaux-docs-title': 'Required documents',
        'article-animaux-docs-1': 'Up-to-date health record: Make sure all vaccinations are current',
        'article-animaux-docs-2': 'Pet passport: Required for international travel in Europe',
        'article-animaux-docs-3': 'Veterinary certificate: Generally required within 10 days before travel',
        'article-animaux-docs-4': 'Travel insurance: Check that your insurance covers your pet',
        'article-animaux-prepare-animal-title': 'Preparing your pet',
        'article-animaux-prepare-animal-1': 'Visit the veterinarian before departure',
        'article-animaux-prepare-animal-2': 'Ensure your pet is identified (microchip or tattoo)',
        'article-animaux-prepare-animal-3': 'Train your pet to travel in its carrier',
        'article-animaux-prepare-animal-4': 'Prepare a first aid kit with necessary medications',
        'article-animaux-avion-title': 'Traveling by plane',
        'article-animaux-avion-text': 'Airlines have strict rules regarding pet transport. Here\'s what you need to know:',
        'article-animaux-cabine-title': 'In cabin',
        'article-animaux-cabine-1': 'Generally allowed for small animals (less than 8 kg with carrier)',
        'article-animaux-cabine-2': 'The carrier must be IATA approved and fit under the seat in front of you',
        'article-animaux-cabine-3': 'Advance reservation required (limited spaces)',
        'article-animaux-cabine-4': 'Additional fees generally between €50 and €150',
        'article-animaux-soute-title': 'In cargo hold',
        'article-animaux-soute-1': 'For larger animals or certain breeds',
        'article-animaux-soute-2': 'Rigid and ventilated transport carrier required',
        'article-animaux-soute-3': 'Check temperature restrictions (some airlines refuse in hot weather)',
        'article-animaux-soute-4': 'Avoid giving tranquilizers without veterinary advice',
        'article-animaux-voiture-title': 'Traveling by car',
        'article-animaux-voiture-text': 'For car travel, safety is paramount:',
        'article-animaux-voiture-1': 'Use a transport carrier or safety harness',
        'article-animaux-voiture-2': 'Never leave your pet loose in the car',
        'article-animaux-voiture-3': 'Take regular breaks to allow your pet to stretch',
        'article-animaux-voiture-4': 'Always keep fresh water available',
        'article-animaux-voiture-5': 'Never leave your pet alone in the car, especially in hot weather',
        'article-animaux-conseils-title': 'General tips',
        'article-animaux-conseils-1': 'Prepare a first aid kit with your pet\'s medications',
        'article-animaux-conseils-2': 'Bring enough food for the trip',
        'article-animaux-conseils-3': 'Bring your pet\'s favorite toys to reassure them',
        'article-animaux-conseils-4': 'Find out about specific rules for your destination',
        'article-animaux-conseils-5': 'Have a plan B in case of emergency',
        'article-animaux-conclusion': 'By following these tips, you and your pet can enjoy a pleasant and stress-free trip. Remember that each animal is unique, adapt these tips according to your companion\'s specific needs.',
        
        // Article: Hotels Animaux
        'article-hotels-animaux-title': 'Pet-Friendly Hotels',
        'article-hotels-animaux-intro': 'Finding a hotel that accepts pets can sometimes be a challenge. Fortunately, more and more establishments are opening their doors to our four-legged companions. Here is a complete guide to finding the best pet-friendly hotels.',
        'article-hotels-animaux-trouver-title': 'How to find a pet-friendly hotel',
        'article-hotels-animaux-filtres-title': '1. Use search filters',
        'article-hotels-animaux-filtres-text': 'Most online booking sites offer specific filters for hotels that accept pets. Look for "Pets allowed" or "Pet-friendly" options when searching.',
        'article-hotels-animaux-contacter-title': '2. Contact the hotel directly',
        'article-hotels-animaux-contacter-text': 'Even if a hotel doesn\'t explicitly state that it accepts pets, it\'s always worth contacting them directly. Some establishments make exceptions or have flexible policies.',
        'article-hotels-animaux-restrictions-title': '3. Check restrictions',
        'article-hotels-animaux-restrictions-1': 'Size and weight: Some hotels only accept small animals',
        'article-hotels-animaux-restrictions-2': 'Number of animals: Often limited to 1 or 2 animals per room',
        'article-hotels-animaux-restrictions-3': 'Breeds: Certain breeds may be prohibited',
        'article-hotels-animaux-restrictions-4': 'Additional fees: Generally expect between €10 and €50 per night',
        'article-hotels-animaux-chaines-title': 'Pet-friendly hotel chains',
        'article-hotels-animaux-chaines-text': 'Several hotel chains are known for welcoming pets:',
        'article-hotels-animaux-services-title': 'Services offered by pet-friendly hotels',
        'article-hotels-animaux-services-text': 'The best pet hotels offer additional services:',
        'article-hotels-animaux-services-1': 'Water and food bowl upon arrival',
        'article-hotels-animaux-services-2': 'Bed and blanket for your pet',
        'article-hotels-animaux-services-3': 'Toys and treats',
        'article-hotels-animaux-services-4': 'Pet sitting service',
        'article-hotels-animaux-services-5': 'Walks with a dog-sitter',
        'article-hotels-animaux-services-6': 'Special menus for pets',
        'article-hotels-animaux-services-7': 'Designated walking areas',
        'article-hotels-animaux-reserver-title': 'Booking tips',
        'article-hotels-animaux-reserver-1': 'Always mention that you\'re traveling with a pet when booking',
        'article-hotels-animaux-reserver-2': 'Ask about the hotel\'s specific rules regarding pets',
        'article-hotels-animaux-reserver-3': 'Check additional fees in advance',
        'article-hotels-animaux-reserver-4': 'Request a ground floor room if possible (more convenient for walks)',
        'article-hotels-animaux-reserver-5': 'Bring your pet\'s vaccination documents',
        'article-hotels-animaux-pratiques-title': 'Good practices during your stay',
        'article-hotels-animaux-pratiques-1': 'Respect the hotel\'s rules regarding pets',
        'article-hotels-animaux-pratiques-2': 'Don\'t leave your pet alone in the room if it barks',
        'article-hotels-animaux-pratiques-3': 'Always use a leash in common areas',
        'article-hotels-animaux-pratiques-4': 'Clean up after your pet',
        'article-hotels-animaux-pratiques-5': 'Respect other guests',
        'article-hotels-animaux-conclusion': 'With these tips, you should be able to easily find a welcoming hotel for you and your pet. Remember to book in advance, as pet-friendly rooms are often limited!',
        
        // Article: Hotels Famille
        'article-hotels-famille-title': 'Family Hotels',
        'article-hotels-famille-intro': 'Traveling with children requires special planning, especially when it comes to choosing accommodation. A good family hotel can make all the difference between a successful vacation and a stressful stay. Here are our tips for finding the best family-friendly hotels.',
        'article-hotels-famille-conclusion': 'By choosing the right hotel, you can create unforgettable memories for the whole family. Take the time to research well and don\'t hesitate to ask questions to ensure the hotel meets all your family needs.',
        
        // Article: Vols Long Courrier
        'article-vols-long-courrier-title': 'Long-Haul Flight Tips',
        'article-vols-long-courrier-intro': 'Long-haul flights can be exhausting, but with the right preparations and tips, you can make your journey much more comfortable and enjoyable. Here are our best tips for surviving and even enjoying a multi-hour flight.',
        'article-vols-long-courrier-conclusion': 'With these tips, you should be able to make your long-haul flights much more pleasant. Remember that preparation is the key to a comfortable trip!',
        
        // Article: Valise
        'article-valise-title': 'Packing Your Suitcase',
        'article-valise-intro': 'Packing your suitcase may seem simple, but it\'s an art that can make all the difference between a pleasant trip and a stressful stay. Whether you\'re leaving for a weekend or a month, here is our complete guide to packing the perfect suitcase.',
        'article-valise-conclusion': 'By following this checklist and these tips, you\'ll be well prepared for your trip. Remember: it\'s better to pack less and wash on site than to overload your suitcase!',
        
        // Article: Voyage Responsable
        'article-voyage-responsable-title': 'Responsible Travel',
        'article-voyage-responsable-intro': 'Responsible tourism has become essential to preserve our planet and support local communities. Traveling in an eco-friendly way doesn\'t mean giving up comfort, but rather making conscious choices that benefit the environment and local populations. Here\'s how to travel responsibly.',
        'article-voyage-responsable-conclusion': 'Traveling responsibly not only enriches your experience, but also helps preserve our planet and support the communities you visit. Every little gesture counts!'
    }
};

// Get current language from localStorage or default to 'fr'
let currentLang = localStorage.getItem('language') || 'fr';

// Function to translate the page
function translatePage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    // Update language button
const langBtn = document.getElementById('langBtn');
if (langBtn) {
        langBtn.textContent = lang === 'fr' ? 'FR' : 'EN';
    }
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Translate all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' && element.type !== 'submit' && element.type !== 'button') {
                element.placeholder = translations[lang][key];
            } else if (element.tagName === 'BUTTON' || element.type === 'submit') {
                element.textContent = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // Update page title
    const titleElement = document.querySelector('title');
    if (titleElement) {
        if (lang === 'fr') {
            // Check if we're on promotions page
            if (window.location.pathname.includes('promotions.html')) {
                titleElement.textContent = 'Promotions - SAFARIHOO';
            } else if (window.location.pathname.includes('contact.html')) {
                titleElement.textContent = 'Contact - SAFARIHOO';
            } else if (window.location.pathname.includes('animaux.html') || 
                       window.location.pathname.includes('hotels-animaux.html') ||
                       window.location.pathname.includes('hotels-famille.html') ||
                       window.location.pathname.includes('vols-long-courrier.html') ||
                       window.location.pathname.includes('valise.html') ||
                       window.location.pathname.includes('voyage-responsable.html')) {
                // Get article title from page
                const articleTitle = document.querySelector('.article-title');
                if (articleTitle) {
                    titleElement.textContent = articleTitle.textContent + ' - SAFARIHOO';
                } else {
                    titleElement.textContent = 'Article - SAFARIHOO';
                }
            } else {
                titleElement.textContent = 'SAFARIHOO - Votre Compagnon de Voyage';
            }
        } else {
            // Check if we're on promotions page
            if (window.location.pathname.includes('promotions.html')) {
                titleElement.textContent = 'Promotions - SAFARIHOO';
            } else if (window.location.pathname.includes('contact.html')) {
                titleElement.textContent = 'Contact - SAFARIHOO';
            } else if (window.location.pathname.includes('animaux.html') || 
                       window.location.pathname.includes('hotels-animaux.html') ||
                       window.location.pathname.includes('hotels-famille.html') ||
                       window.location.pathname.includes('vols-long-courrier.html') ||
                       window.location.pathname.includes('valise.html') ||
                       window.location.pathname.includes('voyage-responsable.html')) {
                // Get article title from page (will be translated)
                const articleTitle = document.querySelector('.article-title');
                if (articleTitle) {
                    titleElement.textContent = articleTitle.textContent + ' - SAFARIHOO';
                } else {
                    titleElement.textContent = 'Article - SAFARIHOO';
                }
            } else {
                titleElement.textContent = 'SAFARIHOO - Your Travel Companion';
            }
        }
    }
    
    // Update dynamic texts
    updatePassengersDisplay();
    updateHotelsGuestsDisplay();
}

// Language button handler - will be initialized after DOM is loaded
// Initial translation will happen in DOMContentLoaded

// ===== 3D Tilt Effect =====
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        // Désactiver l'effet tilt pour les cartes de promotion
        if (element.classList.contains('promo-card-extended')) {
            return;
        }
        
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Exclure les cartes de promotion étendues pour éviter les mouvements au scroll
    const animatedElements = document.querySelectorAll('.tip-card, .promo-card:not(.promo-card-extended)');
    animatedElements.forEach(el => observer.observe(el));
}

// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"], a[href*="index.html"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        // Check if this link has a data-search-tab attribute
        const searchTab = this.getAttribute('data-search-tab');
        
        // If link points to index.html from another page, handle navigation
        if (href.includes('index.html')) {
            // Store the search tab in sessionStorage to activate it after page load
            if (searchTab) {
                sessionStorage.setItem('activateSearchTab', searchTab);
            }
            // Let the browser navigate normally
            return; // Don't prevent default, let navigation happen
        }
        
        // Handle anchor links on the same page
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            // Calculate header height dynamically
            const header = document.getElementById('header');
            const headerHeight = header ? header.offsetHeight : 80;
            const headerOffset = headerHeight + 20; // Add extra space
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // If the link has a search tab attribute, activate it after scroll
            if (searchTab) {
                // Wait for scroll to complete, then activate the tab
                setTimeout(() => {
                    activateSearchTab(searchTab);
                }, 500); // Delay to allow smooth scroll to start
            }
            
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (hamburger) hamburger.classList.remove('active');
            }
        }
    });
});

// ===== Redirection Functions =====
// Fonction pour rediriger vers les liens d'affiliation
// REMPLACEZ CES URLS PAR VOS VRAIS LIENS D'AFFILIATION
const affiliateLinks = {
    'vols': 'https://aviasales.tpm.li/LrJL8WFF',
    'hotels': 'https://www.trip.com/t/Kv2mSwFFNS2',
    'voitures': 'https://getrentacar.tpm.li/vioWZ86l',
    'promo-europe': 'https://example.com/affiliate/promo-europe',
    'promo-hotels': 'https://example.com/affiliate/promo-hotels',
    'promo-voitures': 'https://example.com/affiliate/promo-voitures',
};

// Marker d'affiliation Aviasales
// IMPORTANT: Remplacez ce marker par celui de votre lien d'affiliation
// Vous pouvez le trouver dans l'URL de votre lien d'affiliation Aviasales
// Format attendu: 569298.Zz04443f1a611148059b3d71e-569298
// 
// Pour trouver votre marker:
// 1. Faites une recherche sur Aviasales via votre lien d'affiliation
// 2. Regardez l'URL générée, le marker est dans le paramètre ?marker=...
// 3. Copiez la valeur complète du marker ici
const AViasales_MARKER = '569298.Zz04443f1a611148059b3d71e-569298';

// Paramètres d'affiliation Trip.com
// IMPORTANT: Remplacez ces valeurs par celles de votre lien d'affiliation Trip.com
// Vous pouvez les trouver dans l'URL de votre lien d'affiliation Trip.com
// 
// Pour trouver vos paramètres:
// 1. Faites une recherche sur Trip.com via votre lien d'affiliation
// 2. Regardez l'URL générée, les paramètres sont:
//    - allianceid=... (votre ID d'alliance)
//    - sid=... (votre session ID)
// 3. Copiez ces valeurs ici
const TRIP_COM_ALLIANCE_ID = '7183828';
const TRIP_COM_SID = '264252843';

// Mapping des villes vers IDs Trip.com (cityId, provinceId, countryId)
// IMPORTANT: Ajoutez les villes que vous souhaitez supporter
// Pour trouver les IDs d'une ville:
// 1. Faites une recherche sur Trip.com pour cette ville
// 2. Regardez l'URL générée, les IDs sont dans les paramètres cityId, provinceId, countryId
// 3. Ajoutez l'entrée dans ce mapping
const tripComCityData = {
    'paris': {
        cityId: '192',
        provinceId: '10107',
        countryId: '31',
        cityName: 'Paris',
        destName: 'Paris, Ile-de-France, France'
    },
    'kinshasa': {
        cityId: '0', // À remplacer par l'ID réel
        provinceId: '0',
        countryId: '0',
        cityName: 'Kinshasa',
        destName: 'Kinshasa, Democratic Republic of the Congo'
    },
    'londres': {
        cityId: '0', // À remplacer par l'ID réel
        provinceId: '0',
        countryId: '0',
        cityName: 'London',
        destName: 'London, England, United Kingdom'
    },
    'london': {
        cityId: '0', // À remplacer par l'ID réel
        provinceId: '0',
        countryId: '0',
        cityName: 'London',
        destName: 'London, England, United Kingdom'
    },
    'new york': {
        cityId: '0', // À remplacer par l'ID réel
        provinceId: '0',
        countryId: '0',
        cityName: 'New York',
        destName: 'New York, New York, United States'
    },
    'dubai': {
        cityId: '0', // À remplacer par l'ID réel
        provinceId: '0',
        countryId: '0',
        cityName: 'Dubai',
        destName: 'Dubai, Dubai, United Arab Emirates'
    }
    // Ajoutez d'autres villes selon vos besoins
};

// ===== Mapping des villes vers codes aéroports IATA =====
// 
// INSTRUCTIONS POUR AJOUTER DE NOUVEAUX CODES IATA:
// 1. Ajoutez l'entrée dans le format: 'nom-ville': 'CODE',
// 2. Utilisez le nom de la ville en minuscules
// 3. Pour les villes avec plusieurs mots, utilisez les deux formats:
//    - 'new york': 'NYC',
//    - 'newyork': 'NYC',
// 4. Le code IATA doit être en majuscules (3 lettres)
//
// Exemple:
//    'lubumbashi': 'FBM',
//    'lubumbashi': 'FBM',
//
const airportCodes = {
    // ===== AFRIQUE DU NORD =====
    'alger': 'ALG',
    'oran': 'ORN',
    'constantine': 'CZL',
    'annaba': 'AAE',
    'batna': 'BLJ',
    'tlemcen': 'TLM',
    'le caire': 'CAI',
    'cairo': 'CAI',
    'alexandrie': 'HBE',
    'alexandria': 'HBE',
    'sharm el-sheikh': 'SSH',
    'sharmelsheikh': 'SSH',
    'tripoli': 'TIP',
    'benghazi': 'BEN',
    'casablanca': 'CMN',
    'marrakech': 'RAK',
    'tanger': 'TNG',
    'rabat': 'RBA',
    'fès': 'FEZ',
    'fes': 'FEZ',
    'agadir': 'AGA',
    'oujda': 'OUD',
    'tunis': 'TUN',
    'djerba': 'DJE',
    'monastir': 'MIR',
    'sfax': 'SFA',
    'sousse': 'QSO',
    'monastir': 'MIR',
    'sfax': 'SFA',
    'sousse': 'QSO',
    
    // ===== AFRIQUE DE L'OUEST =====
    'cotonou': 'COO',
    'ouagadougou': 'OUA',
    'praia': 'RAI',
    'sal': 'SID',
    'abidjan': 'ABJ',
    'yamoussoukro': 'ASK',
    'bouaké': 'BYK',
    'bouake': 'BYK',
    'san-pédro': 'SPY',
    'sanpedro': 'SPY',
    'korhogo': 'HGO',
    'banjul': 'BJL',
    'accra': 'ACC',
    'takoradi': 'TKD',
    'sunyani': 'NYI',
    'conakry': 'CKY',
    'bissau': 'OXB',
    'monrovia': 'ROB',
    'bamako': 'BKO',
    'mopti': 'MZI',
    'tombouctou': 'TOM',
    'timbuktu': 'TOM',
    'gao': 'GAQ',
    'kayes': 'KYS',
    'nouakchott': 'NKC',
    'niamey': 'NIM',
    'zinder': 'ZND',
    'agadez': 'AJY',
    'lagos': 'LOS',
    'abuja': 'ABV',
    'port harcourt': 'PHC',
    'portharcourt': 'PHC',
    'enugu': 'ENU',
    'calabar': 'CBQ',
    'benin city': 'BNI',
    'benincity': 'BNI',
    'warri': 'QRW',
    'jos': 'JOS',
    'sokoto': 'SKO',
    'maiduguri': 'MIU',
    'yola': 'YOL',
    'bauchi': 'BCU',
    'owerri': 'QOW',
    'uyo': 'QUO',
    'asaba': 'ABB',
    'akure': 'AKR',
    'ilorin': 'ILR',
    'katsina': 'DKA',
    'dakar': 'DSS',
    'saint-louis': 'XLS',
    'saintlouis': 'XLS',
    'ziguinchor': 'ZIG',
    'tambacounda': 'TUD',
    'kaolack': 'KLC',
    'freetown': 'FNA',
    'lomé': 'LFW',
    'lome': 'LFW',
    'kano': 'KAN',
    'kaduna': 'KAD',
    'ibadan': 'IBA',
    'kumasi': 'KMS',
    'tamale': 'TML',
    'bobo-dioulasso': 'BOY',
    'bobodioulasso': 'BOY',
    'sikasso': 'KSS',
    'kankan': 'KNN',
    
    // ===== AFRIQUE CENTRALE =====
    'douala': 'DLA',
    'yaoundé': 'NSI',
    'yaounde': 'NSI',
    'garoua': 'GOU',
    'maroua': 'MVR',
    'bafoussam': 'BFX',
    'bamenda': 'BPC',
    'libreville': 'LBV',
    'port-gentil': 'POG',
    'portgentil': 'POG',
    'franceville': 'MVB',
    'malabo': 'SSG',
    'brazzaville': 'BZV',
    'pointe-noire': 'PNR',
    'pointenoire': 'PNR',
    'dolisie': 'DIS',
    'ouesso': 'OUE',
    'kinshasa': 'FIH',
    'lubumbashi': 'FBM',
    'goma': 'GOM',
    'kisangani': 'FKI',
    'mbuji-mayi': 'MJM',
    'mbujimayi': 'MJM',
    'bukavu': 'BKY',
    'kananga': 'KGA',
    'matadi': 'MAT',
    'n\'djamena': 'NDJ',
    'ndjamena': 'NDJ',
    'moundou': 'MQQ',
    'sarh': 'SRH',
    'bangui': 'BGF',
    'berbérati': 'BBT',
    'berberati': 'BBT',
    
    // ===== AFRIQUE DE L'EST =====
    'bujumbura': 'BJM',
    'gitega': 'GID',
    'djibouti': 'JIB',
    'asmara': 'ASM',
    'addis-abeba': 'ADD',
    'addis ababa': 'ADD',
    'addisababa': 'ADD',
    'ethiopia': 'ADD', // Code pays pour Addis Ababa
    'dire dawa': 'DIR',
    'diredawa': 'DIR',
    'bahir dar': 'BJR',
    'bahirdar': 'BJR',
    'gondar': 'GDQ',
    'mekele': 'MQX',
    'awassa': 'AWA',
    'nairobi': 'NBO',
    'mombasa': 'MBA',
    'kisumu': 'KIS',
    'eldoret': 'EDL',
    'malindi': 'MYD',
    'lamu': 'LAU',
    'entebbe': 'EBB',
    'kigali': 'KGL',
    'mogadiscio': 'MGQ',
    'hargeisa': 'HGA',
    'khartoum': 'KRT',
    'port soudan': 'PZU',
    'portsoudan': 'PZU',
    'juba': 'JUB',
    'waw': 'WUU',
    'malakal': 'MAK',
    'dar es salam': 'DAR',
    'daresalam': 'DAR',
    'zanzibar': 'ZNZ',
    'kilimanjaro': 'JRO',
    'arusha': 'ARK',
    'mwanza': 'MWZ',
    'dodoma': 'DOD',
    'tanga': 'TGT',
    
    // ===== AFRIQUE AUSTRALE =====
    'luanda': 'LAD',
    'lubango': 'SDD',
    'huambo': 'NOV',
    'gaborone': 'GBE',
    'francistown': 'FRW',
    'maun': 'MUB',
    'manzini': 'SHO',
    'maseru': 'MSU',
    'antananarivo': 'TNR',
    'nosy be': 'NOS',
    'nosybe': 'NOS',
    'toliara': 'TLE',
    'mahajanga': 'MJN',
    'toamasina': 'TMM',
    'lilongwe': 'LLW',
    'blantyre': 'BLZ',
    'port-louis': 'MRU',
    'portlouis': 'MRU',
    'maputo': 'MPM',
    'beira': 'BEW',
    'nampula': 'APL',
    'pemba': 'POL',
    'windhoek': 'WDH',
    'walvis bay': 'WVB',
    'walvisbay': 'WVB',
    'victoria': 'SEZ',
    'lusaka': 'LUN',
    'ndola': 'NLA',
    'livingstone': 'LVI',
    'kitwe': 'KIW',
    'harare': 'HRE',
    'bulawayo': 'BUQ',
    'victoria falls': 'VFA',
    'victoriafalls': 'VFA',
    'johannesburg': 'JNB',
    'cape town': 'CPT',
    'capetown': 'CPT',
    'durban': 'DUR',
    'bloemfontein': 'BFN',
    'east london': 'ELS',
    'eastlondon': 'ELS',
    'george': 'GRJ',
    'kimberley': 'KIM',
    'nelspruit': 'NLP',
    'port elizabeth': 'PLZ',
    'portelizabeth': 'PLZ',
    'pretoria': 'PRY',
    'upington': 'UTN',
    
    // ===== EUROPE DE L'OUEST =====
    'berlin': 'BER',
    'francfort': 'FRA',
    'frankfurt': 'FRA',
    'munich': 'MUC',
    'désseldorf': 'DUS',
    'dusseldorf': 'DUS',
    'hambourg': 'HAM',
    'hamburg': 'HAM',
    'stuttgart': 'STR',
    'cologne': 'CGN',
    'köln': 'CGN',
    'koln': 'CGN',
    'hanovre': 'HAJ',
    'hannover': 'HAJ',
    'nuremberg': 'NUE',
    'nürnberg': 'NUE',
    'bremen': 'BRE',
    'dresde': 'DRS',
    'dresden': 'DRS',
    'leipzig': 'LEJ',
    'dortmund': 'DTM',
    'münster': 'FMO',
    'munster': 'FMO',
    'karlsruhe': 'FKB',
    'fribourg': 'FRA',
    'freiburg': 'FRA',
    'erfurt': 'ERF',
    'magdeburg': 'CSO',
    'rostock': 'RLG',
    'lübeck': 'LBC',
    'lubeck': 'LBC',
    'vienne': 'VIE',
    'vienna': 'VIE',
    'salzburg': 'SZG',
    'innsbruck': 'INN',
    'graz': 'GRZ',
    'linz': 'LNZ',
    'klagenfurt': 'KLU',
    'bruxelles': 'BRU',
    'brussels': 'BRU',
    'antwerp': 'ANR',
    'anvers': 'ANR',
    'ghent': 'GNE',
    'gand': 'GNE',
    'bruges': 'BGU',
    'brugge': 'BGU',
    'liege': 'LGG',
    'liège': 'LGG',
    'charleroi': 'CRL',
    'paris': 'CDG',
    'paris cdg': 'CDG',
    'paris orly': 'ORY',
    'orly': 'ORY',
    // Note: 'paris' code de ville générique également disponible
    'lyon': 'LYS',
    'marseille': 'MRS',
    'nice': 'NCE',
    'toulouse': 'TLS',
    'bordeaux': 'BOD',
    'lille': 'LIL',
    'strasbourg': 'SXB',
    'amsterdam': 'AMS',
    'rotterdam': 'RTM',
    'eindhoven': 'EIN',
    'utrecht': 'UTC',
    'the hague': 'HAG',
    'la haye': 'HAG',
    'lahaye': 'HAG',
    'zurich': 'ZRH',
    'zurich zrh': 'ZRH',
    'genève': 'GVA',
    'geneve': 'GVA',
    'geneva': 'GVA',
    'basel': 'BSL',
    'bâle': 'BSL',
    'bale': 'BSL',
    'bern': 'BRN',
    'berne': 'BRN',
    'lausanne': 'QLS',
    'interlaken': 'ZIN',
    'lucerne': 'QLJ',
    'luxembourg': 'LUX',
    'monaco': 'MCM',
    'andorra': 'LEU',
    'andorre': 'LEU',
    'nantes': 'NTE',
    'brest': 'BES',
    'toulon': 'TLN',
    'perpignan': 'PGF',
    'biarritz': 'BIQ',
    'clermont-ferrand': 'CFE',
    'clermontferrand': 'CFE',
    'grenoble': 'GNB',
    'dijon': 'DIJ',
    'reims': 'RHE',
    'tours': 'TUF',
    'poitiers': 'PIS',
    'limoges': 'LIG',
    'bergerac': 'EGC',
    'béziers': 'BZR',
    'beziers': 'BZR',
    'carcassonne': 'CCF',
    'lourdes': 'LDE',
    'bastia': 'BIA',
    'calvi': 'CLY',
    'figari': 'FSC',
    'ajaccio': 'AJA',
    'montpellier': 'MPL',
    'toulon': 'TLN',
    'caen': 'CFR',
    'rouen': 'URO',
    'le havre': 'LEH',
    'lehavre': 'LEH',
    'cherbourg': 'CER',
    'dinard': 'DNR',
    'lorient': 'LRT',
    'quimper': 'UIP',
    'la rochelle': 'LRH',
    'larochelle': 'LRH',
    'pau': 'PUF',
    'tarbes': 'LDE',
    'agen': 'AGF',
    'brive': 'BVE',
    'aurillac': 'AUR',
    'rodez': 'RDZ',
    'albi': 'LBI',
    'cahors': 'ZAO',
    'toulouse blagnac': 'TLS',
    'annecy': 'NCY',
    'chambéry': 'CMF',
    'chambery': 'CMF',
    'lyon bron': 'LYN',
    'mulhouse': 'MLH',
    'epinal': 'EPL',
    'metz': 'MZM',
    'nancy': 'ENC',
    'strasbourg entzheim': 'SXB',
    'colmar': 'CMR',
    'besançon': 'QBQ',
    'besancon': 'QBQ',
    
    // ===== EUROPE DU NORD =====
    'copenhague': 'CPH',
    'copenhagen': 'CPH',
    'aalborg': 'AAL',
    'aarhus': 'AAR',
    'åarhus': 'AAR',
    'odense': 'ODE',
    'helsinki': 'HEL',
    'espoo': 'QEO',
    'tampere': 'TMP',
    'turku': 'TKU',
    'oulu': 'OUL',
    'oslo': 'OSL',
    'stockholm': 'ARN',
    'stockholm sto': 'STO', // Code de ville générique
    'gothenburg': 'GOT',
    'göteborg': 'GOT',
    'goteborg': 'GOT',
    'malmo': 'MMX',
    'malmö': 'MMX',
    'uppsala': 'QYX',
    'reykjavik': 'KEF',
    'reykjavik rek': 'REK', // Code alternatif
    'akureyri': 'AEY',
    'egilsstadir': 'EGS',
    'egilsstaðir': 'EGS',
    'isafjordur': 'IFJ',
    'selfoss': 'SEJ',
    'mosfellsbaer': 'MOS',
    'kopavogur': 'KOP',
    'hafnarfjordur': 'HAF',
    'garðabær': 'GAR',
    'gardabaer': 'GAR',
    'akranes': 'AKR',
    'húsavík': 'HZK',
    'husavik': 'HZK',
    'bergen': 'BGO',
    'stavanger': 'SVG',
    'trondheim': 'TRD',
    'tromso': 'TOS',
    'tromsø': 'TOS',
    'dublin': 'DUB',
    'londres heathrow': 'LHR',
    'londres gatwick': 'LGW',
    'londres': 'LHR',
    'london': 'LHR',
    'london heathrow': 'LHR',
    'london gatwick': 'LGW',
    'london lon': 'LON', // Code de ville générique
    'manchester': 'MAN',
    'birmingham': 'BHX',
    'liverpool': 'LPL',
    'leeds': 'LBA',
    'newcastle': 'NCL',
    'bristol': 'BRS',
    'cardiff': 'CWL',
    'belfast': 'BFS',
    'aberdeen': 'ABZ',
    'inverness': 'INV',
    'édimbourg': 'EDI',
    'edinburgh': 'EDI',
    'glasgow': 'GLA',
    'southampton': 'SOU',
    'norwich': 'NWI',
    'exeter': 'EXT',
    'plymouth': 'PLH',
    'bournemouth': 'BOH',
    'east midlands': 'EMA',
    'eastmidlands': 'EMA',
    'doncaster': 'DSA',
    'humberside': 'HUY',
    'durham tees valley': 'MME',
    'durhamteesvalley': 'MME',
    
    // ===== EUROPE DU SUD =====
    'madrid': 'MAD',
    'barcelone': 'BCN',
    'barcelona': 'BCN',
    'valencia': 'VLC',
    'séville': 'SVQ',
    'seville': 'SVQ',
    'bilbao': 'BIO',
    'alicante': 'ALC',
    'granada': 'GRX',
    'saragosse': 'ZAZ',
    'zaragoza': 'ZAZ',
    'santander': 'SDR',
    'saint-sébastien': 'EAS',
    'saintsebastien': 'EAS',
    'san sebastian': 'EAS',
    'ibiza': 'IBZ',
    'menorca': 'MAH',
    'mahon': 'MAH',
    'lanzarote': 'ACE',
    'fuerteventura': 'FUE',
    'tenerife': 'TFS',
    'las palmas': 'LPA',
    'laspalmas': 'LPA',
    'santiago de compostela': 'SCQ',
    'santiagodecompostela': 'SCQ',
    'la corogne': 'LCG',
    'lacorogne': 'LCG',
    'la coruna': 'LCG',
    'vigo': 'VGO',
    'oviedo': 'OVD',
    'asturias': 'OVD',
    'murcie': 'MJV',
    'murcia': 'MJV',
    'jerez': 'XRY',
    'cordoue': 'ODB',
    'cordoba': 'ODB',
    'rome': 'FCO',
    'roma': 'FCO',
    'rome rom': 'ROM', // Code de ville générique
    'milan': 'MXP',
    'milano': 'MXP',
    'milan mil': 'MIL', // Code de ville générique
    'milan bergame': 'BGY',
    'milanbergame': 'BGY',
    'bergamo': 'BGY',
    'turin': 'TRN',
    'torino': 'TRN',
    'bologne': 'BLQ',
    'bologna': 'BLQ',
    'génes': 'GOA',
    'genoa': 'GOA',
    'genova': 'GOA',
    'pise': 'PSA',
    'pisa': 'PSA',
    'palma de majorque': 'PMI',
    'palmademajorque': 'PMI',
    'malaga': 'AGP',
    'lisbonne': 'LIS',
    'lisbon': 'LIS',
    'porto': 'OPO',
    'faro': 'FAO',
    'funchal': 'FNC',
    'porto santo': 'PXO',
    'portosanto': 'PXO',
    'pontadelgada': 'PDL',
    'ponta delgada': 'PDL',
    'venise': 'VCE',
    'venice': 'VCE',
    'florence': 'FLR',
    'firenze': 'FLR',
    'naples': 'NAP',
    'napoli': 'NAP',
    'palermo': 'PMO',
    'catane': 'CTA',
    'catania': 'CTA',
    'bari': 'BRI',
    'brindisi': 'BDS',
    'cagliari': 'CAG',
    'olbia': 'OLB',
    'alghero': 'AHO',
    'trapani': 'TPS',
    'lamezia terme': 'SUF',
    'lamenziaterme': 'SUF',
    'pérouse': 'PEG',
    'perugia': 'PEG',
    'ancône': 'AOI',
    'ancona': 'AOI',
    'rimini': 'RMI',
    'trieste': 'TRS',
    'verone': 'VRN',
    'verona': 'VRN',
    'athénes': 'ATH',
    'athens': 'ATH',
    'thessalonique': 'SKG',
    'thessaloniki': 'SKG',
    'héraklion': 'HER',
    'heraklion': 'HER',
    'patras': 'GPA',
    'larissa': 'LRA',
    'volos': 'VOL',
    'ioannina': 'IOA',
    'kavala': 'KVA',
    'alexandroupoli': 'AXD',
    'chania': 'CHQ',
    'rhodes': 'RHO',
    'kos': 'KGS',
    'corfu': 'CFU',
    'zakynthos': 'ZTH',
    'santorini': 'JTR',
    'mykonos': 'JMK',
    'paros': 'PAS',
    'naxos': 'JNX',
    'milos': 'MLO',
    'syros': 'JSY',
    'samos': 'SMI',
    'lesvos': 'MJT',
    'chios': 'JKH',
    'limnos': 'LXS',
    'karpathos': 'AOK',
    'kastoria': 'KSO',
    'kalymnos': 'JKL',
    'kasos': 'KSJ',
    'kefalonia': 'EFL',
    'kythira': 'KIT',
    'leros': 'LRS',
    'sitia': 'JSH',
    'skiathos': 'JSI',
    'skopelos': 'SKU',
    'skyros': 'SKU',
    'crete': 'HER',
    'la valette': 'MLA',
    'lavalette': 'MLA',
    'valletta': 'MLA',
    'larnaca': 'LCA',
    'istanbul': 'IST',
    'ankara': 'ESB',
    'izmir': 'ADB',
    'antalya': 'AYT',
    'bodrum': 'BJV',
    'dalaman': 'DLM',
    'trabzon': 'TZX',
    'adana': 'ADA',
    'gaziantep': 'GZT',
    'kayseri': 'ASR',
    'nevsehir': 'NAV',
    'cappadocia': 'NAV',
    'denizli': 'DNZ',
    'erzurum': 'ERZ',
    'van': 'VAN',
    'diyarbakir': 'DIY',
    'elazig': 'EZS',
    'malatya': 'MLX',
    'samsun': 'SZF',
    'ordu': 'OGU',
    'rize': 'RZV',
    'artvin': 'AHT',
    
    // ===== EUROPE DE L'EST =====
    'varsovie': 'WAW',
    'warsaw': 'WAW',
    'cracovie': 'KRK',
    'krakow': 'KRK',
    'gdansk': 'GDN',
    'wroclaw': 'WRO',
    'katowice': 'KTW',
    'poznan': 'POZ',
    'lodz': 'LCJ',
    'lublin': 'LUZ',
    'prague': 'PRG',
    'brno': 'BRQ',
    'ostrava': 'OSR',
    'budapest': 'BUD',
    'debrecen': 'DEB',
    'bratislava': 'BTS',
    'kosice': 'KSC',
    'ljubljana': 'LJU',
    'maribor': 'MBX',
    'zagreb': 'ZAG',
    'split': 'SPU',
    'dubrovnik': 'DBV',
    'zadar': 'ZAD',
    'pula': 'PUY',
    'rijeka': 'RJK',
    'osijek': 'OSI',
    'belgrade': 'BEG',
    'novi sad': 'QND',
    'novisad': 'QND',
    'nis': 'INI',
    'podgorica': 'TGD',
    'tivat': 'TIV',
    'tirana': 'TIA',
    'bucarest': 'OTP',
    'bucharest': 'OTP',
    'bucharest buh': 'BUH', // Code de ville générique
    'cluj-napoca': 'CLJ',
    'clujnapoca': 'CLJ',
    'timisoara': 'TSR',
    'iasi': 'IAS',
    'constanta': 'CND',
    'craiova': 'CRA',
    'sibiu': 'SBZ',
    'targu mures': 'TGM',
    'targumures': 'TGM',
    'sofia': 'SOF',
    'plovdiv': 'PDV',
    'varna': 'VAR',
    'burgas': 'BOJ',
    'kiev': 'KBP',
    'kyiv': 'KBP',
    'odessa': 'ODS',
    'kharkiv': 'HRK',
    'lviv': 'LWO',
    'dnipro': 'DNK',
    'zaporizhzhia': 'OZH',
    'moscou': 'SVO',
    'moscow': 'SVO',
    'moscow mow': 'MOW', // Code de ville générique
    'domodedovo': 'DME',
    'sheremetyevo': 'SVO',
    'vnoukovo': 'VKO',
    'saint petersburg': 'LED',
    'saintpetersburg': 'LED',
    'st petersburg': 'LED',
    'stpetersburg': 'LED',
    'ekaterinbourg': 'SVX',
    'ekaterinburg': 'SVX',
    'novossibirsk': 'OVB',
    'novosibirsk': 'OVB',
    'kazan': 'KZN',
    'rostov-sur-le-don': 'ROV',
    'rostovsurlédon': 'ROV',
    'rostov on don': 'ROV',
    'sochi': 'AER',
    'krasnodar': 'KRR',
    'volgograd': 'VOG',
    'samara': 'KUF',
    'perm': 'PEE',
    'tcheliabinsk': 'CEK',
    'chelyabinsk': 'CEK',
    'minsk': 'MSQ',
    'gomel': 'GME',
    'vilnius': 'VNO',
    'kaunas': 'KUN',
    'palanga': 'PLQ',
    'riga': 'RIX',
    'liepaja': 'LPX',
    'tallinn': 'TLL',
    'tartu': 'TAY',
    
    // ===== AUTRES TERRITOIRES EUROPÉENS =====
    'gibraltar': 'GIB',
    'végar': 'FAE',
    'vegar': 'FAE',
    'nuuk': 'GOH',
    
    // ===== MOYEN-ORIENT =====
    // Émirats Arabes Unis
    'dubai': 'DXB',
    'dubaï': 'DXB',
    'abu dhabi': 'AUH',
    'abudhabi': 'AUH',
    'abou dabi': 'AUH',
    'sharjah': 'SHJ',
    'ras al khaimah': 'RKT',
    'rasalkhaimah': 'RKT',
    'fujairah': 'FJR',
    'al ain': 'AAN',
    'alain': 'AAN',
    'ajman': 'QJM',
    
    // Qatar
    'doha': 'DOH',
    
    // Koweït
    'koweït': 'KWI',
    'kuwait': 'KWI',
    'kuwait city': 'KWI',
    'kuwaitcity': 'KWI',
    
    // Bahreïn
    'bahreïn': 'BAH',
    'bahrain': 'BAH',
    'manama': 'BAH',
    
    // Oman
    'mascate': 'MCT',
    'muscat': 'MCT',
    'salalah': 'SLL',
    'sohar': 'OHS',
    'khasab': 'KHS',
    'duqm': 'DQM',
    
    // Arabie Saoudite
    'riyadh': 'RUH',
    'riyad': 'RUH',
    'jeddah': 'JED',
    'djeddah': 'JED',
    'dammam': 'DMM',
    'damman': 'DMM',
    'al khobar': 'DMM',
    'alkhobar': 'DMM',
    'médine': 'MED',
    'medina': 'MED',
    'madinah': 'MED',
    'la mecque': 'JED',
    'makkah': 'JED',
    'mecca': 'JED',
    'taif': 'TIF',
    'abha': 'AHB',
    'jazan': 'GIZ',
    'tabuk': 'TUU',
    'hail': 'HAS',
    'al jouf': 'AJF',
    'aljouf': 'AJF',
    'qassim': 'ELQ',
    'buraidah': 'ELQ',
    'king fahd international': 'DMM',
    'kingfahdinternational': 'DMM',
    'king khalid international': 'RUH',
    'kingkhalidinternational': 'RUH',
    
    // Jordanie
    'amman': 'AMM',
    'aqaba': 'AQJ',
    'petra': 'AQJ',
    
    // Israël
    'tel aviv': 'TLV',
    'telaviv': 'TLV',
    'jerusalem': 'JRS',
    'jérusalem': 'JRS',
    'haifa': 'HFA',
    'eilat': 'ETH',
    'ovda': 'VDA',
    
    // Liban
    'beyrouth': 'BEY',
    'beirut': 'BEY',
    'tripoli': 'KYE',
    
    // Syrie
    'damas': 'DAM',
    'damascus': 'DAM',
    'alep': 'ALP',
    'aleppo': 'ALP',
    'lattaquié': 'LTK',
    'latakia': 'LTK',
    
    // Irak
    'bagdad': 'BGW',
    'baghdad': 'BGW',
    'basra': 'BSR',
    'erbil': 'EBL',
    'sulaymaniyah': 'ISU',
    'najaf': 'NJF',
    'mosul': 'OSM',
    'kirkuk': 'KIK',
    
    // Iran
    'téhéran': 'IKA',
    'teheran': 'IKA',
    'tehran': 'IKA',
    'téhéran imam khomeini': 'IKA',
    'tehran imam khomeini': 'IKA',
    'mashhad': 'MHD',
    'isfahan': 'IFN',
    'shiraz': 'SYZ',
    'tabriz': 'TBZ',
    'bandar abbas': 'BND',
    'bandarabbas': 'BND',
    'kish': 'KIH',
    'kish island': 'KIH',
    'kishisland': 'KIH',
    'qeshm': 'GSM',
    'qeshm island': 'GSM',
    'qeshmisland': 'GSM',
    'ahvaz': 'AWZ',
    'kerman': 'KER',
    'yazd': 'AZD',
    'kermanshah': 'KSH',
    'zahedan': 'ZAH',
    'rasht': 'RAS',
    'ardabil': 'ADU',
    'urmia': 'OMH',
    'sanandaj': 'SDG',
    'hamadan': 'HDM',
    'arak': 'AJK',
    'qom': 'QOM',
    'karaj': 'PYK',
    
    // Yémen
    'sanaa': 'SAH',
    'sana\'a': 'SAH',
    'sana': 'SAH',
    'aden': 'ADE',
    'taiz': 'TAI',
    'hodeidah': 'HOD',
    
    // Palestine
    'gaza': 'GZA',
    'bethléem': 'GZA',
    'bethlehem': 'GZA',
    
    // Chypre
    'nicosie': 'NIC',
    'nicosia': 'NIC',
    'larnaca': 'LCA',
    'paphos': 'PFO',
    
    // ===== ASIE =====
    // Chine
    'pékin': 'PEK',
    'pekin': 'PEK',
    'beijing pek': 'PEK', // Code alternatif pour Pékin
    'shanghai pvg': 'PVG', // Code alternatif pour Shanghai
    'shanghai': 'SHA',
    'canton': 'CAN',
    'guangzhou': 'CAN',
    'shenzhen': 'SZX',
    'chengdu': 'CTU',
    'chongqing': 'CKG',
    'xiamen': 'XMN',
    'wuhan': 'WUH',
    'hangzhou': 'HGH',
    'kunming': 'KMG',
    'harbin': 'HRB',
    'qingdao': 'TAO',
    'dalian': 'DLC',
    'tianjin': 'TSN',
    'nanjing': 'NKG',
    'suzhou': 'SZV',
    'xian': 'XIY',
    'xianyang': 'XIY',
    'zhengzhou': 'CGO',
    'changsha': 'CSX',
    'nanchang': 'KHN',
    'fuzhou': 'FOC',
    'haikou': 'HAK',
    'sanya': 'SYX',
    'urumqi': 'URC',
    'lanzhou': 'LHW',
    'yinchuan': 'INC',
    'hohhot': 'HET',
    'taiyuan': 'TYN',
    'shijiazhuang': 'SJW',
    'baotou': 'BAV',
    'jinan': 'TNA',
    'hefei': 'HFE',
    'ningbo': 'NGB',
    'wenzhou': 'WNZ',
    'foshan': 'FOS',
    'dongguan': 'DGM',
    'zhuhai': 'ZUH',
    'macao ferry': 'ZUH',
    // Japon
    'tokyo': 'TYO',
    'tokyo tyo': 'TYO', // Code de ville générique
    'tokyo narita': 'NRT',
    'tokyonarita': 'NRT',
    'tokyo haneda': 'HND',
    'tokyohaneda': 'HND',
    'osaka': 'KIX',
    'osaka itami': 'ITM',
    'osakaitami': 'ITM',
    'fukuoka': 'FUK',
    'sapporo': 'CTS',
    'sapporo chitose': 'CTS',
    'sapporochitose': 'CTS',
    'nagoya': 'NGO',
    'okinawa': 'OKA',
    'okinawa naha': 'OKA',
    'okinawanaha': 'OKA',
    'sendai': 'SDJ',
    'hiroshima': 'HIJ',
    'kagoshima': 'KOJ',
    'kumamoto': 'KMJ',
    'matsuyama': 'MYJ',
    'takamatsu': 'TAK',
    'kochi': 'KCZ',
    'matsumoto': 'MMJ',
    'niigata': 'KIJ',
    'kanazawa': 'KMQ',
    'komatsu': 'KMQ',
    'toyama': 'TOY',
    'shizuoka': 'FSZ',
    'nagasaki': 'NGS',
    'miyazaki': 'KMI',
    'oita': 'OIT',
    'yamaguchi': 'UBJ',
    'akita': 'AXT',
    'aomori': 'AOJ',
    'hakodate': 'HKD',
    'memanbetsu': 'MMB',
    'kushiro': 'KUH',
    'asahikawa': 'AKJ',
    'obihiro': 'OBO',
    // Corée du Sud
    'seoul': 'SEL',
    'séoul': 'SEL',
    'seoul icn': 'ICN', // Code alternatif (aéroport Incheon)
    'busan': 'PUS',
    'jeju': 'CJU',
    'daegu': 'TAE',
    'gwangju': 'KWJ',
    'incheon': 'ICN',
    'cheongju': 'CJJ',
    'yangyang': 'YNY',
    'muan': 'MWX',
    'yeosu': 'RSU',
    'ulsan': 'USN',
    'pohang': 'KPO',
    'gunsan': 'KUV',
    'wonju': 'WJU',
    // Asie du Sud-Est
    'singapore': 'SIN',
    'singapour': 'SIN',
    'bangkok': 'BKK',
    'phuket': 'HKT',
    'chiang mai': 'CNX',
    'chiangmai': 'CNX',
    'hat yai': 'HDY',
    'hatyai': 'HDY',
    'krabi': 'KBV',
    'koh samui': 'USM',
    'kohsamui': 'USM',
    'surat thani': 'URT',
    'suratthani': 'URT',
    'udon thani': 'UTH',
    'udonthani': 'UTH',
    'kuala lumpur': 'KUL',
    'kualalumpur': 'KUL',
    'penang': 'PEN',
    'langkawi': 'LGK',
    'kota kinabalu': 'BKI',
    'kotakinabalu': 'BKI',
    'kuching': 'KCH',
    'miri': 'MYY',
    'sibu': 'SBW',
    'sandakan': 'SDK',
    'tawau': 'TWU',
    'johor bahru': 'JHB',
    'johorbahru': 'JHB',
    'alor setar': 'AOR',
    'alorsetar': 'AOR',
    'ipoh': 'IPH',
    'malacca': 'MKZ',
    'jakarta': 'JKT',
    'jakarta cgk': 'CGK', // Code alternatif (aéroport Soekarno-Hatta)
    'jakarta cgk': 'CGK', // Code principal pour Jakarta
    'bali': 'DPS',
    'denpasar': 'DPS',
    'surabaya': 'SUB',
    'medan': 'KNO',
    'bandung': 'BDO',
    'yogyakarta': 'YIA',
    'semarang': 'SRG',
    'makassar': 'UPG',
    'padang': 'PDG',
    'palembang': 'PLM',
    'batam': 'BTH',
    'lombok': 'LOP',
    'manado': 'MDC',
    'balikpapan': 'BPN',
    'pontianak': 'PNK',
    'banjarmasin': 'BDJ',
    'pekanbaru': 'PKU',
    'jambi': 'DJB',
    'bengkulu': 'BKS',
    'pangkal pinang': 'PGK',
    'pangkalpinang': 'PGK',
    'manila': 'MNL',
    'manille': 'MNL',
    'cebu': 'CEB',
    'davao': 'DVO',
    'iloilo': 'ILO',
    'bacolod': 'BCD',
    'puerto princesa': 'PPS',
    'puertoprincesa': 'PPS',
    'zamboanga': 'ZAM',
    'cagayan de oro': 'CGY',
    'cagayandeoro': 'CGY',
    'legazpi': 'LGP',
    'kalibo': 'KLO',
    'clark': 'CRK',
    'tagbilaran': 'TAG',
    'roxas': 'RXS',
    'taipei': 'TPE',
    'hong kong': 'HKG',
    'hongkong': 'HKG',
    'macao': 'MFM',
    'macau': 'MFM',
    // Vietnam
    'hanoï': 'HAN',
    'hanoi': 'HAN',
    'ho chi minh-ville': 'SGN',
    'hochiminhville': 'SGN',
    'ho chi minh': 'SGN',
    'hochiminh': 'SGN',
    'saigon': 'SGN',
    'da nang': 'DAD',
    'danang': 'DAD',
    'hue': 'HUI',
    'nha trang': 'CXR',
    'nhatrang': 'CXR',
    'phu quoc': 'PQC',
    'phuquoc': 'PQC',
    'can tho': 'VCA',
    'cantho': 'VCA',
    'hai phong': 'HPH',
    'haiphong': 'HPH',
    'vung tau': 'VTG',
    'vungtau': 'VTG',
    'pleiku': 'PXU',
    'buon ma thuot': 'BMV',
    'buonmathuot': 'BMV',
    'dalat': 'DLI',
    'da lat': 'DLI',
    'quy nhon': 'UIH',
    'quynhon': 'UIH',
    // Asie Centrale
    'ulaanbaatar': 'ULN',
    'ulan bator': 'ULN',
    'almaty': 'ALA',
    'astana': 'NQZ',
    'nur-sultan': 'NQZ',
    'nursultan': 'NQZ',
    'tashkent': 'TAS',
    // Asie du Sud
    'colombo': 'CMB',
    'katmandou': 'KTM',
    'kathmandu': 'KTM',
    'islamabad': 'ISB',
    'karachi': 'KHI',
    'lahore': 'LHE',
    // Caucase
    'tbilissi': 'TBS',
    'tbilisi': 'TBS',
    'erevan': 'EVN',
    'yerevan': 'EVN',
    'bakou': 'GYD',
    'baku': 'GYD',
    // Inde
    'delhi': 'DEL',
    'new delhi': 'DEL',
    'newdelhi': 'DEL',
    'mumbai': 'BOM',
    'bombay': 'BOM',
    'bangalore': 'BLR',
    'bengaluru': 'BLR',
    'hyderabad': 'HYD',
    'chennai': 'MAA',
    'madras': 'MAA',
    'kolkata': 'CCU',
    'calcutta': 'CCU',
    'ahmedabad': 'AMD',
    'kochi': 'COK',
    'cochin': 'COK',
    'goa': 'GOI',
    'pune': 'PNQ',
    'jaipur': 'JAI',
    'lucknow': 'LKO',
    'varanasi': 'VNS',
    'amritsar': 'ATQ',
    'chandigarh': 'IXC',
    'indore': 'IDR',
    'bhopal': 'BHO',
    'nagpur': 'NAG',
    'raipur': 'RPR',
    'visakhapatnam': 'VTZ',
    'vijayawada': 'VGA',
    'tirupati': 'TIR',
    'coimbatore': 'CJB',
    'madurai': 'IXM',
    'trichy': 'TRZ',
    'mangalore': 'IXE',
    'mysore': 'MYQ',
    'surat': 'STV',
    'rajkot': 'RAJ',
    'bhavnagar': 'BHU',
    'vadodara': 'BDQ',
    'udaipur': 'UDR',
    'jodhpur': 'JDH',
    'dehradun': 'DED',
    'leh': 'IXL',
    'srinagar': 'SXR',
    'jammu': 'IXJ',
    'patna': 'PAT',
    'ranchi': 'IXR',
    'guwahati': 'GAU',
    'imphal': 'IMF',
    'agartala': 'IXA',
    'aizawl': 'AJL',
    'dimapur': 'DMU',
    'port blair': 'IXZ',
    'portblair': 'IXZ',
    
    // ===== OCÉANIE =====
    // Australie
    'adélaïde': 'ADL',
    'adelaide': 'ADL',
    'alice springs': 'ASP',
    'alicesprings': 'ASP',
    'brisbane': 'BNE',
    'broome': 'BME',
    'cairns': 'CNS',
    'canberra': 'CBR',
    'darwin': 'DRW',
    'gold coast': 'OOL',
    'goldcoast': 'OOL',
    'hobart': 'HBA',
    'launceston': 'LST',
    'melbourne': 'MEL',
    'newcastle': 'NTL',
    'perth': 'PER',
    'port hedland': 'PHE',
    'porthedland': 'PHE',
    'rockhampton': 'ROK',
    'sydney': 'SYD',
    'townsville': 'TSV',
    'ballina': 'BNK',
    'bathurst': 'BHS',
    'bendigo': 'BXG',
    'coffs harbour': 'CFS',
    'coffsharbour': 'CFS',
    'devonport': 'DPO',
    'geelong': 'GEX',
    'geraldton': 'GET',
    'gladstone': 'GLT',
    'hervey bay': 'HVB',
    'herveybay': 'HVB',
    'kalgoorlie': 'KGI',
    'karratha': 'KTA',
    'mackay': 'MKY',
    'mildura': 'MQL',
    'mount gambier': 'MGB',
    'mountgambier': 'MGB',
    'newman': 'ZNE',
    'port macquarie': 'PQQ',
    'portmacquarie': 'PQQ',
    'sunshine coast': 'MCY',
    'sunshinecoast': 'MCY',
    'tamworth': 'TMW',
    'toowoomba': 'TWB',
    'wagga wagga': 'WGA',
    'waggawagga': 'WGA',
    'whyalla': 'WYA',
    'wollongong': 'WOL',
    'albany': 'ALH',
    'bunbury': 'BUY',
    'ceduna': 'CED',
    'esperance': 'EPR',
    'kalbarri': 'KAX',
    'katherine': 'KTR',
    'kununurra': 'KNX',
    'newman': 'ZNE',
    'port augusta': 'PUG',
    'portaugusta': 'PUG',
    'port lincoln': 'PLO',
    'portlincoln': 'PLO',
    'uluru': 'AYQ',
    'ayers rock': 'AYQ',
    'ayersrock': 'AYQ',
    // Nouvelle-Zélande
    'auckland': 'AKL',
    'christchurch': 'CHC',
    'dunedin': 'DUD',
    'queenstown': 'ZQN',
    'wellington': 'WLG',
    // Pacifique
    'nadi': 'NAN',
    'suva': 'SUV',
    'port moresby': 'POM',
    'portmoresby': 'POM',
    'honiara': 'HIR',
    'port-vila': 'VLI',
    'portvila': 'VLI',
    'nouméa': 'NOU',
    'noumea': 'NOU',
    'papeete': 'PPT',
    'apia': 'APW',
    'pago pago': 'PPG',
    'pagopago': 'PPG',
    'nuku\'alofa': 'TBU',
    'nukualofa': 'TBU',
    'rarotonga': 'RAR',
    'agana': 'GUM',
    'saipan': 'SPN',
    'majuro': 'MAJ',
    'pohnpei': 'PNI',
    'chuuk': 'TKK',
    'koror': 'ROR',
    'tarawa': 'TRW',
    'nauru': 'INU',
    'funafuti': 'FUN',
    
    // ===== CANADA =====
    'calgary': 'YYC',
    'edmonton': 'YEG',
    'halifax': 'YHZ',
    'montréal': 'YUL',
    'montreal': 'YUL',
    'montreal ymq': 'YMQ', // Code de ville générique
    'ottawa': 'YOW',
    'québec': 'YQB',
    'quebec': 'YQB',
    'toronto': 'YYZ',
    'toronto yto': 'YTO', // Code de ville générique
    'vancouver': 'YVR',
    'winnipeg': 'YWG',
    'victoria': 'YYJ',
    'kelowna': 'YLW',
    'prince george': 'YXS',
    'princegeorge': 'YXS',
    'whitehorse': 'YXY',
    'yellowknife': 'YZF',
    'iqaluit': 'YFB',
    'saskatoon': 'YXE',
    'regina': 'YQR',
    'thunder bay': 'YQT',
    'thunderbay': 'YQT',
    'london': 'YXU',
    'windsor': 'YQG',
    'kingston': 'YGK',
    'sudbury': 'YSB',
    'moncton': 'YQM',
    'saint john': 'YSJ',
    'saintjohn': 'YSJ',
    'fredericton': 'YFC',
    'charlottetown': 'YYG',
    'st johns': 'YYT',
    'stjohns': 'YYT',
    'gander': 'YQX',
    
    // ===== ÉTATS-UNIS (PRINCIPAUX HUBS) =====
    'atlanta': 'ATL',
    'boston': 'BOS',
    'charlotte': 'CLT',
    'chicago': 'ORD',
    'chicago chi': 'CHI', // Code de ville générique
    'chicago midway': 'MDW',
    'chicagomidway': 'MDW',
    'dallas': 'DFW',
    'dallas love field': 'DAL',
    'dallaslovefield': 'DAL',
    'denver': 'DEN',
    'detroit': 'DTW',
    'houston': 'IAH',
    'houston hobby': 'HOU',
    'houstonhobby': 'HOU',
    'los angeles': 'LAX',
    'losangeles': 'LAX',
    'miami': 'MIA',
    'new york': 'JFK',
    'newyork': 'JFK',
    'new york jfk': 'JFK',
    'new york kennedy': 'JFK',
    'new york nyc': 'NYC', // Code de ville générique
    'new york laguardia': 'LGA',
    'newyorklaguardia': 'LGA',
    'newark': 'EWR',
    'orlando': 'MCO',
    'philadelphie': 'PHL',
    'philadelphia': 'PHL',
    'phoenix': 'PHX',
    'san francisco': 'SFO',
    'sanfrancisco': 'SFO',
    'seattle': 'SEA',
    'washington': 'IAD',
    'washington dulles': 'IAD',
    'washington reagan': 'DCA',
    'washingtonreagan': 'DCA',
    
    // ===== AUTRES AÉROPORTS US =====
    'anchorage': 'ANC',
    'atlanta': 'ATL',
    'austin': 'AUS',
    'baltimore': 'BWI',
    'boise': 'BOI',
    'buffalo': 'BUF',
    'burlington': 'BTV',
    'charleston': 'CHS',
    'charlotte': 'CLT',
    'cincinnati': 'CVG',
    'cleveland': 'CLE',
    'columbus': 'CMH',
    'des moines': 'DSM',
    'desmoines': 'DSM',
    'fort lauderdale': 'FLL',
    'fortlauderdale': 'FLL',
    'grand rapids': 'GRR',
    'grandrapids': 'GRR',
    'harrisburg': 'MDT',
    'hartford': 'BDL',
    'honolulu': 'HNL',
    'indianapolis': 'IND',
    'jacksonville': 'JAX',
    'kansas city': 'MCI',
    'kansascity': 'MCI',
    'knoxville': 'TYS',
    'las vegas': 'LAS',
    'lasvegas': 'LAS',
    'little rock': 'LIT',
    'littlerock': 'LIT',
    'louisville': 'SDF',
    'memphis': 'MEM',
    'milwaukee': 'MKE',
    'minneapolis': 'MSP',
    'mobile': 'MOB',
    'montgomery': 'MGM',
    'nashville': 'BNA',
    'new orleans': 'MSY',
    'neworleans': 'MSY',
    'norfolk': 'ORF',
    'oklahoma city': 'OKC',
    'oklahomacity': 'OKC',
    'omaha': 'OMA',
    'pensacola': 'PNS',
    'pittsburgh': 'PIT',
    'portland': 'PDX',
    'providence': 'PVD',
    'raleigh': 'RDU',
    'richmond': 'RIC',
    'rochester': 'ROC',
    'sacramento': 'SMF',
    'salt lake city': 'SLC',
    'saltlakecity': 'SLC',
    'san antonio': 'SAT',
    'sanantonio': 'SAT',
    'san diego': 'SAN',
    'sandiego': 'SAN',
    'san jose': 'SJC',
    'sanjose': 'SJC',
    'savannah': 'SAV',
    'spokane': 'GEG',
    'st louis': 'STL',
    'stlouis': 'STL',
    'syracuse': 'SYR',
    'tallahassee': 'TLH',
    'tampa': 'TPA',
    'tucson': 'TUS',
    'tulsa': 'TUL',
    'west palm beach': 'PBI',
    'westpalmbeach': 'PBI',
    'wichita': 'ICT',
    'wilmington': 'ILM',
    
    // ===== MEXIQUE =====
    'cancén': 'CUN',
    'cancun': 'CUN',
    'guadalajara': 'GDL',
    'mexico': 'MEX',
    'mexico city': 'MEX',
    'mexicocity': 'MEX',
    'monterrey': 'MTY',
    'puerto vallarta': 'PVR',
    'puertovallarta': 'PVR',
    'san josé del cabo': 'SJD',
    'sanjosedelcabo': 'SJD',
    'san jose del cabo': 'SJD',
    'tijuana': 'TIJ',
    'mérida': 'MID',
    'merida': 'MID',
    'cozumel': 'CZM',
    'mazatlan': 'MZT',
    'acapulco': 'ACA',
    'ixtapa': 'ZIH',
    'zihuatanejo': 'ZIH',
    'huatulco': 'HUX',
    'oaxaca': 'OAX',
    'puebla': 'PBC',
    'veracruz': 'VER',
    'villahermosa': 'VSA',
    'tuxtla gutierrez': 'TGZ',
    'tuxtlagutierrez': 'TGZ',
    'tapachula': 'TAP',
    'leon': 'BJX',
    'aguascalientes': 'AGU',
    'san luis potosi': 'SLP',
    'sanluispotosi': 'SLP',
    'durango': 'DGO',
    'chihuahua': 'CUU',
    'tijuana': 'TIJ',
    'ensenada': 'ESE',
    'la paz': 'LAP',
    'lapaz': 'LAP',
    'los cabos': 'SJD',
    'loscabos': 'SJD',
    
    // ===== CARAÏBES =====
    'nassau': 'NAS',
    'la havane': 'HAV',
    'lavavane': 'HAV',
    'havana': 'HAV',
    'varadero': 'VRA',
    'punta cana': 'PUJ',
    'puntacana': 'PUJ',
    'saint-domingue': 'SDQ',
    'saintdomingue': 'SDQ',
    'santo domingo': 'SDQ',
    'kingston': 'KIN',
    'montego bay': 'MBJ',
    'montegobay': 'MBJ',
    'san juan': 'SJU',
    'sanjuan': 'SJU',
    
    // ===== AMÉRIQUE CENTRALE =====
    'san josé': 'SJO',
    'sanjose': 'SJO',
    'san jose': 'SJO',
    'liberia': 'LIR',
    'guatemala city': 'GUA',
    'guatemalacity': 'GUA',
    'guatemala': 'GUA',
    'flores': 'FRS',
    'tegucigalpa': 'TGU',
    'san pedro sula': 'SAP',
    'sanpedrosula': 'SAP',
    'roatan': 'RTB',
    'la ceiba': 'LCE',
    'laceiba': 'LCE',
    'managua': 'MGA',
    'san juan del sur': 'SJO',
    'sanjuandelsur': 'SJO',
    'belize city': 'BZE',
    'belizecity': 'BZE',
    'belize': 'BZE',
    'san salvador': 'SAL',
    'sansalvador': 'SAL',
    'panama city': 'PTY',
    'panamacity': 'PTY',
    'panama': 'PTY',
    'david': 'DAV',
    'bocas del toro': 'BOC',
    'bocasdeltoro': 'BOC',
    
    // ===== AMÉRIQUE DU SUD =====
    'buenos aires': 'EZE',
    'buenosaires': 'EZE',
    'aeroparque': 'AEP',
    'cérdoba': 'COR',
    'cordoba': 'COR',
    'mendoza': 'MDZ',
    'rosario': 'ROS',
    'la paz': 'LPB',
    'lapaz': 'LPB',
    'santa cruz': 'VVI',
    'santacruz': 'VVI',
    'belo horizonte': 'CNF',
    'belohorizonte': 'CNF',
    'brasilia': 'BSB',
    'brasília': 'BSB',
    'curitiba': 'CWB',
    'fortaleza': 'FOR',
    'manaus': 'MAO',
    'porto alegre': 'POA',
    'portoalegre': 'POA',
    'recife': 'REC',
    'rio de janeiro': 'GIG',
    'riodejaneiro': 'GIG',
    'salvador': 'SSA',
    'são paulo': 'GRU',
    'saopaulo': 'GRU',
    'sao paulo': 'GRU',
    'congonhas': 'CGH',
    'antofagasta': 'ANF',
    'concepción': 'CCP',
    'concepcion': 'CCP',
    'puerto montt': 'PMC',
    'puertomontt': 'PMC',
    'punta arenas': 'PUQ',
    'puntaarenas': 'PUQ',
    'santiago': 'SCL',
    'barranquilla': 'BAQ',
    'bogotá': 'BOG',
    'bogota': 'BOG',
    'cali': 'CLO',
    'cartagena': 'CTG',
    'medellín': 'MDE',
    'medellin': 'MDE',
    'guayaquil': 'GYE',
    'quito': 'UIO',
    'cayenne': 'CAY',
    'georgetown': 'GEO',
    'asunción': 'ASU',
    'asuncion': 'ASU',
    'arequipa': 'AQP',
    'cusco': 'CUZ',
    'lima': 'LIM',
    'trujillo': 'TRU',
    'paramaribo': 'PBM',
    'montevideo': 'MVD',
    'punta del este': 'PDP',
    'puntadeleste': 'PDP',
    'caracas': 'CCS',
    'maracaibo': 'MAR',
    'valencia': 'VLN',
    'campo grande': 'CGR',
    'campogrande': 'CGR',
    'cuiabá': 'CGB',
    'cuiaba': 'CGB',
    'goiânia': 'GYN',
    'goiania': 'GYN',
    'palmas': 'PMW',
    'natal': 'NAT',
    'joão pessoa': 'JPA',
    'joaopessoa': 'JPA',
    'joao pessoa': 'JPA',
    'maceió': 'MCZ',
    'maceio': 'MCZ',
    'aracaju': 'AJU',
    'vitória': 'VIX',
    'vitoria': 'VIX',
    'belém': 'BEL',
    'belem': 'BEL',
    'macapá': 'MCP',
    'macapa': 'MCP',
    'porto velho': 'PVH',
    'portovelho': 'PVH',
    'rio branco': 'RBR',
    'riobranco': 'RBR',
    'boavista': 'BVB',
    'boa vista': 'BVB',
    'santarém': 'STM',
    'santarem': 'STM',
    'petrópolis': 'PET',
    'petropolis': 'PET',
    'niterói': 'NIT',
    'niteroi': 'NIT',
    'florianópolis': 'FLN',
    'florianopolis': 'FLN',
    'joinville': 'JOI',
    'blumenau': 'BNU',
    'caxias do sul': 'CXJ',
    'caxiasdosul': 'CXJ',
    'pelotas': 'PET',
    'passo fundo': 'PFB',
    'passofundo': 'PFB',
    'santa maria': 'RIA',
    'santamaria': 'RIA',
    'uruguaiana': 'URG',
    'bagé': 'BGX',
    'bage': 'BGX',
    'cruz alta': 'CZB',
    'cruzalta': 'CZB',
    'chapecó': 'XAP',
    'chapeco': 'XAP',
    'lages': 'LAJ',
    'tubarão': 'TUB',
    'tubarao': 'TUB',
    'criciúma': 'CCM',
    'criciuma': 'CCM',
    'itajaí': 'IJJ',
    'itajai': 'IJJ',
    'balneário camboriú': 'NVT',
    'balneariocamboriu': 'NVT',
    'porto seguro': 'BPS',
    'portoseguro': 'BPS',
    'ilhéus': 'IOS',
    'ilheus': 'IOS',
    'itabuna': 'ITN',
    'feira de santana': 'FEC',
    'feiradesantana': 'FEC',
    'juazeiro do norte': 'JDO',
    'juazeirodonorte': 'JDO',
    'teresina': 'THE',
    'picos': 'PCS',
    'floriano': 'FLB',
    'bom jesus da lapa': 'LAZ',
    'bomjesusdalapa': 'LAZ',
    'barreiras': 'BRA',
    'vitória da conquista': 'VDC',
    'vitoriadaconquista': 'VDC',
    'ipatinga': 'IPN',
    'uberlândia': 'UDI',
    'uberlandia': 'UDI',
    'uberaba': 'UBA',
    'divinópolis': 'DIQ',
    'divinopolis': 'DIQ',
    'ponta grossa': 'PGZ',
    'pontagrossa': 'PGZ',
    'londrina': 'LDB',
    'maringá': 'MGF',
    'maringa': 'MGF',
    'cascavel': 'CAC',
    'foz do iguaçu': 'IGU',
    'fozdoiguacu': 'IGU',
    'ciudad del este': 'AGT',
    'ciudaddeleste': 'AGT',
    'encarnación': 'ENO',
    'encarnacion': 'ENO',
    'pedro juan caballero': 'PJC',
    'pedrojuan caballero': 'PJC',
    'concepción': 'CIO',
    'concepcion': 'CIO',
    'pilar': 'PIL',
    'coronel oviedo': 'COV',
    'coroneloviedo': 'COV',
    'san lorenzo': 'SLO',
    'sanlorenzo': 'SLO',
    'caaguazú': 'CAG',
    'caaguazu': 'CAG',
    'villaricca': 'VRC',
    'caazapá': 'CZA',
    'caazapa': 'CZA',
    'paraguarí': 'PAG',
    'paraguari': 'PAG',
    'iguazú': 'IGR',
    'iguazu': 'IGR',
    'posadas': 'PSS',
    'resistencia': 'RES',
    'formosa': 'FMA',
    'santiago del estero': 'SDE',
    'santiagodelestero': 'SDE',
    'san miguel de tucumán': 'TUC',
    'sanmigueldetucuman': 'TUC',
    'tucumán': 'TUC',
    'tucuman': 'TUC',
    'salta': 'SLA',
    'jujuy': 'JUJ',
    'la rioja': 'IRJ',
    'larioja': 'IRJ',
    'catamarca': 'CTC',
    'san juan': 'UAQ',
    'sanjuan': 'UAQ',
    'san luis': 'LUQ',
    'sanluis': 'LUQ',
    'córdoba': 'COR',
    'santa fe': 'SFN',
    'santafe': 'SFN',
    'paraná': 'PRA',
    'parana': 'PRA',
    'concordia': 'COC',
    'gualeguaychú': 'GHU',
    'gualeguaychu': 'GHU',
    'victoria': 'VIC',
    'diamante': 'DIA',
    'bahía blanca': 'BHI',
    'bahiablanca': 'BHI',
    'neuquén': 'NQN',
    'neuquen': 'NQN',
    'bariloche': 'BRC',
    'esquel': 'EQS',
    'comodoro rivadavia': 'CRD',
    'comodororivadavia': 'CRD',
    'puerto madryn': 'PMY',
    'puertomadryn': 'PMY',
    'trelew': 'REL',
    'ushuaia': 'USH',
    'el calafate': 'FTE',
    'elcalafate': 'FTE',
    'puerto iguazú': 'IGR',
    'puertoiguazu': 'IGR',
    'puerto misiones': 'PSS',
    'puertomisiones': 'PSS',
    'puerto formosa': 'FMA',
    'puertoformosa': 'FMA',
    'puerto salta': 'SLA',
    'puertosalta': 'SLA',
    'puerto jujuy': 'JUJ',
    'puertojujuy': 'JUJ',
    'puerto la rioja': 'IRJ',
    'puertolarioja': 'IRJ',
    'puerto catamarca': 'CTC',
    'puertocatamarca': 'CTC',
    'puerto san juan': 'UAQ',
    'puertosanjuan': 'UAQ',
    'puerto san luis': 'LUQ',
    'puertosanluis': 'LUQ',
    'puerto santa fe': 'SFN',
    'puertosantafe': 'SFN',
    'puerto paraná': 'PRA',
    'puertoparana': 'PRA',
    'puerto concordia': 'COC',
    'puertoconcordia': 'COC',
    'puerto gualeguaychú': 'GHU',
    'puertogualeguaychu': 'GHU',
    'puerto victoria': 'VIC',
    'puertovictoria': 'VIC',
    'puerto diamante': 'DIA',
    'puertodiamante': 'DIA',
    'puerto bahía blanca': 'BHI',
    'puertobahiablanca': 'BHI',
    'puerto neuquén': 'NQN',
    'puertoneuquen': 'NQN',
    'puerto bariloche': 'BRC',
    'puertobariloche': 'BRC',
    'puerto esquel': 'EQS',
    'puertoesquel': 'EQS',
    'puerto comodoro rivadavia': 'CRD',
    'puertocomodororivadavia': 'CRD',
    'puerto puerto madryn': 'PMY',
    'puertopuertomadryn': 'PMY',
    'puerto trelew': 'REL',
    'puertotrelew': 'REL',
    'puerto ushuaia': 'USH',
    'puertoushuaia': 'USH',
    'puerto el calafate': 'FTE',
    'puertoelcalafate': 'FTE',
    
    // ===== AJOUTEZ VOS NOUVEAUX CODES IATA CI-DESSOUS =====
    // Format: 'nom-ville': 'CODE',
    // Exemple: 'lubumbashi': 'FBM',
    
};

// Passengers data
let passengersData = {
    adults: 1,
    children: 0,
    infants: 0,
    class: 'economy'
};

// Guests data for hotels
let hotelsGuestsData = {
    rooms: 2,
    adults: 2,
    children: 0
};

const classNames = {
    'economy': { fr: 'Économie', en: 'Economy' },
    'comfort': { fr: 'Confort', en: 'Comfort' },
    'business': { fr: 'Affaires', en: 'Business' },
    'first': { fr: 'Première', en: 'First' }
};

function redirectToAffiliate(type) {
    const url = affiliateLinks[type] || 'https://example.com';
    // Ouvrir dans un nouvel onglet
    window.open(url, '_blank');
}

function redirectToArticle(articleType) {
    // Rediriger vers les articles de blog ou pages d'astuces
    const articleLinks = {
        'animaux': 'animaux.html',
        'hotels-animaux': 'hotels-animaux.html',
        'hotels-famille': 'hotels-famille.html',
        'vols-long-courrier': 'vols-long-courrier.html',
        'valise': 'valise.html',
        'voyage-responsable': 'voyage-responsable.html',
    };
    
    const url = articleLinks[articleType];
    if (url) {
        window.location.href = url;
    } else {
        console.error('Article type not found:', articleType);
    }
}

// ===== Passengers Selector =====
function initPassengersSelector() {
    const selector = document.getElementById('passengersSelector');
    const display = document.getElementById('passengersDisplay');
    const dropdown = document.getElementById('passengersDropdown');
    
    if (!selector || !display || !dropdown) return;
    
    // Toggle dropdown
    display.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = dropdown.classList.contains('active');
        dropdown.classList.toggle('active');
        selector.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!selector.contains(e.target)) {
            dropdown.classList.remove('active');
            selector.classList.remove('active');
        }
    });
    
    // Passenger controls
    const passengerButtons = document.querySelectorAll('.passenger-btn');
    passengerButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const type = btn.getAttribute('data-type');
            const action = btn.getAttribute('data-action');
            
            if (action === 'increase') {
                if (type === 'adults' && passengersData.adults < 9) {
                    passengersData.adults++;
                } else if (type === 'children' && passengersData.children < 9) {
                    passengersData.children++;
                } else if (type === 'infants' && passengersData.infants < 9) {
                    passengersData.infants++;
                }
            } else if (action === 'decrease') {
                if (type === 'adults' && passengersData.adults > 1) {
                    passengersData.adults--;
                } else if (type === 'children' && passengersData.children > 0) {
                    passengersData.children--;
                } else if (type === 'infants' && passengersData.infants > 0) {
                    passengersData.infants--;
                }
            }
            
            updatePassengersDisplay();
        });
    });
    
    // Class selection
    const classOptions = document.querySelectorAll('input[name="flightClass"]');
    classOptions.forEach(option => {
        option.addEventListener('change', (e) => {
            passengersData.class = e.target.value;
            updatePassengersDisplay();
        });
    });
}

function updatePassengersDisplay() {
    const adultsCount = document.getElementById('adultsCount');
    const childrenCount = document.getElementById('childrenCount');
    const infantsCount = document.getElementById('infantsCount');
    const passengersText = document.getElementById('passengersText');
    
    if (adultsCount) adultsCount.textContent = passengersData.adults;
    if (childrenCount) childrenCount.textContent = passengersData.children;
    if (infantsCount) infantsCount.textContent = passengersData.infants;
    
    if (passengersText) {
        const total = passengersData.adults + passengersData.children + passengersData.infants;
        const classData = classNames[passengersData.class] || classNames['economy'];
        const classText = classData[currentLang] || classData['fr'];
        const passengerWord = total > 1 
            ? (currentLang === 'fr' ? 'passagers' : 'passengers')
            : (currentLang === 'fr' ? 'passager' : 'passenger');
        passengersText.textContent = `${total} ${passengerWord}, ${classText}`;
    }
}

// ===== Helper Functions for Flight Search =====

/**
 * Convertit une ville en code aéroport
 * @param {string} city - Nom de la ville ou code aéroport
 * @returns {string} - Code aéroport (3 lettres)
 */
function getAirportCode(city) {
    if (!city) return '';
    
    const trimmedCity = city.trim();
    const normalizedCity = trimmedCity.toLowerCase();
    
    // Si c'est déjà un code aéroport (3 lettres, majuscules ou minuscules)
    if (/^[A-Za-z]{3}$/.test(trimmedCity)) {
        return trimmedCity.toUpperCase();
    }
    
    // 1. Recherche exacte dans le mapping (priorité absolue)
    if (airportCodes[normalizedCity]) {
        return airportCodes[normalizedCity];
    }
    
    // 2. Recherche avec variantes (sans espaces, avec accents, etc.)
    // Essayer sans espaces
    const noSpaces = normalizedCity.replace(/\s+/g, '');
    if (airportCodes[noSpaces]) {
        return airportCodes[noSpaces];
    }
    
    // Essayer avec/sans accents (remplacer les caractères accentués)
    const noAccents = normalizedCity
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
    if (airportCodes[noAccents]) {
        return airportCodes[noAccents];
    }
    
    // 3. Recherche partielle stricte (seulement si la clé commence par la ville ou vice versa)
    // Cela évite les correspondances incorrectes comme "barreiras" pour "brazzaville"
    let bestMatch = null;
    let bestMatchLength = 0;
    
    for (const [key, code] of Object.entries(airportCodes)) {
        // Correspondance si la ville commence par la clé ou la clé commence par la ville
        // ET que la correspondance est significative (au moins 4 caractères)
        if (normalizedCity.startsWith(key) || key.startsWith(normalizedCity)) {
            const matchLength = Math.min(normalizedCity.length, key.length);
            // Prioriser les correspondances plus longues et significatives
            if (matchLength >= 4 && matchLength > bestMatchLength) {
                bestMatch = code;
                bestMatchLength = matchLength;
            }
        }
    }
    
    if (bestMatch) {
        return bestMatch;
    }
    
    // 4. Recherche partielle moins stricte (pour les villes avec plusieurs mots)
    // Chercher si un mot de la ville correspond à une clé
    const words = normalizedCity.split(/\s+/);
    for (const word of words) {
        if (word.length >= 3 && airportCodes[word]) {
            return airportCodes[word];
        }
    }
    
    // 5. Dernier recours: ne PAS utiliser les 3 premières lettres automatiquement
    // car cela peut créer des codes incorrects (BRA pour Brazzaville au lieu de BZV)
    // Retourner une chaîne vide pour forcer l'utilisateur à corriger
    console.warn(`Code IATA non trouvé pour: "${city}". Veuillez vérifier l'orthographe.`);
    return '';
}

/**
 * Convertit une date au format YYYY-MM-DD en format DDMM
 * @param {string} dateStr - Date au format YYYY-MM-DD
 * @returns {string} - Date au format DDMM
 */
function formatDateForAviasales(dateStr) {
    if (!dateStr) return '';
    
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    
    return day + month;
}

/**
 * Convertit la classe de vol en code Aviasales
 * @param {string} flightClass - Classe de vol (economy, comfort, business, first)
 * @returns {string} - Code de classe (vide pour economy, c1 pour business, etc.)
 */
function getClassCode(flightClass) {
    const classMap = {
        'economy': '',
        'comfort': 'c2',
        'business': 'c1',
        'first': 'c0'
    };
    
    return classMap[flightClass] || '';
}

/**
 * Construit l'URL de recherche Aviasales avec les paramètres
 * @param {string} origin - Ville de départ
 * @param {string} destination - Ville d'arrivée
 * @param {string} departureDate - Date de départ (YYYY-MM-DD)
 * @param {string} returnDate - Date de retour (YYYY-MM-DD, optionnel)
 * @param {number} passengers - Nombre de passagers
 * @param {string} flightClass - Classe de vol
 * @returns {string} - URL complète de recherche
 * 
 * Format Aviasales:
 * - Aller-retour: [ORIGIN][DEPDATE][DEST][RETDATE][PASSENGERS][CLASS]
 *   Exemple: FIH3011PAR0512c1 (Kinshasa 30 Nov - Paris 05 Dec, Business, 1 passager)
 * - Aller simple: [ORIGIN][DEPDATE][DEST][PASSENGERS][CLASS]
 *   Exemple: FIH1909DXB1 (Kinshasa 19 Sep - Dubai, 1 passager, Economy)
 */
function buildAviasalesSearchUrl(origin, destination, departureDate, returnDate, passengers, flightClass) {
    // Obtenir les codes aéroports
    const originCode = getAirportCode(origin);
    const destCode = getAirportCode(destination);
    
    // Validation des codes aéroports
    if (!originCode) {
        console.error(`Code IATA non trouvé pour la ville de départ: "${origin}"`);
        alert(`Code aéroport non trouvé pour "${origin}". Veuillez vérifier l'orthographe ou utiliser le code IATA (3 lettres).`);
        return '';
    }
    
    if (!destCode) {
        console.error(`Code IATA non trouvé pour la destination: "${destination}"`);
        alert(`Code aéroport non trouvé pour "${destination}". Veuillez vérifier l'orthographe ou utiliser le code IATA (3 lettres).`);
        return '';
    }
    
    // Formater les dates au format DDMM
    const depDate = formatDateForAviasales(departureDate);
    const retDate = returnDate ? formatDateForAviasales(returnDate) : '';
    
    // Obtenir le code de classe
    const classCode = getClassCode(flightClass);
    
    // Construire le code de recherche selon le format Aviasales
    let searchCode = originCode + depDate + destCode;
    
    // Ajouter la date de retour si présente (pour aller-retour)
    if (retDate) {
        searchCode += retDate;
    }
    
    // Ajouter le nombre de passagers (toujours inclus, même pour 1 passager)
    searchCode += passengers;
    
    // Ajouter le code de classe (seulement si différent de Economy)
    // Note: Le code de classe vient APRÈS le nombre de passagers
    if (classCode) {
        searchCode += classCode;
    }
    
    // Construire l'URL complète avec le marker d'affiliation
    const baseUrl = 'https://www.aviasales.com/search/';
    const url = baseUrl + searchCode + '?marker=' + AViasales_MARKER;
    
    return url;
}

// ===== Search Flights Function =====
function searchFlights() {
    const origin = document.getElementById('vols-origin')?.value || '';
    const destination = document.getElementById('vols-destination')?.value || '';
    const departure = document.getElementById('vols-departure')?.value || '';
    const returnDate = document.getElementById('vols-return')?.value || '';
    
    // Validation des champs requis
    if (!origin || !destination || !departure) {
        alert('Veuillez remplir au moins la ville de départ, la destination et la date de départ.');
        return;
    }
    
    // Vérifier que la date de départ n'est pas dans le passé
    const depDate = new Date(departure);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (depDate < today) {
        alert('La date de départ ne peut pas être dans le passé.');
        return;
    }
    
    // Vérifier que la date de retour est après la date de départ (si fournie)
    if (returnDate) {
        const retDate = new Date(returnDate);
        if (retDate <= depDate) {
            alert('La date de retour doit être après la date de départ.');
            return;
        }
    }
    
    // Récupérer les données des passagers
    const totalPassengers = passengersData.adults + passengersData.children;
    const flightClass = passengersData.class || 'economy';
    
    // Obtenir les codes aéroports pour validation
    const originCode = getAirportCode(origin);
    const destCode = getAirportCode(destination);
    
    // Afficher les codes trouvés dans la console pour déboguer
    console.log(`Recherche de vol: ${origin} → Code: ${originCode}, ${destination} → Code: ${destCode}`);
    
    if (!originCode || originCode.length !== 3) {
        alert(`Impossible de trouver le code aéroport pour "${origin}". Veuillez entrer le nom de la ville ou le code aéroport (ex: Paris ou PAR).`);
        return;
    }
    
    if (!destCode || destCode.length !== 3) {
        alert(`Impossible de trouver le code aéroport pour "${destination}". Veuillez entrer le nom de la ville ou le code aéroport (ex: Kinshasa ou FIH).`);
        return;
    }
    
    // Construire l'URL de recherche
    const searchUrl = buildAviasalesSearchUrl(
        origin,
        destination,
        departure,
        returnDate,
        totalPassengers,
        flightClass
    );
    
    // Rediriger vers l'URL de recherche
    window.open(searchUrl, '_blank');
}

// ===== Hotels Guests Selector =====
function initHotelsGuestsSelector() {
    const selector = document.getElementById('guestsSelector');
    const display = document.getElementById('guestsDisplay');
    const dropdown = document.getElementById('guestsDropdown');
    const doneBtn = document.getElementById('guestsDoneBtn');
    
    if (!selector || !display || !dropdown) return;
    
    // Toggle dropdown
    display.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
        selector.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!selector.contains(e.target)) {
            dropdown.classList.remove('active');
            selector.classList.remove('active');
        }
    });
    
    // Close dropdown on Done button
    if (doneBtn) {
        doneBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.remove('active');
            selector.classList.remove('active');
        });
    }
    
    // Guest controls
    const guestButtons = document.querySelectorAll('.guests-selector .guest-btn');
    guestButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const type = btn.getAttribute('data-type');
            const action = btn.getAttribute('data-action');
            
            if (action === 'increase') {
                if (type === 'rooms' && hotelsGuestsData.rooms < 9) {
                    hotelsGuestsData.rooms++;
                } else if (type === 'adults' && hotelsGuestsData.adults < 9) {
                    hotelsGuestsData.adults++;
                } else if (type === 'children' && hotelsGuestsData.children < 9) {
                    hotelsGuestsData.children++;
                }
            } else if (action === 'decrease') {
                if (type === 'rooms' && hotelsGuestsData.rooms > 1) {
                    hotelsGuestsData.rooms--;
                } else if (type === 'adults' && hotelsGuestsData.adults > 1) {
                    hotelsGuestsData.adults--;
                } else if (type === 'children' && hotelsGuestsData.children > 0) {
                    hotelsGuestsData.children--;
                }
            }
            
            updateHotelsGuestsDisplay();
        });
    });
}

function updateHotelsGuestsDisplay() {
    const roomsCount = document.getElementById('roomsCount');
    const adultsCount = document.getElementById('hotelsAdultsCount');
    const childrenCount = document.getElementById('hotelsChildrenCount');
    const guestsText = document.getElementById('guestsText');
    
    if (roomsCount) roomsCount.textContent = hotelsGuestsData.rooms;
    if (adultsCount) adultsCount.textContent = hotelsGuestsData.adults;
    if (childrenCount) childrenCount.textContent = hotelsGuestsData.children;
    
    if (guestsText) {
        const roomWord = hotelsGuestsData.rooms > 1 
            ? (currentLang === 'fr' ? 'chambres' : 'rooms')
            : (currentLang === 'fr' ? 'chambre' : 'room');
        const adultWord = hotelsGuestsData.adults > 1 
            ? (currentLang === 'fr' ? 'adultes' : 'adults')
            : (currentLang === 'fr' ? 'adulte' : 'adult');
        const childWord = hotelsGuestsData.children > 1 
            ? (currentLang === 'fr' ? 'enfants' : 'children')
            : (currentLang === 'fr' ? 'enfant' : 'child');
        
        let text = `${hotelsGuestsData.rooms} ${roomWord}, ${hotelsGuestsData.adults} ${adultWord}`;
        if (hotelsGuestsData.children > 0) {
            text += `, ${hotelsGuestsData.children} ${childWord}`;
        }
        guestsText.textContent = text;
    }
}

// ===== Helper Functions for Hotel Search =====

/**
 * Récupère les données de ville Trip.com
 * @param {string} city - Nom de la ville
 * @returns {object|null} - Données de la ville ou null si non trouvée
 */
function getTripComCityData(city) {
    if (!city) return null;
    
    const normalizedCity = city.trim().toLowerCase();
    
    // Recherche exacte
    if (tripComCityData[normalizedCity]) {
        return tripComCityData[normalizedCity];
    }
    
    // Recherche partielle
    for (const [key, data] of Object.entries(tripComCityData)) {
        if (normalizedCity.includes(key) || key.includes(normalizedCity)) {
            return data;
        }
    }
    
    return null;
}

/**
 * Construit l'URL de recherche Trip.com avec les paramètres
 * @param {string} destination - Ville de destination
 * @param {string} checkin - Date d'arrivée (YYYY-MM-DD)
 * @param {string} checkout - Date de départ (YYYY-MM-DD)
 * @param {number} rooms - Nombre de chambres
 * @param {number} adults - Nombre d'adultes
 * @param {number} children - Nombre d'enfants
 * @returns {string} - URL complète de recherche
 */
function buildTripComSearchUrl(destination, checkin, checkout, rooms, adults, children) {
    // Récupérer les données de la ville
    const cityData = getTripComCityData(destination);
    
    // Si la ville n'est pas dans le mapping, utiliser des valeurs par défaut
    // Trip.com pourra quand même essayer de trouver la ville via le nom
    const cityId = cityData ? cityData.cityId : '0';
    const provinceId = cityData ? cityData.provinceId : '0';
    const countryId = cityData ? cityData.countryId : '0';
    const cityName = cityData ? cityData.cityName : destination.trim();
    const destName = cityData ? cityData.destName : destination.trim();
    
    // Construire les paramètres de l'URL
    const params = new URLSearchParams({
        flexType: '1',
        cityId: cityId,
        provinceId: provinceId,
        districtId: '0',
        countryId: countryId,
        cityName: cityName,
        destName: destName,
        searchWord: cityName,
        searchType: 'CT',
        optionId: cityId,
        searchValue: `${countryId}|${cityId}*${countryId}*${cityId}`,
        checkin: checkin,
        checkout: checkout,
        crn: rooms.toString(),
        adult: adults.toString(),
        listFilters: `29~1*29*1~${adults}*${adults}`,
        curr: 'USD',
        locale: 'en-XX',
        allianceid: TRIP_COM_ALLIANCE_ID,
        sid: TRIP_COM_SID,
        trip_sub1: '',
        old: '1'
    });
    
    // Ajouter les enfants si présents
    if (children > 0) {
        params.append('child', children.toString());
    }
    
    // Construire l'URL complète
    const baseUrl = 'https://www.trip.com/hotels/list';
    const url = baseUrl + '?' + params.toString();
    
    return url;
}

// ===== Search Hotels Function =====
function searchHotels() {
    const destination = document.getElementById('hotels-destination')?.value || '';
    const checkin = document.getElementById('hotels-checkin')?.value || '';
    const checkout = document.getElementById('hotels-checkout')?.value || '';
    
    // Validation des champs requis
    if (!destination || !checkin || !checkout) {
        alert('Veuillez remplir la destination, la date d\'arrivée et la date de départ.');
        return;
    }
    
    // Vérifier que la date d'arrivée n'est pas dans le passé
    const checkinDate = new Date(checkin);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (checkinDate < today) {
        alert('La date d\'arrivée ne peut pas être dans le passé.');
        return;
    }
    
    // Vérifier que la date de départ est après la date d'arrivée
    const checkoutDate = new Date(checkout);
    if (checkoutDate <= checkinDate) {
        alert('La date de départ doit être après la date d\'arrivée.');
        return;
    }
    
    // Récupérer les données des chambres et personnes
    const rooms = hotelsGuestsData.rooms || 1;
    const adults = hotelsGuestsData.adults || 1;
    const children = hotelsGuestsData.children || 0;
    
    // Vérifier si la ville est dans le mapping
    const cityData = getTripComCityData(destination);
    if (!cityData) {
        // Avertissement informatif (non bloquant)
        console.warn(`La ville "${destination}" n'est pas dans le mapping Trip.com. La recherche sera effectuée avec le nom de la ville.`);
    }
    
    // Construire l'URL de recherche
    const searchUrl = buildTripComSearchUrl(
        destination,
        checkin,
        checkout,
        rooms,
        adults,
        children
    );
    
    // Rediriger vers l'URL de recherche
    window.open(searchUrl, '_blank');
}

// ===== Helper Functions for Car Search =====

/**
 * Convertit une date au format YYYY-MM-DD en format DD.MM.YYYY (format GetRentACar)
 * @param {string} dateStr - Date au format YYYY-MM-DD
 * @returns {string} - Date au format DD.MM.YYYY
 */
function formatDateForGetRentACar(dateStr) {
    if (!dateStr) return '';
    
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}.${month}.${year}`;
}

/**
 * Formate le nom de la ville pour GetRentACar
 * Ajoute le pays si nécessaire (format: "Ville, Pays")
 * @param {string} location - Nom de la ville
 * @returns {string} - Ville formatée avec pays
 */
function formatLocationForGetRentACar(location) {
    if (!location) return '';
    
    const trimmedLocation = location.trim();
    
    // Si la location contient déjà une virgule, on la garde telle quelle
    if (trimmedLocation.includes(',')) {
        return trimmedLocation;
    }
    
    // Mapping des villes vers leur format complet avec pays
    const cityCountryMap = {
        'paris': 'Paris, France',
        'kinshasa': 'Kinshasa, Democratic Republic of the Congo',
        'londres': 'London, United Kingdom',
        'london': 'London, United Kingdom',
        'new york': 'New York, United States',
        'newyork': 'New York, United States',
        'dubai': 'Dubai, United Arab Emirates',
        'marseille': 'Marseille, France',
        'lyon': 'Lyon, France',
        'nice': 'Nice, France',
        'barcelone': 'Barcelona, Spain',
        'barcelona': 'Barcelona, Spain',
        'madrid': 'Madrid, Spain',
        'rome': 'Rome, Italy',
        'milan': 'Milan, Italy',
        'amsterdam': 'Amsterdam, Netherlands',
        'frankfurt': 'Frankfurt, Germany',
        'berlin': 'Berlin, Germany',
        'munich': 'Munich, Germany',
        'vienne': 'Vienna, Austria',
        'vienna': 'Vienna, Austria',
        'zurich': 'Zurich, Switzerland',
        'geneve': 'Geneva, Switzerland',
        'geneva': 'Geneva, Switzerland',
        'bruxelles': 'Brussels, Belgium',
        'brussels': 'Brussels, Belgium',
        'lisbonne': 'Lisbon, Portugal',
        'lisbon': 'Lisbon, Portugal'
    };
    
    const normalizedLocation = trimmedLocation.toLowerCase();
    
    // Recherche exacte
    if (cityCountryMap[normalizedLocation]) {
        return cityCountryMap[normalizedLocation];
    }
    
    // Recherche partielle
    for (const [key, value] of Object.entries(cityCountryMap)) {
        if (normalizedLocation.includes(key) || key.includes(normalizedLocation)) {
            return value;
        }
    }
    
    // Si non trouvé, retourner la location telle quelle
    // GetRentACar pourra peut-être la trouver
    return trimmedLocation;
}

/**
 * Construit l'URL de recherche GetRentACar avec les paramètres
 * @param {string} pickupLocation - Lieu de ramassage
 * @param {string} pickupDate - Date de ramassage (YYYY-MM-DD)
 * @param {string} returnDate - Date de retour (YYYY-MM-DD)
 * @returns {string} - URL complète de recherche
 */
function buildGetRentACarSearchUrl(pickupLocation, pickupDate, returnDate) {
    // Formater la location
    const formattedLocation = formatLocationForGetRentACar(pickupLocation);
    
    // Formater les dates au format DD.MM.YYYY
    const formattedPickupDate = formatDateForGetRentACar(pickupDate);
    const formattedReturnDate = formatDateForGetRentACar(returnDate);
    
    // Construire les paramètres de l'URL
    const params = new URLSearchParams({
        vehicleSegment: 'cars',
        'pickup[location]': formattedLocation,
        'pickup[date]': formattedPickupDate,
        'return[date]': formattedReturnDate
    });
    
    // Construire l'URL complète
    const baseUrl = 'https://getrentacar.com/fr/location-voiture/request';
    const url = baseUrl + '?' + params.toString();
    
    return url;
}

// ===== Search Cars Function =====
function searchCars() {
    const pickup = document.getElementById('voitures-pickup')?.value || '';
    const pickupDate = document.getElementById('voitures-pickup-date')?.value || '';
    const returnDate = document.getElementById('voitures-return-date')?.value || '';
    
    // Validation des champs requis
    if (!pickup || !pickupDate || !returnDate) {
        alert('Veuillez remplir le lieu de ramassage, la date de ramassage et la date de retour.');
        return;
    }
    
    // Vérifier que la date de ramassage n'est pas dans le passé
    const pickupDateObj = new Date(pickupDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (pickupDateObj < today) {
        alert('La date de ramassage ne peut pas être dans le passé.');
        return;
    }
    
    // Vérifier que la date de retour est après la date de ramassage
    const returnDateObj = new Date(returnDate);
    if (returnDateObj <= pickupDateObj) {
        alert('La date de retour doit être après la date de ramassage.');
        return;
    }
    
    // Construire l'URL de recherche
    const searchUrl = buildGetRentACarSearchUrl(
        pickup,
        pickupDate,
        returnDate
    );
    
    // Rediriger vers l'URL de recherche
    window.open(searchUrl, '_blank');
}

// Make functions globally available
window.redirectToAffiliate = redirectToAffiliate;
window.redirectToArticle = redirectToArticle;
window.searchFlights = searchFlights;
window.searchHotels = searchHotels;
window.searchCars = searchCars;
window.searchHotels = searchHotels;

// ===== Header Scroll Effect =====
let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 30px rgba(255, 140, 0, 0.3)';
    } else {
        header.style.boxShadow = '0 4px 20px rgba(255, 140, 0, 0.2)';
    }
    
    lastScroll = currentScroll;
});

// ===== Initialize on DOM Load =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize language system
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        // Set initial language
        translatePage(currentLang);
        
        langBtn.addEventListener('click', () => {
            const newLang = currentLang === 'fr' ? 'en' : 'fr';
            translatePage(newLang);
        });
    } else {
        // If button not found, still translate the page
        translatePage(currentLang);
    }
    
    // Désactiver l'effet tilt pour les cartes de promotion
    initTiltEffect();
    // Désactiver les animations au scroll pour les cartes de promotion
    initScrollAnimations();
    
    // Désactiver spécifiquement les effets sur les cartes de promotion
    const promoCards = document.querySelectorAll('.promo-card-extended[data-tilt]');
    promoCards.forEach(card => {
        card.removeAttribute('data-tilt');
    });
    initPassengersSelector();
    updatePassengersDisplay();
    initHotelsGuestsSelector();
    updateHotelsGuestsDisplay();
    
    // Check if we need to activate a search tab (from navigation from another page)
    const tabToActivate = sessionStorage.getItem('activateSearchTab');
    if (tabToActivate) {
        // Clear the stored tab
        sessionStorage.removeItem('activateSearchTab');
        
        // Wait a bit for the page to fully load, then scroll and activate tab
        setTimeout(() => {
            // Scroll to hero section
            const heroSection = document.getElementById('accueil');
            if (heroSection) {
                const headerOffset = 80;
                const elementPosition = heroSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
            
            // Activate the search tab
            setTimeout(() => {
                activateSearchTab(tabToActivate);
            }, 300);
        }, 100);
    }
    
    // Add fade-in class to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease';
            heroContent.style.opacity = '1';
        }, 100);
    }
});

// ===== Parallax Effect for Hero =====
// Désactivé pour garder l'image de fond fixe
// window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const hero = document.querySelector('.hero');
//     if (hero) {
//         const heroBackground = hero.querySelector('.hero-background');
//         if (heroBackground) {
//             heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
//         }
//     }
// });

// ===== Close Chat Modal when clicking outside =====
if (chatModal) {
    chatModal.addEventListener('click', (e) => {
        if (e.target === chatModal) {
            chatModal.classList.remove('active');
        }
    });
}

// ===== Form Validation =====
const searchInputs = document.querySelectorAll('.search-field input');
searchInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() === '' && input.hasAttribute('required')) {
            input.style.borderColor = '#ff4444';
        } else {
            input.style.borderColor = '';
        }
    });
});

