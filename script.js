/* ================================================================
   NAV LINKS — Fixed: reset slide index on section change
   ================================================================ */
const navItems = document.querySelectorAll("nav li");
const sliderSections = document.querySelectorAll(".slider-section");

// Track slider state per section
const sliderState = {};

navItems.forEach(item => {
    item.addEventListener("click", () => {
        const id = item.dataset.section;
        sliderSections.forEach(s => s.classList.remove("active"));
        navItems.forEach(n => n.classList.remove("active"));
        const target = document.getElementById(id);
        if (target) {
            target.classList.add("active");
            // Reset to first slide when switching sections (fixes glitch)
            const state = sliderState[id];
            if (state) {
                state.goTo(0);
            }
        }
        item.classList.add("active");
    });
});

/* ================================================================
   SLIDERS — with swipe, keyboard, and counter
   ================================================================ */
sliderSections.forEach(section => {
    const slides = section.querySelectorAll(".slide");
    if (!slides.length) return;

    let index = 0;
    const sectionId = section.id;
    const counterEl = document.getElementById(`counter-${sectionId}`);
    const prevBtn = section.querySelector(`#prev-${sectionId}`);
    const nextBtn = section.querySelector(`#next-${sectionId}`);

    function showSlide(i) {
        slides.forEach(s => {
            s.classList.remove("active");
            s.style.scrollTop = 0; // reset scroll position
        });
        index = ((i % slides.length) + slides.length) % slides.length;
        if (slides[index]) {
            slides[index].classList.add("active");
        }
        if (counterEl) counterEl.textContent = `${index + 1} / ${slides.length}`;
    }

    // Store reference for external reset
    sliderState[sectionId] = { goTo: showSlide };

    if (nextBtn) nextBtn.addEventListener("click", () => showSlide(index + 1));
    if (prevBtn) prevBtn.addEventListener("click", () => showSlide(index - 1));

    // Touch swipe
    const sliderEl = section.querySelector(".slider");
    if (sliderEl) {
        let tx = 0, ty = 0;
        sliderEl.addEventListener("touchstart", e => {
            tx = e.touches[0].clientX;
            ty = e.touches[0].clientY;
        }, { passive: true });
        sliderEl.addEventListener("touchend", e => {
            const dx = e.changedTouches[0].clientX - tx;
            const dy = e.changedTouches[0].clientY - ty;
            if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 42) {
                showSlide(dx < 0 ? index + 1 : index - 1);
            }
        }, { passive: true });

        sliderEl.setAttribute("tabindex", "0");
        sliderEl.addEventListener("keydown", e => {
            if (e.key === "ArrowRight") showSlide(index + 1);
            if (e.key === "ArrowLeft") showSlide(index - 1);
        });
    }
    showSlide(0);
});

/* ================================================================
   SIDE MENU
   ================================================================ */
function toggleMenu() {
    const menu = document.getElementById("sideMenu");
    const overlay = document.getElementById("menuOverlay");
    const isOpen = menu.classList.toggle("active");
    overlay && overlay.classList.toggle("active");
    document.body.style.overflow = isOpen ? "hidden" : "";
}

document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
        const m = document.getElementById("sideMenu");
        if (m && m.classList.contains("active")) toggleMenu();
    }
});

/* ================================================================
   DARK MODE
   ================================================================ */
function toggleDarkMode() {
    const isDark = document.body.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateDarkBtn(isDark);
}

function updateDarkBtn(isDark) {
    const btn = document.querySelector("[data-i18n='sideDark']");
    if (!btn) return;
    const lang = localStorage.getItem("lang") || "fr";
    const t = translations[lang];
    btn.textContent = isDark ? t.sideLightMode : t.sideDark;
}

window.addEventListener("load", () => {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        updateDarkBtn(true);
    }
});

/* ================================================================
   TRANSLATIONS — Full FR / EN / AR with new content
   ================================================================ */
