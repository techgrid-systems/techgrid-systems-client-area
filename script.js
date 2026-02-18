/**
 * TechGrid Systems - Customer Portal Logic
 * Native plain-text validation and session handling
 */

// Native username and password arrays
const usernameArray = ["Admin", "test"];
const passwordArray = ["Admin123", "test1"];

let count = 2; // Initial attempts

/**
 * Display messages in the UI box
 */
function showMessage(text, isError = true) {
    const box = document.getElementById('msg-box');
    if (!box) return;
    
    box.innerText = text;
    box.classList.remove('hidden', 'bg-red-50', 'text-red-600', 'bg-blue-50', 'text-blue-600');
    
    if (isError) {
        box.classList.add('bg-red-50', 'text-red-600');
    } else {
        box.classList.add('bg-blue-50', 'text-blue-600');
    }
}

/**
 * Main validation function
 */
function validate() {
    const unField = document.getElementById('username');
    const pwField = document.getElementById('password');
    const btn = document.getElementById('login-btn');
    
    const un = unField.value;
    const pw = pwField.value;
    
    if (!un || !pw) {
        showMessage("Please enter both username and password.");
        return;
    }

    let valid = false;

    // Validate credentials
    for (let i = 0; i < usernameArray.length; i++) {
        if ((un === usernameArray[i]) && (pw === passwordArray[i])) {
            valid = true;
            break;
        }
    }

    if (valid) {
        showMessage("Login successful! Redirecting...", false);
        
        // 1. Save session locally so dashboard.html recognizes the user
        localStorage.setItem('techgrid_user', un);
        
        // 2. Redirect to dashboard.html with the username in the URL as a backup
        setTimeout(() => {
            window.location.href = "home.html?username=" + encodeURIComponent(un);
        }, 800);
        return;
    }

    // Handle failed attempts
    if (count >= 1) {
        showMessage(`Invalid credentials. ${count} attempts remaining.`);
        count--;
    } else {
        // Lockout procedure
        showMessage("Account blocked due to multiple failed attempts.");
        unField.value = "ACCOUNT BLOCKED";
        pwField.value = "ACCOUNT BLOCKED";
        unField.disabled = true;
        pwField.disabled = true;
        btn.disabled = true;
        btn.classList.add('opacity-50', 'cursor-not-allowed');
    }
}

// Basic security measures to prevent back navigation
function preback() { window.history.forward(); }
setTimeout(preback, 0);
window.onunload = function() { null };
