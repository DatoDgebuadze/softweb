(() => {
  const MOBILE_BREAKPOINT = 960;
  const LANGUAGE_STORAGE_KEY = "softon_language";
  const header = document.querySelector("header");
  const menuToggle = document.querySelector(".menu-toggle");
  const langToggle = document.querySelector(".lang-toggle");

  const translations = {
    en: {
      switch_language: "Switch language",
      nav_services: "Services",
      nav_projects: "Projects",
      nav_about: "About",
      nav_contact: "Contact Us",
      footer_services_title: "Services",
      footer_projects_title: "Projects",
      footer_about_title: "About us",
      footer_web_dev: "Web development",
      footer_mobile_dev: "Mobile app development",
      footer_design: "Digital product designs",
      footer_mvp: "MVP development",
      footer_custom: "Custom Software development",
      footer_support: "Long-Term Support",
      footer_healthcare: "Healthcare Industry",
      footer_fintech: "Fintech Website",
      footer_furniture: "E-Commerce Furniture shop",
      footer_burger: "Burger Bar Website",
      footer_crm: "Gym CRM system",
      footer_educity: "Educity - Educational center",
      footer_about_company: "About the company",
      footer_company_mission: "Company Mission",
      footer_our_vision: "Our Vision",
      footer_team: "Team",
      copyright: "2026 (©) All Rights Reserved",
      home_hero_title: "Turning idea into living software",
      home_hero_subtitle:
        "From concept to launch, we craft software that evolves and delivers real value",
      home_hero_cta: "Request a consultation",
      home_offer_title: "What We Offer",
      home_offer_subtitle:
        "We help businesses turn ideas into reliable, scalable, and user-friendly digital products.",
      offer_web_title: "Web Development",
      offer_web_desc:
        "Fast, responsive, and modern websites built for performance, accessibility, and scalability.",
      offer_mobile_title: "Mobile App Development",
      offer_mobile_desc:
        "Intuitive mobile apps for iOS and Android with smooth performance and user-focused design.",
      offer_design_title: "Digital Product Designs",
      offer_design_desc:
        "Clean, intuitive interfaces designed to improve usability, engagement, and user satisfaction.",
      offer_mvp_title: "MVP Development",
      offer_mvp_desc:
        "Rapid MVP development to validate ideas, gather feedback, and launch faster.",
      offer_custom_title: "Custom Software Development",
      offer_custom_desc:
        "Custom software solutions aligned with your business goals, workflows, and growth plans.",
      offer_support_title: "Long-Term Support",
      offer_support_desc:
        "Reliable maintenance, monitoring, and continuous improvements to keep your product running smoothly.",
      stats_successful_projects: "Successful Projects",
      stats_satisfied_clients: "Satisfied Clients",
      stats_team_members: "Team Members",
      stats_partners: "Partners",
      services_how_title: "How We Work",
      services_how_subtitle: "From Idea to Launch, Step by Step",
      services_how_desc:
        "We turn your vision into reality through a proven development process. Each phase builds on the last to deliver software that truly fits your needs.",
      services_faq_title: "Frequently Asked Questions",
      projects_hero_title_prefix: "We build software that",
      projects_hero_title_highlight: "drives growth",
      projects_hero_subtext:
        "From visionary startups to enterprise leaders, we engineer robust, scalable, and beautiful digital products that define the industries.",
      projects_hero_cta: "Start Your Project ->",
      projects_featured_title: "Featured Works",
      project1_title: "Healthcare Industry",
      project1_desc:
        "A secure and scalable healthcare platform designed for clinics and medical centers. The system includes appointment scheduling, patient record management, and real-time communication between doctors and patients, ensuring data privacy and seamless user experience.",
      project2_title: "Fintech Industry",
      project2_desc:
        "A modern fintech web application built for secure digital transactions and financial analytics. The platform provides real-time payment processing, user dashboards, transaction history tracking, and advanced data visualization tools for smarter financial decision-making.",
      project3_title: "E-Commerce Furniture shop",
      project3_desc:
        "A fully responsive e-commerce platform for a furniture retailer, featuring product filtering, secure checkout, inventory management, and an intuitive admin dashboard. Designed to deliver a smooth shopping experience across all devices.",
      project4_title: "Burger Bar",
      project4_desc:
        "A dynamic website and online ordering system for a local burger restaurant. The platform includes digital menu management, table reservations, order tracking, and an integrated payment system to enhance customer convenience and engagement.",
      project5_title: "CRM System",
      project5_desc:
        "A custom-built CRM system designed to streamline customer management, sales tracking, and internal team collaboration. The solution offers role-based access control, reporting tools, and workflow automation to improve operational efficiency.",
      project6_title: "Educity - Educational Center",
      project6_desc:
        "A comprehensive educational management platform for training centers and institutions. The system supports course management, student enrollment, attendance tracking, and performance reporting through a user-friendly administrative interface.",
      project_cta_view: "View Project",
      about_title: "About Softon",
      about_intro_p1:
        "Softon is a full-cycle software development company helping startups and enterprises turn ideas into powerful digital products.",
      about_intro_p2:
        "Our team combines engineering excellence, product thinking and modern technologies to build scalable, secure and high-performance systems.",
      about_intro_p3:
        "We focus on long-term partnerships, clean architecture and delivering solutions that grow with your business.",
      about_mission_title: "Our Mission",
      about_mission_desc:
        "To deliver reliable and innovative software solutions that empower businesses to grow faster and operate smarter.",
      about_vision_title: "Our Vision",
      about_vision_desc:
        "To become a trusted global technology partner known for its engineering excellence, transparency and long-term support.",
      about_values_title: "Our Core Values",
      about_value1_title: "Quality First",
      about_value1_desc:
        "We never compromise on clean code, scalable architecture and best practices.",
      about_value2_title: "Transparency",
      about_value2_desc:
        "Clear communication and honest reporting throughout every project.",
      about_value3_title: "Innovation",
      about_value3_desc:
        "Modern technologies and forward-thinking engineering solutions.",
      about_value4_title: "Client Partnership",
      about_value4_desc:
        "We build long-term relationships and treat every project as our own.",
      about_team_title: "Meet Our Team",
      team_member1_name: "Not disclosed for now",
      team_member2_name: "Not disclosed for now",
      contact_title: "Contact Us",
      contact_subtitle:
        "Tell us about your idea, project, or challenge - our team will get back to you shortly.",
      contact_location_label: "Location:",
      contact_phone_label: "Phone:",
      contact_email_label: "Email:",
      contact_hours_label: "Working hours:",
      contact_hours_value: "Mon - Fri, 10:00 - 18:00",
      contact_form_title: "Send us a message",
      contact_placeholder_name: "*Name",
      contact_placeholder_phone: "*Phone number",
      contact_placeholder_email: "*you@example.com",
      contact_placeholder_company: "Company (Optional)",
      contact_placeholder_message: "Your message (Optional)",
      contact_send_btn: "Send message",
      contact_why_title: "Why Work With Softon?",
      contact_why_fast: "Quick response times",
      contact_why_clear: "Transparent communication",
      contact_why_experienced: "Experienced engineering team",
      contact_why_support: "Long-term product support",
      cookie_title: "Cookie Preferences",
      cookie_message:
        "We use cookies to remember your language preference and improve your browsing experience.",
      cookie_manage: "Manage preferences",
      cookie_accept: "Accept",
      cookie_reject: "Reject",
      our_partner:"Our Partners"
    },
    ka: {
      switch_language: "ენის შეცვლა",
      nav_services: "სერვისები",
      nav_projects: "პროექტები",
      nav_about: "ჩვენ შესახებ",
      nav_contact: "დაგვიკავშირდით",
      footer_services_title: "სერვისები",
      footer_projects_title: "პროექტები",
      footer_about_title: "ჩვენ შესახებ",
      footer_web_dev: "ვებ დეველოპმენტი",
      footer_mobile_dev: "მობაილ აპების განვითარება",
      footer_design: "ციფრული პროდუქტის დიზაინი",
      footer_mvp: "MVP განვითარება",
      footer_custom: "ინდივიდუალური პროგრამული უზრუნველყოფა",
      footer_support: "გრძელვადიანი მხარდაჭერა",
      footer_healthcare: "ჯანდაცვის ინდუსტრია",
      footer_fintech: "ფინტექ ვებსაიტი",
      footer_furniture: "ავეჯის E-Commerce მაღაზია",
      footer_burger: "ბურგერ ბარის ვებსაიტი",
      footer_crm: "სპორტდარბაზის CRM სისტემა",
      footer_educity: "Educity - საგანმანათლებლო ცენტრი",
      footer_about_company: "კომპანიის შესახებ",
      footer_company_mission: "კომპანიის მისია",
      footer_our_vision: "ჩვენი ხედვა",
      footer_team: "გუნდი",
      copyright: "2026 (©) ყველა უფლება დაცულია",
      home_hero_title: "იდეას ვაქცევთ ცოცხალ პროგრამულ პროდუქტად",
      home_hero_subtitle:
        "კონცეფციიდან გაშვებამდე ვქმნით პროგრამულ პროდუქტს, რომელიც ვითარდება და რეალურ ღირებულებას ქმნის",
      home_hero_cta: "კონსულტაციის მოთხოვნა",
      home_offer_title: "რას გთავაზობთ",
      home_offer_subtitle:
        "ვეხმარებით ბიზნესებს იდეების საიმედო, მასშტაბირებად და მომხმარებელზე მორგებულ ციფრულ პროდუქტებად ქცევაში.",
      offer_web_title: "ვებ დეველოპმენტი",
      offer_web_desc:
        "სწრაფი, რესპონსიული და თანამედროვე ვებსაიტები, შექმნილი წარმადობის, ხელმისაწვდომობისა და მასშტაბირებისთვის.",
      offer_mobile_title: "მობაილ აპების განვითარება",
      offer_mobile_desc:
        "ინტუიციური iOS და Android აპები სტაბილური მუშაობით და მომხმარებელზე ორიენტირებული დიზაინით.",
      offer_design_title: "ციფრული პროდუქტის დიზაინი",
      offer_design_desc:
        "სუფთა და ინტუიციური ინტერფეისები, რომლებიც აუმჯობესებს გამოყენებადობას, ჩართულობას და კმაყოფილებას.",
      offer_mvp_title: "MVP განვითარება",
      offer_mvp_desc:
        "სწრაფი MVP განვითარება იდეის ვალიდაციისთვის, უკუკავშირის მისაღებად და სწრაფი გაშვებისთვის.",
      offer_custom_title: "ინდივიდუალური პროგრამული უზრუნველყოფა",
      offer_custom_desc:
        "ინდივიდუალური პროგრამული გადაწყვეტები, თქვენი ბიზნეს მიზნებსა და პროცესებზე მორგებული.",
      offer_support_title: "გრძელვადიანი მხარდაჭერა",
      offer_support_desc:
        "სანდო მოვლა, მონიტორინგი და უწყვეტი გაუმჯობესება, რომ თქვენი პროდუქტი გამართულად მუშაობდეს.",
      stats_successful_projects: "წარმატებული პროექტები",
      stats_satisfied_clients: "კმაყოფილი კლიენტები",
      stats_team_members: "გუნდის წევრები",
      stats_partners: "პარტნიორები",
      services_how_title: "როგორ ვმუშაობთ",
      services_how_subtitle: "იდეიდან გაშვებამდე, ეტაპობრივად",
      services_how_desc:
        "თქვენს ხედვას ვაქცევთ რეალობად დადასტურებული განვითარების პროცესით. თითოეული ეტაპი ეფუძნება წინა ეტაპს, რათა მივიღოთ თქვენი საჭიროებებისთვის ზუსტად მორგებული პროგრამა.",
      services_faq_title: "ხშირად დასმული კითხვები",
      projects_hero_title_prefix: "ვქმნით პროგრამულ პროდუქტს, რომელიც",
      projects_hero_title_highlight: "ზრდას აჩქარებს",
      projects_hero_subtext:
        "ვიზიონერი სტარტაპებიდან მსხვილ კომპანიებამდე, ვქმნით მტკიცე, მასშტაბირებად და გამორჩეულ ციფრულ პროდუქტებს.",
      projects_hero_cta: "დაიწყეთ თქვენი პროექტი ->",
      projects_featured_title: "რჩეული ნამუშევრები",
      project1_title: "ჯანდაცვის ინდუსტრია",
      project1_desc:
        "უსაფრთხო და მასშტაბირებადი ჯანდაცვის პლატფორმა კლინიკებისა და სამედიცინო ცენტრებისთვის. სისტემა მოიცავს ვიზიტების დაგეგმვას, პაციენტების ჩანაწერების მართვას და ექიმებსა და პაციენტებს შორის რეალურ დროში კომუნიკაციას, მონაცემთა დაცვით და გამართული მომხმარებლის გამოცდილებით.",
      project2_title: "ფინტექ ინდუსტრია",
      project2_desc:
        "თანამედროვე ფინტექ ვებ აპლიკაცია, შექმნილი უსაფრთხო ციფრული ტრანზაქციებისა და ფინანსური ანალიტიკისთვის. პლატფორმა უზრუნველყოფს რეალურ დროში გადახდების დამუშავებას, მომხმარებლის პანელებს, ტრანზაქციების ისტორიის მონიტორინგს და მოწინავე მონაცემთა ვიზუალიზაციას უკეთესი ფინანსური გადაწყვეტილებებისთვის.",
      project3_title: "E-Commerce ავეჯის მაღაზია",
      project3_desc:
        "სრულად რესპონსიული e-commerce პლატფორმა ავეჯის რითეილერისთვის, პროდუქტის ფილტრაციით, უსაფრთხო გადახდით, მარაგების მართვით და ინტუიციური ადმინ პანელით. შექმნილია ყველა მოწყობილობაზე გლუვი შოპინგ გამოცდილების მისაღებად.",
      project4_title: "ბურგერ ბარი",
      project4_desc:
        "დინამიკური ვებსაიტი და ონლაინ შეკვეთის სისტემა ადგილობრივი ბურგერ რესტორნისთვის. პლატფორმა მოიცავს ციფრული მენიუს მართვას, მაგიდების დაჯავშნას, შეკვეთების ტრეკინგს და ინტეგრირებულ გადახდის სისტემას მომხმარებლის კომფორტისა და ჩართულობის გასაზრდელად.",
      project5_title: "CRM სისტემა",
      project5_desc:
        "ინდივიდუალურად შექმნილი CRM სისტემა, რომელიც ამარტივებს კლიენტების მართვას, გაყიდვების ტრეკინგს და შიდა გუნდურ თანამშრომლობას. გადაწყვეტა მოიცავს როლებზე დაფუძნებულ წვდომას, რეპორტინგის ინსტრუმენტებს და სამუშაო პროცესების ავტომატიზაციას ოპერაციული ეფექტიანობის გასაუმჯობესებლად.",
      project6_title: "Educity - საგანმანათლებლო ცენტრი",
      project6_desc:
        "სრულყოფილი საგანმანათლებლო მართვის პლატფორმა სასწავლო ცენტრებისთვის და დაწესებულებებისთვის. სისტემა უზრუნველყოფს კურსების მართვას, სტუდენტების რეგისტრაციას, დასწრების ტრეკინგს და პროგრესის რეპორტინგს მომხმარებელზე მორგებული ადმინისტრაციული ინტერფეისით.",
      project_cta_view: "პროექტის ნახვა",
      about_title: "Softon-ის შესახებ",
      about_intro_p1:
        "Softon არის სრული ციკლის პროგრამული განვითარების კომპანია, რომელიც სტარტაპებსა და ბიზნესებს ეხმარება იდეების ძლიერ ციფრულ პროდუქტებად გარდაქმნაში.",
      about_intro_p2:
        "ჩვენი გუნდი აერთიანებს საინჟინრო სრულყოფილებას, პროდუქტის ხედვას და თანამედროვე ტექნოლოგიებს, რათა შექმნას მასშტაბირებადი, უსაფრთხო და მაღალი წარმადობის სისტემები.",
      about_intro_p3:
        "ჩვენი ფოკუსია გრძელვადიანი პარტნიორობა, სუფთა არქიტექტურა და ისეთი გადაწყვეტილებები, რომლებიც თქვენს ბიზნესთან ერთად იზრდება.",
      about_mission_title: "ჩვენი მისია",
      about_mission_desc:
        "ვქმნათ სანდო და ინოვაციური პროგრამული გადაწყვეტილებები, რომლებიც ბიზნესებს ეხმარება უფრო სწრაფად გაიზარდონ და უფრო ეფექტურად იმუშაონ.",
      about_vision_title: "ჩვენი ხედვა",
      about_vision_desc:
        "გავხდეთ სანდო გლობალური ტექნოლოგიური პარტნიორი, რომელიც ცნობილია საინჟინრო სრულყოფილებით, გამჭვირვალობით და გრძელვადიანი მხარდაჭერით.",
      about_values_title: "ჩვენი ძირითადი ღირებულებები",
      about_value1_title: "ხარისხი უპირველესად",
      about_value1_desc:
        "ჩვენ არასდროს ვთმობთ სუფთა კოდის, მასშტაბირებადი არქიტექტურისა და საუკეთესო პრაქტიკების სტანდარტს.",
      about_value2_title: "გამჭვირვალობა",
      about_value2_desc:
        "მკაფიო კომუნიკაცია და გულწრფელი რეპორტინგი თითოეულ პროექტში.",
      about_value3_title: "ინოვაცია",
      about_value3_desc:
        "თანამედროვე ტექნოლოგიები და წინმსწრები საინჟინრო გადაწყვეტილებები.",
      about_value4_title: "კლიენტთან პარტნიორობა",
      about_value4_desc:
        "ვქმნით გრძელვადიან ურთიერთობებს და თითოეულ პროექტს საკუთარად ვუდგებით.",
      about_team_title: "გაიცანით ჩვენი გუნდი",
      team_member1_name: "ამ ეტაპზე არ არის გამჟღავნებული",
      team_member2_name: "ამ ეტაპზე არ არის გამჟღავნებული",
      contact_title: "დაგვიკავშირდით",
      contact_subtitle:
        "მოგვწერეთ თქვენი იდეის, პროექტის ან გამოწვევის შესახებ - ჩვენი გუნდი მალე დაგიბრუნდებათ.",
      contact_location_label: "მისამართი:",
      contact_phone_label: "ტელეფონი:",
      contact_email_label: "ელ. ფოსტა:",
      contact_hours_label: "სამუშაო საათები:",
      contact_hours_value: "ორშ - პარ, 10:00 - 18:00",
      contact_form_title: "მოგვწერეთ შეტყობინება",
      contact_placeholder_name: "*სახელი",
      contact_placeholder_phone: "*ტელეფონის ნომერი",
      contact_placeholder_email: "*you@example.com",
      contact_placeholder_company: "კომპანია (არასავალდებულო)",
      contact_placeholder_message: "თქვენი შეტყობინება (არასავალდებულო)",
      contact_send_btn: "გაგზავნა",
      contact_why_title: "რატომ უნდა ითანამშრომლოთ Softon-თან?",
      contact_why_fast: "სწრაფი გამოხმაურება",
      contact_why_clear: "გამჭვირვალე კომუნიკაცია",
      contact_why_experienced: "გამოცდილი საინჟინრო გუნდი",
      contact_why_support: "პროდუქტის გრძელვადიანი მხარდაჭერა",
      cookie_title: "ქუქის პრეფერენციები",
      cookie_message:
        "ვიყენებთ ქუქიებს ენის არჩევანის დასამახსოვრებლად და გამოცდილების გასაუმჯობესებლად.",
      cookie_manage: "პრეფერენციების მართვა",
      cookie_accept: "დათანხმება",
      cookie_reject: "უარყოფა",
      our_partner:"ჩვენი პარტნიორები"
    }
  };

  const enServiceTranslations = {
    services_card_web_title: "Web development",
    services_card_web_desc:
      "We build custom websites that are tailored to your business needs. We use the latest technologies and best practices to ensure that your website is fast, secure, and easy to use.",
    services_card_mobile_title: "Mobile App development",
    services_card_mobile_desc:
      "We build custom mobile apps that are tailored to your business needs. We use the latest technologies and best practices to ensure that your app is fast, secure, and easy to use.",
    services_card_design_title: "Digital product designs",
    services_card_design_desc:
      "We build custom mobile apps that are tailored to your business needs. We use the latest technologies and best practices to ensure that your app is fast, secure, and easy to use.",
    services_card_mvp_title: "MVP development",
    services_card_mvp_desc:
      "We build custom mobile apps that are tailored to your business needs. We use the latest technologies and best practices to ensure that your app is fast, secure, and easy to use.",
    services_card_custom_title: "Custom Software development",
    services_card_custom_desc:
      "We build custom mobile apps that are tailored to your business needs. We use the latest technologies and best practices to ensure that your app is fast, secure, and easy to use.",
    services_read_more: "Read more",
    services_step_badge_core: "Core",
    services_step1_title: "Discovery",
    services_step1_desc: "We learn your goals, users, and constraints to define the project scope",
    services_step2_title: "Design",
    services_step2_desc: "Create wireframes, prototypes, and visual designs for your approval",
    services_step3_title: "Develop",
    services_step3_desc: "Build your product with clean code, regular updates, and testing",
    services_step4_title: "Deploy",
    services_step4_desc: "Launch your software to production with monitoring and support",
    services_step5_title: "Evolve",
    services_step5_desc: "Iterate based on feedback and scale as your business grows",
    services_faq_q1: "What services do you offer?",
    services_faq_a1:
      "We design and build web apps, mobile apps, MVPs, and custom software, handling discovery, UX/UI, development, and launch.",
    services_faq_q2: "How long does a typical project take?",
    services_faq_a2:
      "Timelines vary by scope, but most MVPs take 6-10 weeks, while larger platforms take 3-5 months.",
    services_faq_q3: "Can you work with an existing product?",
    services_faq_a3:
      "Yes. We can audit, improve, and extend current systems, or rebuild parts that need better performance or scale."
  };

  const kaServiceTranslations = {
    services_card_web_title: "ვებ დეველოპმენტი",
    services_card_web_desc:
      "ჩვენ ვქმნით ინდივიდუალურ ვებსაიტებს, რომლებიც თქვენს ბიზნეს საჭიროებებზეა მორგებული. ვიყენებთ თანამედროვე ტექნოლოგიებსა და საუკეთესო პრაქტიკებს, რათა თქვენი ვებსაიტი იყოს სწრაფი, უსაფრთხო და მარტივად გამოსაყენებელი.",
    services_card_mobile_title: "მობაილ აპების განვითარება",
    services_card_mobile_desc:
      "ჩვენ ვქმნით ინდივიდუალურ მობაილ აპებს თქვენი ბიზნეს საჭიროებებისთვის. თანამედროვე ტექნოლოგიებითა და საუკეთესო პრაქტიკებით უზრუნველვყოფთ სწრაფ, უსაფრთხო და მოსახერხებელ აპლიკაციებს.",
    services_card_design_title: "ციფრული პროდუქტის დიზაინი",
    services_card_design_desc:
      "ჩვენ ვქმნით ციფრული პროდუქტების დიზაინს თქვენი ბიზნეს მიზნებზე მორგებით, რათა მიიღოთ თანამედროვე, პრაქტიკული და მომხმარებელზე ორიენტირებული გამოცდილება.",
    services_card_mvp_title: "MVP განვითარება",
    services_card_mvp_desc:
      "ჩვენ სწრაფად ვქმნით MVP-ს თქვენი იდეის ვალიდაციისთვის, უკუკავშირის მისაღებად და პროდუქტის დროულად გასაშვებად.",
    services_card_custom_title: "ინდივიდუალური პროგრამული უზრუნველყოფა",
    services_card_custom_desc:
      "ჩვენ ვქმნით ინდივიდუალურ პროგრამულ გადაწყვეტილებებს თქვენი ბიზნეს პროცესებისა და მიზნების შესაბამისად.",
    services_read_more: "ვრცლად",
    services_step_badge_core: "ძირითადი",
    services_step1_title: "აღმოჩენა",
    services_step1_desc: "ვიკვლევთ თქვენს მიზნებს, მომხმარებლებს და შეზღუდვებს, რათა ზუსტად განვსაზღვროთ პროექტის ფარგლები",
    services_step2_title: "დიზაინი",
    services_step2_desc: "ვქმნით ვაიერფრეიმებს, პროტოტიპებს და ვიზუალურ დიზაინს თქვენი დამტკიცებისთვის",
    services_step3_title: "განვითარება",
    services_step3_desc: "ვქმნით თქვენს პროდუქტს სუფთა კოდით, რეგულარული განახლებებით და ტესტირებით",
    services_step4_title: "გაშვება",
    services_step4_desc: "ვუშვებთ პროდუქტს პროდაქშენში მონიტორინგითა და მხარდაჭერით",
    services_step5_title: "განვითარების გაგრძელება",
    services_step5_desc: "ვაუმჯობესებთ პროდუქტს უკუკავშირის მიხედვით და ვზრდით თქვენს ბიზნესთან ერთად",
    services_faq_q1: "რა სერვისებს სთავაზობთ?",
    services_faq_a1:
      "ვქმნით ვებ აპებს, მობაილ აპებს, MVP-ებს და ინდივიდუალურ პროგრამულ გადაწყვეტებს - აღმოჩენიდან UX/UI-მდე, განვითარებიდან გაშვებამდე.",
    services_faq_q2: "რამდენი დრო სჭირდება პროექტს?",
    services_faq_a2:
      "დრო დამოკიდებულია მოცულობაზე, თუმცა საშუალოდ MVP მოითხოვს 6-10 კვირას, ხოლო დიდი პლატფორმები 3-5 თვეს.",
    services_faq_q3: "არსებულ პროდუქტზე მუშაობთ?",
    services_faq_a3:
      "დიახ. შეგვიძლია არსებული სისტემის აუდიტი, გაუმჯობესება და გაფართოება, ან იმ ნაწილების ხელახლა შექმნა, რომელთაც უკეთესი წარმადობა და მასშტაბირება სჭირდება."
  };

  Object.assign(translations.en, enServiceTranslations);
  Object.assign(translations.ka, kaServiceTranslations);

  const flags = {
    en: { src: "img/uk.png", alt: "English" },
    ka: { src: "img/geo.png", alt: "ქართული" }
  };

  const menu = window.SoftonMenu?.init({
    header,
    menuToggle,
    mobileBreakpoint: MOBILE_BREAKPOINT
  });

  const i18n = window.SoftonI18n?.create({
    translations,
    flags,
    langToggle,
    storageKey: LANGUAGE_STORAGE_KEY,
    defaultLanguage: "en"
  });

  if (i18n) i18n.init();

  const cookieBanner = document.getElementById("cookie-banner");
  const cookieAccept = document.getElementById("cookie-accept");
  const cookieReject = document.getElementById("cookie-reject");
  window.SoftonCookies?.initConsentBanner({
    banner: cookieBanner,
    acceptButton: cookieAccept,
    rejectButton: cookieReject,
    languageStorageKey: LANGUAGE_STORAGE_KEY
  });

  if (langToggle && i18n) {
    langToggle.addEventListener("click", () => {
      i18n.toggleLanguage();
      if (window.innerWidth <= MOBILE_BREAKPOINT) menu?.close();
    });
  }
})();
