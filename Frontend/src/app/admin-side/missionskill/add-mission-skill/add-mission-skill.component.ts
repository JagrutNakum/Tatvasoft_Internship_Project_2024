import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/Helper/ValidateForm';
import { AdminsideServiceService } from 'src/app/service/adminside-service.service';

@Component({
  selector: 'app-add-mission-skill',
  templateUrl: './add-mission-skill.component.html',
  styleUrls: ['./add-mission-skill.component.css']
})
export class AddMissionSkillComponent implements OnInit {
  addMissionSkillForm:FormGroup;
  skillId:any;
  editData:any;

 missionSkills = [
  { SkillName: 'Programming' },
  { SkillName: 'Database Management' },
  { SkillName: 'UI/UX Design' },
  { SkillName: 'Project Management' },
  { SkillName: 'Testing and QA' },
  { SkillName: 'Software Development' },
{ SkillName: 'Data Analysis' },
{ SkillName: 'Cloud Computing' },
{ SkillName: 'Mobile App Development' },
{ SkillName: 'Cybersecurity' },
{ SkillName: 'Digital Marketing' },
{ SkillName: 'Content Writing' },
{ SkillName: 'Graphic Design' },
{ SkillName: 'Financial Analysis' },
{ SkillName: 'Customer Support' }
];

  constructor(public fb:FormBuilder,public router:Router,public toast:NgToastService,public service:AdminsideServiceService,public activateRoute:ActivatedRoute) {
    this.skillId = this.activateRoute.snapshot.paramMap.get('Id');
  }
  ngOnInit(): void {

    this.MissionSkillFormValidate();
    if(this.skillId != null)
    {
      this.FetchDataById(this.skillId);
    }
  }
  MissionSkillFormValidate(){
    this.addMissionSkillForm = this.fb.group({
      id:[0],
      SkillName:['',[Validators.required]],
      status:['',Validators.compose([Validators.required])]
    });
  }

  FetchDataById(id:any)
  {
    this.service.MissionSkillById(id).subscribe((data:any)=>{
      if(data.result == 1)
      {
        this.editData = data.data;
        this.addMissionSkillForm.patchValue(this.editData);
      }
      else
      {
        this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
      }
    },err=>this.toast.error({detail:"ERROR",summary:err.message,duration:3000}))
  }
  OnSubmit(){
      let value = this.addMissionSkillForm.value;
    console.log("inside onsubmit");
      if(this.addMissionSkillForm.valid)
      {
          if(value.id == 0)
          {
              this.InsertData(value);
          }
          else
          {
            this.UpdateData(value);
          }
      }
      else
      {
        ValidateForm.ValidateAllFormFields(this.addMissionSkillForm);
        console.log(this.addMissionSkillForm.errors)
        console.log(this.addMissionSkillForm.valid)
        console.log(this.addMissionSkillForm.controls)
      }
  }
  InsertData(value:any)
  {
    this.service.AddMissionSkill(value).subscribe((data:any)=>{
      if(data.result == 1)
      {
        this.toast.success({detail:"SUCCESS",summary:data.data,duration:3000});
        setTimeout(() => {
          this.router.navigate(['admin/missionSkill']);
        }, 1000);
      }
      else{
        this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
      }
    },err=> this.toast.error({detail:"ERROR",summary:err.message,duration:3000}))
  }
  UpdateData(value:any){
    this.service.UpdateMissionSkill(value).subscribe((data:any)=>{
      if(data.result == 1)
      {
        this.toast.success({detail:"SUCCESS",summary:data.data,duration:3000});
        setTimeout(() => {
          this.router.navigate(['admin/missionSkill']);
        }, 1000);
      }
      else{
        this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
      }
    },err=> this.toast.error({detail:"ERROR",summary:err.message,duration:3000}))
  }
  OnCancel(){
      this.router.navigate(['admin/missionSkill']);
  }
}
