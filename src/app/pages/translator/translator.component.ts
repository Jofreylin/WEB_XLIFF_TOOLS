import { Component, OnInit } from '@angular/core';
import * as xmljs from 'xml-js';
import { create } from 'xmlbuilder2';
import { NgxSpinnerService } from 'ngx-spinner';

declare var openGoogleTranslator: any;

@Component({
  selector: 'app-translator',
  templateUrl: './translator.component.html',
  styleUrl: './translator.component.css'
})
export class TranslatorComponent implements OnInit {
  fileContent: string | ArrayBuffer | null = null;

  modifiedContent: string | ArrayBuffer | null = null;

  supportedLanguages: { name?: string, code: string }[] = [];

  sourceLangSelected: string | null = null;
  targetLangSelected: string | null = null;

  options = {
    removeTargetContentBefore: false
  }

  constructor(private spinner: NgxSpinnerService) {

  }

  ngOnInit(): void {
    const supportedLanguages = openGoogleTranslator.supportedLanguages();

    for (const key in supportedLanguages) {
      this.supportedLanguages.push({
        code: key,
        name: supportedLanguages[key]
      })
    }

  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.fileContent = reader.result;
      this.spinner.hide();

      this.setInitialSourceLanguage(this.fileContent as string);
    };

    reader.readAsText(file);
    this.spinner.show();
  }

  async onBuildClick() {
    if (!this.fileContent) {
      alert('Please select a file first!');
      return;
    }

    const sourceLang = this.sourceLangSelected;
    const targetLang = this.targetLangSelected;

    if (!sourceLang) {
      alert('Please select the source language!');
      return;
    }

    if (!targetLang) {
      alert('Please select the target language!');
      return;
    }

    this.spinner.show();

    try {
      const parsedXml = create(this.fileContent as string).toObject() as any;
      const transUnits = parsedXml.xliff.file.body['trans-unit'];

      const processTransUnit = async (transUnit: any) => {
        const source = transUnit.source || null;
      
        if (!source) return;
      
        const initialTarget = transUnit.target || null;
      
        if (initialTarget && !this.options.removeTargetContentBefore) return;
      
        transUnit.target = JSON.parse(JSON.stringify(source)); // Copiar la estructura del source al target
        const target = transUnit.target;
      
        if (typeof target === 'object' && target !== null) {
          let insideTarget = target['#'];
      
          if (Array.isArray(insideTarget)) {
            for (let i = 0; i < insideTarget.length; i++) {
              let targetText = insideTarget[i]['#'];
      
              if (targetText) {
                insideTarget[i]['#'] = await this.translateText([targetText], sourceLang, targetLang); // Asignar la traducción
              }
            }
          } else if (insideTarget) {
            target['#'] = await this.translateText([insideTarget], sourceLang, targetLang); // Asignar la traducción
          }
        } else if (transUnit.target) {
          transUnit.target = await this.translateText([transUnit.target], sourceLang, targetLang); // Asignar la traducción
        }
      };
      
      if (Array.isArray(transUnits)) {
        for (const transUnit of transUnits) {
          await processTransUnit(transUnit);
        }
      } else {
        await processTransUnit(transUnits);
      }

      const modifiedXml = create(parsedXml).end({ prettyPrint: true });
      this.modifiedContent = modifiedXml;
    } catch (error) {
      console.error('Error processing file:', error);
      alert('Error processing file:');
    } finally {
      this.spinner.hide();
    }
  }

  setInitialSourceLanguage(xml: string) {
    const jsonObj = xmljs.xml2js(xml, { compact: true }) as any;
    try {
      const lang = jsonObj.xliff.file._attributes['source-language'];

      this.sourceLangSelected = lang;
    } catch (error) {
      console.error('Error reading source-language attribute:', error);
    }
  }

  async translateText(listOfWords: string[], fromLanguage: any, toLanguage: any): Promise<string> {

    let translation = '';

    try {
      await openGoogleTranslator.TranslateLanguageData({
        listOfWordsToTranslate: listOfWords,
        fromLanguage: fromLanguage,
        toLanguage: toLanguage,
      }).then((data: { original: string, translation: string }[]) => {
        translation = data[0].translation;
      });
    } catch (e) {

    }

    return translation;
  }



  downloadFile() {

    const data: string = this.modifiedContent as string;
    const fileExtension = 'xlf';
    const filename = `translated.${this.targetLangSelected}.${fileExtension}`

    this.spinner.show();

    try {
      const blob = new Blob([data], { type: 'application/xml' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } finally {
      this.spinner.hide();
    }

  }

  clearInput() {
    this.fileContent = null;
    this.modifiedContent = null;
  }


}
