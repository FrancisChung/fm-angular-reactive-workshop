import { Project } from './../../projects/project.model';

const initialProjects: Project[] = [
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

const createProject = (projects, project) => [...projects, project];
const updateProject = (projects, project) => projects.map(p => {
  return p.id === project.id ? Object.assign({}, project) : p;
});
const deleteProject = (projects, project) => projects.filter(w => project.id !== w.id);

// 01 Define the shape of my state
export interface ProjectsState
{
  projects: Project[];
  selectedProjectId : string | null;
}

// 02 Definte the initial state
export const initialState : ProjectsState = {
  projects: initialProjects,
  selectedProjectId : null
}

//03 Build the most simplest reducer
export function projectsReducer(
  state = initialState, action): ProjectsState {
    switch(action.type) {
      case 'select':
        return {
          selectedProjectId: action.payload,
          projects: state.projects
        }
      case 'create':
        // delegate to a stand alone function
        // Why? Because it is TESTABLE!
        // Nested Logic, alongside Hidden State are 2 of the "Axis of Evil of Testing"
        return {
            selectedProjectId: state.selectedProjectId,
            projects: createProject(state.projects, action.payload)
        }
      case 'update':
        return {
            selectedProjectId: state.selectedProjectId,
            projects: updateProject(state.projects, action.payload)
        }
      case 'delete':
        // delegate to a stand alone function
        // Why? Because it is TESTABLE!
        // Nested Logic, alongside Hidden State are 2 of the "Axis of Evil of Testing"
        return {
            selectedProjectId: state.selectedProjectId,
            projects: deleteProject(state.projects, action.payload)
        }
      default:
        return state;


    }
}
