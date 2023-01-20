import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { SharedDataService } from "@app/core/shared-data.service";
import { TODO } from "@app/core/url-constant";
import { CrudService } from "@app/shared/crud.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-todo-form",
  templateUrl: "./todo-form.component.html",
  styleUrls: ["./todo-form.component.css"],
})
export class TodoFormComponent implements OnInit {
  formFields = [{ name: "title" }, { name: "projectId" }];
  model: any;

  projectsList = [];
  selectedprojectName: any;

  constructor(
    private fb: FormBuilder,
    private ngbActiveModal: NgbActiveModal,
    public crudService: CrudService,
    private sharedDataService: SharedDataService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.crudService.initialize(
      this.ngbActiveModal,
      TODO,
      this.formFields,
      "Add Todo Item"
    );
    this.sharedDataService.projectSource.subscribe((list) => {
      this.projectsList = list;
    });
  }

  onItemSelected($event) {
    this.crudService.currentForm.get("projectId").setValue($event);
  }

  createForm() {
    this.crudService.currentForm = this.fb.group({
      title: ["", Validators.required],
      projectId: [""],
    });
  }

  saveTodo() {
    this.crudService.save();
  }
}
