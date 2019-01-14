import { Component, OnInit,Injectable} from '@angular/core';
import {CollectionViewer, SelectionChange} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {BehaviorSubject, merge, Observable} from 'RxJS';
import {map} from 'RxJS/operators'



/** Flat node with expandable and level information */
export class DynamicFlatNode {
  constructor(public item: string, public level = 1, public expandable = false,
              public isLoading = false) {}
}

/**
 * Database for dynamic data. When expanding a node in the tree, the data source will need to fetch
 * the descendants data from the database.
 */
export class DynamicDatabase {
  dataMap = new Map<string, string[]>([
    ['STANDARD-I', ['SUBJECT1', 'SUBJECT2', 'SUBJECT3','SUBJECT4','SUBJECT5','SUBJECT6','SUBJECT7','SUBJECT8','SUBJECT9','SUBJECT10']],
    ['STANDARD-II', ['SUBJECT1', 'SUBJECT2', 'SUBJECT3','SUBJECT4','SUBJECT5','SUBJECT6','SUBJECT7','SUBJECT8','SUBJECT9','SUBJECT10']],
    ['STANDARD-III', ['SUBJECT1', 'SUBJECT2', 'SUBJECT3','SUBJECT4','SUBJECT5','SUBJECT6','SUBJECT7','SUBJECT8','SUBJECT9','SUBJECT10']],
    ['STANDARD-IV', ['SUBJECT1', 'SUBJECT2', 'SUBJECT3','SUBJECT4','SUBJECT5','SUBJECT6','SUBJECT7','SUBJECT8','SUBJECT9','SUBJECT10']],
    ['STANDARD-V', ['SUBJECT1', 'SUBJECT2', 'SUBJECT3','SUBJECT4','SUBJECT5','SUBJECT6','SUBJECT7','SUBJECT8','SUBJECT9','SUBJECT10']],
    ['STANDARD-VI', ['SUBJECT1', 'SUBJECT2', 'SUBJECT3','SUBJECT4','SUBJECT5','SUBJECT6','SUBJECT7','SUBJECT8','SUBJECT9','SUBJECT10']],
    ['STANDARD-VII', ['SUBJECT1', 'SUBJECT2', 'SUBJECT3','SUBJECT4','SUBJECT5','SUBJECT6','SUBJECT7','SUBJECT8','SUBJECT9','SUBJECT10']],
    ['STANDARD-VIII', ['SUBJECT1', 'SUBJECT2', 'SUBJECT3','SUBJECT4','SUBJECT5','SUBJECT6','SUBJECT7','SUBJECT8','SUBJECT9','SUBJECT10']],
    ['STANDARD-IX', ['SUBJECT1', 'SUBJECT2', 'SUBJECT3','SUBJECT4','SUBJECT5','SUBJECT6','SUBJECT7','SUBJECT8','SUBJECT9','SUBJECT10']],
    ['STANDARD-X', ['SUBJECT1', 'SUBJECT2', 'SUBJECT3','SUBJECT4','SUBJECT5','SUBJECT6','SUBJECT7','SUBJECT8','SUBJECT9','SUBJECT10']],
    ['SUBJECT1', ['CHAPTER1', 'CHAPTER2', 'CHAPTER3','CHAPTER4','CHAPTER5','CHAPTER6','CHAPTER7','CHAPTER8','CHAPTER9','CHAPTER10']],
    ['SUBJECT2',  ['CHAPTER1', 'CHAPTER2', 'CHAPTER3','CHAPTER4','CHAPTER5','CHAPTER6','CHAPTER7','CHAPTER8','CHAPTER9','CHAPTER10']],
    ['SUBJECT3',  ['CHAPTER1', 'CHAPTER2', 'CHAPTER3','CHAPTER4','CHAPTER5','CHAPTER6','CHAPTER7','CHAPTER8','CHAPTER9','CHAPTER10']],
    ['SUBJECT4',  ['CHAPTER1', 'CHAPTER2', 'CHAPTER3','CHAPTER4','CHAPTER5','CHAPTER6','CHAPTER7','CHAPTER8','CHAPTER9','CHAPTER10']],
    ['SUBJECT5',  ['CHAPTER1', 'CHAPTER2', 'CHAPTER3','CHAPTER4','CHAPTER5','CHAPTER6','CHAPTER7','CHAPTER8','CHAPTER9','CHAPTER10']],
    ['SUBJECT6',  ['CHAPTER1', 'CHAPTER2', 'CHAPTER3','CHAPTER4','CHAPTER5','CHAPTER6','CHAPTER7','CHAPTER8','CHAPTER9','CHAPTER10']],
    ['SUBJECT7',   ['CHAPTER1', 'CHAPTER2', 'CHAPTER3','CHAPTER4','CHAPTER5','CHAPTER6','CHAPTER7','CHAPTER8','CHAPTER9','CHAPTER10']]
  ]);

