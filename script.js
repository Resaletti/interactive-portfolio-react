/* ======================================================
   PORTFOLIO WEBSITE
   Renato Saletti Santos
======================================================*/

/* ======================================================
   HOME
======================================================*/

// ------------------------------------------------------
// ELEMENTS
// ------------------------------------------------------

const nav = document.querySelector("nav");

const sections = document.querySelectorAll("section[id]");

const navLinks = document.querySelectorAll(".nav-links a");

const skillFills = document.querySelectorAll(".skill-fill");

const fadeElements = document.querySelectorAll(
  ".skill-card, .project-card, .timeline-item, .highlight-item"
);

// Keep in-page anchor targets visible below the fixed navigation. Its height can
// change when navigation items wrap at narrower viewport widths.
function updateNavHeight() {
  if (!nav) return;

  document.documentElement.style.setProperty(
    "--nav-height",
    `${Math.ceil(nav.getBoundingClientRect().height)}px`
  );
}

if (nav) {
  updateNavHeight();
  window.addEventListener("resize", updateNavHeight);

  if ("ResizeObserver" in window) {
    new ResizeObserver(updateNavHeight).observe(nav);
  }

  // Browsers resolve a URL hash before this script can measure the header.
  // Align it once more after the real navigation height is available.
  if (window.location.hash) {
    const target = document.getElementById(window.location.hash.slice(1));

    if (target) {
      requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
    }
  }
}

// ------------------------------------------------------
// ACTIVE NAVIGATION
// ------------------------------------------------------

