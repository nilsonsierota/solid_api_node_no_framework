import { Appointment } from '../entities/appointments'

export interface AppointmentsRepository {
    create(appointment: Appointment): Promise<void>;
    findOverLappingAppointment(startsAt: Date, endsAt: Date) : Promise<Appointment | null>;
}