  rootLevelNodes: string[] = ['STANDARD-I', 'STANDARD-II', 'STANDARD-III' , 'STANDARD-IV','STANDARD-V','STANDARD-VI','STANDARD-VII','STANDARD-VIII','STANDARD-IX','STANDARD-X'];

  /** Initial data from database */
  initialData(): DynamicFlatNode[] {
    return this.rootLevelNodes.map(name => new DynamicFlatNode(name, 0, true));
  }

  getChildren(node: string): string[] | undefined {
    return this.dataMap.get(node);
  }

  isExpandable(node: string): boolean {
    return this.dataMap.has(node);
  }
}
/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
@Injectable()
export class DynamicDataSource {

  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);


  get data(): DynamicFlatNode[] { return this.dataChange.value; }
  set data(value: DynamicFlatNode[]) {
    this.treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(private treeControl: FlatTreeControl<DynamicFlatNode>,
              private database: DynamicDatabase) {}

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this.treeControl.expansionModel.onChange!.subscribe(change => {
      if ((change as SelectionChange<DynamicFlatNode>).added ||
        (change as SelectionChange<DynamicFlatNode>).removed) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
    }
  }

  /**
   * Toggle the node, remove from display list
   */
  toggleNode(node: DynamicFlatNode, expand: boolean) {
    const children = this.database.getChildren(node.item);

    const index = this.data.indexOf(node);
    if (!children || index < 0) { // If no children, or cannot find the node, no op
      return;
    }

    node.isLoading = true;

    setTimeout(() => {
      if (expand) {
        const nodes = children.map(name =>
          new DynamicFlatNode(name, node.level + 1, this.database.isExpandable(name)));
        this.data.splice(index + 1, 0, ...nodes);
      } else {
        let count = 0;
        for (let i = index + 1; i < this.data.length
          && this.data[i].level > node.level; i++, count++) {}
        this.data.splice(index + 1, count);
      }

      // notify the change
      this.dataChange.next(this.data);
      node.isLoading = false;
    }, 100);
  }
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  

  classdisplay:boolean=true;
  subjectdisplay:boolean=false;
  chapterdisplay:boolean=false;
  
  constructor(database: DynamicDatabase) { 
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, database);

    this.dataSource.data = database.initialData();

  }
   treeControl: FlatTreeControl<DynamicFlatNode>;
  
    dataSource: DynamicDataSource;
  
    getLevel = (node: DynamicFlatNode) => node.level;
  
    isExpandable = (node: DynamicFlatNode) => node.expandable;
  
    hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;

    viewNodeDetails(node){
      if(node.item.startsWith("STANDARD")){
        this.classdisplay=true;
        this.subjectdisplay=false;
        this.chapterdisplay=false;
      }else if(node.item.startsWith("SUBJECT")){
        this.classdisplay=false;
        this.subjectdisplay=true;
        this.chapterdisplay=false;
      }else if(node.item.startsWith("CHAPTER")){
        this.classdisplay=false;
        this.subjectdisplay=false;
        this.chapterdisplay=true;
      }
    }

    ngOnInit() {
      
     }

}
