const fs = require('fs');
const path = require('path');
const apps = require('./apps_registry');

const ROOT_DIR = __dirname;
const APPS_DIR = path.join(ROOT_DIR, 'apps');
const MARKETING_DIR = path.join(ROOT_DIR, 'MARKETING_ASSETS');

if (!fs.existsSync(MARKETING_DIR)) {
    fs.mkdirSync(MARKETING_DIR);
}

console.log(`🚀 INITIATING FINAL POLISH & MARKETING PIPELINE...`);

// 1. MARKETING ASSETS GENERATOR
console.log(`📢 GENERATING MARKETING COPY FOR 100 APPS...`);

let socialMediaPlan = `# 📅 30-DAY LAUNCH CALENDAR\n\n`;

apps.forEach((app, index) => {
    // Generate Copy
    const copy = `
APP: ${app.name}
SLOGAN: "${app.desc}"
HASHTAGS: #${app.name.replace(/\s/g, '')} #Antigravity #OfflineFirst

--- SOCIAL MEDIA POST (Twitter/X) ---
🚀 Presentamos ${app.name}: La solución definitiva para ${app.category.toLowerCase()}.
Funciona 100% offline. Sin suscripciones.
Descárgala hoy en el Antigravity Store.
#${app.id} #TechForGood

--- APP STORE SUBTITLE ---
${app.desc}

--- KEYWORDS ---
${app.category}, offline, tool, utility, ${app.name.toLowerCase()}
`;

    const appSafeName = app.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const appMarketingDir = path.join(MARKETING_DIR, app.category);

    if (!fs.existsSync(appMarketingDir)) fs.mkdirSync(appMarketingDir);
    fs.writeFileSync(path.join(appMarketingDir, `${app.id}_marketing.txt`), copy);

    // Add to Calendar
    const day = Math.floor(index / 4) + 1;
    socialMediaPlan += `DAY ${day}: Launch ${app.name} (${app.id})\n`;
});

fs.writeFileSync(path.join(MARKETING_DIR, 'LAUNCH_CALENDAR.md'), socialMediaPlan);


// 2. ANALYTICS INJECTION & PWA OPTIMIZATION
console.log(`💉 INJECTING TELEMETRY & PWA META TAGS...`);

apps.forEach(app => {
    const safeName = app.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const appDir = path.join(APPS_DIR, app.category, `${app.id}_${safeName}`);
    const htmlPath = path.join(appDir, 'index.html');

    if (fs.existsSync(htmlPath)) {
        let html = fs.readFileSync(htmlPath, 'utf8');

        // Inject Analytics
        const analyticsScript = `
    <!-- ANTIGRAVITY TELEMETRY -->
    <script>
        console.log('📡 TELEMETRY: App ${app.id} initialized.');
        console.log('🔋 POWER MODE: Offline-First');
        window.addEventListener('appinstalled', () => {
            console.log('🎉 APP INSTALLED: ${app.name}');
        });
    </script>
    <!-- iOS PWA META -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="${app.name}">
    <link rel="apple-touch-icon" href="icon.png">
        `;

        if (!html.includes('ANTIGRAVITY TELEMETRY')) {
            html = html.replace('</head>', `${analyticsScript}\n</head>`);
            fs.writeFileSync(htmlPath, html);
        }
    }
});

// 3. CENTRAL COMMAND MOBILE OPTIMIZATION
console.log(`📱 OPTIMIZING APP STORE FOR iOS...`);
const dashboardPath = path.join(ROOT_DIR, 'CENTRAL_COMMAND.html');
let dashboardHtml = fs.readFileSync(dashboardPath, 'utf8');

const mobileMeta = `
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="Antigravity Store">
    <link rel="apple-touch-icon" href="https://img.icons8.com/fluency/96/rocket.png">
`;

if (!dashboardHtml.includes('apple-mobile-web-app-capable')) {
    dashboardHtml = dashboardHtml.replace('</head>', `${mobileMeta}\n</head>`);

    // Add "Add to Home Screen" prompt for iOS
    const iosPrompt = `
    <div id="ios-install-prompt" class="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur border-t border-slate-700 p-4 transform translate-y-full transition-transform duration-500 hidden md:hidden">
        <div class="flex items-center justify-between">
            <div class="text-sm text-white">
                <p class="font-bold">Instalar Antigravity Store</p>
                <p class="text-xs text-slate-400">Toca <span class="text-blue-400 text-lg">⎋</span> y luego "Agregar a Inicio"</p>
            </div>
            <button onclick="document.getElementById('ios-install-prompt').classList.add('translate-y-full')" class="text-slate-400">✕</button>
        </div>
    </div>
    <script>
        // Simple iOS detection
        const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        const isStandalone = window.navigator.standalone;
        if (isIos && !isStandalone) {
            setTimeout(() => {
                const prompt = document.getElementById('ios-install-prompt');
                prompt.classList.remove('hidden');
                requestAnimationFrame(() => prompt.classList.remove('translate-y-full'));
            }, 3000);
        }
    </script>
    `;

    dashboardHtml = dashboardHtml.replace('</body>', `${iosPrompt}\n</body>`);
    fs.writeFileSync(dashboardPath, dashboardHtml);
}

console.log(`\n✨ FINAL POLISH COMPLETE.`);
console.log(`📢 MARKETING ASSETS: ${MARKETING_DIR}`);
console.log(`📱 iOS OPTIMIZATIONS: APPLIED`);
