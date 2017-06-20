import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'page-404',
  template: `
    <article class="template animated slideInRight">
      <h1>404. Page Not Found</h1>
    </article>
  `,
  styles: [`
    article { 
      margin-top:25%; 
      font-size: 250%;
      text-align: center; 
    }`]
})
export class PageNotFoundComponent { }
