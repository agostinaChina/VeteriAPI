import Appointment from "../models/Appointments.js";

class AppointmentController {

    async getAll(req, res) {

        try {

            const appointments = await Appointment.find();

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