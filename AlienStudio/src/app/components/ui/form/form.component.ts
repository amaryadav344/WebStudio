import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange} from '@angular/core';
import {R} from '../../../common/R';
import {IForm} from '../../../models/UI/IForm';
import {IButton} from '../../../models/UI/IButton';
import {ICheckBox} from '../../../models/UI/ICheckBox';
import {ILabel} from '../../../models/UI/ILabel';
import {ICaption} from '../../../models/UI/ICaption';
import {IInput} from '../../../models/UI/IInput';
import {DragDropHelper} from '../../../common/DragDropHelper';
import {StackLayout} from '../../../models/UI/StackLayout';
import {DynamicIDGenerator} from '../../../common/DynamicIDGenerator';
import {PropertyInfo} from '../../../common/PropertyInfo';
import {GridLayout} from '../../../models/UI/GridLayout';
import {ScrollView} from '../../../models/UI/ScrollView';
import {IListView} from "../../../models/UI/IListView";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges {
  @Input()
  form: IForm;
  selection: any;
  preventSingleClick = false;
  timer: any;
  delay: number;
  @Output() openPropertiesTab = new EventEmitter();
  @Output() openProperties = new EventEmitter<PropertyInfo>();
  dragDropHelper: DragDropHelper = DragDropHelper.getInstance();
  dynamicIDGenerator: DynamicIDGenerator;

  constructor() {

  }

  ngOnInit() {

  }

  calculateClasses(control: any) {
    let className = [];
    if (control.type === R.Controls.TYPE_BUTTON) {
      className = ['pi', 'pi-play'];
    } else if (control.type === R.Controls.TYPE_CHECKBOX) {
      className = ['pi', 'pi-check-square'];
    } else if (control.type === R.Controls.TYPE_LABEL) {
      className = ['fa', 'fa-language'];
    } else if (control.type === R.Controls.TYPE_CAPTION) {
      className = ['fa', 'fa-tag'];
    } else if (control.type === R.Controls.TYPE_INPUT) {
      className = ['fa', 'fa-i-cursor'];
    }
    return className;
  }


  removeControlSelection() {
    if (this.selection != null && this.selection.classList.contains('selected')) {
      this.selection.classList.remove('selected');
    }
    this.selection = null;
  }

  selectControl(event, view: any, Parent: any) {
    const clicked = event.target;
    const currentID = clicked.id || null;
    if (this.selection != null && !(this.selection.id === currentID)) {
      this.removeControlSelection();
    }
    if (currentID != null) {
      clicked.classList.add('selected');
      this.selection = clicked;
    }
    this.openProperties.emit({PropertiesObject: view, ParentObject: Parent});

  }

  allowDrop(event, Control) {
    if (Control.type === R.Controls.TYPE_STACK_LAYOUT || R.Controls.TYPE_GRID_LAYOUT || R.Controls.TYPE_SCROLL_VIEW) {
      event.preventDefault();
    } else {
      event.stopPropagation();

    }
  }

  GetViewGroupType(ViewGroup: any) {
    if (ViewGroup.type === R.Controls.TYPE_GRID) {
      return 0;
    } else if (ViewGroup.type === R.Controls.TYPE_SECTION) {
      return 1;
    }
  }

  dropControl(event, layout: any) {
    event.stopPropagation();
    const Control = this.dragDropHelper.getControl();
    if (!layout.controls) {
      layout.controls = [];
    }
    let control = null;
    switch (Control) {
      case R.Controls.TYPE_LABEL:
        control = new ILabel(this.dynamicIDGenerator.getNextID(Control, 1));
        break;
      case R.Controls.TYPE_BUTTON:
        control = new IButton(this.dynamicIDGenerator.getNextID(Control, 1));
        break;
      case R.Controls.TYPE_CAPTION:
        control = new ICaption(this.dynamicIDGenerator.getNextID(Control, 1));
        break;
      case R.Controls.TYPE_CHECKBOX:
        control = new ICheckBox(this.dynamicIDGenerator.getNextID(Control, 1));
        break;
      case R.Controls.TYPE_INPUT:
        control = new IInput(this.dynamicIDGenerator.getNextID(Control, 1));
        break;
      case R.Controls.TYPE_STACK_LAYOUT:
        control = new StackLayout([], this.dynamicIDGenerator.getNextID(Control, 1));
        break;
      case R.Controls.TYPE_GRID_LAYOUT:
        control = new GridLayout([], this.dynamicIDGenerator.getNextID(Control, 1));
        break;
      case R.Controls.TYPE_SCROLL_VIEW:
        control = new ScrollView(this.dynamicIDGenerator.getNextID(Control, 1));
        break;
      case R.Controls.TYPE_LIST_VIEW:
        control = new IListView(this.dynamicIDGenerator.getNextID(Control, 1));
        break;
    }
    if (control != null) {
      if (layout.type === R.Controls.TYPE_SCROLL_VIEW || layout.type === R.Controls.TYPE_LIST_VIEW) {
        layout.control = control;
      } else {
        layout.controls.push(control);
      }
    }
  }

  singleClick(event, view: any, Parent: any) {
    event.stopPropagation();
    this.preventSingleClick = false;
    const delay = 200;
    this.timer = setTimeout(() => {
      if (!this.preventSingleClick) {
        this.selectControl(event, view, Parent);

      }
    }, delay);
  }

  doubleClick(event, view: any, Parent: any) {
    this.preventSingleClick = true;
    clearTimeout(this.timer);
    this.selectControl(event, view, Parent);
    this.openPropertiesTab.emit();
    event.stopPropagation();
  }


  hasChildViews(Control) {
    if (Control.type === R.Controls.TYPE_STACK_LAYOUT || Control.type === R.Controls.TYPE_GRID_LAYOUT
      || Control.type === R.Controls.TYPE_SCROLL_VIEW || Control.type === R.Controls.TYPE_LIST_VIEW) {
      return true;
    }
    return false;
  }

  LoadIDGenerator(form: IForm) {
    this.dynamicIDGenerator = DynamicIDGenerator.getFor(this.form);
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    if (changes.form) {
      this.LoadIDGenerator(this.form);
    }
  }

}
