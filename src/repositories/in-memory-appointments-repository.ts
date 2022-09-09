import { areIntervalsOverlapping } from 'date-fns/esm'
import { Appointment } from '../entities/appointments'
import { AppointmentsRepository } from './appointments-repository'

export class InMemoryAppointmentsRepository implements AppointmentsRepository {
  public items: Appointment[] = []

  async create (appointment: Appointment): Promise<void> {
    this.items.push(appointment)
  }

  async findOverLappingAppointment (startsAt: Date, endsAt: Date): Promise<Appointment | null> {
    const overlappingAppointment = this.items.find(appointment => {
      return areIntervalsOverlapping(
        { start: startsAt, end: endsAt },
        { start: appointment.startsAt, end: appointment.endsAt },
        { inclusive: true }
      )
    })

    if (!overlappingAppointment) {
      return null
    }
    return overlappingAppointment
  }
}
