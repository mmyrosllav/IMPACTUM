import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageTransition from '../components/PageTransition';

const GRANTS_DATA = {
  'horizon-europe': {
    name: 'Horizon Europe',
    tag: 'R&D',
    color: '#FFD700',
    deadline: '15 Sep 2026',
    amount: '€1M – €5M',
    logo: '🔬',
    externalUrl: 'https://ec.europa.eu/info/funding-tenders/opportunities/portal/',
    description: {
      en: "Horizon Europe is the EU's flagship research and innovation programme worth €95.5 billion. It tackles climate change, helps achieve UN SDGs and boosts EU competitiveness and growth. The programme co-funds research projects across all domains of science and innovation.",
      uk: "Horizon Europe — флагманська програма ЄС з досліджень та інновацій вартістю €95,5 млрд. Програма спрямована на боротьбу зі зміною клімату, досягнення ЦСР ООН та підвищення конкурентоспроможності ЄС.",
    },
    eligibility: {
      en: ['Research institutions and universities', 'Companies of all sizes (SMEs welcome)', 'Consortia of 3+ organisations from 3+ EU countries', 'Non-EU countries with association agreements'],
      uk: ['Дослідницькі установи та університети', 'Компанії будь-якого розміру (МСП вітаються)', 'Консорціуми з 3+ організацій з 3+ країн ЄС', 'Країни поза ЄС з угодами про асоціацію'],
    },
    steps: {
      en: ['Register on the EU Funding & Tenders Portal', 'Find the right call for proposals', 'Build a consortium with eligible partners', 'Submit your proposal before the deadline'],
      uk: ['Зареєструйтесь на порталі EU Funding & Tenders', 'Знайдіть відповідний конкурс пропозицій', 'Сформуйте консорціум з відповідними партнерами', 'Подайте заявку до дедлайну'],
    },
  },
  'usaid-ukraine': {
    name: 'USAID Ukraine Fund',
    tag: 'Social',
    color: '#fff',
    deadline: '30 Jun 2026',
    amount: '≤ €150k',
    logo: '🤝',
    externalUrl: 'https://www.usaid.gov/ukraine',
    description: {
      en: "USAID Ukraine supports democratic development, economic growth, and humanitarian assistance in Ukraine. Grants are available for NGOs and community organisations working on social impact, governance, and recovery projects.",
      uk: "USAID Україна підтримує демократичний розвиток, економічне зростання та гуманітарну допомогу в Україні. Гранти доступні для НГО та громадських організацій, що працюють у сфері соціального впливу.",
    },
    eligibility: {
      en: ['Registered NGOs and civil society organisations', 'Community-based organisations in Ukraine', 'Partners with proven track record of social impact', 'Local government entities for certain programmes'],
      uk: ['Зареєстровані НГО та організації громадянського суспільства', 'Громадські організації в Україні', 'Партнери з підтвердженим досвідом соціального впливу', 'Органи місцевого самоврядування для певних програм'],
    },
    steps: {
      en: ['Check the current USAID Ukraine open calls', 'Prepare your organisational profile and budget', 'Submit the Expression of Interest (EOI)', 'Await invitation for full proposal submission'],
      uk: ['Перевірте поточні відкриті конкурси USAID Україна', 'Підготуйте профіль організації та бюджет', 'Подайте вираз зацікавленості (EOI)', 'Очікуйте запрошення для повної заявки'],
    },
  },
  'ebrd-green': {
    name: 'EBRD Green Economy',
    tag: 'Environment',
    color: '#4ade80',
    deadline: '01 Aug 2026',
    amount: '€50k – €500k',
    logo: '🌿',
    externalUrl: 'https://www.ebrd.com/what-we-do/sectors-and-topics/green-economy.html',
    description: {
      en: "The EBRD Green Economy Financing Facility supports businesses and municipalities to invest in energy efficiency and renewable energy. Grants cover up to 15–20% of the total project cost as an incentive payment after project completion.",
      uk: "Механізм фінансування зеленої економіки ЄБРР підтримує бізнес та муніципалітети в інвестиціях в енергоефективність та відновлювану енергетику. Гранти покривають до 15–20% загальної вартості проєкту.",
    },
    eligibility: {
      en: ['Private sector companies in EBRD countries of operations', 'Municipalities and public utilities', 'Projects with measurable environmental impact', 'Minimum project size €50,000'],
      uk: ['Компанії приватного сектору в країнах операцій ЄБРР', 'Муніципалітети та комунальні підприємства', 'Проєкти з вимірюваним екологічним впливом', 'Мінімальний розмір проєкту €50,000'],
    },
    steps: {
      en: ['Contact a participating financial institution in your country', 'Prepare an energy audit or feasibility study', 'Apply for EBRD financing through the local bank', 'Receive incentive grant after project completion'],
      uk: ['Зверніться до банку-партнера у вашій країні', 'Підготуйте енергетичний аудит або ТЕО', 'Подайте заявку на фінансування ЄБРР через місцевий банк', 'Отримайте грант-стимул після завершення проєкту'],
    },
  },
  'british-council': {
    name: 'British Council',
    tag: 'Culture',
    color: '#60a5fa',
    deadline: '20 Jul 2026',
    amount: '£5k – £50k',
    logo: '🎭',
    externalUrl: 'https://www.britishcouncil.org/arts/funding-and-development',
    description: {
      en: "British Council Arts grants support creative and cultural exchange between the UK and other countries. Funding is available for arts organisations, individual artists, and cultural institutions working on international collaboration projects.",
      uk: "Гранти British Council Arts підтримують творчий та культурний обмін між Великобританією та іншими країнами. Фінансування доступне для мистецьких організацій та культурних установ.",
    },
    eligibility: {
      en: ['Arts organisations and cultural institutions', 'Individual artists and creative professionals', 'Projects with clear UK-Ukraine (or UK-other country) collaboration', 'Registered legal entities preferred'],
      uk: ['Мистецькі організації та культурні установи', 'Окремі митці та творчі професіонали', 'Проєкти зі співпрацею Великобританія-Україна', 'Перевага зареєстрованим юридичним особам'],
    },
    steps: {
      en: ['Check British Council Ukraine open funding rounds', 'Submit an online Expression of Interest', 'Develop full project proposal if shortlisted', 'Sign grant agreement and begin project'],
      uk: ['Перевірте відкриті раунди фінансування British Council Україна', 'Подайте онлайн-заявку про зацікавленість', 'Розробіть повну заявку у разі відбору', 'Підпишіть угоду та почніть проєкт'],
    },
  },
  'eu4business': {
    name: 'EU4Business',
    tag: 'SME',
    color: '#FFD700',
    deadline: '31 Oct 2026',
    amount: '€10k – €200k',
    logo: '💼',
    externalUrl: 'https://www.eu4business.eu/',
    description: {
      en: "EU4Business helps small and medium-sized enterprises (SMEs) in the EU's Eastern Partnership countries to grow, become more competitive, and create jobs. Grants support business development, technology adoption, and export capacity building.",
      uk: "EU4Business допомагає малим і середнім підприємствам у країнах Східного партнерства ЄС рости та підвищувати конкурентоспроможність. Гранти підтримують розвиток бізнесу та нарощування експортного потенціалу.",
    },
    eligibility: {
      en: ['SMEs registered in Eastern Partnership countries', 'Businesses with fewer than 250 employees', 'Companies with demonstrated growth potential', 'Preference for innovative and export-oriented businesses'],
      uk: ['МСП, зареєстровані в країнах Східного партнерства', 'Підприємства з менш ніж 250 працівниками', 'Компанії з підтвердженим потенціалом зростання', 'Пріоритет інноваційним та експортоорієнтованим підприємствам'],
    },
    steps: {
      en: ['Identify the right EU4Business programme for your sector', 'Register on the EU4Business platform', 'Prepare business plan and financial projections', 'Submit application with all required documents'],
      uk: ['Визначте відповідну програму EU4Business для вашого сектору', 'Зареєструйтесь на платформі EU4Business', 'Підготуйте бізнес-план та фінансові прогнози', 'Подайте заявку з усіма необхідними документами'],
    },
  },
  'ukraine-innovation': {
    name: 'Ukraine Innovation',
    tag: 'Startup',
    color: '#f472b6',
    deadline: '15 Aug 2026',
    amount: '₴500k – ₴3M',
    logo: '🚀',
    externalUrl: 'https://www.uifund.org.ua/',
    description: {
      en: "Ukraine Innovation Fund supports Ukrainian startups and tech companies with non-repayable grants for research and development, prototype creation, and market entry. The fund focuses on IT, deep tech, and innovative manufacturing.",
      uk: "Фонд Ukraїne Innovation підтримує українські стартапи та технологічні компанії безповоротними грантами на НДДКР, створення прототипів та вихід на ринок. Фокус — ІТ, глибокі технології та інноваційне виробництво.",
    },
    eligibility: {
      en: ['Ukrainian-registered startups and tech companies', 'Projects at prototype or early-market stage', 'Teams with relevant technical expertise', 'Companies with fewer than 100 employees'],
      uk: ['Стартапи та техкомпанії, зареєстровані в Україні', 'Проєкти на стадії прототипу або раннього ринку', 'Команди з відповідними технічними компетенціями', 'Компанії з менш ніж 100 працівниками'],
    },
    steps: {
      en: ['Submit application on the UIFund portal', 'Pass the eligibility screening', 'Present project to the investment committee', 'Sign grant agreement and begin milestones'],
      uk: ['Подайте заявку на порталі UIFund', 'Пройдіть перевірку відповідності вимогам', 'Презентуйте проєкт інвестиційному комітету', 'Підпишіть угоду та почніть виконання'],
    },
  },
  'life-programme': {
    name: 'LIFE Programme',
    tag: 'Climate',
    color: '#4ade80',
    deadline: '18 Sep 2026',
    amount: '€300k – €2M',
    logo: '🌍',
    externalUrl: 'https://cinea.ec.europa.eu/programmes/life_en',
    description: {
      en: "LIFE is the EU's funding instrument for environment and climate action. It co-finances projects that contribute to the implementation and development of EU environmental and climate policy, supporting the transition to a sustainable, circular, energy-efficient economy.",
      uk: "LIFE — інструмент фінансування ЄС у сфері навколишнього середовища та кліматичних дій. Програма співфінансує проєкти, що сприяють реалізації екологічної та кліматичної політики ЄС.",
    },
    eligibility: {
      en: ['Legal entities from EU member states', 'Consortia encouraged (mixed public-private)', 'Projects with clear EU environmental policy contribution', 'Non-EU organisations eligible as associate partners'],
      uk: ['Юридичні особи з країн-членів ЄС', 'Консорціуми заохочуються (змішані державно-приватні)', 'Проєкти з чітким внеском у екологічну політику ЄС', 'Організації поза ЄС можуть бути асоційованими партнерами'],
    },
    steps: {
      en: ['Choose the right LIFE sub-programme (Nature, Climate, Clean Energy)', 'Prepare a concept note for pre-evaluation', 'Develop a full project proposal', 'Submit via the EU Funding & Tenders portal'],
      uk: ['Виберіть відповідну підпрограму LIFE', 'Підготуйте концептуальну записку для попередньої оцінки', 'Розробіть повну заявку проєкту', 'Подайте через портал EU Funding & Tenders'],
    },
  },
  'gef-small-grants': {
    name: 'GEF Small Grants',
    tag: 'Eco',
    color: '#4ade80',
    deadline: '01 Sep 2026',
    amount: '≤ $50k',
    logo: '🌱',
    externalUrl: 'https://www.thegef.org/what-we-do/topics/small-grants-programme',
    description: {
      en: "The GEF Small Grants Programme (SGP) provides financial and technical support to civil society and community-based organisations in developing countries. Projects address biodiversity, climate change, land degradation, and international waters.",
      uk: "Програма малих грантів GEF надає фінансову та технічну підтримку організаціям громадянського суспільства в країнах, що розвиваються. Проєкти стосуються біорізноманіття, зміни клімату та деградації земель.",
    },
    eligibility: {
      en: ['Community-based organisations (CBOs)', 'Non-governmental organisations (NGOs)', 'Projects in eligible developing countries', 'Grassroots initiatives with local community involvement'],
      uk: ['Громадські організації', 'Неурядові організації', 'Проєкти в країнах, що мають право на участь', 'Низові ініціативи за участі місцевих громад'],
    },
    steps: {
      en: ['Contact the GEF SGP national coordinator in your country', 'Submit a project concept (max 5 pages)', 'Await feedback and develop full proposal', 'Implement project with GEF SGP monitoring support'],
      uk: ['Зверніться до національного координатора GEF SGP у вашій країні', 'Подайте концепцію проєкту (макс. 5 сторінок)', 'Очікуйте зворотного зв\'язку та розробіть повну заявку', 'Реалізуйте проєкт за підтримки моніторингу GEF SGP'],
    },
  },
  'creative-europe': {
    name: 'Creative Europe',
    tag: 'Arts',
    color: '#a78bfa',
    deadline: '10 Oct 2026',
    amount: '€50k – €2M',
    logo: '🎨',
    externalUrl: 'https://culture.ec.europa.eu/creative-europe',
    description: {
      en: "Creative Europe supports cultural and creative sectors across Europe, fostering artistic and cultural cooperation, audience development, and digital transformation of the cultural sector. The programme has dedicated strands for Culture, MEDIA, and cross-sectoral activities.",
      uk: "Creative Europe підтримує культурний та творчий сектори Європи, сприяючи художній та культурній співпраці, розвитку аудиторії та цифровій трансформації культурного сектору.",
    },
    eligibility: {
      en: ['Cultural and creative organisations', 'Audiovisual companies and film professionals', 'Cross-border partnerships (minimum 3 countries)', 'Public and private cultural institutions'],
      uk: ['Культурні та творчі організації', 'Аудіовізуальні компанії та кінофахівці', 'Транскордонні партнерства (мінімум 3 країни)', 'Державні та приватні культурні установи'],
    },
    steps: {
      en: ['Register on the EU Funding & Tenders Portal', 'Find an open call matching your cultural project', 'Build a European partnership consortium', 'Submit proposal with full budget and workplan'],
      uk: ['Зареєструйтесь на порталі EU Funding & Tenders', 'Знайдіть відкритий конкурс для вашого культурного проєкту', 'Сформуйте європейський партнерський консорціум', 'Подайте заявку з повним бюджетом та планом роботи'],
    },
  },
  'eit-urban-mobility': {
    name: 'EIT Urban Mobility',
    tag: 'Cities',
    color: '#60a5fa',
    deadline: '05 Aug 2026',
    amount: '€200k – €1M',
    logo: '🚇',
    externalUrl: 'https://www.eiturbanmobility.eu/business-creation/funding/',
    description: {
      en: "EIT Urban Mobility accelerates change towards sustainable, accessible, and smart urban transport. The programme funds innovative startups and scaleups developing solutions for multimodal mobility, micro-mobility, shared transport, and urban logistics.",
      uk: "EIT Urban Mobility прискорює перехід до сталого, доступного та розумного міського транспорту. Програма фінансує інноваційні стартапи та компанії, що розвивають рішення для мобільності.",
    },
    eligibility: {
      en: ['Startups and SMEs with mobility solutions', 'Cities and municipalities as pilot partners', 'Research institutions in the EIT Knowledge Community', 'Companies ready for urban pilot testing'],
      uk: ['Стартапи та МСП з рішеннями для мобільності', 'Міста та муніципалітети як пілотні партнери', 'Науково-дослідні установи у KIC EIT', 'Компанії, готові до міського пілотного тестування'],
    },
    steps: {
      en: ['Apply to EIT Urban Mobility\'s open innovation calls', 'Demonstrate a working prototype or MVP', 'Partner with a city for pilot deployment', 'Scale solution through EIT network support'],
      uk: ['Подайте заявку на відкриті інноваційні конкурси EIT Urban Mobility', 'Продемонструйте діючий прототип або MVP', 'Знайдіть місто для пілотного впровадження', 'Масштабуйте рішення за підтримки мережі EIT'],
    },
  },
};

