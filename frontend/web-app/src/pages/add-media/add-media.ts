import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//------------
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
//------------
import { MediaItem } from '../../models/media-item/media-item.interface';
//------------

@Component({
  selector: 'page-add-media',
  templateUrl: 'add-media.html'
})

export class AddMediaPage {

  //create new object
  mediaItem = {} as MediaItem;

  //database observable reference
  mediaItemRef$: FirebaseListObservable<MediaItem[]>;

  formGroup: FormGroup;
  //validationMessages: ValidationMessages;

  //form validation error messages
  validationMessages = {
  'title': [
  		{ type: 'required', message: 'Title is required.' },
  		{ type: 'minlength', message: 'Title must be at least 1 character(s) long.' },
  		{ type: 'maxlength', message: 'Title cannot be more than 25 characters long.' }
  	],
    'type': [
    		{ type: 'required', message: 'type is required.' }
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
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private database: AngularFireDatabase, public formBuilder: FormBuilder) {

    this.formGroup = formBuilder.group({
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
      descript:['', Validators.maxLength(1024)],
      thmbnl_url:['', Validators.compose([
        Validators.pattern('(http)?s?:?(\/\/[^"\']*\.(?:png|jpg|jpeg|gif|png|svg|bmp|tif))'),
        Validators.minLength(10),
        Validators.required
      ])]
    });

    this.mediaItemRef$ = this.database.list('media-list');

  }

  addMediaItem(mediaItem: MediaItem){
    // create new anonymous object and push this to firebase under media-list node

    //ensure default values not null
    if(this.mediaItem.descript == null){
      this.mediaItem.descript = " ";
    }
    if(this.mediaItem.type == null){
      this.mediaItem.type = "image";
    }

    this.mediaItemRef$.push({
      type: this.mediaItem.type,
      title: this.mediaItem.title,
      type: this.mediaItem.type,
      url: this.mediaItem.url,
      descript: this.mediaItem.descript,
      thmbnl_url: this.mediaItem.thmbnl_url
    });

    //Clear mediaItem
    this.mediaItem = {} as MediaItem;

    //go back to media board
    this.navCtrl.pop();
  }

}
