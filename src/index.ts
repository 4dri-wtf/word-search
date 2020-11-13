
import './styles/style.scss';
import txt from './assets/words.txt';
import { Node } from './Node';
import { NodeType } from './NodeType';
import { NodeSearchResult } from './NodeSearchResult';

const masterIndex = new Node('', NodeType.bridge);
const words = (txt as string).split("\n");
const input = document.querySelector('#THE_input') as HTMLInputElement;
const output = document.querySelector('#output') as HTMLDivElement;
console.log(words.length);
while(words.length > 0){
    const w = words.pop();
    
    const sr = search(masterIndex, w);

    if(sr.found && sr.node.type === NodeType.bridge){
        sr.node.type = NodeType.word;
    }else{
        attach(sr.node, w.substr(sr.deep))
    }
}

input.addEventListener('input',  (ev: Event)  => {
    output.innerHTML = '';
    let val = (ev.target as HTMLInputElement).value;

    if(val.length === 0){
        return;
    }

    const sr = search(masterIndex, (ev.target as HTMLInputElement).value);

    if(sr.found){

        const results = materialize(val, sr);

        console.log(results.length);

        output.innerHTML = results.join("\n");

    }else{
        output.innerHTML = '';
    }
});


function search(index: Node, word: string): NodeSearchResult {
    let deep = 0;
    let miss = false;
    const q = word.split('');
    let current = index;
    while(q.length > 0 && miss === false){
        const c = q.shift();
        if(current.childs.has(c)){
            current = current.childs.get(c);
            deep++;
        }else{
            miss = true;
        }
    }
    
    return new NodeSearchResult(!miss, deep, current);
    
}

function attach(node: Node, str: string){
    let current = node;
    str.split('').forEach(c => {
        const next = new Node(c, NodeType.bridge);
        current.childs.set(c, next);
        current = next;
    });

    current.type = NodeType.word;

}

function materialize(query: string, sr: NodeSearchResult): Array<string> {
    const res: Array<string> = [];
    const q: Array<{prev: string, node: Node}> = [{ prev: query.substr(0, sr.deep), node: sr.node }];

    
    while(q.length > 0){
        let current = q.shift();
        if(current.node.type === NodeType.word){
            res.push(current.prev);
        }

        Array.from(current.node.childs)
        .sort((a, b) => { 
            if (a[0] > b[0]) {
                return 1;
              } else if (a[0] < b[0]) {
                return -1;
              } else if (a[0] === b[0]) {
                return 0;
              }
        })
        .forEach((v) => {
            q.push({prev: (current.prev + v[0]), node: v[1]})
        })


    }

    return res;
}
