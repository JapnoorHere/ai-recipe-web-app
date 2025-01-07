
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
    { cuisine: 'Italian', name: 'Spaghetti Carbonara', description: 'Pasta with eggs, cheese, and pancetta', image: 'https://www.sipandfeast.com/wp-content/uploads/2022/09/spaghetti-carbonara-recipe-snippet.jpg', diet: 'nonveg' },
    { cuisine: 'Italian', name: 'Lasagna', description: 'Layered pasta with meat and cheese', image: 'https://static01.nyt.com/images/2023/08/31/multimedia/RS-Lasagna-hkjl/RS-Lasagna-hkjl-threeByTwoMediumAt2X.jpg', diet: 'nonveg' },
    { cuisine: 'Italian', name: 'Bruschetta', description: 'Toasted bread with tomatoes and basil', image: 'https://images.themodernproper.com/billowy-turkey/production/posts/TomatoandAvocadoBruschetta_8.jpg?w=1200&h=1200&q=60&fm=jpg&fit=crop&dm=1690997775&s=4a0e918814cf59dcaf0d506f016bd650', diet: 'veg' },
    { cuisine: 'Italian', name: 'Risotto', description: 'Creamy rice dish with various flavors', image: 'https://pekis.net/sites/default/files/styles/wide/public/2024-10/creamy_risotto.webp?itok=9-A1Z0Up', diet: 'veg' },
    { cuisine: 'Italian', name: 'Caprese Salad', description: 'Tomatoes, mozzarella, and basil', image: 'Caprese Salad', diet: 'veg' },
    { cuisine: 'Italian', name: 'Gelato', description: 'Creamy Italian ice cream', image: 'https://yourguardianchef.com/wp-content/uploads/2023/02/Italian-Gelato-Recipe-Vanilla-Chocolate-and-Pistachios-1.jpg', diet: 'veg' },

    // Mexican Recipes
    { cuisine: 'Mexican', name: 'Guacamole', description: 'Creamy avocado dip', image: 'https://www.allrecipes.com/thmb/p4OH2iCMjg6-cgzI__Nwn9VR-r0=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/AR-RM-14064-easy-guacamole-ddmfs-3x4-9e4a1eb1bb34421a99db675b53a29e53.jpg', diet: 'veg' },
    { cuisine: 'Mexican', name: 'Quesadillas', description: 'Tortilla with melted cheese and fillings', image: 'https://cdn.loveandlemons.com/wp-content/uploads/2024/01/quesadilla.jpg', diet: 'veg' },
    { cuisine: 'Mexican', name: 'Pozole', description: 'Hominy soup with meat and spices', image: 'https://hips.hearstapps.com/hmg-prod/images/pozole-index-655b86b9eeb3f.jpg?crop=0.502xw:1.00xh;0.0561xw,0&resize=1200:*', diet: 'nonveg' },
    { cuisine: 'Mexican', name: 'Tamales', description: 'Corn dough with fillings steamed in corn husks', image: 'https://www.thespruceeats.com/thmb/j0ICWLtIHhhsToqF_tQMP5Qj6g4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/tamales-56a58b275f9b58b7d0dd4fb1.jpg', diet: 'veg' },

    // American Recipes
    { cuisine: 'American', name: 'Mac and Cheese', description: 'Creamy pasta with cheese sauce', image: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F03%2F19%2F238691-Simple-Macaroni-And-Cheese-mfs_006.jpg&w=160&q=60&c=sc&poi=auto&orient=true&h=90', diet: 'veg' },
    { cuisine: 'American', name: 'Fried Chicken', description: 'Crispy and golden fried chicken', image: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2023/2/23/FNK_Indian-Fried-Chicken_s4x3.jpg.rend.hgtvcom.1280.960.suffix/1677264108617.webp', diet: 'nonveg' },
    { cuisine: 'American', name: 'Apple Pie', description: 'Classic dessert with spiced apple filling', image: 'https://www.inspiredtaste.net/wp-content/uploads/2019/11/Homemade-Apple-Pie-From-Scratch-1200.jpg', diet: 'veg' },
    { cuisine: 'American', name: 'Cornbread', description: 'Moist and sweet bread', image: 'https://www.foodnetwork.com/content/dam/images/food/fullset/2015/4/15/0/GE_Cast-Iron-Skillet-Corn-Bread_s4x3.jpg', diet: 'veg' },
    { cuisine: 'American', name: 'Clam Chowder', description: 'Creamy soup with clams and potatoes', image: 'https://www.howtocook.recipes/wp-content/uploads/2022/02/Clam-chowder-recipe-500x375.jpg', diet: 'nonveg' },

    // Desserts
    { cuisine: 'Desserts', name: 'Chocolate Cake', description: 'Rich and moist chocolate dessert', image: 'https://www.hersheyland.com/content/dam/hersheyland/en-us/recipes/recipe-images/2-hersheys-perfectly-chocolate-chocolate-cake-recipe-hero.jpg', diet: 'veg' },
    { cuisine: 'Desserts', name: 'Cheesecake', description: 'Creamy dessert with a biscuit base', image: 'https://res.cloudinary.com/hksqkdlah/image/upload/22870_sfs-foolproof-new-york-style-cheesecake-14.jpg', diet: 'veg' },
    { cuisine: 'Desserts', name: 'Brownies', description: 'Fudgy chocolate squares', image: 'https://www.allrecipes.com/thmb/Bf_v7CGEIk1T0KOYsBeGdcs56Lo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-9599-Quick-Easy-Brownies-ddmfs-4x3-697df57aa40a45f8a7bdb3a089eee2e5.jpg', diet: 'veg' },
    { cuisine: 'Desserts', name: 'Ice Cream Sundae', description: 'Ice cream topped with sauces and nuts', image: 'https://hips.hearstapps.com/hmg-prod/images/dsc03299-sc-1623764031.jpeg?crop=0.550xw:0.823xh;0.221xw,0.161xh&resize=640:*', diet: 'veg' },
    { cuisine: 'Desserts', name: 'Panna Cotta', description: 'Creamy Italian dessert', image: 'https://www.cookingclassy.com/wp-content/uploads/2021/05/panna-cotta-01-500x500.jpg', diet: 'veg' },
    { cuisine: 'Desserts', name: 'Lemon Tart', description: 'Tangy and sweet lemon dessert', image: 'https://www.recipetineats.com/tachyon/2021/06/French-Lemon-Tart_5-main-SQ.jpg', diet: 'veg' },
];


export { categories, recipes };
