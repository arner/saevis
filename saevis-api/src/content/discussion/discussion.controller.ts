import {Body, Controller, Delete, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiBearerAuth, ApiUseTags} from '@nestjs/swagger';
import {Discussion} from './discussion.entity';
import {Comment} from './comment.entity';
import {IsCreator} from '../../auth/is-creator.guard';
import {SubjectEntity} from '../../auth/entity.decorator';

@Controller('discussion')
@ApiBearerAuth()
@ApiUseTags('discussion')
@UseGuards(AuthGuard('jwt'))
export class DiscussionController {

  public constructor() {}

  @Post('/:id/comments')
  public async createComment(@Param('id') id: number, @Body() comment: Comment, @Req() req): Promise<Comment> {
    comment.discussionId = id;
    comment.createdBy = req.user;

    return await comment.save();
  }

  @Delete('/:discussionId/comments/:id')
  @UseGuards(IsCreator)
  @SubjectEntity(Comment)
  public async deleteComment(@Param('discussionId') discussionId: number, @Param('id') id: number): Promise<Discussion> {
    const comment = await Comment.findOneOrFail({where: {discussionId, id}});
    await comment.remove();

    return await Discussion.findOneOrFail(discussionId) as Discussion;
  }

  @Put('/:discussionId/comments/:id')
  @UseGuards(IsCreator)
  @SubjectEntity(Comment)
  public async updateComment(@Param('discussionId') discussionId: number, @Param('id') id: number, @Body() comment: Comment): Promise<Comment> {
    const originalComment = await Comment.findOneOrFail(id) as Comment;
    originalComment.text = comment.text;

    return await originalComment.save();
  }
}
