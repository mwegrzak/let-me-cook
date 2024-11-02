import express from 'express';

const router = express.Router();

// route for getting all receipes
router.get('/', async (request, response) => {
    try{
        const receipes = await Receipe.find({});
        return response.status(200).json({
            count: receipes.length,
            data: receipes
        });
        
    } catch(error){
        console.log(error);
        return response.status(500).send({message: error.message});
    }
});

// route for getting receipe by id
router.get('/:id', async (request, response) => {
    try{
        const { id } = request.params;
        const receipe = await Receipe.findById(id);
        return response.status(200).json(receipe);
        
    } catch(error){
        console.log(error);
        return response.status(500).send({ message: error.message });
    }
});

// route for creating new receipe
router.post('/', async (request, response) => {
    try {
        if (
        !request.body.name ||
        !request.body.ingredients ||
        !request.body.author
        ) {
            return response.status(400).send(
                {message: 'Required fields: name, ingredients, author'}
            );
        };

        const newReceipe = {
            name: request.body.name,
            ingredients: request.body.ingredients,
            author: request.body.author
        };

        const receipe = await Receipe.create(newReceipe);
        return response.status(201).send(receipe);

    } catch (error) {
        console.group(error.message);
        response.status(500).send({ message: error.message});

    };
});

// route for deleting a receipe
router.delete('/:id', async (request, response) => {
    try{
        const { id } = request.params;
        const receipe = await Receipe.findByIdAndDelete(id, request.body);
        if (!result) {
            return response.status(404).json({ message: 'Receipe not found'})
        }
        return response.status(200).json(receipe);
        
    } catch(error){
        console.log(error);
        return response.status(500).send({ message: error.message });
    }
});

// route for modyfing receipe
router.patch('/:id', async (request, response) => {
    try{
        const { id } = request.params;
        const receipe = await Receipe.findByIdAndUpdate(id, request.body);
        return response.status(200).json(receipe);
        
    } catch(error){
        console.log(error);
        return response.status(500).send({ message: error.message });
    }
});

export default router;