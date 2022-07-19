/* eslint-disable import/no-extraneous-dependencies */
import { workspaces } from '@angular-devkit/core';
import {
  createSourceFile,
  ScriptTarget,
} from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
  chain,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/workspace';
import { addImportToModule } from '@schematics/angular/utility/ast-utils';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';
// eslint-disable-next-line import/extensions
import { Schema } from './schema';

function getProjectTargetOptions(project: workspaces.ProjectDefinition, buildTarget: string) {
  const buildTargetObject = project.targets.get(buildTarget);
  if (buildTargetObject && buildTargetObject.options) {
    return buildTargetObject.options;
  }
  throw new SchematicsException(
    `Cannot determine project target configuration for: ${buildTarget}.`,
  );
}

function getSourceFile(tree: Tree, path: string) {
  const buffer = tree.read(path);
  if (!buffer) {
    throw new SchematicsException(`Could not find ${path}.`);
  }
  const content = buffer.toString('utf-8');
  return createSourceFile(path, content, ScriptTarget.Latest, true);
}

function addDependency(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    return tree;
  };
}

function addModule(options: Schema): Rule {
  return async (tree: Tree) => {
    const workspace = await getWorkspace(tree);
    const projectName = options.project as string;
    const project = workspace.projects.get(projectName);

    if (project == null) {
      throw new SchematicsException(`Project with name ${projectName} does not exist.`);
    }

    const buildOptions = getProjectTargetOptions(project, 'build');
    const modulePath = getAppModulePath(tree, buildOptions['main'] as string);
    const moduleSource = getSourceFile(tree, modulePath);
    const changes = addImportToModule(
      moduleSource,
      modulePath,
      'CytoscapejsModule',
      'ngx-cytoscapejs',
    );
    const recorder = tree.beginUpdate(modulePath);

    changes.forEach((change: any) => {
      if (change instanceof InsertChange) {
        recorder.insertLeft(change.pos, change.toAdd);
      }
    });

    tree.commitUpdate(recorder);
  };
}

export function ngAdd(options: Schema): Rule {
  return chain([addDependency(), addModule(options)]);
}
