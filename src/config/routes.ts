export const routes = {
  home: "/",
  pricing: "/pricing",
  integrations: "/integrations",
  login: "/login",
  demo: "/demo",
  signup: "/signup",

  platform: {
    all: "/platform",
    crm: "/crm",
    sales: "/sales",
    service: "/service",
    hrms: "/hrms",
    finance: "/finance",
    projects: "/projects",
    procurement: "/procurement",
    inventory: "/inventory",
    marketing: "/marketing",
    analytics: "/analytics",
    automation: "/automation",
    ai: "/ai",
    aiInterview: "/ai-interview",
    commerce: "/commerce",
  },

  solutions: {
    all: "/solutions",
    startups: "/solutions/startups",
    smallBusiness: "/solutions/small-business",
    enterprise: "/solutions/enterprise",
  },

  industries: {
    all: "/industries",
    technology: "/industries/technology",
    healthcare: "/industries/healthcare",
    education: "/industries/education",
    manufacturing: "/industries/manufacturing",
    retail: "/industries/retail",
    realEstate: "/industries/real-estate",
    financialServices: "/industries/financial-services",
    professionalServices: "/industries/professional-services",
    nonProfit: "/industries/non-profit",
    agencies: "/industries/agencies",
  },

  resources: {
    all: "/resources",
    blog: "/resources/blog",
    guides: "/resources/guides",
    webinars: "/resources/webinars",
    caseStudies: "/resources/case-studies",
    helpCenter: "/resources/help-center",
    apiDocumentation: "/resources/api-documentation",
  },

  company: {
    about: "/company/about",
    careers: "/company/careers",
    partners: "/company/partners",
    contact: "/company/contact",
    newsroom: "/company/newsroom",
  },

  legal: {
    privacy: "/legal/privacy-policy",
    terms: "/legal/terms-of-service",
    cookies: "/legal/cookie-policy",
  },
} as const;
