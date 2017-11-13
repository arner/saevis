export class Helper {
  private relatedModelFunctions = [
    'prototype.__exists__',
    'prototype.__count__',
    'prototype.__create__',
    'prototype.__delete__',
    'prototype.__destroy__',
    'prototype.__destroyById__',
    'prototype.__findById__',
    'prototype.__get__',
    'prototype.__upsert__',
    'prototype.__updateById__',
    'prototype.__update__',
    'prototype.__link__',
    'prototype.__unlink__',
  ];

  public constructor(private model: any) {

  }

  /**
   * Disable remote methods for relationships of a model. Excludes is a list of allowed child relationships.
   */
  public disableRemoteMethods(relations: string[], excludes: string[] = []) {
    excludes = excludes || [];
    relations.forEach((relation) => {
      this.relatedModelFunctions
        .map((d) => d + relation)
        .filter((d) => excludes.indexOf(d) === -1)
        .forEach((item) => {
          // console.log(`Disabling ${this.model} ${item}`);
          this.model.disableRemoteMethodByName(item);
        });
    });
  };
}
