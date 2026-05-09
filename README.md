# Ryan Shuma — Developer Portfolio

My personal portfolio. Built from scratch — no templates, no site builders. Showcases my projects, work experience and technical stack.

## Live
https://shumer61.github.io/Portfolio/

## What's In It

- **About** — who I am, what I build, what I'm looking for
- **Skills** — my current technical stack
- **Experience** — REREC and Ricosam Engineering work history
- **Projects** — live full stack projects with GitHub links
- **Contact** — Formspree-powered contact form
- **Code Peek** — slide-in panel showing real code from each section

## Built With
- HTML5
- CSS3 — custom dark theme with glassmorphism
- JavaScript — no frameworks
- Font Awesome 6.5.0
- Google Fonts — DM Sans and DM Serif Display
- Formspree — contact form handling
- GitHub Pages — deployment

## Features

**Typing effect** — cycles through role descriptions using a recursive setTimeout approach. Each call adds or removes one character then schedules the next, creating the illusion of live typing.

**Scroll reveal** — IntersectionObserver fires when cards enter the viewport. Each card starts invisible and shifted down 24px. The visible class triggers a CSS transition that fades and lifts them into position with a staggered delay.

**Code Peek panel** — slides in from the right on button click. Shows the actual code behind each section with a description. Closes on Escape or overlay click.

**Contact form** — intercepts default submit with e.preventDefault(), sends data to Formspree via fetch, hides the form and shows a success message on completion.

## Running Locally

Clone the repo and open with Live Server in VS Code or any local server:

```bash
git clone https://github.com/Shumer61/Portfolio.git
cd Portfolio
```

Open `index.html` with VS Code Live Server or:

```bash
npx serve .
```

## Projects Featured
- [Ricosam Engineering Form](https://github.com/Shumer61/ricosam) — client project, live
- [Chef Veronica Portfolio](https://github.com/Shumer61/Chef-Veronica) — freelance client project, live
- [Expense Tracker](https://github.com/Shumer61/expense-tracker) — full stack, React + Node + MongoDB
- [SmartSeason](https://github.com/Shumer61/smartseason) — full stack, role-based system with AI integration

## Author
Ryan Shuma — [GitHub](https://github.com/Shumer61) — [LinkedIn](https://www.linkedin.com/in/ryan-shuma-9714712ab/)