const translations = {

    /* ──────────────── FRANÇAIS ──────────────── */
    fr: {
        dir: "ltr", lang: "fr",
        pageTitle: "Guide de la Femme Enceinte",
        header: "💗 Guide de la Femme Enceinte 💗",
        footer: "💗 Tous droits réservés — Guide de la Femme Enceinte",
        footerDeveloped: "Développement & Design par",
        navHome: "🏠",
        navBirth: "👶 Accouchement",
        navBreathing: "🌬️ Respiration",
        navPostures: "🤱 Postures",
        navAlternatives: "✨ Alternatives",
        sideSettings: "Paramètres",
        sideMode: "Affichage",
        sideDark: "🌙 Mode sombre",
        sideLightMode: "☀️ Mode clair",
        sideLang: "Langue",
        sideAbout: "À propos",
        aboutText: "Ce guide a été développé par une équipe de professionnelles de santé tunisiennes dédiées au bien-être de la femme enceinte.",
        sideContact: "Notre équipe médicale",
        sideCredit: "Crédits",
        creditRole: "Développement & Design",
        disclaimer: "⚠️ Ce guide est à titre informatif. Consultez toujours votre médecin ou sage-femme pour un suivi personnalisé.",
        cityTunis: "Tunis", citySousse: "Sousse", citySfax: "Sfax", cityMonastir: "Monastir",
        countryTunisia: "Tunisie",
        btnPrev: "◀ Précédent", btnNext: "Suivant ▶",
        navBilan: "📋 Bilan Santé",
        videoNotSupported: "Votre navigateur ne supporte pas la vidéo.",

        // ─── MESSAGES ESSENTIELS ───
        msg_title_1: "Ton corps est fait pour accoucher",
        msg_body_1: "L'accouchement est un processus naturel. Le corps de la femme est préparé pour cela. Il produit des hormones qui aident les contractions et diminuent la douleur.",
        msg_title_2: "La douleur a un rôle",
        msg_body_2: "La douleur pendant le travail est normale. Chaque contraction aide le col à s'ouvrir et le bébé à descendre. La douleur vient par moments, puis elle diminue entre les contractions.",
        msg_title_3: "La respiration aide beaucoup",
        msg_body_3: "Respirer calmement et profondément diminue le stress, aide à supporter la douleur, améliore l'oxygène pour la maman et le bébé.",
        msg_title_4: "Rester calme aide le travail",
        msg_body_4: "Le stress peut ralentir les contractions. Un environnement calme et rassurant aide le corps à mieux travailler. Se sentir soutenue est très important.",
        msg_title_5: "Chaque accouchement est différent",
        msg_body_5: "Chaque femme est unique. Chaque bébé est différent. L'important est d'être informée, soutenue et confiante.",
        msg_title_6: "Femme bien informée",
        msg_body_6: "Une femme bien informée a moins peur, se sent plus forte et vit une expérience plus positive.",

        // Accueil slides
        welcomeBadge: "Guide Officiel",
        slide_accueil_0_title: "Bienvenue, Future Maman 💗",
        slide_accueil_0_sub: "Votre compagnon de grossesse — du premier trimestre jusqu'à l'accouchement",
        slide_accueil_0_body: "Ce guide complet a été conçu par une équipe de professionnelles de santé tunisiennes pour vous accompagner à chaque étape de votre grossesse.",
        slide_accueil_1_title: "🌸 Messages Essentiels",
        slide_accueil_2_title: "🌱 Votre corps pendant la grossesse",
        slide_accueil_2_body: "Pendant la grossesse, votre corps vit une transformation physiologique exceptionnelle. Comprendre ces changements vous permet de mieux les appréhender.",
        bodyPoint1: "🔸 1er trimestre : Fatigue intense, nausées, adaptation hormonale",
        bodyPoint2: "🔸 2e trimestre : Retour d'énergie, croissance du ventre, premiers mouvements",
        bodyPoint3: "🔸 3e trimestre : Préparation à l'accouchement, gestion du poids et de la posture",
        bodyPoint4: "🔸 En continu : Hydrater, se reposer, consulter votre équipe soignante régulièrement",
        slide_accueil_3_title: "🥗 Nutrition & Bien-être",
        slide_accueil_3_body: "Une alimentation équilibrée est le pilier d'une grossesse saine. Privilégiez des apports riches en acide folique, fer, calcium et oméga-3.",
        nutri1: "🥦 Légumes verts, légumineuses et fruits frais chaque jour",
        nutri2: "🐟 Poissons gras (sardines, saumon) 2 fois par semaine",
        nutri3: "🥛 Produits laitiers pour le calcium",
        nutri4: "💊 Suppléments de fer et acide folique sur prescription",
        nutri5: "💧 Au moins 1,5 à 2 litres d'eau par jour",
        slide_accueil_4_title: "💆‍♀️ Santé mentale & Soutien émotionnel",
        slide_accueil_4_body: "Votre bien-être émotionnel est tout aussi important que votre santé physique. La grossesse peut s'accompagner de doutes, d'angoisses — c'est tout à fait normal.",
        mental1: "💬 Parlez de vos émotions à votre entourage ou à un professionnel",
        mental2: "🧘 Pratiquez la méditation et la relaxation guidée",
        mental3: "📖 Tenez un journal de grossesse pour exprimer vos ressentis",
        mental4: "🤝 Rejoignez des groupes de soutien pour futures mamans",
        mental5: "🌙 Accordez-vous des moments de repos et de plaisir chaque jour",
        feat1: "🤰 Postures", feat2: "🌬️ Respiration", feat3: "👶 Accouchement", feat4: "✨ Alternatives",

        // ─── ACCOUCHEMENT ───
        birthBadge: "Préparation à l'accouchement",
        slide_birth_0_title: "👶 Accouchement Physiologique",
        slide_birth_0_body: "Un accouchement physiologique se déroule naturellement, sans intervention médicale systématique. Le corps de la femme est capable d'accoucher grâce aux contractions utérines, à la descente progressive du bébé et aux hormones naturelles (ocytocine, endorphines).",
        slide_birth_1_title: "🌊 Les 4 Phases de l'accouchement",
        slide_birth_1_intro: "Comprendre chaque phase vous permet de vous préparer mentalement et physiquement pour vivre ce moment en confiance.",
        b_phase1_title: "1️⃣ Phase de latence (0–3 cm)",
        b_phase1_desc: "Contractions irrégulières et légères. La femme peut encore parler et marcher. Le col commence à se modifier.",
        b_phase2_title: "2️⃣ Phase active du travail (4–10 cm)",
        b_phase2_desc: "Contractions régulières, plus intenses et rapprochées. Le col se dilate progressivement et le bébé descend.",
        b_phase3_title: "3️⃣ Expulsion",
        b_phase3_desc: "Envie de pousser. La tête du bébé s'engage. Poussées coordonnées avec la respiration.",
        b_phase4_title: "4️⃣ Délivrance",
        b_phase4_desc: "Expulsion du placenta dans les 30 minutes qui suivent la naissance. Le corps libère les hormones du bonheur.",
        slide_birth_2_title: "🤝 Rôle du soutien pendant l'accouchement",
        slide_birth_2_body: "Avoir une personne de confiance à vos côtés peut transformer votre expérience d'accouchement.",
        support1: "✓ Offrir un soutien émotionnel et physique constant",
        support2: "✓ Vous rappeler vos techniques de respiration",
        support3: "✓ Vous aider à trouver les positions les plus confortables",
        support4: "✓ Vous hydrater et vous encourager",
        support5: "✓ Communiquer avec l'équipe médicale en votre nom",
        slide_birth_3_title: "💪 Postures et mobilité pendant le travail",
        slide_birth_3_body: "La mobilité et le changement de position favorisent la progression du travail et réduisent la douleur.",
        position1: "🚶 Marcher librement pendant les contractions",
        position2: "🧘 Balancer le bassin d'avant en arrière",
        position3: "🤰 Accroupie : favorise l'ouverture du bassin",
        position4: "🌀 À quatre pattes : soulage le dos et oriente le bébé",
        position5: "💨 Debout, appuyée sur un support : légèreté et mobilité",

        // ─── RESPIRATION ───
        breathBadge: "Gestion du souffle",
        slide_resp_0_title: "🌷 Bienvenue dans ton espace respiration",
        slide_resp_0_body: "Prends un instant pour toi… La respiration est ton alliée tout au long de la grossesse et le jour de la naissance. Elle t'aide à te détendre, à apaiser ton esprit et à accompagner ton corps avec confiance. Respire… ton corps sait faire.",
        breath1: "💓 Oxygénation",
        breath2: "🧠 Réduit l'anxiété",
        breath3: "💪 Diaphragme",
        breath4: "😌 Détente",
        slide_resp_1_title: "🫁 Respirations pendant la grossesse",
        resp_method1_tag: "1. Respiration abdominale",
        resp_method1_how: "Posez une main sur le ventre. Inspirez lentement par le nez — ventre se gonfle. Expirez doucement par la bouche — ventre se relâche. Répétez 5–10 fois.",
        resp_method1_ben: "✔ Améliore l'oxygénation ✔ Favorise la relaxation ✔ Diminue le stress",
        resp_method2_tag: "2. Respiration lente et profonde",
        resp_method2_how: "Inspirez lentement par le nez. Expirez doucement par la bouche. Gardez un rythme calme et régulier plusieurs minutes.",
        resp_method2_ben: "✔ Apaise corps et esprit ✔ Améliore la circulation ✔ Favorise le sommeil",
        resp_method3_tag: "3. Cohérence cardiaque (5-5)",
        resp_method3_how: "Inspirez 5 secondes par le nez. Expirez 5 secondes par la bouche. Continuez 5 minutes.",
        resp_method3_ben: "✔ Réduit stress et anxiété ✔ Équilibre émotionnel ✔ Détente générale",
        resp_method4_tag: "4. Respiration soufflée",
        resp_method4_how: "Inspirez profondément. Expirez lentement comme si vous souffliez dans une paille.",
        resp_method4_ben: "✔ Relâche les tensions ✔ Prépare la respiration du travail",
        slide_resp_2_title: "🌊 Respiration pendant la phase active",
        slide_resp_2_intro: "Pendant le travail, votre col se dilate et les contractions deviennent plus intenses. La respiration devient votre outil principal pour gérer la douleur.",
        resp_act1_badge: "Phase latente 0–4 cm",
        resp_act1_tag: "Respiration lente et profonde",
        resp_act1_desc: "Inspirez profondément et calmement. Expirez doucement. Gardez un rythme régulier. ✔ Apaise le corps ✔ Réduit la tension musculaire",
        resp_act2_badge: "Phase active 4–10 cm",
        resp_act2_tag: "Respiration rythmée (Lamaze)",
        resp_act2_desc: "Inspirez doucement par le nez. Expirez par la bouche en souffle long et contrôlé. Visualisez votre corps détendu. ✔ Diminue la douleur ✔ Aide à gérer les contractions",
        resp_act3_badge: "Contraction intense",
        resp_act3_tag: "Panting (respiration courte)",
        resp_act3_desc: "Soufflez doucement et rapidement. Quand la sage-femme demande de ne pas pousser. ✔ Retarde la poussée ✔ Protège le col",
        slide_resp_3_title: "🌺 Respiration pendant l'expulsion",
        slide_resp_3_intro: "Pendant cette phase, la respiration transforme votre effort en geste contrôlé et sécurisé pour vous et votre bébé.",
        resp_exp1_tag: "1. Poussée spontanée (recommandée OMS)",
        resp_exp1_desc: "Choisissez une position confortable. Respirez normalement. Poussez uniquement quand vous ressentez l'envie. Ne retenez jamais le souffle trop longtemps. ✔ Réduit la fatigue ✔ Diminue les déchirures ✔ Plus naturel",
        resp_exp2_tag: "2. Poussée expiratoire dirigée",
        resp_exp2_desc: "Inspirez profondément, gonflez ventre puis poitrine. Expirez lentement par la bouche — son « F » ou « S ». Guidée par la sage-femme si nécessaire. ✔ Aide le bébé à descendre ✔ Protège le périnée",
        resp_exp_tip: "💡 Conseil : Créez un rituel quotidien — matin, pause déjeuner, ou soir avant de dormir. Choisissez un endroit calme, ne forcez jamais.",

        // ─── POSTURES ───
        posturesBadge: "Kinésithérapie prénatale",
        slide_pos_0_title: "🤱 Chère future maman",
        slide_pos_0_body: "Ton corps vit une transformation extraordinaire. Avec la croissance de ton ventre, ta posture change et certaines tensions peuvent apparaître au niveau du dos, du bassin ou des jambes.",
        slide_pos_0_body2: "Ces inconforts sont fréquents pendant la grossesse. Grâce à des postures douces et adaptées, tu peux soulager ces douleurs, te détendre et préparer ton corps à l’accouchement.Voici quelques postures simples et efficaces à pratiquer pendant la grossesse.",
        slide_pos_1_title: "🌿 Décubitus Latéral Gauche (DLG)",
        slide_pos_1_desc: "Position allongée sur le côté gauche, coussins de soutien sous le ventre et entre les genoux.",
        benefitsTitle: "🔹 Bienfaits",
        dlg1: "✔️ Améliore la circulation utéro-placentaire",
        dlg2: "✔️ Favorise l'oxygénation du fœtus",
        dlg3: "✔️ Diminue les œdèmes des membres inférieurs",
        dlg4: "✔️ Soulage les lombalgies",
        dlg5: "✔️ Favorise la relaxation",
        dlg_how: "💡 Comment : S'allonger côté gauche, coussin sous la tête, coussin entre les genoux, coussin sous le ventre si besoin.",
        slide_pos_2_title: "🌸 Position accroupie",
        slide_pos_2_desc: "La position accroupie consiste à fléchir les genoux en descendant le bassin vers le sol, dos droit.",
        squat1: "✔️ Renforce les muscles des jambes",
        squat2: "✔️ Assouplit le périnée",
        squat3: "✔️ Augmente la mobilité du bassin",
        squat4: "✔️ Améliore la circulation",
        squat5: "✔️ Prépare le bassin à l'accouchement",
        squat_how: "💡 Comment : Écarter légèrement les pieds, descendre doucement, garder le dos droit. S'aider d'une chaise ou d'un mur.",
        slide_pos_3_title: "🌿 Position à quatre pattes",
        slide_pos_3_desc: "Appui sur les mains et les genoux, dos droit, regard vers le sol.",
        qp1: "✔️ Soulage les lombalgies",
        qp2: "✔️ Diminue la pression sur le bassin",
        qp3: "✔️ Améliore la mobilité pelvienne",
        qp4: "✔️ Favorise la bonne position du bébé",
        qp5: "✔️ Réduit les douleurs sciatiques",
        qp_how: "💡 Comment : Se mettre à genoux sur un tapis, mains sous les épaules, genoux sous les hanches, dos neutre, respirer calmement.",
        slide_pos_4_title: "🌸 Posture de suspension",
        slide_pos_4_desc: "Debout, légère inclinaison vers l'avant, en se tenant à un support (mur, chaise, écharpe rebozo).",
        sus1: "✔️ Soulage les lombalgies",
        sus2: "✔️ Diminue la pression sur le bassin",
        sus3: "✔️ Détend le périnée",
        sus4: "✔️ Favorise la mobilité pelvienne",
        sus5: "✔️ Apporte une sensation de légèreté",
        sus_how: "💡 Comment : Pieds écartés à largeur du bassin, se pencher doucement, s'accrocher à un support solide, relâcher les épaules, respirer profondément.",

        // ─── ALTERNATIVES ───
        alternativesBadge: "Préparation du périnée",
        slide_alt_0_title: "✨ Avant de commencer…",
        slide_alt_0_body: "L'objectif de cette préparation n'est pas de remplacer un suivi médical, mais de vous aider à mieux comprendre votre corps pour accompagner la naissance de manière éclairée.",
        slide_alt_1_title: "🌿 C'est quoi le périnée ?",
        alt_perinee_intro: "Le périnée est un ensemble de muscles et de tissus fibreux situés entre la symphyse pubienne et le coccyx. Il soutient les organes pelviens : vessie, utérus et rectum.",
        alt_perinee_role_title: "Rôle pendant l'accouchement",
        alt_p1: "🔸 Se relâcher pour permettre le passage de la tête fœtale",
        alt_p2: "🔸 S'étirer progressivement sans se déchirer",
        alt_p3: "🔸 Un périnée souple réduit le risque de déchirure et améliore l'expulsion",
        alt_relax_title: "Éducation au relâchement périnéal",
        alt_relax_desc: "Pendant l'accouchement, un périnée capable de se détendre oppose moins de résistance à la tête du bébé, réduisant les risques de déchirures.",
        alt_r1: "💨 Respiration diaphragmatique : à l'inspiration, le périnée s'étire et se relâche naturellement",
        alt_r2: "🧘 Postures de détente : Yogi Squat, posture de l'enfant, papillon allongé",
        alt_r3: "🎯 Conscience corporelle : apprendre à différencier contraction et relâchement total",
        alt_r_tip: "💡 Pratiquez 2–5 minutes de respiration abdominale par jour dans un endroit calme.",
        slide_alt_2_title: "💆 Massage périnéal (à partir de 34 SA)",
        alt_massage_intro: "Une pratique régulière (3–4 fois/semaine) réduit statistiquement le risque de déchirures graves et le recours à l'épisiotomie.",
        alt_massage_guide_title: "Guide de pratique",
        alt_m1: "🧼 Lavez-vous soigneusement les mains",
        alt_m2: "🫒 Utilisez une huile végétale neutre (amande douce, olive bio)",
        alt_m3: "👍 Insérez le pouce sur 2–3 cm, pression vers le bas, mouvements en « U » pendant 5–10 min",
        alt_m4: "🔄 Massez doucement la zone entre vagin et anus avec de petits cercles",
        alt_massage_warning: "⚠️ Contre-indications : infection vaginale, menace d'accouchement prématuré, placenta prævia. Consultez votre sage-femme.",
        alt_massage_result: "✅ Effet démontré : Diminution des épisiotomies chez les primipares.",
        slide_alt_3_title: "🔬 Facteurs influençant le périnée",
        alt_f1_title: "👩 Facteurs maternels",
        alt_f1_1: "Qualité des tissus : âge, génétique, élasticité",
        alt_f1_2: "Primiparité : risque plus élevé au 1er accouchement",
        alt_f1_3: "Hydratation et vitamine C favorisent la souplesse",
        alt_f2_title: "👶 Facteurs fœtaux",
        alt_f2_1: "Poids > 4 kg augmente la tension sur les tissus",
        alt_f2_2: "Position postérieure demande plus d'espace",
        alt_f3_title: "🏥 Facteurs obstétricaux",
        alt_f3_1: "🌬️ Poussée en expiration freinée : beaucoup plus protectrice que la méthode Valsalva",
        alt_f3_2: "⏱️ Vitesse d'expulsion : ni trop rapide, ni trop longue",
        alt_f3_3: "🧘 Positions physiologiques (côté, à quatre pattes) meilleures que sur le dos",
        slide_alt_4_title: "🌿 Méthodes alternatives de préparation",
        alt_yoga_desc: "Libère les tensions du bassin et du sacrum. Les postures (chat-vache, squat) apprennent à étirer les muscles profonds. Doit être adapté à la grossesse.",
        alt_chant_desc: "Les sons graves font vibrer le bas du corps. Le diaphragme descend et provoque un micro-massage du plancher pelvien favorisant son relâchement profond. Apprendre à « chanter » la douleur plutôt que se crisper.",
        alt_sophr_desc: "Par la visualisation, imaginez le périnée comme une fleur qui s'ouvre. Réduit le cortisol, améliore la gestion de la douleur, diminue l'anxiété prénatale.",
        alt_trio_tip: "🔑 Le yoga prépare la structure · Le chant prépare l'ouverture · La sophrologie prépare le lâcher-prise",
        slide_alt_5_title: "🎯 Objectifs de la préparation périnéale",
        alt_obj1_title: "1. Prévention des traumatismes physiques",
        alt_obj1_1: "✔️ Réduction des déchirures périnéales graves",
        alt_obj1_2: "✔️ Limitation des épisiotomies en améliorant l'élasticité",
        alt_obj1_3: "✔️ Cicatrisation facilitée grâce à un muscle bien vascularisé",
        alt_obj2_title: "2. Maîtrise fonctionnelle",
        alt_obj2_1: "✔️ Prise de conscience : identifier et ressentir son périnée",
        alt_obj2_2: "✔️ Apprentissage du relâchement volontaire pendant la poussée",
        alt_obj2_3: "✔️ Coordination respiratoire pour optimiser les efforts",
        alt_obj3_title: "3. Santé à long terme",
        alt_obj3_1: "✔️ Prévention de l'incontinence urinaire",
        alt_obj3_2: "✔️ Soutien des organes (éviter les prolapsus)",
        alt_obj3_3: "✔️ Récupération post-natale accélérée",
    },

    /* ──────────────── ENGLISH ──────────────── */
    en: {
        dir: "ltr", lang: "en",
        pageTitle: "Pregnancy Guide",
        header: "💗 Pregnancy & Maternity Guide 💗",
        footer: "💗 All Rights Reserved — Pregnancy & Maternity Guide",
        footerDeveloped: "Development & Design by",
        navHome: "🏠",
        navBirth: "👶 Childbirth",
        navBreathing: "🌬️ Breathing",
        navPostures: "🤱 Postures",
        navAlternatives: "✨ Alternatives",
        sideSettings: "Settings",
        sideMode: "Display",
        sideDark: "🌙 Dark Mode",
        sideLightMode: "☀️ Light Mode",
        sideLang: "Language",
        sideAbout: "About",
        aboutText: "This guide was developed by a team of Tunisian healthcare professionals dedicated to the well-being of pregnant women.",
        sideContact: "Our Medical Team",
        sideCredit: "Credits",
        creditRole: "Development & Design",
        disclaimer: "⚠️ This guide is for informational purposes only. Always consult your doctor or midwife for personalized care.",
        cityTunis: "Tunis", citySousse: "Sousse", citySfax: "Sfax", cityMonastir: "Monastir",
        countryTunisia: "Tunisia",
        btnPrev: "◀ Previous", btnNext: "Next ▶",
        navBilan: "📋 Health Assessment",
        videoNotSupported: "Your browser does not support video.",

        msg_title_1: "Your body is made for childbirth",
        msg_body_1: "Childbirth is a natural process. A woman's body is prepared for it, producing hormones that help contractions and reduce pain.",
        msg_title_2: "Pain has a purpose",
        msg_body_2: "Pain during labor is normal. Each contraction helps the cervix open and the baby descend. Pain comes in waves, then decreases between contractions.",
        msg_title_3: "Breathing helps a lot",
        msg_body_3: "Breathing calmly and deeply reduces stress, helps manage pain, and improves oxygen for mother and baby.",
        msg_title_4: "Staying calm helps labor",
        msg_body_4: "Stress can slow contractions. A calm and reassuring environment helps the body work better. Feeling supported is very important.",
        msg_title_5: "Every childbirth is different",
        msg_body_5: "Every woman is unique. What matters is being informed, supported and confident.",
        msg_title_6: "Well-informed woman",
        msg_body_6: "A well-informed woman has less fear, feels stronger, and has a more positive experience.",

        welcomeBadge: "Official Guide",
        slide_accueil_0_title: "Welcome, Future Mom 💗",
        slide_accueil_0_sub: "Your pregnancy companion — from first trimester to childbirth",
        slide_accueil_0_body: "This comprehensive guide was designed by a team of Tunisian healthcare professionals to accompany you at every stage of your pregnancy.",
        slide_accueil_1_title: "🌸 Essential Messages",
        slide_accueil_2_title: "🌱 Your body during pregnancy",
        slide_accueil_2_body: "During pregnancy, your body undergoes an exceptional physiological transformation. Understanding these changes helps you better cope.",
        bodyPoint1: "🔸 1st trimester: Intense fatigue, nausea, hormonal adaptation",
        bodyPoint2: "🔸 2nd trimester: Return of energy, belly growth, first movements",
        bodyPoint3: "🔸 3rd trimester: Preparation for childbirth, weight and posture management",
        bodyPoint4: "🔸 Continuously: Hydrate, rest, consult your healthcare team regularly",
        slide_accueil_3_title: "🥗 Nutrition & Well-being",
        slide_accueil_3_body: "A balanced diet is the foundation of a healthy pregnancy. Prioritize foods rich in folic acid, iron, calcium and omega-3s.",
        nutri1: "🥦 Green vegetables, legumes and fresh fruit daily",
        nutri2: "🐟 Fatty fish (sardines, salmon) twice a week",
        nutri3: "🥛 Dairy products for calcium",
        nutri4: "💊 Iron and folic acid supplements on prescription",
        nutri5: "💧 At least 1.5 to 2 liters of water per day",
        slide_accueil_4_title: "💆‍♀️ Mental health & Emotional support",
        slide_accueil_4_body: "Your emotional well-being is just as important as your physical health. Pregnancy can bring doubts and fears — this is completely normal.",
        mental1: "💬 Talk about your emotions with loved ones or a professional",
        mental2: "🧘 Practice meditation and guided relaxation",
        mental3: "📖 Keep a pregnancy journal to express your feelings",
        mental4: "🤝 Join support groups for expectant mothers",
        mental5: "🌙 Give yourself moments of rest and pleasure every day",
        feat1: "🤰 Postures", feat2: "🌬️ Breathing", feat3: "👶 Childbirth", feat4: "✨ Alternatives",

        birthBadge: "Childbirth Preparation",
        slide_birth_0_title: "👶 Physiological Childbirth",
        slide_birth_0_body: "A physiological birth unfolds naturally, without systematic medical intervention. The woman's body can give birth through uterine contractions, the baby's progressive descent, and natural hormones (oxytocin, endorphins).",
        slide_birth_1_title: "🌊 The 4 Stages of Childbirth",
        slide_birth_1_intro: "Understanding each stage helps you prepare mentally and physically to live this moment with confidence.",
        b_phase1_title: "1️⃣ Latent phase (0–3 cm)",
        b_phase1_desc: "Irregular, mild contractions. The woman can still talk and walk. The cervix begins to change.",
        b_phase2_title: "2️⃣ Active labor (4–10 cm)",
        b_phase2_desc: "Regular, more intense and frequent contractions. The cervix dilates progressively and the baby descends.",
        b_phase3_title: "3️⃣ Expulsion",
        b_phase3_desc: "Urge to push. Baby's head engages. Pushes coordinated with breathing.",
        b_phase4_title: "4️⃣ Delivery of placenta",
        b_phase4_desc: "Expulsion of placenta within 30 minutes of birth. The body releases happiness hormones.",
        slide_birth_2_title: "🤝 Role of support during childbirth",
        slide_birth_2_body: "Having a trusted person by your side can transform your birth experience.",
        support1: "✓ Provide constant emotional and physical support",
        support2: "✓ Remind you of your breathing techniques",
        support3: "✓ Help you find the most comfortable positions",
        support4: "✓ Hydrate you and encourage you",
        support5: "✓ Communicate with the medical team on your behalf",
        slide_birth_3_title: "💪 Positions and mobility during labor",
        slide_birth_3_body: "Mobility and position changes promote labor progression and reduce pain.",
        position1: "🚶 Walk freely during contractions",
        position2: "🧘 Sway pelvis back and forth",
        position3: "🤰 Squatting: promotes pelvic opening",
        position4: "🌀 All fours: relieves back and orients baby",
        position5: "💨 Standing, supported: lightness and mobility",

        breathBadge: "Breath Management",
        slide_resp_0_title: "🌷 Welcome to your breathing space",
        slide_resp_0_body: "Take a moment for yourself… Breathing is your ally throughout pregnancy and on the day of birth. It helps you relax, calm your mind, and support your body with confidence. Breathe… your body knows what to do.",
        breath1: "💓 Oxygenation",
        breath2: "🧠 Reduces anxiety",
        breath3: "💪 Diaphragm",
        breath4: "😌 Relaxation",
        slide_resp_1_title: "🫁 Breathing techniques during pregnancy",
        resp_method1_tag: "1. Abdominal breathing",
        resp_method1_how: "Place a hand on your belly. Inhale slowly through the nose — belly rises. Exhale gently through the mouth — belly relaxes. Repeat 5–10 times.",
        resp_method1_ben: "✔ Improves oxygenation ✔ Promotes relaxation ✔ Reduces stress",
        resp_method2_tag: "2. Slow, deep breathing",
        resp_method2_how: "Inhale slowly through the nose. Exhale gently through the mouth. Keep a calm, regular rhythm for several minutes.",
        resp_method2_ben: "✔ Calms body and mind ✔ Improves circulation ✔ Promotes sleep",
        resp_method3_tag: "3. Cardiac coherence (5-5)",
        resp_method3_how: "Inhale for 5 seconds through nose. Exhale for 5 seconds through mouth. Continue for 5 minutes.",
        resp_method3_ben: "✔ Reduces stress and anxiety ✔ Emotional balance ✔ General relaxation",
        resp_method4_tag: "4. Straw breathing",
        resp_method4_how: "Inhale deeply. Exhale slowly as if blowing through a straw.",
        resp_method4_ben: "✔ Releases tension ✔ Prepares breathing for labor",
        slide_resp_2_title: "🌊 Breathing during active labor",
        slide_resp_2_intro: "During labor, your cervix dilates and contractions intensify. Breathing becomes your main tool to manage pain.",
        resp_act1_badge: "Latent phase 0–4 cm",
        resp_act1_tag: "Slow, deep breathing",
        resp_act1_desc: "Inhale deeply and calmly. Exhale gently. Keep a regular rhythm. ✔ Calms the body ✔ Reduces muscle tension",
        resp_act2_badge: "Active phase 4–10 cm",
        resp_act2_tag: "Rhythmic breathing (Lamaze)",
        resp_act2_desc: "Inhale gently through nose. Exhale through mouth in a long, controlled breath. Visualize your body relaxed. ✔ Reduces pain ✔ Helps manage contractions",
        resp_act3_badge: "Intense contraction",
        resp_act3_tag: "Panting (short breathing)",
        resp_act3_desc: "Breathe out quickly and gently. When midwife asks not to push. ✔ Delays pushing ✔ Protects cervix",
        slide_resp_3_title: "🌺 Breathing during expulsion",
        slide_resp_3_intro: "During this phase, breathing transforms your effort into a controlled and safe gesture for you and your baby.",
        resp_exp1_tag: "1. Spontaneous pushing (WHO recommended)",
        resp_exp1_desc: "Choose a comfortable position. Breathe normally. Push only when you feel the urge. Never hold your breath too long. ✔ Reduces fatigue ✔ Reduces tears ✔ More natural",
        resp_exp2_tag: "2. Directed expiratory push",
        resp_exp2_desc: "Inhale deeply, inflate belly then chest. Exhale slowly through mouth — 'F' or 'S' sound. Guided by midwife if needed. ✔ Helps baby descend ✔ Protects perineum",
        resp_exp_tip: "💡 Tip: Create a daily ritual — morning, lunch break, or evening before sleep. Choose a quiet place, never force.",

        posturesBadge: "Prenatal Physiotherapy",
        slide_pos_0_title: "🤱 Dear future mom",
        slide_pos_0_body: "Your body is experiencing an extraordinary transformation. With belly growth, your posture changes and tensions can appear in back, pelvis or legs.",
        slide_pos_0_body2: "These discomforts are common during pregnancy. With gentle, adapted postures, you can relieve these pains, relax, and prepare your body for childbirth.Here are some simple and effective postures to practice during pregnancy.",
        slide_pos_1_title: "🌿 Left Lateral Decubitus (LLD)",
        slide_pos_1_desc: "Lying on the left side, support pillows under belly and between knees.",
        benefitsTitle: "🔹 Benefits",
        dlg1: "✔️ Improves utero-placental circulation",
        dlg2: "✔️ Promotes fetal oxygenation",
        dlg3: "✔️ Reduces lower limb edema",
        dlg4: "✔️ Relieves lower back pain",
        dlg5: "✔️ Promotes relaxation",
        dlg_how: "💡 How to: Lie on left side, pillow under head, pillow between knees, pillow under belly if needed.",
        slide_pos_2_title: "🌸 Squatting position",
        slide_pos_2_desc: "Squat by bending knees and lowering hips toward the floor, keeping back straight.",
        squat1: "✔️ Strengthens leg muscles",
        squat2: "✔️ Softens the perineum",
        squat3: "✔️ Increases pelvic mobility",
        squat4: "✔️ Improves circulation",
        squat5: "✔️ Prepares pelvis for childbirth",
        squat_how: "💡 How to: Feet slightly apart, lower slowly, keep back straight. Use a chair or wall for support.",
        slide_pos_3_title: "🌿 All-fours position",
        slide_pos_3_desc: "Support on hands and knees, straight back, gaze toward floor.",
        qp1: "✔️ Relieves lower back pain",
        qp2: "✔️ Reduces pelvic pressure",
        qp3: "✔️ Improves pelvic mobility",
        qp4: "✔️ Promotes good baby position",
        qp5: "✔️ Reduces sciatic pain",
        qp_how: "💡 How to: Kneel on a mat, hands under shoulders, knees under hips, neutral back, breathe calmly.",
        slide_pos_4_title: "🌸 Suspension posture",
        slide_pos_4_desc: "Standing, slight forward lean, holding a support (wall, chair, rebozo scarf).",
        sus1: "✔️ Relieves lower back pain",
        sus2: "✔️ Reduces pelvic pressure",
        sus3: "✔️ Relaxes the perineum",
        sus4: "✔️ Promotes pelvic mobility",
        sus5: "✔️ Brings a sense of lightness",
        sus_how: "💡 How to: Feet hip-width apart, lean forward gently, hold a stable support, relax shoulders, breathe deeply.",

        alternativesBadge: "Perineal Preparation",
        slide_alt_0_title: "✨ Before we begin…",
        slide_alt_0_body: "The goal of this preparation is not to replace medical care, but to help you better understand your body to accompany birth in an informed way.",
        slide_alt_1_title: "🌿 What is the perineum?",
        alt_perinee_intro: "The perineum is a set of muscles and fibrous tissues located between the pubic symphysis and the coccyx. It supports the pelvic organs: bladder, uterus and rectum.",
        alt_perinee_role_title: "Role during childbirth",
        alt_p1: "🔸 Relax to allow the baby's head to pass",
        alt_p2: "🔸 Stretch progressively without tearing",
        alt_p3: "🔸 A supple perineum reduces tearing risk and improves expulsion",
        alt_relax_title: "Perineal relaxation education",
        alt_relax_desc: "During birth, a perineum that can relax offers less resistance to the baby's head, reducing tearing risk.",
        alt_r1: "💨 Diaphragmatic breathing: on inhale, perineum stretches and relaxes naturally",
        alt_r2: "🧘 Relaxation postures: Yogi Squat, child's pose, lying butterfly",
        alt_r3: "🎯 Body awareness: learning to differentiate contraction from full relaxation",
        alt_r_tip: "💡 Practice 2–5 minutes of abdominal breathing daily in a quiet place.",
        slide_alt_2_title: "💆 Perineal massage (from 34 weeks)",
        alt_massage_intro: "Regular practice (3–4 times/week) statistically reduces severe tearing and episiotomy rates.",
        alt_massage_guide_title: "Practice guide",
        alt_m1: "🧼 Wash hands thoroughly",
        alt_m2: "🫒 Use a neutral vegetable oil (sweet almond, organic olive)",
        alt_m3: "👍 Insert thumb 2–3 cm, press downward, U-shaped movements for 5–10 min",
        alt_m4: "🔄 Gently massage the area between vagina and anus with small circles",
        alt_massage_warning: "⚠️ Contraindications: vaginal infection, preterm labor risk, placenta previa. Consult your midwife.",
        alt_massage_result: "✅ Proven effect: Reduction of episiotomies in first-time mothers.",
        slide_alt_3_title: "🔬 Factors influencing perineal integrity",
        alt_f1_title: "👩 Maternal factors",
        alt_f1_1: "Tissue quality: age, genetics, elasticity",
        alt_f1_2: "Primiparity: higher risk at first birth",
        alt_f1_3: "Hydration and vitamin C promote suppleness",
        alt_f2_title: "👶 Fetal factors",
        alt_f2_1: "Weight > 4 kg increases tissue tension",
        alt_f2_2: "Posterior position requires more space",
        alt_f3_title: "🏥 Obstetric factors",
        alt_f3_1: "🌬️ Exhale-braked pushing: much more protective than Valsalva method",
        alt_f3_2: "⏱️ Expulsion speed: neither too fast nor too long",
        alt_f3_3: "🧘 Physiological positions (side, all fours) better than on back",
        slide_alt_4_title: "🌿 Alternative preparation methods",
        alt_yoga_desc: "Releases tensions in pelvis and sacrum. Postures (cat-cow, squat) teach deep muscle stretching. Must be adapted to pregnancy.",
        alt_chant_desc: "Low sounds vibrate the lower body. The diaphragm descends, providing a micro-massage of the pelvic floor promoting deep relaxation. Learn to 'sing' the pain rather than tense up.",
        alt_sophr_desc: "Through visualization, imagine the perineum like a flower opening. Reduces cortisol, improves pain management, decreases prenatal anxiety.",
        alt_trio_tip: "🔑 Yoga prepares structure · Singing prepares opening · Sophrology prepares letting go",
        slide_alt_5_title: "🎯 Goals of perineal preparation",
        alt_obj1_title: "1. Prevention of physical trauma",
        alt_obj1_1: "✔️ Reduction of severe perineal tears",
        alt_obj1_2: "✔️ Limiting episiotomies by improving elasticity",
        alt_obj1_3: "✔️ Easier healing thanks to a well-vascularized muscle",
        alt_obj2_title: "2. Functional mastery",
        alt_obj2_1: "✔️ Awareness: identify and feel your perineum",
        alt_obj2_2: "✔️ Learning voluntary relaxation during pushing",
        alt_obj2_3: "✔️ Respiratory coordination to optimize efforts",
        alt_obj3_title: "3. Long-term health",
        alt_obj3_1: "✔️ Prevention of urinary incontinence",
        alt_obj3_2: "✔️ Organ support (prevent prolapse)",
        alt_obj3_3: "✔️ Accelerated postnatal recovery",
    },

    /* ──────────────── ARABIC ──────────────── */
    ar: {
        dir: "rtl", lang: "ar",
        pageTitle: "دليل المرأة الحامل",
        header: "💗 دليل المرأة الحامل 💗",
        footer: "💗 جميع الحقوق محفوظة — دليل المرأة الحامل",
        footerDeveloped: "التطوير والتصميم بواسطة",
        navHome: "🏠",
        navBirth: "👶 الولادة",
        navBreathing: "🌬️ التنفس",
        navPostures: "🤱 الأوضاع",
        navAlternatives: "✨ بدائل",
        sideSettings: "الإعدادات",
        sideMode: "العرض",
        sideDark: "🌙 الوضع المظلم",
        sideLightMode: "☀️ الوضع الفاتح",
        sideLang: "اللغة",
        sideAbout: "حول",
        aboutText: "تم تطوير هذا الدليل من قبل فريق من محترفي الرعاية الصحية التونسيين المكرسين لرفاهية المرأة الحامل.",
        sideContact: "فريقنا الطبي",
        sideCredit: "الأرصدة",
        creditRole: "التطوير والتصميم",
        disclaimer: "⚠️ هذا الدليل لأغراض إعلامية فقط. استشيري دائماً طبيبك أو قابلتك للحصول على رعاية مخصصة.",
        cityTunis: "تونس", citySousse: "سوسة", citySfax: "صفاقس", cityMonastir: "المنستير",
        countryTunisia: "تونس",
        btnPrev: "◀ السابق", btnNext: "التالي ▶",
        navBilan: "📋 تقييم الصحة",
        videoNotSupported: "متصفحك لا يدعم الفيديو.",

        msg_title_1: "جسدك مصنوع للولادة",
        msg_body_1: "الولادة عملية طبيعية. جسد المرأة مستعد لها، ينتج هرمونات تساعد الانقباضات وتقلل الألم.",
        msg_title_2: "الألم له دور",
        msg_body_2: "الألم أثناء المخاض طبيعي. كل انقباضة تساعد عنق الرحم على الفتح والطفل على النزول.",
        msg_title_3: "التنفس يساعد كثيراً",
        msg_body_3: "التنفس الهادئ والعميق يقلل التوتر، يساعد على تحمل الألم، ويحسن الأكسجين للأم والطفل.",
        msg_title_4: "البقاء هادئة يساعد المخاض",
        msg_body_4: "التوتر يمكن أن يبطئ الانقباضات. بيئة هادئة وطمأنينة تساعد الجسد على العمل بشكل أفضل.",
        msg_title_5: "كل ولادة مختلفة",
        msg_body_5: "كل امرأة فريدة. ما يهم هو أن تكوني مطلعة ومدعومة وواثقة.",
        msg_title_6: "امرأة مطلعة جيداً",
        msg_body_6: "امرأة مطلعة جيداً لديها خوف أقل، تشعر بقوة أكبر، وتعيش تجربة أكثر إيجابية.",

        welcomeBadge: "دليل رسمي",
        slide_accueil_0_title: "أهلاً وسهلاً، أم المستقبل 💗",
        slide_accueil_0_sub: "رفيقتك في الحمل — من الثلث الأول إلى الولادة",
        slide_accueil_0_body: "تم تصميم هذا الدليل الشامل من قبل فريق من محترفي الرعاية الصحية التونسيين ليصحبك في كل مرحلة من حملك.",
        slide_accueil_1_title: "🌸 الرسائل الأساسية",
        slide_accueil_2_title: "🌱 جسدك أثناء الحمل",
        slide_accueil_2_body: "أثناء الحمل، يخضع جسدك لتحول فسيولوجي استثنائي. فهم هذه التغييرات يساعدك على التعامل معها بشكل أفضل.",
        bodyPoint1: "🔸 الثلث الأول: إرهاق شديد، غثيان، تكيف هرموني",
        bodyPoint2: "🔸 الثلث الثاني: عودة الطاقة، نمو البطن، الحركات الأولى",
        bodyPoint3: "🔸 الثلث الثالث: التحضير للولادة، إدارة الوزن والوضعية",
        bodyPoint4: "🔸 باستمرار: ابقي مرطبة، استريحي، استشيري فريق الرعاية الصحية بانتظام",
        slide_accueil_3_title: "🥗 التغذية والرفاهية",
        slide_accueil_3_body: "النظام الغذائي المتوازن هو أساس الحمل الصحي. ركزي على الأطعمة الغنية بحمض الفوليك والحديد والكالسيوم وأوميغا 3.",
        nutri1: "🥦 الخضار الخضراء والبقوليات والفواكه الطازجة يومياً",
        nutri2: "🐟 الأسماك الدهنية (السردين والسلمون) مرتين في الأسبوع",
        nutri3: "🥛 منتجات الألبان للكالسيوم",
        nutri4: "💊 مكملات الحديد وحمض الفوليك بوصفة طبية",
        nutri5: "💧 ما لا يقل عن 1.5 إلى 2 لتر من الماء يومياً",
        slide_accueil_4_title: "💆‍♀️ الصحة العقلية والدعم العاطفي",
        slide_accueil_4_body: "رفاهيتك العاطفية مهمة مثل صحتك الجسدية. قد يصحب الحمل الشكوك والمخاوف — هذا طبيعي تماماً.",
        mental1: "💬 تحدثي عن مشاعرك مع أحبائك أو محترف",
        mental2: "🧘 مارسي التأمل والاسترخاء الموجه",
        mental3: "📖 احتفظي بدفتر يوميات الحمل للتعبير عن مشاعرك",
        mental4: "🤝 انضمي لمجموعات دعم الأمهات المتوقعات",
        mental5: "🌙 امنحي نفسك لحظات راحة ولذة كل يوم",
        feat1: "🤰 الأوضاع", feat2: "🌬️ التنفس", feat3: "👶 الولادة", feat4: "✨ بدائل",

        birthBadge: "التحضير للولادة",
        slide_birth_0_title: "👶 الولادة الفسيولوجية",
        slide_birth_0_body: "تجري الولادة الفسيولوجية بشكل طبيعي دون تدخل طبي منهجي. جسد المرأة قادر على الولادة بفضل الانقباضات الرحمية ونزول الطفل التدريجي والهرمونات الطبيعية.",
        slide_birth_1_title: "🌊 المراحل الأربع للولادة",
        slide_birth_1_intro: "فهم كل مرحلة يساعدك على التحضير عقلياً وجسدياً لعيش هذه اللحظة بثقة.",
        b_phase1_title: "1️⃣ مرحلة الكمون (0–3 سم)",
        b_phase1_desc: "انقباضات خفيفة وغير منتظمة. لا تزال المرأة تستطيع الكلام والمشي. يبدأ عنق الرحم بالتغيير.",
        b_phase2_title: "2️⃣ المرحلة النشطة (4–10 سم)",
        b_phase2_desc: "انقباضات منتظمة وأكثر شدة وتواتراً. يتوسع عنق الرحم تدريجياً وينزل الطفل.",
        b_phase3_title: "3️⃣ الطرد",
        b_phase3_desc: "الرغبة في الدفع. ينخرط رأس الطفل. دفعات منسقة مع التنفس.",
        b_phase4_title: "4️⃣ المشيمة",
        b_phase4_desc: "طرد المشيمة في غضون 30 دقيقة من الولادة. يطلق الجسم هرمونات السعادة.",
        slide_birth_2_title: "🤝 دور الدعم أثناء الولادة",
        slide_birth_2_body: "وجود شخص موثوق به بجانبك يمكن أن يحول تجربة ولادتك.",
        support1: "✓ توفير دعم عاطفي وجسدي مستمر",
        support2: "✓ تذكيرك بتقنيات التنفس",
        support3: "✓ مساعدتك في إيجاد أكثر الأوضاع راحة",
        support4: "✓ ترطيبك وتشجيعك",
        support5: "✓ التواصل مع الفريق الطبي نيابة عنك",
        slide_birth_3_title: "💪 الأوضاع والحركة أثناء المخاض",
        slide_birth_3_body: "الحركة وتغيير الوضعية يعززان تقدم المخاض ويقللان الألم.",
        position1: "🚶 امشي بحرية أثناء الانقباضات",
        position2: "🧘 أرجحي الحوض للأمام والخلف",
        position3: "🤰 القرفصاء: يعزز فتح الحوض",
        position4: "🌀 على أربع: يخفف آلام الظهر ويوجه الطفل",
        position5: "💨 واقفة مدعومة: خفة وحركة",

        breathBadge: "إدارة التنفس",
        slide_resp_0_title: "🌷 أهلاً بك في فضاء التنفس",
        slide_resp_0_body: "خذي لحظة لنفسك... التنفس هو حليفتك طوال فترة الحمل ويوم الولادة. يساعدك على الاسترخاء وتهدئة عقلك ومرافقة جسدك بثقة. تنفسي... جسدك يعرف ما يفعله.",
        breath1: "💓 الأكسجين",
        breath2: "🧠 يقلل القلق",
        breath3: "💪 الحجاب الحاجز",
        breath4: "😌 الاسترخاء",
        slide_resp_1_title: "🫁 تقنيات التنفس أثناء الحمل",
        resp_method1_tag: "1. التنفس البطني",
        resp_method1_how: "ضعي يداً على بطنك. استنشقي ببطء من الأنف — البطن ترتفع. أخرجي النفس بلطف من الفم — البطن تسترخي. كرري 5–10 مرات.",
        resp_method1_ben: "✔ يحسن الأكسجين ✔ يعزز الاسترخاء ✔ يقلل التوتر",
        resp_method2_tag: "2. التنفس البطيء والعميق",
        resp_method2_how: "استنشقي ببطء من الأنف. أخرجي النفس بلطف من الفم. حافظي على إيقاع هادئ ومنتظم لعدة دقائق.",
        resp_method2_ben: "✔ يهدئ الجسم والعقل ✔ يحسن الدورة الدموية ✔ يعزز النوم",
        resp_method3_tag: "3. التماسك القلبي (5-5)",
        resp_method3_how: "استنشقي 5 ثوان من الأنف. أخرجي النفس 5 ثوان من الفم. استمري 5 دقائق.",
        resp_method3_ben: "✔ يقلل التوتر والقلق ✔ التوازن العاطفي ✔ الاسترخاء العام",
        resp_method4_tag: "4. التنفس عبر القشة",
        resp_method4_how: "استنشقي بعمق. أخرجي النفس ببطء كأنك تنفخين عبر قشة.",
        resp_method4_ben: "✔ يحرر التوترات ✔ يحضر تنفس المخاض",
        slide_resp_2_title: "🌊 التنفس أثناء المرحلة النشطة",
        slide_resp_2_intro: "أثناء المخاض، يتوسع عنق الرحم وتشتد الانقباضات. يصبح التنفس أداتك الرئيسية لإدارة الألم.",
        resp_act1_badge: "المرحلة الكامنة 0–4 سم",
        resp_act1_tag: "تنفس بطيء وعميق",
        resp_act1_desc: "استنشقي بعمق وهدوء. أخرجي النفس بلطف. حافظي على إيقاع منتظم. ✔ يهدئ الجسم ✔ يقلل توتر العضلات",
        resp_act2_badge: "المرحلة النشطة 4–10 سم",
        resp_act2_tag: "التنفس الإيقاعي (لاماز)",
        resp_act2_desc: "استنشقي بلطف من الأنف. أخرجي النفس من الفم بزفير طويل ومتحكم به. تخيلي جسدك مسترخياً. ✔ يقلل الألم ✔ يساعد على إدارة الانقباضات",
        resp_act3_badge: "انقباضة شديدة",
        resp_act3_tag: "التنفس القصير (panting)",
        resp_act3_desc: "انفخي بسرعة ولطف. عندما تطلب القابلة عدم الدفع. ✔ يؤخر الدفع ✔ يحمي عنق الرحم",
        slide_resp_3_title: "🌺 التنفس أثناء الطرد",
        slide_resp_3_intro: "في هذه المرحلة، يحول التنفس جهدك إلى حركة محكومة وآمنة لك ولطفلك.",
        resp_exp1_tag: "1. الدفع التلقائي (توصية منظمة الصحة العالمية)",
        resp_exp1_desc: "اختاري وضعاً مريحاً. تنفسي بشكل طبيعي. ادفعي فقط عندما تشعرين بالرغبة. لا تحبسي نفسك طويلاً. ✔ يقلل الإرهاق ✔ يقلل التمزق ✔ أكثر طبيعية",
        resp_exp2_tag: "2. الدفع الزفيري الموجه",
        resp_exp2_desc: "استنشقي بعمق، انفخي البطن ثم الصدر. أخرجي النفس ببطء من الفم — صوت 'F' أو 'S'. موجه من القابلة إذا لزم. ✔ يساعد الطفل على النزول ✔ يحمي العجان",
        resp_exp_tip: "💡 نصيحة: أنشئي طقساً يومياً — صباحاً أو مساءً. اختاري مكاناً هادئاً، لا تفرضي على نفسك أبداً.",

        posturesBadge: "العلاج الطبيعي قبل الولادة",
        slide_pos_0_title: "🤱 أيتها الأم المستقبلية",
        slide_pos_0_body: "جسدك يمر بتحول استثنائي. مع نمو البطن، تتغير وضعيتك وقد تظهر التوترات في الظهر والحوض أو الساقين.",
        slide_pos_0_body2:" تُعدّ هذه الآلام شائعة خلال فترة الحمل. من خلال وضعيات لطيفة ومُلائمة، يُمكنكِ تخفيف هذه الآلام والاسترخاء وتهيئتكِ للولادة.إليكِ بعض الوضعيات البسيطة والفعّالة التي يُمكنكِ ممارستها خلال فترة الحمل.",
        slide_pos_1_title: "🌿 الاستلقاء الجانبي الأيسر",
        slide_pos_1_desc: "الاستلقاء على الجانب الأيسر، وسائد دعم تحت البطن وبين الركبتين.",
        benefitsTitle: "🔹 الفوائد",
        dlg1: "✔️ تحسين الدورة الدموية الرحمية المشيمية",
        dlg2: "✔️ تعزيز أكسدة الجنين",
        dlg3: "✔️ تقليل وذمة الأطراف السفلية",
        dlg4: "✔️ تخفيف آلام الظهر",
        dlg5: "✔️ تعزيز الاسترخاء",
        dlg_how: "💡 كيفية: الاستلقاء على الجانب الأيسر، وسادة تحت الرأس، وسادة بين الركبتين، وسادة تحت البطن إذا لزم.",
        slide_pos_2_title: "🌸 وضعية القرفصاء",
        slide_pos_2_desc: "القرفصاء عن طريق ثني الركبتين وخفض الحوض نحو الأرض، مع إبقاء الظهر مستقيماً.",
        squat1: "✔️ تقوية عضلات الساقين",
        squat2: "✔️ تليين العجان",
        squat3: "✔️ زيادة حركة الحوض",
        squat4: "✔️ تحسين الدورة الدموية",
        squat5: "✔️ تحضير الحوض للولادة",
        squat_how: "💡 كيفية: أبعدي قليلاً قدميك، انزلي ببطء، أبقي الظهر مستقيماً. استعيني بكرسي أو جدار للدعم.",
        slide_pos_3_title: "🌿 وضعية على أربع",
        slide_pos_3_desc: "الاتكاء على اليدين والركبتين، ظهر مستقيم، النظر نحو الأرض.",
        qp1: "✔️ تخفيف آلام الظهر",
        qp2: "✔️ تقليل الضغط على الحوض",
        qp3: "✔️ تحسين حركة الحوض",
        qp4: "✔️ تعزيز وضع الطفل الصحيح",
        qp5: "✔️ تقليل ألم العصب الوركي",
        qp_how: "💡 كيفية: الجلوس على الركبتين على حصيرة، اليدان تحت الكتفين، الركبتان تحت الحوض، ظهر محايد، تنفسي بهدوء.",
        slide_pos_4_title: "🌸 وضعية التعليق",
        slide_pos_4_desc: "واقفة، انحناء طفيف للأمام، مع التمسك بدعم (جدار، كرسي، وشاح رابوزو).",
        sus1: "✔️ تخفيف آلام الظهر",
        sus2: "✔️ تقليل الضغط على الحوض",
        sus3: "✔️ ارتخاء العجان",
        sus4: "✔️ تعزيز حركة الحوض",
        sus5: "✔️ إعطاء إحساس بالخفة",
        sus_how: "💡 كيفية: أبعدي قدميك بعرض الحوض، انحني ببطء للأمام، تمسكي بدعم ثابت، أرخي الكتفين، تنفسي بعمق.",

        alternativesBadge: "تحضير العجان",
        slide_alt_0_title: "✨ قبل أن نبدأ...",
        slide_alt_0_body: "هدف هذا التحضير ليس استبدال الرعاية الطبية، بل مساعدتك على فهم جسدك بشكل أفضل لمرافقة الولادة بطريقة مستنيرة.",
        slide_alt_1_title: "🌿 ما هو العجان؟",
        alt_perinee_intro: "العجان مجموعة من العضلات والأنسجة الليفية بين ارتفاق العانة والعصعص. يدعم أعضاء الحوض: المثانة والرحم والمستقيم.",
        alt_perinee_role_title: "الدور أثناء الولادة",
        alt_p1: "🔸 الاسترخاء للسماح بمرور رأس الجنين",
        alt_p2: "🔸 التمدد التدريجي دون تمزق",
        alt_p3: "🔸 العجان المرن يقلل خطر التمزق ويحسن الطرد",
        alt_relax_title: "تعليم ارتخاء العجان",
        alt_relax_desc: "أثناء الولادة، العجان القادر على الاسترخاء يقدم مقاومة أقل لرأس الطفل، مما يقلل خطر التمزق.",
        alt_r1: "💨 التنفس الحجابي: عند الشهيق، يتمدد العجان ويسترخي بشكل طبيعي",
        alt_r2: "🧘 أوضاع الاسترخاء: يوغي سكوات، وضعية الطفل، الفراشة المستلقية",
        alt_r3: "🎯 الوعي الجسدي: تعلم التمييز بين التقلص والاسترخاء التام",
        alt_r_tip: "💡 مارسي 2–5 دقائق من التنفس البطني يومياً في مكان هادئ.",
        slide_alt_2_title: "💆 تدليك العجان (من الأسبوع 34)",
        alt_massage_intro: "الممارسة المنتظمة (3–4 مرات/أسبوع) تقلل إحصائياً خطر التمزق الشديد والاستئصال الفرجي.",
        alt_massage_guide_title: "دليل الممارسة",
        alt_m1: "🧼 اغسلي يديك جيداً",
        alt_m2: "🫒 استخدمي زيتاً نباتياً محايداً (لوز حلو، زيتون عضوي)",
        alt_m3: "👍 أدخلي الإبهام 2–3 سم، اضغطي نحو الأسفل، حركات على شكل 'U' لمدة 5–10 دقائق",
        alt_m4: "🔄 دلكي بلطف المنطقة بين المهبل والشرج بدوائر صغيرة",
        alt_massage_warning: "⚠️ موانع: عدوى مهبلية، خطر الولادة المبكرة، المشيمة المنزاحة. استشيري قابلتك.",
        alt_massage_result: "✅ تأثير مثبت: تقليل الاستئصال الفرجي عند الأمهات لأول مرة.",
        slide_alt_3_title: "🔬 العوامل المؤثرة على سلامة العجان",
        alt_f1_title: "👩 العوامل الأمومية",
        alt_f1_1: "جودة الأنسجة: العمر والجينات والمرونة",
        alt_f1_2: "الولادة الأولى: خطر أعلى عند الولادة الأولى",
        alt_f1_3: "الترطيب وفيتامين C يعززان المرونة",
        alt_f2_title: "👶 العوامل الجنينية",
        alt_f2_1: "وزن > 4 كغ يزيد التوتر على الأنسجة",
        alt_f2_2: "الوضع الخلفي يتطلب مساحة أكبر",
        alt_f3_title: "🏥 العوامل التوليدية",
        alt_f3_1: "🌬️ الدفع بالزفير المكبوح: أكثر حماية من طريقة فالسالفا",
        alt_f3_2: "⏱️ سرعة الطرد: لا سريعة جداً ولا طويلة جداً",
        alt_f3_3: "🧘 الأوضاع الفسيولوجية (الجانب، على أربع) أفضل من الاستلقاء على الظهر",
        slide_alt_4_title: "🌿 طرق التحضير البديلة",
        alt_yoga_desc: "يحرر توترات الحوض والعجز. الأوضاع (القطة-البقرة، القرفصاء) تعلم تمديد العضلات العميقة. يجب تكييفه مع الحمل.",
        alt_chant_desc: "الأصوات المنخفضة تجعل الجزء السفلي من الجسم يهتز. يتحرك الحجاب الحاجز للأسفل محدثاً تدليكاً دقيقاً لقاع الحوض. تعلمي 'غناء' الألم بدلاً من التصلب.",
        alt_sophr_desc: "من خلال التخيل، تخيلي العجان كزهرة تتفتح. يقلل الكورتيزول، يحسن إدارة الألم، يقلل القلق قبل الولادة.",
        alt_trio_tip: "🔑 اليوغا تحضر البنية · الغناء يحضر الانفتاح · السوفرولوجيا تحضر التخلي",
        slide_alt_5_title: "🎯 أهداف تحضير العجان",
        alt_obj1_title: "1. الوقاية من الصدمات الجسدية",
        alt_obj1_1: "✔️ تقليل التمزقات العجانية الشديدة",
        alt_obj1_2: "✔️ الحد من الاستئصال الفرجي بتحسين المرونة",
        alt_obj1_3: "✔️ تسهيل التعافي بفضل عضلة جيدة التوعية",
        alt_obj2_title: "2. التحكم الوظيفي",
        alt_obj2_1: "✔️ الوعي: تحديد العجان والإحساس به",
        alt_obj2_2: "✔️ تعلم الاسترخاء الإرادي أثناء الدفع",
        alt_obj2_3: "✔️ التنسيق التنفسي لتحسين الجهود",
        alt_obj3_title: "3. الصحة طويلة الأمد",
        alt_obj3_1: "✔️ الوقاية من سلس البول",
        alt_obj3_2: "✔️ دعم الأعضاء (منع الهبوط)",
        alt_obj3_3: "✔️ تسريع التعافي بعد الولادة",
    }
};

/* ================================================================
   LANGUAGE SWITCHING
   ================================================================ */
function changeLang(lang) {
    localStorage.setItem("lang", lang);
    const root = document.documentElement;
    const t = translations[lang];
    root.setAttribute("dir", t.dir);
    root.lang = t.lang;

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (t[key] !== undefined) el.textContent = t[key];
    });

    document.querySelectorAll("[data-i18n-ph]").forEach(el => {
        const key = el.getAttribute("data-i18n-ph");
        if (t[key] !== undefined) el.placeholder = t[key];
    });

    updateDarkBtn(document.body.classList.contains("dark"));
}

window.addEventListener("load", () => {
    const savedLang = localStorage.getItem("lang") || "fr";
    const sel = document.getElementById("langSelect");
    if (sel) sel.value = savedLang;
    changeLang(savedLang);
});
