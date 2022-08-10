import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Subscription } from 'rxjs';
import * as textboxio from '../../assets/libs/textboxio-client/textboxio/textboxio.js';
import { environment } from '../../environments/environment';
import { ContribuyentesService } from '../contribuyentes/contribuyentes.service';
import { NoticiasService } from './noticias.service';

declare var MediumEditor: any;
declare var textboxio: any;
declare var $: any;
declare const swal: any;

const BUTTONS = [
  'bold'
  , 'italic'
  , 'underline'
  , 'subscript'
  , 'superscript'
  , 'anchor'
  , 'quote'
  , 'pre'
  , 'orderedlist'
  , 'unorderedlist'
  , 'indent'
  , 'justifyLeft'
  , 'justifyCenter'
  , 'justifyRight'
  , 'justifyFull'
  , 'h1'
  , 'h2'
  , 'h3'
  , 'h4'
  , 'h5'
  , 'h6'
];

@Component({
  selector: 'app-noticia-create',
  templateUrl: './noticia-create.component.html',
  styles: [`
    .materialize-textarea,.file-path {
      font-size: 14px!important;
    }
  `]
})
export class NoticiaCreateComponent implements OnInit, AfterViewInit {

  editor: any;
  @ViewChild('editable', {
    static: true
  }) editable: ElementRef;
  form: FormGroup;
  submitted = false;
  loading = false;
  crearNoticiaSubscription: Subscription;
  errorImage;
  fileTypes = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png'];
  imagenPortada;
  @ViewChild('file', {static: true}) inputFileEl: ElementRef;
  @ViewChild('filePath', {static: true}) filePathEl: ElementRef;

  textboxConfig = {
    basePath : '../../assets/libs/textboxio-client/textboxio/',
    images : {
      editing: {
        enabled: false
      },
      upload : {
        url : environment.API_SERVER + '/noticias/upload-images',      // Handler URL
        basePath: environment.STATIC_SERVER + '/noticias',            // Remote image storage path
        credentials: false                              // Optional: sends cookies with the request when true
      }
    },
    ui: {
      toolbar: {
        draggable: false
      }
    }
  };

  public uploadConfig: DropzoneConfigInterface = {
    url: 'https://example.com/post',
    maxFiles: 10,
    clickable: true,
    uploadMultiple: true,
    acceptedFiles: 'image/*',
    createImageThumbnails: true
  };

  constructor(private fb: FormBuilder, private noticiasService: NoticiasService) {
    this.form = this.fb.group({
      titulo: [null, [Validators.required]],
      subtitulo: [null],
      resumen: [null],
      imagenPortada: [null],
      contenido: [null, [Validators.required]],
    }, {updateOn: 'blur'});
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.loading = true;
      this.crearNoticiaSubscription = this.noticiasService.crearNoticia(this.form.value, this.imagenPortada)
        .subscribe((data: any) => {
          this.form.reset();
          this.removeImage();
          this.editable.nativeElement.value = '';
          this.editable.nativeElement.innerHTML = '';
          this.loading = false;
          swal('Se creó la noticia exitosamente');
          window.scrollTo(0, 0);
        }, (err) => {
          this.loading = false;
        });
    }
  }

  ngAfterViewInit(): void {

    textboxio.inline(this.editable.nativeElement, this.textboxConfig);
    $('textarea#resumen').characterCounter();
    /*
    this.editor = new MediumEditor(this.editable.nativeElement, {
      paste: {

        forcePlainText: false,
        cleanPastedHTML: true,
        cleanReplacements: [],
        cleanAttrs: ['class', 'style', 'dir', 'name'],
        cleanTags: ['meta'],
        unwrapTags: []
      },
      toolbar: {
        allowMultiParagraphSelection: true,
        buttons: BUTTONS,
        diffLeft: 0,
        diffTop: -10,
        firstButtonClass: 'medium-editor-button-first',
        lastButtonClass: 'medium-editor-button-last',
        relativeContainer: null,
        standardizeSelectionStart: false,
        static: false,
        align: 'center',
        sticky: false,
        updateOnEmptySelection: false
      }
    });
    */
  }

  updateContenido(event) {
    console.log(event);
    this.form.get('contenido').setValue(event);
  }

  addImage(event) {
    const reader = new FileReader();
    this.errorImage = null;
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      if (this.validType(file.type)) {
        reader.readAsDataURL(file);
        reader.onload = () => {
          const img = new Image();
          img.src = reader.result as string;
          const imagen: any = {
            preview: img,
            file: file
          };
          this.imagenPortada = imagen;
        };
      } else {
        this.errorImage = 'El tipo archivo seleccionado no está permitido';
      }
    }
  }

  validType(fileType) {
    return this.fileTypes.indexOf(fileType) !== -1;
  }

  removeImage() {
    this.imagenPortada = undefined;
    this.form.get('imagenPortada').setValue(null);
    this.inputFileEl.nativeElement.value = '';
    this.filePathEl.nativeElement.value = '';
  }
}
