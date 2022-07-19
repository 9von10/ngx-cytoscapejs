/* eslint-disable */
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

function getDevPackageVersionFromPackageJson(tree: Tree, name: string): string | null {
  if (!tree.exists('package.json')) {
    return null;
  }

  const packageJson = JSON.parse(tree.read('package.json')!.toString('utf8'));

  if (packageJson.devDependencies && packageJson.devDependencies[name]) {
    return packageJson.devDependencies[name];
  }

  return null;
}

function sortObjectByKeys(obj: Record<string, string>) {
  return Object.keys(obj)
    .sort()
    .reduce((result: any, key) => (result[key] = obj[key]) && result, {});
}

function addDevPackageToPackageJson(tree: Tree, pkg: string, version: string): Tree {
  if (tree.exists('package.json')) {
    const sourceText = tree.read('package.json')!.toString('utf-8');
    const json = JSON.parse(sourceText);

    if (!json.devDependencies) {
      json.devDependencies = {};
    }

    if (!json.devDependencies[pkg]) {
      json.devDependencies[pkg] = version;
      json.devDependencies = sortObjectByKeys(json.devDependencies);
    }

    tree.overwrite('package.json', JSON.stringify(json, null, 2));
  }

  return tree;
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

function addCytoscapeTypes(): Rule {
  return (tree: Tree) => {
    const cytoscapeTypesVersion = getDevPackageVersionFromPackageJson(tree, '@types/cytoscape');

    if (cytoscapeTypesVersion === null) {
      addDevPackageToPackageJson(tree, '@types/cytoscape', '^3.19.4');
    }

    return tree;
  };
}

function addDependency(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    return tree;
  };
}

export function ngAdd(options: Schema): Rule {
  return chain([addModule(options), addCytoscapeTypes(), addDependency()]);
}
