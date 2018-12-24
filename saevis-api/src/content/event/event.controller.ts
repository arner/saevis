import {Body, Controller, Delete, Param, ParseIntPipe, Post, Put, Req, UseGuards} from '@nestjs/common';
import {EventService} from './event.service';
import {Event} from './event.entity';
import {ApiBearerAuth} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';

@Controller('events')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class EventController {
  constructor(private eventService: EventService) { }

  @Post('/')
  public async update(@Req() req, @Body() editedEvent: Event): Promise<Event> {
    // TODO: this will move to a more generic auth check
    const existingEvent = await this.eventService.findWithContentOrFail(editedEvent.id);
    if (existingEvent.content.createdBy.id !== req.user.id) {
      throw new Error('Unauthorized. (TODO: proper error');
    }

    const updatedFields: Partial<Event> = {
      startTime: editedEvent.startTime,
      endTime:  editedEvent.endTime,
      text: editedEvent.text
    };

    return await this.eventService.update(editedEvent.id, updatedFields);
  }

  @Put('/:id/participants')
  public async participate(@Param() id: number, @Req() req): Promise<Event> {
    return await this.eventService.participate(id, req.user.id);
  }

  @Delete('/:id/participants')
  public async unparticipate(@Param() id: number, @Req() req): Promise<Event> {
    console.log('-------------------------------------------', req.user.id);

    return await this.eventService.unparticipate(id, req.user.id);
  }
}
