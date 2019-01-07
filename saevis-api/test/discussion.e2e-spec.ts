import * as request from 'supertest';
import {Helper} from './helper';
import {User} from '../src/users/user.entity';

const helper = new Helper();
const createURL = `${helper.baseURL}/content`;
const discussionURL = `${helper.baseURL}/discussion`;
const testUser = new User({
  id: 1,
  username: 'arne'
});

const getTestDiscussion = () => {
  return {
    title: 'Test discussion'
  };
};

const getTestComment = () => {
  return {
    text: 'This is a comment.'
  };
};

const createComment = async (createdDiscussionId, token) => {
  return new Promise((resolve, reject) => {
    request(discussionURL)
      .post(`/${createdDiscussionId}/comments`)
      .set('Authorization', `Bearer ${token}`)
      .send(getTestComment())
      .expect(201)
      .then(res => {
        let createdComment = res.body;

        expect(createdComment.text).toEqual(getTestComment().text);
        expect(createdComment.id).toBeGreaterThan(0);

        resolve(createdComment);
      });
  });
};

describe('Discussion (e2e)', () => {
  let token: string;
  let topicId: number;
  let createdDiscussion: any;

  beforeAll(async () => {
    token = await helper.getToken(testUser);
    topicId = await helper.createTestTopic(token);

    return request(createURL)
      .post('/')
      .set('Authorization', `Bearer ${token}`)
      .send({topicId: topicId, discussion: getTestDiscussion()})
      .expect(201)
      .then(res => {
        createdDiscussion = res.body.content;
        expect(createdDiscussion.title).toEqual(getTestDiscussion().title);
        expect(createdDiscussion.id).toBeGreaterThan(0);
      });
  });

  it('/:id/comments (PUT) ok', async () => {
     const comment = await createComment(createdDiscussion.id, token);
     if (!comment) {
       throw new Error('Comment not created.');
     }
  });

  describe('delete', () => {
    let createdComment: any;

    beforeAll(async () => {
      createdComment = await createComment(createdDiscussion.id, token);
    });

    it('/:id/comments/:commentId (DELETE) ok', () => {
      expect(createdComment).toBeDefined();

      return request(discussionURL)
        .delete(`/${createdDiscussion.id}/comments/${createdComment.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then(res => {
          expect(res.body.title).toEqual(createdDiscussion.title);
          expect(res.body.comments).toEqual(expect.not.arrayContaining([createdComment]));
        });
    });
  });

  describe('edit comment', () => {
    let createdComment: any;

    beforeAll(async () => {
      createdComment = await createComment(createdDiscussion.id, token);
    });

    it('/:id/comments/:commentId (POST) edit comment', () => {
      const editedComment = getTestComment() as any;
      editedComment.text = 'Edited text.';

      return request(discussionURL)
        .put(`/${createdDiscussion.id}/comments/${createdComment.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(editedComment)
        .expect(200)
        .then(res => {
          let comment = res.body;

          expect(comment.id).toEqual(createdComment.id);
          expect(comment.text).toEqual(editedComment.text);
        });
    });
  });
});
