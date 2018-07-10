import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { MediaBoardPage } from './media-board';

@NgModule({
  declarations: [
    MediaBoardPage,
  ],
  imports: [
    IonicPageModule.forChild(MediaBoardPage),
  ],
})
export class MediaBoardPageModule {}
