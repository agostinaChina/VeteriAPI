import Pet from "../models/Pets.js";

class PetController {

  async getAll(req, res) {

    try {

        const { type, breed, name } = req.query;

        const filter = {};

        if (type) {
            filter.type = type;
        }

        if (breed) {
            filter.breed = breed;
        }

        if (name) {
            filter.name = name;
        }

        const pets = await Pet.find(filter);

        res.json({
            message: 'success',
            data: pets
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Error al obtener las mascotas'
        });

    }
}

    async getById(req, res) {

        try {

            const id = req.params.id;

            const pet = await Pet.findById(id);

            if (!pet) {
                return res.status(404).json({
                    message: 'Mascota no encontrada'
                });
            }

            res.json({
                message: 'success',
                data: pet
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                message: 'Error al obtener la mascota'
            });

        }
    }

    async create(req, res) {

        try {

            const { name, type, breed, age, owner } = req.body;

            if (!name || !type || !breed || age === undefined || !owner) {
                return res.status(403).send('Faltan Parametros Obligatorios');
            }

            const pet = await Pet.create({
                name,
                type,
                breed,
                age,
                owner
            });

            res.json({
                message: 'success',
                data: pet
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                message: 'Error al crear la mascota'
            });

        }
    }

    async update(req, res) {

    try {

        const id = req.params.id;

        const { name, type, breed, age, owner, active } = req.body;

        if (!name || !type || !breed || age === undefined || !owner || active === undefined) {
            return res.status(403).send('Faltan Parametros Obligatorios');
        }

        const pet = await Pet.findByIdAndUpdate(
            id,
            { name, type, breed, age, owner, active },
            { new: true }
        );

        if (!pet) {
            return res.status(404).json({
                message: 'Mascota no encontrada'
            });
        }

        res.json({
            message: 'success',
            data: pet
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Error al actualizar la mascota'
        });

    }
}

async delete(req, res) {

    try {

        const id = req.params.id;

        const pet = await Pet.findByIdAndDelete(id);

        if (!pet) {
            return res.status(404).json({
                message: 'Mascota no encontrada'
            });
        }

        res.json({
            message: 'success'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Error al eliminar la mascota'
        });

    }
}

}

export default PetController;