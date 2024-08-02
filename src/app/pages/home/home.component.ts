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
  displayContent: string | null = null;

  constructor(private spinner: NgxSpinnerService){

  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.fileContent = reader.result;
      this.spinner.hide();

      this.displayContent = this.formatXml(this.fileContent as string);
    };

    reader.readAsText(file);
    this.spinner.show();
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

  formatXml(xml: string): string {
    let formatted = '';
    const reg = /(>)(<)(\/*)/g;
    let pad = 0;
    xml = xml.replace(reg, '$1\r\n$2$3');
    xml.split('\r\n').forEach((node: string, index: number) => {
      let indent = 0;
      if (node.match(/.+<\/\w[^>]*>$/)) {
        indent = 0;
      } else if (node.match(/^<\/\w/)) {
        if (pad !== 0) {
          pad -= 1;
        }
      } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
        indent = 1;
      } else {
        indent = 0;
      }

      const padding = new Array(pad + 1).join('  ');
      formatted += padding + node + '\r\n';
      pad += indent;
    });

    return formatted;
  }
}
