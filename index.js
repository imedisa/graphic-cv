const defaultConfig = {
      background_color: '#1a0033',
      surface_color: '#000000',
      text_color: '#FFFFFF',
      primary_action_color: '#FF2E9A',
      secondary_action_color: '#B695FF',
      font_family: 'Inter',
      font_size: 16,
      hero_headline: 'Visual Content that Pops.',
      hero_subline: 'I design trend-led graphics and short-form videos for startups and creators.',
      about_text: "I'm a creative content designer with a passion for crafting standout visuals for brands in Web3 and beyond. My strengths include high learning ability, creativity, teamwork, marketing collaboration, and staying ahead of trends. I thrive in fast-paced environments and love bringing ideas to life through compelling visual storytelling.",
      contact_tagline: 'Available for hybrid internships & collabs.'
    };

    async function onConfigChange(config) {
      const backgroundColor = config.background_color || defaultConfig.background_color;
      const surfaceColor = config.surface_color || defaultConfig.surface_color;
      const textColor = config.text_color || defaultConfig.text_color;
      const primaryActionColor = config.primary_action_color || defaultConfig.primary_action_color;
      const secondaryActionColor = config.secondary_action_color || defaultConfig.secondary_action_color;
      const fontFamily = config.font_family || defaultConfig.font_family;
      const fontSize = config.font_size || defaultConfig.font_size;

      // Apply background gradient
      document.body.style.background = `linear-gradient(135deg, ${backgroundColor} 0%, #2d1b69 25%, #4a0e4e 50%, #6A00FF 75%, ${primaryActionColor} 100%)`;
      document.body.style.backgroundAttachment = 'fixed';

      // Apply font family
      const fontStack = `${fontFamily}, Inter, sans-serif`;
      document.body.style.fontFamily = fontStack;

      // Apply font sizes proportionally
      document.querySelectorAll('.hero h1').forEach(el => {
        el.style.fontSize = `${fontSize * 2.8}px`;
      });
      document.querySelectorAll('.hero p').forEach(el => {
        el.style.fontSize = `${fontSize * 1.4}px`;
      });
      document.querySelectorAll('.section-title').forEach(el => {
        el.style.fontSize = `${fontSize * 1.875}px`;
      });
      document.querySelectorAll('.service-title, .work-title').forEach(el => {
        el.style.fontSize = `${fontSize * 1.4}px`;
      });
      document.querySelectorAll('body, p, li').forEach(el => {
        el.style.fontSize = `${fontSize}px`;
      });

      // Apply text color
      document.querySelectorAll('.work-info, .testimonial-text, .case-study p').forEach(el => {
        el.style.color = textColor;
      });

      // Apply surface color to cards
      document.querySelectorAll('.work-info').forEach(el => {
        el.style.background = `rgba(0, 0, 0, 0.3)`;
        el.style.backdropFilter = 'blur(15px)';
        el.style.webkitBackdropFilter = 'blur(15px)';
      });

      // Apply primary action color to buttons and gradients
      document.querySelectorAll('.btn-primary, .submit-btn, .service-cta').forEach(el => {
        el.style.background = `linear-gradient(135deg, ${backgroundColor} 0%, ${primaryActionColor} 100%)`;
      });

      // Apply secondary action color to secondary buttons
      document.querySelectorAll('.btn-secondary, .nav-cta, .filter-btn, .social-link').forEach(el => {
        el.style.background = `rgba(${parseInt(secondaryActionColor.slice(1,3), 16)}, ${parseInt(secondaryActionColor.slice(3,5), 16)}, ${parseInt(secondaryActionColor.slice(5,7), 16)}, 0.2)`;
      });

      // Update editable text content
      const heroHeadline = document.getElementById('hero-headline');
      if (heroHeadline) {
        heroHeadline.textContent = config.hero_headline || defaultConfig.hero_headline;
      }

      const heroSubline = document.getElementById('hero-subline');
      if (heroSubline) {
        heroSubline.textContent = config.hero_subline || defaultConfig.hero_subline;
      }

      const aboutText = document.getElementById('about-text');
      if (aboutText) {
        aboutText.textContent = config.about_text || defaultConfig.about_text;
      }

      const contactTagline = document.getElementById('contact-tagline');
      if (contactTagline) {
        contactTagline.textContent = config.contact_tagline || defaultConfig.contact_tagline;
      }
    }

    function mapToCapabilities(config) {
      return {
        recolorables: [
          {
            get: () => config.background_color || defaultConfig.background_color,
            set: (value) => {
              config.background_color = value;
              if (window.elementSdk) {
                window.elementSdk.setConfig({ background_color: value });
              }
            }
          },
          {
            get: () => config.surface_color || defaultConfig.surface_color,
            set: (value) => {
              config.surface_color = value;
              if (window.elementSdk) {
                window.elementSdk.setConfig({ surface_color: value });
              }
            }
          },
          {
            get: () => config.text_color || defaultConfig.text_color,
            set: (value) => {
              config.text_color = value;
              if (window.elementSdk) {
                window.elementSdk.setConfig({ text_color: value });
              }
            }
          },
          {
            get: () => config.primary_action_color || defaultConfig.primary_action_color,
            set: (value) => {
              config.primary_action_color = value;
              if (window.elementSdk) {
                window.elementSdk.setConfig({ primary_action_color: value });
              }
            }
          },
          {
            get: () => config.secondary_action_color || defaultConfig.secondary_action_color,
            set: (value) => {
              config.secondary_action_color = value;
              if (window.elementSdk) {
                window.elementSdk.setConfig({ secondary_action_color: value });
              }
            }
          }
        ],
        borderables: [],
        fontEditable: {
          get: () => config.font_family || defaultConfig.font_family,
          set: (value) => {
            config.font_family = value;
            if (window.elementSdk) {
              window.elementSdk.setConfig({ font_family: value });
            }
          }
        },
        fontSizeable: {
          get: () => config.font_size || defaultConfig.font_size,
          set: (value) => {
            config.font_size = value;
            if (window.elementSdk) {
              window.elementSdk.setConfig({ font_size: value });
            }
          }
        }
      };
    }

    function mapToEditPanelValues(config) {
      return new Map([
        ['hero_headline', config.hero_headline || defaultConfig.hero_headline],
        ['hero_subline', config.hero_subline || defaultConfig.hero_subline],
        ['about_text', config.about_text || defaultConfig.about_text],
        ['contact_tagline', config.contact_tagline || defaultConfig.contact_tagline]
      ]);
    }

    // Initialize SDK
    if (window.elementSdk) {
      window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities,
        mapToEditPanelValues
      });
    }

    // Work filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workCards = document.querySelectorAll('.work-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        workCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // Modal functionality
    const modal = document.getElementById('caseStudyModal');
    const modalClose = document.getElementById('modalClose');

    workCards.forEach(card => {
      card.addEventListener('click', () => {
        modal.classList.add('active');
      });
    });

    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      
      // Show success message
      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Message Sent! ✓';
      submitBtn.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
      
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        contactForm.reset();
      }, 3000);
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
(function () {
  function c() {
    var b = a.contentDocument || a.contentWindow.document;
    if (b) {
      var d = b.createElement("script");
      d.innerHTML =
        "window.__CF$cv$params={r:'999c0c38d113dcac',t:'MTc2MjM0MjUyNy4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
      b.getElementsByTagName("head")[0].appendChild(d);
    }
  }
  if (document.body) {
    var a = document.createElement("iframe");
    a.height = 1;
    a.width = 1;
    a.style.position = "absolute";
    a.style.top = 0;
    a.style.left = 0;
    a.style.border = "none";
    a.style.visibility = "hidden";
    document.body.appendChild(a);
    if ("loading" !== document.readyState) c();
    else if (window.addEventListener)
      document.addEventListener("DOMContentLoaded", c);
    else {
      var e = document.onreadystatechange || function () {};
      document.onreadystatechange = function (b) {
        e(b);
        "loading" !== document.readyState &&
          ((document.onreadystatechange = e), c());
      };
    }
  }
  
})();
