import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'saevis-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  public url: string;

  constructor() { }

  ngOnInit() {
  }

  public onChange(files: FileList): void {
    if (!files[0]) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.url = event.target.result;
    };

    reader.readAsDataURL(files[0]);
  }

}
