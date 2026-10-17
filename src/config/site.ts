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
    zomatoListing: "https://www.zomato.com/visakhapatnam/full-moons-family-restaurant-gajuwaka-vizag/order",
    swiggyListing: "https://www.swiggy.com/city/vizag/full-moon-family-restaurant-gajuwaka-rest1151015",
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
  // Transcribed from the restaurant's printed menu screenshots supplied for this update.
  // Prices are shown in INR and should be kept aligned with the physical menu.
  menuOverview: [
    {
      category: "Veg. Soups", image: "/images/featured-veg.jpg", notes: "Printed menu selection",
      items: [
        { name: "Veg Hot and Sour Soup", price: 119, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Veg Sweet Corn Soup", price: 119, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Veg Manchow Soup", price: 119, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Veg Garlic Soup", price: 119, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Lemon Coriander Soup", price: 119, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Veg Clear Soup", price: 119, description: "From the printed restaurant menu.", diet: "veg" },
      ],
    },
    {
      category: "Non Veg. Soups", image: "/images/gallery-curry.jpg", notes: "Printed menu selection",
      items: [
        { name: "Chicken Sweet Corn Soup", price: 139, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Chicken Manchow Soup", price: 139, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Chicken Hot and Sour Soup", price: 139, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Chicken Clear Soup", price: 139, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Chicken Lemon Coriander Soup", price: 139, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Chicken Egg Drop Soup", price: 139, description: "From the printed restaurant menu.", diet: "egg" },
        { name: "Chicken Dragon Soup", price: 139, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Mutton Hot and Sour Soup", price: 169, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Mutton Pepper Soup", price: 169, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Mutton Manchow Soup", price: 169, description: "From the printed restaurant menu.", diet: "non-veg" },
      ],
    },
    {
      category: "Veg. Starters", image: "/images/featured-starters.jpg", notes: "Printed menu selection",
      items: [
        { name: "Veg Gobili Chilli Dry and Wet", price: 239, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Gobi Manchurian Dry & Wet", price: 239, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Mushroom 65", price: 239, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Chilli Mushroom", price: 250, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Chilli Babycorn", price: 250, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Crispy Baby Corn", price: 250, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Panner 65", price: 260, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Panner Chilli", price: 260, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Sezwan Panner", price: 260, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Sezwan Mushroom Dry", price: 260, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Panner Majestic Dry", price: 260, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "French Fries", price: 140, description: "From the printed restaurant menu.", diet: "veg" },
      ],
    },
    {
      category: "Spl. Veg. Starters", image: "/images/featured-veg.jpg", notes: "Printed menu selection",
      items: [
        { name: "Spl. Veg Dry", price: 280, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Shahi Veg Dry", price: 280, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Dragon Panner", price: 320, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Spl. Panner Tikka", price: 370, description: "From the printed restaurant menu.", diet: "veg" },
      ],
    },
    {
      category: "Non Veg. Starters", image: "/images/featured-starters.jpg", notes: "Printed menu selection",
      items: [
        { name: "Chicken Manchurian", price: 260, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Chilli Chicken", price: 260, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Chicken 65", price: 260, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Pepper Chicken", price: 270, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Chicken Majestic", price: 300, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Sezwan Chicken Dry", price: 300, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Lemon Chicken Dry", price: 260, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Dragon Chicken", price: 300, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Chicken 555", price: 300, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Apollo Chicken", price: 290, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Kaju Chicken Dry", price: 310, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Hongkong Chicken", price: 300, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "(Spl) Fullmoon Chicken (Spl)", price: 370, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Chicken Lollypop (4pcs)", price: 270, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Chicken Lollypop (6pcs)", price: 340, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Chicken Drumstick (4pcs)", price: 270, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Chicken Drumstick (6pcs)", price: 340, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Chicken Fried Wings (4pcs)", price: 270, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Chicken Fried Wings (6pcs)", price: 340, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Chicken Chilli Wings", price: 270, description: "From the printed restaurant menu.", diet: "non-veg" },
      ],
    },
    {
      category: "Sea Food (Bone Less)", image: "/images/featured-seafood.jpg", notes: "Printed menu selection",
      items: [
        { name: "Fish 65", price: 300, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Apollo Fish", price: 300, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Chilli Fish", price: 300, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Garlic Fish", price: 300, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Fish Manchurian", price: 300, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Prawns 65", price: 320, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Prawns Manchurian", price: 320, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Prawns Chilli", price: 320, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Loose Prawns", price: 320, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Garlic Prawns", price: 320, description: "From the printed restaurant menu.", diet: "non-veg" },
      ],
    },
    {
      category: "Spl. Nonveg Starters", image: "/images/featured-starters.jpg", notes: "Printed menu selection",
      items: [
        { name: "Chicken 77", price: 370, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Korean Chilli Wings", price: 370, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Mangolean Chicken", price: 370, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "ODC Chicken", price: 370, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Red Pepper Chicken", price: 370, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Dragon Mutton", price: 370, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Cripsy Fried Prawns", price: 370, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Finger Prawns", price: 370, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Pepper Fish", price: 370, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Chicken Bhurhani", price: 370, description: "From the printed restaurant menu.", diet: "non-veg" },
      ],
    },
    {
      category: "Mutton Starters", image: "/images/intro-platter.jpg", notes: "Printed menu selection",
      items: [
        { name: "Mutton Fry", price: 390, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Mutton 65", price: 390, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Mutton Chilli", price: 390, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Mutton Hongkong", price: 390, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Garlic Mutton", price: 390, description: "From the printed restaurant menu.", diet: "non-veg" },
      ],
    },
    {
      category: "Tandoori Non Veg. Starters", image: "/images/featured-starters.jpg", notes: "Bone less options shown in the printed menu.",
      items: [
        { name: "Tandoori Chicken (Full)", price: 540, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Tandoori Chicken (Half)", price: 315, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Kalmi Kabab", price: 340, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Chicken Tikka", price: 340, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Malai Tikka", price: 340, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Garlic Tikka", price: 340, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Badami Tikka", price: 340, description: "From the printed restaurant menu.", diet: "non-veg" },
      ],
    },
    {
      category: "Veg. Fried Rice", image: "/images/featured-noodles.jpg", notes: "Printed menu selection",
      items: [
        { name: "Veg Jeera Rice", price: 170, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Veg Fried Rice", price: 170, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Kaju Fried Rice", price: 200, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Shezwan Fried Rice", price: 180, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Mushroom Fried Rice", price: 200, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Panner Fried Rice", price: 200, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Curd Rice", price: 120, description: "From the printed restaurant menu.", diet: "veg" },
      ],
    },
    {
      category: "Spl. Veg. Fried Rice", image: "/images/featured-noodles.jpg", notes: "Printed menu selection",
      items: [
        { name: "Spl. Panner Fried Rice", price: 260, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Spl. Mushroom Fried Rice", price: 260, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Spl. Babycorn Rice", price: 260, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Spl. Mixed Veg. Fried Rice", price: 260, description: "From the printed restaurant menu.", diet: "veg" },
      ],
    },
    {
      category: "Non Veg. Fried Rice", image: "/images/gallery-rice.jpg", notes: "Printed menu selection",
      items: [
        { name: "Egg Fried Rice", price: 180, description: "From the printed restaurant menu.", diet: "egg" },
        { name: "Chicken Fried Rice", price: 200, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Schezwana Chicken Fried Rice", price: 240, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Mixed Nonveg Fried (Spl)", price: 270, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Full Moon Spl. Fried Rice", price: 300, description: "From the printed restaurant menu.", diet: "non-veg" },
      ],
    },
    {
      category: "Veg. Noodles", image: "/images/featured-noodles.jpg", notes: "Printed menu selection",
      items: [
        { name: "Veg Noodles", price: 170, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Egg Noodles", price: 190, description: "From the printed restaurant menu.", diet: "egg" },
        { name: "Chicken Noodles", price: 220, description: "From the printed restaurant menu.", diet: "non-veg" },
      ],
    },
    {
      category: "Veg. Curries", image: "/images/gallery-curry.jpg", notes: "Printed menu selection",
      items: [
        { name: "Mix Veg Curry", price: 200, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Veg Khola Puri", price: 220, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Plain Palak", price: 220, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Dal Fry", price: 170, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Dal Tadka", price: 190, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Palak Panner", price: 270, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Mushroom Curry", price: 250, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Panner Butter Masala", price: 240, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "PannerCheat Pata", price: 270, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Kaju Tomato Curry", price: 300, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Kaju Panner", price: 300, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Kadai Panner", price: 300, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Methi Chaman", price: 300, description: "From the printed restaurant menu.", diet: "veg" },
      ],
    },
    {
      category: "Non Veg. Curries", image: "/images/gallery-curry.jpg", notes: "Printed menu selection",
      items: [
        { name: "Chicken Curry", price: 270, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Andhra Chicken Curry", price: 290, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Hyderabad Chicken Curry", price: 310, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Gongura Chicken Curry", price: 300, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Kadai Chicken Curry", price: 310, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Panjabi Chicken Curry", price: 310, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Dillkush Chicken Curry", price: 310, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Afgani Chicken Curry", price: 310, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Chicken Tikka Masala Curry", price: 310, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Butter Chicken Curry", price: 310, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Moghalai Chicken Curry", price: 310, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Methi Chicken Curry", price: 310, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Egg Bujji", price: 150, description: "From the printed restaurant menu.", diet: "egg" },
        { name: "Egg Masala", price: 180, description: "From the printed restaurant menu.", diet: "egg" },
      ],
    },
    {
      category: "Sea Food Curry", image: "/images/featured-seafood.jpg", notes: "Printed menu selection",
      items: [
        { name: "Prawns Curry", price: 290, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Prawns Masala Curry", price: 300, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Fish Curry", price: 280, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Fish Masala Curry", price: 290, description: "From the printed restaurant menu.", diet: "non-veg" },
      ],
    },
    {
      category: "Veg. Biryani's", image: "/images/hero-biryani.jpg", notes: "Printed menu selection",
      items: [
        { name: "Kaju Biryani", price: 220, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Veg Biryani", price: 200, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Ulavacharu Biryani Veg.", price: 210, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Mushroom Biryani", price: 210, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Panner Biryani", price: 210, description: "From the printed restaurant menu.", diet: "veg" },
      ],
    },
    {
      category: "Non Veg. Biryani's", image: "/images/hero-biryani.jpg", notes: "Printed menu selection",
      items: [
        { name: "Dum Biryani", price: 240, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Chicken Fry Pieces Biryani (Mini)", price: 170, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Chicken Fry Pieces Biryani", price: 250, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Fish Biryani", price: 270, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Mutton Fry Biryani", price: 340, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Prawns Biryani", price: 270, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Egg Biryani", price: 200, description: "From the printed restaurant menu.", diet: "egg" },
      ],
    },
    {
      category: "Spl. Biryani's", image: "/images/hero-biryani.jpg", notes: "Printed menu selection",
      items: [
        { name: "Full Moon Biryani (Spl)", price: 499, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Chicken Lollypop Biryani (4Pcs)", price: 370, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Chicken Wings Biryani (4Pcs)", price: 370, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Chicken Mogalai Biryani (Boneless)", price: 370, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Spl. Mix Biryani", price: 420, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Kalmi Biryani", price: 370, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Chicken Gongura Biryani", price: 320, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Mutton Gongura Biryani", price: 440, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Ulavacharu Chicken Biryani", price: 320, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Ulavacharu Mutton Biryani", price: 450, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Palamuri Biryani", price: 280, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Rambo Biryani", price: 419, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Shai Murg", price: 470, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Shai Gous (Mutton)", price: 520, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Tandoori Biryani", price: 370, description: "From the printed restaurant menu.", diet: "non-veg" },
      ],
    },
    {
      category: "Mutton Curry", image: "/images/intro-platter.jpg", notes: "Printed menu selection",
      items: [
        { name: "Kadai Mutton Curry", price: 390, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Gongura Mutton Curry", price: 390, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Mutton Curry", price: 390, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Andhra Mutton Curry", price: 390, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Mutton Miriyalu Curry", price: 390, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Mutton Rogan Juice Curry", price: 390, description: "From the printed restaurant menu.", diet: "non-veg" },
        { name: "Mutton Sahi Curry", price: 390, description: "From the printed restaurant menu.", diet: "non-veg" },
      ],
    },
    {
      category: "Roti", image: "/images/gallery-bread.jpg", notes: "Printed menu selection",
      items: [
        { name: "Tandoori Roti (Plain)", price: 35, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Tandoori Roti (Butter)", price: 40, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Kothimeera Roti", price: 45, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Palin Kulcha", price: 50, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Butter Non", price: 50, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Plain Non", price: 45, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Garlic Non", price: 55, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Panner Parota", price: 80, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Masala Kulcha", price: 80, description: "From the printed restaurant menu.", diet: "veg" },
        { name: "Romali Roti", price: 60, description: "From the printed restaurant menu.", diet: "veg" },
      ],
    },
    {
      category: "Special Biryani Offers", image: "/images/hero-biryani.jpg", notes: "Combination packs transcribed from the printed menu; descriptions preserve listed contents.",
      items: [
        { name: "Family Pack — Dum Biryani (4 Dum Pie + Chicken 65, 3 Eggs, Soft Drink)", price: 649, description: "Combination offer; see included items in the name.", diet: "non-veg" },
        { name: "Family Pack — Fry Biryani (Fry Pie + Chicken 65, 3 Eggs, Soft Drink)", price: 749, description: "Combination offer; see included items in the name.", diet: "non-veg" },
        { name: "Party Pack — Chicken Fry Biryani, Chicken 65, 2 Mocktails or 500ml Soft Drink", price: 1399, description: "Combination offer; see included items in the name.", diet: "non-veg" },
        { name: "Spl. Biryani — Palamuru Biryani", price: 280, description: "Combination offer; see included items in the name.", diet: "non-veg" },
        { name: "Spl. Biryani — Nababe Biryani", price: 370, description: "Combination offer; see included items in the name.", diet: "non-veg" },
        { name: "Spl. Biryani — Rambo Biryani (3 leg piece)", price: 419, description: "Combination offer; see included items in the name.", diet: "non-veg" },
      ],
    },
  ],

} as const;

export type SiteConfig = typeof siteConfig;

/** Build a WhatsApp deep link with a pre-filled message to the restaurant. */
export function buildWhatsAppHref(message: string) {
  const number = siteConfig.business.contact.phoneHref.replace("tel:+", "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

