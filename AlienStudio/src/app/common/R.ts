import {ICollection} from '../models/Enitity/ICollection';
import {IColumn} from '../models/Enitity/IColumn';
import {ICustomMethod} from '../models/Enitity/ICustomMethod';
import {ILoadMapping} from '../models/Enitity/ILoadMapping';
import {IEntity} from '../models/Enitity/IEntity';
import {IGroup} from '../models/Enitity/IGroup';
import {IObject} from '../models/Enitity/IObject';
import {IObjectMethod} from '../models/Enitity/IObjectMethod';
import {IQuery} from '../models/Enitity/IQuery';
import {IVRule} from '../models/Enitity/IVRule';
import {IFile} from '../models/Enitity/IFile';
import {IDBConnectionInfo} from '../models/Enitity/IDBConnectionInfo';
import {WindowItem} from './window-Item';
import {IForm} from '../models/UI/IForm';
import {ISymbol} from '../models/Enitity/ISymbol';
import {StackLayout} from '../models/UI/StackLayout';
import {IProperty} from '../models/Enitity/IProperty';

export class R {

  public static QueryTypes: string[] = ['Select Query',
    'Scalar Query',
    'Sub Query',
  ];
  static DataTypes: string[] = [
    'String',
    'Integer',
    'DateTime',
    'Decimal',
  ];
  static CollectionTypes: string[] = [
    'List',
    'Queue',
    'Set',
  ];
  static LoadTypes: string[] = [
    'Query',
    'Method',
    'Foreign Key',
    'Rule',
  ];
  static LoadModes: string[] = [
    'New',
    'Update',
    'All'
  ];
  static TextAlignments: string[] = [
    'initial',
    'left',
    'center',
    'right'
  ];
  static TextDecorations: string[] = [
    'none',
    'underline',
    'line-through',
  ];
  static TextTransforms: string[] = [
    'initial',
    'none',
    'capitalize',
    'uppercase',
    'lowercase',
  ];
  static WhiteSpaces: string[] = [
    'initial',
    'normal',
    'nowrap',
  ];
  static BoolenValues: string[] = [
    'true',
    'false',
  ];
  static Orientations: string[] = [
    'vertical',
    'horizontal',
  ];
  static VerticalAlignments: string[] = [
    'top',
    'center',
    'bottom',
    'stretch',
  ];
  static HorizontalAlignments: string[] = [
    'left',
    'center',
    'right',
    'stretch',
  ];
  static Visibility: string[] = [
    'visible',
    'collapse',
    'hidden',
  ];

  static ButtonTypes: string[] = [
    'btnOpenFormClick',
    'btnExecuteBusinessMethod'
  ];


  static Constants = class {
    static OpenMode = class {
      static MODE_NEW = 0;
      static MODE_UPDATE = 1;
      static MODE_ALL = 2;
    };
  };
  static SymbolTypes = class {
    static TYPE_OBJECT = 1;
    static TYPE_COLLECTION = 2;
    static TYPE_VARIBLE = 0;
  };
  static SERVER_URLS = class {
    static JS_TO_XML = 'http://192.168.0.120:8080/xml/jstoxml';
    static SAVE_XML = 'http://192.168.0.120:8080/xml/save';
    static XML_TO_JS = 'http://192.168.0.120:8080/xml/xmltojs';
    static GET_FILE = 'http://192.168.0.120:8080/xml/getxml';
    static GET_MATCHING_FOLDERS = 'http://192.168.0.120:8080/xml/getMatchingFolders';
    static GET_MATCHING_TABLES = 'http://192.168.0.120:8080/xml/getMatchingTableNames';
    static GET_COLUMNS = 'http://192.168.0.120:8080/xml/getColumns';
    static CREATE_NEW_XML = 'http://192.168.0.120:8080/xml/CreateNewXml/';
    static GET_FILES = 'http://192.168.0.120:8080/xml/GetFiles';
    static GET_FORMS = 'http://192.168.0.120:8080/xml/GetForms';
    static GET_NAVIGATION_PARAMETER_BY_FORM = 'http://192.168.0.120:8080/xml/GetNavigationParameterByForm';
    static GET_SYMBOLS = 'http://192.168.0.120:8080/xml/getSymbols';
    static GET_ENTITY_FIELDS = 'http://192.168.0.120:8080/xml/getEntityFields';
    static GET_DB_CONNECTION_INFO = 'http://192.168.0.120:8080/xml/GetDBConnectionInfo';
    static LOAD_PROJECT = 'http://192.168.0.120:8080/xml/LoadProject';
    static GET_OBJECT_METHODS = 'http://192.168.0.120:8080/xml/GetObjectMethods';
    static LIST_ENTITIES = 'http://192.168.0.120:8080/xml/ListEntities';
    static REFRESH_META_DATA = 'http://192.168.0.120:8080/xml/RefreshMetaData';
  };

