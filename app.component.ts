import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 100 })),
      transition('* => void', [
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AppComponent {
  files: Array<FileUploadModel> = [];
  
  addFile() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({ data: file, state: 'in' });
      }
    };
    fileUpload.click();
  }

  cancelFile(file: FileUploadModel) {
    const index = this.files.indexOf(file);
    if (index > -1) {
      this.files[index].state='';
      this.files.splice(index, 1);
    }
  }
  drop(ev) {
    ev.preventDefault();
    console.log('drop');
    for (let index = 0; index < ev.dataTransfer.files.length; index++) {
      const file = ev.dataTransfer.files[index];
      this.files.push({ data: file, state: 'in' });
    }
  }
  allowDrop(ev) {
    ev.preventDefault();
  }

}

export class FileUploadModel{
data: File;
state: string;
}
