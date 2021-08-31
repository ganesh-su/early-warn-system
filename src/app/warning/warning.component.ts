import { Component, OnInit } from '@angular/core';
import studentsData from '../student.json';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogAddComponent } from '../dialog-add/dialog-add.component';

interface Student {  
  alertId: Number;  
  groupName: String;  
  alert: String;  
  details: String;  
  active: String;  
  parentAlert: String;  
  showReason: String;  
}  

export interface UsersData {
  alertId: string;
  id: number;
  alert: String;  
  details: String;  
  active: String;  
  parentAlert: String;  
  showReason: String;  
}

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css']
})
export class WarningComponent implements OnInit {
 
  alertId = "";
  groupName: string = "";
  alert: string = "";
  details: string = "";
  students: Student[] = studentsData;
  //window.localStorage["jsonData"] = this.students;
  
  ngOnInit(): void {
    localStorage.setItem('jsonData', JSON.stringify(this.students));
    this.students = JSON.parse(window.localStorage["jsonData"]);  
  }

  constructor(public dialog: MatDialog) {
  }

  deleteJsondata(warn:any) : any{
    let items = JSON.parse(localStorage["jsonData"]);
    for (var i = 0; i < items.length; i++) {
     if(items[i].alertId == warn.alertId){
       items.pop(i);
       localStorage["jsonData"] = JSON.stringify(items);
       this.students = JSON.parse(localStorage["jsonData"]);
       break;
      }
      console.log(items);
    }
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogAddComponent, {
      width: '400px',
      data: { buttonName :"Add", alertId: "" ,groupName: "",alert:"",
        details:"",active:"",parentAlert:"",showReason:""}
    });
  
    dialogRef.afterClosed().subscribe(result => {
     console.log(result);
     let items = JSON.parse(localStorage["jsonData"]);
     if(result.alertId && result.active && result.alert &&
      result.alertId && result.details && result.groupName && result.parentAlert && result.showReason){
        let newItem = { alertId: result.alertId, groupName: result.groupName, alert: result.alert,
          details:result.details,active:result.active,parentAlert:result.parentAlert,showReason:result.showReason};
          items.push(newItem);
          localStorage["jsonData"] = JSON.stringify(items);
          this.students = JSON.parse(localStorage["jsonData"]);
          console.log(items);
       }
    });
  }
  
  editDialog(warn:any) : any{
    console.log(warn)
    let dialogRef = this.dialog.open(DialogAddComponent, {
      width: '400px',
      data: { buttonName :"Update", alertId: warn.alertId ,groupName: warn.groupName,alert:warn.alert,
        details:warn.details,active:warn.active,parentAlert:warn.parentAlert,showReason:warn.showReason}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      let items = JSON.parse(localStorage["jsonData"]);
      for (var i = 0; i < items.length; i++) {
      if(items[i].alertId == result.alertId){
        items[i].alertId =result.alertId ;
        items[i].groupName = result.groupName ;
        items[i].alert =result.alert ;
        items[i].details =result.details ;
        items[i].active =result.active ;
        items[i].parentAlert =result.parentAlert ;
        items[i].showReason =result.showReason ;

        localStorage["jsonData"] = JSON.stringify(items);
        this.students = JSON.parse(localStorage["jsonData"]);
        break;
        }
        console.log(items);
      }
     });
  }
}


