import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//----------------
import {  AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription'
//----------------
import { MediaItem } from '../../models/media-item/media-item.interface'
//----------------

@Component({
  selector: 'page-edit-media',
  templateUrl: 'edit-media.html',
})
export class EditMediaPage {

  //mediaItemRef$: FireBaseObjectObservable<MediaItem>;
  mediaItemRef$: AngularFireObject<MediaItem>;
  mediaItemSubscription: Subscription;
  mediaItem = {} as MediaItem;

  formGroup: FormGroup;

  //form validation error messages
  validationMessages = {
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
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private database: AngularFireDatabase, public formBuilder: FormBuilder) {

    //capture mediaItemId as NavParam
    const mediaItemId = this.navParams.get('mediaItemId');

    //set scope of firebase obj equal to navParams
    this.mediaItemRef$ = this.database.object(`media-list/${mediaItemId}`);

    //subscribe to obj and assign results to this.mediaItem
    this.mediaItemSubscription = this.database.object(`media-list/${mediaItemId}`)
    .valueChanges().subscribe(mediaItem => this.mediaItem = mediaItem);

    this.formGroup = formBuilder.group({
      title:['', Validators.compose([Validators.minLength(1), Validators.required])],
      url:['', Validators.compose([
        Validators.pattern('^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$'),
        Validators.minLength(10),
          Validators.required
      ])],
      descript:['', Validators.maxLength(1024)],
      thmbnl_url:['', Validators.compose([
        Validators.pattern('^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$'),
        Validators.minLength(10),
        Validators.required
      ])]
    });

  }


  //update firebase node with new data
  editMediaItem(mediaItem: MediaItem){
    this.mediaItemRef$.update(mediaItem);

    //Clear mediaItem
    this.mediaItem = {} as MediaItem;

    //go back to media board
    this.navCtrl.pop();
  }


  ionViewWillLeave(){
    //unsubscribe from observable when leave
    this.mediaItemSubscription.unsubscribe();
  }

}
