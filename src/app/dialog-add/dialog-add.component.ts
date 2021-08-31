import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.css']
})
export class DialogAddComponent implements OnInit {
 // public alertId:String = "10";

  constructor(
    public dialogRef: MatDialogRef<DialogAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: 
    {buttonName:string,alertId:Number,groupName:string,alert:string,details:string,active:string,parentAlert:string,showReason:string },
    private matDialogRef: MatDialogRef<DialogAddComponent>) {}


  ngOnInit(): void {
    console.log(this.data)
  }

  public cancel(): void {
    console.log("click console");
    this.dialogRef.close(this.data);
  }
  public confirm(event:any): void {
    this.getValues();
   // console.log(this.data);
    this.matDialogRef.close();
   
  }
  private getValues() {
    this.data.alertId = parseInt((<HTMLInputElement>document.getElementById("alertId")).value);
    this.data.groupName  = (<HTMLInputElement>document.getElementById("groupName")).value; 
    this.data.alert  = (<HTMLInputElement>document.getElementById("alert")).value; 
    this.data.details  = (<HTMLInputElement>document.getElementById("details")).value; 
    this.data.active  = (<HTMLInputElement>document.getElementById("active")).value; 
    this.data.parentAlert  = (<HTMLInputElement>document.getElementById("parentAlert")).value; 
    this.data.showReason  = (<HTMLInputElement>document.getElementById("showReason")).value; 
  }
  ngOnDestroy(){
    this.matDialogRef.close(this.data);
  }

}