const GrantDetail = () => {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('uk') ? 'uk' : 'en';

  const grant = GRANTS_DATA[id];

  if (!grant) {
    return (
      <PageTransition>
        <div className="container" style={{ paddingTop: '140px', paddingBottom: '80px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>404</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Grant not found.</p>
          <Link to="/" className="btn">← Back Home</Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '900px' }}>

        <Link
          to="/"
          style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '40px' }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          ← {lang === 'uk' ? 'Назад' : 'Back'}
        </Link>

        <div style={{
          background: `linear-gradient(135deg, ${grant.color}10, transparent)`,
          border: `1.5px solid ${grant.color}30`,
          borderRadius: '24px',
          padding: '40px',
          marginBottom: '32px',
          display: 'flex',
          gap: '28px',
          alignItems: 'flex-start',
        }}>
          <div style={{
            fontSize: '3.5rem',
            width: '80px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `${grant.color}15`,
            borderRadius: '20px',
            flexShrink: 0,
          }}>
            {grant.logo}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px', flexWrap: 'wrap' }}>
              <span style={{
                fontSize: '0.65rem', fontWeight: '800', textTransform: 'uppercase',
                letterSpacing: '1.5px', color: grant.color,
                background: `${grant.color}18`, padding: '4px 12px', borderRadius: '20px',
              }}>{grant.tag}</span>
              <span style={{
                fontSize: '0.65rem', color: '#4ade80', background: 'rgba(74,222,128,0.1)',
                padding: '4px 10px', borderRadius: '20px', fontWeight: '700',
              }}>● {lang === 'uk' ? 'ВІДКРИТО' : 'OPEN'}</span>
            </div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#fff', marginBottom: '12px', lineHeight: '1.2' }}>
              {grant.name}
            </h1>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {lang === 'uk' ? 'Сума' : 'Amount'}
                </span>
                <p style={{ color: grant.color, fontWeight: '700', fontSize: '1.1rem', marginTop: '2px' }}>{grant.amount}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {lang === 'uk' ? 'Дедлайн' : 'Deadline'}
                </span>
                <p style={{ color: '#fff', fontWeight: '600', fontSize: '1rem', marginTop: '2px' }}>⏰ {grant.deadline}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '20px', padding: '32px', textAlign: 'left' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', color: grant.color }}>
            {lang === 'uk' ? 'Про програму' : 'About the Programme'}
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '0.97rem' }}>
            {grant.description[lang]}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>

          <div className="card" style={{ padding: '32px', textAlign: 'left' }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '20px', color: grant.color }}>
              {lang === 'uk' ? 'Хто може подати' : 'Who Can Apply'}
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {grant.eligibility[lang].map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                  <span style={{ color: grant.color, fontWeight: '700', flexShrink: 0 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="card" style={{ padding: '32px', textAlign: 'left' }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '20px', color: grant.color }}>
              {lang === 'uk' ? 'Як подати заявку' : 'How to Apply'}
            </h2>
            <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {grant.steps[lang].map((step, i) => (
                <li key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <span style={{
                    width: '26px', height: '26px', borderRadius: '50%',
                    background: `${grant.color}20`, border: `1.5px solid ${grant.color}50`,
                    color: grant.color, fontWeight: '800', fontSize: '0.75rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>{i + 1}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5', paddingTop: '3px' }}>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div style={{
          background: 'rgba(255,215,0,0.05)',
          border: '1.5px solid rgba(255,215,0,0.2)',
          borderRadius: '20px',
          padding: '36px',
          textAlign: 'center',
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>
            {lang === 'uk' ? 'Хочете подати цей грант?' : 'Ready to Apply for This Grant?'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '28px' }}>
            {lang === 'uk'
              ? 'Команда Impactum підготує повний пакет документів із 94% успіхом.'
              : 'Impactum\'s team will prepare a complete application package with a 94% success rate.'}
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/services" className="btn">
              {lang === 'uk' ? 'Замовити послугу' : 'Order the Service'}
            </Link>
            <a
              href={grant.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              {lang === 'uk' ? 'Офіційний сайт →' : 'Official Website →'}
            </a>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 700px) {
          .grant-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageTransition>
  );
};

export default GrantDetail;
