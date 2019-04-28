//import _ from 'lodash';
import printMe from './print'
import '../bootstrap.css';

function component(){
    const element = document.createElement('div');
    element.innerHTML = _.join(['Hello','Webpack'], ' ');
    const btn = document.createElement('button');
    btn.innerHTML = 'Click me to see the console log';
    btn.onclick = printMe.bind(null, 'Hey');
    element.appendChild(btn);
    return element;
}
document.body.appendChild(component());
