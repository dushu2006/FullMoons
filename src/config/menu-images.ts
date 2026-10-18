/**
 * Central image manifest for FULL MOONs Family Restaurant.
 *
 * Single source of truth mapping every printed-menu dish (exact name as it
 * appears in siteConfig.menuOverview) to its own photograph, plus the
 * category thumbnails, gallery selection and section imagery.
 *
 * Conventions:
 * - Dish photographs live in `public/images/menu/<slug>.jpg`.
 * - Each dish maps to exactly one slug. Where two dishes are genuinely
 *   visually equivalent preparations (for example "Chicken 555" and
 *   "Chicken 65", both a fried chicken starter), they deliberately share
 *   one photograph; the shared slug is documented in SHARED_IMAGE_NOTES.
 * - Every slug has a photographic caption used to build accessible alt text.
 * - `getMenuImage()` falls back to a neutral existing photograph so a menu
 *   edit can never produce a broken <Image> component.
 */

const MENU_DIR = "/images/menu";

/** Fallback used only when a dish name has no manifest entry. */
export const FALLBACK_MENU_IMAGE = "/images/featured-veg.jpg";

/**
 * [exact dish name, image slug] pairs grouped by printed-menu category.
 * Dish names must match siteConfig.menuOverview item names exactly.
 */