function highlightNavOnScroll() {

  if (!sections.length || !navLinks.length) return;

  const scrollY = window.scrollY;

  sections.forEach(section => {

    const sectionTop = section.offsetTop - 100;

    const sectionBottom = sectionTop + section.offsetHeight;

    const sectionId = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionBottom) {

      navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${sectionId}`) {

          link.classList.add("active");

        }

      });

    }

  });

}

window.addEventListener("scroll", highlightNavOnScroll);

// ------------------------------------------------------
// NAVBAR BACKGROUND
// ------------------------------------------------------

if (nav) {

  window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

      nav.style.background = "rgba(10,10,15,.97)";

    } else {

      nav.style.background = "rgba(10,10,15,.85)";

    }

  });

}

// ------------------------------------------------------
// SKILLS ANIMATION
// ------------------------------------------------------

if (skillFills.length) {

  const skillObserver = new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const bar = entry.target;

        const finalWidth = getComputedStyle(bar).width;

        bar.style.width = "0px";

        requestAnimationFrame(() => {

          requestAnimationFrame(() => {

            bar.style.width = finalWidth;

          });

        });

        skillObserver.unobserve(bar);

      });

    },

    {
      threshold: .35
    }

  );

  skillFills.forEach(fill => {

    skillObserver.observe(fill);

  });

}

// ------------------------------------------------------
// FADE ANIMATION
// ------------------------------------------------------

if (fadeElements.length) {

  const fadeObserver = new IntersectionObserver(

    entries => {

      entries.forEach((entry,index)=>{

        if(!entry.isIntersecting) return;

        setTimeout(()=>{

          entry.target.style.opacity="1";

          entry.target.style.transform="translateY(0)";

        },index*70);

        fadeObserver.unobserve(entry.target);

      });

    },

    {
      threshold:.15
    }

  );

  fadeElements.forEach(element=>{

    element.style.opacity="0";

    element.style.transform="translateY(18px)";

    element.style.transition=
      "opacity .55s ease, transform .55s ease";

    fadeObserver.observe(element);

  });

}

/* ======================================================
   PROJECTS
======================================================*/

document.addEventListener("DOMContentLoaded", () => {

  // Verifica se existem cards de projetos na página
  const cards = document.querySelectorAll(".showcase-card");

  if (!cards.length) return;

  // Lê o parâmetro da URL
  const params = new URLSearchParams(window.location.search);

  const category = params.get("category");

  // Se não existir categoria, mostra todos os projetos
  if (!category) {

    cards.forEach(card => {

      card.style.display = "";

    });

    return;

  }

  // Exibe apenas os projetos da categoria escolhida
  cards.forEach(card => {

    const currentCategory = card.dataset.category;

    card.style.display =
      currentCategory === category ? "" : "none";

  });

});

/* ======================================================
   PROFESSIONAL EXPERIENCE / EDUCATION
====================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Guarda os textos que aparecem quando cada botao de experiencia e clicado.
  const experienceData = {
    pm: {
      title: "Policia Militar do Estado de São Paulo",
      paragraphs: [
        "Military Police, São Paulo, Brazil   -   05/1995 to 07/2001",
        "•	Conduct visible patrols in urban and rural areas",
        "•	Prevent and combat crimes and infractions",
        "•	Respond to incidents and provide support to the public in emergency situations",
        "•	Conduct stops, searches, and arrests when necessary, within legal bounds",
        "•	Manage civil disturbances, provide security at public events, and maintain public order",
        "•	Collaborate with other security agencies and emergency services",
        "•	Prepare reports and records of incidents handled",
      ],
    },
    apm: {
      title: "APMDFESP",
      paragraphs: [
        "Administrative Manager & IT Manager, São Paulo, Brazil	  -   05/2002 to 05/2024",
        "•  Led a multidisciplinary department of 5 employees, overseeing administration, IT support, customer service, document management, and operational workflows.",
        "•  Reduced customer complaints and service response times by redesigning administrative processes and improving communication between departments.",
        "•  Implemented a complete digital document management system, converting active and archived records into electronic files, significantly improving information retrieval, security, and operational efficiency.",
        "•  Managed the organization's technology infrastructure, including Microsoft 365 administration, Windows environments, hardware lifecycle management, software deployment, vendor negotiations, and office technology.",
        "•  Served as the primary liaison between executive leadership, government agencies, vendors, customers, and internal teams, strengthening stakeholder relationships and improving organizational communication.",
        "•  Represented the organization in negotiations with the Government of the State of São Paulo, preparing technical documentation and participating in strategic meetings that resulted in securing a 50-year land lease agreement for the organization's headquarters.",
        "•  Delivered institutional and motivational presentations to audiences exceeding 5,000 active Military Police officers, increasing organizational visibility and strengthening stakeholder engagement.",
        "•  Directed logistics and technology operations for 18 para-athletes participating in national and international competitions, contributing to the organization being recognized as the Best Paralympic Club in the State of São Paulo for five consecutive years.",
        "•  Assumed the role of Financial Director during the COVID-19 pandemic, managing cash flow, bank reconciliations, accounts payable, financial reporting, and budget monitoring while increasing the organization's financial reserves by 15% during a period of economic uncertainty.",
        "•  Prepared executive reports and performance documentation to support strategic planning and operational decision-making.",
        "•  Continuously improved administrative and operational processes, increasing productivity while maintaining high standards of data accuracy and regulatory compliance.",
      ],
    },
    itau: {
      title: "Itaú Bank",
      paragraphs: [
        "Systems Analyst (Internship), São Paulo, Brazil   -	  02/2007 – 11/2007",
        "• Reverse-engineered and documented COBOL modules to support modernization of legacy systems",
        "• Ensured continuity and functionality of critical systems as the most junior team member.",
      ],
    },
    athlete: {
      title: "Athlete",
      paragraphs: [
        "After a life-changing motorcycle accident in 1998, I became a person with a disability",
        "and turned to sports as a path to recovery and resilience. What began as rehabilitation",
        "through swimming evolved into a competitive journey across multiple disciplines. As a",
        "military professional, I competed in sport shooting, achieving the title of Brazilian",
        "National Champion in 2003. However, it was in table tennis that I found my greatest",
        "achievements. Competing internationally, I represented Brazil in several countries and",
        "ranked as the second-best athlete in the nation for multiple years.",
        "This journey shaped my discipline, focus, and determination—qualities I now bring into",
        "my career in technology.This is a placeholder text about your athlete journey and discipline",
        "mindset.",
      ],
    },
    usa: {
      title: "USA",
      cards: [
        {
          title: "Immigration to the United States",
          paragraphs: [
            "In December 2023, I made one of the most important decisions of my life — I moved to Orlando,",
            "Florida, with my family to support my daughter in pursuing her dream of studying in the United States.",
            "She had arrived months earlier on her own, but the challenges of being alone in a new country",
            "began to affect her. Without hesitation, my wife and I left behind stable careers, our home,",
            "and everything we had built in Brazil to be by her side. Starting over in a new country has required",
            "resilience, adaptability, and a strong sense of purpose.",
            "As an immigrant entering the U.S. job market, I face the reality of rebuilding my professional",
            "path from the ground up. Instead of seeing this as a setback, I chose to treat it as an opportunity",
            "for growth. With a background in technology, I committed fully to transitioning into the tech industry.",
            "Since then, I have been studying consistently, building projects, and developing skills in Front-End",
            "Development and Data Analytics. This journey has reinforced what has always defined me: discipline,",
            "persistence, and the ability to adapt under pressure.",
            "I bring a unique combination of life experience, technical growth, and a relentless commitment to",
            "improvement. I am ready to contribute, learn quickly, and create value as part of a team. I am not",
            "just looking for an opportunity — I am building the skills and mindset to earn it.",
          ],
        },
      ],
    },
    College: {
      title: "Formation",
      cards: [
        {
          icon: "🎓",
          title: "BS Degree in Computer Science",
          paragraphs: [
            "University Center Sant’Anna – Brazil   -   2002 to 2008",
            "• I built a strong foundation in core computing principles and software development.",
            "During my academic journey, I developed a solid understanding of programming logic, data structures, algorithms, and system design.",
            "I also gained hands-on experience with programming languages such as Java, C, and C++, which strengthened my problem-solving and analytical thinking skills.",
            "This foundation continues to support my growth as I expand my knowledge in modern technologies, including Front-End Development and Data Analytics.",
          ],
        },
      ],
    },
    Certifications: {
      title: "Certifications",
      cards: [
        {
          icon: "📜",
          title: "Google Data Analytics Professional – Coursera",
          paragraphs: [
            "• Completed the Google Data Analytics Professional Certificate, gaining hands-on experience across the full data analysis lifecycle — from data cleaning and transformation to visualization and insight generation.",
            "Worked with tools such as SQL and spreadsheets to analyze real-world datasets and deliver clear, data-driven insights. This experience enhanced my analytical thinking and strengthened my ability to solve problems using data.",
          ],
        },
      ],
    },
    Courses: {
      title: "Courses",
      cards: [
        {
          icon: "🤖",
          title: "AI Fundamentals - IBM",
          paragraphs: [
            "Completed the AI Fundamentals: The Foundations for Understanding AI program by IBM, where I gained a solid understanding of core artificial intelligence concepts.",
            "The course covered key topics such as machine learning fundamentals, data-driven models, and real-world applications of AI. This experience provided me with a strong conceptual base to understand how intelligent systems are built and applied across industries.",
          ],
        },
        {
          icon: "🐍",
          title: "Python Language Fundamentals - Data Science Academy",
          paragraphs: [
            "Completed the Python Language Fundamentals course, focusing on building a strong programming foundation for data analysis and AI applications.",
            "Developed skills in data structures, control flow, and problem-solving using Python, along with practical applications for data manipulation and automation. This course strengthened my ability to work with data programmatically.",
          ],
        },
        {
          icon: "📊",
          title:
            "Fundamentals of Data Science & Artificial Intelligence - Data Science Academy",
          paragraphs: [
            "Completed the Fundamentals of Data Science & Artificial Intelligence program, gaining an overview of data-driven methodologies and AI concepts.",
            "Learned how to approach real-world problems using data analysis, statistical thinking, and basic machine learning principles. This course enhanced my ability to connect data insights with business and technical decisions.",
          ],
        },
        {
          icon: "📈",
          title:
            "Microsoft Power BI for Business Intelligence and Data Science",
          paragraphs: [
            "Completed training in Microsoft Power BI for Business Intelligence and Data Science, focusing on transforming data into meaningful visual insights.",
            "Developed skills in building interactive dashboards, data modeling, and creating reports to support business intelligence and data-driven decision-making.",
          ],
        },
      ],
    },
    Skills: {
      title: "Skills",
      cards: [
        {
          icon: "📊",
          title: "Technical Skills",
          paragraphs: [
            "•	Data & BI Tools: Power BI, Tableau, Excel (Advanced), SQL, R, Dashboard creation, Data Cleaning & Transformation, Data Visualization, Statistical Analysis, Machine Learning Concepts",
            "•	Programming: Python, JavaScript, C, C++ , HTML, CSS",
            "•	AWS (Cloud Fundamentals, S3, EC2, IAM, RDS)",
            "•	IT & Systems: Windows OS, Microsoft 365, Networking Fundamentals (DNS, DHCP, Wi-Fi)",
            "•	Design & Multimedia: Photoshop, Illustrator, InDesign, Premiere Pro, Canva, Figma, React.js, GitHub",
            "•  Technical Support & Help Desk: Windows 10/11 Administration, PC Hardware Installation & Troubleshooting, Desktop & Laptop Maintenance, Microsoft 365 & Office Suite, Printer & Peripheral Support, Network Fundamentals (TCP/IP, DNS, DHCP), Software Installation & Configuration, User Account Management",
            "•	Other: IT troubleshooting, Customer Service, Documentation, User Onboarding, Administrative Support",
          ],
        },
      ],
    },
  };

  // Procura no HTML a folha que abre na parte inferior da tela.
  const sheet = document.getElementById("infoSheet");

  // Procura no HTML o titulo que sera preenchido dentro da folha.
  const sheetTitle = document.getElementById("sheetTitle");

  // Procura no HTML a area onde os paragrafos serao criados.
  const sheetContent = document.getElementById("sheetContent");

  // Procura no HTML o botao usado para fechar a folha.
  const closeSheet = document.getElementById("closeSheet");

  // Procura todos os botoes que possuem o atributo data-section.
  const buttons = document.querySelectorAll("[data-section]");

  // Interrompe o script nesta pagina se os elementos da folha nao existirem.
  if (!sheet || !sheetTitle || !sheetContent) {
    return;
  }

  // Abre a folha e mostra as informacoes da experiencia escolhida.
  function openSheet(sectionId) {
    // Pega os dados da experiencia usando o id recebido pelo botao.
    const section = experienceData[sectionId];

    // Para a funcao se nao existir conteudo para o botao clicado.
    if (!section) {
      return;
    }

    // Coloca o titulo correto dentro da folha.
    sheetTitle.textContent = section.title;

    // Limpa o conteudo antigo antes de inserir o novo.
    sheetContent.innerHTML = "";

    if (section.cards) {
      section.cards.forEach((cardData) => {
        const card = document.createElement("article");
        card.classList.add("course-card");

        const text = document.createElement("div");
        text.classList.add("course-card-text");

        const title = document.createElement("h3");
        title.textContent = cardData.title;
        text.appendChild(title);

        cardData.paragraphs.forEach((paragraphText) => {
          const paragraph = document.createElement("p");
          paragraph.textContent = paragraphText;
          text.appendChild(paragraph);
        });

        if (cardData.icon) {
          const icon = document.createElement("span");
          icon.classList.add("course-card-icon");

          if (cardData.icon.includes("/")) {
            const iconImage = document.createElement("img");
            iconImage.src = cardData.icon;
            iconImage.alt = "";
            icon.appendChild(iconImage);
          } else {
            icon.textContent = cardData.icon;
          }

          card.appendChild(icon);
        }

        card.appendChild(text);
        sheetContent.appendChild(card);
      });
    }

    // Cria um paragrafo para cada linha de texto da experiencia.
    section.paragraphs?.forEach((paragraphText) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = paragraphText;
      sheetContent.appendChild(paragraph);
    });

    // Adiciona a classe que deixa a folha visivel.
    sheet.classList.add("open");

    // Atualiza o atributo de acessibilidade informando que a folha esta visivel.
    sheet.setAttribute("aria-hidden", "false");
  }

  // Fecha a folha de informacoes.
  function hideSheet() {
    // Remove a classe que deixa a folha visivel.
    sheet.classList.remove("open");

    // Atualiza o atributo de acessibilidade informando que a folha esta escondida.
    sheet.setAttribute("aria-hidden", "true");
  }

  // Adiciona o clique em cada botao lateral de experiencia.
buttons.forEach((button) => {

    button.addEventListener("click", () => {

        // Remove o estado ativo de todos os botões
        buttons.forEach(btn => {

            btn.classList.remove("active");

        });

        // Ativa apenas o botão clicado
        button.classList.add("active");

        // Abre o conteúdo correspondente
        openSheet(button.dataset.section);

    });

});

  // Adiciona o clique no botao de fechar, se ele existir.
  if (closeSheet) {
    closeSheet.addEventListener("click", hideSheet);
  }

  // Permite fechar a folha apertando a tecla Escape.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      hideSheet();
    }
  });
});

/* ======================================================
   CONTACT
====================================================== */
