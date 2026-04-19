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

// ==================== IMPROVED CHATBOT ====================

function toggleChat() {
    const modal = document.getElementById('chatModal');
    modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';

    if (modal.style.display === 'flex' && document.getElementById('chatBody').children.length === 0) {
        startNewChat();
    }
}

function startNewChat() {
    const body = document.getElementById('chatBody');
    body.innerHTML = '';

    addMessage("Hello! 👋<br>Welcome to EVENT.COM<br>How can I help you plan your perfect event today?", "bot");

    setTimeout(() => {
        showOptions();
    }, 800);
}

function addMessage(text, sender) {
    const body = document.getElementById('chatBody');
    const div = document.createElement('div');
    div.className = sender === "bot" ? "chat-message bot" : "chat-message user";
    div.innerHTML = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
}

function showOptions() {
    const footer = document.getElementById('chatFooter');
    footer.innerHTML = `
        <div onclick="chooseOption(1)" class="chat-option">🎉 What services do you offer?</div>
        <div onclick="chooseOption(2)" class="chat-option">💰 Tell me about pricing</div>
        <div onclick="chooseOption(3)" class="chat-option">📅 How do I book an event?</div>
    `;
}

function chooseOption(num) {
    let question = "";
    let reply = "";

    if (num === 1) {
        question = "What services do you offer?";
        reply = "We specialize in Wedding, Birthday, Corporate, Concert, Baby Shower, Anniversary and many more events! ✨";
    } 
    else if (num === 2) {
        question = "Tell me about pricing";
        reply = "Price depends on event type + number of guests + add-ons.<br>Try our Price Calculator on the homepage for instant estimate! 📊";
    } 
    else if (num === 3) {
        question = "How do I book an event?";
        reply = "Super easy!<br>1. Go to Services section<br>2. Click Book Now<br>3. Fill details & confirm<br>Our team will contact you shortly ❤️";
    }

    // Show user message
    addMessage(question, "user");

    // Show bot reply after short delay
    setTimeout(() => {
        addMessage(reply, "bot");
        
        // Show options again after reply
        setTimeout(showOptions, 1000);
    }, 700);
}