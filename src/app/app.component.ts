import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Todo } from 'src/models/todo.model';

// O decorator @Component utiliza o 'selector' pra gerar 
// uma tag HTML na qual se usará para injetar todo o conteúdo do nosso component, 
// tanto lógica como estilização. 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public title: String = 'Minhas Tarefas';
  public todos: Todo[] = [];
  public form: FormGroup;
  public mode: string = 'list';
  /**
   * @param fb => formBuilder usado para criar um grupo
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
   * a função usa uma variável title obtida do forms.controls['title].value 
   * depois numa segunda variável obtem o ID que recorre a lista de Todos e soma um mais 
   * pra esse numero 
   * chama a funçõa saveData() e depois a função clear(); 
   */
  add() {
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.saveData();
    this.clear();
  }

  /**
   * metodo para limpar o input uma vez adicionada uma tarefa
   */
  clear() {
    this.form.reset();
  }

  /**
   * @param todo => uma vez chamada a ação direta do HTML elimina o todo 
   * selecionado do array de Todos.
   */
  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
    this.saveData();
  }

  /**
   * @param todo => pega a lista de tarefas e uma vez é chamada a ação do 
   * HTML muda o estado do Todo para True
   */
  markAsDone(todo: Todo) {
    todo.done = true;
    this.saveData()
  }

  /**
   * @param todo => pega o lista de Todo e uma vez é chamada a ação do 
   * HTML muda o estado do Todo para false 
   */
  markAsUndone(todo: Todo) {
    todo.done = false;
    this.saveData();
  }

  /**
   * add data at localStorage in JsonStringfy format
   */
  saveData() {
    const setData = JSON.stringify(this.todos);
    localStorage.setItem('todos', setData);
    this.mode = 'list';
  }

  /**
   * pega o array de todos armazenados no LocalStorage e carrega quando
   * a página carrega
   */
  loadData() {
    let getDataTeste = localStorage.getItem('todos');
    this.todos = JSON.parse(getDataTeste == null ? '' : getDataTeste);
  }

  /**
   * 
   */
  changeMode(mode: string) {
    this.mode = mode;
  }
}
