// ── MENU TOGGLE ──
const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.onclick = () => {
    navLinks.classList.toggle('active');
}

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ── HEADER SCROLL + BACK TO TOP ──
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');

    if(window.scrollY > 50){
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    if(window.scrollY > 500){
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// ── TYPING EFFECT ──
const phrases = [
    "Full Stack Developer",
    "IT Consultant",
    "Problem Solver",
    "Based in Nairobi 🇰🇪"
];

let phraseIndex = 0;
let letterIndex = 0;
let isDeleting = false;
let isPausing = false;

function type() {
    const current = phrases[phraseIndex];
    const typedText = document.getElementById('typed-text');

    if(isPausing){
        isPausing = false;
        setTimeout(type, 1500);
        return;
    }

    if(isDeleting){
        typedText.textContent = current.substring(0, letterIndex - 1);
        letterIndex--;
    } else {
        typedText.textContent = current.substring(0, letterIndex + 1);
        letterIndex++;
    }

    if(!isDeleting && letterIndex === current.length){
        isPausing = true;
        isDeleting = true;
        setTimeout(type, 1800);
        return;
    }

    if(isDeleting && letterIndex === 0){
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 500);
        return;
    }

    const speed = isDeleting ? 60 : 110;
    setTimeout(type, speed);
}

type();

// ── SCROLL REVEAL ──
const revealCards = document.querySelectorAll('.grid-card, .project-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if(entry.isIntersecting){
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 150);
        }
    });
}, { threshold: 0.1 });

revealCards.forEach(card => observer.observe(card));

// ── CONTACT FORM ──
const contactForm = document.querySelector('.contact-form');
const formSuccess = document.getElementById('form-success');

if(contactForm){
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = document.getElementById('submit-btn');
        btn.textContent = 'Sending...';
        btn.disabled = true;

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if(response.ok){
                contactForm.reset();
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
            } else {
                btn.textContent = 'Send Message';
                btn.disabled = false;
                alert('Something went wrong. Please try again.');
            }
        } catch(error) {
            btn.textContent = 'Send Message';
            btn.disabled = false;
            alert('Something went wrong. Please try again.');
        }
    });
}