  static Initializer = class {
    static getCollection(): ICollection {
      return {entity: '', name: '', objectField: ''};
    }

    static getColumn(): IColumn {
      return {name: '', maxLength: '', canBeNull: '', dataType: '', objectField: ''};
    }

    static getCustomMethod(): ICustomMethod {
      return {name: '', mode: 'All', loadPrimaryObject: false, loadMapping: []};
    }

    static getLoadMapping(): ILoadMapping {
      return {name: '', loadParameters: [], loadType: ''};
    }

    static getEntity(): IEntity {
      return {
        name: '',
        modelName: '',
        databaseObjectField: '',
        type: 'entity',
        isWrapper: false,
        parentEntity: '',
        tableName: '',
        validation: {
          rules: [], groupRules: [], hardErrors: [], softErrors: [], initialLoad: [], updateRules: [], deleteRules: []
        },
        queries: [],
        collections: [],
        objects: [],
        columns: [],
        properties: [],
        businessObject: {customMethods: [], objectMethods: []}
      };
    }

    static getGroup(): IGroup {
      return {name: '', rules: []};
    }

    static getObject(): IObject {
      return {name: '', entity: '', objectField: ''};
    }

    static getProperty(): IProperty {
      return {name: '', dataType: '', objectField: ''};
    }

    static getObjectMethod(): IObjectMethod {
      return {name: '', returnType: '', objectParameters: []};
    }

    static getQuery(): IQuery {
      return {name: '', sql: '', queryType: ''};
    }

    static getVRule(): IVRule {
      return {expression: '', name: '', message: {message: '', messageId: 0, parameters: []}};
    }

    static getFile(): IFile {
      return {name: '', type: 0, path: ''};
    }

    static getDBConnectionInfo(): IDBConnectionInfo {
      return {DBUrl: '', DBUserName: ''};
    }

    static getWindowItem(): WindowItem {
      return {component: null, data: R.Initializer.getFile()};
    }

    static getForm(): IForm {
      return new IForm(new StackLayout([], 'stackLayout'), '', '', R.Initializer.getCustomMethod());
    }

    static getSymbols(): ISymbol[] {
      return [{name: 'person', entityName: 'personName', type: R.SymbolTypes.TYPE_VARIBLE},
        {name: 'person', entityName: 'personName', type: R.SymbolTypes.TYPE_VARIBLE}];
    }
  };
  static Controls = class {
    static TYPE_LABEL = 'Label';
    static TYPE_CAPTION = 'Caption';
    static TYPE_INPUT = 'Input';
    static TYPE_BUTTON = 'Button';
    static TYPE_CHECKBOX = 'Checkbox';
    static TYPE_SECTION = 'Section';
    static TYPE_GRID = 'Grid';
    static TYPE_STACK_LAYOUT = 'StackLayout';
    static TYPE_GRID_LAYOUT = 'GridLayout';
    static TYPE_SCROLL_VIEW = 'ScrollView';
    static TYPE_LIST_VIEW = 'ListView';
  };

}