export const dishImagePairs = [
  // ── Veg. Soups ──────────────────────────────────────────────────────────
  ["Veg Hot and Sour Soup", "veg-hot-and-sour-soup"],
  ["Veg Sweet Corn Soup", "veg-sweet-corn-soup"],
  ["Veg Manchow Soup", "veg-manchow-soup"],
  ["Veg Garlic Soup", "veg-garlic-soup"],
  ["Lemon Coriander Soup", "veg-lemon-coriander-soup"],
  ["Veg Clear Soup", "veg-clear-soup"],

  // ── Non Veg. Soups ──────────────────────────────────────────────────────
  ["Chicken Sweet Corn Soup", "chicken-sweet-corn-soup"],
  ["Chicken Manchow Soup", "chicken-manchow-soup"],
  ["Chicken Hot and Sour Soup", "chicken-hot-and-sour-soup"],
  // Clear and lemon-coriander chicken soups are the same clear broth
  // presentation; one honest photograph covers both.
  ["Chicken Clear Soup", "chicken-clear-soup"],
  ["Chicken Lemon Coriander Soup", "chicken-clear-soup"],
  ["Chicken Egg Drop Soup", "egg-drop-soup"],
  ["Chicken Dragon Soup", "chicken-dragon-soup"],
  ["Mutton Hot and Sour Soup", "mutton-hot-and-sour-soup"],
  ["Mutton Pepper Soup", "mutton-pepper-soup"],
  ["Mutton Manchow Soup", "mutton-manchow-soup"],

  // ── Veg. Starters ───────────────────────────────────────────────────────
  ["Veg Gobili Chilli Dry and Wet", "gobili-chilli"],
  ["Gobi Manchurian Dry & Wet", "gobi-manchurian"],
  // Mushroom 65, Chilli Mushroom and Sezwan Mushroom Dry are the same
  // fried-mushroom starter with different sauces; one photograph covers all.
  ["Mushroom 65", "mushroom-65"],
  ["Chilli Mushroom", "mushroom-65"],
  ["Sezwan Mushroom Dry", "mushroom-65"],
  // Chilli Babycorn and Crispy Baby Corn share the fried babycorn look.
  ["Chilli Babycorn", "chilli-babycorn"],
  ["Crispy Baby Corn", "chilli-babycorn"],
  // Panner 65 and Panner Majestic Dry share the fried paneer look.
  ["Panner 65", "paneer-65"],
  ["Panner Majestic Dry", "paneer-65"],
  // Panner Chilli, Sezwan Panner and Dragon Panner share the saucy
  // Indo-Chinese paneer presentation.
  ["Panner Chilli", "paneer-chilli"],
  ["Sezwan Panner", "paneer-chilli"],
  ["Dragon Panner", "paneer-chilli"],
  ["French Fries", "french-fries"],

  // ── Spl. Veg. Starters ──────────────────────────────────────────────────
  ["Spl. Veg Dry", "spl-veg-dry"],
  ["Shahi Veg Dry", "shahi-veg-dry"],
  ["Spl. Panner Tikka", "paneer-tikka"],

  // ── Non Veg. Starters ───────────────────────────────────────────────────
  // Chicken Manchurian, Dragon Chicken and Hongkong Chicken share the
  // saucy fried-chicken Indo-Chinese presentation.
  ["Chicken Manchurian", "chicken-manchurian"],
  ["Dragon Chicken", "chicken-manchurian"],
  ["Hongkong Chicken", "chicken-manchurian"],
  // Chilli Chicken, Sezwan Chicken Dry and Mangolean Chicken share the
  // dry saucy chicken starter look.
  ["Chilli Chicken", "chilli-chicken"],
  ["Sezwan Chicken Dry", "chilli-chicken"],
  ["Mangolean Chicken", "chilli-chicken"],
  // Chicken 65, Chicken 555, Apollo Chicken, Chicken 77 and ODC Chicken are
  // the same fried chicken starter; one photograph covers all.
  ["Chicken 65", "chicken-65"],
  ["Chicken 555", "chicken-65"],
  ["Apollo Chicken", "chicken-65"],
  ["Chicken 77", "chicken-65"],
  ["ODC Chicken", "chicken-65"],
  // Pepper Chicken, Lemon Chicken Dry and Red Pepper Chicken share the
  // black-pepper dry chicken presentation.
  ["Pepper Chicken", "pepper-chicken"],
  ["Lemon Chicken Dry", "pepper-chicken"],
  ["Red Pepper Chicken", "pepper-chicken"],
  // Chicken Majestic, (Spl) Fullmoon Chicken and Chicken Bhurhani share the
  // rich saucy chicken starter presentation.
  ["Chicken Majestic", "chicken-majestic"],
  ["(Spl) Fullmoon Chicken (Spl)", "chicken-majestic"],
  ["Chicken Bhurhani", "chicken-majestic"],
  ["Kaju Chicken Dry", "kaju-chicken"],
  ["Chicken Lollypop (4pcs)", "chicken-lollypop"],
  ["Chicken Lollypop (6pcs)", "chicken-lollypop"],
  ["Chicken Drumstick (4pcs)", "chicken-drumstick"],
  ["Chicken Drumstick (6pcs)", "chicken-drumstick"],
  // Fried Wings, Chilli Wings and Korean Chilli Wings share the wing look.
  ["Chicken Fried Wings (4pcs)", "chicken-fried-wings"],
  ["Chicken Fried Wings (6pcs)", "chicken-fried-wings"],
  ["Chicken Chilli Wings", "chicken-fried-wings"],
  ["Korean Chilli Wings", "chicken-fried-wings"],

  // ── Sea Food (Bone Less) ────────────────────────────────────────────────
  // Fish 65, Apollo Fish and Fish Manchurian share the fried fish starter.
  ["Fish 65", "fish-65"],
  ["Apollo Fish", "fish-65"],
  ["Fish Manchurian", "fish-65"],
  // Chilli Fish, Garlic Fish and Pepper Fish share the saucy fish starter.
  ["Chilli Fish", "chilli-fish"],
  ["Garlic Fish", "chilli-fish"],
  ["Pepper Fish", "chilli-fish"],
  // Prawns 65, Prawns Manchurian and Prawns Chilli share the fried prawn look.
  ["Prawns 65", "prawns-65"],
  ["Prawns Manchurian", "prawns-65"],
  ["Prawns Chilli", "prawns-65"],
  // Loose Prawns, Garlic Prawns, Cripsy Fried Prawns and Finger Prawns
  // share the fried whole-prawn presentation.
  ["Loose Prawns", "loose-prawns"],
  ["Garlic Prawns", "loose-prawns"],
  ["Cripsy Fried Prawns", "loose-prawns"],
  ["Finger Prawns", "loose-prawns"],

  // ── Spl. Nonveg Starters ────────────────────────────────────────────────
  ["Dragon Mutton", "dragon-mutton"],

  // ── Mutton Starters ─────────────────────────────────────────────────────
  // Mutton Fry, Mutton 65 and Mutton Hongkong share the fried mutton look.
  ["Mutton Fry", "mutton-fry"],
  ["Mutton 65", "mutton-fry"],
  ["Mutton Hongkong", "mutton-fry"],
  // Mutton Chilli and Garlic Mutton share the saucy mutton starter look.
  ["Mutton Chilli", "mutton-chilli"],
  ["Garlic Mutton", "mutton-chilli"],

  // ── Tandoori Non Veg. Starters ──────────────────────────────────────────
  ["Tandoori Chicken (Full)", "tandoori-chicken"],
  ["Tandoori Chicken (Half)", "tandoori-chicken"],
  ["Kalmi Kabab", "kalmi-kabab"],
  // Chicken Tikka, Malai Tikka, Garlic Tikka and Badami Tikka share the
  // tandoori tikka skewer presentation.
  ["Chicken Tikka", "chicken-tikka"],
  ["Malai Tikka", "chicken-tikka"],
  ["Garlic Tikka", "chicken-tikka"],
  ["Badami Tikka", "chicken-tikka"],

  // ── Veg. Fried Rice ─────────────────────────────────────────────────────
  ["Veg Jeera Rice", "veg-jeera-rice"],
  // Veg Fried Rice, Kaju Fried Rice, Mushroom Fried Rice, Panner Fried Rice
  // and the Spl. mixed variants share the classic vegetable fried-rice look.
  ["Veg Fried Rice", "veg-fried-rice"],
  ["Kaju Fried Rice", "veg-fried-rice"],
  ["Mushroom Fried Rice", "veg-fried-rice"],
  ["Panner Fried Rice", "veg-fried-rice"],
  ["Spl. Panner Fried Rice", "veg-fried-rice"],
  ["Spl. Mushroom Fried Rice", "veg-fried-rice"],
  ["Spl. Babycorn Rice", "veg-fried-rice"],
  ["Spl. Mixed Veg. Fried Rice", "veg-fried-rice"],
  ["Shezwan Fried Rice", "shezwan-fried-rice"],
  ["Curd Rice", "curd-rice"],

  // ── Non Veg. Fried Rice ─────────────────────────────────────────────────
  ["Egg Fried Rice", "egg-fried-rice"],
  // Chicken Fried Rice and Mixed Nonveg Fried share the chicken fried-rice look.
  ["Chicken Fried Rice", "chicken-fried-rice"],
  ["Mixed Nonveg Fried (Spl)", "chicken-fried-rice"],
  // Schezwana Chicken Fried Rice and Full Moon Spl. Fried Rice share the
  // red-sauce schezwan fried-rice look.
  ["Schezwana Chicken Fried Rice", "chicken-schezwan-rice"],
  ["Full Moon Spl. Fried Rice", "chicken-schezwan-rice"],

  // ── Veg. Noodles ────────────────────────────────────────────────────────
  ["Veg Noodles", "veg-noodles"],
  ["Egg Noodles", "egg-noodles"],
  ["Chicken Noodles", "chicken-noodles"],

  // ── Veg. Curries ────────────────────────────────────────────────────────
  // Mix Veg Curry, Veg Khola Puri and Mushroom Curry share the mixed
  // vegetable curry presentation.
  ["Mix Veg Curry", "mix-veg-curry"],
  ["Veg Khola Puri", "mix-veg-curry"],
  ["Mushroom Curry", "mix-veg-curry"],
  ["Plain Palak", "palak-curry"],
  // Dal Fry and Dal Tadka share the temperated yellow dal look.
  ["Dal Fry", "dal-fry"],
  ["Dal Tadka", "dal-fry"],
  ["Palak Panner", "palak-paneer"],
  // Panner Butter Masala and PannerCheat Pata share the paneer-in-tomato-
  // gravy presentation.
  ["Panner Butter Masala", "paneer-butter-masala"],
  ["PannerCheat Pata", "paneer-butter-masala"],
  // Kaju Tomato Curry and Kaju Panner share the cashew-tomato curry look.
  ["Kaju Tomato Curry", "kaju-tomato-curry"],
  ["Kaju Panner", "kaju-tomato-curry"],
  ["Kadai Panner", "kadai-paneer"],
  ["Methi Chaman", "methi-chaman"],

  // ── Non Veg. Curries ────────────────────────────────────────────────────
  // Chicken Curry, Andhra Chicken Curry, Hyderabad Chicken Curry, Panjabi
  // Chicken Curry and Dillkush Chicken Curry share the classic chicken curry
  // presentation.
  ["Chicken Curry", "chicken-curry"],
  ["Andhra Chicken Curry", "chicken-curry"],
  ["Hyderabad Chicken Curry", "chicken-curry"],
  ["Panjabi Chicken Curry", "chicken-curry"],
  ["Dillkush Chicken Curry", "chicken-curry"],
  ["Gongura Chicken Curry", "gongura-chicken"],
  // Kadai Chicken Curry, Afgani Chicken Curry and Methi Chicken Curry share
  // the tomato-onion kadai-style chicken curry look.
  ["Kadai Chicken Curry", "kadai-chicken"],
  ["Afgani Chicken Curry", "kadai-chicken"],
  ["Methi Chicken Curry", "kadai-chicken"],
  // Butter Chicken Curry, Chicken Tikka Masala Curry and Moghalai Chicken
  // Curry share the creamy tomato chicken curry look.
  ["Butter Chicken Curry", "butter-chicken"],
  ["Chicken Tikka Masala Curry", "butter-chicken"],
  ["Moghalai Chicken Curry", "butter-chicken"],
  // Egg Bujji and Egg Masala share the boiled-egg curry look.
  ["Egg Bujji", "egg-curry"],
  ["Egg Masala", "egg-curry"],

  // ── Sea Food Curry ──────────────────────────────────────────────────────
  // Prawns Curry and Prawns Masala Curry share the prawn curry look.
  ["Prawns Curry", "prawns-curry"],
  ["Prawns Masala Curry", "prawns-curry"],
  // Fish Curry and Fish Masala Curry share the fish curry look.
  ["Fish Curry", "fish-curry"],
  ["Fish Masala Curry", "fish-curry"],

  // ── Veg. Biryani's ──────────────────────────────────────────────────────
  ["Kaju Biryani", "kaju-biryani"],
  // Veg Biryani and Ulavacharu Biryani Veg. share the vegetable biryani look.
  ["Veg Biryani", "veg-biryani"],
  ["Ulavacharu Biryani Veg.", "veg-biryani"],
  ["Mushroom Biryani", "mushroom-biryani"],
  ["Panner Biryani", "paneer-biryani"],

  // ── Non Veg. Biryani's ──────────────────────────────────────────────────
  // Dum Biryani, Chicken Mogalai Biryani, Ulavacharu Chicken Biryani,
  // Shai Murg and Tandoori Biryani share the chicken dum biryani look.
  ["Dum Biryani", "chicken-dum-biryani"],
  ["Chicken Mogalai Biryani (Boneless)", "chicken-dum-biryani"],
  ["Ulavacharu Chicken Biryani", "chicken-dum-biryani"],
  ["Shai Murg", "chicken-dum-biryani"],
  ["Tandoori Biryani", "chicken-dum-biryani"],
  // Chicken Fry Pieces Biryani (both sizes), Chicken Lollypop Biryani,
  // Chicken Wings Biryani, Kalmi Biryani and Palamuri Biryani share the
  // fried-chicken-pieces biryani look.
  ["Chicken Fry Pieces Biryani (Mini)", "chicken-fry-pieces-biryani"],
  ["Chicken Fry Pieces Biryani", "chicken-fry-pieces-biryani"],
  ["Chicken Lollypop Biryani (4Pcs)", "chicken-fry-pieces-biryani"],
  ["Chicken Wings Biryani (4Pcs)", "chicken-fry-pieces-biryani"],
  ["Kalmi Biryani", "chicken-fry-pieces-biryani"],
  ["Palamuri Biryani", "chicken-fry-pieces-biryani"],
  ["Fish Biryani", "fish-biryani"],
  // Mutton Fry Biryani, Mutton Gongura Biryani, Ulavacharu Mutton Biryani
  // and Shai Gous share the mutton biryani look.
  ["Mutton Fry Biryani", "mutton-biryani"],
  ["Mutton Gongura Biryani", "mutton-biryani"],
  ["Ulavacharu Mutton Biryani", "mutton-biryani"],
  ["Shai Gous (Mutton)", "mutton-biryani"],
  ["Prawns Biryani", "prawns-biryani"],
  ["Egg Biryani", "egg-biryani"],

  // ── Spl. Biryani's ──────────────────────────────────────────────────────
  ["Full Moon Biryani (Spl)", "full-moon-biryani"],
  // Spl. Mix Biryani and Rambo Biryani share the special-mix biryani look.
  ["Spl. Mix Biryani", "spl-mix-biryani"],
  ["Rambo Biryani", "spl-mix-biryani"],
  ["Chicken Gongura Biryani", "gongura-chicken-biryani"],

  // ── Mutton Curry ────────────────────────────────────────────────────────
  // Kadai Mutton Curry and Mutton Rogan Juice Curry share the kadai-style
  // mutton curry look.
  ["Kadai Mutton Curry", "kadai-mutton"],
  ["Mutton Rogan Juice Curry", "kadai-mutton"],
  ["Gongura Mutton Curry", "gongura-mutton"],
  // Mutton Curry, Andhra Mutton Curry, Mutton Miriyalu Curry and Mutton
  // Sahi Curry share the classic mutton curry look.
  ["Mutton Curry", "mutton-curry"],
  ["Andhra Mutton Curry", "mutton-curry"],
  ["Mutton Miriyalu Curry", "mutton-curry"],
  ["Mutton Sahi Curry", "mutton-curry"],

  // ── Roti ────────────────────────────────────────────────────────────────
  // Tandoori Roti (Plain) and Tandoori Roti (Butter) share the tandoori
  // roti look; the butter sheen is a finishing touch, not a different bread.
  ["Tandoori Roti (Plain)", "tandoori-roti"],
  ["Tandoori Roti (Butter)", "tandoori-roti"],
  ["Kothimeera Roti", "kothimeera-roti"],
  ["Palin Kulcha", "palak-kulcha"],
  // Butter Non and Plain Non share the tandoori naan look.
  ["Butter Non", "butter-naan"],
  ["Plain Non", "butter-naan"],
  ["Garlic Non", "garlic-naan"],
  // Panner Parota and Masala Kulcha share the stuffed flatbread look.
  ["Panner Parota", "paneer-paratha"],
  ["Masala Kulcha", "paneer-paratha"],
  ["Romali Roti", "roomali-roti"],

  // ── Special Biryani Offers ──────────────────────────────────────────────
  // Combination packs: the photograph shows the biryani the pack is built
  // around; sides listed in the dish name are confirmed at ordering time.
  ["Family Pack — Dum Biryani (4 Dum Pie + Chicken 65, 3 Eggs, Soft Drink)", "chicken-dum-biryani"],
  ["Family Pack — Fry Biryani (Fry Pie + Chicken 65, 3 Eggs, Soft Drink)", "chicken-fry-pieces-biryani"],
  ["Party Pack — Chicken Fry Biryani, Chicken 65, 2 Mocktails or 500ml Soft Drink", "spl-mix-biryani"],
  ["Spl. Biryani — Palamuru Biryani", "chicken-fry-pieces-biryani"],
  ["Spl. Biryani — Nababe Biryani", "chicken-dum-biryani"],
  ["Spl. Biryani — Rambo Biryani (3 leg piece)", "spl-mix-biryani"],
] as const;

