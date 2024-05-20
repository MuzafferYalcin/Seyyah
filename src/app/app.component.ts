import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'seyyah';
  text: string = "";
  sehir : string = ""
  gun : string = ""
  butce : string = ""

  jsonResponse: any[] = [];
  genAI = new GoogleGenerativeAI("AIzaSyAtXrRiulYYZnFtGKBK-kcOsJx85GIxzvM");
  constructor() {}
  newLis = [
    {}, {}
  ]
  async run() {
    const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    console.log(this.text)
    const prompt = `
      Bir kişi ${this.sehir} de/da ${this.gun} gün sürecek bir gezi planlıyor ${this.butce} tl civarı bir bütçesi var 
      bu kişi için bir tatil planı hazırla kullanıcıya o şehirde gezebileceği yerleri tatil kaç günlük olacaksa o kadar olacak şekilde planla geri dönüş değeri aşağıdaki json formatında olsun
      {
        "gün": {
          "trip-time"
          "gezi": [
            {
              "title": string,
              "image": string,
              "description": string,
              "konum": string,
              "tarih": string,
              "cafe": [
                {
                  "name":string
                  "konum:": string
                }
              ]
      
            }
          ]
        }
      }
    `
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const cleanedText = text.replace(/^'|'$|^\s*```\s*json\s*|\s*```$/gm, '');
    this.jsonResponse = JSON.parse(cleanedText)
    
    console.log(this.jsonResponse);
    
  }
}


