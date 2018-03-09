import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MusicControls} from '@ionic-native/music-controls';
import { Media, MediaObject } from '@ionic-native/media';

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {

  public lat: number = 55.4507;
  public lng: number = 37.3656;
  public file: MediaObject;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public media: Media,
              public musicControls: MusicControls) {

    this.play();
  }

  play(){

    this.file = this.media.create('https://www.youtube.com/watch?v=sZj3eyWgcK8');
    this.file.play();

    this.musicControls.create({
      track: 'track youtube',        // optional, default : ''
      artist: 'Muse',                       // optional, default : ''
      cover: 'https://www.nfhs.org/media/1018314/track_field_changes_17.jpg?width=500&height=281',      // optional, default : nothing
      // cover can be a local path (use fullpath 'file:///storage/emulated/...', or only 'my_image.jpg' if my_image.jpg is in the www folder of your app)
      //           or a remote url ('http://...', 'https://...', 'ftp://...')
      isPlaying: true,                         // optional, default : true
      dismissable: true,                         // optional, default : false

      // hide previous/next/close buttons:
      hasPrev: false,      // show previous button, optional, default: true
      hasNext: false,      // show next button, optional, default: true
      hasClose: true,       // show close button, optional, default: false

// iOS only, optional
      album: 'Absolution',     // optional, default: ''
      duration: 60, // optional, default: 0
      elapsed: 10, // optional, default: 0
      hasSkipForward: true,  // show skip forward button, optional, default: false
      hasSkipBackward: true, // show skip backward button, optional, default: false
      skipForwardInterval: 15, // display number for skip forward, optional, default: 0
      skipBackwardInterval: 15, // display number for skip backward, optional, default: 0
      hasScrubbing: false, // enable scrubbing from control center and lockscreen progress bar, optional

      // Android only, optional
      // text displayed in the status bar when the notification (and the ticker) are updated, optional
      ticker: 'Now playing "Time is Running Out"'
    });


    this.musicControls.subscribe().subscribe(action => {
      function events(action) {
        const message = JSON.parse(action).message;
        switch (message) {
          case 'music-controls-next':
            // Do something
            break;
          case 'music-controls-previous':
            // Do something
            break;
          case 'music-controls-pause':
            // Do something
            break;
          case 'music-controls-play':
            // Do something
            break;
          case 'music-controls-destroy':
            // Do something
            break;

          // External controls (iOS only)
          case 'music-controls-toggle-play-pause' :
            // Do something
            break;
          case 'music-controls-seek-to':
            const seekToInSeconds = JSON.parse(action).position;
            this.musicControls.updateElapsed({
              elapsed: seekToInSeconds,
              isPlaying: true
            });
            // Do something
            break;
          case 'music-controls-skip-forward':
            // Do something
            break;
          case 'music-controls-skip-backward':
            // Do something
            break;

          // Headset events (Android only)
          // All media button events are listed below
          case 'music-controls-media-button' :
            // Do something
            break;
          case 'music-controls-headset-unplugged':
            // Do something
            break;
          case 'music-controls-headset-plugged':
            // Do something
            break;
          default:
            break;
        }
      }
    });


    this.musicControls.listen(); // activates the observable above

    this.musicControls.updateIsPlaying(true);
  }

  pause(){
    this.file.pause();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapaPage');
  }

}
