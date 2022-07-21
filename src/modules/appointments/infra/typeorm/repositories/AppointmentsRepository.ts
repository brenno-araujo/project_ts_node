import { getRepository, Repository } from 'typeorm';
import Appointment from '../entities/Appointment';
import AppointmentsRepositoryInterface from '@modules/appointments/repositories/AppointmentsRepositoryInterface';
import CreateAppointmentDTO from '@modules/appointments/dtos/CreateAppointmentDTO';

class AppointmentRepository implements AppointmentsRepositoryInterface {
  private ormRepository: Repository<Appointment>;

  construtor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async create(dto: CreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create(dto);

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment || undefined;
  }
}

export default AppointmentRepository;
