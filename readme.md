# 🚀 FlyToast

A lightweight, fully accessible, zero-dependency JavaScript toast notification library.

![License](https://img.shields.io/npm/l/fly-toast)
![npm version](https://img.shields.io/npm/v/fly-toast)
![bundle size](https://badgen.net/bundlephobia/minzip/fly-toast)

---

## ✨ Features

- **⚡ Zero Dependencies:** Written in pure vanilla JavaScript.
- **♿ Screen Reader Accessible:** Full WCAG/a11y support with dynamic `aria-live` roles (`assertive` for errors/warnings and `polite` for info/success) and `aria-hidden` attributes on visual elements.
- **⚙️ Global Configurations:** Set default options once for your entire app using `setDefaults()`.
- **🌙 Automatic Dark Mode:** Detects system dark mode automatically with option for manual overrides.
- **📱 Responsive:** Optimized layouts for mobile devices (`< 640px`).
- **⏸️ Pause on Hover:** Countdown timer pauses on mouse hover.
- **🛑 Manual Dismissal:** Every call returns a handle to programmatically close the toast.

---

## 📦 Installation

```bash
npm install fly-toast
```

---

## 🚀 Quick Start

### Basic Usage

```javascript
import flyToast from 'fly-toast';

// Simple toast notifications
flyToast('Changes saved successfully!', 'success');
flyToast('Connection lost', 'error');
flyToast('Please review your input', 'warning');
flyToast('New update available', 'info');
```
---

## ⚙️ Global Defaults Configuration (v2.0.0+)

Set your default configurations once at the entry point of your application:
```javascript
import flyToast, { setDefaults } from 'fly-toast';

// Configure defaults globally
setDefaults({
  duration: 4,               // Default duration in seconds
  position: 'top-right',     // Default position
  maxToasts: 5,              // Max toasts visible at once
  darkMode: false,           // Force light mode (or true for dark mode)
  closeButton: true,         // Show close button
  progressBar: true,         // Show animated progress bar
  pauseOnHover: true         // Pause timer on hover
});

// Now every call uses these global defaults unless overridden
flyToast('User logged in successfully!', 'success');
```
---

## 📖 API Reference

### flyToast(message, type, duration, options)

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **message** | string | (Required) | Text content to display inside the toast. |
| **type** | string | 'info' | Type of notification: 'info', 'success', 'error', or 'warning'. |
| **duration** | number | 3 (or global default) | Duration in seconds before auto-dismissing. |
| **options** | object | {} | Per-toast option overrides. |

---

### Options Table

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **duration** | number | 3 | Display duration in seconds. |
| **position** | string | Desktop: 'bottom-right'<br>Mobile: 'top-center' | Positions: 'top-right', 'top-left', 'top-center', 'bottom-right', 'bottom-left', 'bottom-center'. |
| **maxToasts** | number | 5 | Maximum toasts allowed concurrently in a container. |
| **closeButton** | boolean | true | Show/hide close button (✕). |
| **showIcon** | boolean | true | Show/hide type icon. |
| **progressBar** | boolean | true | Show/hide bottom progress indicator. |
| **pauseOnHover** | boolean | true | Pause countdown timer on hover. |
| **darkMode** | boolean | undefined | true (dark), false (light), or undefined (auto system setting). |
| **backgroundColor** | string | null | Custom CSS background color override. |

---

## 💡 Advanced Usage Examples

### 1. Custom Instance Override
```javascript
// Override duration and force dark mode for a critical error
flyToast('Database connection failed!', 'error', 10, {
  darkMode: true,
  position: 'top-center'
});
```
### 2. Manual Dismissal Handle
```javascript
// Show long-running toast and trigger dismissal programmatically
const dismiss = flyToast('Processing file...', 'info', 30);

// Perform async job and dismiss early
async function handleProcess() {
  await processFile();
  dismiss(); // Closes immediately
  flyToast('Processing completed!', 'success');
}
```
---

## ♿ Accessibility (a11y) Features

FlyToast includes native screen reader support out of the box:

- **Urgency ARIA Roles:** Critical alerts ('error' & 'warning') set role="alert" and aria-live="assertive" so screen readers interrupt and announce immediately. Standard notifications ('info' & 'success') use role="status" and aria-live="polite".
- **Clean Audio Markup:** Icons and progress bar elements are set to aria-hidden="true" to prevent screen readers from voicing path data or purely visual indicators.
- **Accessible Buttons:** Close buttons include explicit aria-label text for screen readers.

---

## 📄 License

[MIT](LICENSE)