import {Component, OnInit, ViewChild} from '@angular/core';
import {WindowBase} from '../../window/window-base/WindowBase';
import {SideBarComponent} from '../side-bar/side-bar.component';
import {HttpClientService} from '../../../services/entity-service/httpclient.service';
import {R} from '../../../common/R';
import {IForm} from '../../../models/UI/IForm';
import {MessageService} from 'primeng/api';
import {WindowService} from '../../../services/window/window.service';
import {IEntity} from '../../../models/Enitity/IEntity';
import {PropertyInfo} from '../../../common/PropertyInfo';

@Component({
  selector: 'app-user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.css']
})
export class UserInterfaceComponent extends WindowBase implements OnInit {
  @ViewChild(SideBarComponent, {static: false})
  sidebarComponent: SideBarComponent;
  PropertyInfo: PropertyInfo = {PropertiesObject: {}, ParentObject: {}};
  form: IForm = R.Initializer.getForm();
  entity: IEntity;

  constructor(public httpClientService: HttpClientService,
              public windowService: WindowService,
              public messageService: MessageService) {
    super();
  }

  ngOnInit() {
    this.httpClientService.getFile(this.file).subscribe(
      (form) => {
        this.form = form as IForm;
        this.httpClientService.getFile({name: this.form.entity, type: 0, path: ''})
          .toPromise().then((enitity) => {
          this.entity = enitity as IEntity;
        });
      }, (error) => {
        console.log(error);
      });
  }

  openPropertiesTab() {
    this.sidebarComponent.openPropertiesTab();
  }

  openProperties(propertyInfo: any) {
    this.PropertyInfo = propertyInfo;
  }

  getXML() {
    this.httpClientService.getXMLFromJS(this.form).subscribe(
      xml => {
        this.xml = xml;
        this.isTextView = !this.isTextView;
      },
      error => {
        console.log(error);
      });
  }

  getJS() {
    this.httpClientService.getJSFromXML(this.xml).subscribe(
      form => {
        this.isTextView = !this.isTextView;
        Object.assign(this.form, form);
      },
      error => {
        console.log(error);
      });
  }

  saveXML() {
    this.httpClientService.saveXML(this.form, this.file.path).subscribe(
      responce => {
        this.messageService.add({severity: 'success', summary: 'Save', detail: 'Saved File ' + this.file.name});
      },
      error => {
        console.log(error);
      });
  }

  closeWindow() {
    this.windowService.closeWindow(this.file);
  }

}
