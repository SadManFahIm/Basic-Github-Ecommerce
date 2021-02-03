import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../data-api.service';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css']
})


export class GithubComponent implements OnInit {

  public state:any={}
  public stateRepo:any={}

  constructor(private _dataOfApi:DataApiService) { }

  ngOnInit(): void {
    this.ApiCall()
  }

  ApiCall(){
    this._dataOfApi.getGithubApiData().subscribe(data=>{
      console.log(data)
      this.state= data
    })
  }

  usersNameSearch(value:any){
    this.specificGithubUser(value)
  }

  onChangeEvent(event: any){
    //this.specificGithubUser(event.target.value)
  }

  specificGithubUser(userName:any){
    if(userName !== ''){
      fetch(`https://api.github.com/users/${userName}`)
      .then(res=>res.json())
      .then(data=>{
        this.state= data
        
        //console.log(data)
      }).catch(error=>{
        console.log(error.message)
      })

      fetch(`https://api.github.com/users/${userName}/repos`)
      .then(res=>res.json())
      .then(data=>{
        this.stateRepo= data
        console.log(data)
      }).catch(error=>{
        console.log(error.message)
      })

      
    }else{
      console.log('Please provide a name')
    }
  }

}