/**
 * Mixin to create a block automatically after creating a block type.
 * @param Model
 * @param bootOptions
 */
export default (Model: any, bootOptions = {}) => {
  console.log('Create Block mixin for Model %s', Model.modelName);

  const options = Object.assign({test: 'hi'}, bootOptions);

  //
  // Model.defineProperty(options.updatedAt, {
  //   type: Date,
  //   required: options.required,
  // });

  // Belongs to block
  Model.belongsTo('block', {
    polymorphic: {
      foreignKey: 'blockCOntentId',
      discriminator: 'blockContentType'
    }
  });

  // Has one topic
  if(Model.app) {
    Model.hasOne(Model.app.models.Topic, {foreignKey: 'topicId', required: true});
  }
  // Create block on create
  Model.observe('after save', (ctx: any, next: Function) => {
    if (!ctx.isNewInstance) { return next(); }
    if (!ctx.instance) { return next(); }
    console.log('%s before save: %s', ctx.Model.modelName, ctx.instance.id);

    const block = {
      topicId: ctx.instance.topicId,
      blockContentId: ctx.instance.id,
      blockContentType: Model.modelName
    };
    Model.app.models.Block.create(block).then(() => next()).catch(next);
  });
};

module.exports = exports.default;
