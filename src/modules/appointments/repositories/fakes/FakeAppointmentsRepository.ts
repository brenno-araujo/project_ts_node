import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';
import Appointment from '../../infra/typeorm/entities/Appointment';
import AppointmentsRepositoryInterface from '@modules/appointments/repositories/AppointmentsRepositoryInterface';
import CreateAppointmentDTO from '@modules/appointments/dtos/CreateAppointmentDTO';

class AppointmentsRepository implements AppointmentsRepositoryInterface {
  private appointments: Appointment[] = [];

  public async create(dto: CreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid() }, dto);

    this.appointments.push(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointment || undefined;
  }
}

export default AppointmentsRepository;
