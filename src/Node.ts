import { NodeType } from "./NodeType";

export class Node {

    public childs: Map<string, Node> = new Map();

    constructor(public value: string, public type: NodeType){
        
    }

}