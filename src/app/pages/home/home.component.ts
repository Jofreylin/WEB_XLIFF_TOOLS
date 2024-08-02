import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as xmljs from 'xml-js';
import { NgxSpinnerService } from 'ngx-spinner';
declare var openGoogleTranslator: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  fileContent: string | ArrayBuffer | null = null;

  constructor(private spinner: NgxSpinnerService){

  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.fileContent = reader.result;
    };

    reader.readAsText(file);
  }

  async onBuildClick() {
    if (!this.fileContent) {
      alert('Please select a file first!');
      return;
    }

    this.spinner.show();

    const fileExtension = 'xlf'; // Adjust as needed
    const sourceLang = 'en';
    const targetLang = 'es';

    try {
      const parsedXml = xmljs.xml2js(this.fileContent as string, { compact: true }) as any;
      const transUnits = parsedXml.xliff.file.body['trans-unit'];

      for (const transUnit of transUnits) {
        const source = transUnit.source._text;
        let target = transUnit.target ? transUnit.target._text : null;

        if (source) {
          if (!target) {
            transUnit.target = { _text: '' };
            target = '';
          }

          if (target === '') {
            
            const translation = await this.translateText([source], sourceLang, targetLang);
            transUnit.target._text = translation;
            
          }

        }
      }

      const modifiedXml = xmljs.js2xml(parsedXml, { compact: true, spaces: 4 });
      this.downloadFile(modifiedXml, `translated.${fileExtension}`);
    } catch (error) {
      this.spinner.hide();
      console.error('Error processing file:', error);
    }
  }

  async translateText(listOfWords: string[], fromLanguage: any, toLanguage: any): Promise<string> {

    let translation = '';

    try{
      await openGoogleTranslator.TranslateLanguageData({
        listOfWordsToTranslate: listOfWords,
        fromLanguage: fromLanguage,
        toLanguage: toLanguage,
      }).then((data: { original: string, translation: string }[])=>{
        translation = data[0].translation;
      });
    }catch(e){

    }

    return translation;
  }

  downloadFile(data: string, filename: string) {
    const blob = new Blob([data], { type: 'application/xml' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    this.spinner.hide();
  }
}
