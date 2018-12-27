import {Body, Controller, Delete, Param, ParseIntPipe, Post, Put, Req, UseGuards} from '@nestjs/common';
import {Event} from './event.entity';
import {ApiBearerAuth, ApiUseTags} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';
import {SubjectEntity} from '../../auth/entity.decorator';
import {IsCreator} from '../../auth/is-creator.guard';

@Controller('events')
@ApiBearerAuth()
@ApiUseTags('event')
@UseGuards(AuthGuard('jwt'))
export class EventController {
  constructor() { }

  @Put(':id')
  @UseGuards(IsCreator)
  @SubjectEntity(Event)
  public async update(@Param('id') id: number, @Body() editedEvent: Event): Promise<Event> {
    const existingEvent = await Event.findOneOrFail(id) as Event;

    existingEvent.startTime = editedEvent.startTime;
    existingEvent.endTime = editedEvent.endTime;
    existingEvent.text = editedEvent.text;

    return existingEvent.save();
  }

  @Post(':id/participants')
  public async participate(@Param('id') id: number, @Req() req): Promise<Event> {
    const event: Event = await Event.findOneOrFail(id);

    return await event.participate(req.user);
  }

  @Delete(':id/participants')
  public async unparticipate(@Param('id') id: number, @Req() req): Promise<Event> {
    const event: Event = await Event.findOneOrFail(id);

    return await event.unparticipate(req.user);
  }
}
