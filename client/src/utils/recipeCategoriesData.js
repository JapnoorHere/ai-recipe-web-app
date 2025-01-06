
const categories = ['Indian', 'Chinese', 'Italian', 'Mexican', 'American', 'Desserts'];

const recipes = [
    // Indian Recipes
    { type: 'Indian', name: 'Butter Chicken', description: 'Rich and creamy chicken curry', image: '/images/butter-chicken.jpg', diet: 'nonveg' },
    { type: 'Indian', name: 'Paneer Tikka', description: 'Spiced and grilled paneer cubes', image: '/images/paneer-tikka.jpg', diet: 'veg' },
    { type: 'Indian', name: 'Masala Dosa', description: 'Crispy rice crepe with spiced potatoes', image: '/images/masala-dosa.jpg', diet: 'veg' },
    { type: 'Indian', name: 'Biryani', description: 'Aromatic spiced rice with meat or vegetables', image: '/images/biryani.jpg', diet: 'nonveg' },
    { type: 'Indian', name: 'Chole Bhature', description: 'Spiced chickpeas with fried bread', image: '/images/chole-bhature.jpg', diet: 'veg' },
    { type: 'Indian', name: 'Rogan Josh', description: 'Flavorful lamb curry', image: '/images/rogan-josh.jpg', diet: 'nonveg' },

    // Chinese Recipes
    { type: 'Chinese', name: 'Kung Pao Chicken', description: 'Stir-fried chicken with peanuts and chili peppers', image: '/images/kung-pao-chicken.jpg', diet: 'nonveg' },
    { type: 'Chinese', name: 'Spring Rolls', description: 'Crispy rolls filled with vegetables or meat', image: '/images/spring-rolls.jpg', diet: 'veg' },
    { type: 'Chinese', name: 'Fried Rice', description: 'Rice stir-fried with vegetables, eggs, and meat', image: '/images/fried-rice.jpg', diet: 'nonveg' },
    { type: 'Chinese', name: 'Sweet and Sour Pork', description: 'Tangy and flavorful pork dish', image: '/images/sweet-sour-pork.jpg', diet: 'nonveg' },
    { type: 'Chinese', name: 'Wonton Soup', description: 'Soup with wonton dumplings', image: '/images/wonton-soup.jpg', diet: 'nonveg' },
    { type: 'Chinese', name: 'Chow Mein', description: 'Stir-fried noodles with vegetables and meat', image: '/images/chow-mein.jpg', diet: 'nonveg' },

    // Italian Recipes
    { type: 'Italian', name: 'Spaghetti Carbonara', description: 'Pasta with eggs, cheese, and pancetta', image: '/images/spaghetti-carbonara.jpg', diet: 'nonveg' },
    { type: 'Italian', name: 'Lasagna', description: 'Layered pasta with meat and cheese', image: '/images/lasagna.jpg', diet: 'nonveg' },
    { type: 'Italian', name: 'Bruschetta', description: 'Toasted bread with tomatoes and basil', image: '/images/bruschetta.jpg', diet: 'veg' },
    { type: 'Italian', name: 'Risotto', description: 'Creamy rice dish with various flavors', image: '/images/risotto.jpg', diet: 'veg' },
    { type: 'Italian', name: 'Caprese Salad', description: 'Tomatoes, mozzarella, and basil', image: '/images/caprese-salad.jpg', diet: 'veg' },
    { type: 'Italian', name: 'Gelato', description: 'Creamy Italian ice cream', image: '/images/gelato.jpg', diet: 'veg' },

    // Mexican Recipes
    { type: 'Mexican', name: 'Guacamole', description: 'Creamy avocado dip', image: '/images/guacamole.jpg', diet: 'veg' },
    { type: 'Mexican', name: 'Enchiladas', description: 'Rolled tortillas filled with meat and cheese', image: '/images/enchiladas.jpg', diet: 'nonveg' },
    { type: 'Mexican', name: 'Churros', description: 'Crispy fried dough with cinnamon sugar', image: '/images/churros.jpg', diet: 'veg' },
    { type: 'Mexican', name: 'Quesadillas', description: 'Tortilla with melted cheese and fillings', image: '/images/quesadillas.jpg', diet: 'veg' },
    { type: 'Mexican', name: 'Pozole', description: 'Hominy soup with meat and spices', image: '/images/pozole.jpg', diet: 'nonveg' },
    { type: 'Mexican', name: 'Tamales', description: 'Corn dough with fillings steamed in corn husks', image: '/images/tamales.jpg', diet: 'veg' },

    // American Recipes
    { type: 'American', name: 'BBQ Ribs', description: 'Juicy ribs with smoky barbecue sauce', image: '/images/bbq-ribs.jpg', diet: 'nonveg' },
    { type: 'American', name: 'Mac and Cheese', description: 'Creamy pasta with cheese sauce', image: '/images/mac-and-cheese.jpg', diet: 'veg' },
    { type: 'American', name: 'Fried Chicken', description: 'Crispy and golden fried chicken', image: '/images/fried-chicken.jpg', diet: 'nonveg' },
    { type: 'American', name: 'Apple Pie', description: 'Classic dessert with spiced apple filling', image: '/images/apple-pie.jpg', diet: 'veg' },
    { type: 'American', name: 'Cornbread', description: 'Moist and sweet bread', image: '/images/cornbread.jpg', diet: 'veg' },
    { type: 'American', name: 'Clam Chowder', description: 'Creamy soup with clams and potatoes', image: '/images/clam-chowder.jpg', diet: 'nonveg' },

    // Desserts
    { type: 'Desserts', name: 'Chocolate Cake', description: 'Rich and moist chocolate dessert', image: '/images/chocolate-cake.jpg', diet: 'veg' },
    { type: 'Desserts', name: 'Cheesecake', description: 'Creamy dessert with a biscuit base', image: '/images/cheesecake.jpg', diet: 'veg' },
    { type: 'Desserts', name: 'Brownies', description: 'Fudgy chocolate squares', image: '/images/brownies.jpg', diet: 'veg' },
    { type: 'Desserts', name: 'Ice Cream Sundae', description: 'Ice cream topped with sauces and nuts', image: '/images/ice-cream-sundae.jpg', diet: 'veg' },
    { type: 'Desserts', name: 'Panna Cotta', description: 'Creamy Italian dessert', image: '/images/panna-cotta.jpg', diet: 'veg' },
    { type: 'Desserts', name: 'Lemon Tart', description: 'Tangy and sweet lemon dessert', image: '/images/lemon-tart.jpg', diet: 'veg' },
];


export { categories, recipes };
