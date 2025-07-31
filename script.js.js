document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const themeToggle = document.querySelector('#theme-toggle');
  const html = document.documentElement;
  const connectMetamask = document.querySelector('#connect-metamask');

  // Set theme based on localStorage or system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    html.setAttribute('data-theme', 'dark');
  }

  // Hamburger menu toggle
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Theme toggle with click event
  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // MetaMask connect
  connectMetamask.addEventListener('click', async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        alert(`Connected: ${accounts[0]}`);
      } catch (error) {
        alert('Failed to connect to MetaMask. Please ensure it’s installed and unlocked.');
        console.error(error);
      }
    } else {
      alert('Please install MetaMask to connect your wallet.');
    }
  });

  // Smooth scrolling for nav links
  document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
      if (window.innerWidth <= 768) {
        navLinks.classList.remove('active');
      }
      this.blur();
    });
  });
});