/**
 * Mixin to create a block automatically after creating a block type.
 * @param Model
 * @param bootOptions
 */
export default (Model: any, bootOptions = {}) => {
  console.log('Create Block mixin for Model %s', Model.modelName);

  const options = Object.assign({test: 'hi'}, bootOptions);

  // Belongs to block
  // Model.belongsTo('block', {
  //   polymorphic: {
  //     foreignKey: 'blockContentId',
  //     discriminator: 'blockContentType'
  //   }
  // });
  Model.belongsTo('Member', {name: 'creator', foreignKey: 'creatorId'});

  // let rel: any = {};
  // rel[Model.modelName.toLowerCase()] = {
  //   type: 'hasMany',
  //   through: 'Block',
  //   foreignKey: 'pollId'
  // };
  // Model.registry.modelBuilder.definitions.Topic.relations.push(rel);
  Model.observe('before save', (ctx: any, next: Function) => {
    if (!ctx.isNewInstance) { return next(); }
    console.log(ctx.options.accessToken);
    if (ctx.options.accessToken && ctx.options.accessToken.userId) {
      console.log('creator', ctx.options.accessToken.userId);
      ctx.instance.creatorId = ctx.options.accessToken.userId;
    }
    next();
   });

  // Create block on create
  Model.observe('after save', (ctx: any, next: Function) => {
    if (!ctx.isNewInstance) { return next(); }
    if (!ctx.instance) { return next(); }
    console.log('%s after save: %s', ctx.Model.modelName, ctx.instance.id);

    const block = {
      topicId: ctx.instance.topicId,
      blockContentId: ctx.instance.id,
      blockContentType: Model.modelName
    };
    Model.app.models.Block.create(block).then(() => next()).catch(next);
  });
};

module.exports = exports.default;
