
const categories = ['Indian', 'Chinese', 'Italian', 'Mexican', 'American', 'Desserts'];

const recipes = [
    // Indian Recipes
    { cuisine: 'Indian', name: 'Butter Chicken', description: 'Rich and creamy chicken curry', image: 'https://www.thecookierookie.com/wp-content/uploads/2022/08/Featured-Indian-butter-chicken-1.jpg', diet: 'nonveg' },
    { cuisine: 'Indian', name: 'Paneer Tikka', description: 'Spiced and grilled paneer cubes', image: 'https://smartchef.ttkprestige.com/wp-content/uploads/2022/04/paneer-tikka.jpg', diet: 'veg' },
    { cuisine: 'Indian', name: 'Masala Dosa', description: 'Crispy rice crepe with spiced potatoes', image: 'https://static01.nyt.com/images/2015/01/28/dining/28KITCHEN1/28KITCHEN1-superJumbo.jpg', diet: 'veg' },
    { cuisine: 'Indian', name: 'Biryani', description: 'Aromatic spiced rice with meat or vegetables', image: 'https://www.cubesnjuliennes.com/wp-content/uploads/2020/07/Chicken-Biryani-Recipe.jpg', diet: 'nonveg' },
    { cuisine: 'Indian', name: 'Chole Bhature', description: 'Spiced chickpeas with fried bread', image: 'https://en-media.thebetterindia.com/uploads/2022/08/294156779_1082267416022212_8006411537588067133_n-1_11zon-1660981126.jpg', diet: 'veg' },

    // Chinese Recipes
    { cuisine: 'Chinese', name: 'Spring Rolls', description: 'Crispy rolls filled with vegetables or meat', image: 'https://cdn.pixabay.com/photo/2018/03/15/12/16/food-3228057_640.jpg', diet: 'veg' },
    { cuisine: 'Chinese', name: 'Fried Rice', description: 'Rice stir-fried with vegetables, eggs, and meat', image: 'https://cdn.pixabay.com/photo/2018/03/15/12/16/food-3228057_640.jpg', diet: 'nonveg' },
    { cuisine: 'Chinese', name: 'Chow Mein', description: 'Stir-fried noodles with vegetables and meat', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlFVtH9TvpKA-zF2uuGX4ChVVl6GZNAtV8og&s', diet: 'nonveg' },

    // Italian Recipes
    { cuisine: 'Italian', name: 'Spaghetti Carbonara', description: 'Pasta with eggs, cheese, and pancetta', image: '/images/spaghetti-carbonara.jpg', diet: 'nonveg' },
    { cuisine: 'Italian', name: 'Lasagna', description: 'Layered pasta with meat and cheese', image: '/images/lasagna.jpg', diet: 'nonveg' },
    { cuisine: 'Italian', name: 'Bruschetta', description: 'Toasted bread with tomatoes and basil', image: '/images/bruschetta.jpg', diet: 'veg' },
    { cuisine: 'Italian', name: 'Risotto', description: 'Creamy rice dish with various flavors', image: '/images/risotto.jpg', diet: 'veg' },
    { cuisine: 'Italian', name: 'Caprese Salad', description: 'Tomatoes, mozzarella, and basil', image: '/images/caprese-salad.jpg', diet: 'veg' },
    { cuisine: 'Italian', name: 'Gelato', description: 'Creamy Italian ice cream', image: '/images/gelato.jpg', diet: 'veg' },

    // Mexican Recipes
    { cuisine: 'Mexican', name: 'Guacamole', description: 'Creamy avocado dip', image: '/images/guacamole.jpg', diet: 'veg' },
    { cuisine: 'Mexican', name: 'Quesadillas', description: 'Tortilla with melted cheese and fillings', image: '/images/quesadillas.jpg', diet: 'veg' },
    { cuisine: 'Mexican', name: 'Pozole', description: 'Hominy soup with meat and spices', image: '/images/pozole.jpg', diet: 'nonveg' },
    { cuisine: 'Mexican', name: 'Tamales', description: 'Corn dough with fillings steamed in corn husks', image: '/images/tamales.jpg', diet: 'veg' },

    // American Recipes
    { cuisine: 'American', name: 'Mac and Cheese', description: 'Creamy pasta with cheese sauce', image: '/images/mac-and-cheese.jpg', diet: 'veg' },
    { cuisine: 'American', name: 'Fried Chicken', description: 'Crispy and golden fried chicken', image: '/images/fried-chicken.jpg', diet: 'nonveg' },
    { cuisine: 'American', name: 'Apple Pie', description: 'Classic dessert with spiced apple filling', image: '/images/apple-pie.jpg', diet: 'veg' },
    { cuisine: 'American', name: 'Cornbread', description: 'Moist and sweet bread', image: '/images/cornbread.jpg', diet: 'veg' },
    { cuisine: 'American', name: 'Clam Chowder', description: 'Creamy soup with clams and potatoes', image: '/images/clam-chowder.jpg', diet: 'nonveg' },

    // Desserts
    { cuisine: 'Desserts', name: 'Chocolate Cake', description: 'Rich and moist chocolate dessert', image: '/images/chocolate-cake.jpg', diet: 'veg' },
    { cuisine: 'Desserts', name: 'Cheesecake', description: 'Creamy dessert with a biscuit base', image: '/images/cheesecake.jpg', diet: 'veg' },
    { cuisine: 'Desserts', name: 'Brownies', description: 'Fudgy chocolate squares', image: '/images/brownies.jpg', diet: 'veg' },
    { cuisine: 'Desserts', name: 'Ice Cream Sundae', description: 'Ice cream topped with sauces and nuts', image: '/images/ice-cream-sundae.jpg', diet: 'veg' },
    { cuisine: 'Desserts', name: 'Panna Cotta', description: 'Creamy Italian dessert', image: '/images/panna-cotta.jpg', diet: 'veg' },
    { cuisine: 'Desserts', name: 'Lemon Tart', description: 'Tangy and sweet lemon dessert', image: '/images/lemon-tart.jpg', diet: 'veg' },
];


export { categories, recipes };
