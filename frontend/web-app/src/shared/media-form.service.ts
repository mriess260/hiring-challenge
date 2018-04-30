import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

export class MediaForm{

  //form validation error messages
  public validationMessages = {
  'type': [
      { type: 'required', message: 'type is required.' }
    ],
    'title': [
      { type: 'required', message: 'Title is required.' },
      { type: 'minlength', message: 'Title must be at least 1 character(s) long.' },
      { type: 'maxlength', message: 'Title cannot be more than 25 characters long.' }
    ],
    'url': [
      { type: 'required', message: 'Media URL/Link is required.' },
      { type: 'minlength', message: 'URL must be at least 10 character(s) long.' },
      { type: 'pattern', message: 'Must be a valid URL.' },
    ],
    'descript': [
        { type: 'maxlength', message: 'Desciption cannot be more than 1024 characters long.' }
    ],
    'thmbnl_url': [
      { type: 'required', message: 'Thumbnail URL is required.' },
      { type: 'minlength', message: 'URL must be at least 10 character(s) long.' },
      { type: 'pattern', message: 'Must be a valid URL.' },
    ]
  };

  //formgroup template for instantiating formbuilder
  public formgroupTemplate = {
    title:['', Validators.compose([Validators.minLength(1), Validators.required])],
    type:['', Validators.required],
    img_url:['', Validators.compose([
      Validators.pattern('(http)?s?:?(\/\/[^"\']*\.(?:png|jpg|jpeg|gif|png|svg|bmp|tif))'),
      Validators.minLength(10),
        Validators.required
    ])],
    vid_url:['', Validators.compose([
      Validators.pattern('(http)?s?:?(\/\/[^"\']*\.(?:mp4|mpv|ogv|webm|3gp|mov|avi|wmv|m3u8))'),
      Validators.minLength(10),
        Validators.required
    ])],
    aud_url:['', Validators.compose([
      Validators.pattern('(http)?s?:?(\/\/[^"\']*\.(?:aac|mp4|m4a|mp1|mp2|mp3|mpg|mpeg|oga|ogg|wav|webm))'),
      Validators.minLength(10),
        Validators.required
    ])],
    msc_url:['', Validators.compose([
      Validators.pattern('((http)?s?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})'),
      Validators.minLength(10),
        Validators.required
    ])],
    descript:['', Validators.maxLength(1024)],
    thmbnl_url:['', Validators.compose([
      Validators.pattern('(http)?s?:?(\/\/[^"\']*\.(?:png|jpg|jpeg|gif|png|svg|bmp|tif))'),
      Validators.minLength(10),
      Validators.required
    ])]
  };

}