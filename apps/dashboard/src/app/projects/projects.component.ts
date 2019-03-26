import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import {
  AddProject,
  Customer,
  CustomersService,
  DeleteProject,
  LoadProjects,
  NotificationsService,
  Project,
  ProjectsService,
  ProjectsState,
  selectAllProjects,
  UpdateProject,
  SelectProject,
} from '@workshop/core-data';
/**
import { SelectProject, LoadProjects,  AddProject, UpdateProject, DeleteProject } from './../../../../../libs/core-data/src/lib/state/projects/projects.actions';
import { Customer, Project, ProjectsService, NotificationsService, CustomersService, ProjectsState, initialProjects } from '@workshop/core-data';
import { map } from 'rxjs/operators';
**/
import { Observable } from 'rxjs';
//import { selectAllProjects } from 'libs/core-data/src/lib/state';

const emptyProject: Project = {
  id: null,
  title: '',
  details: '',
  percentComplete: 0,
  approved: false,
  customerId: null
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[]>;
  customers$: Observable<Customer[]>;
  currentProject: Project;

  constructor(
    private customerService: CustomersService,
    private store: Store<ProjectsState>,
    private ns: NotificationsService) {
      this.projects$ = store.pipe(select(selectAllProjects))
    };

  ngOnInit() {
    this.getProjects();
    this.getCustomers();
    this.resetCurrentProject();
  }

  resetCurrentProject() {
    this.currentProject = emptyProject;
  }

  selectProject(project) {
    this.currentProject = project;
  }

  cancel(project) {
    this.resetCurrentProject();
  }

  getCustomers() {
    this.customers$ = this.customerService.all();
  }

  getProjects() {
    this.store.dispatch(new LoadProjects());
  }

  saveProject(project) {
    if (!project.id) {
      this.createProject(project);
    } else {
      this.updateProject(project);
    }
  }

  createProject(project) {
    this.store.dispatch(new AddProject(project));

    //These will eventually go away

    this.ns.emit('Project created!');
    this.resetCurrentProject();
  }

  updateProject(project) {
    this.store.dispatch(new UpdateProject(project));
    // These will go away
    this.ns.emit('Project updated!');
    this.resetCurrentProject();
  }

  deleteProject(project) {
    this.store.dispatch(new DeleteProject(project));

    // These will go away
    this.ns.emit('Project deleted!');
    this.resetCurrentProject();
  }
}

