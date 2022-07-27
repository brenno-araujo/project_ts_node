import AppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import AppError from '@shared/errors/AppError';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const appointmentsRepository = new AppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      user_id: 'user-id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.user_id).toBe('user-id');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentsRepository = new AppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointmentDate = new Date('2020-01-01T12:00:00');

    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'user-id',
    });

    expect(
      createAppointment.execute({
        date: new Date('2020-01-01T12:00:00'),
        user_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