/** Photographic caption per slug — also the basis of every alt text. */
const imageCaptions: Record<string, string> = {
  // Veg. Soups
  "veg-hot-and-sour-soup": "vegetable hot and sour soup served in a ceramic bowl",
  "veg-sweet-corn-soup": "creamy sweet corn soup served in a ceramic bowl",
  "veg-manchow-soup": "vegetable manchow soup with crisp vegetables in a bowl",
  "veg-garlic-soup": "garlic soup with fresh herbs served in a ceramic bowl",
  "veg-lemon-coriander-soup": "light lemon coriander soup with fresh coriander leaves",
  "veg-clear-soup": "clear vegetable soup with finely sliced vegetables",
  // Non Veg. Soups
  "chicken-sweet-corn-soup": "chicken sweet corn soup in a ceramic bowl",
  "chicken-manchow-soup": "chicken manchow soup with vegetables and shredded chicken",
  "chicken-hot-and-sour-soup": "chicken hot and sour soup in a ceramic bowl",
  "chicken-clear-soup": "clear chicken soup with coriander leaves",
  "egg-drop-soup": "chicken egg drop soup with silky egg ribbons",
  "chicken-dragon-soup": "spicy chicken dragon soup in a ceramic bowl",
  "mutton-hot-and-sour-soup": "mutton hot and sour soup with tender mutton pieces",
  "mutton-pepper-soup": "black pepper mutton soup with tender mutton pieces",
  "mutton-manchow-soup": "mutton manchow soup with vegetables and mutton pieces",
  // Veg. Starters
  "gobili-chilli": "crispy cauliflower florets tossed in chilli sauce on a plate",
  "gobi-manchurian": "gobi manchurian with crispy cauliflower in Indo-Chinese sauce",
  "mushroom-65": "crispy fried mushroom starter with sauce on a plate",
  "chilli-babycorn": "crispy chilli baby corn on a plate with sauce",
  "paneer-65": "crispy fried paneer cubes with sauce on a plate",
  "paneer-chilli": "paneer cubes tossed in Indo-Chinese chilli sauce with peppers",
  "french-fries": "crispy golden french fries in a paper-lined basket",
  // Spl. Veg. Starters
  "spl-veg-dry": "special mixed vegetable dry starter on a plate",
  "shahi-veg-dry": "shahi vegetable dry starter with nuts on a plate",
  "paneer-tikka": "paneer tikka skewers with peppers and onions",
  // Non Veg. Starters
  "chicken-manchurian": "chicken manchurian with fried chicken balls in sauce",
  "chilli-chicken": "dry chilli chicken with spring onions on a plate",
  "chicken-65": "crispy fried chicken 65 with curry leaves on a plate",
  "pepper-chicken": "black pepper dry chicken starter on a plate",
  "chicken-majestic": "chicken majestic starter in rich sauce on a plate",
  "kaju-chicken": "kaju chicken dry starter with cashews on a plate",
  "chicken-lollypop": "crispy chicken lollypop starters on a plate",
  "chicken-drumstick": "crispy fried chicken drumsticks on a plate",
  "chicken-fried-wings": "crispy fried chicken wings on a plate",
  // Sea Food (Bone Less)
  "fish-65": "crispy fried fish 65 starter on a plate",
  "chilli-fish": "chilli fish fillets in Indo-Chinese sauce on a plate",
  "prawns-65": "crispy fried prawns 65 starter on a plate",
  "loose-prawns": "crispy fried whole prawns on a plate",
  // Spl. Nonveg Starters
  "dragon-mutton": "dragon mutton dry starter with sauce on a plate",
  // Mutton Starters
  "mutton-fry": "crispy fried mutton pieces with curry leaves on a plate",
  "mutton-chilli": "mutton chilli dry starter with peppers on a plate",
  // Tandoori Non Veg. Starters
  "tandoori-chicken": "tandoori chicken with charred red skin on a plate",
  "kalmi-kabab": "kalmi kabab skewers grilled in the tandoor",
  "chicken-tikka": "chicken tikka skewers with char marks and onions",
  // Veg. Fried Rice
  "veg-jeera-rice": "jeera rice with cumin seeds served in a ceramic bowl",
  "veg-fried-rice": "vegetable fried rice with carrots, beans and spring onions",
  "shezwan-fried-rice": "shezwan fried rice with red sauce and vegetables",
  "curd-rice": "curd rice served in a ceramic bowl with garnish",
  // Non Veg. Fried Rice
  "egg-fried-rice": "egg fried rice with scrambled egg pieces and vegetables",
  "chicken-fried-rice": "chicken fried rice with visible chicken pieces and vegetables",
  "chicken-schezwan-rice": "schezwan chicken fried rice with red sauce",
  // Veg. Noodles
  "veg-noodles": "vegetable noodles tossed with carrots, beans and cabbage",
  "egg-noodles": "egg noodles with scrambled egg and vegetables",
  "chicken-noodles": "chicken noodles with identifiable chicken pieces and vegetables",
  // Veg. Curries
  "mix-veg-curry": "mixed vegetable curry in a ceramic bowl",
  "palak-curry": "plain palak spinach curry in a ceramic bowl",
  "dal-fry": "yellow dal fry with tempering in a steel bowl",
  "palak-paneer": "palak paneer with paneer cubes in spinach gravy",
  "paneer-butter-masala": "paneer cubes in rich butter masala gravy in a ceramic bowl",
  "kaju-tomato-curry": "kaju tomato curry with cashews in tomato gravy",
  "kadai-paneer": "kadai paneer with paneer cubes, peppers and tomatoes",
  "methi-chaman": "methi chaman paneer curry with fenugreek leaves",
  // Non Veg. Curries
  "chicken-curry": "chicken curry with tender chicken pieces in gravy",
  "gongura-chicken": "gongura chicken curry with sour gongura leaves",
  "kadai-chicken": "kadai chicken curry with peppers and tomatoes",
  "butter-chicken": "butter chicken with creamy tomato gravy",
  "egg-curry": "egg curry with boiled eggs in spiced gravy",
  // Sea Food Curry
  "prawns-curry": "prawns curry with visible prawns in masala gravy",
  "fish-curry": "fish curry with fish pieces in tamarind gravy",
  // Veg. Biryani's
  "kaju-biryani": "kaju biryani with cashews and saffron rice",
  "veg-biryani": "vegetable biryani with carrots, beans and cauliflower in saffron rice",
  "mushroom-biryani": "mushroom biryani with mushroom pieces in saffron rice",
  "paneer-biryani": "paneer biryani with paneer cubes mixed in saffron rice",
  // Non Veg. Biryani's
  "chicken-dum-biryani": "chicken dum biryani served in a copper handi",
  "chicken-fry-pieces-biryani": "chicken fry pieces biryani with fried chicken on saffron rice",
  "fish-biryani": "fish biryani with fish pieces in saffron rice",
  "mutton-biryani": "mutton biryani with tender mutton pieces in saffron rice",
  "prawns-biryani": "prawns biryani with visible prawns in saffron rice",
  "egg-biryani": "egg biryani with boiled egg halves in saffron rice",
  // Spl. Biryani's
  "full-moon-biryani": "Full Moon special biryani with chicken, egg and garnish",
  "spl-mix-biryani": "special mix biryani with chicken and prawns in saffron rice",
  "gongura-chicken-biryani": "chicken gongura biryani with sour gongura flavour",
  // Mutton Curry
  "kadai-mutton": "kadai mutton curry with mutton pieces, peppers and tomatoes",
  "gongura-mutton": "gongura mutton curry with mutton pieces and gongura leaves",
  "mutton-curry": "mutton curry with tender mutton pieces in rich gravy",
  // Roti
  "tandoori-roti": "tandoori roti with natural browned spots on a plate",
  "kothimeera-roti": "kothimeera roti with visible coriander leaves",
  "palak-kulcha": "palak kulcha stuffed flatbread with spinach",
  "butter-naan": "butter naan fresh from the tandoor with a brushed sheen",
  "garlic-naan": "garlic naan with garlic butter and herbs",
  "paneer-paratha": "paneer paratha stuffed flatbread on a plate",
  "roomali-roti": "thin roomali roti folded on a plate",
  // Brand / section imagery
  "hero-biryani": "chicken dum biryani served in a copper handi on a restaurant table",
  "intro-platter": "assorted Indian dishes arranged on a family restaurant table",
  "gallery-interior": "restaurant dining room with warm evening ambience",
  "gallery-veg-thali": "vegetarian thali meal with small bowls on a steel plate",
  "gallery-tandoor": "clay tandoor oven with marinated skewers in the restaurant kitchen",
};

