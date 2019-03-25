import { Project } from './../../projects/project.model';
import { ProjectsActionTypes } from './projects.actions';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';

export const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Project One',
    details: 'This is a sample project',
    percentComplete: 20,
    approved: false,
    customerId: null
  },
  {
    id: '2',
    title: 'Project Two',
    details: 'This is a sample project',
    percentComplete: 40,
    approved: false,
    customerId: null
  },
  {
    id: '3',
    title: 'Project Three',
    details: 'This is a sample project',
    percentComplete: 100,
    approved: true,
    customerId: null
  }
];

const addProject = (projects, project) => [...projects, project];
const updateProject = (projects, project) => projects.map(p => {
  return p.id === project.id ? Object.assign({}, project) : p;
});
const deleteProject = (projects, project) => projects.filter(w => project.id !== w.id);

// 01 Define the shape of my state

export interface ProjectsState extends EntityState<Project> {
  selectedProjectId : string | null;
}
// 1a Create Entity Adapter
export const adapter: EntityAdapter<Project> = createEntityAdapter<Project>();

// 02 Definte the initial state
export const initialState: ProjectsState = adapter.getInitialState({
  selectedProjectId: null
});


//03 Build the most simplest reducer
export function projectsReducer(
  state = initialState, action): ProjectsState {
    switch(action.type) {
      case ProjectsActionTypes.SelectProject:
        return Object.assign({}, state, {selectedProjectId: action.payload});

      case ProjectsActionTypes.LoadProjects:
        return adapter.addMany(action.payload, state);

      case ProjectsActionTypes.AddProject:
        // delegate to a stand alone function
        // Why? Because it is TESTABLE!
        // Nested Logic, alongside Hidden State are 2 of the "Axis of Evil of Testing"
        return adapter.addOne(action.payload, state);

      case ProjectsActionTypes.UpdateProject:
        return adapter.updateOne(action.payload, state);

      case ProjectsActionTypes.DeleteProject:
        // delegate to a stand alone function
        // Why? Because it is TESTABLE!
        // Nested Logic, alongside Hidden State are 2 of the "Axis of Evil of Testing"
        return adapter.removeOne(action.payload, state)

        default:
        return state;
    }
}

// Selectors

export const getSelectedProjectId = (state : ProjectsState) => state.selectedProjectId;

const {selectIds, selectEntities, selectAll} = adapter.getSelectors();

export const selectProjectIds = selectIds;
export const selectProjectEntities = selectEntities;
export const selectAllProjects = selectAll;
