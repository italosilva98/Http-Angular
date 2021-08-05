import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  files: Set<File>;
  progresso = 0;

  constructor(private service: UploadFileService) {}

  ngOnInit() {}

  onChange(event) {
    const selectedFiles = <FileList>event.srcElement.files;
    document.getElementById('customFileLabel').innerHTML =
      selectedFiles[0].name;

    const fileNames = [];
    this.files = new Set();
    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }

    document.getElementById('customFileLabel').innerHTML = fileNames.join(', ');
    this.progresso = 0;
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.service
        .upload(this.files, '/api/upload')
        .pipe(
          uploadProgress(progress => {
            console.log(progress)
            this.progresso = progress
          }),
          filterResponse()
        )
        .subscribe(response => console.log('upload concluído'))



        // .subscribe((event: HttpEvent<Object>) => {
        //   if (event.type === HttpEventType.Response) {
        //     console.log('Upload concluído');
        //   } else if (event.type === HttpEventType.UploadProgress) {
        //     const percentDone = Math.round((event.loaded * 100) / event.total);
        //     this.progresso = percentDone;
        //   }
        // });
    }
  }

  onDownloadExcel(){

  }
  onDownloadPDF(){

  }
}