/** Dish name → image path lookup used by every component. */
export const menuImageMap: Record<string, string> = Object.fromEntries(
  dishImagePairs.map(([dish, slug]) => [dish, `${MENU_DIR}/${slug}.jpg`]),
);

/** Dish name → slug, used to resolve the photographic caption. */
const dishSlug: Record<string, string> = Object.fromEntries(dishImagePairs);

/** Category → representative dish photograph (used for dropdown thumbnails). */
export const categoryImageMap: Record<string, string> = {
  "Veg. Soups": `${MENU_DIR}/veg-hot-and-sour-soup.jpg`,
  "Non Veg. Soups": `${MENU_DIR}/chicken-manchow-soup.jpg`,
  "Veg. Starters": `${MENU_DIR}/gobi-manchurian.jpg`,
  "Spl. Veg. Starters": `${MENU_DIR}/spl-veg-dry.jpg`,
  "Non Veg. Starters": `${MENU_DIR}/chicken-65.jpg`,
  "Sea Food (Bone Less)": `${MENU_DIR}/prawns-65.jpg`,
  "Spl. Nonveg Starters": `${MENU_DIR}/dragon-mutton.jpg`,
  "Mutton Starters": `${MENU_DIR}/mutton-fry.jpg`,
  "Tandoori Non Veg. Starters": "/images/gallery-tandoor.jpg",
  "Veg. Fried Rice": `${MENU_DIR}/veg-fried-rice.jpg`,
  "Spl. Veg. Fried Rice": `${MENU_DIR}/shezwan-fried-rice.jpg`,
  "Non Veg. Fried Rice": `${MENU_DIR}/chicken-fried-rice.jpg`,
  "Veg. Noodles": `${MENU_DIR}/veg-noodles.jpg`,
  "Veg. Curries": `${MENU_DIR}/paneer-butter-masala.jpg`,
  "Non Veg. Curries": `${MENU_DIR}/butter-chicken.jpg`,
  "Sea Food Curry": `${MENU_DIR}/prawns-curry.jpg`,
  "Veg. Biryani's": `${MENU_DIR}/veg-biryani.jpg`,
  "Non Veg. Biryani's": `${MENU_DIR}/chicken-dum-biryani.jpg`,
  "Spl. Biryani's": `${MENU_DIR}/full-moon-biryani.jpg`,
  "Mutton Curry": `${MENU_DIR}/mutton-curry.jpg`,
  Roti: `${MENU_DIR}/tandoori-roti.jpg`,
  "Special Biryani Offers": `${MENU_DIR}/spl-mix-biryani.jpg`,
};

