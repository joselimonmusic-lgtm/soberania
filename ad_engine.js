
// ANTIGRAVITY AD NETWORK (SIMULATION)
// In production, replace 'CA-PUB-XXXXXXXX' with real AdSense/AdMob ID.

const AD_CONFIG = {
    publisherId: 'CA-PUB-ANTIGRAVITY-100X',
    testMode: true,
    interstitialChance: 0.3 // 30% chance on boot
};

function initAds() {
    console.log('💰 AD SYSTEM: Initializing...');
    injectBanner();
    if (Math.random() < AD_CONFIG.interstitialChance) {
        showInterstitial();
    }
}

function injectBanner() {
    const banner = document.createElement('div');
    banner.id = 'ad-banner-sticky';
    banner.style.cssText = 'position: fixed; bottom: 0; left: 0; right: 0; height: 60px; background: #222; border-top: 1px solid #444; display: flex; align-items: center; justify-content: center; z-index: 9999;';
    banner.innerHTML = '<span style="color: #666; font-size: 10px; font-family: sans-serif;">ADVERTISEMENT SPACE • <a href="#" style="color: #888;">REMOVE ADS</a></span>';
    document.body.appendChild(banner);
    
    // Adjust body padding
    document.body.style.paddingBottom = '60px';
}

function showInterstitial() {
    console.log('💰 AD SYSTEM: Showing Interstitial');
    const modal = document.createElement('div');
    modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.9); z-index: 10000; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white;';
    modal.innerHTML = `
        <div style="background: #333; padding: 20px; border-radius: 10px; text-align: center; max-width: 300px;">
            <h3 style="margin-top: 0;">SPONSORED</h3>
            <div style="width: 250px; height: 250px; background: #444; margin: 10px auto; display: flex; align-items: center; justify-content: center;">
                AD CONTENT
            </div>
            <button id="close-ad" style="background: white; color: black; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold;">CLOSE (5s)</button>
        </div>
    `;
    document.body.appendChild(modal);

    const btn = modal.querySelector('#close-ad');
    btn.disabled = true;
    let countdown = 5;
    
    const interval = setInterval(() => {
        countdown--;
        btn.innerText = `CLOSE (${countdown}s)`;
        if (countdown <= 0) {
            clearInterval(interval);
            btn.innerText = 'CLOSE X';
            btn.disabled = false;
            btn.onclick = () => modal.remove();
        }
    }, 1000);
}

// Auto-init on load
window.addEventListener('DOMContentLoaded', initAds);
