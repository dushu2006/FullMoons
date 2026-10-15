export const siteConfig = {
  business: {
    name: "FULL MOONs Family Restaurant",
    shortName: "FULL MOONs",
    description:
      "Family restaurant in New Gajuwaka, Visakhapatnam, serving biryanis, Indian dishes, seafood, vegetarian options, starters and more.",
    address: {
      line1: "Door, 10, 9, 30, Main Road",
      area: "New Gajuwaka, Gajuwaka",
      city: "Visakhapatnam",
      state: "Andhra Pradesh",
      postalCode: "530026",
      country: "India",
      full: "Door, 10, 9, 30, Main Road, New Gajuwaka, Gajuwaka, Visakhapatnam, Andhra Pradesh 530026, India",
    },
    contact: {
      phoneDisplay: "+91 81069 07036",
      phoneHref: "tel:+918106907036",
      whatsappHref:
        "https://wa.me/918106907036?text=Hello%20FULL%20MOONs%20Family%20Restaurant%2C%20I%20would%20like%20to%20know%20more%20about%20your%20menu.",
    },
    sourceNote:
      "Address, listed phone number and cuisine categories are based on publicly available listing information and should be owner-verified before final publishing.",
  },
  navigation: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Menu", href: "#menu" },
    { label: "Gallery", href: "#gallery" },
    { label: "Visit Us", href: "#visit-us" },
  ],
  links: {
    primaryCta: "#menu",
    // Official Maps directions URL: opens the directions screen (or the
    // Maps app) with the restaurant pre-filled as the destination, so one
    // tap actually starts navigation. The previous search URL only opened
    // a search results page and could miss the restaurant entirely.
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=FULL%20MOONs%20Family%20Restaurant%2C%20Door%2010-9-30%2C%20Main%20Road%2C%20New%20Gajuwaka%2C%20Gajuwaka%2C%20Visakhapatnam%2C%20Andhra%20Pradesh%20530026%2C%20India",
    districtListing:
      "https://www.district.in/dining/visakhapatnam/full-moons-family-restaurant-gajuwaka-vizag",
    zomatoListing: null as string | null,
    swiggyListing: null as string | null,
  },
  hero: {
    eyebrow: "Main Road · New Gajuwaka · Visakhapatnam",
    title: "Discover Your Next Favourite Dish.",
    description:
      "Explore a selection of biryanis, Indian favourites and more at FULL MOONs Family Restaurant.",
    image: {
      src: "/images/hero-biryani.jpg",
      alt: "Illustrative biryani dish served in a traditional vessel",
    },
  },
  intro: {
    eyebrow: "About FULL MOONs",
    title: "Food-first dining with familiar favourites",
    description:
      "FULL MOONs Family Restaurant is publicly listed in New Gajuwaka, Visakhapatnam, with menu categories that include biryanis, chicken and mutton dishes, seafood, vegetarian options, starters, curries, rice, noodles, soups and Indian breads.",
    image: {
      src: "/images/intro-platter.jpg",
      alt: "Illustrative assortment of Indian dishes arranged on a table",
    },
  },
  featured: [
    {
      title: "Biryani",
      menuCategory: "Biryani",
      description: "Fragrant rice specials across veg and non-veg options.",
      image: "/images/hero-biryani.jpg",
    },
    {
      title: "Seafood",
      menuCategory: "Seafood",
      description: "Regional seafood preparations with bold Indian flavours.",
      image: "/images/featured-seafood.jpg",
    },
    {
      title: "Vegetarian",
      menuCategory: "Veg",
      description: "Comforting vegetarian dishes, curries and sides.",
      image: "/images/featured-veg.jpg",
    },
    {
      title: "Starters",
      menuCategory: "Starters",
      description: "Tandoori and pan-fried starters to begin your meal.",
      image: "/images/featured-starters.jpg",
    },
    {
      title: "Rice & Noodles",
      menuCategory: "Rice and Noodles",
      description: "Quick favourites from rice bowls to Indo-Chinese noodles.",
      image: "/images/featured-noodles.jpg",
    },
    {
      title: "Chicken & Mutton",
      menuCategory: "Chicken",
      description: "Popular gravies and dry dishes from classic meat sections.",
      image: "/images/gallery-curry.jpg",
    },
  ],
  // `items` are indicative highlights within each publicly listed category.
  // No prices are published here on purpose: availability and prices change
  // and must be confirmed with the restaurant (call / WhatsApp).
  menuOverview: [
    {
      category: "Veg",
      image: "/images/featured-veg.jpg",
      notes: "Vegetarian mains, sides and curries",
      items: [
        { name: "Paneer Butter Masala", description: "Cottage cheese simmered in a rich tomato-butter gravy.", diet: "veg" },
        { name: "Dal Tadka", description: "Yellow dal finished with a ghee, garlic and chilli tempering.", diet: "veg" },
        { name: "Mixed Veg Curry", description: "Seasonal vegetables cooked in a homestyle masala.", diet: "veg" },
        { name: "Aloo Gobi", description: "Potato and cauliflower tossed with Indian spices.", diet: "veg" },
      ],
    },
    {
      category: "Biryani",
      image: "/images/hero-biryani.jpg",
      notes: "Veg and non-veg biryani varieties",
      items: [
        { name: "Chicken Dum Biryani", description: "Fragrant layered rice cooked dum-style with chicken.", diet: "non-veg" },
        { name: "Mutton Biryani", description: "Slow-cooked mutton layered with aromatic rice.", diet: "non-veg" },
        { name: "Veg Biryani", description: "Vegetables and whole spices layered with fragrant rice.", diet: "veg" },
        { name: "Egg Biryani", description: "Masala eggs served over spiced biryani rice.", diet: "egg" },
      ],
    },
    {
      category: "Chicken",
      image: "/images/gallery-curry.jpg",
      notes: "Starters, curries and rice accompaniments",
      items: [
        { name: "Chicken Curry", description: "Homestyle chicken gravy, best paired with rice or breads.", diet: "non-veg" },
        { name: "Pepper Chicken", description: "Dry chicken preparation with crushed black pepper.", diet: "non-veg" },
        { name: "Boneless Chicken Curry", description: "Boneless chicken pieces in a spiced curry base.", diet: "non-veg" },
      ],
    },
    {
      category: "Mutton",
      image: "/images/intro-platter.jpg",
      notes: "Traditional mutton gravies and dry items",
      items: [
        { name: "Mutton Curry", description: "Traditional slow-cooked mutton gravy.", diet: "non-veg" },
        { name: "Mutton Fry", description: "Dry mutton fry with curry leaves and spices.", diet: "non-veg" },
        { name: "Mutton Masala", description: "Mutton cooked in a thick onion-tomato masala.", diet: "non-veg" },
      ],
    },
    {
      category: "Seafood",
      image: "/images/featured-seafood.jpg",
      notes: "Fish and prawn-based preparations",
      items: [
        { name: "Fish Curry", description: "Regional-style fish curry with bold spices.", diet: "non-veg" },
        { name: "Prawn Fry", description: "Prawns fried with chilli, garlic and curry leaves.", diet: "non-veg" },
        { name: "Fish Fry", description: "Masala-marinated fish, pan-fried until crisp.", diet: "non-veg" },
      ],
    },
    {
      category: "Starters",
      image: "/images/featured-starters.jpg",
      notes: "Vegetarian and non-vegetarian starters",
      items: [
        { name: "Chicken 65", description: "Fiery deep-fried chicken starter with curry leaves.", diet: "non-veg" },
        { name: "Chilli Paneer", description: "Paneer tossed in a spicy Indo-Chinese sauce.", diet: "veg" },
        { name: "Veg Manchuria", description: "Vegetable dumplings in a garlic-soy glaze.", diet: "veg" },
        { name: "Apollo Fish", description: "Batter-fried fish tossed with chillies and spices.", diet: "non-veg" },
      ],
    },
    {
      category: "Rice and Noodles",
      image: "/images/featured-noodles.jpg",
      notes: "Rice items, noodles and quick bowls",
      items: [
        { name: "Veg Fried Rice", description: "Smoky wok-tossed rice with vegetables.", diet: "veg" },
        { name: "Chicken Fried Rice", description: "Fried rice with chicken and spring onion.", diet: "non-veg" },
        { name: "Veg Hakka Noodles", description: "Street-style noodles with crunchy vegetables.", diet: "veg" },
        { name: "Chicken Hakka Noodles", description: "Noodles tossed with chicken and peppers.", diet: "non-veg" },
      ],
    },
    {
      category: "Curries and Breads",
      image: "/images/gallery-bread.jpg",
      notes: "Indian breads, curry bases and accompaniments",
      items: [
        { name: "Butter Naan", description: "Soft tandoor naan brushed with butter.", diet: "veg" },
        { name: "Garlic Naan", description: "Naan topped with garlic and coriander.", diet: "veg" },
        { name: "Tandoori Roti", description: "Wholewheat roti baked in the tandoor.", diet: "veg" },
        { name: "Curry of the Day", description: "Ask the team what curry is fresh today.", diet: "veg" },
      ],
    },
  ],
  gallery: [
    {
      src: "/images/hero-biryani.jpg",
      alt: "Illustrative biryani close-up",
    },
    {
      src: "/images/featured-seafood.jpg",
      alt: "Illustrative seafood curry close-up",
    },
    {
      src: "/images/featured-veg.jpg",
      alt: "Illustrative vegetarian platter",
    },
    {
      src: "/images/featured-starters.jpg",
      alt: "Illustrative Indian starters platter",
    },
    {
      src: "/images/gallery-bread.jpg",
      alt: "Illustrative Indian bread basket",
    },
    {
      src: "/images/gallery-rice.jpg",
      alt: "Illustrative rice and curry serving",
    },
  ],
} as const;

export type SiteConfig = typeof siteConfig;

/** Build a WhatsApp deep link with a pre-filled message to the restaurant. */
export function buildWhatsAppHref(message: string) {
  const number = siteConfig.business.contact.phoneHref.replace("tel:+", "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

