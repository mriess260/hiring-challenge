import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//------------
import { AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
//------------
import { MediaItem } from '../../models/media-item/media-item.interface';
import { MediaForm } from '../../shared/media-form.service';
//------------

@Component({
  selector: 'page-add-media',
  templateUrl: 'add-media.html',
  providers: [MediaForm]
})

export class AddMediaPage {

  //create new object
  mediaItem = {} as MediaItem;

  //database observable reference
  mediaItemRef$: FirebaseListObservable<MediaItem[]>;

  formGroup: FormGroup;

  //controls exit before submission error message
  showWarning: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private database: AngularFireDatabase, public formBuilder: FormBuilder,
  private mediaForm: MediaForm, private alertCtrl: AlertController) {

    this.formGroup = formBuilder.group(this.mediaForm.formgroupTemplate);

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

    //disable warning message
    this.showWarning = false;

    //Clear mediaItem
    this.mediaItem = {} as MediaItem;

    //go back to media board
    this.navCtrl.pop();
  }

  ionViewCanLeave() {
    if(this.showWarning) {

      //display warning message
      let alertPopup = this.alertCtrl.create({
        title: 'Exit',
        message: 'Are you sure? The new media has not been saved. All entered data will be lost.',
        buttons: [{
          text: 'Exit',
          handler: () => {
            alertPopup.dismiss();
            this.exitPage();
            return false;
          }
        },
        {
          text: 'Stay',
          handler: () => {
          alertPopup.dismiss();
          return false;
        }
      }]
    });

      // Show the alert
      alertPopup.present();

      // Return false to avoid the page to be popped up
      return false;
    }
  }

  private exitPage() {
    this.showWarning = false;
    this.navCtrl.pop();
  }



}
