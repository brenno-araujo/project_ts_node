import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import CreateAppointmentDTO from '../dtos/CreateAppointmentDTO';

import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentsRepositoryInterface from '../repositories/AppointmentsRepositoryInterface';

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: AppointmentsRepositoryInterface,
  ) {}

  public async execute(dto: CreateAppointmentDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(dto.date);

    const findAppointmentInSameDate =
      await this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create(dto);

    return appointment;
  }
}

export default CreateAppointmentService;