/** Thumbnail for the "All items" option in each diet's category dropdown. */
export const dietOverviewImages = {
  veg: `${MENU_DIR}/veg-biryani.jpg`,
  "non-veg": `${MENU_DIR}/chicken-dum-biryani.jpg`,
} as const;

/** Homepage hero photograph. */
export const heroImage = {
  src: "/images/hero-biryani.jpg",
  alt: "Chicken dum biryani served in a copper handi on a restaurant table",
};

/** About-section photograph of a family restaurant table spread. */
export const introImage = {
  src: "/images/intro-platter.jpg",
  alt: "Assorted Indian dishes arranged on a family restaurant table",
};

/** Curated photo gallery — one photograph per tile, all distinct. */
export const galleryImages = [
  {
    src: `${MENU_DIR}/chicken-dum-biryani.jpg`,
    alt: "Chicken dum biryani served in a copper handi",
  },
  {
    src: `${MENU_DIR}/tandoori-chicken.jpg`,
    alt: "Tandoori chicken with charred red skin on a plate",
  },
  {
    src: `${MENU_DIR}/prawns-curry.jpg`,
    alt: "Prawns curry with visible prawns in masala gravy",
  },
  {
    src: `${MENU_DIR}/paneer-butter-masala.jpg`,
    alt: "Paneer cubes in rich butter masala gravy",
  },
  {
    src: "/images/gallery-veg-thali.jpg",
    alt: "Vegetarian thali meal with small bowls on a steel plate",
  },
  {
    src: "/images/gallery-interior.jpg",
    alt: "Restaurant dining room with warm evening ambience",
  },
  {
    src: "/images/gallery-tandoor.jpg",
    alt: "Clay tandoor oven with marinated skewers in the restaurant kitchen",
  },
] as const;

/**
 * Resolve the approved photograph for a dish. Falls back to a neutral
 * existing photograph instead of producing a broken image when a new dish
 * has no mapping yet.
 */
export function getMenuImage(dishName: string): string {
  return menuImageMap[dishName] ?? FALLBACK_MENU_IMAGE;
}

/** Descriptive alt text for a dish photograph. */
export function getMenuImageAlt(dishName: string): string {
  const slug = dishSlug[dishName];
  const caption = slug ? imageCaptions[slug] : undefined;
  return caption
    ? `${dishName} — ${caption} at FULL MOONs Family Restaurant`
    : `${dishName} from the FULL MOONs Family Restaurant menu`;
}

/** Representative category thumbnail for menu dropdowns. */
export function getCategoryImage(category: string): string {
  return categoryImageMap[category] ?? FALLBACK_MENU_IMAGE;
}
