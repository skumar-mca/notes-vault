import { Component, OnInit } from '@angular/core';
import CryptoJS from 'crypto-js';
import AES from 'crypto-js/aes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-encrypt-decrypt',
  templateUrl: './encrypt-decrypt.component.html',
  styleUrls: ['./encrypt-decrypt.component.css']
})
export class EncryptDecryptComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  decrpytedText = ''
  encodeForm: FormGroup = null;

  ngOnInit() {
    this.createEncodeForm();
    // console.log('NY', this.worldClock(-5, "NAmerica"))
    // console.log('GMT', this.worldClock(0, "Greenwich"))
    // console.log('London', this.worldClock(0, "Europe"))
    // this.drawTime();

  }

  decrypt(val, secretKey) {
    if (val) {
      const bytes = AES.decrypt(val, secretKey);
      if (bytes.sigBytes < 0) {
        this.decrpytedText = JSON.parse(JSON.stringify(val || ''));
      }
      this.decrpytedText = JSON.parse(unescape(bytes.toString(CryptoJS.enc.Utf8)));
    }
  }

  createEncodeForm() {
    this.encodeForm = this.fb.group({
      encodeText: ['', Validators.required],
      decodeText: ['', Validators.required],
    });
  }

  encode($event) {
    $event && $event.preventDefault();
    this.encodeForm.get('decodeText').setValue(encodeURIComponent(this.encodeForm.get('encodeText').value));
  }

  decode($event) {
    $event && $event.preventDefault();
    this.encodeForm.get('encodeText').setValue(decodeURIComponent(this.encodeForm.get('decodeText').value));
  }

  clearEncodeDecode($event) {
    $event && $event.preventDefault();
    this.encodeForm.get('encodeText').setValue('');
    this.encodeForm.get('decodeText').setValue('');
  }

  drawTime() {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour = hour % 12;


    //minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));

    // second
    second = (second * Math.PI / 30);
    console.log(hour, minute, second);
  }
  worldClock(zone, region) {
    let dst = 0;
    let time = new Date();
    let gmtMS = time.getTime() + (time.getTimezoneOffset() * 60000);
    let gmtTime = new Date(gmtMS);
    let day = gmtTime.getDate();
    let dayText = '';
    let month = gmtTime.getMonth();
    let year = gmtTime.getFullYear();
    if (year < 1000) {
      year += 1900
    }
    let monthArray = new Array("January", "February", "March", "April", "May", "June", "July", "August",
      "September", "October", "November", "December")
    let monthDays = new Array("31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31")
    if (year % 4 == 0) {
      monthDays = new Array("31", "29", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31")
    }
    if (year % 100 == 0 && year % 400 != 0) {
      monthDays = new Array("31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31")
    }

    let hr = gmtTime.getHours() + zone
    let min = gmtTime.getMinutes()
    let sec = gmtTime.getSeconds()

    let hrTxt = '';
    let minTxt = '';
    let secTxt = '';

    if (hr >= 24) {
      hr = hr - 24
      day -= -1
    }
    if (hr < 0) {
      hr -= -24
      day -= 1
    }
    if (hr < 10) {
      hr = " " + hr
    }
    if (min < 10) {
      minTxt = "0" + min
    }
    if (sec < 10) {
      secTxt = "0" + sec
    }
    if (day <= 0) {
      if (month == 0) {
        month = 11
        year -= 1
      }
      else {
        month = month - 1
      }
      dayText = monthDays[month]
    }
    if (day > +monthDays[month]) {
      day = 1
      if (month == 11) {
        month = 0
        year -= -1
      }
      else {
        month -= -1
      }
    }
    if (region == "NAmerica") {
      let startDST = new Date()
      let endDST = new Date()
      startDST.setMonth(3)
      startDST.setHours(2)
      startDST.setDate(1)
      let dayDST = startDST.getDay()
      if (dayDST != 0) {
        startDST.setDate(8 - dayDST)
      }
      else {
        startDST.setDate(1)
      }
      endDST.setMonth(9)
      endDST.setHours(1)
      endDST.setDate(31)
      dayDST = endDST.getDay()
      endDST.setDate(31 - dayDST)
      let currentTime = new Date()
      currentTime.setMonth(month)
      currentTime.setFullYear(year)
      currentTime.setDate(day)
      currentTime.setHours(hr)
      if (currentTime >= startDST && currentTime < endDST) {
        dst = 1
      }
    }
    if (region == "Europe") {
      let startDST = new Date()
      let endDST = new Date()
      startDST.setMonth(2)
      startDST.setHours(1)
      startDST.setDate(31)
      let dayDST = startDST.getDay()
      startDST.setDate(31 - dayDST)
      endDST.setMonth(9)
      endDST.setHours(0)
      endDST.setDate(31)
      dayDST = endDST.getDay()
      endDST.setDate(31 - dayDST)
      let currentTime = new Date()
      currentTime.setMonth(month)
      currentTime.setFullYear(year)
      currentTime.setDate(day)
      currentTime.setHours(hr)
      if (currentTime >= startDST && currentTime < endDST) {
        dst = 1
      }
    }

    if (region == "SAmerica") {
      let startDST = new Date()
      let endDST = new Date()
      startDST.setMonth(9)
      startDST.setHours(0)
      startDST.setDate(1)
      let dayDST = startDST.getDay()
      if (dayDST != 0) {
        startDST.setDate(22 - dayDST)
      }
      else {
        startDST.setDate(15)
      }
      endDST.setMonth(1)
      endDST.setHours(11)
      endDST.setDate(1)
      dayDST = endDST.getDay()
      if (dayDST != 0) {
        endDST.setDate(21 - dayDST)
      }
      else {
        endDST.setDate(14)
      }
      let currentTime = new Date()
      currentTime.setMonth(month)
      currentTime.setFullYear(year)
      currentTime.setDate(day)
      currentTime.setHours(hr)
      if (currentTime >= startDST || currentTime < endDST) {
        dst = 1
      }
    }
    if (region == "Cairo") {
      let startDST = new Date()
      let endDST = new Date()
      startDST.setMonth(3)
      startDST.setHours(0)
      startDST.setDate(30)
      let dayDST = startDST.getDay()
      if (dayDST < 5) {
        startDST.setDate(28 - dayDST)
      }
      else {
        startDST.setDate(35 - dayDST)
      }
      endDST.setMonth(8)
      endDST.setHours(11)
      endDST.setDate(30)
      dayDST = endDST.getDay()
      if (dayDST < 4) {
        endDST.setDate(27 - dayDST)
      }
      else {
        endDST.setDate(34 - dayDST)
      }
      let currentTime = new Date()
      currentTime.setMonth(month)
      currentTime.setFullYear(year)
      currentTime.setDate(day)
      currentTime.setHours(hr)
      if (currentTime >= startDST && currentTime < endDST) {
        dst = 1
      }
    }
    if (region == "Israel") {
      let startDST = new Date()
      let endDST = new Date()
      startDST.setMonth(3)
      startDST.setHours(2)
      startDST.setDate(1)
      endDST.setMonth(8)
      endDST.setHours(2)
      endDST.setDate(25)
      let dayDST = endDST.getDay()
      if (dayDST != 0) {
        endDST.setDate(32 - dayDST)
      }
      else {
        endDST.setDate(1)
        endDST.setMonth(9)
      }
      let currentTime = new Date()
      currentTime.setMonth(month)
      currentTime.setFullYear(year)
      currentTime.setDate(day)
      currentTime.setHours(hr)
      if (currentTime >= startDST && currentTime < endDST) {
        dst = 1
      }
    }
    if (region == "Beirut") {
      let startDST = new Date()
      let endDST = new Date()
      startDST.setMonth(2)
      startDST.setHours(0)
      startDST.setDate(31)
      let dayDST = startDST.getDay()
      startDST.setDate(31 - dayDST)
      endDST.setMonth(9)
      endDST.setHours(11)
      endDST.setDate(31)
      dayDST = endDST.getDay()
      endDST.setDate(30 - dayDST)
      let currentTime = new Date()
      currentTime.setMonth(month)
      currentTime.setFullYear(year)
      currentTime.setDate(day)
      currentTime.setHours(hr)
      if (currentTime >= startDST && currentTime < endDST) {
        dst = 1
      }
    }
    if (region == "Baghdad") {
      let startDST = new Date()
      let endDST = new Date()
      startDST.setMonth(3)
      startDST.setHours(3)
      startDST.setDate(1)
      endDST.setMonth(9)
      endDST.setHours(3)
      endDST.setDate(1)
      let dayDST = endDST.getDay()
      let currentTime = new Date()
      currentTime.setMonth(month)
      currentTime.setFullYear(year)
      currentTime.setDate(day)
      currentTime.setHours(hr)
      if (currentTime >= startDST && currentTime < endDST) {
        dst = 1
      }
    }
    if (region == "Australia") {
      let startDST = new Date()
      let endDST = new Date()
      startDST.setMonth(9)
      startDST.setHours(2)
      startDST.setDate(31)
      let dayDST = startDST.getDay()
      startDST.setDate(31 - dayDST)
      endDST.setMonth(2)
      endDST.setHours(2)
      endDST.setDate(31)
      dayDST = endDST.getDay()
      endDST.setDate(31 - dayDST)
      let currentTime = new Date()
      currentTime.setMonth(month)
      currentTime.setFullYear(year)
      currentTime.setDate(day)
      currentTime.setHours(hr)
      if (currentTime >= startDST || currentTime < endDST) {
        dst = 1
      }
    }


    if (dst == 1) {
      hr -= -1
      if (hr >= 24) {
        hr = hr - 24
        day -= -1
      }
      if (hr < 10) {
        hr = " " + hr
      }
      if (day > +monthDays[month]) {
        day = 1
        if (month == 11) {
          month = 0
          year -= -1
        }
        else {
          month -= -1
        }
      }
      return monthArray[month] + " " + day + ", " + year + "<br>" + hr + ":" + min + ":" + sec + " DST"
    }
    else {
      return monthArray[month] + " " + day + ", " + year + "<br>" + hr + ":" + min + ":" + sec
    }
  }
}


