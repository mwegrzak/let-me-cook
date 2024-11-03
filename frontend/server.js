import { createServer, Model, Response } from "miragejs"


createServer({
    models: {
        recipes: Model,
        users: Model
    },

    /* 
        *************************************************************
        ************************** RECIPES **************************
        *************************************************************
    */
    seeds(server) {
        server.create("recipe", {
            id: "1",
            name: "Bran Muffins",
            author: "admin",
            userId: 1,
            prepTime: "30 minutes",
            isPublic: true,
            cookTime: "1 hour",
            servings: "4",
            difficulty: "easy",
            ingredients: ["1 cup (60g) wheat bran", "1 1/2 cups (180g) white whole wheat flour", "2 teaspoons baking powder", "1/2 teaspoon baking soda", "1/2 teaspoon kosher salt", "1/2 teaspoon ground cinnamon", "1/3 cup (77g) light brown sugar", "1/3 cup (113g) honey", "1/3 cup (70g) unsalted butter, melted", "2 large eggs, room temperature", "3/4 cup unsweetened applesauce (140g) or mashed ripe banana (170g)", "3/4 cup (180ml) buttermilk", "1 teaspoon vanilla extract"],
            description: "A malty, nutty, and sweet breakfast muffin with an easy trick for a moist and flavorful crumb.",
            directions: [
                { step: "Preheat the oven to 350 Farenheit degrees", description: "" },
                { step: "Toast the wheat bran", description: "Spread the wheat bran out on a baking sheet. The baking sheet doesn't need to be lined with parchment, but it does make it easier to transfer the toasted bran to the mixing bowl" },
                { step: "Prepare the muffin pan", description: " Increase the oven temperature to 425°F. Very lightly spray the tops of 2 standard muffin pans with nonstick baking spray (no need to grease the cavities, this is just to help the muffin tops release from the pan). Line every other cavity with a paper liner." },
                { step: "Combine the dry ingredients and wet ingredients", description: " In a medium bowl, whisk together the toasted wheat bran (it’s okay if it’s still warm), flour, baking powder, baking soda, salt, and cinnamon, and set aside. In a large bowl, whisk together the brown sugar, honey, and melted butter until smooth. Add the eggs, one at a time, whisking until fully combined before adding the next. Add the applesauce or mashed banana, followed by the buttermilk and vanilla extract." },
                { step: "Combine the wet and dry ingredients", description: " Add the flour mixture to the wet ingredients. Fold with a silicone spatula just until combined and no dry streaks of flour remain.Use a cookie scoop or a couple of spoons to divide the batter evenly among the 12 paper liners. They will be filled nearly to the top." },
                { step: "Bake", description: " Bake the muffins for 5 minutes. Reduce the oven temperature to 350°F without opening the door. Continue baking for 10 to 13 minutes, or until a toothpick inserted into the center of one of the muffins comes out clean. " },
                { step: "Cool muffins and serve", description: " Allow the muffins to cool in the pan for 5 minutes before transferring them to a wire rack to finish cooling. Serve warm or at room temperature. " }
            ],
            imageUrl: "https://www.simplyrecipes.com/thmb/cvOjc9W1eNwGQFN0V3aCrdpkXZs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/SimplyRecipes_BranMuffins_LEAD_7-fd45c486d07348438b564e34f6013713.jpg",
            score: { 1: 2, 2: 6, 3: 4, 4: 20, 5: 60 },
            tags: ['breakfast', 'vegetarian', 'muffins']
        })

        server.create("recipe", {
            id: "2",
            name: "BBQ Chicken Pizza",
            author: "admin",
            userId: 1,
            prepTime: "1 hour",
            isPublic: true,
            cookTime: "15 minutes",
            servings: "8",
            difficulty: "easy",
            ingredients: ["1 (12 inch) pre-baked pizza crust", "1 cup spicy barbeque sauce", "2 skinless boneless chicken breast halves, cooked and cubed", "1 cup sliced pepperoncini peppers", "1 cup chopped red onion", "½ cup chopped fresh cilantro", "2 cups shredded Colby-Jack cheese"],
            description: "",
            directions: [
                { step: "Gather all ingredients. Preheat the oven to 350 degrees F (175 degrees C).", description: "This BBQ chicken pizza has spicy barbecue sauce, diced chicken, peppers, onion, and cilantro, all covered with cheese and baked to bubbly goodness! This is similar to a recipe I had at a popular pizza place in California. My family loves it!" },
                { step: "Place pizza crust on a baking sheet. Spread barbeque sauce on crust. ", description: "" },
                { step: "Top with chicken, pepperoncini peppers, onion, and cilantro.  Cover with Colby-Jack cheese. ", description: "" },
                { step: "Bake in the preheated oven until cheese is melted and bubbly, about 15 minutes. ", description: "" }
            ],
            imageUrl: "https://www.allrecipes.com/thmb/tUOuFVtAmMKG-fxojt_ronfEjaY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-24878-bbq-chicken-pizza-beauty-4x3-39cd80585ad04941914dca4bd82eae3d.jpg",
            score: { 1: 2, 2: 3, 3: 4, 4: 20, 5: 100 },
            tags: ['italian', 'dinner']
        })


        server.create("recipe", {
            id: "3",
            name: "Lazy Wonton Soup",
            author: "Teofil Jesionowski",
            userId: 3,
            prepTime: "30 minutes",
            cookTime: "1 hour",
            isPublic: false,
            servings: "4",
            difficulty: "easy",
            ingredients: ["2 quarts chicken stock or broth", "1 bunch green onions, divided", "1 garlic clove, thinly sliced", "1 (3-inch) piece fresh ginger, peeled, or 2 teaspoons ground ginger", "2 tablespoons soy sauce, plus more to taste", "1 1/2 teaspoons rice vinegar", "1 tablespoon brown sugar", "1 teaspoon kosher salt, divided", "1 pound ground pork", "2 teaspoons toasted sesame oil", "2 teaspoons cornstarch", "3 heads baby bok choy, roughly chopped (about 3 cups)", "20 wonton wrappers, cut into quarters", "Sriracha hot sauce or chili crunch (optional)"],
            description: "For this lazy wonton soup, you skip making filled wontons, and drop pork meatballs and quartered wonton wrappers right into the gingery, flavorful broth. This recipe is SO delicious!",
            directions: [
                { step: "Prepare chicken stock", description: "Place chicken stock in a large saucepan or Dutch oven over medium-high heat. Cut white parts of green onions into 1-inch pieces and add to broth. Add garlic clove. Thinly slice 1 inch ginger (or 1 teaspoon ground)  and add to stock. Add 1 tablespoon soy sauce, vinegar, brown sugar and 1/2 teaspoon salt. Bring mixture to a boil, stirring occasionally. " },
                { step: "Make filling", description: "Place pork in a bowl. Finely slice remaining green parts of green onions. Set aside 3 tablespoons for garnish. Add remaining onions to the bowl; grate in remaining 2-inch piece of ginger. Add remaining soy sauce, remaining salt, sesame oil, and cornstarch to the bowl; mix until well combined.   " },
                { step: "Boil ", description: "Form mixture into 1-inch balls and add to broth. Alternatively, use a small spoon to drop heaping teaspoons full of meat into broth. Reduce heat to a simmer; cook 5 minutes. Add wonton wrappers, bok choy, and additional soy sauce to taste. Cook 8 minutes, stirring occasionally." },
                { step: "Serve", description: "Serve with reserved green onions and hot sauce or chili crisp if desired." }
            ],
            imageUrl: "https://www.allrecipes.com/lazy-wonton-soup-recipe-8604015",
            score: { 1: 2, 2: 3, 3: 4, 4: 20, 5: 60 },
            tags: ['chinese', 'dinner', 'soup']
        })


        server.create("recipe", {
            id: "4",
            name: "Mama's Banana Pudding",
            author: "Bob Ziroll",
            userId: 2,
            prepTime: "30 minutes",
            isPublic: true,
            cookTime: "2 hours",
            servings: "24",
            difficulty: "medium",
            ingredients: ["1 cup plus 1 tablespoon sugar", "1/2 cup flour", "1/8 teaspoon salt", "6 cups whole milk", "6 egg yolks", "3 eggs", "1/2 cup butter", "3 teaspoons vanilla extract", "9 ripe bananas", "2 (12 ounce) boxes vanilla wafers", "6 egg whites (see “Test Kitchen Tip”)", "1/4 teaspoon cream of tartar"],
            description: "Dolly Parton and her sister Rachel Parton Geroge grew up with their mama, grandmas, and aunts making this classic dessert from scratch.",
            directions: [
                { step: "", description: "Stir together 1 cup sugar, the flour, and salt in a large bowl. Whisk in milk, egg yolks, and whole eggs until well combined and smooth." },
                { step: "", description: " Melt butter in a large saucepan over medium heat. Pour milk mixture into saucepan with butter; reduce heat to medium-low and whisk constantly until the mixture has thickened, coats the back of a spoon nicely, and begins to bubble, about 20 minutes. Remove from heat and stir in 2 teaspoons vanilla. Cover and let custard cool to room temperature, about 1 hour. (It will continue to thicken as it cools.) " },
                { step: "", description: " Peel and slice bananas. Line the bottom and sides of 2 (9x13-inch) broiler-safe casserole dishes with vanilla wafers. Layer banana slices over wafers. Pour cooled custard over bananas and wafers, smoothing top with a knife or spatula. " },
                { step: "", description: " For meringue, in a large clean bowl, using an electric mixer or a stand mixer fitted with the whisk attachment, beat egg whites, cream of tartar, and the remaining 1 tablespoon sugar and 1 teaspoon vanilla at high speed until stiff peaks form, about 5 minutes. Spoon meringue over top of custard, covering it completely. " },
                { step: "", description: " Set oven rack about 4 inches from broiler; turn broiler to high. Quickly broil meringues until browned, about 1 to 2 minutes. (This happens very quickly, so keep a close eye on it.) " },
                { step: "", description: " Remove dishes from oven, allow meringue to cool slightly, about 15 minutes, and serve. (Chill, covered, up to 4 days.)" }
            ],
            imageUrl: "https://www.allrecipes.com/thmb/_sRnQ1LZJ8R0SUPkbVWNFXzvGto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/8707679-mamas-banana-pudding-4x3-2b1439f987664c7d83377974fb8761fe.jpg",
            score: { 1: 2, 2: 3, 3: 4, 4: 20, 5: 60 },
            tags: ['desert', 'vegetarian', '']
        })
        /*

        server.create("recipe", {
            id: "5",
            name: "",
            author: "admin",
            userId: 3,
            prepTime: "30 minutes",
            isPublic: true,
            cookTime: "1 hour",
            servings: "",
            difficulty: "easy",
            ingredients: [""],
            description: "",
            directions: [
                { step: "", description: "" },
                { step: "", description: "" },
                { step: "", description: "" },
                { step: "", description: "" }
            ],
            imageUrl: "",
            score: { 1: 2, 2: 3, 3: 4, 4: 20, 5: 60 },
            tags: ['', '', '']
        })
            */

        /* 
        *************************************************************
        *************************** USERS ***************************
        *************************************************************
        */

        server.create("user", {
            id: "1",
            username: "Administrator",
            password: "admin",
            email: "admin@put.local",
            isAdmin: true
        })

        server.create("user", {
            id: "2",
            username: "Bob Ziroll",
            email: "bob.ziroll@put.local",
            password: "srimba",
            isAdmin: false
        })

        server.create("user", {
            id: "3",
            username: "Teofil Jesionowski",
            email: "rektor@put.local",
            password: "polibuda",
            isAdmin: false
        })
    },



    /* 
    *************************************************************
    **************************** API ****************************
    *************************************************************
    */
    routes() {
        this.namespace = "api"
        this.logging = false
        this.timing = 1000

        this.get("/recipes", (schema, request) => {
            // return new Response(400, {}, {error: "Error fetching data"})
            return schema.recipes.all()
        })

        this.get("/recipe/:id", (schema, request) => {
            const id = request.params.id
            return schema.recipes.find(id)
        })

        this.get("/users", (schema, request) => {
            return schema.recipes.where({ hostId: "123" })
        })

        this.get("/recipes/:id", (schema, request) => {

            const id = request.params.id
            return schema.recipes.findBy({ id, hostId: "123" })
        })

        this.post("/login", (schema, request) => {
            const { email, password } = JSON.parse(request.requestBody)
            const foundUser = schema.users.findBy({ email, password })
            if (!foundUser) {
                return new Response(401, {}, { message: "No user with those credentials found!" })
            }

            foundUser.password = undefined
            return {
                user: foundUser,
                token: "Enjoy your pizza, here's your tokens."
            }
        })
    }
})