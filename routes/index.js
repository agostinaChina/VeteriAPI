import petRouter from './petRouter.js';
import appointmentRouter from './appointmentRouter.js';
import userRouter from './userRouter.js';

const routerAPI = (app) => {

    app.use('/api/pets', petRouter);
    app.use('/api/appointments', appointmentRouter);
    app.use('/api/users', userRouter);

}

export default routerAPI;