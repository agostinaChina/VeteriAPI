import Appointment from "../models/Appointments.js";
import Pet from "../models/Pets.js";

class AppointmentController {

   async getAll(req, res) {

    try {

        let appointments;

       if (req.user.role === 'admin') {
    appointments = await Appointment.find()
        .populate('pet')
        .populate('veterinarian');
} else {
    const pets = await Pet.find({ owner: req.user._id });
    const petIds = pets.map(pet => pet._id.toString());

    appointments = await Appointment.find({
        pet: { $in: petIds }
    })
        .populate('pet')
        .populate('veterinarian');
}

        res.json({
            message: 'success',
            data: appointments
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Error al obtener los turnos'
        });

    }
}
    async create(req, res) {

    try {

        const { pet, veterinarian, date, time, reason } = req.body;

        if (!pet || !veterinarian || !date || !time || !reason) {
            return res.status(403).send('Faltan Parametros Obligatorios');
        }

        if (req.user.role !== 'admin') {
            const mascota = await Pet.findById(pet);

            if (!mascota || mascota.owner.toString() !== req.user._id) {
                return res.status(403).json({
                    message: 'No tenés permiso para solicitar un turno para esta mascota'
                });
            }
        }

        const appointment = await Appointment.create({
            pet,
            veterinarian,
            date,
            time,
            reason
        });

        res.json({
            message: 'success',
            data: appointment
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Error al crear el turno'
        });

    }
}
    async update(req, res) {

    try {

        const id = req.params.id;

        const { pet, veterinarian, date, time, reason, active } = req.body;

        if (!pet || !veterinarian || !date || !time || !reason || active === undefined) {
            return res.status(403).send('Faltan Parametros Obligatorios');
        }

      const appointment = await Appointment.findByIdAndUpdate(
    id,
    { pet, veterinarian, date, time, reason, active },
    { new: true }
);
        if (!appointment) {
            return res.status(404).json({
                message: 'Turno no encontrado'
            });
        }

        res.json({
            message: 'success',
            data: appointment
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Error al actualizar el turno'
        });

    }
}

    async delete(req, res) {

    try {

        const id = req.params.id;

        const appointment = await Appointment.findByIdAndDelete(id);

        if (!appointment) {
            return res.status(404).json({
                message: 'Turno no encontrado'
            });
        }

        res.json({
            message: 'success'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Error al eliminar el turno'
        });

    }
}

}

export default AppointmentController;