/* ================================================================
   NAV LINKS
   ================================================================ */
const navItems = document.querySelectorAll("nav li");
const sliderSections = document.querySelectorAll(".slider-section");

navItems.forEach(item => {
    item.addEventListener("click", () => {
        const id = item.dataset.section;
        sliderSections.forEach(s => s.classList.remove("active"));
        navItems.forEach(n => n.classList.remove("active"));
        const target = document.getElementById(id);
        if (target) target.classList.add("active");
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
        slides.forEach(s => s.classList.remove("active"));
        if (slides[i]) slides[i].classList.add("active");
        if (counterEl) counterEl.textContent = `${i + 1} / ${slides.length}`;
    }

    if (nextBtn) nextBtn.addEventListener("click", () => { index = (index + 1) % slides.length; showSlide(index); });
    if (prevBtn) prevBtn.addEventListener("click", () => { index = (index - 1 + slides.length) % slides.length; showSlide(index); });

    // Touch swipe
    const sliderEl = section.querySelector(".slider");
    if (sliderEl) {
        let tx = 0, ty = 0;
        sliderEl.addEventListener("touchstart", e => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
        sliderEl.addEventListener("touchend", e => {
            const dx = e.changedTouches[0].clientX - tx;
            const dy = e.changedTouches[0].clientY - ty;
            if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 42) {
                index = dx < 0 ? (index + 1) % slides.length : (index - 1 + slides.length) % slides.length;
                showSlide(index);
            }
        }, { passive: true });

        sliderEl.setAttribute("tabindex", "0");
        sliderEl.addEventListener("keydown", e => {
            if (e.key === "ArrowRight") { index = (index + 1) % slides.length; showSlide(index); }
            if (e.key === "ArrowLeft") { index = (index - 1 + slides.length) % slides.length; showSlide(index); }
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
   TRANSLATIONS — Full FR / EN / AR
   ================================================================ */
const translations = {

    /* ──────────────── FRANÇAIS ──────────────── */
    fr: {
        dir: "ltr", lang: "fr",
        pageTitle: "Guide de la Femme Enceinte",
        header: "💗 Guide de la Femme Enceinte 💗",
        footer: "💗 Tous droits réservés — Guide de la Femme Enceinte",
        navHome: "🏠 Accueil",
        navWork: "💪 Travail",
        navBreathing: "🌬️ Respiration",
        navPostures: "🤱 Postures",
        sideSettings: "Paramètres",
        sideMode: "Affichage",
        sideDark: "🌙 Mode sombre",
        sideLightMode: "☀️ Mode clair",
        sideLang: "Langue",
        sideAbout: "À propos",
        aboutText: "Ce guide a été développé par une équipe de professionnelles de santé tunisiennes dédiées au bien-être de la femme enceinte.",
        sideContact: "Notre équipe",
        disclaimer: "⚠️ Ce guide est à titre informatif. Consultez toujours votre médecin ou sage-femme pour un suivi personnalisé.",
        cityTunis: "Tunis", citySousse: "Sousse", citySfax: "Sfax", cityMonastir: "Monastir",
        countryTunisia: "Tunisie",
        btnPrev: "◀ Précédent", btnNext: "Suivant ▶",
        cardTitle: "💗 Octobre Rose",
        cardContent: "Sensibilisation au dépistage du cancer du sein — parce que chaque femme mérite d'être protégée.",
        welcomeBadge: "Guide Officiel",
        posturesBadge: "Kinésithérapie prénatale",
        benefitsTitle: "🔹 Bienfaits",
        // Welcome features
        feat1: "🤰 Postures", feat2: "🌬️ Respiration", feat3: "💪 Exercices", feat4: "💡 Conseils",
        // Info card descriptions
        infoCardHome: "Introduction & bien-être général",
        infoCardWork: "Exercices doux & gestion de l'énergie",
        infoCardBreath: "Techniques de détente & préparation",
        infoCardPost: "Soulager le dos & préparer l'accouchement",
        // Accueil slides
        slide_accueil_0_title: "Bienvenue, Future Maman 💗",
        slide_accueil_0_sub: "Votre compagnon de grossesse — du premier trimestre jusqu'à l'accouchement",
        slide_accueil_0_body: "Ce guide complet a été conçu par une équipe de professionnelles de santé tunisiennes pour vous accompagner à chaque étape de votre grossesse. Vous y trouverez des conseils pratiques sur la nutrition, les postures adaptées, les techniques de respiration et les exercices doux.",
        slide_accueil_1_title: "📖 Comment utiliser ce guide ?",
        slide_accueil_1_body: "Ce guide est organisé en quatre sections accessibles depuis le menu de navigation. Chaque section propose des fiches pratiques illustrées avec des informations médicales vérifiées.",
        slide_accueil_2_title: "🌱 Votre corps pendant la grossesse",
        slide_accueil_2_body: "Pendant la grossesse, votre corps vit une transformation physiologique exceptionnelle. Comprendre ces changements vous permet de mieux les appréhender et d'adopter les bons réflexes.",
        bodyPoint1: "🔸 1er trimestre : Fatigue intense, nausées, adaptation hormonale",
        bodyPoint2: "🔸 2e trimestre : Retour d'énergie, croissance du ventre, premiers mouvements",
        bodyPoint3: "🔸 3e trimestre : Préparation à l'accouchement, gestion du poids et de la posture",
        bodyPoint4: "🔸 En continu : Hydrater, se reposer, consulter votre équipe soignante régulièrement",
        slide_accueil_3_title: "🥗 Nutrition & Bien-être",
        slide_accueil_3_body: "Une alimentation équilibrée est le pilier d'une grossesse saine. Privilégiez des apports riches en acide folique, fer, calcium et oméga-3, essentiels au développement de votre bébé.",
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
        // Travail slides
        slide_travail_0_title: "💪 Rester active pendant la grossesse",
        slide_travail_0_body: "L'activité physique modérée est recommandée tout au long d'une grossesse sans complications. Elle améliore la circulation sanguine, réduit les douleurs dorsales et prépare votre corps à l'accouchement.",
        work1: "🚶 Marche quotidienne de 30 minutes à un rythme modéré",
        work2: "🏊 Aquagym ou natation douce, idéale pour décharger le poids",
        work3: "🧘 Yoga prénatal et étirements adaptés",
        work4: "🚴 Vélo stationnaire en début de grossesse",
        slide_travail_1_title: "😴 Gérer la fatigue au quotidien",
        slide_travail_1_body: "La fatigue est l'un des symptômes les plus fréquents de la grossesse, particulièrement aux 1er et 3e trimestres. Elle résulte des transformations hormonales et de l'augmentation du volume sanguin.",
        fatigue1: "🛌 Accordez-vous des siestes courtes (20-30 min) en journée",
        fatigue2: "📅 Planifiez vos activités importantes en matinée",
        fatigue3: "🙋 N'hésitez pas à déléguer et à accepter de l'aide",
        fatigue4: "🥗 Évitez les repas lourds qui accentuent la somnolence",
        fatigue5: "🌙 Maintenez un rythme de sommeil régulier",
        slide_travail_2_title: "⚠️ Exercices à éviter",
        slide_travail_2_body: "Certains exercices sont contre-indiqués durant la grossesse. Consultez toujours votre médecin avant de commencer un programme sportif.",
        avoid1: "🚫 Sports de contact ou à risque de chutes",
        avoid2: "🚫 Exercices en décubitus dorsal après le 1er trimestre",
        avoid3: "🚫 Efforts intenses en altitude ou en chaleur excessive",
        avoid4: "🚫 Musculation avec charges lourdes",
        avoid5: "✅ En cas de doute : marche, natation et yoga restent les meilleures options",
        // Respiration slides
        slide_resp_0_title: "🌬️ Pourquoi bien respirer ?",
        slide_resp_0_body: "La respiration consciente est un outil fondamental pendant la grossesse et l'accouchement. Elle permet d'oxygéner efficacement le sang, de réduire le stress et de gérer la douleur lors des contractions.",
        breath1: "💓 Améliore l'oxygénation du fœtus",
        breath2: "🧠 Réduit l'anxiété et régule le système nerveux",
        breath3: "💪 Renforce le diaphragme et le plancher pelvien",
        breath4: "😌 Favorise la détente profonde et un meilleur sommeil",
        slide_resp_1_title: "🫁 Respiration abdominale profonde",
        slide_resp_1_body: "La technique de base recommandée pendant la grossesse. Elle mobilise pleinement le diaphragme et optimise les échanges gazeux.",
        abdo1: "1️⃣ Installez-vous confortablement, une main sur le ventre",
        abdo2: "2️⃣ Inspirez lentement par le nez en 4 secondes — ventre qui se soulève",
        abdo3: "3️⃣ Retenez votre souffle 1 à 2 secondes",
        abdo4: "4️⃣ Expirez doucement par la bouche en 6 secondes",
        abdo5: "🔁 Répétez 5 à 10 fois, 2 à 3 fois par jour",
        slide_resp_2_title: "🌊 Respiration pour l'accouchement",
        slide_resp_2_body: "Maîtriser sa respiration est l'une des clés d'un accouchement plus serein. Ces techniques permettent de gérer les contractions et de conserver son énergie.",
        birthPhase1: "Phase de dilatation :", birthPhase1Text: "Respirations lentes et profondes entre les contractions",
        birthPhase2: "Pendant la contraction :", birthPhase2Text: "Expiration longue et contrôlée — ne bloquez pas votre souffle",
        birthPhase3: "Phase d'expulsion :", birthPhase3Text: "Poussées guidées par votre sage-femme, coordonnées à votre souffle",
        // Postures
        slide_pos_0_title: "🤱 Chère future maman",
        slide_pos_0_body: "Ton corps vit une transformation extraordinaire. Avec la croissance de ton ventre, ta posture change et certaines tensions apparaissent au niveau du dos, du bassin ou des jambes.",
        slide_pos_0_body2: "Les postures présentées ci-après ont été sélectionnées par notre équipe de kinésithérapeutes prénatales pour t'aider à soulager les douleurs, favoriser la mobilité du bassin et préparer ton corps à l'accouchement.",
        slide_pos_1_title: "🌿 Décubitus Latéral Gauche (DLG)",
        slide_pos_1_desc: "Position allongée sur le côté gauche, coussins de soutien sous le ventre et entre les genoux.",
        dlg1:"✔️ Optimise la circulation utéro-placentaire", dlg2:"✔️ Favorise l'oxygénation du fœtus", dlg3:"✔️ Réduit les œdèmes des membres inférieurs", dlg4:"✔️ Soulage les lombalgies chroniques", dlg5:"✔️ Induit une relaxation profonde",
        slide_pos_2_title: "🌿 Position accroupie",
        slide_pos_2_desc: "Flexion des genoux avec descente progressive du bassin, dos droit, pieds à plat.",
        squat1:"✔️ Renforce les muscles des membres inférieurs", squat2:"✔️ Assouplit le périnée et le plancher pelvien", squat3:"✔️ Augmente la mobilité et l'ouverture du bassin", squat4:"✔️ Améliore la circulation sanguine", squat5:"✔️ Prépare activement à l'expulsion",
        slide_pos_3_title: "🌿 Position à quatre pattes",
        slide_pos_3_desc: "Appui symétrique sur les mains et les genoux, rachis neutre, regard vers le sol.",
        qp1:"✔️ Soulage efficacement les lombalgies", qp2:"✔️ Décharge la pression sur le bassin", qp3:"✔️ Améliore la mobilité pelvienne", qp4:"✔️ Encourage la bonne présentation du bébé", qp5:"✔️ Diminue les douleurs sciatiques",
        slide_pos_4_title: "🌿 Posture de suspension",
        slide_pos_4_desc: "Debout, légère inclinaison vers l'avant avec appui sur un support stable (mur, barre, rebozo).",
        sus1:"✔️ Diminue la compression lombaire", sus2:"✔️ Décharge le poids du bassin", sus3:"✔️ Détend et assouplit le périnée", sus4:"✔️ Favorise la descente du bébé", sus5:"✔️ Procure une sensation de légèreté",
    },

    /* ──────────────── ENGLISH ──────────────── */
    en: {
        dir: "ltr", lang: "en",
        pageTitle: "Pregnancy Guide",
        header: "💗 Pregnancy & Maternity Guide 💗",
        footer: "💗 All Rights Reserved — Pregnancy & Maternity Guide",
        navHome: "🏠 Home",
        navWork: "💪 Exercise",
        navBreathing: "🌬️ Breathing",
        navPostures: "🤱 Postures",
        sideSettings: "Settings",
        sideMode: "Display",
        sideDark: "🌙 Dark Mode",
        sideLightMode: "☀️ Light Mode",
        sideLang: "Language",
        sideAbout: "About",
        aboutText: "This guide was developed by a team of Tunisian healthcare professionals dedicated to the well-being of pregnant women.",
        sideContact: "Our Team",
        disclaimer: "⚠️ This guide is for informational purposes only. Always consult your doctor or midwife for personalized care.",
        cityTunis: "Tunis", citySousse: "Sousse", citySfax: "Sfax", cityMonastir: "Monastir",
        countryTunisia: "Tunisia",
        btnPrev: "◀ Previous", btnNext: "Next ▶",
        cardTitle: "💗 Pink October",
        cardContent: "Raising awareness for breast cancer screening — because every woman deserves to be protected.",
        welcomeBadge: "Official Guide",
        posturesBadge: "Prenatal Physiotherapy",
        benefitsTitle: "🔹 Benefits",
        feat1: "🤰 Postures", feat2: "🌬️ Breathing", feat3: "💪 Exercise", feat4: "💡 Advice",
        infoCardHome: "Introduction & general well-being",
        infoCardWork: "Gentle exercise & energy management",
        infoCardBreath: "Relaxation techniques & preparation",
        infoCardPost: "Back relief & birth preparation",
        slide_accueil_0_title: "Welcome, Future Mom 💗",
        slide_accueil_0_sub: "Your pregnancy companion — from the first trimester to delivery",
        slide_accueil_0_body: "This comprehensive guide was designed by a team of Tunisian healthcare professionals to support you at every stage of your pregnancy. You will find practical advice on nutrition, adapted postures, breathing techniques and gentle exercises.",
        slide_accueil_1_title: "📖 How to Use This Guide",
        slide_accueil_1_body: "This guide is organized into four sections accessible from the navigation menu. Each section offers illustrated practical sheets with verified medical information.",
        slide_accueil_2_title: "🌱 Your Body During Pregnancy",
        slide_accueil_2_body: "During pregnancy, your body undergoes an exceptional physiological transformation. Understanding these changes helps you manage them better and adopt the right habits.",
        bodyPoint1: "🔸 1st trimester: Intense fatigue, nausea, hormonal adjustment",
        bodyPoint2: "🔸 2nd trimester: Return of energy, belly growth, first baby movements",
        bodyPoint3: "🔸 3rd trimester: Birth preparation, managing weight and posture",
        bodyPoint4: "🔸 Throughout: Stay hydrated, rest, and consult your care team regularly",
        slide_accueil_3_title: "🥗 Nutrition & Well-being",
        slide_accueil_3_body: "A balanced diet is the cornerstone of a healthy pregnancy. Prioritize folic acid, iron, calcium and omega-3 fatty acids, essential for your baby's optimal development.",
        nutri1: "🥦 Green vegetables, legumes and fresh fruit every day",
        nutri2: "🐟 Fatty fish (sardines, salmon) twice a week",
        nutri3: "🥛 Dairy products for calcium",
        nutri4: "💊 Iron and folic acid supplements on prescription",
        nutri5: "💧 At least 1.5 to 2 litres of water per day",
        slide_accueil_4_title: "💆‍♀️ Mental Health & Emotional Support",
        slide_accueil_4_body: "Your emotional well-being is just as important as your physical health. Pregnancy can bring doubts and anxieties — this is completely normal.",
        mental1: "💬 Talk about your emotions with loved ones or a professional",
        mental2: "🧘 Practice meditation and guided relaxation",
        mental3: "📖 Keep a pregnancy journal to express your feelings",
        mental4: "🤝 Join support groups for expectant mothers",
        mental5: "🌙 Allow yourself moments of rest and enjoyment each day",
        slide_travail_0_title: "💪 Staying Active During Pregnancy",
        slide_travail_0_body: "Moderate physical activity is recommended throughout an uncomplicated pregnancy. It improves blood circulation, reduces back pain, promotes better sleep and prepares your body for delivery.",
        work1: "🚶 30-minute daily walk at a moderate pace",
        work2: "🏊 Aqua-aerobics or gentle swimming, ideal for relieving weight",
        work3: "🧘 Prenatal yoga and adapted stretching",
        work4: "🚴 Stationary bike in the early stages of pregnancy",
        slide_travail_1_title: "😴 Managing Daily Fatigue",
        slide_travail_1_body: "Fatigue is one of the most common symptoms of pregnancy, particularly in the 1st and 3rd trimesters. It results from hormonal changes and an increase in blood volume.",
        fatigue1: "🛌 Allow yourself short naps (20-30 min) during the day",
        fatigue2: "📅 Schedule important activities in the morning",
        fatigue3: "🙋 Don't hesitate to delegate and accept help",
        fatigue4: "🥗 Avoid heavy meals that increase drowsiness",
        fatigue5: "🌙 Maintain a regular sleep schedule",
        slide_travail_2_title: "⚠️ Exercises to Avoid",
        slide_travail_2_body: "Some exercises are contraindicated during pregnancy. Always consult your doctor before starting any fitness program.",
        avoid1: "🚫 Contact sports or activities with fall risk",
        avoid2: "🚫 Exercises lying on your back after the 1st trimester",
        avoid3: "🚫 Intense effort at altitude or in excessive heat",
        avoid4: "🚫 Heavy weightlifting or intense abdominal exercises",
        avoid5: "✅ When in doubt: walking, swimming and yoga are the best options",
        slide_resp_0_title: "🌬️ Why Breathe Correctly?",
        slide_resp_0_body: "Mindful breathing is a fundamental tool during pregnancy and childbirth. It effectively oxygenates the blood, reduces stress, and helps manage pain during contractions.",
        breath1: "💓 Improves foetal oxygenation",
        breath2: "🧠 Reduces anxiety and regulates the nervous system",
        breath3: "💪 Strengthens the diaphragm and pelvic floor",
        breath4: "😌 Promotes deep relaxation and better sleep",
        slide_resp_1_title: "🫁 Deep Abdominal Breathing",
        slide_resp_1_body: "The foundational technique recommended during pregnancy. It fully engages the diaphragm and optimises gas exchange.",
        abdo1: "1️⃣ Get comfortable, one hand on your belly",
        abdo2: "2️⃣ Breathe in slowly through your nose for 4 seconds — belly rises",
        abdo3: "3️⃣ Hold your breath for 1 to 2 seconds",
        abdo4: "4️⃣ Exhale gently through your mouth for 6 seconds",
        abdo5: "🔁 Repeat 5 to 10 times, 2 to 3 times per day",
        slide_resp_2_title: "🌊 Breathing for Childbirth",
        slide_resp_2_body: "Mastering your breathing is one of the keys to a calmer delivery. These techniques help manage contractions and conserve energy.",
        birthPhase1: "Dilation phase:", birthPhase1Text: "Slow, deep breaths between contractions to rest",
        birthPhase2: "During a contraction:", birthPhase2Text: "Long, controlled exhalation — do not hold your breath",
        birthPhase3: "Expulsion phase:", birthPhase3Text: "Pushes guided by your midwife, coordinated with your breath",
        slide_pos_0_title: "🤱 Dear Future Mom",
        slide_pos_0_body: "Your body is going through an extraordinary transformation. As your belly grows, your posture changes and tensions may appear in your back, pelvis or legs.",
        slide_pos_0_body2: "The postures presented here were carefully selected by our prenatal physiotherapy team to help relieve pain, improve pelvic mobility and prepare your body for childbirth.",
        slide_pos_1_title: "🌿 Left Lateral Decubitus (LLD)",
        slide_pos_1_desc: "Lying on the left side with supportive cushions placed under the abdomen and between the knees.",
        dlg1:"✔️ Optimises utero-placental blood flow", dlg2:"✔️ Promotes foetal oxygenation", dlg3:"✔️ Reduces lower limb oedema", dlg4:"✔️ Relieves chronic lower back pain", dlg5:"✔️ Induces deep relaxation",
        slide_pos_2_title: "🌿 Squatting Position",
        slide_pos_2_desc: "Knees bent with the pelvis gradually lowered toward the floor, back straight, feet flat.",
        squat1:"✔️ Strengthens lower limb muscles", squat2:"✔️ Stretches the perineum and pelvic floor", squat3:"✔️ Increases pelvic mobility and opening", squat4:"✔️ Improves blood circulation", squat5:"✔️ Actively prepares for delivery",
        slide_pos_3_title: "🌿 All-Fours Position",
        slide_pos_3_desc: "Symmetrical support on hands and knees, neutral spine, gaze toward the floor.",
        qp1:"✔️ Effectively relieves lower back pain", qp2:"✔️ Reduces pressure on the pelvis", qp3:"✔️ Improves pelvic mobility", qp4:"✔️ Encourages optimal baby positioning", qp5:"✔️ Reduces sciatic pain",
        slide_pos_4_title: "🌿 Suspension Posture",
        slide_pos_4_desc: "Standing with a slight forward lean, holding onto a stable support (wall, bar, rebozo scarf).",
        sus1:"✔️ Reduces lumbar compression", sus2:"✔️ Offloads pelvic weight", sus3:"✔️ Relaxes and stretches the perineum", sus4:"✔️ Encourages baby's descent", sus5:"✔️ Provides a sensation of lightness and relief",
    },

    /* ──────────────── العربية ──────────────── */
    ar: {
        dir: "rtl", lang: "ar",
        pageTitle: "دليل المرأة الحامل",
        header: "💗 دليل المرأة الحامل والأمومة 💗",
        footer: "💗 جميع الحقوق محفوظة — دليل المرأة الحامل",
        navHome: "🏠 الرئيسية",
        navWork: "💪 التمارين",
        navBreathing: "🌬️ التنفس",
        navPostures: "🤱 الوضعيات",
        sideSettings: "الإعدادات",
        sideMode: "العرض",
        sideDark: "🌙 الوضع الداكن",
        sideLightMode: "☀️ الوضع الفاتح",
        sideLang: "اللغة",
        sideAbout: "حول الدليل",
        aboutText: "تم تطوير هذا الدليل من قِبَل فريق متخصص من المهنيات الصحيات التونسيات المكرَّسات لصحة ورفاهية المرأة الحامل.",
        sideContact: "فريقنا",
        disclaimer: "⚠️ هذا الدليل للأغراض الإعلامية فقط. استشيري دائماً طبيبتكِ أو قابلتكِ للحصول على متابعة شخصية.",
        cityTunis: "تونس", citySousse: "سوسة", citySfax: "صفاقس", cityMonastir: "المنستير",
        countryTunisia: "تونس",
        btnPrev: "◀ السابق", btnNext: "التالي ▶",
        cardTitle: "💗 أكتوبر الوردي",
        cardContent: "التوعية بالكشف المبكر عن سرطان الثدي — لأن كل امرأة تستحق الحماية.",
        welcomeBadge: "الدليل الرسمي",
        posturesBadge: "العلاج الطبيعي قبل الولادة",
        benefitsTitle: "🔹 الفوائد",
        feat1: "🤰 الوضعيات", feat2: "🌬️ التنفس", feat3: "💪 التمارين", feat4: "💡 النصائح",
        infoCardHome: "مقدمة وصحة عامة",
        infoCardWork: "تمارين لطيفة وإدارة الطاقة",
        infoCardBreath: "تقنيات الاسترخاء والتحضير",
        infoCardPost: "تخفيف آلام الظهر والتهيؤ للولادة",
        slide_accueil_0_title: "مرحباً بكِ أيتها الأم المستقبلية 💗",
        slide_accueil_0_sub: "رفيقتكِ خلال الحمل — من الثلث الأول حتى الولادة",
        slide_accueil_0_body: "صُمِّم هذا الدليل الشامل من قِبَل فريق من المختصات الصحيات التونسيات لمرافقتكِ في كل مرحلة من مراحل حملكِ. ستجدين هنا نصائح عملية حول التغذية، الوضعيات المناسبة، تقنيات التنفس والتمارين اللطيفة.",
        slide_accueil_1_title: "📖 كيف تستخدمين هذا الدليل؟",
        slide_accueil_1_body: "الدليل منظَّم في أربعة أقسام يمكن الوصول إليها من قائمة التنقل. يقدم كل قسم بطاقات عملية مصوَّرة بمعلومات طبية مُتحقَّق منها.",
        slide_accueil_2_title: "🌱 جسمكِ خلال الحمل",
        slide_accueil_2_body: "يمر جسمكِ خلال الحمل بتحول فيزيولوجي استثنائي. فهم هذه التغيرات يساعدكِ على التكيف معها بشكل أفضل واعتماد العادات الصحيحة.",
        bodyPoint1: "🔸 الثلث الأول: إرهاق شديد، غثيان، تكيف هرموني",
        bodyPoint2: "🔸 الثلث الثاني: عودة النشاط، نمو البطن، أولى حركات الجنين",
        bodyPoint3: "🔸 الثلث الثالث: التهيؤ للولادة، إدارة الوزن والوضعية",
        bodyPoint4: "🔸 باستمرار: الترطيب، الراحة، والمتابعة المنتظمة مع فريقكِ الطبي",
        slide_accueil_3_title: "🥗 التغذية والصحة",
        slide_accueil_3_body: "التغذية المتوازنة هي ركيزة الحمل الصحي. احرصي على الحصول على حمض الفوليك والحديد والكالسيوم وأوميغا-3، الضرورية لنمو طفلكِ.",
        nutri1: "🥦 خضروات خضراء وبقوليات وفواكه طازجة يومياً",
        nutri2: "🐟 أسماك دهنية (سردين، سلمون) مرتين في الأسبوع",
        nutri3: "🥛 منتجات الألبان لتعزيز الكالسيوم",
        nutri4: "💊 مكملات الحديد وحمض الفوليك بوصفة طبية",
        nutri5: "💧 شرب 1.5 إلى 2 لتر من الماء يومياً على الأقل",
        slide_accueil_4_title: "💆‍♀️ الصحة النفسية والدعم العاطفي",
        slide_accueil_4_body: "صحتكِ النفسية لا تقل أهمية عن صحتكِ الجسدية. الحمل قد يجلب شكوكاً ومخاوف — وهذا أمر طبيعي تماماً.",
        mental1: "💬 تحدثي عن مشاعركِ مع المقربين أو مختص",
        mental2: "🧘 مارسي التأمل والاسترخاء الموجَّه",
        mental3: "📖 احتفظي بمذكرات الحمل للتعبير عن أحاسيسكِ",
        mental4: "🤝 انضمي إلى مجموعات دعم الأمهات المستقبليات",
        mental5: "🌙 امنحي نفسكِ لحظات راحة ومتعة كل يوم",
        slide_travail_0_title: "💪 البقاء نشيطة خلال الحمل",
        slide_travail_0_body: "يُنصح بالنشاط البدني المعتدل طوال فترة الحمل غير المعقَّد. يحسِّن الدورة الدموية، يقلل آلام الظهر، يعزز النوم ويهيئ جسمكِ للولادة.",
        work1: "🚶 المشي اليومي 30 دقيقة بوتيرة معتدلة",
        work2: "🏊 التمارين المائية أو السباحة الخفيفة، مثالية لتخفيف الثقل",
        work3: "🧘 اليوغا قبل الولادة والتمددات المناسبة",
        work4: "🚴 الدراجة الثابتة في المراحل الأولى من الحمل",
        slide_travail_1_title: "😴 إدارة التعب اليومي",
        slide_travail_1_body: "التعب من أكثر الأعراض شيوعاً خلال الحمل، خاصة في الثلثين الأول والثالث. ينتج عن التغيرات الهرمونية وزيادة حجم الدم.",
        fatigue1: "🛌 خصصي قيلولات قصيرة (20-30 دقيقة) خلال النهار",
        fatigue2: "📅 جدولي أنشطتكِ المهمة في الصباح",
        fatigue3: "🙋 لا تترددي في تفويض المهام وقبول المساعدة",
        fatigue4: "🥗 تجنبي الوجبات الثقيلة التي تزيد من النعاس",
        fatigue5: "🌙 حافظي على نظام نوم منتظم",
        slide_travail_2_title: "⚠️ التمارين التي يجب تجنبها",
        slide_travail_2_body: "بعض التمارين منعكوسة خلال الحمل. استشيري دائماً طبيبتكِ قبل البدء بأي برنامج رياضي.",
        avoid1: "🚫 الرياضات التلامسية أو المعرِّضة للسقوط",
        avoid2: "🚫 تمارين الاستلقاء على الظهر بعد الثلث الأول",
        avoid3: "🚫 الجهد الشديد على الارتفاعات أو في الحر المفرط",
        avoid4: "🚫 رفع الأثقال أو تمارين البطن المكثفة",
        avoid5: "✅ عند الشك: المشي والسباحة واليوغا هي الخيارات الأفضل دائماً",
        slide_resp_0_title: "🌬️ لماذا التنفس الصحيح مهم؟",
        slide_resp_0_body: "التنفس الواعي أداة أساسية خلال الحمل والولادة. يؤمِّن التأكسج الفعال للدم، يقلل التوتر ويساعد على إدارة الألم أثناء الانقباضات.",
        breath1: "💓 يحسِّن تأكسج الجنين",
        breath2: "🧠 يقلل القلق وينظِّم الجهاز العصبي",
        breath3: "💪 يقوِّي الحجاب الحاجز وقاع الحوض",
        breath4: "😌 يعزز الاسترخاء العميق وجودة النوم",
        slide_resp_1_title: "🫁 التنفس البطني العميق",
        slide_resp_1_body: "التقنية الأساسية الموصى بها خلال الحمل. تعمل على تفعيل الحجاب الحاجز بالكامل وتحسين التبادل الغازي.",
        abdo1: "1️⃣ استلقي بوضعية مريحة، يد واحدة على البطن",
        abdo2: "2️⃣ استنشقي ببطء من الأنف لمدة 4 ثوانٍ — البطن يرتفع",
        abdo3: "3️⃣ احبسي النفس لمدة ثانية إلى ثانيتين",
        abdo4: "4️⃣ أخرجي الهواء ببطء من الفم لمدة 6 ثوانٍ",
        abdo5: "🔁 كرري 5 إلى 10 مرات، 2 إلى 3 مرات يومياً",
        slide_resp_2_title: "🌊 التنفس أثناء الولادة",
        slide_resp_2_body: "إتقان التنفس هو أحد مفاتيح الولادة الأكثر هدوءاً. تساعد هذه التقنيات على إدارة الانقباضات والحفاظ على الطاقة.",
        birthPhase1: "مرحلة التمدد:", birthPhase1Text: "أنفاس بطيئة وعميقة بين الانقباضات للراحة",
        birthPhase2: "أثناء الانقباض:", birthPhase2Text: "زفير طويل ومتحكَّم فيه — لا تحبسي نفسكِ",
        birthPhase3: "مرحلة الدفع:", birthPhase3Text: "دفعات بتوجيه قابلتكِ، منسَّقة مع تنفسكِ",
        slide_pos_0_title: "🤱 أيتها الأم المستقبلية العزيزة",
        slide_pos_0_body: "جسمكِ يمر بتحول استثنائي. مع نمو بطنكِ، يتغير توازنكِ وقد تظهر توترات في الظهر أو الحوض أو الساقين.",
        slide_pos_0_body2: "الوضعيات المقدَّمة في هذا القسم اختارها فريق معالجيناتنا الفيزيائيات المتخصصات في الرعاية قبل الوضع، لمساعدتكِ على تخفيف الآلام وتحسين حركة الحوض وتهيئة جسمكِ للولادة.",
        slide_pos_1_title: "🌿 الاستلقاء الجانبي الأيسر",
        slide_pos_1_desc: "الاستلقاء على الجانب الأيسر مع وضع وسائد داعمة تحت البطن وبين الركبتين.",
        dlg1:"✔️ يُحسِّن تدفق الدم الرحمي المشيمي", dlg2:"✔️ يعزز تأكسج الجنين", dlg3:"✔️ يخفف الوذمة في الأطراف السفلية", dlg4:"✔️ يسكِّن آلام أسفل الظهر المزمنة", dlg5:"✔️ يحثُّ على الاسترخاء العميق",
        slide_pos_2_title: "🌿 الوضعية القرفصاء",
        slide_pos_2_desc: "ثني الركبتين مع إنزال الحوض تدريجياً نحو الأرض، الظهر مستقيم، القدمان مسطحتان.",
        squat1:"✔️ يُقوِّي عضلات الأطراف السفلية", squat2:"✔️ يُمدِّد العجان وقاع الحوض", squat3:"✔️ يزيد من قابلية الحوض للتحرك والانفتاح", squat4:"✔️ يحسِّن الدورة الدموية", squat5:"✔️ يُهيِّئ الجسم فعلياً للدفع والولادة",
        slide_pos_3_title: "🌿 وضعية على الأربع",
        slide_pos_3_desc: "الارتكاز المتماثل على اليدين والركبتين، العمود الفقري محايد، النظر نحو الأرض.",
        qp1:"✔️ يُخفِّف آلام أسفل الظهر بفاعلية", qp2:"✔️ يُقلِّل الضغط على الحوض", qp3:"✔️ يُحسِّن حركية الحوض", qp4:"✔️ يشجع على الوضع الصحيح للجنين", qp5:"✔️ يُخفف من آلام عرق النسا",
        slide_pos_4_title: "🌿 وضعية التعليق",
        slide_pos_4_desc: "الوقوف مع إمالة طفيفة للأمام، مع التمسك بدعامة ثابتة (جدار، قضيب، ريبوزو).",
        sus1:"✔️ يُخفِّف ضغط أسفل الظهر", sus2:"✔️ يُقلِّل الحِمل على الحوض", sus3:"✔️ يُرخي العجان ويمدِّده", sus4:"✔️ يشجع الجنين على النزول", sus5:"✔️ يمنح إحساساً بالخفة والارتياح",
    }
};

/* ================================================================
   APPLY TRANSLATIONS
   ================================================================ */
function changeLang(lang) {
    const t = translations[lang];
    if (!t) return;

    // Direction & html lang
    document.documentElement.dir = t.dir;
    document.documentElement.lang = t.lang;
    document.body.style.direction = t.dir;

    // Page title
    document.title = t.pageTitle;

    // Translate all [data-i18n] elements
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (t[key] !== undefined) {
            // For inputs/buttons use textContent; preserve child elements otherwise
            if (el.children.length === 0) {
                el.textContent = t[key];
            } else {
                // Only update if the element has no meaningful child structure
                el.textContent = t[key];
            }
        }
    });

    // Fix dark button label based on current mode
    updateDarkBtn(document.body.classList.contains("dark"));

    // Update slide counters
    sliderSections.forEach(section => {
        const slides = section.querySelectorAll(".slide");
        const counterId = `counter-${section.id}`;
        const counterEl = document.getElementById(counterId);
        if (counterEl) {
            const activeIdx = [...slides].findIndex(s => s.classList.contains("active"));
            counterEl.textContent = `${(activeIdx >= 0 ? activeIdx : 0) + 1} / ${slides.length}`;
        }
    });

    // Nav items — re-apply data-i18n mapping to nav li
    document.querySelectorAll("nav li").forEach(li => {
        const key = li.getAttribute("data-i18n");
        if (key && t[key]) li.textContent = t[key];
    });

    // Persist
    localStorage.setItem("lang", lang);
    const sel = document.getElementById("langSelect");
    if (sel && sel.value !== lang) sel.value = lang;
}

/* ================================================================
   INIT ON LOAD
   ================================================================ */
window.addEventListener("load", () => {
    // Theme
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        updateDarkBtn(true);
    }

    // Language
    const savedLang = localStorage.getItem("lang") || "fr";
    changeLang(savedLang);
    const sel = document.getElementById("langSelect");
    if (sel) sel.value = savedLang;
});
