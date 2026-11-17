import petRouter from './petRouter.js';
import appointmentRouter from './appointmentRouter.js';
import userRouter from './userRouter.js';
import authRouter from './authRouter.js';
import veterinarianRouter from './veterinariansRouter.js';

const routerAPI = (app) => {

    app.use('/api/pets', petRouter);
    app.use('/api/appointments', appointmentRouter);
    app.use('/api/users', userRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/veterinarians', veterinarianRouter);

}

export default routerAPI;