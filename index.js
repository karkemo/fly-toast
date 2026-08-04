/**
 * Displays a customizable toast notification.
 * 
 * @param {string} message - The text content to display in the toast.
 * @param {string} [type='info'] - Preset type ('info', 'success', 'error', 'warning').
 * @param {number} [time=3] - Display duration in seconds.
 * @param {Object} [options={}] - Extra visual & behavior options.
 * @param {string} [options.position] - Position ('top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center').
 * @param {boolean} [options.closeButton=true] - Shows an 'X' button to close manually.
 * @param {string} [options.backgroundColor] - Overrides preset background colors.
 * @returns {Function} Function to manually remove the toast early.
 */
export default function flyToast(message, type = 'info', time = 3, options = {}) {
  const existing = document.getElementById('toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toast';

  // Preset Color Palette
  const colorPresets = {
    info: '#2563eb',
    success: '#10b981',
    error: '#dc2626',
    warning: '#f59e0b'
  };

  const bgColor = options.backgroundColor || colorPresets[type] || colorPresets.info;
  const showCloseBtn = options.closeButton ?? true;

  // Check if device screen is mobile (<= 640px)
  const isMobile = window.innerWidth <= 640;

  // Position Logic:
  // Desktop Default: 'bottom-right'
  // Mobile Default: 'top-center'
  let position = options.position;
  if (!position) {
    position = isMobile ? 'top-center' : 'bottom-right';
  }

  // Layout Container (Message Text + Optional Close Button)
  const textSpan = document.createElement('span');
  textSpan.textContent = message;
  toast.appendChild(textSpan);

  // Styling Base
  Object.assign(toast.style, {
    position: 'fixed',
    padding: '12px 18px',
    borderRadius: '12px',
    color: '#ffffff',
    fontSize: '14px',
    fontFamily: 'sans-serif',
    fontWeight: '500',
    zIndex: '9999',
    boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
    backgroundColor: bgColor,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    opacity: '0',
    transform: 'scale(0.9)',
    transition: 'opacity 0.25s ease, transform 0.25s ease, bottom 0.25s ease, top 0.25s ease, left 0.25s ease, right 0.25s ease',
    maxWidth: isMobile ? 'calc(100vw - 32px)' : '400px',
    boxSizing: 'border-box'
  });

  // Position Handling
  if (position.includes('top')) {
    toast.style.top = isMobile ? '16px' : '24px';
  } else {
    toast.style.bottom = isMobile ? '16px' : '24px';
  }

  if (position.includes('center')) {
    toast.style.left = '50%';
    toast.style.right = 'auto';
    toast.style.transform = 'translateX(-50%) scale(0.9)';
  } else if (position.includes('right')) {
    toast.style.right = isMobile ? '16px' : '24px';
    toast.style.left = 'auto';
  } else if (position.includes('left')) {
    toast.style.left = isMobile ? '16px' : '24px';
    toast.style.right = 'auto';
  }

  // Close Button
  if (showCloseBtn) {
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    Object.assign(closeBtn.style, {
      background: 'transparent',
      border: 'none',
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '14px',
      cursor: 'pointer',
      padding: '0',
      lineHeight: '1',
      marginLeft: 'auto'
    });
    closeBtn.onclick = () => dismiss();
    toast.appendChild(closeBtn);
  }

  document.body.appendChild(toast);

  // Trigger Entry Animation
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    if (position.includes('center')) {
      toast.style.transform = 'translateX(-50%) scale(1)';
    } else {
      toast.style.transform = 'scale(1)';
    }
  });

  // Smooth Dismiss Function
  let timer;
  const dismiss = () => {
    clearTimeout(timer);
    toast.style.opacity = '0';
    if (position.includes('center')) {
      toast.style.transform = 'translateX(-50%) scale(0.9)';
    } else {
      toast.style.transform = 'scale(0.9)';
    }
    setTimeout(() => {
      if (toast.parentNode) toast.remove();
    }, 250);
  };

  // Auto Dismiss Timer
  const durationInMs = (typeof time === 'number' && time > 0 ? time : 3) * 1000;
  timer = setTimeout(dismiss, durationInMs);

  return dismiss;
}