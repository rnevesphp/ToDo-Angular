import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  // O decorator @Component utiliza o 'selector' pra gerar uma tag HTML na qual se usará para injetar todo o conteúdo do nosso component, tanto lógica como estilização. 
  selector: 'app-root',
  // Usa o templateUrl para externalizar o HTML 
  templateUrl: './app.component.html',
  // array que unifica todos os estilos CSS 
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  // empty array; o tipo any permite inserir qualquer tipo de dados dentro do array.
  public todos: Todo[] = [];
  public title: string = 'Minhas Tarefas';
  public form: FormGroup;

  /**
   * method chamado ao inicializar o component
   */
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });

    this.loadData();
  }

  /**
   * 
   */
  add() {
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.saveData();
    this.clear();
  }
  /**
   * metodo para limpar o input uma evz adicionada uma tarefa
   */
  clear() {
    this.form.reset();
  }
  /**
   * 
   * @param todo => uma vez chamada a ação direta do HTML elimina o todo 
   * selecionado do array de Todos.
   */
  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  }

  /**
   * @param todo => pega a lista de tarefas e uma vez é chamada a ação do 
   * HTML muda o estado do Todo para True
   */
  markAsDone(todo: Todo) {
    todo.done = true;
  }

  /**
   * @param todo => pega o lista de Todo e uma vez é chamada a ação do 
   * HTML muda o estado do Todo para false 
   */
  markAsUndone(todo: Todo) {
    todo.done = false;
  }

  /**
   * add data at localStorage in JsonStringfy format
   */
  saveData() {
    const setData = JSON.stringify(this.todos);
    localStorage.setItem('todos', setData);
  }

  /**
   * pega o array de todos armazenados no LocalStorage e carrega quando
   * a página carrega
   */
  loadData() {
    const getData = localStorage.getItem('todos');
    this.todos = JSON.parse(getData);
  }
}
