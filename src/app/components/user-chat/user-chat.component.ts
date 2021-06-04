import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { interval } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  newMessage: String = '';
  sendTo: any = null;
  interval = interval(60000);
  private chatSub: any;

  constructor(private _messageService: MessageService,
              private _authService: AuthService,
              private _userService: UserService) { }

  messages: any[] = [];
  messagesByUsers: any[] = [];
  loggedUser: any = null;
  selectedChat: any[] = [];

  ngOnInit(): void {
    this.sendTo = this._messageService.sendTo;
    this._messageService.sendTo = null;
    this.getLoggedUser();
    this.chatSub = this.interval.subscribe(val => {
      this.getMessages();
    })
  }

  ngOnDestroy() {
    this.chatSub.unsubscribe();
  }


  getMessages() {
    if(this._authService.isLoggedIn())
    this._messageService.getAllForLogged().subscribe((response: any) => {
      this.sortMessagesByUsers(response);
    })
  }

  save() {
    let message = {
      receiver: this.sendTo,
      content: this.newMessage
    }
    this._messageService.save(message).subscribe((response: any) => {
      this.sortMessagesByUsers(response);
      this.newMessage = '';
    });
  }

  getLoggedUser(){
    this._userService.getLoggedUser().subscribe((response:any)=>{
      this.loggedUser = response;
      this.getMessages();
    })
  }

  sortMessagesByUsers(response: any){
    this.messages = response;
    this.messagesByUsers = [];
    this.messages.forEach(el => {
      let messagesByUser: any[] = [];
      for(let i = 0; i < this.messages.length; i++) {
        if(this.checkForSorting(el,this.messages[i])) {
          messagesByUser.push(this.messages[i]);
          this.messages.splice(i,1);
          i = i-1;
        }
      }
      messagesByUser.sort((a: any,b:any) => {
        let dateA = new Date(a.createdAt);
        let dateB = new Date(b.createdAt);
        return (dateA > dateB) ? 1 : -1;
      })
      this.messagesByUsers.push(messagesByUser);
    })
    if(this.sendTo) {
      let foundCurrent = this.messagesByUsers.find(el => {
        return (el[0].sender.id == this.sendTo.id || el[0].receiver.id == this.sendTo.id)
      })
      this.selectChat(foundCurrent);
    }
  }

  selectChat(messagesArray: any) {
    if(messagesArray[0].sender.id !== this.loggedUser.id) {
      this.sendTo = messagesArray[0].sender;
    }
    if(messagesArray[0].receiver.id !== this.loggedUser.id) {
      this.sendTo = messagesArray[0].receiver;
    }
    this.selectedChat = messagesArray;
    let tmpArray: any[] = [];
    this.selectedChat.forEach(element => {
      if(element.receiver.id == this.loggedUser.id) {
        tmpArray.push(element)
      }
    });
    if(tmpArray) {
      this._messageService.markAsSeen(tmpArray).subscribe(response => {});
    }
  }

  checkForSorting(el1: any, el2: any):boolean {
    if(el1.receiver.id !== this.loggedUser.id) {
      if(el1.receiver.id == el2.receiver.id || el1.receiver.id == el2.sender.id) {
        return true;
      }
    }
    if(el1.sender.id !== this.loggedUser.id) {
      if(el1.sender.id == el2.receiver.id || el1.sender.id == el2.sender.id) {
        return true;
      }
    }
    return false;
  }

}
