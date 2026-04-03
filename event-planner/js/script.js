// ==================== SERVICE SELECTION ====================
function selectService(service) {
    const select = document.getElementById('eventType');

    if (service === 'Wedding') select.value = "50000";
    else if (service === 'Birthday') select.value = "25000";
    else if (service === 'Corporate') select.value = "40000";
    else if (service === 'Concert') select.value = "35000";

    document.getElementById('price').scrollIntoView({ behavior: 'smooth' });
    calculate();
}

// ==================== CALCULATOR ====================
const basePrices = {
    "50000": 50000,
    "25000": 25000,
    "40000": 40000,
    "30000": 30000,
    "20000": 20000,
    "35000": 35000
};

function calculate() {
    const base = basePrices[document.getElementById("eventType").value] || 50000;
    const guests = parseInt(document.getElementById("guests").value) || 100;

    let addons = 0;
    document.querySelectorAll('.addon:checked').forEach(cb => {
        addons += parseInt(cb.dataset.price);
    });

    const perGuest = guests * 250;
    const total = base + perGuest + addons;

    document.getElementById("breakdown").innerHTML = `
        <div class="flex justify-between">
            <span>Base Package</span>
            <span>₹${base.toLocaleString('en-IN')}</span>
        </div>
        <div class="flex justify-between">
            <span>${guests} Guests × ₹250</span>
            <span>₹${perGuest.toLocaleString('en-IN')}</span>
        </div>
        <div class="flex justify-between">
            <span>Add-ons</span>
            <span>₹${addons.toLocaleString('en-IN')}</span>
        </div>
    `;

    document.getElementById("totalPrice").textContent =
        `₹${total.toLocaleString('en-IN')}`;

    document.getElementById("guestCount").textContent = guests;
}

// Sync range + number input
const range = document.getElementById("guests");
const num = document.getElementById("guestsNumber");

if (range && num) {
    range.addEventListener('input', () => num.value = range.value);
    num.addEventListener('input', () => range.value = num.value);
}

// Auto update
document.querySelectorAll('input, select').forEach(el =>
    el.addEventListener('input', calculate)
);
document.querySelectorAll('.addon').forEach(el =>
    el.addEventListener('change', calculate)
);

// Run once on load
window.onload = calculate;

// ==================== BOOKING ====================
function bookNow() {
    document.getElementById('bookingModal').style.display = 'flex';
}

function closeBookingModal() {
    document.getElementById('bookingModal').style.display = 'none';
}

function submitBooking() {
    const name = document.getElementById('name').value || "Guest";

    alert(`🎉 Thank you ${name}!\nYour booking request has been received.\nOur team will contact you shortly.`);

    closeBookingModal();
}

// ==================== CHATBOT ====================
function toggleChat() {
    const modal = document.getElementById('chatModal');

    modal.style.display =
        modal.style.display === 'flex' ? 'none' : 'flex';
}

function selectOption(eventType) {
    const body = document.getElementById('chatBody');

    const userMsg = document.createElement('div');
    userMsg.style.textAlign = 'right';
    userMsg.style.marginBottom = '12px';

    userMsg.innerHTML = `
        <div style="background:#f0f0f0;color:#333;
        padding:12px 16px;border-radius:18px 18px 4px 18px;
        display:inline-block;">
        ${eventType}
        </div>
    `;

    body.appendChild(userMsg);

    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'chat-message';
        botMsg.innerHTML =
            `Great choice! Let's plan your ${eventType.toLowerCase()}.`;

        body.appendChild(botMsg);
        body.scrollTop = body.scrollHeight;
    }, 400);
}

// Close chatbot when clicking outside
document.addEventListener('click', function (e) {
    const modal = document.getElementById('chatModal');
    const button = document.querySelector('.chat-float');

    if (modal && !modal.contains(e.target) && !button.contains(e.target)) {
        modal.style.display = 'none';
    }
});

// ==================== WHATSAPP ====================
function sendToWhatsApp() {
    const name = document.querySelector('input[placeholder="Your Name"]').value || "";
    const email = document.querySelector('input[placeholder="Your Email"]').value || "";
    const message = document.querySelector('textarea').value || "";

    const text = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    );

    const url = `https://wa.me/918708974075?text=${text}`;
    window.open(url, "_blank");
}