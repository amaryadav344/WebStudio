import {IColumn} from './IColumn';
import {IObject} from './IObject';
import {ICollection} from './ICollection';
import {IQuery} from './IQuery';
import {IValidation} from './IValidation';
import {IBusinessObject} from './IBusinessObject';
import {IXMLBase} from './IXMLBase';

export interface IEntity extends IXMLBase {
  name: string;
  type: string;
  parentEntity: string;
  tableName: string;
  columns: IColumn[];
  objects: IObject[];
  collections: ICollection[];
  queries: IQuery[];
  validation: IValidation;
  businessObject: IBusinessObject;
}
