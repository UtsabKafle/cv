// Theme toggle (kept for future use)
// const themeToggle = document.querySelector('.theme-toggle');
// if (themeToggle) {
//   themeToggle.addEventListener('click', () => {
//     document.body.classList.toggle('dark');
//   });
// }

const sendBtn = document.querySelector('.send-btn');
const chatInput = document.querySelector('.chat-input');
const messagesDiv = document.querySelector('.messages');
const tokenCounter = document.querySelector('.token-counter');

function renderMessage({ text, sender, thinking }) {
  const row = document.createElement('div');
  row.className = 'message-row';
  if (sender === 'user') {
    row.classList.add('user');
  }

  if (sender === 'ai') {
    // AI avatar
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = '<i class="fa-solid fa-dove"></i>';
    row.appendChild(avatar);
  }

  const bubble = document.createElement('div');
  bubble.className = `message-bubble ${sender}`;
  if (thinking) {
    bubble.innerHTML = '<span class="thinking-indicator"><span class="dot"></span><span class="dot"></span><span class="dot"></span></span>';
  } else {
    bubble.innerHTML = text;
  }

  if (sender === 'user') {
    // For user, bubble first, then actions
    row.appendChild(bubble);
    const actions = document.createElement('div');
    actions.className = 'message-actions';
    actions.innerHTML = `
      <i class="fa-regular fa-copy" title="Copy"></i>
      <i class="fa-regular fa-pen-to-square" title="Edit"></i>
    `;
    row.appendChild(actions);
  } else {
    // For ai, avatar (already added), then bubble
    row.appendChild(bubble);
  }

  messagesDiv.appendChild(row);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function renderSampleMessages() {
  messagesDiv.innerHTML = '';
  renderMessage({ sender: 'ai', text: "Hey! 😊 How's it going?" });
  renderMessage({ sender: 'user', text: 'hey' });
  renderMessage({ sender: 'ai', thinking: true });
  renderMessage({ sender: 'user', text: 'how are you?' });
}

// renderSampleMessages();

if (sendBtn && chatInput) {
  sendBtn.addEventListener('click', () => {
    const text = chatInput.value.trim();
    if (text) {
      renderMessage({ sender: 'user', text });
      chatInput.value = '';
      updateTokenCounter();
      // Simulate AI response with thinking animation
      const thinkingRow = { sender: 'ai', thinking: true };
      renderMessage(thinkingRow);
      setTimeout(() => {
        // Remove last thinking message
        messagesDiv.removeChild(messagesDiv.lastChild);
        renderMessage({ sender: 'ai', text: 'This is a placeholder AI response.' });
      }, 1200);
    }
  });
  chatInput.addEventListener('input', updateTokenCounter);
}

function updateTokenCounter() {
  const count = chatInput.value.length;
  tokenCounter.textContent = `${count}/4096`;
}

// Sidebar actions (placeholder)
document.querySelector('.new-chat-btn')?.addEventListener('click', () => {
  renderSampleMessages();
});

document.querySelector('.attach-btn')?.addEventListener('click', () => {
  alert('Attachment feature coming soon!');
});

// Settings (placeholder)
document.querySelector('.settings-btn')?.addEventListener('click', () => {
  alert('Settings feature coming soon!');
}); 