import { Model } from '@mean-expert/model';

/**
 * @module File
 * @description
 * Write a useful File Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
  },
  remotes: {
    upload: {
      accepts: [
          { arg: 'ctx', type: 'object', http: { source:'context' } },
          { arg: 'options', type: 'object', http:{ source: 'query'} }
        ],
      returns: { arg: 'fileObject', type: 'object', root: true },
      http   : { path: '/upload', verb: 'post' }
    }
  }
})
class Attachment {
  constructor(public model: any) {}

  public async upload(ctx: any, options: any) {
    if(!options) options = {};
    ctx.req.params.container = 'test';
    const fileObj = await this.containerUpload(ctx.req ,ctx.result, options);
    const fileInfo = fileObj.files.file[0];
    return this.model.create({
      name: fileInfo.name,
      type: fileInfo.type,
      container: fileInfo.container,
      url: '/containers/'+fileInfo.container+'/download/'+fileInfo.name
    });
  }
// TODO: fileObj is from pkgcloud package


  private containerUpload(req: any, result: any, options: any): Promise<{files: {file: any[]}, container: string}> {
    return new Promise((resolve: Function, reject: Function) => {
      this.model.app.models.Container.upload(req, result, options, function (err: Error, fileObj: any) {
        if (err) {
          reject(err);
        } else {
          resolve(fileObj);
        }
      });
    });
  }
}

module.exports = Attachment;
